import React from 'react';

import { Calendar, Clock, Trophy } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type Props = {};

const SeasonOverview = (props: Props) => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle>Season Overview</CardTitle>
        <CardDescription>2024/25 Season</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center">
            <div className="mr-4 p-3 bg-primary/10 rounded-full">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Next Match</p>
              <p className="text-xl font-bold">vs City FC</p>
              <p className="text-sm text-muted-foreground">Saturday, 22 Mar</p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="mr-4 p-3 bg-primary/10 rounded-full">
              <Trophy className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Competitions</p>
              <p className="text-xl font-bold">4 Active</p>
              <div className="flex gap-1 mt-1">
                <Badge variant="outline">League</Badge>
                <Badge variant="outline">Cup</Badge>
                <Badge variant="outline">Europe</Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <div className="mr-4 p-3 bg-primary/10 rounded-full">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Matches Played</p>
              <p className="text-xl font-bold">23 of 56</p>
              <p className="text-sm text-muted-foreground">
                41% of season complete
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SeasonOverview;
