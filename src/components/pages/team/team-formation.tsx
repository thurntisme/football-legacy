"use client";

import { useCallback, useEffect, useState } from "react";

import { Save } from "lucide-react";

import PlayerDetailDialog from "@/components/common/player-detail-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { getFormationPositions } from "@/lib/formation";
import { Position } from "@/types/formation";
import { Player } from "@/types/player";

import MyTeamFormationField from "./my-team-formation-field";
import MyTeamFormationPlayer from "./my-team-formation-player";
import MyTeamFormationSelector from "./my-team-formation-selector";
import MyTeamRating from "./my-team-rating";
import QuickAction from "./quick-action";
import SelectedPlayerAttributes from "./selected-player-attributes";
import SelectedPlayerSummary from "./selected-player-summary";

type TeamFormationProps = {
  players: Player[];
  formation: string;
};

export default function TeamFormation({
  players,
  formation,
}: TeamFormationProps) {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [selectedDetailPlayer, setSelectedDetailPlayer] =
    useState<Player | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [currentFormation, setCurrentFormation] = useState<string>();
  const [positions, setPositions] = useState<Position[]>([]);

  const loadPlayerInFormation = useCallback(
    (formation: string) => {
      setCurrentFormation(formation);
      if (players) {
        const formationPositions = getFormationPositions(formation);
        const basePositions = formationPositions.map((pos, index) => {
          return { ...pos, player: players[index] || null };
        });
        setPositions(basePositions);
      }
    },
    [players],
  );

  useEffect(() => {
    if (formation) {
      loadPlayerInFormation(formation);
    }
  }, [formation, loadPlayerInFormation]);

  // Handle formation change
  const handleFormationChange = (formation: string) => {
    setCurrentFormation(formation);
    loadPlayerInFormation(formation);
  };

  // Handle save formation
  const handleSaveFormation = () => {
    toast({
      title: "Formation Saved",
      description: `Your ${currentFormation} formation has been saved successfully.`,
    });
  };

  // Handle swapping a substitute with a player in the lineup
  const handleSwapPlayers = (position: Position) => {
    if (!selectedPlayer || !position.player) return;

    toast({
      title: "Players Swapped",
      description: `${selectedPlayer.name} has been swapped with ${position.player.name}.`,
    });
  };

  const handleSwapSubPlayers = (player: Player) => {
    if (!selectedPlayer || !player) return;

    toast({
      title: "Players Swapped",
      description: `${selectedPlayer.name} has been swapped with ${player.name}.`,
    });
  };

  const handleViewDetailPlayer = (player: Player | null) => {
    if (!player) return;
    setDetailDialogOpen(true);
    setSelectedDetailPlayer(player);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Formation</CardTitle>
        <CardDescription>
          Adjust your team's formation and select players for each position
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-6">
          <div className="flex-1 space-y-4">
            <MyTeamRating positions={positions} />
            <MyTeamFormationField
              positions={positions}
              currentFormation={currentFormation}
              selectedPlayer={selectedPlayer}
              handleSwapPlayers={handleSwapPlayers}
              setSelectedPlayer={setSelectedPlayer}
            />
            <MyTeamFormationSelector
              currentFormation={currentFormation}
              handleFormationChange={handleFormationChange}
            />
            <QuickAction players={players} formation={currentFormation} />
          </div>

          <div className="col-start-2 col-end-4">
            <MyTeamFormationPlayer
              players={players}
              selectedPlayer={selectedPlayer}
              setSelectedPlayer={setSelectedPlayer}
              onSwapPlayers={handleSwapSubPlayers}
            />
          </div>

          <div className="w-full space-y-4">
            <SelectedPlayerSummary
              selectedPlayer={selectedPlayer}
              handleViewDetailPlayer={handleViewDetailPlayer}
            />
            <SelectedPlayerAttributes selectedPlayer={selectedPlayer} />
            <Button className="w-full" onClick={handleSaveFormation}>
              <Save className="mr-2 h-4 w-4" />
              Save Formation
            </Button>
          </div>

          <PlayerDetailDialog
            player={selectedDetailPlayer}
            open={detailDialogOpen}
            onOpenChange={setDetailDialogOpen}
          />
        </div>
      </CardContent>
    </Card>
  );
}
