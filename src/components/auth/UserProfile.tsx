"use client";

import { useAppSelector } from "@/store/hooks";

export function UserProfile() {
  const { user, isAuthenticated, isLoading } = useAppSelector(
    (state) => state.auth,
  );

  if (isLoading) {
    return <div className="text-sm text-gray-500">Loading...</div>;
  }

  if (!isAuthenticated || !user) {
    return <div className="text-sm text-gray-500">Not logged in</div>;
  }

  return (
    <div className="flex items-center gap-3">
      <div className="text-sm">
        <p className="font-medium">{user.fullname}</p>
        <p className="text-gray-500">{user.email}</p>
      </div>
      <div className="text-xs">
        <p>💰 ${user.budget?.toLocaleString()}</p>
        <p>🪙 {user.coin} coins</p>
      </div>
    </div>
  );
}
