import React from "react";

import { CheckCircle } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

type Props = {
  homeApproved: boolean;
  awayApproved: boolean;
};

const WaitingForApproval = ({ homeApproved, awayApproved }: Props) => {
  return (
    <div className="flex flex-col items-center mt-4 w-full max-w-2xl">
      <div className="text-center mb-6">
        <h3 className="text-xl font-medium mb-2">Match Approval Required</h3>
        <p className="text-muted-foreground">
          Both teams must approve to start the match
        </p>
      </div>

      <div className="grid grid-cols-2 gap-8 w-full mb-6">
        <div className="flex flex-col items-center">
          <Avatar className="h-16 w-16 mb-2">
            <AvatarImage
              src="/placeholder.svg?height=64&width=64"
              alt="Your Team"
            />
            <AvatarFallback>YT</AvatarFallback>
          </Avatar>
          <span className="font-medium mb-2">Your Team</span>
          {homeApproved ? (
            <Badge className="bg-green-600">
              <CheckCircle className="h-3 w-3 mr-1" /> Approved
            </Badge>
          ) : (
            <Badge variant="outline">Waiting...</Badge>
          )}
        </div>

        <div className="flex flex-col items-center">
          <Avatar className="h-16 w-16 mb-2">
            <AvatarImage
              src="/placeholder.svg?height=64&width=64"
              alt="City FC"
            />
            <AvatarFallback>CF</AvatarFallback>
          </Avatar>
          <span className="font-medium mb-2">City FC</span>
          {awayApproved ? (
            <Badge className="bg-green-600">
              <CheckCircle className="h-3 w-3 mr-1" /> Approved
            </Badge>
          ) : (
            <Badge variant="outline">Waiting...</Badge>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="relative w-16 h-16 mb-4">
          <div className="absolute inset-0 rounded-full border-4 border-muted-foreground/20 border-t-primary animate-spin"></div>
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          Waiting for all participants to approve the match...
        </p>
      </div>
    </div>
  );
};

export default WaitingForApproval;
