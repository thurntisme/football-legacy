import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { PlayerPosition } from "@/constants/formations";
import { Position } from "@/types/formation";

type Props = {
  positions: Position[];
};

const attackPositions = [
  PlayerPosition.ST,
  PlayerPosition.LT,
  PlayerPosition.RT,
  PlayerPosition.LW,
  PlayerPosition.RW,
  PlayerPosition.SS,
  PlayerPosition.CF,
];
const midfieldPositions = [
  PlayerPosition.CDM,
  PlayerPosition.LCDM,
  PlayerPosition.RCAM,
  PlayerPosition.CM,
  PlayerPosition.LCM,
  PlayerPosition.RCM,
  PlayerPosition.LM,
  PlayerPosition.RM,
  PlayerPosition.CAM,
  PlayerPosition.LCAM,
  PlayerPosition.RCAM,
];
const defensePositions = [
  PlayerPosition.CB,
  PlayerPosition.LCB,
  PlayerPosition.RCB,
  PlayerPosition.LB,
  PlayerPosition.RB,
  PlayerPosition.LWB,
  PlayerPosition.RWB,
];

const positionGroups = {
  attack: attackPositions,
  midfield: midfieldPositions,
  defense: defensePositions,
};

const MyTeamRating = ({ positions }: Props) => {
  const OverallRating =
    Math.round(
      positions.reduce((sum, pos) => sum + (pos.player?.rating || 0), 0) /
        positions.length,
    ) || 0;

  const getPositionRating = (type: keyof typeof positionGroups) => {
    const filteredPositions = positions.filter(
      (pos) =>
        positionGroups[type].includes(pos.id as PlayerPosition) &&
        pos.player !== null,
    );
    const totalRating = filteredPositions.reduce(
      (sum, pos) => sum + (pos.player?.rating || 0),
      0,
    );
    return Math.round(totalRating / Math.max(1, filteredPositions.length));
  };

  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="font-medium mb-3">Team Rating</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span>Overall:</span>
            <span className="font-bold text-lg">{OverallRating}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Attack:</span>
            <span className="font-bold">{getPositionRating("attack")}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Midfield:</span>
            <span className="font-bold">{getPositionRating("midfield")}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Defense:</span>
            <span className="font-bold">{getPositionRating("defense")}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MyTeamRating;
