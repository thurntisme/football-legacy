"use client";

import React from "react";

import { Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

type Props = {};

const UpcomingMatchSelection = (props: Props) => {
  const router = useRouter();

  const onStart = () => {
    router.push(`${FOOTBALL_STATS_URL}/game/match/start`);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center mb-6">
        <div>
          <CardTitle>Team Selection</CardTitle>
          <CardDescription className="mt-2">
            Select your starting lineup and substitutes
          </CardDescription>
        </div>
        <Button asChild>
          <Link href={`${FOOTBALL_STATS_URL}/team`}>
            <Users className="mr-2 h-4 w-4" />
            Team Management
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-[400px] bg-emerald-800 rounded-lg overflow-hidden mb-6">
          {/* Field markings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[80%] h-[90%] border-2 border-white/50"></div>
            <div className="absolute w-[40%] h-[20%] bottom-0 border-2 border-white/50 border-b-0"></div>
            <div className="absolute w-[40%] h-[20%] top-0 border-2 border-white/50 border-t-0"></div>
            <div className="absolute w-[15%] aspect-square rounded-full border-2 border-white/50"></div>
            <div className="absolute w-1 h-1 bg-white rounded-full"></div>
          </div>

          {/* Sample players */}
          {[
            { id: "gk", x: 50, y: 90, name: "Miller", rating: 82 },
            { id: "lb", x: 20, y: 70, name: "Wilson", rating: 78 },
            { id: "cb1", x: 35, y: 70, name: "Garcia", rating: 81 },
            { id: "cb2", x: 65, y: 70, name: "Brown", rating: 80 },
            { id: "rb", x: 80, y: 70, name: "Lee", rating: 79 },
            { id: "cdm", x: 50, y: 55, name: "Taylor", rating: 84 },
            { id: "cm1", x: 30, y: 50, name: "Martinez", rating: 83 },
            { id: "cm2", x: 70, y: 50, name: "Anderson", rating: 82 },
            { id: "lw", x: 20, y: 30, name: "Johnson", rating: 85 },
            { id: "st", x: 50, y: 25, name: "Williams", rating: 86 },
            { id: "rw", x: 80, y: 30, name: "Davis", rating: 84 },
          ].map((player) => (
            <div
              key={player.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform hover:scale-110"
              style={{ left: `${player.x}%`, top: `${player.y}%` }}
            >
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white text-black font-bold text-sm">
                  {player.rating}
                </div>
                <div className="mt-1 px-2 py-0.5 bg-black/70 rounded text-white text-xs whitespace-nowrap">
                  {player.name}
                </div>
              </div>
            </div>
          ))}

          {/* Formation name overlay */}
          <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
            4-3-3 • Balanced
          </div>
        </div>

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
          <Button onClick={onStart}>Start Match</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingMatchSelection;
