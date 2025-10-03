import React from 'react';

import { Eye } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { matchHistory } from '@/mock/football';
import { MatchDetail } from '@/types/football/match';

type Props = {
  viewMatchDetails: (match: MatchDetail) => void;
};

const MatchHistory = ({ viewMatchDetails }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Match History</CardTitle>
        <CardDescription>Your recent online matches</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="p-3 text-left font-medium">Date</th>
                <th className="p-3 text-left font-medium">Opponent</th>
                <th className="p-3 text-center font-medium">Result</th>
                <th className="p-3 text-center font-medium">Score</th>
                <th className="p-3 text-center font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {matchHistory.map((match) => (
                <tr key={match.id} className="border-b">
                  <td className="p-3">{match.date}</td>
                  <td className="p-3">
                    <div className="font-medium">{match.opponent}</div>
                    <div className="text-sm text-muted-foreground">
                      {match.opponentTeam}
                    </div>
                  </td>
                  <td className="p-3 text-center">
                    <Badge
                      variant={
                        match.result === 'win'
                          ? 'default'
                          : match.result === 'loss'
                            ? 'destructive'
                            : 'outline'
                      }
                    >
                      {match.result === 'win'
                        ? 'Win'
                        : match.result === 'loss'
                          ? 'Loss'
                          : 'Draw'}
                    </Badge>
                  </td>
                  <td className="p-3 text-center">{match.score}</td>
                  <td className="p-3 text-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => viewMatchDetails(match)}
                    >
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

export default MatchHistory;
