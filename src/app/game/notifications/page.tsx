"use client";

import { useState } from "react";

import { Bell, ChevronDown, Filter, MailOpen } from "lucide-react";

import NotificationsList from "@/components/pages/notifications/list";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { notifications } from "@/mock/notifications";
import { INotification } from "@/types/common";

export default function NotificationsPage() {
  const [notificationsList, setNotificationsList] =
    useState<INotification[]>(notifications);
  const unreadCount = notificationsList.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotificationsList(
      notificationsList.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotificationsList(
      notificationsList.map((notification) => ({
        ...notification,
        read: true,
      })),
    );
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Notifications</h1>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="ml-2">
              {unreadCount} new
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            <MailOpen className="mr-2 h-4 w-4" />
            Mark all as read
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>All notifications</DropdownMenuItem>
              <DropdownMenuItem>Unread only</DropdownMenuItem>
              <DropdownMenuItem>Match notifications</DropdownMenuItem>
              <DropdownMenuItem>Transfer notifications</DropdownMenuItem>
              <DropdownMenuItem>Messages</DropdownMenuItem>
              <DropdownMenuItem>System updates</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs defaultValue="all" className="mt-6">
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="matches">Matches</TabsTrigger>
          <TabsTrigger value="transfers">Transfers</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>All Notifications</CardTitle>
              <CardDescription>
                You have {unreadCount} unread notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <NotificationsList list={notifications} markAsRead={markAsRead} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="matches" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Match Notifications</CardTitle>
              <CardDescription>
                Updates about your upcoming and past matches
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <NotificationsList list={notifications} markAsRead={markAsRead} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="transfers" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Transfer Notifications</CardTitle>
              <CardDescription>
                Updates about player transfers and offers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <NotificationsList list={notifications} markAsRead={markAsRead} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="system" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>System Notifications</CardTitle>
              <CardDescription>
                Game updates and system announcements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <NotificationsList list={notifications} markAsRead={markAsRead} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
