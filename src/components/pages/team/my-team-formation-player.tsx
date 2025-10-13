import React, { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Player } from "@/types/player";

import FormationPlayerTable from "./formation-player-table";

type Props = {
  players: Player[];
  selectedPlayer: Player | null;
  onClickPlayer: (player: Player | null) => void;
};

const MyTeamFormationPlayer = ({
  players,
  selectedPlayer,
  onClickPlayer,
}: Props) => {
  const [lineup, setLineup] = useState<Player[]>([]);
  const [substitutes, setSubstitutes] = useState<Player[]>([]);

  useEffect(() => {
    const lineupPlayers = players.slice(0, 11);
    const substitutePlayers = players.slice(11);

    setLineup(lineupPlayers);
    setSubstitutes(substitutePlayers);
  }, [players]);

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardContent className="p-0">
          <FormationPlayerTable
            initPlayers={lineup}
            selectedPlayer={selectedPlayer}
            onClickPlayer={onClickPlayer}
          />
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-0">
          <FormationPlayerTable
            initPlayers={substitutes}
            selectedPlayer={selectedPlayer}
            onClickPlayer={onClickPlayer}
            isSubstitute={true}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default MyTeamFormationPlayer;
