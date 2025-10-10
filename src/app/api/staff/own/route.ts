import { NextResponse } from "next/server";

import { externalApi } from "@/lib/api/external";
import { staffList } from "@/mock/staff";

export async function GET() {
  try {
    // const response = await externalApi.get('/staff');
    // return NextResponse.json(response);

    return NextResponse.json(staffList);
  } catch (error) {
    console.error("Axios error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
