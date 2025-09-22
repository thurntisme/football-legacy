import React from 'react';

import { Star } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MatchResult } from '@/types/football/match';

type Props = {
  matchResult: MatchResult;
};

const MatchResultPlayers = ({ matchResult }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Player Performances</CardTitle>
        <CardDescription>Individual ratings and statistics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {matchResult.playerRatings.map((player) => (
            <div
              key={player.id}
              className="flex items-center p-3 border rounded-md"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mr-3 ${
                  player.rating >= 8
                    ? 'bg-green-100 text-green-800'
                    : player.rating >= 7
                      ? 'bg-blue-100 text-blue-800'
                      : player.rating >= 6
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-red-100 text-red-800'
                }`}
              >
                {player.rating.toFixed(1)}
              </div>
              <div className="flex-1">
                <div className="font-medium flex items-center">
                  {player.name}
                  {player.motm && (
                    <Badge className="ml-2 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300">
                      <Star className="h-3 w-3 mr-1" />
                      MOTM
                    </Badge>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  {player.position}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MatchResultPlayers;
