import { NextRequest, NextResponse } from "next/server";

import { externalApi } from "@/lib/api/external";
import { MarketPlayers } from "@/mock/market-players";

export async function GET(request: NextRequest) {
  try {
    // const response = await externalApi.get("/football-players");
    return NextResponse.json(MarketPlayers);
  } catch (error) {
    console.error("Axios error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
