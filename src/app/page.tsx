"use client";

import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "./components/button/button";
import Display from "./components/display/display";
import Header from "./components/header/header";
import Navbar from "./components/navbar/navbar";
import { getUserEmail, isAuthenticated, removeToken } from "./lib/auth";
import { getUserCounter, setUserCounter } from "./lib/counter";
import "./page.scss";
import Loader from "./components/loader/loader";
import FadeIn from "./components/fadeIn/fadeIn";
import Dialog from "./components/dialog/dialog";

export default function Home() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [counter, setCounter] = useState(0);
  const [userEmail, setUserEmail] = useState("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const setShowTrue = () => setShow(true);

  useEffect(() => {
    if (!isAuthenticated()) {
      redirect("/login");
    }

    getUserCounter()
      .then(setCounter)
      .then(setShowTrue);

    getUserEmail()
      .then(setUserEmail);
  }, []);

  useEffect(() => {
    setUserCounter(counter);
  }, [counter]);

  function addToCounter(n: number) {
    return () => setCounter(counter + n);
  }

  function resetCounter() {
    setCounter(0);
  }

  function doLogout() {
    removeToken();
    router.push("/login");
  }

  function openConfirmDialog() {
    setShowConfirmDialog(true);
  }

  function closeConfirmDialog(value?: boolean) {
    return () => {
      setShowConfirmDialog(false);

      if (value) {
        resetCounter();
      }
    };
  }

  const confirmDialog = closeConfirmDialog(true);
  const cancelDialog = closeConfirmDialog(false);

  const decrement = addToCounter(-1);
  const increment = addToCounter(+1);

  return (
    <>
      {!show ? (
        <Loader />
      ) : (
        <FadeIn>
          <main className="main">
            <Navbar>
              <div>{userEmail}</div>
              <Button onclick={doLogout}>Logout</Button>
            </Navbar>

            <Header>Counter</Header>

            <div className="grid">
              <div className="row">
                <Button className="counter-buttons" onclick={decrement}>
                  -
                </Button>
                <Display className="counter">{counter}</Display>
                <Button className="counter-buttons" onclick={increment}>
                  +
                </Button>
              </div>
              <div className="row">
                <Button onclick={openConfirmDialog}>Reset</Button>
              </div>
            </div>

            <Dialog show={showConfirmDialog} onConfirm={confirmDialog} onCancel={cancelDialog}>
              <h2>Are you sure you want to reset the counter?</h2>
              <p>This action is irreversible</p>
            </Dialog>
          </main>
        </FadeIn>
      )}
    </>
  );
}
