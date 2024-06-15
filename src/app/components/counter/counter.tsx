"use client";

import plusIcon from "../../../../public/plus.svg";
import minusIcon from "../../../../public/minus.svg";
import { setUserCounter } from "@/app/lib/server/counter";
import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "../button/button";
import Dialog from "../dialog/dialog";
import Display from "../display/display";
import Header from "../header/header";
import "./counter.scss";

export default function Counter({ initialValue }: { initialValue?: number }) {
  const [counter, setCounter] = useState(initialValue ?? 0);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    setUserCounter(counter);
  }, [counter]);

  function addToCounter(n: number) {
    return () => setCounter(counter + n);
  }

  function resetCounter() {
    setCounter(0);
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
      <Header>Counter</Header>

      <div className="grid">
        <div className="row">
          <Button className="counter-buttons" onclick={decrement}>
            <Image src={minusIcon} alt="Decrement counter" width={15} height={15} />
          </Button>
          <Display className="counter">{counter}</Display>
          <Button className="counter-buttons" onclick={increment}>
            <Image src={plusIcon} alt="Increment counter" width={15} height={15} />
          </Button>
        </div>

        <div className="row">
          <Button onclick={openConfirmDialog}>Reset</Button>
        </div>
      </div>

      <Dialog
        show={showConfirmDialog}
        onConfirm={confirmDialog}
        onCancel={cancelDialog}
      >
        <h2>Are you sure you want to reset the counter?</h2>
        <p>This action is irreversible</p>
      </Dialog>
    </>
  );
}
