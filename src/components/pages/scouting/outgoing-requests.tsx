import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { outgoingLists } from "@/mock/scouting";
import { IScoutingRequest } from "@/types/scouting";

import ScoutingRequestList from "./request-list";
import { ScoutPlayerDialog } from "./scout-player-dialog";

type Props = {};

const OutgoingScoutingRequests = () => {
  const [outgoingRequests, setOutgoingRequests] =
    useState<IScoutingRequest[]>(outgoingLists);

  const handleAcceptRequest = (requestId: number) => {
    toast({
      title: "Transfer Accepted",
      description: "You have accepted the transfer request.",
    });
  };

  const handleRejectRequest = (requestId: number) => {
    toast({
      title: "Transfer Rejected",
      description: "You have rejected the transfer request.",
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <div>
          <CardTitle>Outgoing Transfer Requests</CardTitle>
          <CardDescription className="mt-2">
            Your requests to sign players from other teams
          </CardDescription>
        </div>
        <div className="flex justify-end">
          <ScoutPlayerDialog />
        </div>
      </CardHeader>
      <CardContent>
        <ScoutingRequestList
          requests={outgoingRequests}
          onAcceptRequest={handleAcceptRequest}
          onRejectRequest={handleRejectRequest}
        />
      </CardContent>
    </Card>
  );
};

export default OutgoingScoutingRequests;
