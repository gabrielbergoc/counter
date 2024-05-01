import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Button from "../components/button/button";
import Input from "../components/input/input";
import { setToken } from "../lib/auth";
import { login } from "../lib/server/auth";
import { loggedInGuard } from "../lib/guards";

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
    <form action={onSubmit} className="main">
      <Input id="login-email" name="login-email" label="E-mail" />
      <Input
        id="login-password"
        name="login-password"
        type="password"
        label="Password"
      />
      <Button type="submit">Login</Button>
    </form>
  );
}
