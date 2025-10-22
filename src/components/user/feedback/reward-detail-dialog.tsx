"use client";

import React, { useState } from "react";

import { Check, Gift, X } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getFeedbackRewardIcon } from "@/lib/user";
import { FeedbackReward } from "@/types/user";

type Props = {
  selectedReward: FeedbackReward | null;
  setSelectedReward: (reward: FeedbackReward | null) => void;
  handleClaimReward: () => void;
};

const RewardDetailDialog = ({
  selectedReward,
  setSelectedReward,
  handleClaimReward,
}: Props) => {
  const [claimSuccess, setClaimSuccess] = useState(false);

  return (
    <Dialog
      open={!!selectedReward}
      onOpenChange={(open) => !open && setSelectedReward(null)}
    >
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Reward Details</DialogTitle>
          <DialogDescription>
            You’ve earned this reward by completing an achievement. View the
            details below.
          </DialogDescription>
        </DialogHeader>

        {claimSuccess && (
          <Alert className="bg-green-50 border-green-200 mb-4">
            <Check className="h-4 w-4 text-green-600" />
            <AlertTitle>Reward Claimed!</AlertTitle>
            <AlertDescription>
              Your reward has been added to your inventory. Check your items
              page!
            </AlertDescription>
          </Alert>
        )}

        {selectedReward && (
          <div className="space-y-6">
            {/* Reward Icon and Name */}
            <div className="text-center">
              <div className="text-6xl mb-4">
                {getFeedbackRewardIcon(selectedReward.type)}
              </div>
              <h2 className="text-2xl font-bold">{selectedReward.name}</h2>
            </div>

            {/* Reward Description */}
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-center">
                {selectedReward.description}
              </p>
            </div>

            {/* Reward Details */}
            <div className="space-y-3 border-t pt-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Reward Type:
                </span>
                <span className="text-sm font-medium capitalize">
                  {selectedReward.type.replace("-", " ")}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Value:</span>
                <span className="text-sm font-medium">
                  {selectedReward.value}
                </span>
              </div>
              {selectedReward.expiresAt && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Expires:
                  </span>
                  <span className="text-sm font-medium">
                    {new Date(selectedReward.expiresAt).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>

            {/* Status Message */}
            {selectedReward.claimed ? (
              <Alert className="bg-green-50 border-green-200">
                <Check className="h-4 w-4 text-green-600" />
                <AlertTitle>Reward Claimed</AlertTitle>
                <AlertDescription>
                  You claimed this reward on{" "}
                  {selectedReward.claimedAt &&
                    new Date(selectedReward.claimedAt).toLocaleDateString()}
                  . Check your inventory to view your reward!
                </AlertDescription>
              </Alert>
            ) : (
              <Alert className="bg-blue-50 border-blue-200">
                <Gift className="h-4 w-4 text-blue-600" />
                <AlertTitle>Ready to Redeem</AlertTitle>
                <AlertDescription>
                  This reward is waiting for you to claim. Click the button
                  below to add it to your inventory!
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={() => setSelectedReward(null)}>
            <X className="w-4 h-4" />
            Close
          </Button>
          {selectedReward && !selectedReward.claimed ? (
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={handleClaimReward}
            >
              <Gift className="h-4 w-4" />
              Claim Reward
            </Button>
          ) : (
            <Button disabled className="bg-gray-300">
              <Check className="h-4 w-4" />
              Already Claimed
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RewardDetailDialog;
