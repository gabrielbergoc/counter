"use client";

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "./components/button/button";
import Display from "./components/display/display";
import Header from "./components/header/header";
import { isAuthenticated } from "./lib/auth";
import "./page.scss";

export default function Home() {
  useEffect(() => {
    if (!isAuthenticated()) {
      redirect("/login");
    }
  }, []);

  const [counter, setCounter] = useState(0);

  function addToCounter(n: number) {
    return () => setCounter(counter + n);
  }

  function resetCounter() {
    setCounter(0);
  }

  const decrement = addToCounter(-1);
  const increment = addToCounter(+1);

  return (
    <main className="main">
      <Header>Counter</Header>
      <div className="grid">
        <div className="row">
          <Button className="counter-buttons" onclick={decrement}>-</Button>
          <Display className="counter">{counter}</Display>
          <Button className="counter-buttons" onclick={increment}>+</Button>
        </div>
        <div className="row">
          <Button onclick={resetCounter}>Reset</Button>
        </div>
      </div>
    </main>
  );
}
