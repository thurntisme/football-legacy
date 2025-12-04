import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { externalApi } from "@/lib/api/externalApi";

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

    // Call external API for authentication
    const { data, ok, status } = await externalApi.post<{
      token?: string;
      user: any;
      message?: string;
    }>("login", { email, password });

    if (!ok) {
      return NextResponse.json(
        { message: data.message || "Invalid credentials.", success: false },
        { status },
      );
    }

    // Set token from external API response
    if (data.token) {
      cookies().set("token", data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 24 hours
      });
    }

    return NextResponse.json({
      message: data.message || "Login successful",
      user: data.user,
      success: true,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Something went wrong.", success: false },
      { status: 500 },
    );
  }
}
