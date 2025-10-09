"use client";

import type React from "react";
import { useState } from "react";

import { Filter, Search } from "lucide-react";

import PlayerDetailDialog from "@/components/player-detail-dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Player } from "@/types/player";

import NationalTeamIncomeSummary from "./national-team-income-summary";
import PlayerContractEditDialog from "./player-contract-edit-dialog";
import PlayerEditDialog from "./player-edit-dialog";
import PlayerNationalTeamDialog from "./player-national-team-dialog";
import PlayerTable from "./player-table";
import PlayerUpgradeDialog from "./player-upgrade-dialog";

type PlayerListProps = {
  initPlayers: Player[];
};

export default function TeamPlayerList({ initPlayers }: PlayerListProps) {
  // State management for player list
  const [players, setPlayers] = useState<Player[]>(() => initPlayers);
  const [searchTerm, setSearchTerm] = useState("");
  const [positionFilter, setPositionFilter] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const [selectedDetailPlayer, setSelectedDetailPlayer] =
    useState<Player | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);
  const [editedAttributes, setEditedAttributes] = useState<
    Record<string, number>
  >({});
  const [selectedPlayerForUpgrade, setSelectedPlayerForUpgrade] =
    useState<Player | null>(null);
  const [upgradeDialogOpen, setUpgradeDialogOpen] = useState(false);
  // New state for national team dialog
  const [nationalTeamDialogOpen, setNationalTeamDialogOpen] = useState(false);
  const [selectedPlayerForNational, setSelectedPlayerForNational] =
    useState<Player | null>(null);
  // New state for contract editing
  const [contractEditDialogOpen, setContractEditDialogOpen] = useState(false);
  const [selectedPlayerForContract, setSelectedPlayerForContract] =
    useState<Player | null>(null);
  const [editedShirtNumber, setEditedShirtNumber] = useState<number>(0);
  const [editedSalary, setEditedSalary] = useState<number>(0);
  const handleOpenUpgradeDialog = (player: Player) => {
    setSelectedPlayerForUpgrade(player);
    setUpgradeDialogOpen(true);
  };
  const handleOpenNationalTeamDialog = (player: Player) => {
    setSelectedPlayerForNational(player);
    setNationalTeamDialogOpen(true);
  };
  const saveContractChanges = () => {
    if (!selectedPlayerForContract) return;
    const updatedPlayers = players.map((p) =>
      p.id === selectedPlayerForContract.id
        ? { ...p, shirtNumber: editedShirtNumber, salary: editedSalary }
        : p,
    );
    setPlayers(updatedPlayers);
    setContractEditDialogOpen(false);
    toast({
      title: "Contract Updated",
      description: `${selectedPlayerForContract.name}'s contract details have been updated.`,
    });
  };
  const handleOpenEditDialog = (player: Player) => {
    setEditingPlayer(player);
    setEditedAttributes({
      pace: player.attributes.pace,
      shooting: player.attributes.shooting,
      passing: player.attributes.shortPassing,
      dribbling: player.attributes.dribbling,
      defending: player.attributes.defending,
      physical: player.attributes.strength,
    });
  };
  const handleSaveAttributes = () => {
    if (!editingPlayer) return;
    const updatedPlayers = players.map((p) => {
      if (p.id === editingPlayer.id) {
        return {
          ...p,
          attributes: {
            ...p.attributes,
            ...editedAttributes,
          },
        };
      }
      return p;
    });
    setPlayers(updatedPlayers);
    setEditingPlayer(null);
  };
  const handleCancelEdit = () => {
    setEditingPlayer(null);
  };
  const handleAttributeChange = (attribute: string, value: number) => {
    setEditedAttributes({
      ...editedAttributes,
      [attribute]: value,
    });
  };
  // Add the player detail dialog to the component return
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search players..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={positionFilter} onValueChange={setPositionFilter}>
            <SelectTrigger className="w-[130px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Position" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Positions</SelectItem>
              <SelectItem value="gk">Goalkeepers</SelectItem>
              <SelectItem value="def">Defenders</SelectItem>
              <SelectItem value="mid">Midfielders</SelectItem>
              <SelectItem value="att">Attackers</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="age">Age</SelectItem>
              <SelectItem value="fitness">Fitness</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <NationalTeamIncomeSummary players={players} />
      <PlayerTable
        initPlayers={initPlayers}
        setSelectedDetailPlayer={setSelectedDetailPlayer}
        setDetailDialogOpen={setDetailDialogOpen}
        openEditDialog={handleOpenEditDialog}
        openUpgradeDialog={handleOpenUpgradeDialog}
        openNationalTeamDialog={handleOpenNationalTeamDialog}
      />
      <PlayerDetailDialog
        player={selectedDetailPlayer}
        open={detailDialogOpen}
        onOpenChange={setDetailDialogOpen}
      />
      <PlayerEditDialog
        editingPlayer={editingPlayer}
        handleCancelEdit={handleCancelEdit}
        handleAttributeChange={handleAttributeChange}
        handleSaveAttributes={handleSaveAttributes}
        editedAttributes={editedAttributes}
      />
      <PlayerUpgradeDialog
        upgradeDialogOpen={upgradeDialogOpen}
        setUpgradeDialogOpen={setUpgradeDialogOpen}
        selectedPlayerForUpgrade={selectedPlayerForUpgrade}
      />
      <PlayerNationalTeamDialog
        nationalTeamDialogOpen={nationalTeamDialogOpen}
        setNationalTeamDialogOpen={setNationalTeamDialogOpen}
        selectedPlayerForNational={selectedPlayerForNational}
      />
      <PlayerContractEditDialog
        contractEditDialogOpen={contractEditDialogOpen}
        setContractEditDialogOpen={setContractEditDialogOpen}
        selectedPlayerForContract={selectedPlayerForContract}
        saveContractChanges={saveContractChanges}
      />
    </div>
  );
}
