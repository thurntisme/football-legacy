import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { externalApi } from "@/lib/api/externalApi";

export async function GET(request: NextRequest) {
    try {
        const token = cookies().get("token")?.value;

        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized", success: false },
                { status: 401 },
            );
        }

        // Get query parameters from URL
        const searchParams = request.nextUrl.searchParams;
        const page = searchParams.get("page") || "1";
        const limit = searchParams.get("limit") || "20";
        const position = searchParams.get("position") || "";
        const minPrice = searchParams.get("minPrice") || "";
        const maxPrice = searchParams.get("maxPrice") || "";
        const minRating = searchParams.get("minRating") || "";
        const maxRating = searchParams.get("maxRating") || "";
        const nationality = searchParams.get("nationality") || "";
        const search = searchParams.get("search") || "";

        // Build query string
        const queryParams = new URLSearchParams();
        queryParams.append("page", page);
        queryParams.append("limit", limit);
        if (position) queryParams.append("position", position);
        if (minPrice) queryParams.append("minPrice", minPrice);
        if (maxPrice) queryParams.append("maxPrice", maxPrice);
        if (minRating) queryParams.append("minRating", minRating);
        if (maxRating) queryParams.append("maxRating", maxRating);
        if (nationality) queryParams.append("nationality", nationality);
        if (search) queryParams.append("search", search);

        // Call external API to get user's listed players
        const { data, ok, status } = await externalApi.get<{
            players?: any[];
            data?: any[];
            total?: number;
            page?: number;
            limit?: number;
            [key: string]: any;
        }>(`transfer/bid-players?${queryParams.toString()}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!ok) {
            return NextResponse.json(
                { message: "Failed to fetch my listed players", success: false },
                { status },
            );
        }

        return NextResponse.json({
            players: data.players || data.data || data,
            total: data.total || 0,
            page: data.page || parseInt(page),
            limit: data.limit || parseInt(limit),
            success: true,
        });
    } catch (error) {
        console.error("Get my listed players error:", error);
        return NextResponse.json(
            { message: "Something went wrong.", success: false },
            { status: 500 },
        );
    }
}