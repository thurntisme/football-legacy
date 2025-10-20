import React from "react";

import { Calendar, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getStandingPosition } from "@/lib/league";

type Props = {
  data: any;
};

const UpcomingMatchOverview = ({ data }: Props) => {
  if (!data) {
    return null;
  }
  const { match, team } = data;

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle>Upcoming Match</CardTitle>
        <CardDescription>{match.competition || "N/A"}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
            <div className="flex items-center mb-2">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {match.date || "N/A"} {match.time || "N/A"}
              </span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {match.stadium || "N/A"}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center w-[80px]">
              <img
                src={team?.home?.logo || "/placeholder.svg?height=64&width=64"}
                alt={team?.home?.name || "N/A"}
                className="h-16 w-16 mb-2"
              />
              <span className="font-semibold text-sm text-center">
                {team?.home?.name || "N/A"}
              </span>
              <div className="flex items-center mt-1">
                <Badge>{getStandingPosition(team?.home?.position)}</Badge>
              </div>
            </div>

            <div className="mx-6 text-center w-[80px]">
              <div className="text-lg font-bold mb-1">VS</div>
              <Badge>Home</Badge>
            </div>

            <div className="flex flex-col items-center w-[80px]">
              <img
                src={team?.away?.logo || "/placeholder.svg?height=64&width=64"}
                alt={team?.away?.name || "N/A"}
                className="h-16 w-16 mb-2"
              />
              <span className="font-semibold text-sm text-center">
                {team?.away?.name || "N/A"}
              </span>
              <div className="flex items-center mt-1">
                <Badge>{getStandingPosition(team?.away?.position)}</Badge>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end mt-4 md:mt-0">
            <div className="text-sm text-muted-foreground mb-1">Match Odds</div>
            <div className="flex gap-2">
              <Badge variant="outline" className="font-bold">
                Win: {match.odds.win}
              </Badge>
              <Badge variant="outline" className="font-bold">
                Draw: {match.odds.draw}
              </Badge>
              <Badge variant="outline" className="font-bold">
                Loss: {match.odds.lose}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingMatchOverview;
