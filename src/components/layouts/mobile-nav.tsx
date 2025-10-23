import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

import React from "react";

import { Menu, Trophy } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { navItems } from "@/constants/nav-items";
import { FOOTBALL_STATS_URL } from "@/constants/site";

type Props = {};

const MobileNav = (props: Props) => {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="ml-auto">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[240px] sm:w-[300px]">
        <div className="flex flex-col space-y-4 py-4">
          <Link
            href={FOOTBALL_STATS_URL}
            className="flex items-center space-x-2"
          >
            <Trophy className="h-5 w-5" />
            <span className="font-bold">Football Manager</span>
          </Link>
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.href}
                  variant={pathname === item.href ? "default" : "ghost"}
                  className="w-full justify-start"
                  size="sm"
                  asChild
                >
                  <Link href={`${FOOTBALL_STATS_URL}/${item.href}`}>
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
