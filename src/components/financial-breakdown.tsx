import React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type Props = {};

const FinancialBreakdown = (props: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Income & Expenses</CardTitle>
        <CardDescription>Financial breakdown</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-2">Income Sources</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Match Day Revenue</span>
                <span className="font-medium">£1,200,000/month</span>
              </div>
              <div className="flex justify-between items-center">
                <span>TV Rights</span>
                <span className="font-medium">£2,500,000/month</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Sponsorships</span>
                <span className="font-medium">£1,800,000/month</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Merchandise</span>
                <span className="font-medium">£800,000/month</span>
              </div>
              <div className="flex justify-between items-center font-bold border-t pt-2 mt-2">
                <span>Total Income</span>
                <span>£6,300,000/month</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Expenses</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Player Wages</span>
                <span className="font-medium">£3,100,000/month</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Staff Wages</span>
                <span className="font-medium">£800,000/month</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Facility Maintenance</span>
                <span className="font-medium">£400,000/month</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Other Expenses</span>
                <span className="font-medium">£600,000/month</span>
              </div>
              <div className="flex justify-between items-center font-bold border-t pt-2 mt-2">
                <span>Total Expenses</span>
                <span>£4,900,000/month</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center font-bold text-lg border-t pt-4">
            <span>Monthly Profit</span>
            <span className="text-green-500">£1,400,000</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialBreakdown;
