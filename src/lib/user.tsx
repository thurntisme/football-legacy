import { AlertCircle, CheckCircle, Clock } from "lucide-react";

import { LOCALSTORAGE_GUEST_USER } from "@/constants/football/guest-user";
import { IGuestUser } from "@/types/football/guest-user";

export const isGuestExpired = () => {
  const data: any = {};
  if (!data.expire_time) return false;

  const now = new Date();
  const expire = new Date(data.expire_time);
  return now < expire;
};

export const storeGuestData = (user: IGuestUser) => {
  const now = new Date();
  const expire = new Date(now);
  expire.setDate(now.getDate() + 1);

  const guestUser = {
    user_uuid: crypto.randomUUID(),
    created_at: now.toISOString(),
    last_active_at: now.toISOString(),
    expire_time: expire.toISOString(),
    trial_data: {
      step: 0,
      preferences: {},
      answers: [],
    },
    user_data: { ...user },
  };
};

export const getGuestData = () => {
  const data: any = {};
  return data?.user_data || {};
};

export const removeGuestData = () => {};

export const getTicketStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    "in-progress": "bg-yellow-50 text-yellow-700 border-yellow-200",
    resolved: "bg-green-50 text-green-700 border-green-200",
    urgent: "bg-red-50 text-red-700 border-red-200",
  };
  return colors[status] || "bg-gray-50 text-gray-700 border-gray-200";
};

export const getTicketStatusIcon = (status: string) => {
  switch (status) {
    case "in-progress":
      return <Clock className="h-3 w-3 mr-1" />;
    case "resolved":
      return <CheckCircle className="h-3 w-3 mr-1" />;
    case "urgent":
      return <AlertCircle className="h-3 w-3 mr-1" />;
    default:
      return null;
  }
};

export const getFeedbackRewardIcon = (type: string) => {
  switch (type) {
    case "coins":
      return "🪙";
    case "pack":
      return "📦";
    case "player-card":
      return "🎴";
    case "item":
      return "⭐";
    case "premium-pass":
      return "👑";
    default:
      return "🎁";
  }
};
