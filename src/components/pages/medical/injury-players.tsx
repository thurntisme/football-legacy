"use client";

import { useState } from "react";

import { AlertCircle, Clock, Eye, Heart, TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

interface InjuredPlayer {
  id: string;
  name: string;
  position: string;
  injuryType: string;
  severity: "minor" | "moderate" | "severe" | "critical";
  recoveryProgress: number;
  estimatedReturn: string;
  daysOut: number;
  treatmentStaff: string;
}

const mockInjuredPlayers: InjuredPlayer[] = [
  {
    id: "1",
    name: "Marcus Johnson",
    position: "Striker",
    injuryType: "Hamstring Strain",
    severity: "moderate",
    recoveryProgress: 65,
    estimatedReturn: "2024-10-25",
    daysOut: 8,
    treatmentStaff: "Dr. John Smith",
  },
  {
    id: "2",
    name: "David Silva",
    position: "Midfielder",
    injuryType: "Ankle Sprain",
    severity: "minor",
    recoveryProgress: 85,
    estimatedReturn: "2024-10-18",
    daysOut: 5,
    treatmentStaff: "Dr. Emma Wilson",
  },
  {
    id: "3",
    name: "Alex Defender",
    position: "Defender",
    injuryType: "ACL Tear",
    severity: "critical",
    recoveryProgress: 20,
    estimatedReturn: "2025-02-15",
    daysOut: 45,
    treatmentStaff: "Dr. Michael Brown",
  },
  {
    id: "4",
    name: "Tom Goalkeeper",
    position: "Goalkeeper",
    injuryType: "Shoulder Dislocation",
    severity: "severe",
    recoveryProgress: 40,
    estimatedReturn: "2024-11-05",
    daysOut: 20,
    treatmentStaff: "Dr. John Smith",
  },
];

export function InjuryPlayers() {
  const [injuries] = useState<InjuredPlayer[]>(mockInjuredPlayers);

  const getSeverityColor = (severity: string) => {
    const colors: Record<string, string> = {
      minor: "bg-yellow-100 text-yellow-800",
      moderate: "bg-orange-100 text-orange-800",
      severe: "bg-red-100 text-red-800",
      critical: "bg-red-200 text-red-900",
    };
    return colors[severity] || "bg-gray-100 text-gray-800";
  };

  const getSeverityIndicator = (severity: string) => {
    const colors: Record<string, string> = {
      minor: "from-yellow-500 to-yellow-600",
      moderate: "from-orange-500 to-orange-600",
      severe: "from-red-500 to-red-600",
      critical: "from-red-600 to-red-700",
    };
    return colors[severity] || "from-gray-500 to-gray-600";
  };

  const getTotalDaysOut = injuries.reduce((acc, inj) => acc + inj.daysOut, 0);
  const criticalCount = injuries.filter(
    (i) => i.severity === "critical",
  ).length;
  const severeCount = injuries.filter((i) => i.severity === "severe").length;

  return (
    <div className="space-y-6">
      {/* Injury Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium ">
              Total Injured
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{injuries.length}</p>
            <p className="text-xs  mt-1">Players out</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium ">Critical</CardTitle>
          </CardHeader>
          <CardContent>
            <p
              className={`text-2xl font-bold ${criticalCount > 0 ? "text-red-400" : "text-white"}`}
            >
              {criticalCount}
            </p>
            <p className="text-xs  mt-1">Severe cases</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium ">Severe</CardTitle>
          </CardHeader>
          <CardContent>
            <p
              className={`text-2xl font-bold ${severeCount > 0 ? "text-orange-400" : "text-white"}`}
            >
              {severeCount}
            </p>
            <p className="text-xs  mt-1">Moderate cases</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium ">Days Lost</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{getTotalDaysOut}</p>
            <p className="text-xs  mt-1">Combined</p>
          </CardContent>
        </Card>
      </div>

      {/* Injured Players List */}
      <div className="space-y-4">
        {injuries.map((player) => (
          <Card key={player.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div
                      className={`bg-gradient-to-br ${getSeverityIndicator(player.severity)} p-2 rounded-lg`}
                    >
                      <Heart className="w-5 h-5" />
                    </div>
                    <div>
                      <CardTitle>{player.name}</CardTitle>
                      <CardDescription>{player.position}</CardDescription>
                    </div>
                  </div>
                </div>
                <Badge className={getSeverityColor(player.severity)}>
                  {player.severity}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Injury Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium ">Injury Type</p>
                  <p className="font-semibold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    {player.injuryType}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium ">Days Out</p>
                  <p className="font-semibold flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    {player.daysOut} days
                  </p>
                </div>
              </div>

              {/* Treatment Staff */}
              <div className="space-y-2">
                <p className="text-sm font-medium ">Treatment Staff</p>
                <p>{player.treatmentStaff}</p>
              </div>

              {/* Recovery Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    Recovery Progress
                  </label>
                  <span className="text-sm font-semibold">
                    {player.recoveryProgress}%
                  </span>
                </div>
                <Progress
                  value={player.recoveryProgress}
                  className="h-2"
                  indicatorBg="bg-green-500"
                />
              </div>

              <Separator className="mt-4 mb-3" />

              {/* Estimated Return */}
              <div className="flex justify-between items-center ">
                <p className="text-sm ">
                  Estimated Return:{" "}
                  <span className="font-semibold">
                    {player.estimatedReturn}
                  </span>
                </p>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4" />
                  View Detail
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
