"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { apiClient } from "@/lib/api/api";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUser } from "@/store/slices/authSlice";

function isPublicPage(pathname: string | null): boolean {
  if (!pathname) return false;
  return pathname === '/' || pathname.startsWith('/auth/');
}

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAppSelector((state) => state.auth);
  const [isChecking, setIsChecking] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      // Skip auth check on public pages
      if (isPublicPage(pathname)) {
        setIsChecking(false);
        setAuthChecked(true);
        return;
      }

      // Only check if user is not already loaded
      if (user) {
        setIsChecking(false);
        setAuthChecked(true);
        return;
      }

      try {
        const response = await apiClient.get("/api/auth/me");
        
        if (response.data.success && response.data.user) {
          dispatch(setUser(response.data.user));
          setAuthChecked(true);
        } else {
          dispatch(setUser(null));
          setAuthChecked(true);
          // Redirect to signin if not authenticated on protected page
          router.push("/auth/signin");
        }
      } catch (error) {
        // User is not authenticated
        dispatch(setUser(null));
        setAuthChecked(true);
        // Redirect to signin if not authenticated on protected page
        router.push("/auth/signin");
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [dispatch, pathname, user, router]);

  // Show loading only on protected pages while checking
  if (isChecking && !isPublicPage(pathname)) {
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
