import React from 'react';

import { ArrowUpDown, Clock, DollarSign } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type Props = {};

const TransferOverview = (props: Props) => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle>Market Overview</CardTitle>
        <CardDescription>Current transfer window: Summer 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center">
            <div className="mr-4 p-3 bg-primary/10 rounded-full">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Transfer Budget</p>
              <p className="text-xl font-bold">£25,000,000</p>
              <p className="text-sm text-muted-foreground">
                Available for transfers
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="mr-4 p-3 bg-primary/10 rounded-full">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Window Status</p>
              <p className="text-xl font-bold">Open</p>
              <p className="text-sm text-muted-foreground">Closes in 45 days</p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="mr-4 p-3 bg-primary/10 rounded-full">
              <ArrowUpDown className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Market Activity</p>
              <p className="text-xl font-bold">High</p>
              <p className="text-sm text-muted-foreground">
                128 transfers completed
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransferOverview;
