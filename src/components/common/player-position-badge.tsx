import { Badge } from "../ui/badge";

import React from "react";

import { YouthPlayer } from "@/types/player";

type Props = {
  player: YouthPlayer;
};

const PlayerPositionBadge = ({ player }: Props) => {
  return (
    <div className="flex flex-wrap justify-center gap-1 mt-1">
      {player.playablePositions.map((pos) => (
        <Badge
          key={pos}
          variant="outline"
          className={pos === player.position ? "border-primary" : ""}
        >
          {pos}
        </Badge>
      ))}
    </div>
  );
};

export default PlayerPositionBadge;
