import React from "react";

import { InfoIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Player } from "@/types/player";

type Props = {
  selectedPlayer: Player | null;
  handleViewDetailPlayer: (player: Player) => void;
};

const SelectedPlayerSummary = ({
  selectedPlayer,
  handleViewDetailPlayer,
}: Props) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center gap-2">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={
                  selectedPlayer?.avatarUrl ||
                  "placeholder.svg?height=40&width=40"
                }
                alt={`${selectedPlayer?.name || "Player"}'s Avatar`}
              />
              <AvatarFallback>{`${selectedPlayer?.name || "Player"}'s Avatar`}</AvatarFallback>
            </Avatar>
            <p className="font-medium mr-auto">
              {selectedPlayer?.name || "Player name"}
            </p>
            {selectedPlayer && (
              <Button
                size="sm"
                variant="outline"
                className="text-xs w-3 h-3 p-0 flex items-center justify-center"
                onClick={() =>
                  selectedPlayer && handleViewDetailPlayer(selectedPlayer)
                }
              >
                <InfoIcon />
              </Button>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Badge variant="outline">{selectedPlayer?.position || "GK"}</Badge>
            <span>Rating: {selectedPlayer?.rating || "40"}</span>
            <span>Fitness: {selectedPlayer?.fitness || "80"}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SelectedPlayerSummary;
