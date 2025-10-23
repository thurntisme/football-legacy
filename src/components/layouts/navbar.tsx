"use client";

import Logo from "../common/logo";
import { ThemeToggle } from "../common/theme-toggle";

import { OnlineStatus } from "@/components/common/online-status";
import { useIsMobile } from "@/hooks/use-mobile";

import MobileNav from "./mobile-nav";
import TopNav from "./top-nav";
import UserNav from "./user-nav";

export default function Navbar() {
  const isMobile = useIsMobile();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-1">
      <div className="container flex h-14 items-center mx-auto px-4">
        <Logo />

        {isMobile ? <MobileNav /> : <TopNav />}

        <div className="ml-auto flex items-center space-x-1">
          <OnlineStatus iconOnly={isMobile} size="sm" />
          <ThemeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
