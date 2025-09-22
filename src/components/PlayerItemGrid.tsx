"use client";

import { Badge } from "@/components/ui/badge";
import { PlayerItem } from "@/constants/player-items";

interface PlayerItemGridProps {
  playerItems: PlayerItem[];
  handleGeneratePlayer: (item: PlayerItem) => void;
}

export default function PlayerItemGrid({
  playerItems,
  handleGeneratePlayer,
}: PlayerItemGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {playerItems.map((item) => (
        <div
          key={item.id}
          className="p-4 border rounded-lg cursor-pointer transition-all hover:border-primary/50"
          onClick={() => handleGeneratePlayer(item)}
        >
          <div className="flex items-center">
            <div className="mr-4 p-2 rounded-full bg-muted">
              <item.icon className={item.iconClassName} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{item.name}</h3>
                <Badge
                  className={
                    item.rarity === "common"
                      ? "bg-blue-100 text-blue-800"
                      : item.rarity === "rare"
                      ? "bg-purple-100 text-purple-800"
                      : item.rarity === "epic"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-red-100 text-red-800"
                  }
                >
                  {item.rarity.charAt(0).toUpperCase() + item.rarity.slice(1)}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {item.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
