import React from "react";

import { Clock, Pause, Play, SkipForward, XCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import MatchVisualization from "./match-visualization";

export type Props = {
  matchStarted: boolean;
  currentMinute: number;
  matchEnded: boolean;
  matchPaused: boolean;
  setMatchPaused: (option: boolean) => void;
  setAbortDialogOpen: (open: boolean) => void;
  skipToEnd: () => void;
  matchEvents: { minute: number; type: string; text: string }[];
  psychologicalState: {
    confidence: number;
    pressure: number;
    fatigue: number;
    teamwork: number;
  };
};

const MatchProcess = ({
  matchStarted,
  currentMinute,
  matchEnded,
  matchPaused,
  setMatchPaused,
  setAbortDialogOpen,
  skipToEnd,
  matchEvents,
  psychologicalState,
}: Props) => {
  if (!matchStarted) {
    return null;
  }

  return (
    <div className="w-full mt-4 border-t pt-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-2" />
          <span className="font-medium">{currentMinute}' / 90'</span>
        </div>

        <div className="flex gap-2">
          {!matchEnded && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setMatchPaused(!matchPaused)}
              >
                {matchPaused ? (
                  <Play className="h-4 w-4" />
                ) : (
                  <Pause className="h-4 w-4" />
                )}
                {matchPaused ? "Resume" : "Pause"}
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setAbortDialogOpen(true)}
              >
                <XCircle className="h-4 w-4" />
                Abort Match
              </Button>
              <Button variant="outline" size="sm" onClick={skipToEnd}>
                <SkipForward className="h-4 w-4" />
                Skip
              </Button>
            </>
          )}
        </div>
      </div>

      <Progress value={(currentMinute / 90) * 100} className="h-2 mb-4" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 h-[540px]">
        <div className="relative w-full overflow-hidden col-start-1 col-end-3">
          <MatchVisualization
            matchEvents={matchEvents}
            psychologicalState={psychologicalState}
          />
        </div>

        <div className="border rounded-md">
          <div className="p-3 border-b bg-muted/50">
            <h3 className="font-medium">Match Events</h3>
          </div>
          <div className="p-3 max-h-[480px] overflow-auto">
            {matchEvents.length > 0 ? (
              <div className="space-y-2">
                {matchEvents.map((event, index) => (
                  <div key={index} className="flex items-start">
                    <Badge
                      variant="outline"
                      className="mr-2 mt-0.5 min-w-[32px] text-center"
                    >
                      {event.minute}'
                    </Badge>
                    <div
                      className={`flex-1 ${event.type === "goal" ? "font-bold" : ""}`}
                    >
                      {event.text}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                No events yet. The match is just getting started.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchProcess;
