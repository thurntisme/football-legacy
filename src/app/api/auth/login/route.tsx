import { NextResponse } from "next/server";

import { GUEST_USER } from "@/constants/guest-user";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required.", success: false },
        { status: 400 },
      );
    }

    // if (email !== guestUser.email || password !== guestUser.password) {
    //   return NextResponse.json(
    //     { error: 'Invalid credentials.', success: false },
    //     { status: 401 }
    //   );
    // }

    // Success
    return NextResponse.json({
      message: "Login successful",
      user: GUEST_USER,
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}
