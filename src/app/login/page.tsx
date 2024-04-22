"use client";

import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "../components/button/button";
import Input from "../components/input/input";
import { isAuthenticated } from "../lib/auth";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated()) {
      redirect("/")
    }
  }, []);

  async function doLogin() {
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const { token } = await res.json();
      localStorage.setItem("token", token);
      router.push("/");
    }
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
