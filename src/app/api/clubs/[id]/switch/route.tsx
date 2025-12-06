import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { externalApi } from "@/lib/api/externalApi";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const token = cookies().get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized", success: false },
        { status: 401 },
      );
    }

    const clubId = params.id;

    if (!clubId) {
      return NextResponse.json(
        { message: "Club ID is required", success: false },
        { status: 400 },
      );
    }

    // Call external API to switch club
    const { data, ok, status } = await externalApi.post<{
      club?: any;
      data?: any;
      message?: string;
      [key: string]: any;
    }>(
      `clubs/${clubId}/switch`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!ok) {
      return NextResponse.json(
        { message: data.message || "Failed to switch club", success: false },
        { status },
      );
    }

    return NextResponse.json({
      club: data.club || data.data || data,
      message: data.message || "Club switched successfully",
      success: true,
    });
  } catch (error) {
    console.error("Switch club error:", error);
    return NextResponse.json(
      { message: "Something went wrong.", success: false },
      { status: 500 },
    );
  }
}
