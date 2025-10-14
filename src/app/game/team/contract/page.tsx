"use client";

import React, { useState } from "react";

import { Users } from "lucide-react";
import Link from "next/link";

import ContentWrapper from "@/components/common/content-wrapper";
import PageTitle from "@/components/common/page-title";
import PlayerDetailDialog from "@/components/common/player-detail-dialog";
import PlayerContractEditDialog from "@/components/pages/team/player-contract-edit-dialog";
import PlayerContractTable from "@/components/pages/team/player-contract-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FOOTBALL_STATS_URL } from "@/constants/site";
import { toast } from "@/hooks/use-toast";
import { internalApi } from "@/lib/api/internal";
import { Player, PlayerContract } from "@/types/player";
import { useQuery } from "@tanstack/react-query";

const Contract = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayers] = useState<Player | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["my-team-player-contract"],
    queryFn: async () => {
      const res = await internalApi.get("/team");
      return res.data?.data || [];
    },
  });

  const openContractEditDialog = (player: Player) => {
    setSelectedPlayers(player);
    setIsDialogOpen(true);
  };

  const handleContractChanges = (newContract: PlayerContract) => {
    toast({
      title: "Contract Updated",
      description: `Updated contract for ${newContract.player.name} to £${newContract.newSalary.toLocaleString()}`,
    });
    setIsDialogOpen(false);
  };

  const handleViewPlayerDetail = (player: Player) => {
    setSelectedPlayers(player);
    setIsDetailDialogOpen(true);
  };

  return (
    <>
      <PageTitle title="Team Contract" subTitle="Manage your team contracts">
        <Button variant="outline" asChild>
          <Link href={`${FOOTBALL_STATS_URL}/game/team`}>
            <Users className="h-4 w-4" />
            Team
          </Link>
        </Button>
      </PageTitle>
      <ContentWrapper isLoading={isLoading} error={error}>
        <Card>
          <CardContent className="p-0">
            <PlayerContractTable
              filteredPlayers={data?.players || []}
              openContractEditDialog={openContractEditDialog}
              viewPlayerDetail={handleViewPlayerDetail}
            />
          </CardContent>
        </Card>
      </ContentWrapper>
      <PlayerContractEditDialog
        contractEditDialogOpen={isDialogOpen}
        setContractEditDialogOpen={setIsDialogOpen}
        selectedPlayer={selectedPlayer}
        saveContractChanges={handleContractChanges}
      />
      <PlayerDetailDialog
        player={selectedPlayer}
        open={isDetailDialogOpen}
        onOpenChange={setIsDetailDialogOpen}
      />
    </>
  );
};

export default Contract;
