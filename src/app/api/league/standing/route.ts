import { NextResponse } from "next/server";

import { externalApi } from "@/lib/api/external";

export async function GET() {
  try {
    const response = await externalApi.get("/football/league/standing");
    return NextResponse.json(response);
  } catch (error) {
    console.error("Axios error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
