"use client";

import { useEffect, useState } from "react";

import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Trash,
  Wand2,
  X,
} from "lucide-react";

import { LoadingBar } from "@/components/common/loading-bar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { positionCompatibility } from "@/constants/formations";
import { getFormationPositions } from "@/lib/formation";
import { Player } from "@/types/player";

import BestLineupAvailable from "./best-lineup-available";
import BestLineupSelected from "./best-lineup-selected";

interface BestLineupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  players: Player[];
  onConfirm: (selectedPlayers: Player[]) => void;
  baseFormation: string | undefined;
}

const SORT_TYPES = [
  { key: "rating", label: "Rating" },
  { key: "form", label: "Form" },
  { key: "fitness", label: "Fitness" },
];

export default function BestLineupDialog({
  open,
  onOpenChange,
  players,
  onConfirm,
  baseFormation,
}: BestLineupDialogProps) {
  const [sortBy, setSortBy] = useState<"rating" | "form" | "fitness">("rating");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [autoSelected, setAutoSelected] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [positionNeeds, setPositionNeeds] = useState<Record<string, number>>(
    {},
  );
  const [positionsFilled, setPositionsFilled] = useState<
    Record<string, number>
  >({});

  useEffect(() => {
    if (!baseFormation) return;
    const needs: Record<string, number> = {};
    const formationPos = getFormationPositions(baseFormation);
    formationPos.forEach((pos) => {
      needs[pos.id] = (needs[pos.id] || 0) + 1;
    });
    setPositionNeeds(needs);
  }, [baseFormation]);

  // Update positions filled count
  const updatePositionsFilled = (players: Player[]) => {
    const filled: Record<string, number> = {};

    players.forEach((player) => {
      // Find which position this player is filling
      for (const [formationPos, count] of Object.entries(positionNeeds)) {
        const compatiblePositions = positionCompatibility[formationPos];
        if (
          player.playablePositions.includes(compatiblePositions) &&
          (!filled[formationPos] || filled[formationPos] < count)
        ) {
          filled[formationPos] = (filled[formationPos] || 0) + 1;
          break;
        }
      }
    });

    setPositionsFilled(filled);
  };

  // Reset state when dialog opens
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      resetSelection();
      console.log("close");
    }
    onOpenChange(open);
  };

  // Toggle player selection
  const togglePlayerSelection = (player: Player) => {
    if (selectedPlayers.find((p) => p.id === player.id)) {
      const newSelection = selectedPlayers.filter((p) => p.id !== player.id);
      setSelectedPlayers(newSelection);
      updatePositionsFilled(newSelection);
    } else {
      if (selectedPlayers.length < 11) {
        const newSelection = [...selectedPlayers, player];
        setSelectedPlayers(newSelection);
        updatePositionsFilled(newSelection);
      } else {
        toast({
          title: "Maximum Players Selected",
          description:
            "You can only select 11 players for your lineup. Remove a player before adding another.",
          variant: "destructive",
        });
      }
    }
    setAutoSelected(false);
  };

  // Auto-select best players based on formation
  const autoSelectBestPlayers = () => {
    if (!baseFormation) return;
    setIsProcessing(true);
    setProcessingProgress(0);

    // Simulate processing time for better UX
    const processSelection = () => {
      const interval = setInterval(() => {
        setProcessingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 100);

      setTimeout(() => {
        // Create a copy of players to work with
        let availablePlayers = [...players];
        const selectedLineup: Player[] = [];
        const formationPos = getFormationPositions(baseFormation);

        // For each position in the formation, find the best player
        formationPos.forEach((position) => {
          // Get compatible positions
          const compatiblePosition = positionCompatibility[position.id];

          // Filter players by compatible positions
          let eligiblePlayers = availablePlayers.filter((p) =>
            p.playablePositions.includes(compatiblePosition),
          );

          // If no eligible players, try to find players from other positions
          if (eligiblePlayers.length === 0) {
            eligiblePlayers = availablePlayers;
          }

          // Sort eligible players by criteria
          if (sortBy === "rating") {
            eligiblePlayers.sort((a, b) => b.rating - a.rating);
          } else if (sortBy === "form") {
            const formValues = { excellent: 4, good: 3, average: 2, poor: 1 };
            eligiblePlayers.sort((a, b) => {
              const formDiff =
                (formValues[b.form] || 0) - (formValues[a.form] || 0);
              return formDiff !== 0 ? formDiff : b.rating - a.rating;
            });
          } else if (sortBy === "fitness") {
            eligiblePlayers.sort((a, b) => {
              const fitnessDiff = b.fitness - a.fitness;
              return fitnessDiff !== 0 ? fitnessDiff : b.rating - a.rating;
            });
          }

          // Select the best player for this position
          if (eligiblePlayers.length > 0) {
            const selectedPlayer = eligiblePlayers[0];
            selectedLineup.push(selectedPlayer);

            // Remove the selected player from available players
            availablePlayers = availablePlayers.filter(
              (p) => p.id !== selectedPlayer.id,
            );
          }
        });

        setSelectedPlayers(selectedLineup);
        updatePositionsFilled(selectedLineup);
        setAutoSelected(true);
        setIsProcessing(false);

        toast({
          title: "Best Players Selected",
          description: `Selected the best 11 players based on ${sortBy} for ${baseFormation} formation.`,
        });
      }, 1500);
    };

    processSelection();
  };

  // Handle sort change
  const handleSortChange = (criteria: "rating" | "form" | "fitness") => {
    if (sortBy === criteria) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(criteria);
      setSortOrder("desc");
    }
  };

  // Sort players for display
  const sortedPlayers = [...players].sort((a, b) => {
    if (sortBy === "rating") {
      return sortOrder === "desc" ? b.rating - a.rating : a.rating - b.rating;
    } else if (sortBy === "form") {
      const formValues = { excellent: 4, good: 3, average: 2, poor: 1 };
      const formDiff = (formValues[b.form] || 0) - (formValues[a.form] || 0);
      return sortOrder === "desc" ? formDiff : -formDiff;
    } else if (sortBy === "fitness") {
      return sortOrder === "desc"
        ? b.fitness - a.fitness
        : a.fitness - b.fitness;
    }
    return 0;
  });

  // Get formation balance score
  const getFormationBalanceScore = () => {
    let filledPositions = 0;

    Object.entries(positionNeeds).forEach(([pos, count]) => {
      filledPositions += Math.min(positionsFilled[pos] || 0, count);
    });

    return Math.round((filledPositions / 11) * 100);
  };

  const handleResetSelection = () => {
    resetSelection();
    toast({
      title: "Selection Reset",
      description: "Your player selection has been reset.",
    });
  };

  const resetSelection = () => {
    setSelectedPlayers([]);
    setAutoSelected(false);
    setSortBy("rating");
    setSortOrder("desc");
    setPositionsFilled({});
  };

  // Handle confirm selection
  const handleConfirm = () => {
    if (selectedPlayers.length !== 11) {
      toast({
        title: "Invalid Selection",
        description: `You need to select exactly 11 players. Currently selected: ${selectedPlayers.length}`,
        variant: "destructive",
      });
      return;
    }

    onConfirm(selectedPlayers);
    handleOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Choose Best Lineup</DialogTitle>
          <DialogDescription>
            Select the best 11 players for your team based on the{" "}
            {baseFormation} formation
          </DialogDescription>
        </DialogHeader>

        {isProcessing ? (
          <div className="py-12 px-4">
            <h3 className="text-lg font-medium mb-4 text-center">
              Analyzing Players & Formation
            </h3>
            <LoadingBar
              progress={processingProgress}
              label="Optimizing lineup..."
              color="success"
              size="md"
            />
            <p className="text-center text-muted-foreground mt-4">
              Finding the best players for each position in {baseFormation}...
            </p>
          </div>
        ) : (
          <div className="py-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Sort by:</span>
                {SORT_TYPES.map(({ key, label }) => (
                  <Button
                    key={key}
                    variant={sortBy === key ? "default" : "outline"}
                    size="sm"
                    onClick={() =>
                      handleSortChange(key as "rating" | "form" | "fitness")
                    }
                    className="flex items-center gap-1"
                  >
                    {label}
                    {sortBy === key &&
                      (sortOrder === "desc" ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronUp className="h-4 w-4" />
                      ))}
                  </Button>
                ))}
              </div>

              <Button
                onClick={autoSelectBestPlayers}
                className="flex items-center gap-2"
              >
                <Wand2 className="h-4 w-4" />
                Auto-Select Best 11
              </Button>
            </div>

            <div className="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-md mb-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <span className="font-medium">Selected Players: </span>
                  <span
                    className={
                      selectedPlayers.length === 11
                        ? "text-green-600 font-bold"
                        : "font-bold"
                    }
                  >
                    {selectedPlayers.length}/11
                  </span>
                  <span className="ml-2 text-sm text-muted-foreground">
                    Formation: {baseFormation}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">Formation Balance:</span>
                  <span
                    className={`font-medium ${
                      getFormationBalanceScore() > 80
                        ? "text-green-600"
                        : getFormationBalanceScore() > 60
                          ? "text-amber-600"
                          : "text-red-600"
                    }`}
                  >
                    {getFormationBalanceScore()}%
                  </span>

                  {autoSelected && (
                    <Badge
                      variant="outline"
                      className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300"
                    >
                      Auto-Selected
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <BestLineupAvailable
                sortedPlayers={sortedPlayers}
                selectedPlayers={selectedPlayers}
                togglePlayerSelection={togglePlayerSelection}
              />

              <BestLineupSelected
                baseFormation={baseFormation || ""}
                positionNeeds={positionNeeds}
                positionsFilled={positionsFilled}
                selectedPlayers={selectedPlayers}
                togglePlayerSelection={togglePlayerSelection}
              />
            </div>
          </div>
        )}

        <DialogFooter className="flex">
          <Button
            variant="outline"
            className="me-auto"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
            Cancel
          </Button>
          <Button
            onClick={handleResetSelection}
            disabled={!selectedPlayers.length || isProcessing}
          >
            Reset Selection
            <Trash className="h-4 w-4" />
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={selectedPlayers.length !== 11 || isProcessing}
            className="flex items-center gap-2"
          >
            Confirm Selection
            <ArrowRight className="h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
