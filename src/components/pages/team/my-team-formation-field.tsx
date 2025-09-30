import React from "react";

import { ArrowDown, ArrowLeftRight, ArrowUp, InfoIcon } from "lucide-react";

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

import FieldMarking from "./field-marking";

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
  selectedPlayer: Player | null;
  setSelectedPlayer: (player: Player | null) => void;
  setDetailDialogOpen: (open: boolean) => void;
  setSelectedDetailPlayer: (player: Player) => void;
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
  selectedPlayer,
  setSelectedPlayer,
  setDetailDialogOpen,
  setSelectedDetailPlayer,
}: Props) => {
  const handleClickPlayer = (player: Player | null) => {
    console.log({ selected: player });
    if (player) {
      if (selectedPlayer && selectedPlayer.id === player.id) {
        setSelectedPlayer(null);
      } else {
        setSelectedPlayer(player);
      }
    }
  };

  const handleViewDetailPlayer = (player: Player | null) => {
    if (!player) return;
    setDetailDialogOpen(true);
    setSelectedDetailPlayer(player);
  };

  const handleSwapPlayer = (position: Position) => {
    if (!selectedPlayer) return;
    console.log("Swapping", {
      selectedPlayer: selectedPlayer.name,
      swapPlayer: position?.player?.name,
    });
    // handleSwapPlayers(position);
    // setSelectedPlayer(null);
  };

  return (
    <div className="relative w-full h-[500px] bg-emerald-800 rounded-lg overflow-hidden">
      <FieldMarking />

      <TooltipProvider>
        {positions.map((pos) => (
          <Dialog key={pos.id}>
            <DialogTrigger asChild>
              <div
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform `}
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                }}
              >
                {pos.player ? (
                  <div className="flex flex-col items-center relative pos-item w-[76px]">
                    <div
                      className="flex flex-col items-center"
                      onClick={() => {
                        handleClickPlayer(pos.player);
                      }}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center bg-white text-black font-bold text-sm relative ${
                          pos.player.fitness < 80 ? "opacity-70" : ""
                        } ${
                          swappablePositions.includes(pos.id) ||
                          (selectedPlayer &&
                            pos.player &&
                            selectedPlayer.id === pos.player.id)
                            ? "ring-4 ring-yellow-400 ring-opacity-70"
                            : ""
                        }`}
                      >
                        {pos.player.rating}
                        <div
                          className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${getFormColor(
                            pos.player.form,
                          )}`}
                        ></div>

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
                      <div className="mt-1.5 px-2 py-0.5 bg-black/70 rounded text-white text-xs whitespace-nowrap">
                        {pos.player.name.split(" ")[1]}
                      </div>
                    </div>

                    {selectedPlayer && selectedPlayer.id !== pos.player.id && (
                      <Button
                        size="sm"
                        variant="secondary"
                        className="w-5 h-5 p-0 bg-yellow-500 hover:bg-yellow-500 opacity-0 text-white text-xs absolute bottom-[16px] btn-swap"
                        onClick={() => handleSwapPlayer(pos)}
                      >
                        <ArrowLeftRight className="h-0.5 w-0.5" />
                      </Button>
                    )}
                  </div>
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
            {/* {!selectedSubstitute && renderPlayerSelectionDialog(pos)} */}
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
