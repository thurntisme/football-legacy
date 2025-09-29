"use client";

import QuickAction from "@/components/pages/team/quick-action";

import { useState } from "react";

import { ArrowLeft, BarChart, Hash, Rocket, Shirt, Users } from "lucide-react";
import Link from "next/link";

import BestLineupDialog from "@/components/pages/team/best-lineup-dialog";
import ContentWrapper from "@/components/common/content-wrapper";
import PageTitle from "@/components/common/page-title";
import PlayerRolesDialog from "@/components/pages/team/player-roles-dialog";
import ShirtNumberManager from "@/components/pages/team/shirt-number-manager";
import TeamAnalytics from "@/components/pages/team/team-analytics";
import TeamFormation from "@/components/pages/team/team-formation";
import TeamPlayers from "@/components/pages/team/team-players";
import TransferRecommendationsDialog from "@/components/pages/team/transfer-recommendations-dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FOOTBALL_STATS_URL } from "@/constants/site";
import { toast } from "@/hooks/use-toast";
import { internalApi } from "@/lib/api/internal";
import { Player } from "@/types/player";
import { useQuery } from "@tanstack/react-query";

export default function TeamPage() {
  const [playerRolesOpen, setPlayerRolesOpen] = useState(false);
  const [transferRecsOpen, setTransferRecsOpen] = useState(false);
  const [bestLineupOpen, setBestLineupOpen] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["my-team-players"],
    queryFn: async () => {
      const { data } = await internalApi.get("/team");
      return data;
    },
  });

  const {
    data: rcmPlayers,
    isLoading: isLoadingRcmPlayers,
    error: isErrorRcmPlayers,
    refetch: refetchRcmPlayers,
  } = useQuery({
    queryKey: ["market-recommend-players"],
    queryFn: async () => {
      const { data } = await internalApi.get("/market/recommend");
      return data;
    },
    enabled: false,
  });

  const handleChooseBestPlayers = () => {
    setBestLineupOpen(true);
  };

  const handleBestLineupConfirm = (selectedPlayers: Player[]) => {
    const selectedLineup = selectedPlayers.map((p) => p.name).join(", ");

    toast({
      title: "Best Lineup Selected",
      description: `Your lineup has been updated with the selected players: ${selectedLineup.substring(
        0,
        100,
      )}...`,
    });
  };

  const handleShowTransferRecommendations = () => {
    refetchRcmPlayers();
    setTransferRecsOpen(true);
  };

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
        <QuickAction
          onChooseBestPlayers={handleChooseBestPlayers}
          onShowTransferRecommendations={handleShowTransferRecommendations}
          setPlayerRolesOpen={setPlayerRolesOpen}
        />
        <Tabs defaultValue="formation" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="formation" className="flex items-center">
              <Shirt className="mr-2 h-4 w-4" />
              Formation
            </TabsTrigger>
            <TabsTrigger value="players" className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              Player List
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center">
              <BarChart className="mr-2 h-4 w-4" />
              Team Analytics
            </TabsTrigger>
            <TabsTrigger value="shirt-numbers" className="flex items-center">
              <Hash className="mr-2 h-4 w-4" />
              Shirt Numbers
            </TabsTrigger>
          </TabsList>

          <TabsContent value="formation" className="space-y-6">
            <TeamFormation allPlayers={data?.players} />
          </TabsContent>

          <TabsContent value="players" className="space-y-6">
            <TeamPlayers players={data?.players} />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <TeamAnalytics />
          </TabsContent>

          <TabsContent value="shirt-numbers" className="space-y-6">
            <ShirtNumberManager players={data?.players} />
          </TabsContent>
        </Tabs>

        <PlayerRolesDialog
          players={data?.players}
          open={playerRolesOpen}
          onOpenChange={setPlayerRolesOpen}
        />

        <TransferRecommendationsDialog
          open={transferRecsOpen}
          onOpenChange={setTransferRecsOpen}
          rcmPlayers={rcmPlayers}
          isLoading={isLoadingRcmPlayers}
          error={isErrorRcmPlayers}
        />

        <BestLineupDialog
          open={bestLineupOpen}
          onOpenChange={setBestLineupOpen}
          players={data?.players}
          onConfirm={handleBestLineupConfirm}
          currentFormation={data?.formation}
        />
      </ContentWrapper>
    </>
  );
}
