import React from "react";

import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

type Props = {
  waitingForOpponent: boolean;
  cancelChallenge: () => void;
  challengedUser: {
    name: string;
    avatar: string;
  } | null;
  waitTime: number; // in seconds
};

const WaitingOpponentDialog = ({
  waitingForOpponent,
  cancelChallenge,
  challengedUser,
  waitTime,
}: Props) => {
  return (
    <Dialog
      open={waitingForOpponent}
      onOpenChange={(open) => !open && cancelChallenge()}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Waiting for Response</DialogTitle>
          <DialogDescription>
            Your challenge has been sent to {challengedUser?.name}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center py-6 space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src="/placeholder.svg?height=64&width=64"
                alt="Your Team"
              />
              <AvatarFallback>YT</AvatarFallback>
            </Avatar>

            <div className="flex flex-col items-center">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 rounded-full border-4 border-muted-foreground/20 border-t-primary animate-spin"></div>
              </div>
            </div>

            <Avatar className="h-16 w-16">
              <AvatarImage
                src={challengedUser?.avatar}
                alt={challengedUser?.name}
              />
              <AvatarFallback>
                {challengedUser?.name?.substring(0, 2) || "OP"}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Waiting for {waitTime} seconds
            </p>
            <p className="text-xs mt-1">
              The opponent has 30 seconds to respond
            </p>
          </div>
        </div>

        <DialogFooter className="sm:justify-center">
          <Button variant="outline" onClick={cancelChallenge}>
            <X className="h-4 w-4 mr-2" />
            Cancel Challenge
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WaitingOpponentDialog;
