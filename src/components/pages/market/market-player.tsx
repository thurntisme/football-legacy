import React from "react";

import { Heart } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { formatCurrency } from "@/lib/finance";
import { Player } from "@/types/player";

import ConfirmPurchasePlayerDialog from "./confirm-purchase-player-dialog";
import MarketPlayerDetailDialog from "./market-player-detail-dialog";

type Props = {
  key: string;
  player: Player;
  favorites: Set<string>;
  selectedPlayer: Player | null;
  onToggleFavorite: (playerId: string) => void;
  onSelectPlayer: (player: Player) => void;
  purchasePlayer: (player: Player) => void;
};

const USER_BUDGET = 250000000;

const MarketPlayer = ({
  key,
  player,
  favorites,
  selectedPlayer,
  onToggleFavorite,
  onSelectPlayer,
  purchasePlayer,
}: Props) => {
  const toggleFavorite = (playerId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    onToggleFavorite(playerId);
  };

  const isPossibleToPurchase = USER_BUDGET >= player.marketValue;

  return (
    <Card key={key} className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative">
          <div className="p-4 flex items-center space-x-3">
            <div className="relative">
              <img
                src={player.avatar_url || "/placeholder.svg"}
                alt={player.name}
                className="w-20 h-20 rounded-full border-2 border-primary/20 object-cover"
              />
              <div className="absolute -bottom-2 left-[50%] -translate-x-1/2">
                <Badge variant="secondary" className="font-bold">
                  {player.rating}
                </Badge>
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="font-bold">{player.name}</h3>
              <div className="flex items-center text-sm text-muted-foreground">
                <span className="mr-2">{player.position}</span>
                <span>•</span>
                <span className="mx-2">{player.age} yrs</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {player.nationality}
              </div>
              <div className="text-sm font-medium mt-1">{player.club}</div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between py-2 px-4 border-t">
        <div className="text-lg font-bold">
          {formatCurrency(player.marketValue)}
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={(event) => toggleFavorite(player.id, event)}
            className="rounded-full w-8 h-8"
          >
            <Heart
              className={`h-4 w-4 ${favorites.has(player.id) ? "fill-red-500 text-red-500" : ""}`}
            />
          </Button>

          <MarketPlayerDetailDialog
            player={player}
            selectedPlayer={selectedPlayer}
            isPossibleToPurchase={isPossibleToPurchase}
            userBudget={USER_BUDGET}
            onSelectPlayer={onSelectPlayer}
            purchasePlayer={purchasePlayer}
          />
        </div>
      </CardFooter>
    </Card>
  );
};

export default MarketPlayer;
