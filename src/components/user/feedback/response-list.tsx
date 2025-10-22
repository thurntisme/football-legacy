import React from "react";

import { Eye, Gift, MessageSquare, Trash2 } from "lucide-react";

import ConfirmDialog from "@/components/common/confirm-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getTicketStatusColor } from "@/lib/user";
import { FeedbackResponse } from "@/types/user";

type Props = {
  responses: FeedbackResponse[];
  setSelectedReward: (reward: FeedbackResponse["reward"]) => void;
  setSelectedResponse: (response: FeedbackResponse) => void;
  handleDeleteResponse: (id: string) => void;
};

const ResponseList = ({
  responses,
  setSelectedReward,
  setSelectedResponse,
  handleDeleteResponse,
}: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Developer Responses</CardTitle>
        <CardDescription>
          View responses to your previous feedback submissions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {responses.length === 0 ? (
          <div className="text-center py-8">
            <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
            <h3 className="mt-4 text-lg font-medium">No responses yet</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              When our team responds to your feedback, you'll see their messages
              here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {responses.map((response: FeedbackResponse) => (
              <div
                key={response.id}
                className="border rounded-lg p-4 hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <h3 className="font-medium">{response.feedbackType}</h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${getTicketStatusColor(
                          response.status,
                        )}`}
                      >
                        {response.status}
                      </span>
                      {response.reward && (
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1 ${
                            response.reward.claimed
                              ? "bg-green-100 text-green-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          <Gift className="h-3 w-3" />
                          {response.reward.claimed ? "Claimed" : "Reward"}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {response.category}
                    </p>
                    <p className="text-sm line-clamp-2">
                      {response.feedbackText}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs text-muted-foreground">
                        Submitted:{" "}
                        {new Date(response.submittedDate).toLocaleDateString()}
                      </span>
                      {response.respondedDate && (
                        <span className="text-xs text-muted-foreground">
                          Responded:{" "}
                          {new Date(
                            response.respondedDate,
                          ).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 justify-end flex-wrap">
                  {response.reward && (
                    <Button
                      variant="outline"
                      size="sm"
                      className={`${
                        response.reward.claimed
                          ? "bg-green-50 hover:bg-green-100 text-green-900 border-green-200"
                          : "bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-200"
                      }`}
                      onClick={() => setSelectedReward(response.reward)}
                    >
                      <Gift className="h-4 w-4" />
                      {response.reward.claimed ? "View Reward" : "View Reward"}
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedResponse(response)}
                  >
                    <Eye className="h-4 w-4" />
                    View Detail
                  </Button>
                  <ConfirmDialog
                    title="Confirm Delete Feedback"
                    description="This action will permanently remove the feedback."
                    onConfirm={() => handleDeleteResponse(response.id)}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </ConfirmDialog>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResponseList;
