"use client";

import { useEffect, useState } from "react";

import { ArrowRight, Clock, Users, Wifi } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FOOTBALL_STATS_URL } from "@/constants/site";

export default function OnlineMatchWidget() {
  const [onlineCount, setOnlineCount] = useState(0);
  const [lastMatch, setLastMatch] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading data
  useEffect(() => {
    const loadData = async () => {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock data
      setOnlineCount(12);
      setLastMatch({
        opponent: "Sarah Coach",
        opponentTeam: "Chelsea FC",
        result: "win",
        score: "2-0",
        date: "2023-03-22",
      });

      setIsLoading(false);
    };

    loadData();

    // Update online count periodically
    const interval = setInterval(() => {
      setOnlineCount((prev) => {
        const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
        return Math.max(8, Math.min(20, prev + change)); // Keep between 8 and 20
      });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Online Matches
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-24 flex items-center justify-center">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-muted h-10 w-10"></div>
              <div className="flex-1 space-y-2 py-1">
                <div className="h-2 bg-muted rounded"></div>
                <div className="h-2 bg-muted rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Users className="h-5 w-5 mr-2" />
          Online Matches
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Badge variant="outline" className="mr-2">
                <Wifi className="h-3 w-3 mr-1 text-green-500" />
                <span className="text-sm">{onlineCount} Managers Online</span>
              </Badge>
              <Badge variant="outline">
                <Clock className="h-3 w-3 mr-1" />
                <span className="text-sm">Active Now</span>
              </Badge>
            </div>
          </div>

          {lastMatch && (
            <div className="border rounded-md p-3">
              <h4 className="text-sm font-medium mb-2">Your Last Match</h4>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage
                      src="/placeholder.svg?height=32&width=32"
                      alt="Your Team"
                    />
                    <AvatarFallback>YT</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium mr-2">
                        Your Team
                      </span>
                      <Badge
                        variant={
                          lastMatch.result === "win"
                            ? "default"
                            : lastMatch.result === "loss"
                              ? "destructive"
                              : "outline"
                        }
                        className="text-xs"
                      >
                        {lastMatch.result === "win"
                          ? "Win"
                          : lastMatch.result === "loss"
                            ? "Loss"
                            : "Draw"}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {lastMatch.date}
                    </div>
                  </div>
                </div>

                <div className="text-lg font-bold">{lastMatch.score}</div>

                <div className="text-right">
                  <div className="text-sm font-medium">
                    {lastMatch.opponentTeam}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {lastMatch.opponent}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`${FOOTBALL_STATS_URL}/game/online-match`}>
            Play Online Match
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
