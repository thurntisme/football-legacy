"use client";

import type React from "react";
import { useEffect, useState } from "react";

import { BarChart3, Check, Home, Star, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import MatchResultLeagueImpact from "@/components/match-result-league-impact";
import MatchResultOverview from "@/components/match-result-overview";
import MatchResultPlayers from "@/components/match-result-players";
import MatchResultReward from "@/components/match-result-reward";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FOOTBALL_STATS_URL } from "@/constants/site";
import { toast } from "@/hooks/use-toast";
import { MatchResult, RewardItem } from "@/types/football/match";

export default function MatchResultPage() {
  const [selectedReward, setSelectedReward] = useState<number | null>(null);
  const [rewardClaimed, setRewardClaimed] = useState(false);
  const router = useRouter();

  // Match result data (would come from match simulation in a real app)
  const matchResult = {
    score: { home: 2, away: 1 },
    result: "win", // win, loss, draw
    venue: "United Arena (Home)",
    competition: "Premier League",
    matchday: 24,
    xg: { home: 2.3, away: 1.1 },
    possession: { home: 58, away: 42 },
    shots: { home: 14, away: 8 },
    shotsOnTarget: { home: 6, away: 3 },
    corners: { home: 7, away: 4 },
    fouls: { home: 10, away: 12 },
    yellowCards: { home: 2, away: 3 },
    redCards: { home: 0, away: 0 },
    playerRatings: [
      { id: 1, name: "David Miller", position: "GK", rating: 7.5 },
      { id: 2, name: "James Wilson", position: "LB", rating: 7.2 },
      { id: 3, name: "Robert Garcia", position: "CB", rating: 8.1, motm: true },
      { id: 4, name: "Michael Brown", position: "CB", rating: 7.4 },
      { id: 5, name: "Thomas Lee", position: "RB", rating: 6.9 },
      { id: 6, name: "Daniel Martinez", position: "CM", rating: 7.8 },
      { id: 7, name: "Steven Taylor", position: "CDM", rating: 7.3 },
      { id: 8, name: "Kevin Anderson", position: "CM", rating: 6.8 },
      { id: 9, name: "Chris Johnson", position: "LW", rating: 8.0 },
      { id: 10, name: "Mark Williams", position: "ST", rating: 7.9 },
      { id: 11, name: "Paul Davis", position: "RW", rating: 7.1 },
    ],
    goals: [
      {
        minute: 23,
        player: "Mark Williams",
        assist: "Chris Johnson",
        team: "home",
      },
      {
        minute: 67,
        player: "Robert Garcia",
        assist: "Daniel Martinez",
        team: "home",
      },
      {
        minute: 82,
        player: "James Smith",
        assist: "David Thompson",
        team: "away",
      },
    ],
  } as MatchResult;

  // Generate random player rewards
  const generateRandomPlayers = () => {
    const positions = [
      "GK",
      "CB",
      "LB",
      "RB",
      "CDM",
      "CM",
      "CAM",
      "LW",
      "RW",
      "ST",
    ];
    const nationalities = [
      "England",
      "Spain",
      "Brazil",
      "France",
      "Germany",
      "Italy",
      "Argentina",
      "Portugal",
      "Netherlands",
      "Belgium",
      "Croatia",
      "Uruguay",
      "Colombia",
      "Japan",
    ];
    const firstNames = [
      "Alex",
      "James",
      "Carlos",
      "Juan",
      "Marco",
      "Luis",
      "Thomas",
      "David",
      "Robert",
      "Michael",
      "Pedro",
      "Antonio",
      "Kevin",
      "Paul",
      "Sergio",
      "Luka",
      "Hiroki",
      "Takumi",
    ];
    const lastNames = [
      "Smith",
      "Johnson",
      "Garcia",
      "Martinez",
      "Rodriguez",
      "Hernandez",
      "Silva",
      "Santos",
      "Müller",
      "Fischer",
      "Rossi",
      "Dubois",
      "Jansen",
      "Kovačić",
      "Tanaka",
      "Minamino",
    ];

    const randomPlayers: RewardItem[] = [];

    for (let i = 0; i < 3; i++) {
      const position = positions[Math.floor(Math.random() * positions.length)];
      const nationality =
        nationalities[Math.floor(Math.random() * nationalities.length)];
      const firstName =
        firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const name = `${firstName} ${lastName}`;
      const age = Math.floor(Math.random() * 10) + 18; // 18-27
      const rating = Math.floor(Math.random() * 15) + 70; // 70-84

      let rarity = "common";
      if (rating >= 80) rarity = "epic";
      else if (rating >= 75) rarity = "rare";

      randomPlayers.push({
        id: i + 1,
        name: name,
        description: `${nationality} ${position}, ${age} years old`,
        rarity: rarity as "common" | "rare" | "epic" | "legendary",
        type: "player",
        playerDetails: {
          position,
          rating,
          nationality,
          age,
        },
        icon: <User className="h-8 w-8 text-blue-500" />,
      });
    }

    return randomPlayers;
  };

  // Generate player rewards
  const [playerRewards, setPlayerRewards] = useState<RewardItem[]>([]);

  useEffect(() => {
    setPlayerRewards(generateRandomPlayers());
  }, []);

  const handleClaimReward = () => {
    if (selectedReward === null) {
      toast({
        title: "No reward selected",
        description: "Please select a reward before claiming",
        variant: "destructive",
      });
      return;
    }

    const reward = playerRewards.find((r) => r.id === selectedReward);

    toast({
      title: "Reward Claimed!",
      description: `You've claimed: ${reward?.name}`,
    });

    setRewardClaimed(true);

    // Redirect to homepage after a short delay
    setTimeout(() => {
      router.push(`${FOOTBALL_STATS_URL}/dashboard`);
    }, 1500);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Match Result</h1>
        <Button asChild>
          <Link href={`${FOOTBALL_STATS_URL}/dashboard`}>
            <Home className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MatchResultOverview matchResult={matchResult} />

          <MatchResultPlayers matchResult={matchResult} />
        </div>

        <div>
          <MatchResultReward
            playerRewards={playerRewards}
            selectedReward={selectedReward}
            setSelectedReward={setSelectedReward}
            rewardClaimed={rewardClaimed}
            handleClaimReward={handleClaimReward}
          />

          <MatchResultLeagueImpact />
        </div>
      </div>
    </>
  );
}
