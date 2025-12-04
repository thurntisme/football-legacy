import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { externalApi } from "@/lib/api/externalApi";

export async function GET() {
  try {
    const token = cookies().get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized", success: false },
        { status: 401 },
      );
    }

    // Call external API to get user data
    // Note: externalApi automatically includes the token from cookies
    const { data, ok, status } = await externalApi.get<{
      user?: any;
      [key: string]: any;
    }>("auth/me");

    if (!ok) {
      return NextResponse.json(
        { message: "Unauthorized", success: false },
        { status },
      );
    }

    return NextResponse.json({
      user: data.user || data,
      success: true,
    });
  } catch (error) {
    console.error("Get user error:", error);
    return NextResponse.json(
      { message: "Something went wrong.", success: false },
      { status: 500 },
    );
  }
}
