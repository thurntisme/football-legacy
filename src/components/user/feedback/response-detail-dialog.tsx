"use client";

import React from "react";

import { Trash2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getFeedbackRewardIcon, getTicketStatusColor } from "@/lib/user";
import { FeedbackResponse } from "@/types/user";

type Props = {
  selectedResponse: FeedbackResponse | null;
  setSelectedResponse: React.Dispatch<
    React.SetStateAction<FeedbackResponse | null>
  >;
  handleDeleteResponse: (id: string) => void;
};

const ResponseDetailDialog = ({
  selectedResponse,
  setSelectedResponse,
  handleDeleteResponse,
}: Props) => {
  return (
    <Dialog
      open={!!selectedResponse}
      onOpenChange={(open) => !open && setSelectedResponse(null)}
    >
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle>{selectedResponse?.feedbackType}</DialogTitle>
              <DialogDescription>
                {selectedResponse?.category}
              </DialogDescription>
            </div>
            <button
              onClick={() => setSelectedResponse(null)}
              className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </DialogHeader>

        {selectedResponse && (
          <div className="space-y-6">
            {/* Your Feedback */}
            <div>
              <h3 className="font-semibold mb-2">Your Feedback</h3>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm">{selectedResponse.feedbackText}</p>
                <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                  <span>{selectedResponse.userEmail}</span>
                  <span>
                    {new Date(
                      selectedResponse.submittedDate,
                    ).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Status */}
            <div>
              <h3 className="font-semibold mb-2">Status</h3>
              <div
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium capitalize ${getTicketStatusColor(
                  selectedResponse.status,
                )}`}
              >
                {selectedResponse.status}
              </div>
            </div>

            {/* Developer Response */}
            {selectedResponse.developerResponse && (
              <div>
                <h3 className="font-semibold mb-2">Developer Response</h3>
                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-sm mb-3">
                    {selectedResponse.developerResponse}
                  </p>
                  {selectedResponse.respondedDate && (
                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-blue-200 dark:border-blue-800">
                      <span>Responded by: {selectedResponse.respondedBy}</span>
                      <span>
                        {new Date(
                          selectedResponse.respondedDate,
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {!selectedResponse.developerResponse &&
              selectedResponse.status === "pending" && (
                <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    Our team is reviewing your feedback. We'll respond soon!
                  </p>
                </div>
              )}

            {/* Reward Info */}
            {selectedResponse.reward && (
              <div>
                <h3 className="font-semibold mb-2">🎁 Reward</h3>
                <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">
                      {getFeedbackRewardIcon(selectedResponse.reward.type)}
                    </span>
                    <div className="flex-1">
                      <p className="font-medium text-sm">
                        {selectedResponse.reward.name}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {selectedResponse.reward.description}
                      </p>
                      <p className="text-xs text-amber-700 dark:text-amber-300 mt-2">
                        Reward Value: {selectedResponse.reward.value}
                      </p>
                      {selectedResponse.reward.expiresAt && (
                        <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                          Expires:{" "}
                          {new Date(
                            selectedResponse.reward.expiresAt,
                          ).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <DialogFooter>
          <Button
            variant="destructive"
            onClick={() => {
              if (selectedResponse) {
                handleDeleteResponse(selectedResponse.id);
              }
            }}
          >
            <Trash2 className="h-4 w-4" />
            Delete Response
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResponseDetailDialog;
