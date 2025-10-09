"use client";

import { useState } from "react";

import { ChevronDown, ChevronUp } from "lucide-react";

import { toast } from "@/components/ui/use-toast";
import { youthPlayerList } from "@/mock/football";
import { YouthPlayer } from "@/types/player";

import ConfirmLoanDialog from "./confirm-loan-dialog";
import ConfirmMarketDialog from "./confirm-market-dialog";
import ConfirmPromoteDialog from "./confirm-promote-dialog";
import GenerateYouthPlayerDialog from "./generate-youth-player-dialog";
import YouthPlayersFilter from "./youth-players-filter";
import YouthPlayersTable from "./youth-players-table";

export default function YouthPlayers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [positionFilter, setPositionFilter] = useState("All");
  const [sortBy, setSortBy] = useState("potential");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedPlayer, setSelectedPlayer] = useState<YouthPlayer | null>(
    null,
  );
  const [generatePlayerDialogOpen, setGeneratePlayerDialogOpen] =
    useState(false);
  const [confirmPromoteDialogOpen, setConfirmPromoteDialogOpen] =
    useState(false);
  const [confirmLoanDialogOpen, setConfirmLoanDialogOpen] = useState(false);
  const [confirmMarketDialogOpen, setConfirmMarketDialogOpen] = useState(false);
  const [playerToAction, setPlayerToAction] = useState<YouthPlayer | null>(
    null,
  );
  // Generate player form state
  const [generatedPlayerName, setGeneratedPlayerName] = useState("");
  const [generatedPlayerAge, setGeneratedPlayerAge] = useState([16]);
  const [generatedPlayerPosition, setGeneratedPlayerPosition] = useState("ST");
  const [generatedPlayerNationality, setGeneratedPlayerNationality] =
    useState("England");
  const [generatedPlayerPotential, setGeneratedPlayerPotential] =
    useState("random");
  const [generatedPlayerCost, setGeneratedPlayerCost] = useState(50000); // Default cost
  // Filter and sort players
  const filteredPlayers = youthPlayerList
    .filter(
      (player) =>
        player.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (positionFilter === "All" || player.position === positionFilter),
    )
    .sort((a, b) => {
      const aValue = a[sortBy as keyof YouthPlayer];
      const bValue = b[sortBy as keyof YouthPlayer];
      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    }) as YouthPlayer[];
  const toggleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };
  const getSortIcon = (field: string) => {
    if (sortBy !== field) return null;
    return sortOrder === "asc" ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    );
  };
  const handlePromotePlayer = (player: any) => {
    setPlayerToAction(player);
    setConfirmPromoteDialogOpen(true);
  };
  const handleLoanPlayer = (player: any) => {
    setPlayerToAction(player);
    setConfirmLoanDialogOpen(true);
  };
  const handlePlaceOnMarket = (player: any) => {
    setPlayerToAction(player);
    setConfirmMarketDialogOpen(true);
  };
  const confirmPromoteToFirstTeam = () => {
    // In a real app, this would handle the promotion logic
    toast({
      title: "Player Promoted",
      description: `${playerToAction?.name || "Player"} has been promoted to the first team.`,
    });
    setConfirmPromoteDialogOpen(false);
  };
  const confirmLoanOut = () => {
    // In a real app, this would handle the loan logic
    toast({
      title: "Player Loaned Out",
      description: `${playerToAction?.name || "Player"} has been sent on loan for development.`,
    });
    setConfirmLoanDialogOpen(false);
  };
  const confirmPlaceOnMarket = () => {
    // In a real app, this would handle placing the player on the transfer market
    toast({
      title: "Player Listed",
      description: `${playerToAction?.name || "Player"} has been placed on the transfer market.`,
    });
    setConfirmMarketDialogOpen(false);
  };
  const handleGeneratePlayer = () => {
    // Calculate cost based on potential
    let finalCost = generatedPlayerCost;
    if (generatedPlayerPotential === "high") {
      finalCost = 150000;
    } else if (generatedPlayerPotential === "very-high") {
      finalCost = 300000;
    }
    // In a real app, this would generate a new youth player with the specified attributes
    toast({
      title: "Youth Player Generated",
      description: `${generatedPlayerName} (${generatedPlayerPosition}, ${generatedPlayerAge[0]}) has been added to your youth academy. Cost: £${finalCost.toLocaleString()}`,
    });
    setGeneratePlayerDialogOpen(false);
  };
  return (
    <div className="space-y-6">
      <YouthPlayersFilter
        setGeneratePlayerDialogOpen={setGeneratePlayerDialogOpen}
      />
      <YouthPlayersTable
        toggleSort={toggleSort}
        getSortIcon={getSortIcon}
        filteredPlayers={filteredPlayers}
        handlePromotePlayer={handlePromotePlayer}
        handleLoanPlayer={handleLoanPlayer}
        handlePlaceOnMarket={handlePlaceOnMarket}
      />
      <GenerateYouthPlayerDialog
        generatePlayerDialogOpen={generatePlayerDialogOpen}
        setGeneratePlayerDialogOpen={setGeneratePlayerDialogOpen}
        handleGeneratePlayer={handleGeneratePlayer}
      />
      <ConfirmPromoteDialog
        confirmPromoteDialogOpen={confirmPromoteDialogOpen}
        setConfirmPromoteDialogOpen={setConfirmPromoteDialogOpen}
        playerToAction={playerToAction}
        confirmPromoteToFirstTeam={confirmPromoteToFirstTeam}
      />
      <ConfirmLoanDialog
        confirmLoanDialogOpen={confirmLoanDialogOpen}
        setConfirmLoanDialogOpen={setConfirmLoanDialogOpen}
        playerToAction={playerToAction}
        confirmLoanOut={confirmLoanOut}
      />
      <ConfirmMarketDialog
        confirmMarketDialogOpen={confirmMarketDialogOpen}
        setConfirmMarketDialogOpen={setConfirmMarketDialogOpen}
        playerToAction={playerToAction}
        confirmPlaceOnMarket={confirmPlaceOnMarket}
      />
    </div>
  );
}
