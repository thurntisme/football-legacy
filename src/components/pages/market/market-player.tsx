import React, { useState } from "react";

import { Heart, Info } from "lucide-react";

import PlayerDetailDialog from "@/components/player-detail-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { formatCurrency } from "@/lib/finance";
import { Player } from "@/types/player";

import MarketPlayerDetailDialog from "./market-player-detail-dialog";

type Props = {
  player: Player;
  favorites: Set<string>;
  selectedPlayer: Player | null;
  onToggleFavorite: (playerId: string) => void;
  onSelectPlayer: (player: Player) => void;
  purchasePlayer: (player: Player) => void;
};

const USER_BUDGET = 250000000;

const MarketPlayer = ({
  player,
  favorites,
  selectedPlayer,
  onToggleFavorite,
  onSelectPlayer,
  purchasePlayer,
}: Props) => {
  const [selectedDetailPlayer, setSelectedDetailPlayer] =
    useState<Player | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  const toggleFavorite = (playerId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    onToggleFavorite(playerId);
  };

  const viewDetailPlayer = (player: Player) => {
    setSelectedDetailPlayer(player);
    setIsDetailDialogOpen(true);
  };

  const onOpenDetailChange = (isOpen: boolean) => {
    setIsDetailDialogOpen(isOpen);
    if (!isOpen) {
      setSelectedDetailPlayer(null);
    }
  };

  const isPossibleToPurchase = USER_BUDGET >= player.marketValue;

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative">
          <div className="p-4 flex items-center space-x-3">
            <div className="relative">
              <img
                src={player.avatarUrl || "/placeholder.svg"}
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
                <span className="mx-2">{player.birthday}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {player.nationality}
              </div>
              <div className="text-sm font-medium mt-1">{player.clubId}</div>
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
            onClick={(event) => player.id && toggleFavorite(player.id, event)}
            className="w-8 h-8"
          >
            <Heart
              className={`h-4 w-4 ${player.id && favorites.has(player.id) ? "fill-red-500 text-red-500" : ""}`}
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={(e) => {
              e.stopPropagation();
              viewDetailPlayer(player);
            }}
          >
            <Info className="h-4 w-4" />
          </Button>

          <PlayerDetailDialog
            player={selectedDetailPlayer}
            open={isDetailDialogOpen}
            onOpenChange={onOpenDetailChange}
          />
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
