"use server";

import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { getToken } from "../auth";
import { authorize } from "./auth";


const prisma = new PrismaClient();

export async function getUserCounter() {
  const token = getToken({ cookies });
  if (!token) {
    throw new Error("Unauthorized");
  }

  const payload = await authorize(token);

  const { email } = payload;
  const { counter } = await prisma.user.findFirstOrThrow({
    where: {
      email: {
        equals: email,
      },
    },
  });

  return counter;
}

export async function setUserCounter(counter: number) {
  const token = getToken({ cookies });
  if (!token) {
    throw new Error("Unauthorized");
  }

  const payload = await authorize(token);

  const { email } = payload;
  await prisma.user.update({
    where: { email },
    data: { counter },
  });
}
