"use client";

import FieldMarking from "../team/field-marking";

import React from "react";

import { Rocket } from "lucide-react";
import { useRouter } from "next/navigation";

import BtnTeamManagement from "@/components/common/btn-team-management";
import Pitch from "@/components/common/pitch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FOOTBALL_STATS_URL } from "@/constants/site";
import { Player } from "@/types/player";

type Props = {
  team: {
    formation: string;
    players: Player[];
  };
};

const UpcomingMatchSelection = ({ team }: Props) => {
  const router = useRouter();

  const onStart = () => {
    router.push(`${FOOTBALL_STATS_URL}/game/match/start`);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center mb-6">
        <div className="flex flex-col space-y-1">
          <CardTitle>Team Selection</CardTitle>
          <CardDescription className="mt-2">
            Select your starting lineup and substitutes
          </CardDescription>
        </div>
        <BtnTeamManagement />
      </CardHeader>
      <CardContent>
        <Pitch formation={team?.formation} players={team?.players} />

        <Separator className="my-6" />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Substitutes</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: "Sam Wilson", position: "GK", rating: 78 },
              { name: "Alex Turner", position: "CB", rating: 75 },
              { name: "Mike Johnson", position: "CM", rating: 77 },
              { name: "Eric Thompson", position: "LW", rating: 76 },
              { name: "John Smith", position: "ST", rating: 81 },
            ].map((player, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-3 border rounded-md"
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary/10 font-bold mb-2">
                  {player.rating}
                </div>
                <div className="text-sm font-medium">{player.name}</div>
                <Badge variant="outline" className="mt-1">
                  {player.position}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <Button onClick={onStart}>
            <Rocket className="w-4 h-4" />
            Start Match
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingMatchSelection;
