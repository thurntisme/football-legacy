"use client";

import { useState } from "react";

import ContentWrapper from "@/components/common/content-wrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { toast } from "@/hooks/use-toast";
import { internalApi } from "@/lib/api/internal";
import { Player } from "@/types/player";
import { useQuery } from "@tanstack/react-query";

import MyListedPlayers from "./my-listed-players";
import MyListingsFilter from "./my-listings-filter";

export default function MyListings() {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const {
    data: players,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["my-market-players"],
    queryFn: async () => {
      const res = await internalApi.get("/api/market/my-list");
      return res.data?.players || res.data?.data || [];
    },
  });

  const transferListedPlayers = players || [];

  const handleRemoveFromList = (player: Player) => {
    setSelectedPlayer(player);
    setConfirmDialogOpen(true);
  };

  const confirmRemoveFromList = () => {
    if (selectedPlayer) {
      toast({
        title: "Player removed from listings",
        description: `${selectedPlayer.name} has been removed from your listings.`,
      });
      setConfirmDialogOpen(false);
    }
  };

  return (
    <ContentWrapper isLoading={isLoading} error={error}>
      <Card>
        <CardHeader>
          <CardTitle>My Listings</CardTitle>
          <CardDescription>
            Manage your transfer listings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MyListingsFilter />

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                Transfer Listed ({transferListedPlayers.length})
              </h3>
            </div>

            <MyListedPlayers
              onRemoveFromList={handleRemoveFromList}
              list={transferListedPlayers}
            />
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      {confirmDialogOpen && selectedPlayer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Confirm Removal</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to remove {selectedPlayer.name} from your transfer listings?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setConfirmDialogOpen(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmRemoveFromList}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </ContentWrapper>
  );
}
