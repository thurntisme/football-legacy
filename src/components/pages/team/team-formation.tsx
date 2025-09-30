"use client";

import MySubstitutes from "../../my-substitutes";
import MyTeamRating from "../../my-team-rating";
import MyTeamTactics from "../../my-team-tactics";

import { useCallback, useEffect, useState } from "react";

import { Info, InfoIcon, Save } from "lucide-react";

import PlayerDetailDialog from "@/components/player-detail-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formations } from "@/constants/formations";
import { toast } from "@/hooks/use-toast";
import { getFormationPositions } from "@/lib/formation";
import { Formation, Position } from "@/types/formation";
import { Player } from "@/types/player";

import MyTeamFormationField from "./my-team-formation-field";
import MyTeamFormationSelector from "./my-team-formation-selector";
import SelectedPlayerSummary from "./selected-player-summary";

type TeamFormationProps = {
  allPlayers: Player[];
  players: Player[];
  formation: string;
};

export default function TeamFormation({
  allPlayers,
  players,
  formation,
}: TeamFormationProps) {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  // Add state for the player detail dialog
  const [selectedDetailPlayer, setSelectedDetailPlayer] =
    useState<Player | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);

  // State for current formation and positions
  const [currentFormation, setCurrentFormation] = useState<string>();
  const [positions, setPositions] = useState<Position[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(
    null,
  );
  const [availablePlayers, setAvailablePlayers] = useState<Player[]>(
    allPlayers.slice(11),
  );
  const [tactics, setTactics] = useState<string>("balanced");

  // State to hold the player to be assigned in the dialog
  const [playerToAssign, setPlayerToAssign] = useState<Player | null>(null);

  // State for substitute swap functionality
  const [selectedSubstitute, setSelectedSubstitute] = useState<Player | null>(
    null,
  );
  const [swappablePositions, setSwappablePositions] = useState<string[]>([]);

  // State for pagination of substitutes
  const [currentSubPage, setCurrentSubPage] = useState(0);
  const subsPerPage = 5;
  const totalSubPages = Math.ceil(availablePlayers.length / subsPerPage);

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

  // Initialize formation with players
  // useEffect(() => {
  //   const initialFormation = formations[currentFormation];

  //   // Deep clone the positions to avoid reference issues
  //   const newPositions = JSON.parse(JSON.stringify(initialFormation.positions));

  //   // Assign players to positions based on best fit
  //   // const usedPlayerIds = new Set<string>();

  //   newPositions.forEach((position: Position, index: number) => {
  //     // Find suitable players for this position
  //     // const suitablePlayers = allPlayers.filter((player) => {
  //     //   // Don't use already assigned players
  //     //   if (usedPlayerIds.has(player.id)) return false;

  //     //   // Check if the position is in the player's playable positions
  //     //   const posId = position.id.toUpperCase();

  //     //   // Direct position match (best position)
  //     //   if (player.position === posId) return true;

  //     //   // Check playable positions
  //     //   if (player.playablePositions.includes(posId)) return true;

  //     //   // Match position groups
  //     //   if (
  //     //     (posId === 'CB1' || posId === 'CB2' || posId === 'CB3') &&
  //     //     player.playablePositions.includes('CB')
  //     //   )
  //     //     return true;
  //     //   if (
  //     //     (posId === 'LB' || posId === 'LWB') &&
  //     //     (player.playablePositions.includes('LB') ||
  //     //       player.playablePositions.includes('LWB'))
  //     //   )
  //     //     return true;
  //     //   if (
  //     //     (posId === 'RB' || posId === 'RWB') &&
  //     //     (player.playablePositions.includes('RB') ||
  //     //       player.playablePositions.includes('RWB'))
  //     //   )
  //     //     return true;
  //     //   if (
  //     //     (posId === 'CDM' || posId === 'CDM1' || posId === 'CDM2') &&
  //     //     (player.playablePositions.includes('CDM') ||
  //     //       player.playablePositions.includes('CM'))
  //     //   )
  //     //     return true;
  //     //   if (
  //     //     (posId === 'CM1' || posId === 'CM2') &&
  //     //     player.playablePositions.includes('CM')
  //     //   )
  //     //     return true;
  //     //   if (
  //     //     (posId === 'LM' || posId === 'LW' || posId === 'LAM') &&
  //     //     (player.playablePositions.includes('LM') ||
  //     //       player.playablePositions.includes('LW'))
  //     //   )
  //     //     return true;
  //     //   if (
  //     //     (posId === 'RM' || posId === 'RW' || posId === 'RAM') &&
  //     //     (player.playablePositions.includes('RM') ||
  //     //       player.playablePositions.includes('RW'))
  //     //   )
  //     //     return true;
  //     //   if (
  //     //     posId === 'CAM' &&
  //     //     (player.playablePositions.includes('CAM') ||
  //     //       player.playablePositions.includes('CM'))
  //     //   )
  //     //     return true;
  //     //   if (
  //     //     (posId === 'ST' || posId === 'ST1' || posId === 'ST2') &&
  //     //     player.playablePositions.includes('ST')
  //     //   )
  //     //     return true;

  //     //   return false;
  //     // });

  //     // // Sort suitable players by position match quality and rating
  //     // const sortedPlayers = suitablePlayers.sort((a, b) => {
  //     //   // Primary sort: exact position match
  //     //   const aExactMatch = a.position === position.id.toUpperCase() ? 1 : 0;
  //     //   const bExactMatch = b.position === position.id.toUpperCase() ? 1 : 0;
  //     //   if (aExactMatch !== bExactMatch) return bExactMatch - aExactMatch;

  //     //   // Secondary sort: playable position match
  //     //   const aPlayableMatch = a.playablePositions.includes(
  //     //     position.id.toUpperCase()
  //     //   )
  //     //     ? 1
  //     //     : 0;
  //     //   const bPlayableMatch = b.playablePositions.includes(
  //     //     position.id.toUpperCase()
  //     //   )
  //     //     ? 1
  //     //     : 0;
  //     //   if (aPlayableMatch !== bPlayableMatch)
  //     //     return bPlayableMatch - aPlayableMatch;

  //     //   // Tertiary sort: rating
  //     //   return b.rating - a.rating;
  //     // });

  //     // Assign the best player to this position
  //     // if (sortedPlayers.length > 0) {
  //     //   const bestPlayer = sortedPlayers[0];
  //     //   position.player = bestPlayer;
  //     //   usedPlayerIds.add(bestPlayer.id);
  //     // }
  //     position.player =
  //       allPlayers.find((player) => player.playerIndex === index) || null;
  //   });

  //   setPositions(newPositions);

  //   // Update available players (those not in the formation)
  //   updateAvailablePlayers(newPositions);
  // }, [allPlayers, currentFormation]);

  // Update available players list
  const updateAvailablePlayers = (currentPositions: Position[]) => {
    const usedPlayerIds = new Set(
      currentPositions
        .filter((pos) => pos.player !== null)
        .map((pos) => pos.player!.id),
    );

    const available = allPlayers.filter(
      (player) => !usedPlayerIds.has(player.id),
    );
    setAvailablePlayers(available);

    // Reset pagination when available players change
    setCurrentSubPage(0);
  };

  // Handle formation change
  const handleFormationChange = (formation: string) => {
    setCurrentFormation(formation);
    loadPlayerInFormation(formation);
    // Reset substitute selection when formation changes
    setSelectedSubstitute(null);
    setSwappablePositions([]);
  };

  // Handle tactics change
  const handleTacticsChange = (tactic: string) => {
    setTactics(tactic);
    toast({
      title: "Tactics Updated",
      description: `Your team is now playing with ${tactic} tactics.`,
    });
  };

  // Enhance the player selection dialog to show position match quality
  const handleSelectPlayer = (position: Position, player: Player | null) => {
    // Update the positions array
    const updatedPositions = positions.map((pos) => {
      if (pos.id === position.id) {
        return { ...pos, player };
      }

      // If this player was already in another position, remove them
      if (player && pos.player && pos.player.id === player.id) {
        return { ...pos, player: null };
      }

      return pos;
    });

    setPositions(updatedPositions);
    setSelectedPosition(null);

    // Update available players
    updateAvailablePlayers(updatedPositions);

    toast({
      title: "Player Updated",
      description: player
        ? `${
            player.name
          } has been assigned to the ${position.id.toUpperCase()} position.`
        : `Player has been removed from the ${position.id.toUpperCase()} position.`,
    });
  };

  // Handle save formation
  const handleSaveFormation = () => {
    toast({
      title: "Formation Saved",
      description: `Your ${currentFormation} formation has been saved successfully.`,
    });
  };

  // Handle substitute selection for swapping
  const handleSubstituteSelect = (player: Player) => {
    if (selectedSubstitute?.id === player.id) {
      // Deselect if already selected
      setSelectedSubstitute(null);
      setSwappablePositions([]);
    } else {
      setSelectedSubstitute(player);

      // Find all positions this substitute can play
      const playablePositionIds = positions
        .filter((pos) => {
          if (!pos.player) return false;

          const posId = pos.id.toUpperCase();

          // Direct position match
          if (player.playablePositions.includes(posId)) return true;

          // Position group matches
          if (
            (posId === "CB1" || posId === "CB2" || posId === "CB3") &&
            player.playablePositions.includes("CB")
          )
            return true;
          if (
            (posId === "LB" || posId === "LWB") &&
            (player.playablePositions.includes("LB") ||
              player.playablePositions.includes("LWB"))
          )
            return true;
          if (
            (posId === "RB" || posId === "RWB") &&
            (player.playablePositions.includes("RB") ||
              player.playablePositions.includes("RWB"))
          )
            return true;
          if (
            (posId === "CDM" || posId === "CDM1" || posId === "CDM2") &&
            (player.playablePositions.includes("CDM") ||
              player.playablePositions.includes("CM"))
          )
            return true;
          if (
            (posId === "CM1" || posId === "CM2") &&
            player.playablePositions.includes("CM")
          )
            return true;
          if (
            (posId === "LM" || posId === "LW" || posId === "LAM") &&
            (player.playablePositions.includes("LM") ||
              player.playablePositions.includes("LW"))
          )
            return true;
          if (
            (posId === "RM" || posId === "RW" || posId === "RAM") &&
            (player.playablePositions.includes("RM") ||
              player.playablePositions.includes("RW"))
          )
            return true;
          if (
            posId === "CAM" &&
            (player.playablePositions.includes("CAM") ||
              player.playablePositions.includes("CM"))
          )
            return true;
          if (
            (posId === "ST" ||
              posId === "ST1" ||
              posId === "ST2" ||
              posId === "CF") &&
            (player.playablePositions.includes("ST") ||
              player.playablePositions.includes("CF"))
          )
            return true;

          return false;
        })
        .map((pos) => pos.id);

      setSwappablePositions(playablePositionIds);
    }
  };

  // Handle swapping a substitute with a player in the lineup
  const handleSwapPlayers = (position: Position) => {
    if (!selectedPlayer || !position.player) return;

    // Create updated positions with the swap
    // const updatedPositions = positions.map((pos) => {
    //   if (pos.id === position.id) {
    //     return { ...pos, player: selectedPlayer };
    //   }
    //   return pos;
    // });

    // // Update available players (add the swapped out player, remove the substitute)
    // const updatedAvailablePlayers = availablePlayers.filter(
    //   (p) => p.id !== selectedPlayer.id,
    // );
    // updatedAvailablePlayers.push(position.player);

    // // Update state
    // setPositions(updatedPositions);
    // setAvailablePlayers(updatedAvailablePlayers);
    // setSelectedPlayer(null);
    // setSwappablePositions([]);

    toast({
      title: "Players Swapped",
      description: `${selectedPlayer.name} has been swapped with ${position.player.name}.`,
    });
  };

  // Handle pagination for substitutes
  const nextSubPage = () => {
    if (currentSubPage < totalSubPages - 1) {
      setCurrentSubPage(currentSubPage + 1);
    }
  };

  const prevSubPage = () => {
    if (currentSubPage > 0) {
      setCurrentSubPage(currentSubPage - 1);
    }
  };

  // Add a function to determine position match quality
  const getPositionMatchQuality = (player: Player, positionId: string) => {
    const posId = positionId.toUpperCase();

    // Exact match with best position
    if (player.position === posId) {
      return { quality: "excellent", label: "Perfect", color: "bg-green-500" };
    }

    // Match with playable positions
    if (player.playablePositions.includes(posId)) {
      return { quality: "good", label: "Good", color: "bg-emerald-400" };
    }

    // Position group match
    if (
      (posId === "CB1" || posId === "CB2" || posId === "CB3") &&
      player.playablePositions.includes("CB")
    ) {
      return { quality: "good", label: "Good", color: "bg-emerald-400" };
    }
    if (
      (posId === "LB" || posId === "LWB") &&
      (player.playablePositions.includes("LB") ||
        player.playablePositions.includes("LWB"))
    ) {
      return { quality: "good", label: "Good", color: "bg-emerald-400" };
    }
    if (
      (posId === "RB" || posId === "RWB") &&
      (player.playablePositions.includes("RB") ||
        player.playablePositions.includes("RWB"))
    ) {
      return { quality: "good", label: "Good", color: "bg-emerald-400" };
    }
    if (
      (posId === "CDM" || posId === "CDM1" || posId === "CDM2") &&
      (player.playablePositions.includes("CDM") ||
        player.playablePositions.includes("CM"))
    ) {
      return { quality: "average", label: "Decent", color: "bg-amber-400" };
    }
    if (
      (posId === "CM1" || posId === "CM2") &&
      player.playablePositions.includes("CM")
    ) {
      return { quality: "good", label: "Good", color: "bg-emerald-400" };
    }
    if (
      (posId === "LM" || posId === "LW" || posId === "LAM") &&
      (player.playablePositions.includes("LM") ||
        player.playablePositions.includes("LW"))
    ) {
      return { quality: "good", label: "Good", color: "bg-emerald-400" };
    }
    if (
      (posId === "RM" || posId === "RW" || posId === "RAM") &&
      (player.playablePositions.includes("RM") ||
        player.playablePositions.includes("RW"))
    ) {
      return { quality: "good", label: "Good", color: "bg-emerald-400" };
    }
    if (
      posId === "CAM" &&
      (player.playablePositions.includes("CAM") ||
        player.playablePositions.includes("CM"))
    ) {
      return { quality: "average", label: "Decent", color: "bg-amber-400" };
    }
    if (
      (posId === "ST" ||
        posId === "ST1" ||
        posId === "ST2" ||
        posId === "CF") &&
      (player.playablePositions.includes("ST") ||
        player.playablePositions.includes("CF"))
    ) {
      return { quality: "good", label: "Good", color: "bg-emerald-400" };
    }

    return { quality: "poor", label: "Poor", color: "bg-red-400" };
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
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <MyTeamFormationField
              positions={positions}
              currentFormation={currentFormation}
              selectedPlayer={selectedPlayer}
              handleSwapPlayers={handleSwapPlayers}
              setSelectedPlayer={setSelectedPlayer}
            />

            {/* <MySubstitutes
              subsPerPage={subsPerPage}
              selectedSubstitute={selectedSubstitute}
              setSelectedSubstitute={setSelectedSubstitute}
              setSwappablePositions={setSwappablePositions}
              setSelectedDetailPlayer={setSelectedDetailPlayer}
              setDetailDialogOpen={setDetailDialogOpen}
              handleSubstituteSelect={handleSubstituteSelect}
              tactics={tactics}
              availablePlayers={availablePlayers}
              prevSubPage={prevSubPage}
              nextSubPage={nextSubPage}
              currentSubPage={currentSubPage}
              totalSubPages={totalSubPages}
            /> */}
          </div>

          <div className="w-full md:w-64 space-y-4">
            <SelectedPlayerSummary
              selectedPlayer={selectedPlayer}
              handleViewDetailPlayer={handleViewDetailPlayer}
            />

            <MyTeamFormationSelector
              currentFormation={currentFormation}
              handleFormationChange={handleFormationChange}
            />

            {/* <MyTeamTactics
              tactics={tactics}
              handleTacticsChange={handleTacticsChange}
            />

            <MyTeamRating positions={positions} /> */}

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
