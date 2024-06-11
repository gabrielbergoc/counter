"use server";

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { getToken } from "../auth";


const prisma = new PrismaClient();

export async function getUserEmail() {
  const token = getToken({ cookies });
  if (!token) {
    throw new Error("Not authenticated");
  }

  return new Promise<string>((resolve, reject) => {
    const payload = jwt.decode(token, { json: true });

    if (!payload || !payload.email) {
      reject(new Error("Couldn't decode token"));
      return;
    }

    resolve(payload.email);
  });
}

export async function login({ email, password }: { email: string, password: string }) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new NonexistentUserError();
  }

  const correct = await bcrypt.compare(password, user.password);
  if (!correct) {
    throw new InvalidPasswordError();
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("Couldn't retrieve JWT_SECRET");
  }

  return new Promise<string>((resolve, reject) => {
    jwt.sign({ email }, secret, {}, async function (err, token) {
      if (err || !token) {
        reject(err);
        return;
      }

      resolve(token);
    });
  });
}

export async function createUser({
  name, email, password,
}: {
  name: string; email: string; password: string;
}) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user) {
    throw new ExistentUserError();
  }

  return new Promise<string>((resolve, reject) => {
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        reject(err);
        return;
      }

      await prisma.user.create({
        data: {
          name,
          email,
          password: hash,
        },
      });

      const secret = process.env.JWT_SECRET;
      if (!secret) {
        throw new Error("Couldn't retrieve JWT_SECRET");
      }

      jwt.sign({ email }, secret, {}, async function (err, token) {
        if (err || !token) {
          reject(err);
          return;
        }
  
        resolve(token);
      });
    });
  });
}

export async function authorize(token: string) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("Couldn't retrieve JWT_SECRET");
  }

  return new Promise<jwt.JwtPayload>((resolve, reject) => {
    jwt.verify(token, secret, {}, function (err, result) {
      if (err || !result || typeof result === "string") {
        reject(err);
        return;
      }

      resolve(result);
    });
  });
}

class InvalidPasswordError extends Error {
  constructor() {
    super("Wrong password");
  }
}

class NonexistentUserError extends Error {
  constructor() {
    super("Nonexistent user");
  }
}

class ExistentUserError extends Error {
  constructor() {
    super("User already exists");
  }
}
