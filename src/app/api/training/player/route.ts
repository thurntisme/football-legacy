import { NextResponse } from "next/server";

import { externalApi } from "@/lib/api/external";

export async function GET() {
  try {
    const response = await externalApi.get("/football/training/player");
    return NextResponse.json(response);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch football training player");
  }
}
