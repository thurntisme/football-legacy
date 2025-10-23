import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const StaffOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Staff Budget</CardTitle>
          <CardDescription>Available funds for staff</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Weekly Budget</p>
              <p className="text-2xl font-bold">£120,000</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current Spend</p>
              <p className="text-2xl font-bold">£78,500</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Staff Overview</CardTitle>
          <CardDescription>Current staff members</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Staff</p>
              <p className="text-2xl font-bold">12</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Max Allowed</p>
              <p className="text-2xl font-bold">20</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Staff Quality</CardTitle>
          <CardDescription>Overall rating</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Coaching</span>
                <span className="text-sm font-medium">Good</span>
              </div>
              <div className="w-full bg-secondary h-2 rounded-full">
                <div className="bg-green-500 h-2 rounded-full w-[75%]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Medical</span>
                <span className="text-sm font-medium">Average</span>
              </div>
              <div className="w-full bg-secondary h-2 rounded-full">
                <div className="bg-amber-500 h-2 rounded-full w-[60%]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Scouting</span>
                <span className="text-sm font-medium">Excellent</span>
              </div>
              <div className="w-full bg-secondary h-2 rounded-full">
                <div className="bg-green-500 h-2 rounded-full w-[85%]"></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffOverview;
