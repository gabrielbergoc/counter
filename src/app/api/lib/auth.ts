import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export class InvalidPassword extends Error { }

export async function login({ email, password }: { email: string, password: string }) {
  const user = await prisma.user.findFirstOrThrow({
    where: {
      email: {
        equals: email,
      },
    },
  });

  const correct = await bcrypt.compare(password, user.password);
  if (!correct) {
    throw new InvalidPassword("Wrong password");
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

      await prisma.user.update({
        where: { email },
        data: { token },
      });

      resolve(token);
    });
  });
}

export async function authorize(token: string) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("Couldn't retrieve JWT_SECRET");
  }

  return new Promise<jwt.JwtPayload | string | undefined>((resolve, reject) => {
    jwt.verify(token, secret, {}, function (err, result) {
      if (err) {
        reject(err);
        return;
      }

      resolve(result);
    });
  });
}
