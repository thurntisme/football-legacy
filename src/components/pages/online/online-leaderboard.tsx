import React from 'react';

import { Award, Eye, Shield, Star, Trophy } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { leaderboard } from '@/mock/football';

type Props = {};

const OnlineLeaderboard = (props: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Global Leaderboard</CardTitle>
        <CardDescription>Top managers ranked by rating</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="p-3 text-center font-medium">Rank</th>
                <th className="p-3 text-left font-medium">Manager</th>
                <th className="p-3 text-center font-medium">Rating</th>
                <th className="p-3 text-center font-medium">Record</th>
                <th className="p-3 text-right font-medium w-[100px]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {leaderboard
                .sort((a, b) => b.rating - a.rating)
                .map((player, index) => (
                  <tr
                    key={player.id}
                    className={`border-b ${
                      player.name === 'Alex Manager' ? 'bg-primary/10' : ''
                    }`}
                  >
                    <td className="p-3 text-center">
                      {index === 0 ? (
                        <Trophy className="h-5 w-5 text-yellow-500 mx-auto" />
                      ) : index === 1 ? (
                        <Award className="h-5 w-5 text-gray-400 mx-auto" />
                      ) : index === 2 ? (
                        <Shield className="h-5 w-5 text-amber-700 mx-auto" />
                      ) : (
                        index + 1
                      )}
                    </td>
                    <td className="p-3">
                      <div className="font-medium">{player.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {player.team}
                      </div>
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center">
                        <Star className="h-4 w-4 text-amber-500 mr-1" />
                        <span>{player.rating}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex space-x-1 justify-center">
                        <Badge variant="default" className="bg-green-500">
                          {player.wins}W
                        </Badge>
                        <Badge variant="outline">{player.draws}D</Badge>
                        <Badge variant="destructive">{player.losses}L</Badge>
                      </div>
                    </td>
                    <td className="p-3 text-right flex space-x-2 justify-end">
                      <Button size="sm">Challenge</Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Details
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default OnlineLeaderboard;
