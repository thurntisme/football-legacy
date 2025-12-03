"use client";

import { useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";

export function LogoutButton() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoading } = useAppSelector((state) => state.auth);

  const handleLogout = async () => {
    const result = await dispatch(logout());

    if (logout.fulfilled.match(result)) {
      router.push("/auth/signin");
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
    >
      {isLoading ? "Logging out..." : "Logout"}
    </button>
  );
}
