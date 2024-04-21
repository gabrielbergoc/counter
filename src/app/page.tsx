"use client";

import { useState } from "react";
import Button from "./components/button/button";
import Display from "./components/display/display";
import Header from "./components/header/header";
import "./page.scss";

export default function Home() {
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
          <Button className="counter-buttons" text="-" onclick={decrement} />
          <Display className="counter" content={counter} />
          <Button className="counter-buttons" text="+" onclick={increment} />
        </div>
        <div className="row">
          <Button text="Reset" onclick={resetCounter} />
        </div>
      </div>
    </main>
  );
}
