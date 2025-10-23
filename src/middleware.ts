import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { validateGuestToken } from "./constants/guest-user";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token || !validateGuestToken(token)) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/welcome/:path*",
    "/game/:path*",
    "/user/:path*",
  ],
};
