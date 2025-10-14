"use client";

import type React from "react";
import { useState } from "react";

import PlayerDetailDialog from "@/components/common/player-detail-dialog";
import { toast } from "@/components/ui/use-toast";
import { Player } from "@/types/player";

import NationalTeamIncomeSummary from "./national-team-income-summary";
import PlayerNationalTeamDialog from "./player-national-team-dialog";
import PlayerTable from "./player-table";
import PlayerUpgradeDialog from "./player-upgrade-dialog";
import ReleasePlayerDialog from "./release-player-dialog";
import SellPlayerDialog from "./sell-player-dialog";

type PlayerListProps = {
  players: Player[];
};

export default function TeamPlayerList({ players }: PlayerListProps) {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [selectedPlayerForNational, setSelectedPlayerForNational] =
    useState<Player | null>(null);
  const [isSellDialogOpen, setIsSellDialogOpen] = useState(false);
  const [isReleaseDialogOpen, setIsReleaseDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isUpgradeDialogOpen, setIsUpgradeDialogOpen] = useState(false);
  const [isNationalTeamDialogOpen, setIsNationalTeamDialogOpen] =
    useState(false);

  const handleUpgradePlayer = (player: Player) => {
    setSelectedPlayer(player);
    setIsUpgradeDialogOpen(true);
  };
  const handleViewPlayerInNationalTeam = (player: Player) => {
    setSelectedPlayerForNational(player);
    setIsNationalTeamDialogOpen(true);
  };
  const handleSellPlayer = (player: Player) => {
    setSelectedPlayer(player);
    setIsSellDialogOpen(true);
  };
  const handleReleasePlayer = (player: Player) => {
    setSelectedPlayer(player);
    setIsReleaseDialogOpen(true);
  };
  const handleConfirmSellPlayer = (player: Player) => {
    toast({
      title: "Player sold",
      description: `${player.name} has been sold.`,
    });
  };
  const handleConfirmReleasePlayer = (player: Player) => {
    toast({
      title: "Player released",
      description: `${player.name} has been released from the team.`,
    });
  };

  const handleViewPlayerDetail = (player: Player) => {
    setSelectedPlayer(player);
    setIsDetailDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <NationalTeamIncomeSummary players={players} />
      <PlayerTable
        initPlayers={players}
        viewPlayerDetail={handleViewPlayerDetail}
        sellPlayer={handleSellPlayer}
        releasePlayer={handleReleasePlayer}
        upgradePlayer={handleUpgradePlayer}
        viewPlayerInNationalTeam={handleViewPlayerInNationalTeam}
      />
      <PlayerDetailDialog
        player={selectedPlayer}
        open={isDetailDialogOpen}
        onOpenChange={setIsDetailDialogOpen}
      />
      <SellPlayerDialog
        isDialogOpen={isSellDialogOpen}
        setIsDialogOpen={setIsSellDialogOpen}
        selectedPlayer={selectedPlayer}
        confirmSellPlayer={handleConfirmSellPlayer}
      />
      <ReleasePlayerDialog
        isDialogOpen={isReleaseDialogOpen}
        setIsDialogOpen={setIsReleaseDialogOpen}
        selectedPlayer={selectedPlayer}
        confirmReleasePlayer={handleConfirmReleasePlayer}
      />
      <PlayerUpgradeDialog
        isDialogOpen={isUpgradeDialogOpen}
        setIsDialogOpen={setIsUpgradeDialogOpen}
        selectedPlayer={selectedPlayer}
      />
      <PlayerNationalTeamDialog
        isDialogOpen={isNationalTeamDialogOpen}
        setIsDialogOpen={setIsNationalTeamDialogOpen}
        selectedPlayer={selectedPlayerForNational}
      />
    </div>
  );
}
