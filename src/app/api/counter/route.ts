import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { authorize, getTokenFromHeaders, hasAuthorizationHeaders } from "../lib/auth";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  if (!hasAuthorizationHeaders(req)) {
    return NextResponse.redirect("/login");
  }

  const token = getTokenFromHeaders(req);
  if (!token) {
    return NextResponse.redirect("/login");
  }

  try {
    const payload = await authorize(token);

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

export async function POST(req: NextRequest) {
  if (!hasAuthorizationHeaders(req)) {
    return NextResponse.redirect("/login");
  }

  const token = getTokenFromHeaders(req);
  if (!token) {
    return NextResponse.redirect("/login");
  }

  const { counter } = await req.json();

  if (counter === null || counter === undefined || typeof counter !== "number") {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }

  try {
    const payload = await authorize(token);

    const { email } = payload;
    await prisma.user.update({
      where: { email },
      data: { counter },
    });

    return NextResponse.json({ counter });

  } catch (err) {
    return NextResponse.redirect("/login");
  }
}
