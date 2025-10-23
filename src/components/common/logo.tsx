import React from "react";

import { Trophy } from "lucide-react";
import Link from "next/link";

import { APP_NAME, FOOTBALL_STATS_URL } from "@/constants/site";

type Props = {
  className?: string;
  mode?: Mode;
};

type Mode = "dark" | "light";

const Logo = ({ className, mode = "dark" }: Props) => {
  return (
    <Link
      href={FOOTBALL_STATS_URL}
      className={`flex items-center space-x-2 text-lg font-medium ${mode === "dark" ? "text-primary" : "text-white"} ${className}`}
    >
      <Trophy className="h-6 w-6" />
      <span className="ml-2 sm:block hidden">{APP_NAME}</span>
    </Link>
  );
};

export default Logo;
