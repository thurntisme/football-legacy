import React from "react";

import { Badge } from "@/components/ui/badge";
import { MatchScore } from "@/types/match";

type Props = {
  matchStarted: boolean;
  score: MatchScore;
  matchEnded: boolean;
  currentMinute: Number;
};

const MatchTeamOverview = ({
  matchStarted,
  score,
  matchEnded,
  currentMinute,
}: Props) => {
  return (
    <div className="flex items-center justify-center w-full mb-10 mt-6">
      <div className="flex flex-col items-center w-[80px]">
        <img
          src="/placeholder.svg?height=80&width=80"
          alt="Your Team"
          className="h-20 w-20 mb-2"
        />
        <span className="font-semibold text-sm">Your Team</span>
        <div className="flex items-center mt-1">
          <Badge>2nd</Badge>
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
          src="/placeholder.svg?height=80&width=80"
          alt="City FC"
          className="h-20 w-20 mb-2"
        />
        <span className="font-semibold text-sm">City FC</span>
        <div className="flex items-center mt-1">
          <Badge>3rd</Badge>
        </div>
      </div>
    </div>
  );
};

export default MatchTeamOverview;
