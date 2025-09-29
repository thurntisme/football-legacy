import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type Props = {
  totalCapacity: number;
  totalMaintenanceCost: number;
  totalIncome: number;
};

const StadiumOverview = ({
  totalCapacity,
  totalMaintenanceCost,
  totalIncome,
}: Props) => {
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
