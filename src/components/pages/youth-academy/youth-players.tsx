"use client";

import { useState } from "react";

import ContentWrapper from "@/components/common/content-wrapper";
import { toast } from "@/components/ui/use-toast";
import { internalApi } from "@/lib/api/internal";
import { YouthPlayer } from "@/types/player";
import { useQuery } from "@tanstack/react-query";

import ConfirmLoanDialog from "./confirm-loan-dialog";
import ConfirmMarketDialog from "./confirm-market-dialog";
import ConfirmPromoteDialog from "./confirm-promote-dialog";
import YouthPlayersTable from "./youth-players-table";

export default function YouthPlayers() {
  const [confirmPromoteDialogOpen, setConfirmPromoteDialogOpen] =
    useState(false);
  const [confirmLoanDialogOpen, setConfirmLoanDialogOpen] = useState(false);
  const [confirmMarketDialogOpen, setConfirmMarketDialogOpen] = useState(false);
  const [playerToAction, setPlayerToAction] = useState<YouthPlayer | null>(
    null,
  );

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["my-youth-players"],
    queryFn: async () => {
      const res = await internalApi.get("/youth-academy/own");
      return res.data?.data || [];
    },
  });

  const handlePromotePlayer = (player: YouthPlayer) => {
    setPlayerToAction(player);
    setConfirmPromoteDialogOpen(true);
  };
  const handleLoanPlayer = (player: YouthPlayer) => {
    setPlayerToAction(player);
    setConfirmLoanDialogOpen(true);
  };
  const handlePlaceOnMarket = (player: YouthPlayer) => {
    setPlayerToAction(player);
    setConfirmMarketDialogOpen(true);
  };
  const confirmPromoteToFirstTeam = () => {
    toast({
      title: "Player Promoted",
      description: `${playerToAction?.name || "Player"} has been promoted to the first team.`,
    });
    setConfirmPromoteDialogOpen(false);
  };
  const confirmLoanOut = () => {
    toast({
      title: "Player Loaned Out",
      description: `${playerToAction?.name || "Player"} has been sent on loan for development.`,
    });
    setConfirmLoanDialogOpen(false);
  };
  const confirmPlaceOnMarket = () => {
    toast({
      title: "Player Listed",
      description: `${playerToAction?.name || "Player"} has been placed on the transfer market.`,
    });
    setConfirmMarketDialogOpen(false);
  };

  return (
    <ContentWrapper isLoading={isLoading} error={error} onRefetch={refetch}>
      <YouthPlayersTable
        players={data || []}
        handlePromotePlayer={handlePromotePlayer}
        handleLoanPlayer={handleLoanPlayer}
        handlePlaceOnMarket={handlePlaceOnMarket}
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
    </ContentWrapper>
  );
}
