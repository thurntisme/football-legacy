import React from "react";

import { ArrowDown, ArrowLeftRight, ArrowUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getFormColor } from "@/lib/player";
import { Position } from "@/types/formation";
import { Player } from "@/types/player";

type Props = {
  positions: Position[];
  swappablePositions: string[];
  handleSwapPlayers: (position: Position) => void;
  setSelectedPosition: (position: Position) => void;
  setPlayerToAssign: (player: Player | null) => void;
  selectedSubstitute: Player | null;
  currentFormation: string | undefined;
  tactics: string;
  renderPlayerSelectionDialog: (position: Position) => React.ReactNode;
};

const MyTeamFormationField = ({
  positions,
  swappablePositions,
  handleSwapPlayers,
  setSelectedPosition,
  setPlayerToAssign,
  selectedSubstitute,
  currentFormation,
  tactics,
  renderPlayerSelectionDialog,
}: Props) => {
  return (
    <div className="relative w-full h-[500px] bg-emerald-800 rounded-lg overflow-hidden">
      {/* Field markings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[80%] h-[90%] border-2 border-white/50"></div>
        <div className="absolute w-[40%] h-[20%] bottom-0 border-2 border-white/50 border-b-0"></div>
        <div className="absolute w-[40%] h-[20%] top-0 border-2 border-white/50 border-t-0"></div>
        <div className="absolute w-[15%] aspect-square rounded-full border-2 border-white/50"></div>
        <div className="absolute w-1 h-1 bg-white rounded-full"></div>
      </div>

      {/* Players */}
      <TooltipProvider>
        {positions.map((pos) => (
          <Dialog key={pos.id}>
            <DialogTrigger asChild>
              <div
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform hover:scale-110 ${
                  swappablePositions.includes(pos.id)
                    ? "ring-4 ring-yellow-400 ring-opacity-70"
                    : ""
                }`}
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  zIndex: (pos.y - 15) / 5,
                }}
                onClick={() => {
                  if (
                    selectedSubstitute &&
                    swappablePositions.includes(pos.id)
                  ) {
                    // If a substitute is selected and this position is swappable, swap players
                    handleSwapPlayers(pos);
                  } else {
                    // Otherwise, open the player selection dialog
                    setSelectedPosition(pos);
                    setPlayerToAssign(pos.player);
                  }
                }}
              >
                {pos.player ? (
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center bg-white text-black font-bold text-sm relative ${
                            pos.player.fitness < 80 ? "opacity-70" : ""
                          }`}
                        >
                          {pos.player.rating}
                          <div
                            className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${getFormColor(
                              pos.player.form,
                            )}`}
                          ></div>

                          {/* Tactical indicators */}
                          {tactics === "attacking" && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-white flex items-center justify-center">
                              <ArrowUp className="h-2 w-2 text-green-600" />
                            </div>
                          )}
                          {tactics === "defensive" && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-white flex items-center justify-center">
                              <ArrowDown className="h-2 w-2 text-amber-600" />
                            </div>
                          )}
                          {tactics === "counter" && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-white flex items-center justify-center">
                              <div className="flex items-center">
                                <ArrowDown className="h-2 w-2 text-amber-600" />
                                <ArrowUp className="h-2 w-2 -ml-1 text-green-600" />
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="mt-1 px-2 py-0.5 bg-black/70 rounded text-white text-xs whitespace-nowrap">
                          {pos.player.name.split(" ")[1]}
                        </div>

                        {/* Swap button for swappable positions */}
                        {selectedSubstitute &&
                          swappablePositions.includes(pos.id) && (
                            <Button
                              size="sm"
                              variant="secondary"
                              className="mt-1 px-2 py-0.5 bg-yellow-500 hover:bg-yellow-600 text-white text-xs"
                            >
                              <ArrowLeftRight className="h-3 w-3 mr-1" />
                              Swap
                            </Button>
                          )}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="space-y-1 p-1">
                        <p className="font-medium">{pos.player.name}</p>
                        <div className="flex items-center gap-2 text-xs">
                          <Badge variant="outline">{pos.player.position}</Badge>
                          <span>Rating: {pos.player.rating}</span>
                          <span>Fitness: {pos.player.fitness}%</span>
                        </div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/30 text-white font-bold text-sm border-2 border-dashed border-white/50">
                      +
                    </div>
                    <div className="mt-1 px-2 py-0.5 bg-black/70 rounded text-white text-xs whitespace-nowrap">
                      {pos.id.toUpperCase()}
                    </div>
                  </div>
                )}
              </div>
            </DialogTrigger>
            {!selectedSubstitute && renderPlayerSelectionDialog(pos)}
          </Dialog>
        ))}
      </TooltipProvider>

      {/* Formation name overlay */}
      <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
        {currentFormation} •{" "}
        <span className="ml-1">
          {tactics.charAt(0).toUpperCase() + tactics.slice(1)}
        </span>
      </div>
    </div>
  );
};

export default MyTeamFormationField;
