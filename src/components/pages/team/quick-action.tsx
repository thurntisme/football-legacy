"use client";

import React, { useState } from "react";

import { ShoppingCart, UserCog, Wand2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { internalApi } from "@/lib/api/internal";
import { Player } from "@/types/player";
import { useQuery } from "@tanstack/react-query";

import BestLineupDialog from "./best-lineup-dialog";
import PlayerRolesDialog from "./player-roles-dialog";
import TransferRecommendationsDialog from "./transfer-recommendations-dialog";

type Props = {
  players: Player[];
  formation: string | undefined;
};

const QuickAction = ({ players, formation }: Props) => {
  const [playerRolesOpen, setPlayerRolesOpen] = useState(false);
  const [transferRecsOpen, setTransferRecsOpen] = useState(false);
  const [bestLineupOpen, setBestLineupOpen] = useState(false);

  const {
    data: rcmPlayers,
    isLoading: isLoadingRcmPlayers,
    error: isErrorRcmPlayers,
    refetch: refetchRcmPlayers,
  } = useQuery({
    queryKey: ["market-recommend-players"],
    queryFn: async () => {
      const { data } = await internalApi.get("/market/recommend");
      return data;
    },
    enabled: false,
  });

  const handleShowTransferRecommendations = () => {
    refetchRcmPlayers();
    setTransferRecsOpen(true);
  };

  const handleBestLineupConfirm = (selectedPlayers: Player[]) => {
    const selectedLineup = selectedPlayers.map((p) => p.name).join(", ");

    toast({
      title: "Best Lineup Selected",
      description: `Your lineup has been updated with the selected players: ${selectedLineup.substring(
        0,
        100,
      )}...`,
    });
  };

  return (
    <>
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={() => setBestLineupOpen(true)}
          className="flex items-center gap-2"
          variant="outline"
        >
          <Wand2 className="h-4 w-4" />
          Choose Best Players
        </Button>
        <Button variant="outline" onClick={() => setPlayerRolesOpen(true)}>
          <UserCog className="h-4 w-4" />
          Player Roles
        </Button>
        <Button
          variant="outline"
          onClick={handleShowTransferRecommendations}
          className="flex items-center gap-2"
        >
          <ShoppingCart className="h-4 w-4" />
          Transfer Recommendations
        </Button>
      </div>

      <PlayerRolesDialog
        players={players}
        open={playerRolesOpen}
        onOpenChange={setPlayerRolesOpen}
      />

      <TransferRecommendationsDialog
        open={transferRecsOpen}
        onOpenChange={setTransferRecsOpen}
        rcmPlayers={rcmPlayers}
        isLoading={isLoadingRcmPlayers}
        error={isErrorRcmPlayers}
      />

      {/* <BestLineupDialog
        open={bestLineupOpen}
        onOpenChange={setBestLineupOpen}
        players={players}
        onConfirm={handleBestLineupConfirm}
        currentFormation={formation}
      /> */}
    </>
  );
};

export default QuickAction;
