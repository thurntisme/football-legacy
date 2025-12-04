"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { apiClient } from "@/lib/api/api";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUser } from "@/store/slices/authSlice";

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const { user } = useAppSelector((state) => state.auth);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      // Skip auth check on public pages
      const isPublicPage =
        pathname === "/" ||
        pathname?.startsWith("/auth/") ||
        pathname?.startsWith("/welcome");

      if (isPublicPage) {
        setIsChecking(false);
        return;
      }

      // Only check if user is not already loaded
      if (user) {
        setIsChecking(false);
        return;
      }

      try {
        const response = await apiClient.get("/api/auth/me");
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.user) {
            dispatch(setUser(data.user));
          } else {
            dispatch(setUser(null));
          }
        } else {
          dispatch(setUser(null));
        }
      } catch (error) {
        // User is not authenticated
        dispatch(setUser(null));
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [dispatch, pathname, user]);

  // Show loading only on protected pages while checking
  if (isChecking && pathname && !pathname.startsWith("/auth/") && pathname !== "/" && !pathname.startsWith("/welcome")) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
