"use client";

import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "./components/button/button";
import Display from "./components/display/display";
import Header from "./components/header/header";
import Navbar from "./components/navbar/navbar";
import { isAuthenticated, removeToken } from "./lib/auth";
import { getUserCounter, setUserCounter } from "./lib/counter";
import "./page.scss";
import Loader from "./components/loader/loader";
import FadeIn from "./components/fadeIn/fadeIn";

export default function Home() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [counter, setCounter] = useState(0);

  const setShowTrue = () => setShow(true);

  useEffect(() => {
    if (!isAuthenticated()) {
      redirect("/login");
    }

    getUserCounter()
      .then(setCounter)
      .then(setShowTrue);
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
                <Button onclick={resetCounter}>Reset</Button>
              </div>
            </div>
          </main>
        </FadeIn>
      )}
    </>
  );
}
