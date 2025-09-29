import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { IMatch } from "@/types/common";
import {
  teamALineup,
  teamASubs,
  teamBLineup,
  teamBSubs,
} from "@/mock/match-report";

type Props = {
  selectedMatch: IMatch;
};

const MatchReportLineup = ({ selectedMatch }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            {selectedMatch.homeTeam} Lineup
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {teamALineup.map((player) => (
              <div key={player.number} className="flex items-center">
                <div className="w-8 text-center font-medium">
                  {player.number}
                </div>
                <div className="flex-1 ml-2">{player.name}</div>
                <div className="w-10 text-center text-sm text-muted-foreground">
                  {player.position}
                </div>
                <div className="w-10 text-center font-medium">
                  {player.rating}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t">
            <h4 className="font-medium mb-2">Substitutes</h4>
            <div className="space-y-2">
              {teamASubs.map((player) => (
                <div key={player.number} className="flex items-center">
                  <div className="w-8 text-center font-medium">
                    {player.number}
                  </div>
                  <div className="flex-1 ml-2">{player.name}</div>
                  <div className="w-10 text-center text-sm text-muted-foreground">
                    {player.position}
                  </div>
                  <div className="w-10 text-center font-medium">
                    {player.rating}
                  </div>
                  {player.minute && (
                    <div className="ml-2 text-xs text-muted-foreground">
                      {player.minute}'
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            {selectedMatch.awayTeam} Lineup
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {teamBLineup.map((player) => (
              <div key={player.number} className="flex items-center">
                <div className="w-8 text-center font-medium">
                  {player.number}
                </div>
                <div className="flex-1 ml-2">{player.name}</div>
                <div className="w-10 text-center text-sm text-muted-foreground">
                  {player.position}
                </div>
                <div className="w-10 text-center font-medium">
                  {player.rating}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t">
            <h4 className="font-medium mb-2">Substitutes</h4>
            <div className="space-y-2">
              {teamBSubs.map((player) => (
                <div key={player.number} className="flex items-center">
                  <div className="w-8 text-center font-medium">
                    {player.number}
                  </div>
                  <div className="flex-1 ml-2">{player.name}</div>
                  <div className="w-10 text-center text-sm text-muted-foreground">
                    {player.position}
                  </div>
                  <div className="w-10 text-center font-medium">
                    {player.rating}
                  </div>
                  {player.minute && (
                    <div className="ml-2 text-xs text-muted-foreground">
                      {player.minute}'
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MatchReportLineup;
