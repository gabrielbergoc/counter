"use client";

import styles from "./ui/page.module.css";
import Button from "./components/button/button";
import Display from "./components/display/display";
import { useState } from "react";

export default function Home() {
  const [counter, setCounter] = useState(0);

  function addToCounter(n: number) {
    return () => setCounter(counter + n);
  }

  const decrement = addToCounter(-1);
  const increment = addToCounter(+1);

  return (
    <main className={styles.main}>
      <Button text="-" onclick={decrement} />
      <Display content={counter} />
      <Button text="+" onclick={increment} />
    </main>
  );
}
