import React, { useState } from "react";

import { UserCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlayerItemEnum } from "@/constants/items";
import { players } from "@/constants/player";

type Props = {
  slug: PlayerItemEnum;
};

const PlayerItem = ({ slug }: Props) => {
  const [selectedPlayer, setSelectedPlayer] = useState<string>("");

  const onChoosePlayer = () => {
    console.log(`Choose player ${selectedPlayer} to ${slug}`); // TODO: handle choose player
  };

  return (
    <div className="flex flex-col space-y-1">
      <label className="text-sm font-medium mb-2 block">Select Player</label>
      <div className="flex gap-2">
        <Select value={selectedPlayer} onValueChange={setSelectedPlayer}>
          <SelectTrigger>
            <SelectValue placeholder="Select a player" />
          </SelectTrigger>
          <SelectContent>
            {players.map((player) => (
              <SelectItem key={player.id} value={player.name}>
                {player.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="default" onClick={onChoosePlayer}>
          <UserCheck className="h-4 w-4" />
          Choose
        </Button>
      </div>
    </div>
  );
};

export default PlayerItem;
