import React, { useState } from 'react';

import { Save } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

type Props = {
  transfer: number;
  wage: number;
  onSaveBudgetAllocation: (transferBudget: number, wageBudget: number) => void;
};

const BudgetAllocation = ({
  transfer,
  wage,
  onSaveBudgetAllocation,
}: Props) => {
  const [transferBudget, setTransferBudget] = useState(transfer);
  const [wageBudget, setWageBudget] = useState(wage);
  const [totalBudget] = useState(transfer + wage);

  const handleTransferBudgetChange = (value: number[]) => {
    const newTransferBudget = value[0];
    setTransferBudget(newTransferBudget);
    setWageBudget(totalBudget - newTransferBudget);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Allocation</CardTitle>
        <CardDescription>Adjust how your budget is distributed</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between">
              <Label>Transfer Budget: £{transferBudget.toLocaleString()}</Label>
              <Label>Wage Budget: £{wageBudget.toLocaleString()}/week</Label>
            </div>
            <Slider
              defaultValue={[transferBudget]}
              max={totalBudget}
              step={100000}
              onValueChange={handleTransferBudgetChange}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>More for Transfers</span>
              <span>More for Wages</span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Budget Impact</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-md p-4">
                <div className="text-sm text-muted-foreground mb-1">
                  Transfer Market Power
                </div>
                <div className="text-2xl font-bold">
                  {transferBudget >= 20000000
                    ? 'Strong'
                    : transferBudget >= 10000000
                      ? 'Average'
                      : 'Weak'}
                </div>
              </div>
              <div className="border rounded-md p-4">
                <div className="text-sm text-muted-foreground mb-1">
                  Player Attraction
                </div>
                <div className="text-2xl font-bold">
                  {wageBudget >= 800000
                    ? 'High'
                    : wageBudget >= 500000
                      ? 'Medium'
                      : 'Low'}
                </div>
              </div>
            </div>
          </div>

          <Button
            onClick={() => onSaveBudgetAllocation(transferBudget, wageBudget)}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Budget Allocation
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetAllocation;
