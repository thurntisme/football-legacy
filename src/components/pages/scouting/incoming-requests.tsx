import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { incomingLists } from "@/mock/scouting";
import { IScoutingRequest } from "@/types/scouting";

import ScoutingRequestList from "./request-list";

type Props = {};

const IncomingScoutingRequests = () => {
  const [incomingRequests, setIncomingRequests] =
    useState<IScoutingRequest[]>(incomingLists);

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
      <CardHeader>
        <CardTitle>Incoming Transfer Requests</CardTitle>
        <CardDescription className="mt-2">
          Other teams interested in signing your players
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScoutingRequestList
          requests={incomingRequests}
          onAcceptRequest={handleAcceptRequest}
          onRejectRequest={handleRejectRequest}
        />
      </CardContent>
    </Card>
  );
};

export default IncomingScoutingRequests;
