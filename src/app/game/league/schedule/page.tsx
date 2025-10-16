"use client";

import type React from "react";
import { useState } from "react";

import PageTitle from "@/components/common/page-title";
import MatchReport from "@/components/pages/league/match-report";
import RecentMatchResults from "@/components/pages/league/recent-match-results";
import SeasonCalendar from "@/components/pages/league/season-calendar";
import SeasonOverview from "@/components/pages/league/season-overview";
import UpcomingFixtures from "@/components/pages/league/upcoming-fixtures";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { internalApi } from "@/lib/api/internal";
import { calendarEvents } from "@/mock/schedule";
import { ICalendarEvent, IMatch } from "@/types/common";
import { useQuery } from "@tanstack/react-query";

export default function SchedulePage() {
  const [selectedMatch, setSelectedMatch] = useState<IMatch | null>(null);
  const [eventFilters, setEventFilters] = useState({
    match: true,
    contract: true,
    transfer: true,
    loan: true,
    other: true,
  });

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["my-team-players"],
    queryFn: async () => {
      const res = await internalApi.get("/league/schedule");
      return res.data?.data || [];
    },
  });

  const toggleEventFilter = (type: keyof typeof eventFilters) => {
    setEventFilters({
      ...eventFilters,
      [type]: !eventFilters[type],
    });
  };

  const filteredEvents = calendarEvents.filter(
    (event) => eventFilters[event.type],
  );

  // Group events by month
  const groupedEvents = filteredEvents.reduce(
    (acc, event) => {
      const month = event.date.split(",")[0]; // "Mar 15, 2025" -> "Mar 15"
      if (!acc[month]) {
        acc[month] = [];
      }
      acc[month].push(event);
      return acc;
    },
    {} as Record<string, ICalendarEvent[]>,
  );

  return (
    <>
      <PageTitle title="League Schedule" />

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
