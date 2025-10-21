import React from "react";

import { Badge } from "@/components/ui/badge";
import { getStandingPosition } from "@/lib/league";
import { MatchScore } from "@/types/match";

type Props = {
  matchStarted: boolean;
  score: MatchScore;
  matchEnded: boolean;
  currentMinute: Number;
  team?: {
    home: any;
    away: any;
  };
};

const MatchTeamOverview = ({
  matchStarted,
  score,
  matchEnded,
  currentMinute,
  team,
}: Props) => {
  return (
    <div className="flex items-center justify-center w-full py-6">
      <div className="flex flex-col items-center w-[80px]">
        <img
          src={team?.home?.logo || "/placeholder.svg?height=64&width=64"}
          alt={team?.home?.name || "N/A"}
          className="h-20 w-20 mb-2"
        />
        <span className="font-semibold text-sm text-center">
          {team?.home?.name || "N/A"}
        </span>
        <div className="flex items-center mt-1">
          <Badge>{getStandingPosition(team?.home?.position)}</Badge>
        </div>
      </div>

      <div className="mx-8 text-center w-[120px]">
        {matchStarted ? (
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold mb-2">
              {score.home} - {score.away}
            </div>
            <Badge
              variant={matchEnded ? "secondary" : "default"}
              className="text-sm"
            >
              {matchEnded ? "Full Time" : `${currentMinute}'`}
            </Badge>
          </div>
        ) : (
          <div className="text-2xl font-bold mb-1">VS</div>
        )}
      </div>

      <div className="flex flex-col items-center w-[80px]">
        <img
          src={team?.away?.logo || "/placeholder.svg?height=64&width=64"}
          alt={team?.away?.name || "N/A"}
          className="h-20 w-20 mb-2"
        />
        <span className="font-semibold text-sm text-center">
          {team?.away?.name || "N/A"}
        </span>
        <div className="flex items-center mt-1">
          <Badge>{getStandingPosition(team?.away?.position)}</Badge>
        </div>
      </div>
    </div>
  );
};

export default MatchTeamOverview;
