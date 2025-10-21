import React, { useCallback, useEffect, useState } from "react";

import { PlayerPosition } from "@/constants/formations";
import { getFormationPositions } from "@/lib/formation";
import { getPositionColor } from "@/lib/player";
import { Position } from "@/types/formation";
import { Player } from "@/types/player";

import PitchMarking from "./pitch-marking";

type Props = {
  className?: string;
  formations: string[];
  players: Player[][];
  selectedPlayer?: Player | null;
  isShowName?: boolean;
  isShowRating?: boolean;
  onSelectPlayer?: (player: Player | null) => void;
};
type Redirect = "left" | "right";

const Pitch = ({
  className,
  formations,
  players,
  selectedPlayer,
  isShowName,
  isShowRating,
  onSelectPlayer,
}: Props) => {
  const [homePositions, setHomePositions] = useState<Position[]>([]);
  const [awayPositions, setAwayPositions] = useState<Position[]>([]);

  useEffect(() => {
    if (!players?.length || !formations?.length) return;
    formations.forEach((item, index) => {
      const formationPositions = getFormationPositions(item);
      const basePositions = formationPositions.map((pos, idx) => ({
        ...pos,
        player: players[index]?.[idx] || null,
      }));
      if (index === 0) {
        setHomePositions(basePositions);
      } else {
        setAwayPositions(basePositions);
      }
    });
  }, [formations, players]);

  const onClickPlayer = useCallback(
    (player: Player | null) => {
      if (player && onSelectPlayer) {
        onSelectPlayer(player);
      }
    },
    [onSelectPlayer],
  );

  const renderPlayers = useCallback(
    (positions: Position[], redirect: Redirect = "left") => {
      if (!positions.length) return null;
      return (
        <>
          {positions.map((pos, index) => (
            <div
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform w-[25%]"
              style={{
                left: `${redirect === "right" ? 100 - pos.x : pos.x}%`,
                top: `${redirect === "right" ? 100 - pos.y : pos.y}%`,
              }}
              key={index}
            >
              {pos.player ? (
                <div className="flex flex-col items-center relative pos-item w-full">
                  <div
                    className={`w-[25%] max-w-[40px] min-w-[20px] player-dot aspect-square rounded-full flex items-center justify-center text-black font-bold text-sm relative ${
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
                    onClick={() => onClickPlayer(pos.player)}
                  >
                    <span className="text-[0.6rem] leading-[1]">
                      {isShowRating ? pos.player.rating : ""}
                    </span>
                  </div>
                  <div
                    className={`flex flex-col items-center absolute -bottom-[75%] player-name pointer-events-none ${isShowName ? "opacity-100" : "opacity-0"}`}
                  >
                    <div className="px-2 py-0.5 bg-black/70 rounded text-white text-[10px] leading-[1.2] whitespace-nowrap">
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
          ))}
        </>
      );
    },
    [selectedPlayer, onClickPlayer],
  );

  const teamSides = [homePositions, awayPositions]
    .filter((item) => item.length > 0)
    .map((item, index) => {
      return {
        key: index,
        side: index === 0 ? "home" : "away",
        className: index === 0 ? "left-0" : "right-0",
        players: item,
        redirect: index === 0 ? "left" : "right",
      };
    });

  return (
    <div
      className={`relative w-full h-fit bg-emerald-800 rounded-lg overflow-hidden ${className || ""}`}
    >
      <PitchMarking />
      {teamSides.map(({ key, className: sideClass, players, redirect }) => (
        <div
          key={key}
          className={`absolute h-full top-0 ${sideClass} z-10`}
          style={{ width: formations.length > 1 ? "50%" : "100%" }}
        >
          {renderPlayers(players, redirect as Redirect)}
        </div>
      ))}
    </div>
  );
};

export default Pitch;
