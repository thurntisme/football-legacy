import { FeedbackResponse } from "@/types/user";

export const FeedbackResponses: FeedbackResponse[] = [
  {
    id: "1",
    feedbackType: "bug",
    category: "Match Engine",
    feedbackText:
      "The player positioning during set pieces seems incorrect. Players are not moving to their designated positions before corner kicks.",
    userEmail: "player@example.com",
    submittedDate: "2024-10-15",
    status: "resolved",
    developerResponse:
      "Thank you for reporting this issue. We've identified the problem with the set piece positioning logic and have released a fix in version 2.1.2. Please update your game and try again. The issue was related to how corner kick formations were being applied to the team tactical setup.",
    respondedDate: "2024-10-18",
    respondedBy: "DevTeam",
    reward: {
      id: "reward_1",
      type: "coins",
      name: "500 Game Coins",
      description:
        "Thank you for helping us improve the game with your bug report!",
      value: 500,
      expiresAt: "2024-12-31",
      claimed: true,
      claimedAt: "2024-10-20",
    },
  },
  {
    id: "2",
    feedbackType: "feature",
    category: "Transfers",
    feedbackText:
      "It would be great to have the ability to propose counter-offers directly when a player rejects a contract offer. This would save time during negotiations.",
    userEmail: "manager@example.com",
    submittedDate: "2024-10-12",
    status: "acknowledged",
    developerResponse:
      "Great suggestion! We're currently working on improving the transfer negotiation system. This feature is on our roadmap for the next major update. We'll keep you posted on the progress.",
    respondedDate: "2024-10-14",
    respondedBy: "ProductTeam",
    reward: {
      id: "reward_2",
      type: "pack",
      name: "Premium Scout Pack",
      description:
        "Excellent feature suggestion! Here's a premium pack to help you scout new talents.",
      value: "1x Premium Scout Pack",
      expiresAt: "2024-11-30",
      claimed: false,
    },
  },
  {
    id: "3",
    feedbackType: "suggestion",
    category: "User Interface",
    feedbackText:
      "The player card UI could benefit from showing real-time form status. It would help managers make better tactical decisions.",
    userEmail: "tactician@example.com",
    submittedDate: "2024-10-10",
    status: "pending",
    developerResponse: "",
  },
  {
    id: "4",
    feedbackType: "bug",
    category: "Youth Academy",
    feedbackText:
      "Youth players sometimes lose their skill progression when loaned out. The stats seem to reset after the loan period ends.",
    userEmail: "youth@example.com",
    submittedDate: "2024-10-08",
    status: "resolved",
    developerResponse:
      "We've fixed this issue in patch 2.1.1. The problem was that skill progression wasn't being synced properly when players returned from loans. Please update your game and the issue should be resolved.",
    respondedDate: "2024-10-11",
    respondedBy: "DevTeam",
    reward: {
      id: "reward_4",
      type: "player-card",
      name: "Gold Player Card - ST",
      description: "Appreciated for discovering and reporting this bug!",
      value: "1x Gold Striker Card",
      expiresAt: "2024-12-15",
      claimed: false,
    },
  },
  {
    id: "5",
    feedbackType: "feature",
    category: "Gameplay",
    feedbackText:
      "Add weather effects to matches that impact player performance and ball physics. Rain should slow down the game tempo.",
    userEmail: "gamer@example.com",
    submittedDate: "2024-10-05",
    status: "acknowledged",
    developerResponse:
      "Excellent idea! Dynamic weather effects are something we're exploring for future updates. This would add great depth to the match simulation. We'll take this into consideration for the roadmap.",
    respondedDate: "2024-10-06",
    respondedBy: "ProductTeam",
    reward: {
      id: "reward_5",
      type: "premium-pass",
      name: "7-Day Premium Pass",
      description:
        "Great creative idea! Enjoy premium features on us for a week.",
      value: "7 Days",
      expiresAt: "2024-10-27",
      claimed: false,
    },
  },
];
