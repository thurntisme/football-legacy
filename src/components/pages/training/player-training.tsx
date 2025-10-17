"use client";

import React, { useEffect, useState } from "react";

import ContentWrapper from "@/components/common/content-wrapper";
import { toast } from "@/hooks/use-toast";
import { internalApi } from "@/lib/api/internal";
import { IPlayerTraining } from "@/types/training";
import { useQuery } from "@tanstack/react-query";

import EditTrainingDialog from "./edit-training-dialog";
import PlayerTrainingList from "./player-training-list";
import SpecificTrainingDialog from "./specific-training-dialog";

type Props = {};
const PlayerTraining = (props: Props) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<IPlayerTraining | null>(
    null,
  );
  const [playersList, setPlayersList] = useState<IPlayerTraining[]>([]);
  const [specificTrainingOpen, setSpecificTrainingOpen] = useState(false);
  const [selectedDrill, setSelectedDrill] = useState<string>("");

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["training-player-program"],
    queryFn: async () => {
      const res = await internalApi.get("/training/player");
      return res.data?.data || [];
    },
  });

  useEffect(() => {
    if (data) {
      setPlayersList(data);
    }
  }, [data]);

  const updatePlayerFocus = () => {
    if (!selectedPlayer) return;

    setDialogOpen(false);
    toast({
      title: "Training focus updated",
      description: `${selectedPlayer.name}'s training focus has been updated.`,
    });
  };

  const saveSpecificTraining = () => {
    if (!selectedPlayer) return;

    if (!selectedDrill) {
      toast({
        title: "Error",
        description: "Please select a training drill",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Specific training assigned",
      description: `${selectedPlayer.name}'s specific training has been assigned.`,
    });

    setSpecificTrainingOpen(false);
  };

  const openSpecificTraining = (player: IPlayerTraining) => {
    setSelectedPlayer(player);
    setSelectedDrill("");
    setSpecificTrainingOpen(true);
  };

  const handleSelectPlayer = (player: IPlayerTraining) => {
    setSelectedPlayer(player);
    setDialogOpen(true);
  };

  return (
    <div className="flex flex-col space-y-6">
      <ContentWrapper isLoading={isLoading} error={error} onRefetch={refetch}>
        <PlayerTrainingList
          playersList={playersList}
          selectPlayer={handleSelectPlayer}
          openSpecificTraining={openSpecificTraining}
        />

        <EditTrainingDialog
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          selectedPlayer={selectedPlayer}
          setSelectedPlayer={setSelectedPlayer}
          updatePlayerFocus={updatePlayerFocus}
        />

        <SpecificTrainingDialog
          selectedPlayer={selectedPlayer}
          saveSpecificTraining={saveSpecificTraining}
          specificTrainingOpen={specificTrainingOpen}
          setSpecificTrainingOpen={setSpecificTrainingOpen}
        />
      </ContentWrapper>
    </div>
  );
};

export default PlayerTraining;
