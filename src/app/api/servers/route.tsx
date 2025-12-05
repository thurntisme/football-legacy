import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { externalApi } from "@/lib/api/externalApi";

export async function GET() {
  try {
    const token = cookies().get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized", success: false },
        { status: 401 },
      );
    }

    // Call external API to get servers list
    const { data, ok, status } = await externalApi.get<{
      servers?: any[];
      data?: any[];
      [key: string]: any;
    }>("servers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!ok) {
      return NextResponse.json(
        { message: "Failed to fetch servers", success: false },
        { status },
      );
    }

    return NextResponse.json({
      servers: data.servers || data.data || data,
      success: true,
    });
  } catch (error) {
    console.error("Get servers error:", error);
    return NextResponse.json(
      { message: "Something went wrong.", success: false },
      { status: 500 },
    );
  }
}
