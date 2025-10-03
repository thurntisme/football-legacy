import React from "react";

import { Heart, Info, ShoppingCart, Star } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { formatCurrency } from "@/lib/finance";
import { Player } from "@/types/player";

type Props = {
  key: string;
  player: Player;
  favorites: Set<string>;
  onToggleFavorite: (playerId: string) => void;
  onSelectPlayer: (player: Player) => void;
  onSetPlayerToBuy: (player: Player) => void;
  onBuyPlayer: (player: Player) => void;
};

const MarketPlayer = ({
  key,
  player,
  favorites,
  onToggleFavorite,
  onSelectPlayer,
  onSetPlayerToBuy,
  onBuyPlayer,
}: Props) => {
  const toggleFavorite = (playerId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    onToggleFavorite(playerId);
  };

  const setSelectedPlayer = (player: any) => {
    onSelectPlayer(player);
  };

  const handleBuyPlayer = (player: any) => {
    onBuyPlayer(player);
  };

  const setPlayerToBuy = (player: any) => {
    onSetPlayerToBuy(player);
  };

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
            onClick={(event) => toggleFavorite(player.uuid, event)}
            className="rounded-full w-8 h-8"
          >
            <Heart
              className={`h-4 w-4 ${favorites.has(player.uuid) ? "fill-red-500 text-red-500" : ""}`}
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedPlayer(player)}
            className="rounded-full w-8 h-8"
          >
            <Info className="h-4 w-4" />
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                size="icon"
                onClick={() => setPlayerToBuy(player)}
                className="w-8 h-8"
              >
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Purchase</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to sign <b>{player.name}</b> for £
                  {(player.market_value / 1000000).toFixed(1)}M?
                  <div className="mt-2 p-3 bg-muted rounded-md">
                    <div className="flex justify-between mb-1">
                      <span>Transfer Fee:</span>
                      <span className="font-medium">
                        £{(player.market_value / 1000000).toFixed(1)}M
                      </span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span>Weekly Wage:</span>
                      <span className="font-medium">
                        £
                        {Math.round(player.market_value / 500).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t mt-2">
                      <span className="font-bold">Remaining Budget:</span>
                      <span className="font-bold">
                        £
                        {25000000 - player.market_value > 0
                          ? (
                              (25000000 - player.market_value) /
                              1000000
                            ).toFixed(1)
                          : 0}
                        M
                      </span>
                    </div>
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleBuyPlayer(player)}>
                  Confirm Purchase
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MarketPlayer;
