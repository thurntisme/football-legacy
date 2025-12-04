import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { externalApi } from "@/lib/api/externalApi";

export async function POST(req: Request) {
  try {
    const token = cookies().get("token")?.value;

    // Call external API to invalidate token (if your backend supports it)
    if (token) {
      try {
        // externalApi automatically includes the token from cookies
        await externalApi.post("auth/logout");
      } catch (error) {
        // Continue even if external logout fails
        console.error("External logout error:", error);
      }
    }

    // Delete local cookie
    cookies().delete("token");

    return NextResponse.json({
      message: "Logout successful",
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong.", success: false },
      { status: 500 },
    );
  }
}
