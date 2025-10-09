"use client";

import type React from "react";

import {
  ArrowUpRight,
  Banknote,
  Calendar,
  StickerIcon as Stadium,
  Star,
  Trophy,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getMonthName } from "@/lib/utils";
import { ClubEvents } from "@/mock/club";
import { HistoricalEvent } from "@/types/club";

export default function ClubHistory() {
  // Sort events by year (descending) and then by month if available
  const sortedEvents = [...ClubEvents].sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    return (b.month || 0) - (a.month || 0);
  });

  // Group events by decade
  const eventsByDecade: Record<string, HistoricalEvent[]> = {};

  sortedEvents.forEach((event) => {
    const decade = Math.floor(event.year / 10) * 10;
    const decadeKey = `${decade}s`;

    if (!eventsByDecade[decadeKey]) {
      eventsByDecade[decadeKey] = [];
    }

    eventsByDecade[decadeKey].push(event);
  });

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case "foundation":
        return "Foundation";
      case "trophy":
        return "Trophy";
      case "transfer":
        return "Transfer";
      case "manager":
        return "Management";
      case "stadium":
        return "Stadium";
      case "promotion":
        return "Promotion";
      case "relegation":
        return "Relegation";
      case "milestone":
        return "Milestone";
      default:
        return "Event";
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <Calendar className="h-8 w-8 text-blue-500 mb-2" />
            <h3 className="font-bold text-xl">{2023 - 1985}</h3>
            <p className="text-sm text-muted-foreground">Years of History</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <Trophy className="h-8 w-8 text-yellow-500 mb-2" />
            <h3 className="font-bold text-xl">
              {ClubEvents.filter((e) => e.type === "trophy").length}
            </h3>
            <p className="text-sm text-muted-foreground">Major Trophies</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <ArrowUpRight className="h-8 w-8 text-green-500 mb-2" />
            <h3 className="font-bold text-xl">
              {ClubEvents.filter((e) => e.type === "promotion").length}
            </h3>
            <p className="text-sm text-muted-foreground">Promotions</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <Stadium className="h-8 w-8 text-blue-500 mb-2" />
            <h3 className="font-bold text-xl">45,000</h3>
            <p className="text-sm text-muted-foreground">Stadium Capacity</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Club Timeline</CardTitle>
          <CardDescription>Key events in FC United's history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {Object.entries(eventsByDecade).map(([decade, decadeEvents]) => (
              <div key={decade} className="space-y-4">
                <h3 className="text-lg font-bold">{decade}</h3>
                <div className="space-y-6">
                  {decadeEvents.map((event, index) => (
                    <div key={event.id} className="relative pl-8 pb-6">
                      {/* Timeline connector */}
                      {index < decadeEvents.length - 1 && (
                        <div className="absolute left-[15px] top-[28px] bottom-0 w-[2px] bg-muted"></div>
                      )}

                      {/* Event dot */}
                      <div className="absolute left-0 top-1 w-[30px] h-[30px] rounded-full bg-muted flex items-center justify-center">
                        {event.icon}
                      </div>

                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-medium">{event.year}</span>
                          {event.month && (
                            <span className="text-muted-foreground text-sm">
                              {getMonthName(event.month)}
                            </span>
                          )}
                          <Badge variant="outline" className="ml-auto">
                            {getEventTypeLabel(event.type)}
                          </Badge>
                        </div>

                        <h4 className="font-medium">{event.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {event.description}
                        </p>

                        {event.details && (
                          <>
                            <Separator className="my-2" />
                            <p className="text-sm">{event.details}</p>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Club Records</CardTitle>
          <CardDescription>Notable achievements and statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-3">Team Records</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Highest League Finish:
                  </span>
                  <span className="font-medium">
                    1st (Premier League, 2023)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Most Goals in a Season:
                  </span>
                  <span className="font-medium">87 (2022/23)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Fewest Goals Conceded:
                  </span>
                  <span className="font-medium">28 (2022/23)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Longest Winning Streak:
                  </span>
                  <span className="font-medium">12 matches (2022/23)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Biggest Victory:
                  </span>
                  <span className="font-medium">7-0 vs Southampton (2021)</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">Individual Records</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Most Appearances:
                  </span>
                  <span className="font-medium">Steven Taylor (412)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    All-time Top Scorer:
                  </span>
                  <span className="font-medium">Mark Williams (156)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Most Goals in a Season:
                  </span>
                  <span className="font-medium">
                    Mark Williams (28, 2022/23)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Most Assists in a Season:
                  </span>
                  <span className="font-medium">
                    Chris Johnson (17, 2022/23)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Longest-serving Manager:
                  </span>
                  <span className="font-medium">
                    John Smith (11 years, 2012-present)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
