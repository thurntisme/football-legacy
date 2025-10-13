import React, { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Player } from "@/types/player";

import FormationPlayerTable from "./formation-player-table";

type Props = {
  players: Player[];
  selectedPlayer: Player | null;
  setSelectedPlayer: React.Dispatch<React.SetStateAction<Player | null>>;
  onSwapPlayers: (player: Player) => void;
};

const MyTeamFormationPlayer = ({
  players,
  selectedPlayer,
  setSelectedPlayer,
  onSwapPlayers,
}: Props) => {
  const [lineup, setLineup] = useState<Player[]>([]);
  const [substitutes, setSubstitutes] = useState<Player[]>([]);

  useEffect(() => {
    const lineupPlayers = players.slice(0, 11);
    const substitutePlayers = players.slice(11);

    setLineup(lineupPlayers);
    setSubstitutes(substitutePlayers);
  }, [players]);

  const onClickPlayer = (player: Player) => {
    if (selectedPlayer && selectedPlayer.id === player.id) {
      setSelectedPlayer(null);
      return;
    }

    setSelectedPlayer(player);
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardContent className="p-0">
          <FormationPlayerTable
            initPlayers={lineup}
            selectedPlayer={selectedPlayer}
            onClickPlayer={onClickPlayer}
            onSwapPlayers={onSwapPlayers}
          />
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-0">
          <FormationPlayerTable
            initPlayers={substitutes}
            selectedPlayer={selectedPlayer}
            onClickPlayer={onClickPlayer}
            onSwapPlayers={onSwapPlayers}
            isSubstitute={true}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default MyTeamFormationPlayer;
