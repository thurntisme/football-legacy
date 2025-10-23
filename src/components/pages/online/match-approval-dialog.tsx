import React from "react";

import { AlertTriangle, Check, X } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
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
  matchApprovalDialogOpen: boolean;
  userApproved: boolean;
  setForfeitDialogOpen: (open: boolean) => void;
  approvalCountdown: number;
  opponent: {
    team: string;
    avatar: string;
  } | null;
  opponentApproved: boolean;
  approveMatch: () => void;
  setMatchApprovalDialogOpen: (open: boolean) => void;
};

const MatchApprovalDialog = ({
  matchApprovalDialogOpen,
  userApproved,
  setForfeitDialogOpen,
  approvalCountdown,
  opponent,
  opponentApproved,
  approveMatch,
  setMatchApprovalDialogOpen,
}: Props) => {
  return (
    <Dialog
      open={matchApprovalDialogOpen}
      onOpenChange={(open) => {
        if (!open && !userApproved) {
          setForfeitDialogOpen(true);
        }
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Match Approval</DialogTitle>
          <DialogDescription>
            Both managers must approve to start the match
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center py-4 space-y-6">
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col items-center">
              <Avatar className="h-16 w-16 mb-2">
                <AvatarImage
                  src="/placeholder.svg?height=64&width=64"
                  alt="Your Team"
                />
                <AvatarFallback>YT</AvatarFallback>
              </Avatar>
              <div className="font-medium">Your Team</div>
              <div className="mt-2">
                {userApproved ? (
                  <Badge className="bg-green-500">
                    <Check className="h-3 w-3 mr-1" />
                    Approved
                  </Badge>
                ) : (
                  <Badge variant="outline">Waiting</Badge>
                )}
              </div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold mb-2">VS</div>
              <Badge variant="secondary" className="mb-2">
                Time: {approvalCountdown}s
              </Badge>
              <div className="text-xs text-muted-foreground">
                Approve within the time limit or forfeit
              </div>
            </div>

            <div className="flex flex-col items-center">
              <Avatar className="h-16 w-16 mb-2">
                <AvatarImage src={opponent?.avatar} alt={opponent?.team} />
                <AvatarFallback>
                  {opponent?.team?.substring(0, 2) || "OP"}
                </AvatarFallback>
              </Avatar>
              <div className="font-medium">{opponent?.team}</div>
              <div className="mt-2">
                {opponentApproved ? (
                  <Badge className="bg-green-500">
                    <Check className="h-3 w-3 mr-1" />
                    Approved
                  </Badge>
                ) : (
                  <Badge variant="outline">Waiting</Badge>
                )}
              </div>
            </div>
          </div>

          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Important</AlertTitle>
            <AlertDescription>
              Forfeiting the match will result in a 1000 coin penalty and a loss
              on your record.
            </AlertDescription>
          </Alert>
        </div>

        <DialogFooter className="flex justify-center sm:justify-center">
          <Button
            variant="destructive"
            onClick={() => {
              setMatchApprovalDialogOpen(false);
              setForfeitDialogOpen(true);
            }}
          >
            <X className="h-4 w-4 mr-2" />
            Forfeit (1000 coins)
          </Button>

          <Button
            onClick={approveMatch}
            disabled={userApproved}
            className={userApproved ? "bg-green-500 hover:bg-green-600" : ""}
          >
            <Check className="h-4 w-4 mr-2" />
            {userApproved ? "Approved" : "Approve Match"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MatchApprovalDialog;
