"use client";

import {
  Calendar,
  Flag,
  Footprints,
  Ruler,
  Trophy,
  Weight,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { playerAttributes } from "@/constants/player";
import { formatCurrency } from "@/lib/finance";
import { getAttributeColor, getFormColor } from "@/lib/player";
import { Player } from "@/types/player";

interface PlayerDetailDialogProps {
  player: Player | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function PlayerDetailDialog({
  player,
  open,
  onOpenChange,
}: PlayerDetailDialogProps) {
  if (!player) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{player.name}</DialogTitle>
          <DialogDescription>Player Details</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Player Info */}
          <div className="md:col-span-1">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-4xl font-bold">{player.rating}</span>
                </div>
                <div
                  className={`absolute -top-1 -right-1 w-6 h-6 rounded-full ${getFormColor(
                    player.form,
                  )} flex items-center justify-center text-white font-bold`}
                >
                  {player.form === "excellent"
                    ? "A"
                    : player.form === "good"
                      ? "B"
                      : player.form === "average"
                        ? "C"
                        : "D"}
                </div>
              </div>

              <div className="text-center">
                <div className="flex flex-wrap justify-center gap-1 mt-1">
                  {player?.playablePositions?.map((pos) => (
                    <Badge
                      key={pos}
                      variant="outline"
                      className={
                        pos === player.position ? "border-primary" : ""
                      }
                    >
                      {pos}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="flex items-center">
                  <Flag className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{player.nationality}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{player.birthday}</span>
                </div>
                <div className="flex items-center">
                  <Footprints className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="capitalize">{player.foot} foot</span>
                </div>
                <div className="flex items-center">
                  <Ruler className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{player.height} cm</span>
                </div>
                <div className="flex items-center">
                  <Weight className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{player.weight} kg</span>
                </div>
                <div className="flex items-center">
                  <Flag className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>
                    {player?.nationalTeam?.internationalCaps || 0} caps
                  </span>
                </div>
              </div>

              <Separator />

              <div className="w-full space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Weekly Salary:
                  </span>
                  <span className="font-medium">
                    {formatCurrency(player.salary)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Market Value:
                  </span>
                  <span className="font-medium">
                    {formatCurrency(player.marketValue)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Contract:
                  </span>
                  <span className="font-medium">
                    {player.contractLength} match(es)
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Potential:
                  </span>
                  <span className="font-medium">{player.potential}</span>
                </div>
              </div>

              <Separator />

              <div className="w-full space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Personality:
                  </span>
                  <span className="font-medium">{player.personality}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Preferred Role:
                  </span>
                  <span className="font-medium">{player.preferredRole}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Morale:</span>
                  <span
                    className={`font-medium ${player.morale === "high" ? "text-green-500" : player.morale === "low" ? "text-red-500" : ""}`}
                  >
                    {player.morale}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Injury Prone:
                  </span>
                  <span
                    className={`font-medium ${player.injuryProne ? "text-red-500" : "text-green-500"}`}
                  >
                    {player.injuryProne ? "Yes" : "No"}
                  </span>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="w-full space-y-2">
                <h3 className="text-lg font-medium mb-3">Current Status</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center relative">
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Form</h4>
                          <p className="text-xl font-bold capitalize">
                            {player.form}
                          </p>
                        </div>
                        <div
                          className={`w-4 h-4 rounded-full absolute top-1 right-1 ${getFormColor(player.form)}`}
                        ></div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Fitness</h4>
                          <p className="text-xl font-bold">{player.fitness}%</p>
                        </div>
                        <div className="w-12 h-12 rounded-full border-4 border-secondary flex items-center justify-center">
                          <div
                            className="h-8 w-8 rounded-full"
                            style={{
                              opacity: player.fitness / 100,
                              backgroundColor:
                                player.fitness > 80
                                  ? "rgb(34, 197, 94)"
                                  : player.fitness > 60
                                    ? "rgb(250, 204, 21)"
                                    : "rgb(239, 68, 68)",
                            }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="w-full space-y-2">
                <h3 className="text-lg font-medium mb-3">Season Statistics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 border rounded-md col-start-1 col-end-3">
                    <div className="text-sm text-muted-foreground">
                      Appearances
                    </div>
                    <div className="text-2xl font-bold">
                      {Math.floor(Math.random() * 20) + 5}
                    </div>
                  </div>
                  <div className="text-center p-3 border rounded-md">
                    <div className="text-sm text-muted-foreground">Goals</div>
                    <div className="text-2xl font-bold">
                      {player.position &&
                        (["ST", "LW", "RW", "CAM"].includes(player.position)
                          ? Math.floor(Math.random() * 10) + 1
                          : ["CM", "RM", "LM"].includes(player.position)
                            ? Math.floor(Math.random() * 5)
                            : Math.floor(Math.random() * 2))}
                    </div>
                  </div>
                  <div className="text-center p-3 border rounded-md">
                    <div className="text-sm text-muted-foreground">Assists</div>
                    <div className="text-2xl font-bold">
                      {player.position &&
                      ["CAM", "CM", "LW", "RW", "RM", "LM"].includes(
                        player.position,
                      )
                        ? Math.floor(Math.random() * 8) + 1
                        : Math.floor(Math.random() * 3)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Player Attributes */}
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 gap-6">
              {playerAttributes.map((section) => (
                <div className="space-y-2" key={section.title}>
                  <h4 className="text-md font-medium">{section.title}</h4>
                  <div className="grid grid-cols-3 gap-x-4 gap-y-2">
                    {section.attributes.map((attr) => (
                      <div key={attr.key as string}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">{attr.label}</span>
                          <span className="text-sm font-medium">
                            {player.attributes &&
                              player.attributes[
                                attr.key as keyof typeof player.attributes
                              ]}
                          </span>
                        </div>
                        <div className="w-full bg-secondary h-2 rounded-full">
                          <div
                            className={`${getAttributeColor(player.attributes && player.attributes[attr.key as keyof typeof player.attributes])} h-2 rounded-full`}
                            style={{
                              width: `${player.attributes && player.attributes[attr.key as keyof typeof player.attributes]}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
