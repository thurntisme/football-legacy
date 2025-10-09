"use client";

import type React from "react";
import { useState } from "react";

import { ArrowLeftRight, Loader2, Sparkles } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { players as initPlayers } from "@/constants/player";
import { FOOTBALL_STATS_URL } from "@/constants/site";
import { toast } from "@/hooks/use-toast";
import { Player } from "@/types/player";

import ClubPlayersTable from "./club-players-table";

export default function PlayerManagement() {
  const [players, setPlayers] = useState<Player[]>(() =>
    initPlayers.map((p) => {
      return { ...p, selected: false };
    }),
  );
  const [isGeneratingCombinedPlayer, setIsGeneratingCombinedPlayer] =
    useState(false);
  const [showGenerateCombinedButton, setShowGenerateCombinedButton] =
    useState(false);
  const handleRemovePlayer = (playerId: string) => {
    setPlayers(players.filter((p) => p.id !== playerId));
    toast({
      title: "Player Removed",
      description: "The player has been removed from your club.",
    });
  };
  const handlePlaceOnMarket = (playerId: string) => {
    toast({
      title: "Player Listed",
      description: "The player has been placed on the transfer market.",
    });
  };
  const handleJoinTeam = (playerId: string) => {
    toast({
      title: "Player Added to Team",
      description: "The player has joined your team.",
    });
  };
  const handleReleasePlayer = (playerId: string) => {
    toast({
      title: "Player Released",
      description: "The player has been released from your club.",
    });
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
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <CardTitle>Player Management</CardTitle>
            <CardDescription>
              Adjust player details and contracts
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
          <Button variant="outline" asChild>
            <Link href={`${FOOTBALL_STATS_URL}/game/team`}>
              <ArrowLeftRight className="mr-2 h-4 w-4" />
              Team Management
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ClubPlayersTable
          players={players}
          togglePlayerSelection={togglePlayerSelection}
          handleRemovePlayer={handleRemovePlayer}
          handlePlaceOnMarket={handlePlaceOnMarket}
          handleJoinTeam={handleJoinTeam}
          handleReleasePlayer={handleReleasePlayer}
        />
      </CardContent>
    </Card>
  );
}
