"use client";

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "./components/button/button";
import Display from "./components/display/display";
import Header from "./components/header/header";
import { isAuthenticated } from "./lib/auth";
import { getUserCounter, setUserCounter } from "./lib/counter";
import "./page.scss";

export default function Home() {
  const router = useRouter();
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (!isAuthenticated()) {
      redirect("/login");
    }
    
    getUserCounter().then(setCounter);
  }, []);
  useEffect(() => {
    setUserCounter(counter)
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
