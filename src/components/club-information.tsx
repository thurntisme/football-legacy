import React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type Props = {};

const ClubInformation = (props: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Club Name</CardTitle>
          <CardDescription>Premier League</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <div className="mr-4">
              <img
                src="/placeholder.svg?height=64&width=64"
                alt="Club Logo"
                className="h-16 w-16"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold">FC United</h3>
              <p className="text-sm text-muted-foreground">Est. 1985</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Budget</CardTitle>
          <CardDescription>Available funds</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Transfer Budget</p>
              <p className="text-2xl font-bold">£25,000,000</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Wage Budget</p>
              <p className="text-2xl font-bold">£850,000</p>
              <p className="text-xs text-muted-foreground">per week</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Stadium</CardTitle>
          <CardDescription>Home ground</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <div className="mr-4">
              <img
                src="/placeholder.svg?height=64&width=64"
                alt="Stadium"
                className="h-16 w-16 rounded"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold">United Arena</h3>
              <p className="text-sm text-muted-foreground">Capacity: 45,000</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClubInformation;
