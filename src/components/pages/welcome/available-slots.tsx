import React from "react";

import { Card, CardContent } from "@/components/ui/card";

type Props = {
  teamLength: number;
  availableSlots: number;
};

const AvailableSlots = ({ teamLength, availableSlots }: Props) => {
  return (
    <Card className="mb-8 bg-gray-50 border-gray-200">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600">Teams Created</p>
            <p className="text-3xl font-bold text-gray-900">
              {teamLength} <span className="text-lg text-gray-500">of 3</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-gray-600">Available Slots</p>
            <p className="text-3xl font-bold text-green-600">
              {availableSlots}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AvailableSlots;
