"use client";

import { removeToken } from "@/app/lib/auth";
import { useRouter } from "next/navigation";
import Button from "../button/button";
import "./logout.scss";

export default function Logout() {
  const router = useRouter();

  function doLogout() {
    removeToken();
    router.push("/login");
  }
  return <Button onclick={doLogout}>Logout</Button>;
}
