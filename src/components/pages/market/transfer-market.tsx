"use client";

import ContentWrapper from "../../common/content-wrapper";
import MarketPlayerDialog from "../../market-player-dialog";

import type React from "react";
import { useState } from "react";

import { ChevronDown, ChevronUp, Filter, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { internalApi } from "@/lib/api/internal";
import { Player } from "@/types/player";
import { useQuery } from "@tanstack/react-query";

import MarketPlayer from "./market-player";
import TransferMarketFilter from "./transfer-market-filter";

export default function TransferMarket() {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [playerToBuy, setPlayerToBuy] = useState<Player | null>(null);
  const [showBuyDialog, setShowBuyDialog] = useState<boolean>(false);
  const [showPlayerDetails, setShowPlayerDetails] = useState<boolean>(false);

  // Add a new state for favorite players
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [showFavorites, setShowFavorites] = useState<boolean>(false);

  // Filter states
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
  const [selectedNationalities, setSelectedNationalities] = useState<string[]>(
    [],
  );

  const {
    data: marketPlayers,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["market-players"],
    queryFn: async () => {
      const res = await internalApi.get("/market/list");
      return res.data;
    },
  });

  // Add a function to toggle favorite status
  const handleToggleFavorite = (playerId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(playerId)) {
      newFavorites.delete(playerId);
      toast({
        title: "Removed from Favorites",
        description: "Player has been removed from your favorites list",
      });
    } else {
      newFavorites.add(playerId);
      toast({
        title: "Added to Favorites",
        description: "Player has been added to your favorites list",
      });
    }
    setFavorites(newFavorites);
  };

  const handleSelectPlayer = (player: Player) => {
    setSelectedPlayer(player);
    setShowPlayerDetails(true);
  };

  const handleSetPlayerToBuy = (player: Player) => {
    setPlayerToBuy(player);
    setShowBuyDialog(true);
  };

  const handlePurchasePlayer = (player: Player) => {
    toast({
      title: "Player Purchased!",
      description: `You have successfully signed ${player.name} for £${(player.marketValue / 1000000).toFixed(1)}M`,
    });
    setPlayerToBuy(null);
  };

  return (
    <ContentWrapper isLoading={isLoading} error={error}>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Available Players</h3>
          <div className="flex gap-2">
            <Button
              variant={showFavorites ? "default" : "outline"}
              onClick={() => setShowFavorites(!showFavorites)}
              className="flex items-center gap-2"
            >
              <Star
                className={`h-4 w-4 ${showFavorites ? "fill-white" : ""}`}
              />
              {showFavorites ? "Showing Favorites" : "Show Favorites"}
            </Button>
            <Button
              variant={showFilters ? "default" : "outline"}
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
              {showFilters ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronUp className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        <TransferMarketFilter
          showFilters={showFilters}
          setShowFilters={setShowFilters}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {marketPlayers && marketPlayers.length > 0 ? (
            marketPlayers.map((player: Player) => (
              <MarketPlayer
                key={player.id}
                player={player}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onSelectPlayer={handleSelectPlayer}
                purchasePlayer={handlePurchasePlayer}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              {showFavorites
                ? "No favorite players found."
                : "No players match your filters."}
            </div>
          )}
        </div>
      </div>

      {/* <MarketPlayerDialog
        showPlayerDetails={showPlayerDetails}
        setShowPlayerDetails={setShowPlayerDetails}
        selectedPlayer={selectedPlayer}
        favorites={favorites}
        handleToggleFavorite={handleToggleFavorite}
        handleBuyPlayer={handleBuyPlayer}
      /> */}
    </ContentWrapper>
  );
}
