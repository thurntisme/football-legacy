"use client";

import type React from "react";
import { useState } from "react";

import {
  AlertCircle,
  ArrowLeft,
  DollarSign,
  FileText,
  Trophy,
  Users,
} from "lucide-react";
import Link from "next/link";

import PageTitle from "@/components/common/page-title";
import MatchReport from "@/components/match-report";
import RecentMatchResults from "@/components/recent-match-results";
import SeasonCalendar from "@/components/season-calendar";
import SeasonOverview from "@/components/season-overview";
import UpcomingFixtures from "@/components/upcoming-fixtures";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FOOTBALL_STATS_URL } from "@/constants/site";
import { ICalendarEvent, IMatch } from "@/types/football/common";

export default function SchedulePage() {
  const [selectedMatch, setSelectedMatch] = useState<IMatch | null>(null);
  const [eventFilters, setEventFilters] = useState({
    match: true,
    contract: true,
    transfer: true,
    loan: true,
    other: true,
  });

  // Calendar events data
  const calendarEvents: ICalendarEvent[] = [
    // March 2025
    {
      id: 1,
      date: "Mar 15, 2025",
      type: "match",
      title: "vs Wanderers",
      description: "Premier League • Home",
      icon: <Trophy className="h-4 w-4 text-primary" />,
      badge: "Match",
      badgeVariant: "default",
    },
    {
      id: 2,
      date: "Mar 18, 2025",
      type: "match",
      title: "at Paris SC",
      description: "Champions League • Away",
      icon: <Trophy className="h-4 w-4 text-primary" />,
      badge: "Match",
      badgeVariant: "default",
    },
    {
      id: 3,
      date: "Mar 22, 2025",
      type: "match",
      title: "vs City FC",
      description: "Premier League • Home",
      icon: <Trophy className="h-4 w-4 text-primary" />,
      badge: "Match",
      badgeVariant: "default",
    },
    {
      id: 4,
      date: "Mar 25, 2025",
      type: "contract",
      title: "Contract Expiry: James Wilson",
      description: "Player contract expires in 30 days",
      icon: <FileText className="h-4 w-4 text-amber-500" />,
      badge: "Contract",
      badgeVariant: "outline",
    },
    {
      id: 5,
      date: "Mar 31, 2025",
      type: "transfer",
      title: "Transfer Window Opens",
      description: "Summer transfer window begins",
      icon: <DollarSign className="h-4 w-4 text-green-500" />,
      badge: "Transfer",
      badgeVariant: "secondary",
    },

    // April 2025
    {
      id: 6,
      date: "Apr 2, 2025",
      type: "match",
      title: "vs Athletic FC",
      description: "FA Cup • Home",
      icon: <Trophy className="h-4 w-4 text-primary" />,
      badge: "Match",
      badgeVariant: "default",
    },
    {
      id: 7,
      date: "Apr 5, 2025",
      type: "match",
      title: "vs United FC",
      description: "Premier League • Home",
      icon: <Trophy className="h-4 w-4 text-primary" />,
      badge: "Match",
      badgeVariant: "default",
    },
    {
      id: 8,
      date: "Apr 10, 2025",
      type: "loan",
      title: "Loan Return: Alex Turner",
      description: "Player returns from loan at Eastern Town",
      icon: <Users className="h-4 w-4 text-blue-500" />,
      badge: "Loan",
      badgeVariant: "outline",
    },
    {
      id: 9,
      date: "Apr 15, 2025",
      type: "contract",
      title: "Contract Renewal: Michael Brown",
      description: "Last day to trigger contract extension",
      icon: <FileText className="h-4 w-4 text-amber-500" />,
      badge: "Contract",
      badgeVariant: "outline",
    },
    {
      id: 10,
      date: "Apr 20, 2025",
      type: "match",
      title: "at Northern FC",
      description: "Premier League • Away",
      icon: <Trophy className="h-4 w-4 text-primary" />,
      badge: "Match",
      badgeVariant: "default",
    },
    {
      id: 11,
      date: "Apr 25, 2025",
      type: "other",
      title: "Youth Intake Day",
      description: "New youth players join the academy",
      icon: <AlertCircle className="h-4 w-4 text-purple-500" />,
      badge: "Youth",
      badgeVariant: "outline",
    },

    // May 2025
    {
      id: 12,
      date: "May 3, 2025",
      type: "match",
      title: "vs Eastern Town",
      description: "Premier League • Home",
      icon: <Trophy className="h-4 w-4 text-primary" />,
      badge: "Match",
      badgeVariant: "default",
    },
    {
      id: 13,
      date: "May 10, 2025",
      type: "match",
      title: "at Albion United",
      description: "Premier League • Away",
      icon: <Trophy className="h-4 w-4 text-primary" />,
      badge: "Match",
      badgeVariant: "default",
    },
    {
      id: 14,
      date: "May 15, 2025",
      type: "contract",
      title: "Contract Expiry: Sam Wilson",
      description: "Player contract expires in 15 days",
      icon: <FileText className="h-4 w-4 text-amber-500" />,
      badge: "Contract",
      badgeVariant: "outline",
    },
    {
      id: 15,
      date: "May 18, 2025",
      type: "match",
      title: "vs Rovers SC",
      description: "Premier League • Home (Final Match)",
      icon: <Trophy className="h-4 w-4 text-primary" />,
      badge: "Match",
      badgeVariant: "default",
    },
    {
      id: 16,
      date: "May 31, 2025",
      type: "transfer",
      title: "Transfer Window Closes",
      description: "Summer transfer window ends",
      icon: <DollarSign className="h-4 w-4 text-red-500" />,
      badge: "Transfer",
      badgeVariant: "destructive",
    },
  ];

  const toggleEventFilter = (type: keyof typeof eventFilters) => {
    setEventFilters({
      ...eventFilters,
      [type]: !eventFilters[type],
    });
  };

  const filteredEvents = calendarEvents.filter(
    (event) => eventFilters[event.type]
  );

  // Group events by month
  const groupedEvents = filteredEvents.reduce((acc, event) => {
    const month = event.date.split(",")[0]; // "Mar 15, 2025" -> "Mar 15"
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(event);
    return acc;
  }, {} as Record<string, ICalendarEvent[]>);

  return (
    <>
      <PageTitle title="Team Schedule" />

      <SeasonOverview />

      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-6">
          <UpcomingFixtures />
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          <RecentMatchResults setSelectedMatch={setSelectedMatch} />
        </TabsContent>

        <TabsContent value="calendar" className="space-y-6">
          <SeasonCalendar
            eventFilters={eventFilters}
            toggleEventFilter={toggleEventFilter}
            groupedEvents={groupedEvents}
            setEventFilters={setEventFilters}
          />
        </TabsContent>
      </Tabs>

      <MatchReport
        selectedMatch={selectedMatch}
        setSelectedMatch={setSelectedMatch}
      />
    </>
  );
}
