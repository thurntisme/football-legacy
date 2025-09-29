"use client";

import { useEffect, useState } from "react";

import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Info,
  Trash,
  Wand2,
} from "lucide-react";

import { LoadingBar } from "@/components/loading-bar";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/components/ui/use-toast";
import {
  lineupFormations,
  positionCompatibility,
} from "@/constants/formations";
import { Player } from "@/types/player";

type Formation = {
  name: string;
  positions: string[];
};

interface BestLineupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  players: Player[];
  onConfirm: (selectedPlayers: Player[]) => void;
  currentFormation?: Formation;
}

export default function BestLineupDialog({
  open,
  onOpenChange,
  players,
  onConfirm,
  currentFormation = lineupFormations[0], // Default to 4-4-2 if not provided
}: BestLineupDialogProps) {
  const [sortBy, setSortBy] = useState<"rating" | "form" | "fitness">("rating");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [autoSelected, setAutoSelected] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [formation, setFormation] = useState<Formation>(currentFormation);
  const [positionNeeds, setPositionNeeds] = useState<Record<string, number>>(
    {},
  );
  const [positionsFilled, setPositionsFilled] = useState<
    Record<string, number>
  >({});

  // Calculate position needs based on formation
  useEffect(() => {
    const needs: Record<string, number> = {};
    formation.positions.forEach((pos) => {
      needs[pos] = (needs[pos] || 0) + 1;
    });
    setPositionNeeds(needs);

    // Reset positions filled
    updatePositionsFilled([]);
  }, [formation]);

  // Update positions filled count
  const updatePositionsFilled = (players: Player[]) => {
    const filled: Record<string, number> = {};

    players.forEach((player) => {
      // Find which position this player is filling
      for (const [formationPos, count] of Object.entries(positionNeeds)) {
        const compatiblePositions = positionCompatibility[formationPos] || [
          formationPos,
        ];
        if (
          compatiblePositions.includes(player.position) &&
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
    if (open) {
      setSelectedPlayers([]);
      setAutoSelected(false);
      setSortBy("rating");
      setSortOrder("desc");
      setFormation(currentFormation);
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

        // For each position in the formation, find the best player
        formation.positions.forEach((position, index) => {
          // Get compatible positions
          const compatiblePositions = positionCompatibility[position] || [
            position,
          ];

          // Filter players by compatible positions
          let eligiblePlayers = availablePlayers.filter((p) =>
            compatiblePositions.includes(p.position),
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
          description: `Selected the best 11 players based on ${sortBy} for ${formation.name} formation.`,
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

  // Get form badge
  const getFormBadge = (form: string) => {
    switch (form) {
      case "excellent":
        return <Badge className="bg-green-500">Excellent</Badge>;
      case "good":
        return <Badge className="bg-emerald-400">Good</Badge>;
      case "average":
        return <Badge className="bg-amber-400">Average</Badge>;
      case "poor":
        return <Badge className="bg-red-400">Poor</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Get fitness color
  const getFitnessColor = (fitness: number) => {
    if (fitness >= 90) return "text-green-500";
    if (fitness >= 75) return "text-emerald-400";
    if (fitness >= 60) return "text-amber-400";
    return "text-red-500";
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

  // Check if a position is properly filled
  const isPositionFilled = (position: string) => {
    return (positionsFilled[position] || 0) >= (positionNeeds[position] || 0);
  };

  // Get formation balance score
  const getFormationBalanceScore = () => {
    let filledPositions = 0;

    Object.entries(positionNeeds).forEach(([pos, count]) => {
      filledPositions += Math.min(positionsFilled[pos] || 0, count);
    });

    return Math.round((filledPositions / 11) * 100);
  };

  const handleResetSelection = () => {
    setSelectedPlayers([]);
    setAutoSelected(false);
    setSortBy("rating");
    setSortOrder("desc");
    setFormation(currentFormation);
    setPositionNeeds({});
    setPositionsFilled({});
    toast({
      title: "Selection Reset",
      description: "Your player selection has been reset.",
    });
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
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Choose Best Lineup</DialogTitle>
          <DialogDescription>
            Select the best 11 players for your team based on the{" "}
            {formation.name} formation
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
              Finding the best players for each position in {formation.name}...
            </p>
          </div>
        ) : (
          <div className="py-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Sort by:</span>
                <Button
                  variant={sortBy === "rating" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleSortChange("rating")}
                  className="flex items-center gap-1"
                >
                  Rating
                  {sortBy === "rating" &&
                    (sortOrder === "desc" ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronUp className="h-4 w-4" />
                    ))}
                </Button>
                <Button
                  variant={sortBy === "form" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleSortChange("form")}
                  className="flex items-center gap-1"
                >
                  Form
                  {sortBy === "form" &&
                    (sortOrder === "desc" ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronUp className="h-4 w-4" />
                    ))}
                </Button>
                <Button
                  variant={sortBy === "fitness" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleSortChange("fitness")}
                  className="flex items-center gap-1"
                >
                  Fitness
                  {sortBy === "fitness" &&
                    (sortOrder === "desc" ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronUp className="h-4 w-4" />
                    ))}
                </Button>
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
                    Formation: {formation.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">Formation Balance:</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center">
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
                          <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          How well your selected players match the required
                          positions in the {formation.name} formation
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

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
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-3 flex items-center">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs mr-2">
                    1
                  </span>
                  Available Players
                </h3>
                <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                  {sortedPlayers.map((player) => {
                    const isSelected = selectedPlayers.some(
                      (p) => p.id === player.id,
                    );
                    return (
                      <div
                        key={player.id}
                        className={`p-3 border rounded-md flex items-center justify-between cursor-pointer transition-colors ${
                          isSelected
                            ? "bg-primary/5 border-primary"
                            : "hover:bg-muted/50"
                        }`}
                        onClick={() => togglePlayerSelection(player)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-muted">
                            <img
                              src={"/placeholder.svg"}
                              alt={player.name}
                              className="w-full h-full rounded-full border-2 border-primary/20"
                            />
                          </div>
                          <div>
                            <div className="font-medium">{player.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {player.position} • Rating: {player.rating}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 flex-col items-end">
                          {getFormBadge(player.form)}
                          <span
                            className={`${getFitnessColor(player.fitness)}`}
                          >
                            {player.fitness}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-3 flex items-center">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs mr-2">
                    2
                  </span>
                  Selected Lineup ({formation.name})
                </h3>

                <div className="mb-4 grid grid-cols-3 gap-2 text-xs">
                  {Object.entries(positionNeeds).map(([position, count]) => (
                    <div
                      key={position}
                      className={`px-2 py-1 rounded-md border ${
                        isPositionFilled(position)
                          ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                          : "bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{position}</span>
                        <span
                          className={`${
                            isPositionFilled(position)
                              ? "text-green-600 dark:text-green-400"
                              : "text-amber-600 dark:text-amber-400"
                          }`}
                        >
                          {positionsFilled[position] || 0}/{count}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedPlayers.length > 0 ? (
                  <div className="space-y-2 max-h-[320px] overflow-y-auto pr-2">
                    {selectedPlayers.map((player) => (
                      <div
                        key={player.id}
                        className="p-3 border border-primary rounded-md flex items-center justify-between bg-primary/5"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full text-primary-foreground flex items-center justify-center">
                            <img
                              src={"/placeholder.svg"}
                              alt={player.name}
                              className="w-full h-full rounded-full border-2 border-primary/20"
                            />
                          </div>
                          <div>
                            <div className="font-medium">{player.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {player.position} • Rating: {player.rating}
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={(e) => {
                            e.stopPropagation();
                            togglePlayerSelection(player);
                          }}
                        >
                          ✕
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[200px] border border-dashed rounded-md">
                    <p className="text-muted-foreground mb-2">
                      No players selected
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Select players from the left panel
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <DialogFooter className="flex">
          <Button
            variant="outline"
            className="me-auto"
            onClick={() => onOpenChange(false)}
          >
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
