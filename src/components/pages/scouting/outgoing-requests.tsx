import React from "react";

import ContentWrapper from "@/components/common/content-wrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { internalApi } from "@/lib/api/internal";
import { useQuery } from "@tanstack/react-query";

import ScoutingRequestList from "./request-list";

type Props = {};

const OutgoingScoutingRequests = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["outgoing-requests"],
    queryFn: async () => {
      const res = await internalApi.get("/scouting/outgoing-requests");
      return res.data?.data || [];
    },
  });

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
        <CardTitle>Outgoing Transfer Requests</CardTitle>
        <CardDescription className="mt-2">
          Your requests to sign players from other teams
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ContentWrapper isLoading={isLoading} error={error} onRefetch={refetch}>
          <ScoutingRequestList
            requests={data || []}
            onAcceptRequest={handleAcceptRequest}
            onRejectRequest={handleRejectRequest}
          />
        </ContentWrapper>
      </CardContent>
    </Card>
  );
};

export default OutgoingScoutingRequests;
