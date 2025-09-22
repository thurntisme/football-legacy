"use client";

import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { players as playerData } from "@/constants/player";
import { toast } from "@/hooks/use-toast";
import { Player } from "@/types/football/player";

import LoanConfirmationDialog from "./loan-confirmation-dialog";
import LoanListed from "./loan-listed";
import MyListingsFilter from "./my-listings-filter";
import NotListed from "./not-listed";
import TransferListed from "./transfer-listed";

export default function MyListings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [positionFilter, setPositionFilter] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState<"remove" | "edit">("remove");

  // Sample player data
  const [players, setPlayers] = useState<Player[]>(
    playerData.map((player) => {
      const status: Array<
        "listed" | "transfer-listed" | "loan-listed" | "not-listed"
      > = ["listed", "transfer-listed", "loan-listed", "not-listed"];
      const randomStatus = status[Math.floor(Math.random() * status.length)];
      return {
        ...player,
        transferStatus: player.transferStatus || randomStatus,
      };
    })
  );

  // Filter and sort players
  const filteredPlayers = players
    .filter((player) => {
      // Search filter
      const matchesSearch =
        player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.nationality.toLowerCase().includes(searchTerm.toLowerCase());

      // Position filter
      const matchesPosition =
        positionFilter === "all" ||
        (positionFilter === "gk" && player.position === "GK") ||
        (positionFilter === "def" &&
          ["CB", "LB", "RB", "LWB", "RWB"].includes(player.position)) ||
        (positionFilter === "mid" &&
          ["CM", "CDM", "CAM", "LM", "RM"].includes(player.position)) ||
        (positionFilter === "att" &&
          ["ST", "LW", "RW", "CF"].includes(player.position));

      return matchesSearch && matchesPosition;
    })
    .sort((a, b) => {
      // Sort logic
      if (sortBy === "rating") {
        return b.rating - a.rating;
      } else if (sortBy === "age") {
        return a.age - b.age;
      } else if (sortBy === "value") {
        return b.marketValue - a.marketValue;
      }
      return 0;
    });

  const transferListedPlayers = filteredPlayers.filter(
    (player) => player.transferStatus === "transfer-listed"
  );
  const loanListedPlayers = filteredPlayers.filter(
    (player) => player.transferStatus === "loan-listed"
  );
  const notListedPlayers = filteredPlayers.filter(
    (player) => player.transferStatus === "not-listed"
  );

  const onAddToLoanList = (player: any) => {
    console.log("Adding to loan list:", player);
  };

  const handleAddToTransferList = (player: Player) => {
    setPlayers(
      players.map((p) =>
        p.id === player.id ? { ...p, transferStatus: "transfer-listed" } : p
      )
    );
    toast({
      title: "Player added to transfer list",
      description: `${player.name} has been added to your transfer listings.`,
    });
  };

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
            : p
        )
      );
      toast({
        title: "Player removed from listings",
        description: `${selectedPlayer.name} has been removed from your listings.`,
      });
      setConfirmDialogOpen(false);
    }
  };

  return (
    <>
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
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="transfer-listed">
                Transfer Listed ({transferListedPlayers.length})
              </TabsTrigger>
              <TabsTrigger value="loan-listed">
                Loan Listed ({loanListedPlayers.length})
              </TabsTrigger>
              <TabsTrigger value="not-listed">
                Not Listed ({notListedPlayers.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="transfer-listed">
              <TransferListed
                onRemoveFromList={handleRemoveFromList}
                list={transferListedPlayers}
              />
            </TabsContent>

            <TabsContent value="loan-listed">
              <LoanListed
                loanListedPlayers={loanListedPlayers}
                handleRemoveFromList={handleRemoveFromList}
              />
            </TabsContent>

            <TabsContent value="not-listed">
              <NotListed
                notListedPlayers={notListedPlayers}
                handleAddToTransferList={handleAddToTransferList}
                onAddToLoanList={onAddToLoanList}
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
    </>
  );
}
