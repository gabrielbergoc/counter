"use server";

import { debounce } from "lodash";
import { authorize, getToken } from "./auth";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";


const prisma = new PrismaClient();

export const getUserCounter = debounce(async () => {
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
}, 1000, { leading: true });

export const setUserCounter = debounce(async (counter: number) => {
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
}, 1000);
