"use client";

import type React from "react";
import { useState } from "react";

import { ListOrdered } from "lucide-react";
import Link from "next/link";

import ContentWrapper from "@/components/common/content-wrapper";
import PageTitle from "@/components/common/page-title";
import MatchReport from "@/components/pages/league/match-report";
import RecentMatchResults from "@/components/pages/league/recent-match-results";
import SeasonOverview from "@/components/pages/league/season-overview";
import UpcomingFixtures from "@/components/pages/league/upcoming-fixtures";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FOOTBALL_STATS_URL } from "@/constants/site";
import { internalApi } from "@/lib/api/internal";
import { IMatch } from "@/types/common";
import { useQuery } from "@tanstack/react-query";

export default function SchedulePage() {
  const [selectedMatch, setSelectedMatch] = useState<IMatch | null>(null);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["league-schedule"],
    queryFn: async () => {
      const res = await internalApi.get("/league/schedule");
      return res.data?.data || [];
    },
  });

  return (
    <>
      <PageTitle title="League Schedule">
        <Button variant="outline" asChild>
          <Link href={`${FOOTBALL_STATS_URL}/game/league/standing`}>
            <ListOrdered className="h-4 w-4" />
            Standing
          </Link>
        </Button>
      </PageTitle>

      <ContentWrapper isLoading={isLoading} error={error} onRefetch={refetch}>
        <>
          <SeasonOverview league={data?.league} />

          <Tabs defaultValue="upcoming" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-6">
              <UpcomingFixtures matches={data?.schedule?.upcoming || []} />
            </TabsContent>

            <TabsContent value="results" className="space-y-6">
              <RecentMatchResults
                matches={data?.schedule?.result || []}
                setSelectedMatch={setSelectedMatch}
              />
            </TabsContent>
          </Tabs>

          <MatchReport
            selectedMatch={selectedMatch}
            setSelectedMatch={setSelectedMatch}
          />
        </>
      </ContentWrapper>
    </>
  );
}
