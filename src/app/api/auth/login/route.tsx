import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { GUEST_USER, createGuestToken } from "@/constants/guest-user";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required.", success: false },
        { status: 400 },
      );
    }

    if (email !== GUEST_USER.email || password !== GUEST_USER.password) {
      return NextResponse.json(
        { message: "Invalid credentials.", success: false },
        { status: 401 },
      );
    }

    cookies().set("token", createGuestToken());

    return NextResponse.json({
      message: "Login successful",
      user: GUEST_USER,
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong.", success: false },
      { status: 500 },
    );
  }
}
