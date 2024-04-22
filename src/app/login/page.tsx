"use client";

import { useState } from "react";
import Input from "../components/input/input";
import Button from "../components/button/button";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function doLogin() {
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    const { token } = await res.json();

    localStorage.setItem("token", token);
  }

  return (
    <main className="main">
      <Input
        id="login-email"
        label="E-mail"
        value={email}
        onchange={setEmail}
      />
      <Input
        id="login-password"
        type="password"
        label="Password"
        value={password}
        onchange={setPassword}
      />
      <Button onclick={doLogin}>Login</Button>
    </main>
  );
}
