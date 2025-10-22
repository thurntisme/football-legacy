"use client";

import React, { useState } from "react";

import { FeedbackResponses } from "@/mock/feedback-responses";
import { FeedbackResponse, FeedbackReward } from "@/types/user";

import ResponseDetailDialog from "./response-detail-dialog";
import ResponseList from "./response-list";
import RewardDetailDialog from "./reward-detail-dialog";

type Props = {};

const ViewResponses = (props: Props) => {
  const [responses, setResponses] =
    useState<FeedbackResponse[]>(FeedbackResponses);
  const [selectedReward, setSelectedReward] = useState<FeedbackReward | null>(
    null,
  );
  const [selectedResponse, setSelectedResponse] =
    useState<FeedbackResponse | null>(null);

  const handleDeleteResponse = (responseId: string) => {
    console.log("Deleting response with ID:", responseId);
  };

  const handleClaimReward = () => {
    console.log("Claiming reward:");
  };

  return (
    <>
      <ResponseList
        responses={responses}
        setSelectedReward={setSelectedReward}
        setSelectedResponse={setSelectedResponse}
        handleDeleteResponse={handleDeleteResponse}
      />

      <ResponseDetailDialog
        selectedResponse={selectedResponse}
        setSelectedResponse={setSelectedResponse}
        handleDeleteResponse={handleDeleteResponse}
      />

      <RewardDetailDialog
        handleClaimReward={handleClaimReward}
        selectedReward={selectedReward}
        setSelectedReward={setSelectedReward}
      />
    </>
  );
};

export default ViewResponses;
