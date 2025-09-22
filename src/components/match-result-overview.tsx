import React from 'react';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { MatchResult } from '@/types/football/match';

type Props = {
  matchResult: MatchResult;
};

const MatchResultOverview = ({ matchResult }: Props) => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Premier League - Matchday 24</CardTitle>
            <CardDescription>{matchResult.venue}</CardDescription>
          </div>
          <Badge
            className={
              matchResult.result === 'win'
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                : matchResult.result === 'loss'
                  ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                  : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300'
            }
          >
            {matchResult.result === 'win'
              ? 'Victory'
              : matchResult.result === 'loss'
                ? 'Defeat'
                : 'Draw'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center w-full mb-6">
          <div className="flex flex-col items-center">
            <img
              src="/placeholder.svg?height=80&width=80"
              alt="Your Team"
              className="h-20 w-20 mb-2"
            />
            <span className="font-semibold text-lg">Your Team</span>
          </div>

          <div className="mx-8 text-center">
            <div className="text-4xl font-bold mb-2">
              {matchResult.score.home} - {matchResult.score.away}
            </div>
            <Badge variant="secondary" className="text-sm">
              Full Time
            </Badge>
          </div>

          <div className="flex flex-col items-center">
            <img
              src="/placeholder.svg?height=80&width=80"
              alt="City FC"
              className="h-20 w-20 mb-2"
            />
            <span className="font-semibold text-lg">City FC</span>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-1">Possession</div>
            <div className="flex items-center justify-center">
              <span className="font-bold">{matchResult.possession.home}%</span>
              <div className="mx-2 h-4 w-20 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${matchResult.possession.home}%` }}
                ></div>
              </div>
              <span className="font-bold">{matchResult.possession.away}%</span>
            </div>
          </div>

          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-1">
              Shots (On Target)
            </div>
            <div className="flex items-center justify-center">
              <span className="font-bold">
                {matchResult.shots.home} ({matchResult.shotsOnTarget.home})
              </span>
              <div className="mx-2 h-4 w-20 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{
                    width: `${
                      (matchResult.shots.home /
                        (matchResult.shots.home + matchResult.shots.away)) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
              <span className="font-bold">
                {matchResult.shots.away} ({matchResult.shotsOnTarget.away})
              </span>
            </div>
          </div>

          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-1">
              Expected Goals
            </div>
            <div className="flex items-center justify-center">
              <span className="font-bold">
                {matchResult.xg.home.toFixed(1)}
              </span>
              <div className="mx-2 h-4 w-20 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{
                    width: `${
                      (matchResult.xg.home /
                        (matchResult.xg.home + matchResult.xg.away)) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
              <span className="font-bold">
                {matchResult.xg.away.toFixed(1)}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium mb-2">Goals</h3>
            <div className="space-y-2">
              {matchResult.goals.map((goal, index) => (
                <div key={index} className="flex items-center">
                  <Badge
                    variant="outline"
                    className="mr-2 min-w-[32px] text-center"
                  >
                    {goal.minute}'
                  </Badge>
                  <div className="flex-1">
                    <span className="font-medium">{goal.player}</span>
                    {goal.assist && (
                      <span className="text-sm text-muted-foreground">
                        {' '}
                        (assist: {goal.assist})
                      </span>
                    )}
                  </div>
                  <Badge variant="outline">
                    {goal.team === 'home' ? 'Your Team' : 'City FC'}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Match Stats</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Corners</span>
                <div>
                  <span className="font-medium">
                    {matchResult.corners.home}
                  </span>
                  <span className="mx-1">-</span>
                  <span className="font-medium">
                    {matchResult.corners.away}
                  </span>
                </div>
              </div>
              <div className="flex justify-between">
                <span>Fouls</span>
                <div>
                  <span className="font-medium">{matchResult.fouls.home}</span>
                  <span className="mx-1">-</span>
                  <span className="font-medium">{matchResult.fouls.away}</span>
                </div>
              </div>
              <div className="flex justify-between">
                <span>Yellow Cards</span>
                <div>
                  <span className="font-medium">
                    {matchResult.yellowCards.home}
                  </span>
                  <span className="mx-1">-</span>
                  <span className="font-medium">
                    {matchResult.yellowCards.away}
                  </span>
                </div>
              </div>
              <div className="flex justify-between">
                <span>Red Cards</span>
                <div>
                  <span className="font-medium">
                    {matchResult.redCards.home}
                  </span>
                  <span className="mx-1">-</span>
                  <span className="font-medium">
                    {matchResult.redCards.away}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MatchResultOverview;
