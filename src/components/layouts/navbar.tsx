"use client";

import {
  Building,
  Calendar,
  CreditCard,
  Dumbbell,
  HelpCircle,
  Home,
  Landmark,
  LogOut,
  Menu,
  MessageSquare,
  Newspaper,
  Package,
  Search,
  Settings,
  ShoppingCart,
  Trophy,
  Users,
  Wifi,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { guestUser } from "@/constants/guest-user";
import { FOOTBALL_PATH, FOOTBALL_STATS_URL } from "@/constants/site";
import { useIsMobile } from "@/hooks/use-mobile";
import { internalApi } from "@/lib/api/internal";
import { getGuestData, removeGuestData } from "@/lib/user";

import { OnlineStatus } from "../online-status";
import { ThemeToggle } from "../theme-toggle";

export default function Navbar() {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const router = useRouter();
  const userData = getGuestData();

  // Hide navbar on auth pages
  if (pathname === "/" || pathname?.startsWith("/auth/")) {
    return null;
  }

  // Update the navItems array to include Development and Youth Academy
  const navItems = [
    {
      href: "dashboard",
      label: "Dashboard",
      icon: <Home className="h-4 w-4 mr-2" />,
    },
    { href: "team", label: "Team", icon: <Users className="h-4 w-4 mr-2" /> },
    {
      href: "club",
      label: "Club",
      icon: <Building className="h-4 w-4 mr-2" />,
    },
    {
      href: "stadium",
      label: "Stadium",
      icon: <Landmark className="h-4 w-4 mr-2" />,
    },
    {
      href: "schedule",
      label: "Schedule",
      icon: <Calendar className="h-4 w-4 mr-2" />,
    },
    {
      href: "market",
      label: "Market",
      icon: <ShoppingCart className="h-4 w-4 mr-2" />,
    },
    {
      href: "scouting",
      label: "Scouting",
      icon: <Search className="h-4 w-4 mr-2" />,
    },
    {
      href: "training",
      label: "Training",
      icon: <Dumbbell className="h-4 w-4 mr-2" />,
    },
    {
      href: "youth-academy",
      label: "Youth Academy",
      icon: <Users className="h-4 w-4 mr-2" />,
    },
    {
      href: "online-match",
      label: "Online",
      icon: <Wifi className="h-4 w-4 mr-2" />,
    },
    {
      href: "news",
      label: "News",
      icon: <Newspaper className="h-4 w-4 mr-2" />,
    },
    {
      href: "items",
      label: "Items",
      icon: <Package className="h-4 w-4 mr-2" />,
    },
  ];

  const handleLogout = async () => {
    const res = await internalApi.post("/football/auth/logout", {
      email: userData.email,
    });
    if (res.data.success) {
      removeGuestData();

      // Redirect to dashboard
      router.push(`${FOOTBALL_STATS_URL}/auth/signin`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-1">
      <div className="container flex h-14 items-center mx-auto px-4">
        <div className="mr-4 flex">
          <Link
            href={`${FOOTBALL_STATS_URL}/dashboard`}
            className="flex items-center space-x-2"
          >
            <Trophy className="mr-2 h-6 w-6" />
            <span className="text-xl font-bold">Football Manager</span>
          </Link>
        </div>

        {isMobile ? (
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
                  {navItems.map((item) => (
                    <Button
                      key={item.href}
                      variant={pathname === item.href ? "default" : "ghost"}
                      className="w-full justify-start"
                      size="sm"
                      asChild
                    >
                      <Link href={`${FOOTBALL_STATS_URL}/${item.href}`}>
                        {item.icon}
                        {item.label}
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <nav className="flex items-center space-x-1 ml-auto">
            {/* Show primary nav items directly */}
            {navItems.slice(0, 5).map((item) => (
              <Button
                key={item.href}
                variant={
                  pathname === `${FOOTBALL_PATH}/${item.href}`
                    ? "default"
                    : "ghost"
                }
                size="sm"
                className="text-xs md:text-sm"
                asChild
              >
                <Link
                  href={`${FOOTBALL_STATS_URL}/${item.href}`}
                  className="flex items-center"
                >
                  {item.icon}
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              </Button>
            ))}

            {/* Put remaining items in a dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs md:text-sm"
                >
                  <Menu className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">More</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {navItems.slice(5).map((item) => (
                  <DropdownMenuItem
                    key={item.href}
                    asChild
                    className={
                      pathname === `${FOOTBALL_PATH}/${item.href}`
                        ? "bg-primary/10 font-medium"
                        : ""
                    }
                  >
                    <Link
                      href={`${FOOTBALL_STATS_URL}/${item.href}`}
                      className="flex items-center cursor-pointer"
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        )}

        <div className="ml-auto flex items-center space-x-1">
          <OnlineStatus iconOnly={isMobile} size="sm" />
          <ThemeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-7 w-7">
                  <AvatarImage
                    src="/placeholder.svg?height=32&width=32"
                    alt="User"
                  />
                  <AvatarFallback>AM</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {guestUser.fullname ?? ""}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {guestUser.email ?? ""}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                asChild
                className={
                  pathname === `${FOOTBALL_PATH}/settings`
                    ? "bg-primary/10 font-medium"
                    : ""
                }
              >
                <Link
                  href={`${FOOTBALL_STATS_URL}/settings`}
                  className="flex items-center"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className={
                  pathname === `${FOOTBALL_PATH}/payment`
                    ? "bg-primary/10 font-medium"
                    : ""
                }
              >
                <Link
                  href={`${FOOTBALL_STATS_URL}/payment`}
                  className="flex items-center"
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Payment</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className={
                  pathname === `${FOOTBALL_PATH}/support`
                    ? "bg-primary/10 font-medium"
                    : ""
                }
              >
                <Link
                  href={`${FOOTBALL_STATS_URL}/support`}
                  className="flex items-center"
                >
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Ticket Support</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className={
                  pathname === `${FOOTBALL_PATH}/feedback`
                    ? "bg-primary/10 font-medium"
                    : ""
                }
              >
                <Link
                  href={`${FOOTBALL_STATS_URL}/feedback`}
                  className="flex items-center"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  <span>Feedback</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <span className="flex items-center" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
