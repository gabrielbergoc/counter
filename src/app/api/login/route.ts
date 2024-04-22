import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export interface AuthResponse {
  token?: string;
  message?: string;
}

export async function POST(req: NextRequest) {
  try {
    const token = await login(await req.json());
    return NextResponse.json({ token }, { status: 200 });

  } catch (err) {
    if (err instanceof InvalidPassword) {
      return NextResponse.json({ message: err.message }, { status: 400 });
      
    } else {
      console.error(err);

      return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
  }
}

class InvalidPassword extends Error { }

async function login({ email, password }: { email: string, password: string }) {
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

  const token = jwt.sign({ email }, secret);

  await prisma.user.update({
    where: { email },
    data: { token },
  });

  return token;
}