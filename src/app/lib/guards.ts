import { redirect } from "next/navigation";
import { isAuthenticated } from "./auth";

export function authGuard(args?: any) {
  if (!isAuthenticated(args)) {
    redirect("/login");
  }
}

export function loggedInGuard(args?: any) {
  if (isAuthenticated(args)) {
    redirect("/");
  }
}