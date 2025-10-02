import React from "react";

import { getFitnessColor, getFormBadge } from "@/lib/player";
import { Player } from "@/types/player";

type Props = {
  sortedPlayers: Player[];
  selectedPlayers: Player[];
  togglePlayerSelection: (player: Player) => void;
};

const BestLineupAvailable = ({
  sortedPlayers,
  selectedPlayers,
  togglePlayerSelection,
}: Props) => {
  return (
    <div className="border rounded-md p-4">
      <h3 className="font-medium mb-3 flex items-center">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs mr-2">
          1
        </span>
        Available Players
      </h3>
      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
        {sortedPlayers.map((player) => {
          const isSelected = selectedPlayers.some((p) => p.id === player.id);
          return (
            <div
              key={player.id}
              className={`p-3 border rounded-md flex items-center justify-between cursor-pointer transition-colors ${
                isSelected ? "bg-primary/5 border-primary" : "hover:bg-muted/50"
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
                <span className={`${getFitnessColor(player.fitness)}`}>
                  {player.fitness}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BestLineupAvailable;
