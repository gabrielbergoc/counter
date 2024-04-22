import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { authorize } from "../lib/auth";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  if (!req.headers.has("Authorization")) {
    return NextResponse.redirect("/login");
  }

  const token = req.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return NextResponse.redirect("/login");
  }

  try {
    const payload = await authorize(token);
    if (!payload || typeof payload === "string") {
      throw new Error("Error verifying token");
    }

    const { email } = payload;
    const { counter } = await prisma.user.findFirstOrThrow({
      where: {
        email: {
          equals: email,
        },
      },
    });

    return NextResponse.json({ counter });

  } catch (err) {
    return NextResponse.redirect("/login");
  }
}
