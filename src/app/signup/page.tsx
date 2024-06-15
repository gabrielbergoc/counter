"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "../components/button/button";
import Header from "../components/header/header";
import Input from "../components/input/input";
import Loader from "../components/loader/loader";
import { setToken } from "../lib/auth";
import { loggedInGuard } from "../lib/guards";
import { createUser } from "../lib/server/auth";
import "./signup.scss";

export default function Signup() {
  loggedInGuard();

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Previne o comportamento padrão do formulário
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const name = formData.get("signup-name")?.toString();
    const email = formData.get("signup-email")?.toString();
    const password = formData.get("signup-password")?.toString();
    const confirmPassword = formData.get("confirm-password")?.toString();

    if (!name) {
      throw new Error("Name required");
    }

    if (!email) {
      throw new Error("Email required");
    }

    if (!password) {
      throw new Error("Password required");
    }

    if (!confirmPassword) {
      throw new Error("Confirm password");
    }

    if (password !== confirmPassword) {
      throw new Error("Passwords don't match");
    }

    try {
      const token = await createUser({ name, email, password });
      setToken(token);
      router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  }

  return (
    <>
      {loading && <Loader />}
      <main className="main">
        <Header>Sign up to Counter</Header>

        <form onSubmit={onSubmit}>
          <Input id="signup-name" name="signup-name" label="Name" />

          <Input id="signup-email" name="signup-email" label="E-mail" />

          <Input
            id="signup-password"
            name="signup-password"
            type="password"
            label="Password"
          />

          <Input
            id="confirm-password"
            name="confirm-password"
            type="password"
            label="Confirm password"
          />

          <Button type="submit">Sign up</Button>
        </form>
      </main>
    </>
  );
}
