"use client";

import React, { useState } from "react";

import { Rocket } from "lucide-react";
import { useRouter } from "next/navigation";

import BtnTeamManagement from "@/components/common/btn-team-management";
import Pitch from "@/components/common/pitch";
import PlayerDetailDialog from "@/components/common/player-detail-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FOOTBALL_STATS_URL } from "@/constants/site";
import { Player } from "@/types/player";

import Substitutes from "./substitutes";

type Props = {
  team: {
    home: any;
    away: any;
  };
};

const UpcomingMatchSelection = ({ team }: Props) => {
  const router = useRouter();
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  const onStart = () => {
    router.push(`${FOOTBALL_STATS_URL}/game/match/start`);
  };

  const handleSelectPlayer = (player: Player | null) => {
    if (player) {
      setSelectedPlayer(player);
      setIsDetailDialogOpen(true);
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row justify-between items-center mb-6">
          <div className="flex flex-col space-y-1">
            <CardTitle>Team Selection</CardTitle>
            <CardDescription className="mt-2">
              Select your starting lineup and substitutes
            </CardDescription>
          </div>
          <BtnTeamManagement />
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Substitutes
              players={team?.home?.players}
              onSelectPlayer={handleSelectPlayer}
            />
            <Pitch
              formations={[team?.home?.formation, team?.away?.formation]}
              players={[team?.home?.players, team?.away?.players]}
              onSelectPlayer={handleSelectPlayer}
            />
            <Substitutes
              players={team?.away?.players}
              onSelectPlayer={handleSelectPlayer}
            />
          </div>

          <Separator className="my-6" />

          <div className="flex justify-center mt-6">
            <Button onClick={onStart}>
              <Rocket className="w-4 h-4" />
              Start Match
            </Button>
          </div>
        </CardContent>
      </Card>
      <PlayerDetailDialog
        player={selectedPlayer}
        open={isDetailDialogOpen}
        onOpenChange={setIsDetailDialogOpen}
      />
    </>
  );
};

export default UpcomingMatchSelection;
