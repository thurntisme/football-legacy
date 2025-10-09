import React from "react";

import { CheckIcon, InfoIcon, XIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getStatusBadge } from "@/lib/scouting";
import { IScoutingRequest, ScoutingStatusEnum } from "@/types/scouting";

type Props = {
  requests: IScoutingRequest[];
  onAcceptRequest: (id: number) => void;
  onRejectRequest: (id: number) => void;
};

const ScoutingRequestList = ({
  requests,
  onAcceptRequest,
  onRejectRequest,
}: Props) => {
  return (
    <>
      {requests.length > 0 ? (
        <div className="space-y-4">
          {requests.map((request) => (
            <div
              key={request.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={request.teamLogo} alt={request.teamName} />
                  <AvatarFallback>
                    {request.teamName.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{request.teamName}</div>
                  <div className="text-sm text-muted-foreground">
                    Your offer for{" "}
                    <span className="font-medium">{request.playerName}</span> (
                    {request.playerPosition})
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    {getStatusBadge(request.status)}
                    {request.status === "pending" && (
                      <span className="text-xs text-muted-foreground">
                        Expires in {request.expiresIn}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="font-bold text-lg">
                  £{(request.offerAmount / 1000000).toFixed(1)}M
                </div>
                <div className="flex gap-2 mt-2">
                  {request.status === ScoutingStatusEnum.PENDING && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onRejectRequest(request.id)}
                    >
                      <XIcon className="h-4 w-4" />
                      Reject
                    </Button>
                  )}
                  {request.status === ScoutingStatusEnum.ACCEPTED && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onAcceptRequest(request.id)}
                    >
                      <CheckIcon className="h-4 w-4" />
                      Accept
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    <InfoIcon className="h-4 w-4" />
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          No scouting requests at this time.
        </div>
      )}
    </>
  );
};

export default ScoutingRequestList;
