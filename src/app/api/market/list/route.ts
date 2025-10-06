import { NextRequest, NextResponse } from "next/server";

import { externalApi } from "@/lib/api/external";
import { LegendPlayers } from "@/mock/edition/legend";
import { MarketPlayers } from "@/mock/market-players";

export async function GET(request: NextRequest) {
  try {
    // const response = await externalApi.get("/football-players");

    const players = [...LegendPlayers];

    return NextResponse.json(players);
  } catch (error) {
    console.error("Axios error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
