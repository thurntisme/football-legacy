import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { matchEvents } from "@/mock/match-report";
import { IMatch } from "@/types/common";
import { MatchEvent } from "@/types/match";

type Props = {
  selectedMatch: IMatch;
};

const MatchReportTimeline = ({ selectedMatch }: Props) => {
  const getEventColor = (type: MatchEvent["type"]) => {
    switch (type) {
      case "goal":
        return "bg-green-500";
      case "yellow-card":
        return "bg-yellow-500";
      case "substitution":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-muted"></div>
          <div className="space-y-6">
            {matchEvents.map((event, index) => (
              <div key={index} className="relative pl-10">
                <div className="absolute left-0 top-1 z-10 w-8 text-center text-sm font-medium">
                  {event.minute}
                </div>
                <div
                  className={`absolute left-4 -translate-x-1/2 w-3 h-3 rounded-full ${getEventColor(event.type)}`}
                ></div>
                <div className="font-medium">{event.title}</div>
                <div className="text-sm text-muted-foreground">
                  {event.description}
                </div>
                {event.assist && (
                  <div className="text-xs text-muted-foreground mt-1">
                    {event.assist}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MatchReportTimeline;
