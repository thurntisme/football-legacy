import React from "react";

import { ArrowLeftRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { getFormColor } from "@/lib/player";
import { Position } from "@/types/formation";
import { Player } from "@/types/player";

import FieldMarking from "./field-marking";

type Props = {
  positions: Position[];
  currentFormation: string | undefined;
  selectedPlayer: Player | null;
  setSelectedPlayer: (player: Player | null) => void;
  handleSwapPlayers: (position: Position) => void;
};

const MyTeamFormationField = ({
  positions,
  currentFormation,
  selectedPlayer,
  setSelectedPlayer,
  handleSwapPlayers,
}: Props) => {
  const handleClickPlayer = (player: Player | null) => {
    if (player) {
      if (selectedPlayer && selectedPlayer.id === player.id) {
        setSelectedPlayer(null);
      } else {
        setSelectedPlayer(player);
      }
    }
  };

  const handleSwapPlayer = (position: Position) => {
    handleSwapPlayers(position);
  };

  return (
    <div className="relative w-full h-[500px] bg-emerald-800 rounded-lg overflow-hidden">
      <FieldMarking />

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
                        selectedPlayer &&
                        pos.player &&
                        selectedPlayer.id === pos.player.id
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
                    </div>
                    <div className="mt-1.5 px-2 py-0.5 bg-black/70 rounded text-white text-xs whitespace-nowrap">
                      {pos.player.name.split(" ").length > 1
                        ? pos.player.name.split(" ")[1]
                        : pos.player.name}
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
        </Dialog>
      ))}

      <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
        {currentFormation}
      </div>
    </div>
  );
};

export default MyTeamFormationField;
