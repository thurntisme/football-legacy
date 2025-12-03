"use client";

import { useEffect } from "react";

import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/slices/authSlice";

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/me");
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.user) {
            dispatch(setUser(data.user));
          }
        }
      } catch (error) {
        // User is not authenticated
        dispatch(setUser(null));
      }
    };

    checkAuth();
  }, [dispatch]);

  return <>{children}</>;
}
