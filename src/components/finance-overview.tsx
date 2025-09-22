import React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type Props = {
  transferBudget: number;
  wageBudget: number;
};

const FinanceOverview = ({ transferBudget, wageBudget }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Current Finances</CardTitle>
          <CardDescription>Season 2024/2025</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Transfer Budget:</span>
              <span className="font-bold">
                £{transferBudget.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Wage Budget:</span>
              <span className="font-bold">
                £{wageBudget.toLocaleString()}/week
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Current Wage Spend:</span>
              <span className="font-bold">£720,000/week</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">
                Wage Budget Remaining:
              </span>
              <span className="font-bold text-green-500">£130,000/week</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Club Value:</span>
              <span className="font-bold">£350,000,000</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Financial Health</CardTitle>
          <CardDescription>Overall status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">
                  Transfer Budget Health
                </span>
                <span className="text-sm font-medium text-green-500">
                  Excellent
                </span>
              </div>
              <div className="w-full bg-secondary h-2 rounded-full">
                <div className="bg-green-500 h-2 rounded-full w-[85%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Wage Budget Health</span>
                <span className="text-sm font-medium text-green-500">Good</span>
              </div>
              <div className="w-full bg-secondary h-2 rounded-full">
                <div className="bg-green-500 h-2 rounded-full w-[75%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">
                  Overall Financial Health
                </span>
                <span className="text-sm font-medium text-green-500">
                  Excellent
                </span>
              </div>
              <div className="w-full bg-secondary h-2 rounded-full">
                <div className="bg-green-500 h-2 rounded-full w-[90%]"></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinanceOverview;
