"use client";

import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUser } from "@/store/slices/authSlice";

export function useAuth() {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading, error } = useAppSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    // Check if user is authenticated on mount
    const checkAuth = async () => {
      try {
        // You can add an API call here to verify the token and get user data
        // For now, we'll just check if there's a token in cookies
        const response = await fetch("/api/auth/me");
        if (response.ok) {
          const data = await response.json();
          dispatch(setUser(data.user));
        }
      } catch (error) {
        // Token is invalid or expired
        dispatch(setUser(null));
      }
    };

    checkAuth();
  }, [dispatch]);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
  };
}
