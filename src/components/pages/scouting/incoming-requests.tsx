import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IScoutingRequest } from "@/types/common";

type Props = {
  incomingRequests: IScoutingRequest[];
  handleRejectRequest: (id: number) => void;
  handleAcceptRequest: (id: number) => void;
  getStatusBadge: (status: string) => React.ReactNode;
};

const IncomingScoutingRequests = ({
  incomingRequests,
  handleRejectRequest,
  handleAcceptRequest,
  getStatusBadge,
}: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Incoming Transfer Requests</CardTitle>
        <CardDescription className="mt-2">
          Other teams interested in signing your players
        </CardDescription>
      </CardHeader>
      <CardContent>
        {incomingRequests.length > 0 ? (
          <div className="space-y-4">
            {incomingRequests.map((request) => (
              <div
                key={request.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage
                      src={request.teamLogo}
                      alt={request.teamName}
                    />
                    <AvatarFallback>
                      {request.teamName.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{request.teamName}</div>
                    <div className="text-sm text-muted-foreground">
                      Wants to sign{" "}
                      <span className="font-medium">{request.playerName}</span>{" "}
                      ({request.playerPosition})
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
                  {request.status === "pending" && (
                    <div className="flex gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRejectRequest(request.id)}
                      >
                        Reject
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleAcceptRequest(request.id)}
                      >
                        Accept
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No incoming transfer requests at this time.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default IncomingScoutingRequests;
