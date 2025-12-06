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

    // Call external API to get user's clubs
    const { data, ok, status } = await externalApi.get<{
      clubs?: any[];
      data?: any[];
      [key: string]: any;
    }>("clubs", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!ok) {
      return NextResponse.json(
        { message: "Failed to fetch clubs", success: false },
        { status },
      );
    }

    return NextResponse.json({
      clubs: data.clubs || data.data || data,
      success: true,
    });
  } catch (error) {
    console.error("Get clubs error:", error);
    return NextResponse.json(
      { message: "Something went wrong.", success: false },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const token = cookies().get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized", success: false },
        { status: 401 },
      );
    }

    const body = await req.json();
    const { server_id, name } = body;

    if (!server_id || !name) {
      return NextResponse.json(
        { message: "Server ID and name are required", success: false },
        { status: 400 },
      );
    }

    // Call external API to create club
    const { data, ok, status } = await externalApi.post<{
      club?: any;
      data?: any;
      message?: string;
      [key: string]: any;
    }>(
      "clubs",
      { server_id, name },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!ok) {
      return NextResponse.json(
        { message: data.message || "Failed to create club", success: false },
        { status },
      );
    }

    return NextResponse.json({
      club: data.club || data.data || data,
      message: data.message || "Club created successfully",
      success: true,
    });
  } catch (error) {
    console.error("Create club error:", error);
    return NextResponse.json(
      { message: "Something went wrong.", success: false },
      { status: 500 },
    );
  }
}