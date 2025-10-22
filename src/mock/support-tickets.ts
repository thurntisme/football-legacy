import { SupportTicket, TicketStatusEnum } from "@/types/user";

export const allTickets: SupportTicket[] = [
  {
    id: "12345",
    title: "Transfer Market Issue",
    description: "Unable to complete player transfer due to an error",
    status: TicketStatusEnum.IN_PROGRESS,
    openedDate: "2 days ago",
    messages: [
      {
        id: "1",
        author: "You",
        content:
          "I'm unable to complete a player transfer. The system keeps showing an error message.",
        timestamp: "2024-10-15 10:30 AM",
        isAdmin: false,
      },
      {
        id: "2",
        author: "Support Team",
        content:
          "Thank you for reporting this issue. We're investigating the problem. Can you provide the player ID and the error message you received?",
        timestamp: "2024-10-15 2:45 PM",
        isAdmin: true,
      },
      {
        id: "3",
        author: "You",
        content:
          "Player ID is #5678. The error says 'Transaction Failed - Please Try Again'",
        timestamp: "2024-10-15 3:10 PM",
        isAdmin: false,
      },
    ],
  },
  {
    id: "12289",
    title: "Payment Not Processed",
    description: "Pro subscription payment was charged but not activated",
    status: TicketStatusEnum.RESOLVED,
    openedDate: "1 week ago",
    messages: [
      {
        id: "1",
        author: "You",
        content:
          "I was charged for the Pro subscription but didn't receive the benefits.",
        timestamp: "2024-10-08 9:15 AM",
        isAdmin: false,
      },
      {
        id: "2",
        author: "Support Team",
        content:
          "We apologize for the inconvenience. We've manually activated your Pro subscription and refunded the duplicate charge.",
        timestamp: "2024-10-08 11:00 AM",
        isAdmin: true,
      },
    ],
  },
  {
    id: "12401",
    title: "Match Simulation Bug",
    description: "Game crashes during match simulation in certain scenarios",
    status: TicketStatusEnum.URGENT,
    openedDate: "1 day ago",
    messages: [
      {
        id: "1",
        author: "You",
        content:
          "The game crashes every time I try to simulate a match with my current formation.",
        timestamp: "2024-10-16 5:20 PM",
        isAdmin: false,
      },
      {
        id: "2",
        author: "Support Team",
        content:
          "This is a critical issue. We're prioritizing this for our development team. Can you share your team formation details?",
        timestamp: "2024-10-16 6:00 PM",
        isAdmin: true,
      },
    ],
  },
  {
    id: "12402",
    title: "Player Stats Not Updating",
    description: "Player statistics are not updating after matches",
    status: TicketStatusEnum.IN_PROGRESS,
    openedDate: "3 days ago",
    messages: [
      {
        id: "1",
        author: "You",
        content: "My player stats haven't updated after the last 3 matches.",
        timestamp: "2024-10-13 2:00 PM",
        isAdmin: false,
      },
    ],
  },
  {
    id: "12403",
    title: "Coins Balance Error",
    description: "Coins balance showing incorrect amount",
    status: TicketStatusEnum.RESOLVED,
    openedDate: "5 days ago",
    messages: [
      {
        id: "1",
        author: "You",
        content: "My coins balance is showing 5000 less than what I purchased.",
        timestamp: "2024-10-11 11:30 AM",
        isAdmin: false,
      },
      {
        id: "2",
        author: "Support Team",
        content:
          "We've corrected your coin balance. You should see the update immediately.",
        timestamp: "2024-10-11 1:15 PM",
        isAdmin: true,
      },
    ],
  },
  {
    id: "12404",
    title: "Login Issues",
    description: "Unable to login to account",
    status: TicketStatusEnum.RESOLVED,
    openedDate: "1 week ago",
    messages: [
      {
        id: "1",
        author: "You",
        content:
          "I keep getting an invalid password error even though my password is correct.",
        timestamp: "2024-10-09 8:00 AM",
        isAdmin: false,
      },
      {
        id: "2",
        author: "Support Team",
        content:
          "Please try resetting your password. Check your email for the reset link.",
        timestamp: "2024-10-09 9:30 AM",
        isAdmin: true,
      },
    ],
  },
];
