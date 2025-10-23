import ConfirmDialog from "../common/confirm-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import React from "react";

import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { userItems } from "@/constants/nav-items";
import { toast } from "@/hooks/use-toast";
import { internalApi } from "@/lib/api/internal";

type Props = {};

const UserNav = (props: Props) => {
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      const res = await internalApi.post("/auth/logout");

      if (res.data.success) {
        toast({
          title: "Success",
          description: "You have been logged out successfully.",
        });

        window.location.reload();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-7 w-7">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
            <AvatarFallback>AM</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        {userItems.map((item) => {
          const Icon = item.icon;
          return (
            <DropdownMenuItem
              key={item.href}
              asChild
              className={
                pathname === `/${item.href}` ? "bg-primary/10 font-medium" : ""
              }
            >
              <Link
                href={`/${item.href}`}
                className="flex items-center cursor-pointer gap-2"
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            </DropdownMenuItem>
          );
        })}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <ConfirmDialog title="Confirm Logout" onConfirm={handleLogout}>
            <span className="flex items-center cursor-pointer px-2 py-1.5 text-sm">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </span>
          </ConfirmDialog>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNav;
