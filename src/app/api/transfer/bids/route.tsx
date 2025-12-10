import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { externalApi } from "@/lib/api/externalApi";

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
        const {
            player_instance_uuid,
            club_id,
            bid_amount,
            weekly_wage_offer,
            expires_at,
            notes,
        } = body;

        // Validate required fields
        if (!player_instance_uuid || !club_id || !bid_amount || !weekly_wage_offer) {
            return NextResponse.json(
                {
                    message:
                        "player_instance_uuid, club_id, bid_amount, and weekly_wage_offer are required",
                    success: false,
                },
                { status: 400 },
            );
        }

        // Call external API to create bid
        const { data, ok, status } = await externalApi.post<{
            bid?: any;
            data?: any;
            message?: string;
            [key: string]: any;
        }>(
            "transfer/bids",
            {
                player_instance_uuid,
                club_id,
                bid_amount,
                weekly_wage_offer,
                ...(expires_at && { expires_at }),
                ...(notes && { notes }),
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        if (!ok) {
            return NextResponse.json(
                { message: data.message || "Failed to place bid", success: false },
                { status },
            );
        }

        return NextResponse.json({
            bid: data.bid || data.data || data,
            message: data.message || "Bid placed successfully",
            success: true,
        });
    } catch (error) {
        console.error("Place bid error:", error);
        return NextResponse.json(
            { message: "Something went wrong.", success: false },
            { status: 500 },
        );
    }
}
