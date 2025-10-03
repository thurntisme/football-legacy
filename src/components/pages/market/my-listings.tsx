"use client";

import LoanConfirmationDialog from "../../loan-confirmation-dialog";
import MyListingsFilter from "../../my-listings-filter";

import { useState } from "react";

import ContentWrapper from "@/components/common/content-wrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { internalApi } from "@/lib/api/internal";
import { Player } from "@/types/player";
import { useQuery } from "@tanstack/react-query";

import MyListedPlayers from "./my-listed-players";

export default function MyListings() {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState<"remove" | "edit">("remove");

  const {
    data: playerData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["market-players"],
    queryFn: async () => {
      const res = await internalApi.get("/market/list");
      return res.data;
    },
  });

  // Sample player data
  const [players, setPlayers] = useState<Player[]>(
    playerData.map((player: Player) => {
      const status: Array<
        "listed" | "transfer-listed" | "loan-listed" | "not-listed"
      > = ["listed", "transfer-listed", "loan-listed", "not-listed"];
      const randomStatus = status[Math.floor(Math.random() * status.length)];
      return {
        ...player,
        transferStatus: player.transferStatus || randomStatus,
      };
    }),
  );

  const transferListedPlayers = players.filter(
    (player) => player.transferStatus === "transfer-listed",
  );
  const loanListedPlayers = players.filter(
    (player) => player.transferStatus === "loan-listed",
  );

  const handleRemoveFromList = (player: Player) => {
    setSelectedPlayer(player);
    setDialogAction("remove");
    setConfirmDialogOpen(true);
  };

  const confirmRemoveFromList = () => {
    if (selectedPlayer) {
      setPlayers(
        players.map((p) =>
          p.id === selectedPlayer.id
            ? { ...p, transferStatus: "not-listed" }
            : p,
        ),
      );
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
            Manage your transfer and loan listings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MyListingsFilter />

          <Tabs defaultValue="transfer-listed" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="transfer-listed">
                Transfer Listed ({transferListedPlayers.length})
              </TabsTrigger>
              <TabsTrigger value="loan-listed">
                Loan Listed ({loanListedPlayers.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="transfer-listed">
              <MyListedPlayers
                onRemoveFromList={handleRemoveFromList}
                list={transferListedPlayers}
              />
            </TabsContent>

            <TabsContent value="loan-listed">
              <MyListedPlayers
                list={loanListedPlayers}
                onRemoveFromList={handleRemoveFromList}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <LoanConfirmationDialog
        confirmDialogOpen={confirmDialogOpen}
        setConfirmDialogOpen={setConfirmDialogOpen}
        dialogAction={dialogAction}
        selectedPlayer={selectedPlayer}
        confirmRemoveFromList={confirmRemoveFromList}
      />
    </ContentWrapper>
  );
}
