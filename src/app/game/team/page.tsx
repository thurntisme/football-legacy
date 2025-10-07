"use client";

import { ArrowLeft, BarChart, LayoutGrid, Rocket, Users } from "lucide-react";
import Link from "next/link";

import ContentWrapper from "@/components/common/content-wrapper";
import PageTitle from "@/components/common/page-title";
import TeamAnalytics from "@/components/pages/team/team-analytics";
import TeamFormation from "@/components/pages/team/team-formation";
import TeamPlayers from "@/components/pages/team/team-players";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FOOTBALL_STATS_URL } from "@/constants/site";
import { internalApi } from "@/lib/api/internal";
import { useQuery } from "@tanstack/react-query";

export default function TeamPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["my-team-players"],
    queryFn: async () => {
      const res = await internalApi.get("/team");
      return res.data?.data || [];
    },
  });

  return (
    <>
      <PageTitle title="Team Management">
        <Button variant="outline" asChild>
          <Link href={`${FOOTBALL_STATS_URL}/game/match/start`}>
            <Rocket className="h-4 w-4 mr-2" />
            Start Match
          </Link>
        </Button>
        <Button asChild>
          <Link href={`${FOOTBALL_STATS_URL}/game/dashboard`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
      </PageTitle>

      <ContentWrapper isLoading={isLoading} error={error}>
        <Tabs defaultValue="formation" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="formation" className="flex items-center">
              <LayoutGrid className="mr-2 h-4 w-4" />
              Formation
            </TabsTrigger>
            <TabsTrigger value="players" className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              Players
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center">
              <BarChart className="mr-2 h-4 w-4" />
              Team Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="formation" className="space-y-6">
            <TeamFormation
              formation={data?.formation}
              players={data?.players}
            />
          </TabsContent>

          <TabsContent value="players" className="space-y-6">
            <TeamPlayers players={data?.players} />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <TeamAnalytics />
          </TabsContent>
        </Tabs>
      </ContentWrapper>
    </>
  );
}
