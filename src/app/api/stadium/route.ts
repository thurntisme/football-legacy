import { NextResponse } from "next/server";

import { externalApi } from "@/lib/api/external";
import { facilityList } from "@/mock/stadium";

export async function GET() {
  try {
    // const response = await externalApi.get('/stadium');
    // return NextResponse.json(response);

    return NextResponse.json(facilityList);
  } catch (error) {
    console.error("Axios error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
