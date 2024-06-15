"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "../components/button/button";
import Header from "../components/header/header";
import Input from "../components/input/input";
import Loader from "../components/loader/loader";
import { setToken } from "../lib/auth";
import { loggedInGuard } from "../lib/guards";
import { login } from "../lib/server/auth";
import "./login.scss";

export default function Login() {
  loggedInGuard();

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Previne o comportamento padrão do formulário
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("login-email")?.toString();
    const password = formData.get("login-password")?.toString();

    if (!email) {
      throw new Error("Email required");
    }

    if (!password) {
      throw new Error("Password required");
    }

    try {
      const token = await login({ email, password });
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
        <Header>Welcome to Counter</Header>

        <form onSubmit={onSubmit}>
          <Input id="login-email" name="login-email" label="E-mail" />

          <Input
            id="login-password"
            name="login-password"
            type="password"
            label="Password"
          />

          <p className="sign-up">
            Don&apos;t have an account? <Link href="/signup">Sign up</Link>
          </p>

          <Button type="submit">Login</Button>
        </form>
      </main>
    </>
  );
}
