import React from "react";

import { AlertTriangle, Loader2, Sparkles, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getSignChanceBadge } from "@/lib/youth-academy";

type Props = {
  selectedResult: any;
  showApproachDialog: boolean;
  isApproaching: boolean;
  approachResult: any;
  setShowApproachDialog: (value: boolean) => void;
  attemptApproach: () => void;
  completeSigningPlayer: () => void;
};

const ApproachPlayerDialog = ({
  selectedResult,
  showApproachDialog,
  approachResult,
  isApproaching,
  setShowApproachDialog,
  completeSigningPlayer,
  attemptApproach,
}: Props) => {
  return (
    <Dialog open={showApproachDialog} onOpenChange={setShowApproachDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {selectedResult?.status === "approached"
              ? "Complete Signing"
              : "Approach Player"}
          </DialogTitle>
          <DialogDescription>
            {selectedResult?.status === "approached"
              ? `Complete the signing of ${selectedResult?.playerName} from ${selectedResult?.club}`
              : `Approach ${selectedResult?.playerName} from ${selectedResult?.club}`}
          </DialogDescription>
        </DialogHeader>

        {selectedResult && (
          <div className="py-4">
            {selectedResult.status === "approached" ? (
              <div className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-md text-center">
                  <Sparkles className="h-8 w-8 mx-auto text-green-600 mb-2" />
                  <h3 className="font-bold text-lg text-green-800">
                    Approach Successful
                  </h3>
                  <p className="text-green-700">
                    {selectedResult.club} has accepted your approach for{" "}
                    {selectedResult.playerName}. You can now complete the
                    signing.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Player:
                    </span>
                    <span className="font-medium">
                      {selectedResult.playerName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Position:
                    </span>
                    <span className="font-medium">
                      {selectedResult.position}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Age:</span>
                    <span className="font-medium">
                      {selectedResult.age} years
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Club:</span>
                    <span className="font-medium">{selectedResult.club}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Signing Cost:
                    </span>
                    <span className="font-medium">
                      £{selectedResult.signCost.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="p-4 border rounded-md">
                  <h4 className="font-medium mb-2">Contract Details</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Youth contract for 3 years</li>
                    <li>• Training compensation to {selectedResult.club}</li>
                    <li>• Player will join your youth academy immediately</li>
                    <li>• No agent fees required for youth signings</li>
                  </ul>
                </div>
              </div>
            ) : approachResult === "success" ? (
              <div className="p-4 bg-green-50 border border-green-200 rounded-md text-center">
                <Sparkles className="h-8 w-8 mx-auto text-green-600 mb-2" />
                <h3 className="font-bold text-lg text-green-800">
                  Approach Successful!
                </h3>
                <p className="text-green-700">
                  {selectedResult.club} has accepted your approach for{" "}
                  {selectedResult.playerName}. You can now complete the signing.
                </p>
              </div>
            ) : approachResult === "failure" ? (
              <div className="p-4 bg-red-50 border border-red-200 rounded-md text-center">
                <AlertTriangle className="h-8 w-8 mx-auto text-red-600 mb-2" />
                <h3 className="font-bold text-lg text-red-800">
                  Approach Rejected
                </h3>
                <p className="text-red-700">
                  {selectedResult.club} has rejected your approach for{" "}
                  {selectedResult.playerName}. They are not interested in
                  selling the player at this time.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 border rounded-md">
                  <h4 className="font-medium mb-2">Player Information</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Player:
                      </span>
                      <span className="font-medium">
                        {selectedResult.playerName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Position:
                      </span>
                      <span className="font-medium">
                        {selectedResult.position}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Age:
                      </span>
                      <span className="font-medium">
                        {selectedResult.age} years
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Club:
                      </span>
                      <span className="font-medium">{selectedResult.club}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Potential:
                      </span>
                      <div className="flex">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < Math.round(selectedResult.potential / 20) ? "fill-amber-400 text-amber-400" : "text-muted"}`}
                            />
                          ))}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Sign Cost:
                      </span>
                      <span className="font-medium">
                        £{selectedResult.signCost.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Sign Chance:
                      </span>
                      <span>
                        {getSignChanceBadge(selectedResult.signChance)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-amber-50 border border-amber-200 rounded-md">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-amber-600 mr-2 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-amber-800 mb-1">
                        Approach Information
                      </h4>
                      <p className="text-sm text-amber-700">
                        Approaching a player will cost £
                        {Math.round(
                          selectedResult.signCost * 0.1,
                        ).toLocaleString()}{" "}
                        in agent fees. The success chance is based on the
                        player's club willingness to sell and your club's
                        reputation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <DialogFooter>
          {selectedResult?.status === "approached" ? (
            <>
              <Button
                variant="outline"
                onClick={() => setShowApproachDialog(false)}
              >
                Cancel
              </Button>
              <Button onClick={completeSigningPlayer}>
                Complete Signing (£{selectedResult.signCost.toLocaleString()})
              </Button>
            </>
          ) : approachResult !== null ? (
            <Button onClick={() => setShowApproachDialog(false)}>Close</Button>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={() => setShowApproachDialog(false)}
              >
                Cancel
              </Button>
              {isApproaching ? (
                <Button disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Approaching...
                </Button>
              ) : (
                <Button onClick={attemptApproach}>Approach Player</Button>
              )}
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApproachPlayerDialog;
