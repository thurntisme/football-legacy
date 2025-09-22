import React from 'react';

import { Calendar } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { IMatch } from '@/types/football/common';

type Props = {
  setSelectedMatch: (match: IMatch) => void;
};

const RecentMatchResults = ({ setSelectedMatch }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Results</CardTitle>
        <CardDescription>Last 10 matches</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[
            {
              id: 1,
              date: 'Saturday, 15 Mar',
              competition: 'Premier League',
              opponent: 'Wanderers',
              venue: 'Away',
              result: 'W',
              score: '2-0',
              badge: 'league',
              homeTeam: 'Your Team',
              awayTeam: 'Wanderers',
              homeScore: 2,
              awayScore: 0,
              stadium: 'Wanderers Stadium',
            },
            {
              id: 2,
              date: 'Tuesday, 11 Mar',
              competition: 'Champions League',
              opponent: 'Paris SC',
              venue: 'Home',
              result: 'W',
              score: '3-1',
              badge: 'champions',
              homeTeam: 'Your Team',
              awayTeam: 'Paris SC',
              homeScore: 3,
              awayScore: 1,
              stadium: 'United Arena',
            },
            {
              id: 3,
              date: 'Saturday, 8 Mar',
              competition: 'Premier League',
              opponent: 'Northern FC',
              venue: 'Home',
              result: 'D',
              score: '1-1',
              badge: 'league',
              homeTeam: 'Your Team',
              awayTeam: 'Northern FC',
              homeScore: 1,
              awayScore: 1,
              stadium: 'United Arena',
            },
            {
              id: 4,
              date: 'Wednesday, 5 Mar',
              competition: 'FA Cup',
              opponent: 'Eastern Town',
              venue: 'Away',
              result: 'W',
              score: '2-1',
              badge: 'cup',
              homeTeam: 'Eastern Town',
              awayTeam: 'Your Team',
              homeScore: 1,
              awayScore: 2,
              stadium: 'Eastern Stadium',
            },
            {
              id: 5,
              date: 'Saturday, 1 Mar',
              competition: 'Premier League',
              opponent: 'Albion United',
              venue: 'Away',
              result: 'W',
              score: '3-0',
              badge: 'league',
              homeTeam: 'Albion United',
              awayTeam: 'Your Team',
              homeScore: 0,
              awayScore: 3,
              stadium: 'Albion Stadium',
            },
          ].map((match, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg"
            >
              <div className="flex flex-col mb-2 md:mb-0 w-1/3">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm font-medium">{match.date}</span>
                </div>
                <Badge
                  variant={
                    match.badge === 'league'
                      ? 'default'
                      : match.badge === 'champions'
                        ? 'secondary'
                        : 'outline'
                  }
                  className="mt-2 w-fit"
                >
                  {match.competition}
                </Badge>
              </div>

              <div className="flex items-center mb-2 md:mb-0 w-1/3 justify-center">
                <div className="flex flex-col items-center w-[80px]">
                  <img
                    src="/placeholder.svg?height=40&width=40"
                    alt="Your Team"
                    className="h-10 w-10 mb-1"
                  />
                  <span className="text-xs">Your Team</span>
                </div>

                <div className="mx-4 text-center w-[80px]">
                  <div className="text-lg font-bold mb-1">{match.score}</div>
                  <Badge
                    variant={match.venue === 'Away' ? 'outline' : 'default'}
                  >
                    {match.venue}
                  </Badge>
                </div>

                <div className="flex flex-col items-center w-[80px]">
                  <img
                    src="/placeholder.svg?height=40&width=40"
                    alt={match.opponent}
                    className="h-10 w-10 mb-1"
                  />
                  <span className="text-xs">{match.opponent}</span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1 w-1/3">
                <Badge
                  className={
                    match.result === 'W'
                      ? 'bg-green-500'
                      : match.result === 'D'
                        ? 'bg-amber-500'
                        : 'bg-red-500'
                  }
                >
                  {match.result === 'W'
                    ? 'Win'
                    : match.result === 'D'
                      ? 'Draw'
                      : 'Loss'}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedMatch(match as IMatch)}
                >
                  Match Report
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentMatchResults;
