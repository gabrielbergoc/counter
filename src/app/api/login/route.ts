import { NextRequest, NextResponse } from "next/server";
import { login, InvalidPassword } from "../lib/auth";

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
