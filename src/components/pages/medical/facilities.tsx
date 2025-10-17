"use client";

import { useState } from "react";

import { AlertCircle, CheckCircle, TrendingUp, Zap } from "lucide-react";

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

interface Facility {
  id: string;
  name: string;
  type: string;
  level: number;
  maintenance: number;
  quality: number;
  status: "excellent" | "good" | "fair" | "poor";
  cost: number;
}

const mockFacilities: Facility[] = [
  {
    id: "1",
    name: "Physical Therapy Room",
    type: "Therapy",
    level: 3,
    maintenance: 85,
    quality: 90,
    status: "excellent",
    cost: 50000,
  },
  {
    id: "2",
    name: "Surgery Theater",
    type: "Operating",
    level: 2,
    maintenance: 70,
    quality: 75,
    status: "good",
    cost: 100000,
  },
  {
    id: "3",
    name: "Rehabilitation Center",
    type: "Recovery",
    level: 2,
    maintenance: 60,
    quality: 65,
    status: "fair",
    cost: 75000,
  },
  {
    id: "4",
    name: "Imaging Lab",
    type: "Diagnostics",
    level: 1,
    maintenance: 45,
    quality: 50,
    status: "poor",
    cost: 80000,
  },
];

export function MedicalFacilities() {
  const [facilities] = useState<Facility[]>(mockFacilities);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      excellent: "bg-green-100 text-green-800",
      good: "bg-blue-100 text-blue-800",
      fair: "bg-yellow-100 text-yellow-800",
      poor: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getMaintenanceIcon = (level: number) => {
    if (level >= 80) return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (level >= 60) return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    return <AlertCircle className="w-5 h-5 text-red-500" />;
  };

  const totalUpgradeCost = facilities.reduce((acc, f) => acc + f.cost, 0);

  return (
    <div className="space-y-6">
      {/* Facilities Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium ">
              Total Facilities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold ">{facilities.length}</p>
            <p className="text-xs  mt-1">Active facilities</p>
          </CardContent>
        </Card>

        <Card className="">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium ">Avg Quality</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold ">
              {Math.round(
                facilities.reduce((acc, f) => acc + f.quality, 0) /
                  facilities.length,
              )}
              %
            </p>
            <p className="text-xs  mt-1">Overall condition</p>
          </CardContent>
        </Card>

        <Card className="">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium ">
              Avg Maintenance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold ">
              {Math.round(
                facilities.reduce((acc, f) => acc + f.maintenance, 0) /
                  facilities.length,
              )}
              %
            </p>
            <p className="text-xs  mt-1">Service status</p>
          </CardContent>
        </Card>

        <Card className="">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium ">Upgrade Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold ">
              ${(totalUpgradeCost / 1000).toFixed(0)}k
            </p>
            <p className="text-xs  mt-1">Total investment</p>
          </CardContent>
        </Card>
      </div>

      {/* Facilities Details */}
      <div className="space-y-4">
        {facilities.map((facility) => (
          <Card key={facility.id} className="">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1">
                  <CardTitle className=" flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber-500" />
                    {facility.name}
                  </CardTitle>
                  <CardDescription>
                    {facility.type} - Level {facility.level}
                  </CardDescription>
                </div>
                <Badge className={getStatusColor(facility.status)}>
                  {facility.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Quality */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium ">Quality</label>
                    <span className="text-sm font-semibold ">
                      {facility.quality}%
                    </span>
                  </div>
                  <Progress
                    value={facility.quality}
                    className="h-2"
                    indicatorBg="bg-green-500"
                  />
                </div>

                {/* Maintenance */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium  flex items-center gap-2">
                      Maintenance
                      {getMaintenanceIcon(facility.maintenance)}
                    </label>
                    <span className="text-sm font-semibold ">
                      {facility.maintenance}%
                    </span>
                  </div>
                  <Progress
                    value={facility.maintenance}
                    className="h-2"
                    indicatorBg="bg-slate-700"
                  />
                </div>
              </div>
              <Separator className="mt-4 mb-3" />
              <div className="flex justify-between items-center ">
                <p className="text-sm ">
                  Upgrade Cost:{" "}
                  <span className="font-semibold ">
                    ${(facility.cost / 1000).toFixed(0)}k
                  </span>
                </p>
                <Button size="sm">
                  <TrendingUp className="w-4 h-4" />
                  Upgrade
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
