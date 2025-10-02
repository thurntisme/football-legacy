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
import { formatCurrency } from "@/lib/finance";
import { getFormColor } from "@/lib/player";
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

  // Add more attributes to the attributes object in the generateAttributes function
  const generateAttributes = () => {
    const baseValue = player.rating - 10;
    const positionBonus = getPositionBonus(player.position);

    return {
      // Physical attributes
      pace: Math.min(
        99,
        baseValue + positionBonus.pace + Math.floor(Math.random() * 15),
      ),
      shooting: Math.min(
        99,
        baseValue + positionBonus.shooting + Math.floor(Math.random() * 15),
      ),
      passing: Math.min(
        99,
        baseValue + positionBonus.passing + Math.floor(Math.random() * 15),
      ),
      dribbling: Math.min(
        99,
        baseValue + positionBonus.dribbling + Math.floor(Math.random() * 15),
      ),
      defending: Math.min(
        99,
        baseValue + positionBonus.defending + Math.floor(Math.random() * 15),
      ),
      physical: Math.min(
        99,
        baseValue + positionBonus.physical + Math.floor(Math.random() * 15),
      ),
      // Mental attributes
      vision: Math.min(
        99,
        baseValue + positionBonus.vision + Math.floor(Math.random() * 15),
      ),
      positioning: Math.min(
        99,
        baseValue + positionBonus.positioning + Math.floor(Math.random() * 15),
      ),
      composure: Math.min(99, baseValue + Math.floor(Math.random() * 15)),
      // Technical attributes
      ballControl: Math.min(
        99,
        baseValue + positionBonus.ballControl + Math.floor(Math.random() * 15),
      ),
      longShots: Math.min(
        99,
        baseValue + positionBonus.longShots + Math.floor(Math.random() * 15),
      ),
      // Additional attributes
      agility: Math.min(99, baseValue + Math.floor(Math.random() * 15)),
      balance: Math.min(99, baseValue + Math.floor(Math.random() * 15)),
      reactions: Math.min(99, baseValue + Math.floor(Math.random() * 15)),
      stamina: Math.min(99, baseValue + Math.floor(Math.random() * 15)),
      strength: Math.min(99, baseValue + Math.floor(Math.random() * 15)),
      aggression: Math.min(99, baseValue + Math.floor(Math.random() * 15)),
      interceptions: Math.min(
        99,
        baseValue + positionBonus.defending + Math.floor(Math.random() * 15),
      ),
      heading: Math.min(
        99,
        baseValue +
          ((player.height || 180) > 185 ? 10 : 0) +
          Math.floor(Math.random() * 15),
      ),
      finishing: Math.min(
        99,
        baseValue + positionBonus.shooting + Math.floor(Math.random() * 15),
      ),
    };
  };

  // Update the getPositionBonus function to include the new attributes
  const getPositionBonus = (position: string) => {
    switch (position) {
      case "GK":
        return {
          pace: -10,
          shooting: -20,
          passing: -5,
          dribbling: -15,
          defending: 15,
          physical: 5,
          vision: 0,
          positioning: 15,
          ballControl: -10,
          longShots: -15,
        };
      case "CB":
        return {
          pace: 0,
          shooting: -10,
          passing: 0,
          dribbling: -5,
          defending: 20,
          physical: 15,
          vision: 0,
          positioning: 10,
          ballControl: 0,
          longShots: -5,
        };
      case "LB":
      case "RB":
      case "LWB":
      case "RWB":
        return {
          pace: 10,
          shooting: -5,
          passing: 5,
          dribbling: 5,
          defending: 10,
          physical: 5,
          vision: 5,
          positioning: 5,
          ballControl: 5,
          longShots: 0,
        };
      case "CDM":
        return {
          pace: 0,
          shooting: -5,
          passing: 10,
          dribbling: 5,
          defending: 15,
          physical: 10,
          vision: 10,
          positioning: 10,
          ballControl: 5,
          longShots: 0,
        };
      case "CM":
        return {
          pace: 0,
          shooting: 0,
          passing: 15,
          dribbling: 10,
          defending: 5,
          physical: 5,
          vision: 15,
          positioning: 5,
          ballControl: 10,
          longShots: 5,
        };
      case "CAM":
        return {
          pace: 5,
          shooting: 10,
          passing: 15,
          dribbling: 15,
          defending: -5,
          physical: 0,
          vision: 15,
          positioning: 10,
          ballControl: 15,
          longShots: 10,
        };
      case "LM":
      case "RM":
        return {
          pace: 15,
          shooting: 5,
          passing: 10,
          dribbling: 10,
          defending: 0,
          physical: 5,
          vision: 10,
          positioning: 5,
          ballControl: 10,
          longShots: 5,
        };
      case "LW":
      case "RW":
        return {
          pace: 15,
          shooting: 10,
          passing: 5,
          dribbling: 15,
          defending: -10,
          physical: 0,
          vision: 10,
          positioning: 10,
          ballControl: 15,
          longShots: 10,
        };
      case "ST":
      case "CF":
        return {
          pace: 10,
          shooting: 20,
          passing: 0,
          dribbling: 10,
          defending: -15,
          physical: 10,
          vision: 5,
          positioning: 15,
          ballControl: 10,
          longShots: 10,
        };
      default:
        return {
          pace: 0,
          shooting: 0,
          passing: 0,
          dribbling: 0,
          defending: 0,
          physical: 0,
          vision: 0,
          positioning: 0,
          ballControl: 0,
          longShots: 0,
        };
    }
  };

  // Generate random player data for the missing fields
  const enhancedPlayer = {
    ...player,
    weight: player.weight || Math.floor(70 + Math.random() * 20), // 70-90 kg
    height: player.height || Math.floor(170 + Math.random() * 20), // 170-190 cm
    personality:
      player.personality ||
      ["Leader", "Team Player", "Determined", "Professional", "Ambitious"][
        Math.floor(Math.random() * 5)
      ],
    injuryProne:
      player.injuryProne !== undefined
        ? player.injuryProne
        : Math.random() > 0.8, // 20% chance of being injury prone
    internationalCaps:
      player.internationalCaps || Math.floor(Math.random() * 50),
    preferredRole:
      player.preferredRole ||
      ["Target Man", "Playmaker", "Box-to-Box", "Sweeper", "Poacher"][
        Math.floor(Math.random() * 5)
      ],
    potential:
      player.potential ||
      Math.min(99, player.rating + Math.floor(Math.random() * 10)),
    morale:
      player.morale ||
      (["high", "normal", "low"][Math.floor(Math.random() * 3)] as
        | "high"
        | "normal"
        | "low"),
    birthdate:
      player.birthdate ||
      `${1990 + Math.floor(Math.random() * 10)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
  };

  const attributes = generateAttributes();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{enhancedPlayer.name}</DialogTitle>
          <DialogDescription>Player Details</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Player Info */}
          <div className="md:col-span-1">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-4xl font-bold">
                    {enhancedPlayer.rating}
                  </span>
                </div>
                <div
                  className={`absolute -top-1 -right-1 w-6 h-6 rounded-full ${getFormColor(
                    enhancedPlayer.form,
                  )} flex items-center justify-center text-white font-bold`}
                >
                  {enhancedPlayer.form === "excellent"
                    ? "A"
                    : enhancedPlayer.form === "good"
                      ? "B"
                      : enhancedPlayer.form === "average"
                        ? "C"
                        : "D"}
                </div>
              </div>

              <div className="text-center">
                <div className="flex flex-wrap justify-center gap-1 mt-1">
                  {enhancedPlayer.playablePositions.map((pos) => (
                    <Badge
                      key={pos}
                      variant="outline"
                      className={
                        pos === enhancedPlayer.position ? "border-primary" : ""
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
                  <span>{enhancedPlayer.nationality}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{enhancedPlayer.age} yrs</span>
                </div>
                <div className="flex items-center">
                  <Footprints className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>
                    {enhancedPlayer.foot.charAt(0).toUpperCase() +
                      enhancedPlayer.foot.slice(1)}{" "}
                    foot
                  </span>
                </div>
                <div className="flex items-center">
                  <Ruler className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{enhancedPlayer.height} cm</span>
                </div>
                <div className="flex items-center">
                  <Weight className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{enhancedPlayer.weight} kg</span>
                </div>
                <div className="flex items-center">
                  <Trophy className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{enhancedPlayer.internationalCaps} caps</span>
                </div>
              </div>

              <Separator />

              <div className="w-full space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Weekly Salary:
                  </span>
                  <span className="font-medium">
                    {formatCurrency(enhancedPlayer.salary)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Market Value:
                  </span>
                  <span className="font-medium">
                    {formatCurrency(enhancedPlayer.marketValue)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Contract:
                  </span>
                  <span className="font-medium">
                    {enhancedPlayer.contractYears} years
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Potential:
                  </span>
                  <span className="font-medium">
                    {enhancedPlayer.potential}
                  </span>
                </div>
              </div>

              <Separator />

              <div className="w-full space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Personality:
                  </span>
                  <span className="font-medium">
                    {enhancedPlayer.personality}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Preferred Role:
                  </span>
                  <span className="font-medium">
                    {enhancedPlayer.preferredRole}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Morale:</span>
                  <span
                    className={`font-medium ${enhancedPlayer.morale === "high" ? "text-green-500" : enhancedPlayer.morale === "low" ? "text-red-500" : ""}`}
                  >
                    {enhancedPlayer.morale.charAt(0).toUpperCase() +
                      enhancedPlayer.morale.slice(1)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Injury Prone:
                  </span>
                  <span
                    className={`font-medium ${enhancedPlayer.injuryProne ? "text-red-500" : "text-green-500"}`}
                  >
                    {enhancedPlayer.injuryProne ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Player Attributes */}
          <div className="md:col-span-2">
            <div>
              <h3 className="text-lg font-medium mb-3">Player Attributes</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Physical</h4>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Pace</span>
                      <span className="text-sm font-medium">
                        {attributes.pace}
                      </span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${attributes.pace}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Agility</span>
                      <span className="text-sm font-medium">
                        {attributes.agility}
                      </span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${attributes.agility}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Balance</span>
                      <span className="text-sm font-medium">
                        {attributes.balance}
                      </span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${attributes.balance}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Strength</span>
                      <span className="text-sm font-medium">
                        {attributes.strength}
                      </span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${attributes.strength}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Stamina</span>
                      <span className="text-sm font-medium">
                        {attributes.stamina}
                      </span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${attributes.stamina}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Technical</h4>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Shooting</span>
                      <span className="text-sm font-medium">
                        {attributes.shooting}
                      </span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${attributes.shooting}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Finishing</span>
                      <span className="text-sm font-medium">
                        {attributes.finishing}
                      </span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${attributes.finishing}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Passing</span>
                      <span className="text-sm font-medium">
                        {attributes.passing}
                      </span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${attributes.passing}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Dribbling</span>
                      <span className="text-sm font-medium">
                        {attributes.dribbling}
                      </span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${attributes.dribbling}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Ball Control</span>
                      <span className="text-sm font-medium">
                        {attributes.ballControl}
                      </span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${attributes.ballControl}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Mental</h4>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Vision</span>
                      <span className="text-sm font-medium">
                        {attributes.vision}
                      </span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${attributes.vision}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Composure</span>
                      <span className="text-sm font-medium">
                        {attributes.composure}
                      </span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${attributes.composure}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Positioning</span>
                      <span className="text-sm font-medium">
                        {attributes.positioning}
                      </span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${attributes.positioning}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Reactions</span>
                      <span className="text-sm font-medium">
                        {attributes.reactions}
                      </span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${attributes.reactions}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Aggression</span>
                      <span className="text-sm font-medium">
                        {attributes.aggression}
                      </span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${attributes.aggression}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <div>
              <h3 className="text-lg font-medium mb-3">Current Status</h3>
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-sm font-medium">Form</h4>
                        <p className="text-2xl font-bold capitalize">
                          {enhancedPlayer.form}
                        </p>
                      </div>
                      <div
                        className={`w-4 h-4 rounded-full ${getFormColor(enhancedPlayer.form)}`}
                      ></div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-sm font-medium">Fitness</h4>
                        <p className="text-2xl font-bold">
                          {enhancedPlayer.fitness}%
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-full border-4 border-secondary flex items-center justify-center">
                        <div
                          className="h-8 w-8 rounded-full"
                          style={{
                            opacity: enhancedPlayer.fitness / 100,
                            backgroundColor:
                              enhancedPlayer.fitness > 80
                                ? "rgb(34, 197, 94)"
                                : enhancedPlayer.fitness > 60
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

            <div>
              <h3 className="text-lg font-medium mb-3">Season Statistics</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 border rounded-md">
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
                    {["ST", "LW", "RW", "CAM"].includes(enhancedPlayer.position)
                      ? Math.floor(Math.random() * 10) + 1
                      : ["CM", "RM", "LM"].includes(enhancedPlayer.position)
                        ? Math.floor(Math.random() * 5)
                        : Math.floor(Math.random() * 2)}
                  </div>
                </div>
                <div className="text-center p-3 border rounded-md">
                  <div className="text-sm text-muted-foreground">Assists</div>
                  <div className="text-2xl font-bold">
                    {["CAM", "CM", "LW", "RW", "RM", "LM"].includes(
                      enhancedPlayer.position,
                    )
                      ? Math.floor(Math.random() * 8) + 1
                      : Math.floor(Math.random() * 3)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
