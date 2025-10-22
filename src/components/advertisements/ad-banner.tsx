"use client";

import { useEffect, useState } from "react";

import { X } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { FOOTBALL_STATS_URL } from "@/constants/site";

interface AdBannerProps {
  position?: "top" | "bottom";
  isVisible: boolean;
}

export function AdBanner({ position = "top", isVisible }: AdBannerProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(isVisible);
  }, [isVisible]);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className={`w-full bg-primary/5 border-b py-2 px-4 ${position === "bottom" ? "border-t" : "border-b"}`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <div className="bg-primary/10 p-2 rounded-md hidden sm:block">
            <span className="text-xs font-medium text-primary">AD</span>
          </div>
          <div>
            <p className="text-sm font-medium">
              Upgrade to Pro for an ad-free experience and premium features!
            </p>
            <p className="text-xs text-muted-foreground hidden sm:block">
              Get access to advanced scouting, detailed analytics, and more.
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button size="sm" variant="outline" asChild>
            <Link href={`${FOOTBALL_STATS_URL}/user/payment`}>Upgrade Now</Link>
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={handleClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
