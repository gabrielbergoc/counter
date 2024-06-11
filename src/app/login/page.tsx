import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Button from "../components/button/button";
import Header from "../components/header/header";
import Input from "../components/input/input";
import { setToken } from "../lib/auth";
import { loggedInGuard } from "../lib/guards";
import { login } from "../lib/server/auth";
import "./login.scss";
import Link from "next/link";

export default function Login() {
  loggedInGuard({ cookies });

  async function onSubmit(formData: FormData) {
    "use server";

    const email = formData.get("login-email")?.toString();
    const password = formData.get("login-password")?.toString();

    if (!email) {
      throw new Error("Email required");
    }

    if (!password) {
      throw new Error("Password required");
    }

    const token = await login({ email, password });
    setToken(token, { cookies });

    redirect("/");
  }

  return (
    <main className="main">
      <Header>Welcome to Counter</Header>

      <form action={onSubmit}>
        <Input id="login-email" name="login-email" label="E-mail" />

        <Input
          id="login-password"
          name="login-password"
          type="password"
          label="Password"
        />

        <p>Don&apos;t have an account? <Link href="/signup">Sign up</Link></p>

        <Button type="submit">Login</Button>
      </form>
    </main>
  );
}
