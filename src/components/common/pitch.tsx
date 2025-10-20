import React, { useCallback, useEffect, useState } from "react";

import { PlayerPosition } from "@/constants/formations";
import { getFormationPositions } from "@/lib/formation";
import { getPositionColor } from "@/lib/player";
import { Position } from "@/types/formation";
import { Player } from "@/types/player";

import PitchMarking from "./pitch-marking";

type Props = {
  className?: string;
  formation: string;
  players: Player[];
  isInMatch?: boolean;
  selectedPlayer?: Player | null;
  onSelectPlayer?: (player: Player | null) => void;
};

const Pitch = ({
  className,
  formation,
  players,
  isInMatch = false,
  selectedPlayer,
  onSelectPlayer,
}: Props) => {
  const [positions, setPositions] = useState<Position[]>([]);

  const loadPlayerInFormation = useCallback(
    (formation: string) => {
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

  const onClickPlayer = (player: Player | null) => {
    if (player && onSelectPlayer) {
      onSelectPlayer(player);
    }
  };

  return (
    <div
      className={`relative w-full h-fit bg-emerald-800 rounded-lg overflow-hidden ${className || ""}`}
    >
      <PitchMarking />

      <div
        className={`absolute h-full top-0 left-0 z-10`}
        style={{
          width: isInMatch ? "50%" : "100%",
        }}
      >
        {positions.length
          ? positions.map((pos, index) => (
              <div
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform w-[25%]`}
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                }}
                key={index}
              >
                {pos.player ? (
                  <div className="flex flex-col items-center relative pos-item w-full">
                    <div
                      className={`w-[25%] max-w-[40px] player-dot aspect-square rounded-full flex items-center justify-center text-black font-bold text-sm relative ${
                        pos.player.fitness < 80 ? "opacity-70" : ""
                      } ${
                        selectedPlayer &&
                        pos.player &&
                        selectedPlayer.id === pos.player.id
                          ? "ring-4 ring-yellow-400 ring-opacity-70"
                          : ""
                      } shadow-[0_0_20px_5px_rgba(255,255,255,0.5)] hover:ring-4 hover:ring-yellow-400 ring-opacity-70`}
                      style={{
                        backgroundColor: getPositionColor(
                          pos.player.position as PlayerPosition,
                        ),
                      }}
                      onClick={() => {
                        onClickPlayer(pos.player);
                      }}
                    >
                      <span className="text-sm">{pos.player.rating}</span>
                    </div>
                    <div className="flex flex-col items-center absolute -bottom-[65%] player-name pointer-events-none">
                      <div className="px-2 py-0.5 bg-black/70 rounded text-white text-[10px] whitespace-nowrap">
                        {pos.player.name.split(" ").length > 1
                          ? pos.player.name.split(" ")[1]
                          : pos.player.name}
                      </div>
                    </div>
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
            ))
          : null}
      </div>
    </div>
  );
};

export default Pitch;
