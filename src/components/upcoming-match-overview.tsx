import React from 'react';

import { Calendar, MapPin } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type Props = {};

const UpcomingMatchOverview = (props: Props) => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle>Upcoming Match</CardTitle>
        <CardDescription>Premier League - Matchday 24</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
            <div className="flex items-center mb-2">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Saturday, 22 Mar - 15:00
              </span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                United Arena (Home)
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center w-[80px]">
              <img
                src="/placeholder.svg?height=64&width=64"
                alt="Your Team"
                className="h-16 w-16 mb-2"
              />
              <span className="font-semibold text-sm">Your Team</span>
              <div className="flex items-center mt-1">
                <Badge>2nd</Badge>
              </div>
            </div>

            <div className="mx-6 text-center w-[80px]">
              <div className="text-lg font-bold mb-1">VS</div>
              <Badge>Home</Badge>
            </div>

            <div className="flex flex-col items-center w-[80px]">
              <img
                src="/placeholder.svg?height=64&width=64"
                alt="City FC"
                className="h-16 w-16 mb-2"
              />
              <span className="font-semibold text-sm">City FC</span>
              <div className="flex items-center mt-1">
                <Badge>3rd</Badge>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end mt-4 md:mt-0">
            <div className="text-sm text-muted-foreground mb-1">Match Odds</div>
            <div className="flex gap-2">
              <Badge variant="outline" className="font-bold">
                Win: 2.10
              </Badge>
              <Badge variant="outline" className="font-bold">
                Draw: 3.25
              </Badge>
              <Badge variant="outline" className="font-bold">
                Loss: 3.50
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingMatchOverview;
