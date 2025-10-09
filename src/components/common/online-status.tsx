"use client";

import { useEffect, useState } from "react";

import { Wifi, WifiOff } from "lucide-react";

import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface OnlineStatusProps {
  showToast?: boolean;
  iconOnly?: boolean;
  size?: "sm" | "md" | "lg";
}

export function OnlineStatus({
  showToast = true,
  iconOnly = false,
  size = "md",
}: OnlineStatusProps) {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      if (showToast) {
        toast({
          title: "You're back online",
          description: "Your connection has been restored.",
          variant: "default",
        });
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      if (showToast) {
        toast({
          title: "You're offline",
          description: "Please check your internet connection.",
          variant: "destructive",
        });
      }
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [showToast]);

  const sizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  return (
    <div
      className={cn(
        "flex items-center gap-1.5",
        isOnline
          ? "text-green-600 dark:text-green-500"
          : "text-red-600 dark:text-red-500",
        sizeClasses[size],
      )}
    >
      {isOnline ? (
        <Wifi className={iconSizes[size]} />
      ) : (
        <WifiOff className={iconSizes[size]} />
      )}
      {!iconOnly && (
        <span className="font-medium">{isOnline ? "Online" : "Offline"}</span>
      )}
    </div>
  );
}
