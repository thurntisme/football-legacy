import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import React from "react";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { navItems } from "@/constants/nav-items";
import { FOOTBALL_STATS_URL } from "@/constants/site";

type Props = {};

const TopNav = (props: Props) => {
  const pathname = usePathname();

  return (
    <nav className="flex items-center space-x-1 ml-auto">
      {navItems.slice(0, 5).map((item) => {
        const Icon = item.icon;
        return (
          <Button
            key={item.href}
            variant={
              pathname === `${FOOTBALL_STATS_URL}/${item.href}`
                ? "default"
                : "ghost"
            }
            size="sm"
            className="text-xs md:text-sm"
            asChild
          >
            {item.children ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs md:text-sm"
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {item.children.map((child) => {
                    const ChildIcon = child.icon;
                    return (
                      <DropdownMenuItem
                        key={child.href}
                        asChild
                        className={
                          pathname ===
                          `${FOOTBALL_STATS_URL}/${item.href}/${child.href}`
                            ? "bg-primary/10 font-medium"
                            : ""
                        }
                      >
                        <Link
                          href={`${FOOTBALL_STATS_URL}/${item.href}/${child.href}`}
                          className="flex items-center cursor-pointer gap-2"
                        >
                          <ChildIcon className="w-4 h-4" />
                          {child.label}
                        </Link>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href={`${FOOTBALL_STATS_URL}/${item.href}`}
                className="flex items-center gap-0"
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            )}
          </Button>
        );
      })}

      {/* Put remaining items in a dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="text-xs md:text-sm">
            <Menu className="h-4 w-4" />
            <span className="hidden sm:inline">More</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {navItems.slice(5).map((item) => {
            const Icon = item.icon;
            return (
              <DropdownMenuItem
                key={item.href}
                asChild
                className={
                  pathname === `${FOOTBALL_STATS_URL}/${item.href}`
                    ? "bg-primary/10 font-medium"
                    : ""
                }
              >
                <Link
                  href={`${FOOTBALL_STATS_URL}/${item.href}`}
                  className="flex items-center cursor-pointer gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default TopNav;
