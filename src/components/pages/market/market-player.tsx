import React from "react";

import { Check, Heart, Info, ShoppingCart, Star, X } from "lucide-react";

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
  purchasePlayer: (player: Player) => void;
};

const USER_BUDGET = 250000000;

const MarketPlayer = ({
  key,
  player,
  favorites,
  onToggleFavorite,
  onSelectPlayer,
  purchasePlayer,
}: Props) => {
  const toggleFavorite = (playerId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    onToggleFavorite(playerId);
  };

  const setSelectedPlayer = (player: any) => {
    onSelectPlayer(player);
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
              <Button size="icon" className="w-8 h-8">
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Purchase</AlertDialogTitle>
                <AlertDialogDescription>
                  {isPossibleToPurchase ? (
                    <>
                      Are you sure you want to sign <b>{player.name}</b>?
                      <div className="mt-2 p-3 bg-muted rounded-md">
                        <div className="flex justify-between mb-1">
                          <span>Your Budget:</span>
                          <span className="font-medium">
                            {formatCurrency(USER_BUDGET)}
                          </span>
                        </div>
                        <div className="flex justify-between mb-1">
                          <span>Player Market Value:</span>
                          <span className="font-medium">
                            {formatCurrency(player.marketValue)}
                          </span>
                        </div>
                        <div className="flex justify-between pt-2 border-t mt-2">
                          <span className="font-bold">Remaining Budget:</span>
                          <span className="font-bold">
                            {formatCurrency(USER_BUDGET - player.marketValue)}
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      You don't have enough budget to sign <b>{player.name}</b>.
                    </>
                  )}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>
                  <X className="h-4 w-4" />
                  {isPossibleToPurchase ? "Cancel" : "Close"}
                </AlertDialogCancel>
                {isPossibleToPurchase && (
                  <AlertDialogAction onClick={() => purchasePlayer(player)}>
                    <Check className="h-4 w-4" />
                    Confirm Purchase
                  </AlertDialogAction>
                )}
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MarketPlayer;
