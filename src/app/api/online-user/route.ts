import { NextResponse } from "next/server";

import { externalApi } from "@/lib/api/external";
import { onlineUsers } from "@/mock/football";

export async function GET() {
  try {
    // const response = await externalApi.get('/online/user');
    // return NextResponse.json(response);

    return NextResponse.json(onlineUsers);
  } catch (error) {
    console.error("Axios error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
