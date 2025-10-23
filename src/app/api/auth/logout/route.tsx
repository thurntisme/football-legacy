import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    cookies().delete("token");

    return NextResponse.json({
      message: "Logout successful",
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}
