"use client";

import type React from "react";
import { useState } from "react";

import { Loader2, Sparkles } from "lucide-react";

import BtnTeamManagement from "@/components/common/btn-team-management";
import ContentWrapper from "@/components/common/content-wrapper";
import PlayerDetailDialog from "@/components/common/player-detail-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { players as initPlayers } from "@/constants/player";
import { toast } from "@/hooks/use-toast";
import { internalApi } from "@/lib/api/internal";
import { Player } from "@/types/player";
import { useQuery } from "@tanstack/react-query";

import ClubPlayersTable from "./club-players-table";

export default function AvailablePlayers() {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  const [players, setPlayers] = useState<Player[]>(() =>
    initPlayers.map((p) => {
      return { ...p, selected: false };
    }),
  );
  const [isGeneratingCombinedPlayer, setIsGeneratingCombinedPlayer] =
    useState(false);
  const [showGenerateCombinedButton, setShowGenerateCombinedButton] =
    useState(false);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["my-team-club-players"],
    queryFn: async () => {
      const res = await internalApi.get("/team");
      return res.data?.data || [];
    },
  });

  const handleRemovePlayer = (player: Player) => {
    toast({
      title: "Player Removed",
      description: `Player ${player.name} has been removed from your club.`,
    });
  };
  const handleSellPlayer = (player: Player) => {
    toast({
      title: "Player Listed",
      description: `Player ${player.name} has been placed on the transfer market.`,
    });
  };
  const handleJoinTeam = (player: Player) => {
    toast({
      title: "Player Added to Team",
      description: `Player ${player.name} has joined your team.`,
    });
  };

  const handleViewPlayerDetail = (player: Player) => {
    setSelectedPlayer(player);
    setIsDetailDialogOpen(true);
  };

  const togglePlayerSelection = (playerId: string) => {
    setPlayers(
      players.map((p) =>
        p.id === playerId ? { ...p, selected: !p.selected } : p,
      ),
    );
    const updatedPlayers = players.map((p) =>
      p.id === playerId ? { ...p, selected: !p.selected } : p,
    );
    const selectedCount = updatedPlayers.filter((p) => p.selected).length;
    setShowGenerateCombinedButton(selectedCount >= 2);
  };
  const generateCombinedPlayer = () => {
    const selectedPlayers = players.filter((p) => p.selected);
    if (selectedPlayers.length < 2) {
      toast({
        title: "Not Enough Players",
        description: "Please select at least 2 players to combine.",
        variant: "destructive",
      });
      return;
    }
    setIsGeneratingCombinedPlayer(true);
    setTimeout(() => {
      setIsGeneratingCombinedPlayer(false);
      setShowGenerateCombinedButton(false);
      toast({
        title: "Combined Player Generated!",
        description: `A New player has been created by combining player attributes!`,
      });
      const selectedPlayerIds = selectedPlayers.map((p) => p.id);
      const newPlayers = players.filter(
        (p) => !selectedPlayerIds.includes(p.id),
      );
      setPlayers(newPlayers);
    }, 2000);
  };

  return (
    <ContentWrapper isLoading={isLoading} error={error} onRefetch={refetch}>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <CardTitle>Available Players</CardTitle>
              <CardDescription>
                All players available to your club.
              </CardDescription>
            </div>
            <div className="flex justify-between items-center ml-auto mr-2">
              {showGenerateCombinedButton && (
                <Button
                  onClick={generateCombinedPlayer}
                  disabled={isGeneratingCombinedPlayer}
                >
                  {isGeneratingCombinedPlayer ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Combined Player
                    </>
                  )}
                </Button>
              )}
            </div>
            <BtnTeamManagement />
          </div>
        </CardHeader>
        <CardContent>
          <ClubPlayersTable
            players={data?.players}
            togglePlayerSelection={togglePlayerSelection}
            removePlayer={handleRemovePlayer}
            sellPlayer={handleSellPlayer}
            joinTeam={handleJoinTeam}
            viewPlayerDetail={handleViewPlayerDetail}
          />
        </CardContent>
      </Card>
      <PlayerDetailDialog
        player={selectedPlayer}
        open={isDetailDialogOpen}
        onOpenChange={setIsDetailDialogOpen}
      />
    </ContentWrapper>
  );
}
