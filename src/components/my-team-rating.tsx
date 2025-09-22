import { Card, CardContent } from "@/components/ui/card";

import React from "react";

type Props = {
  positions: any[];
};

const MyTeamRating = ({ positions }: Props) => {
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="font-medium mb-3">Team Rating</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span>Overall:</span>
            <span className="font-bold text-lg">
              {Math.round(
                positions
                  .filter((pos) => pos.player !== null)
                  .reduce((sum, pos) => sum + (pos.player?.rating || 0), 0) /
                  positions.filter((pos) => pos.player !== null).length
              )}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span>Attack:</span>
            <span className="font-bold">
              {Math.round(
                positions
                  .filter(
                    (pos) =>
                      ["st", "st1", "st2", "lw", "rw", "cam", "cf"].includes(
                        pos.id
                      ) && pos.player !== null
                  )
                  .reduce((sum, pos) => sum + (pos.player?.rating || 0), 0) /
                  Math.max(
                    1,
                    positions.filter(
                      (pos) =>
                        ["st", "st1", "st2", "lw", "rw", "cam", "cf"].includes(
                          pos.id
                        ) && pos.player !== null
                    ).length
                  )
              )}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span>Midfield:</span>
            <span className="font-bold">
              {Math.round(
                positions
                  .filter(
                    (pos) =>
                      [
                        "cm1",
                        "cm2",
                        "cdm",
                        "cdm1",
                        "cdm2",
                        "lm",
                        "rm",
                      ].includes(pos.id) && pos.player !== null
                  )
                  .reduce((sum, pos) => sum + (pos.player?.rating || 0), 0) /
                  Math.max(
                    1,
                    positions.filter(
                      (pos) =>
                        [
                          "cm1",
                          "cm2",
                          "cdm",
                          "cdm1",
                          "cdm2",
                          "lm",
                          "rm",
                        ].includes(pos.id) && pos.player !== null
                    ).length
                  )
              )}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span>Defense:</span>
            <span className="font-bold">
              {Math.round(
                positions
                  .filter(
                    (pos) =>
                      ["cb1", "cb2", "cb3", "lb", "rb", "lwb", "rwb"].includes(
                        pos.id
                      ) && pos.player !== null
                  )
                  .reduce((sum, pos) => sum + (pos.player?.rating || 0), 0) /
                  Math.max(
                    1,
                    positions.filter(
                      (pos) =>
                        [
                          "cb1",
                          "cb2",
                          "cb3",
                          "lb",
                          "rb",
                          "lwb",
                          "rwb",
                        ].includes(pos.id) && pos.player !== null
                    ).length
                  )
              )}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MyTeamRating;
