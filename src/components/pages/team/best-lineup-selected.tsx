import React from "react";

import { Button } from "@/components/ui/button";
import { Player } from "@/types/player";

type Props = {
  baseFormation: string;
  positionNeeds: { [position: string]: number };
  positionsFilled: { [position: string]: number };
  selectedPlayers: Player[];
  togglePlayerSelection: (player: Player) => void;
};

const BestLineupSelected = ({
  baseFormation,
  positionNeeds,
  positionsFilled,
  selectedPlayers,
  togglePlayerSelection,
}: Props) => {
  const isPositionFilled = (position: string) => {
    return (positionsFilled[position] || 0) >= (positionNeeds[position] || 0);
  };

  return (
    <div className="border rounded-md p-4">
      <h3 className="font-medium mb-3 flex items-center">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs mr-2">
          2
        </span>
        Selected Lineup ({baseFormation})
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
          <p className="text-muted-foreground mb-2">No players selected</p>
          <p className="text-sm text-muted-foreground">
            Select players from the left panel
          </p>
        </div>
      )}
    </div>
  );
};

export default BestLineupSelected;
