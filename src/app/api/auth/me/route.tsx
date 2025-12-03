import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { GUEST_USER, validateGuestToken } from "@/constants/guest-user";

export async function GET() {
  try {
    const token = cookies().get("token")?.value;

    if (!token || !validateGuestToken(token)) {
      return NextResponse.json(
        { message: "Unauthorized", success: false },
        { status: 401 },
      );
    }

    // Return user data without password
    const { password: _, ...userWithoutPassword } = GUEST_USER;

    return NextResponse.json({
      user: userWithoutPassword,
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong.", success: false },
      { status: 500 },
    );
  }
}
