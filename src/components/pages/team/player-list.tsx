"use client";

import NationalTeamIncomeSummary from "../../national-team-income-summary";
import PlayerContractEditDialog from "../../player-contract-edit-dialog";
import PlayerContractShirtTable from "../../player-contract-shirt-table";
import PlayerEditDialog from "../../player-edit-dialog";
import PlayerNationalTeamDialog from "../../player-national-team-dialog";
import PlayerTable from "../../player-table";
import PlayerUpgradeDialog from "../../player-upgrade-dialog";

import type React from "react";
import { useState } from "react";

import { ChevronDown, ChevronUp, Filter, Search } from "lucide-react";

import PlayerDetailDialog from "@/components/player-detail-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { Player } from "@/types/player";

type PlayerListProps = {
  initPlayers: Player[];
};

export default function PlayerList({ initPlayers }: PlayerListProps) {
  // State management for player list
  const [players, setPlayers] = useState<Player[]>(() => initPlayers);
  const [searchTerm, setSearchTerm] = useState("");
  const [positionFilter, setPositionFilter] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedDetailPlayer, setSelectedDetailPlayer] =
    useState<Player | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);
  const [editedAttributes, setEditedAttributes] = useState<
    Record<string, number>
  >({});
  const [swapMode, setSwapMode] = useState(false);
  const [selectedForSwap, setSelectedForSwap] = useState<Player | null>(null);
  const [selectedPlayerForUpgrade, setSelectedPlayerForUpgrade] =
    useState<Player | null>(null);
  const [upgradeSuccess, setUpgradeSuccess] = useState<boolean | null>(null);
  const [showUpgradeResult, setShowUpgradeResult] = useState(false);
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
  const handlePlayerUpgrade = (player: Player) => {
    setSelectedPlayerForUpgrade(player);
    setUpgradeSuccess(null);
    setShowUpgradeResult(false);
    setUpgradeDialogOpen(true);
  };
  const handleContractEdit = (player: Player) => {
    setSelectedPlayerForContract(player);
    setEditedShirtNumber(player.shirtNumber);
    setEditedSalary(player.salary);
    setContractEditDialogOpen(true);
  };
  const handleNationalTeamDetails = (player: Player) => {
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
  const attemptUpgrade = () => {
    if (!selectedPlayerForUpgrade) return;
    // 60% chance of success for level 1, 40% for level 2, 20% for level 3+
    let successChance = 0.6;
    if (selectedPlayerForUpgrade.attributes.level === 2) successChance = 0.4;
    if (
      selectedPlayerForUpgrade.attributes.level &&
      selectedPlayerForUpgrade.attributes.level >= 3
    )
      successChance = 0.2;
    const success = Math.random() < successChance;
    setUpgradeSuccess(success);
    setShowUpgradeResult(true);
    if (success && selectedPlayerForUpgrade) {
      // Update player level
      const updatedPlayers = players.map((p) =>
        p.id === selectedPlayerForUpgrade.id
          ? {
              ...p,
              attributes: {
                ...p.attributes,
                level: (p.attributes.level || 1) + 1,
              },
            }
          : p,
      );
      setPlayers(updatedPlayers);
      toast({
        title: "Upgrade Successful!",
        description: `${
          selectedPlayerForUpgrade.name
        } has been upgraded to level ${
          (selectedPlayerForUpgrade.attributes.level || 1) + 1
        }!`,
      });
    } else {
      toast({
        title: "Upgrade Failed",
        description: "The upgrade attempt was unsuccessful. Try again later.",
        variant: "destructive",
      });
    }
  };
  const handleEditAttributes = (player: Player) => {
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
  const toggleLineup = (playerId: string) => {
    setPlayers(
      players.map((player) =>
        player.id === playerId
          ? { ...player, inLineup: !player.inLineup }
          : player,
      ),
    );
  };
  const getFormBadge = (form: string) => {
    switch (form) {
      case "excellent":
        return <Badge className="bg-green-500">Excellent</Badge>;
      case "good":
        return <Badge className="bg-emerald-400">Good</Badge>;
      case "average":
        return <Badge className="bg-amber-400">Average</Badge>;
      case "poor":
        return <Badge className="bg-red-400">Poor</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  const getFitnessColor = (fitness: number) => {
    if (fitness >= 90) return "text-green-500";
    if (fitness >= 75) return "text-emerald-400";
    if (fitness >= 60) return "text-amber-400";
    return "text-red-500";
  };
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
        return sortOrder === "desc" ? b.rating - a.rating : a.rating - b.rating;
      } else if (sortBy === "name") {
        return sortOrder === "desc"
          ? b.name.localeCompare(a.name)
          : a.name.localeCompare(b.name);
      } else if (sortBy === "age") {
        return sortOrder === "desc" ? b.age - a.age : a.age - b.age;
      } else if (sortBy === "fitness") {
        return sortOrder === "desc"
          ? b.fitness - a.fitness
          : a.fitness - b.fitness;
      }
      return 0;
    });
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "desc" ? "asc" : "desc");
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
          <Button variant="outline" size="icon" onClick={toggleSortOrder}>
            {sortOrder === "desc" ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronUp className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
      <NationalTeamIncomeSummary />
      <PlayerTable
        players={filteredPlayers}
        toggleLineup={toggleLineup}
        getFormBadge={getFormBadge}
        getFitnessColor={getFitnessColor}
        setSelectedDetailPlayer={setSelectedDetailPlayer}
        setDetailDialogOpen={setDetailDialogOpen}
        onEditAttributes={handleEditAttributes}
        setSwapMode={setSwapMode}
        setSelectedForSwap={setSelectedForSwap}
        swapMode={swapMode}
        selectedForSwap={selectedForSwap}
        handlePlayerUpgrade={handlePlayerUpgrade}
        handleNationalTeamDetails={handleNationalTeamDetails}
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
        attemptUpgrade={attemptUpgrade}
        upgradeDialogOpen={upgradeDialogOpen}
        setUpgradeDialogOpen={setUpgradeDialogOpen}
        selectedPlayerForUpgrade={selectedPlayerForUpgrade}
        showUpgradeResult={showUpgradeResult}
        upgradeSuccess={upgradeSuccess}
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
        editedSalary={editedSalary}
        setEditedSalary={setEditedSalary}
        saveContractChanges={saveContractChanges}
      />
    </div>
  );
}
