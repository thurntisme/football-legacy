import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { externalApi } from "@/lib/api/externalApi";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { full_name, email, password } = body;

    // Validate required fields
    if (!full_name || !email || !password) {
      return NextResponse.json(
        { message: "Full name, email and password are required.", success: false },
        { status: 400 },
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email format.", success: false },
        { status: 400 },
      );
    }

    // Validate password strength (minimum 8 characters)
    if (password.length < 8) {
      return NextResponse.json(
        {
          message: "Password must be at least 8 characters long.",
          success: false,
        },
        { status: 400 },
      );
    }

    // Call external API for registration
    const { data, ok, status } = await externalApi.post<{
      token?: string;
      user: any;
      message?: string;
    }>("register", { full_name, email, password });

    if (!ok) {
      return NextResponse.json(
        {
          message: data.message || "Registration failed.",
          success: false,
        },
        { status },
      );
    }

    // Set token from external API response (if provided)
    if (data.token) {
      cookies().set("token", data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 24 hours
      });
    }

    return NextResponse.json({
      message: data.message || "Registration successful",
      user: data.user,
      success: true,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Something went wrong.", success: false },
      { status: 500 },
    );
  }
}
