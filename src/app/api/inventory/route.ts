import { NextResponse } from "next/server";

import { externalApi } from "@/lib/api/external";
import { getItemBySlug } from "@/lib/item";
import { inventoryItems } from "@/mock/inventoryItems";
import { InventoryItem } from "@/types/item";

export async function GET() {
  try {
    // const response = await externalApi.get('/items');
    // return NextResponse.json(response);
    const items = inventoryItems.map((item: InventoryItem) => {
      return {
        ...item,
        ...getItemBySlug(item?.slug),
      };
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error("Axios error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
