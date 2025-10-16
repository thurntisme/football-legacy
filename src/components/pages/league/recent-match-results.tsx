import React from "react";

import { Calendar, ClipboardCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getTeamFormBadge } from "@/lib/league";
import { IMatch } from "@/types/common";

type Props = {
  matches: any[];
  setSelectedMatch: (match: IMatch) => void;
};

const RecentMatchResults = ({ matches, setSelectedMatch }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Results</CardTitle>
        <CardDescription>Last 10 matches</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {matches.length &&
            matches.map((match, index) => (
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
                      match.badge === "league"
                        ? "default"
                        : match.badge === "champions"
                          ? "secondary"
                          : "outline"
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
                      variant={match.venue === "Away" ? "outline" : "default"}
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

                <div className="flex flex-col items-end gap-1.5 w-1/3">
                  {getTeamFormBadge(match.result, false)}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedMatch(match as IMatch)}
                  >
                    <ClipboardCheck className="h-4 w-4" />
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
