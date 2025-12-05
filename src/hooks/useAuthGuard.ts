"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAppSelector } from "@/store/hooks";

/**
 * Hook to protect routes from unauthenticated access
 * Redirects to /auth/signin if user is not authenticated on non-public pages
 */
export function useAuthGuard() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Define public pages that don't require authentication
    const isPublicPage =
      pathname === "/" ||
      pathname?.startsWith("/auth/");

    // If not a public page and user is not authenticated, redirect to signin
    if (!isPublicPage && !user && !isAuthenticated) {
      router.push("/auth/signin");
    }
  }, [user, isAuthenticated, pathname, router]);

  return { user, isAuthenticated };
}
