import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { IScoutingRequest } from '@/types/football/common';

import { ScoutPlayerDialog } from './scout-player-dialog';

type Props = {
  outgoingRequests: IScoutingRequest[];
  getStatusBadge: (status: string) => React.ReactNode;
};

const OutgoingScoutingRequests = ({
  outgoingRequests,
  getStatusBadge,
}: Props) => {
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
        {outgoingRequests.length > 0 ? (
          <div className="space-y-4">
            {outgoingRequests.map((request) => (
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
                      Your offer for{' '}
                      <span className="font-medium">{request.playerName}</span>{' '}
                      ({request.playerPosition})
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      {getStatusBadge(request.status)}
                      {request.status === 'pending' && (
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
                  <Button variant="outline" size="sm" className="mt-2">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No outgoing transfer requests at this time.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OutgoingScoutingRequests;
