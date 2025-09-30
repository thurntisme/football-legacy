import { NextResponse } from "next/server";

import { externalApi } from "@/lib/api/external";
import { FootballPlayers } from "@/mock/football-players";

export async function GET() {
  try {
    // const response = await externalApi.get('/products');FootballPlayers
    // return NextResponse.json(response);

    const response = {
      players: FootballPlayers,
      formation: "4-2-3-1",
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Axios error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
