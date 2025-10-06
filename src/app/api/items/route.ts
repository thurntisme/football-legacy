import { NextResponse } from "next/server";

import { externalApi } from "@/lib/api/external";
import { ShopItems } from "@/mock/items";

export async function GET() {
  try {
    // const response = await externalApi.get('/items');
    // return NextResponse.json(response);

    return NextResponse.json(ShopItems);
  } catch (error) {
    console.error("Axios error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
