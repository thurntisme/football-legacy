import React from "react";

import { Play } from "lucide-react";

import { Button } from "@/components/ui/button";

import WaitingForApproval from "./waiting-for-approval";

type Props = {
  matchStarted: boolean;
  waitingForApproval: boolean;
  homeApproved: boolean;
  awayApproved: boolean;
  requestMatchApproval: () => void;
};

const MatchAction = ({
  matchStarted,
  waitingForApproval,
  homeApproved,
  awayApproved,
  requestMatchApproval,
}: Props) => {
  return (
    <>
      {!matchStarted && !waitingForApproval && (
        <>
          <Button size="lg" onClick={requestMatchApproval} className="mb-4">
            <Play className="h-5 w-5" />
            Start Match
          </Button>

          <p className="text-sm text-muted-foreground max-w-md text-center">
            Starting the match will simulate the game in real-time. You can
            pause at any time to make tactical changes.
          </p>
        </>
      )}

      {waitingForApproval && (
        <WaitingForApproval
          homeApproved={homeApproved}
          awayApproved={awayApproved}
        />
      )}
    </>
  );
};

export default MatchAction;
