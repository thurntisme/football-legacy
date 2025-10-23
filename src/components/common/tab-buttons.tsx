"use client";

import React from "react";

import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { FOOTBALL_STATS_URL } from "@/constants/site";

type Props = {
  list: Item[];
};

type Item = {
  href: string;
  label: string;
  icon: LucideIcon;
};

const TabButtons = ({ list }: Props) => {
  const pathname = usePathname();
  if (!list.length) return null;

  return (
    <div
      className={`grid grid-cols-${list.length} rounded-md bg-muted p-1 mb-2`}
    >
      {list.map((item, index) => {
        const Icon = item.icon;
        const linkClass = pathname === item.href ? "bg-white" : "opacity-50";
        return (
          <Link
            href={`${FOOTBALL_STATS_URL}${item.href}`}
            key={index}
            className={`flex items-center justify-center gap-2 rounded-sm px-3 py-1.5 text-sm font-medium ${linkClass}`}
          >
            <Icon className="w-4 h-4" />
            <div className="text-sm">{item.label}</div>
          </Link>
        );
      })}
    </div>
  );
};

export default TabButtons;
