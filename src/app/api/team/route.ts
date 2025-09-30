import { NextResponse } from "next/server";

import { externalApi } from "@/lib/api/external";
import { getFormationPositions } from "@/lib/formation";
import { FootballPlayers } from "@/mock/football-players";

export async function GET() {
  try {
    // const response = await externalApi.get('/products');FootballPlayers
    // return NextResponse.json(response);
    const myTeamFormation = "4-2-3-1";

    const response = {
      players: FootballPlayers,
      formation: getFormationPositions(myTeamFormation),
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
