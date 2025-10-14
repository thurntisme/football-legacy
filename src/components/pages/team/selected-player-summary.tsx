import React from "react";

import { Flame, InfoIcon, Zap } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { Player, PlayerMorale } from "@/types/player";

type Props = {
  selectedPlayer: Player | null;
  handleViewDetailPlayer: (player: Player) => void;
};

const SelectedPlayerSummary = ({
  selectedPlayer,
  handleViewDetailPlayer,
}: Props) => {
  const handleUpgradeMorale = () => {
    toast({
      title: "Morale upgraded",
      description: "Your player's morale has been upgraded",
    });
  };

  const handleUpgradeFitness = () => {
    toast({
      title: "Fitness upgraded",
      description: "Your player's fitness has been upgraded",
    });
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
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
            <div className="flex flex-col gap-1">
              <p className="font-medium mr-auto">
                {selectedPlayer?.name || "Player name"}
              </p>
              <div className="flex gap-1">
                {selectedPlayer?.playablePositions &&
                  selectedPlayer?.playablePositions.map((pos) => (
                    <Badge
                      key={pos}
                      variant="outline"
                      className={`text-[10px] px-2 py-0 ${pos === selectedPlayer?.position ? "border-primary" : ""}`}
                    >
                      {pos}
                    </Badge>
                  ))}
              </div>
            </div>
            {selectedPlayer && (
              <Button
                size="sm"
                variant="outline"
                className="text-xs w-3 h-3 p-0 flex items-center justify-center ml-auto"
                onClick={() =>
                  selectedPlayer && handleViewDetailPlayer(selectedPlayer)
                }
              >
                <InfoIcon />
              </Button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm mr-auto">
              {selectedPlayer?.nationality || ""}
            </span>
            <span className="font-medium text-sm ml-auto">
              {selectedPlayer?.birthday || ""}
            </span>
          </div>
          <div className="flex items-center justify-between gap-2 text-xs">
            <span>Rating: {selectedPlayer?.rating || "40"}</span>
            <span className="capitalize">
              Morale: {selectedPlayer?.morale || PlayerMorale.NORMAL}
            </span>
            <span>Fitness: {selectedPlayer?.fitness || "80"}%</span>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="flex gap-2">
          <Button
            variant="outline"
            layout="icon"
            onClick={handleUpgradeMorale}
            className="w-8 h-8 bg-orange-500 hover:bg-orange-400 text-white hover:text-white hover:shadow-[0_0_15px_rgba(255,100,0,0.5)]"
          >
            <Flame className="!w-5 !h-5" />
          </Button>
          <Button
            variant="outline"
            layout="icon"
            onClick={handleUpgradeFitness}
            className="w-8 h-8 bg-emerald-500 hover:bg-emerald-400 text-white hover:text-white hover:shadow-[0_0_15px_rgba(16,185,129,0.5)]"
          >
            <Zap className="!w-5 !h-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SelectedPlayerSummary;
