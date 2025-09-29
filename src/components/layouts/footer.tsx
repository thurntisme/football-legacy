"use client";

import { useState } from "react";

import {
  Bell,
  ChevronDown,
  ChevronUp,
  CircleDollarSign,
  Coins,
  CreditCard,
  HelpCircle,
  LogOut,
  Mail,
  MessageSquare,
  Settings,
  Shield,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GUEST_USER } from "@/constants/guest-user";
import { FOOTBALL_STATS_URL } from "@/constants/site";
import { getGuestData } from "@/lib/user";
import { cn, convertNumberWithSeparator } from "@/lib/utils";

export default function Footer() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [messages, setMessages] = useState(2);
  const userData = getGuestData();

  if (pathname === "/" || pathname?.startsWith("/auth/")) {
    return null;
  }

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-background border-t z-[30]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? (
                <ChevronDown className="h-4 w-4 mr-1" />
              ) : (
                <ChevronUp className="h-4 w-4 mr-1" />
              )}
              {expanded ? "Hide Details" : "Show Details"}
            </Button>
          </div>

          <div className="flex items-center gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage
                      src="/placeholder.svg?height=32&width=32"
                      alt="User"
                    />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline-block">
                    {GUEST_USER.fullname ?? ""}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link
                    href={`${FOOTBALL_STATS_URL}/payment`}
                    className="flex items-center"
                  >
                    <CreditCard className="mr-4 h-4 w-4" />
                    <span>Payment</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href={`${FOOTBALL_STATS_URL}/settings`}
                    className="flex items-center"
                  >
                    <Settings className="mr-4 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div
          className={cn(
            "grid grid-cols-1 md:grid-cols-4 gap-4 py-4 transition-all duration-300 overflow-hidden",
            expanded ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0 py-0",
          )}
        >
          <div>
            <h3 className="text-sm font-medium mb-2">User Info</h3>
            <div className="space-y-1.5 text-sm">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>{GUEST_USER.fullname ?? ""}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{GUEST_USER.email ?? ""}</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <span>Premium Member</span>
              </div>
              <div className="flex items-center gap-2">
                <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
                <span>
                  {convertNumberWithSeparator(GUEST_USER.budget ?? 0)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Coins className="h-4 w-4 text-muted-foreground" />
                <span>{convertNumberWithSeparator(GUEST_USER.coin ?? 0)}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Quick Actions</h3>
            <div className="space-y-1">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
              >
                <Link
                  href={`${FOOTBALL_STATS_URL}/chat`}
                  className="flex items-center w-full"
                >
                  <MessageSquare className="h-4 w-4 mr-4" />
                  <span>Messages</span>
                  {messages > 0 && (
                    <Badge className="ml-auto">{messages}</Badge>
                  )}
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
              >
                <Link
                  href={`${FOOTBALL_STATS_URL}/game/notifications`}
                  className="flex items-center w-full"
                >
                  <Bell className="h-4 w-4 mr-4" />
                  <span>Notifications</span>
                  {notifications > 0 && (
                    <Badge className="ml-auto">{notifications}</Badge>
                  )}
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
              >
                <Link
                  href={`${FOOTBALL_STATS_URL}/settings`}
                  className="flex items-center w-full"
                >
                  <Settings className="h-4 w-4 mr-4" />
                  <span>Settings</span>
                </Link>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Support</h3>
            <div className="space-y-1">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
              >
                <Link
                  href={`${FOOTBALL_STATS_URL}/support`}
                  className="flex items-center w-full"
                >
                  <HelpCircle className="h-4 w-4 mr-4" />
                  <span>Ticket Support</span>
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
              >
                <Link
                  href={`${FOOTBALL_STATS_URL}/feedback`}
                  className="flex items-center w-full"
                >
                  <Mail className="h-4 w-4 mr-4" />
                  <span>Feedback</span>
                </Link>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Game Info</h3>
            <div className="space-y-1 text-sm">
              <div className="flex items-center justify-between">
                <span>Version:</span>
                <span className="text-muted-foreground">v1.2.4</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Last Login:</span>
                <span className="text-muted-foreground">Today, 10:45 AM</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Server:</span>
                <Badge variant="outline" className="text-xs">
                  Europe-West
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Status:</span>
                <Badge
                  variant="outline"
                  className="bg-green-100 text-green-800 text-xs"
                >
                  Online
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
