"use client";

import React, { useState } from "react";

import { ArrowLeft, Users } from "lucide-react";
import Link from "next/link";

import ContentWrapper from "@/components/common/content-wrapper";
import PageTitle from "@/components/common/page-title";
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

  const { data, isLoading, error } = useQuery({
    queryKey: ["my-team-player-contract"],
    queryFn: async () => {
      const { data } = await internalApi.get("/team");
      return data;
    },
  });

  const openContractEditDialog = (player: Player) => {
    console.log("Edit contract for player:", player);
    setSelectedPlayers(player);
    setIsDialogOpen(true);
  };

  const handleContractChanges = (newContract: PlayerContract) => {
    console.log(newContract);
    toast({
      title: "Contract Updated",
      description: `Updated contract for ${newContract.player.name} to £${newContract.newSalary.toLocaleString()}`,
    });
    setIsDialogOpen(false);
  };

  return (
    <>
      <PageTitle title="Team Contract" subTitle="Manage your team contracts">
        <Button variant="outline" asChild>
          <Link href={`${FOOTBALL_STATS_URL}/game/team`}>
            <Users className="h-4 w-4 mr-2" />
            Team
          </Link>
        </Button>
        <Button asChild>
          <Link href={`${FOOTBALL_STATS_URL}/game/dashboard`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
      </PageTitle>
      <ContentWrapper isLoading={isLoading} error={error}>
        <Card>
          <CardContent>
            <PlayerContractTable
              filteredPlayers={data?.players || []}
              openContractEditDialog={openContractEditDialog}
            />
          </CardContent>
        </Card>
      </ContentWrapper>
      <PlayerContractEditDialog
        contractEditDialogOpen={isDialogOpen}
        setContractEditDialogOpen={setIsDialogOpen}
        selectedPlayerForContract={selectedPlayer}
        saveContractChanges={handleContractChanges}
      />
    </>
  );
};

export default Contract;
