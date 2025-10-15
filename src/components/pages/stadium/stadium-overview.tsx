import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Facility } from "@/types/stadium";

type Props = {
  facilities: Facility[];
};

const StadiumOverview = ({ facilities }: Props) => {
  if (!facilities) return null;

  const totalCapacity = facilities
    .filter((facility) => facility.enabled && facility.id === "main-stand")
    .reduce((total, facility) => {
      const level =
        facility.currentLevel > 0
          ? facility.levels[facility.currentLevel - 1]
          : null;
      return total + (level && level.capacity ? level.capacity : 0);
    }, 0);

  const totalMaintenanceCost = facilities
    .filter((facility) => facility.enabled)
    .reduce((total, facility) => {
      const level =
        facility.currentLevel > 0
          ? facility.levels[facility.currentLevel - 1]
          : null;
      return total + (level ? level.maintenanceCost : 0);
    }, 0);

  const totalIncome = facilities
    .filter((facility) => facility.enabled)
    .reduce((total, facility) => {
      const level =
        facility.currentLevel > 0
          ? facility.levels[facility.currentLevel - 1]
          : null;
      return total + (level && level.income ? level.income : 0);
    }, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Stadium Capacity</CardTitle>
          <CardDescription>Current maximum attendance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            {totalCapacity.toLocaleString()} seats
          </div>
          <Progress
            value={(totalCapacity / 60000) * 100}
            className="h-2 mt-2"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Maintenance Cost</CardTitle>
          <CardDescription>Monthly facility expenses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-amber-600">
            £{totalMaintenanceCost.toLocaleString()}/month
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Match Day Income</CardTitle>
          <CardDescription>Estimated per match</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-green-600">
            £{totalIncome.toLocaleString()}/match
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StadiumOverview;
