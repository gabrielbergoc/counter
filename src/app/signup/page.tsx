import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Button from "../components/button/button";
import Header from "../components/header/header";
import Input from "../components/input/input";
import { setToken } from "../lib/auth";
import { loggedInGuard } from "../lib/guards";
import { createUser } from "../lib/server/auth";
import "./signup.scss";

export default function Signup() {
  loggedInGuard({ cookies });

  async function onSubmit(formData: FormData) {
    "use server";

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

    const token = await createUser({ name, email, password });
    setToken(token, { cookies });

    redirect("/");
  }

  return (
    <main className="main">
      <Header>Sign up to Counter</Header>

      <form action={onSubmit}>
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
  );
}
