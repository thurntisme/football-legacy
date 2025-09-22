import React from 'react';

import { BarChart3 } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { FOOTBALL_STATS_URL } from '@/constants/site';

type Props = {};

const MatchResultLeagueImpact = (props: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>League Impact</CardTitle>
        <CardDescription>
          How this result affects your league position
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Previous Position</span>
            <Badge variant="outline">2nd</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span>Current Position</span>
            <Badge>1st</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span>Points</span>
            <span className="font-bold">57 (+3)</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Goal Difference</span>
            <span className="font-bold">+24 (+1)</span>
          </div>

          <Separator />

          <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
            <p className="text-sm text-green-800 dark:text-green-300">
              This win puts you at the top of the Premier League table, 2 points
              ahead of Manchester City!
            </p>
          </div>

          <Button variant="outline" asChild className="w-full">
            <Link href={`${FOOTBALL_STATS_URL}/league/standings`}>
              <BarChart3 className="mr-2 h-4 w-4" />
              View League Table
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MatchResultLeagueImpact;
