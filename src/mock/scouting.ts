import { IScoutingRequest, ScoutingStatusEnum } from "@/types/scouting";

export const incomingLists: IScoutingRequest[] = [
  {
    id: 1,
    teamName: "Manchester City",
    teamLogo: "/placeholder.svg?height=40&width=40",
    playerName: "Chris Johnson",
    playerPosition: "LW",
    offerAmount: 28000000,
    status: ScoutingStatusEnum.PENDING,
    expiresIn: "2 days",
  },
  {
    id: 2,
    teamName: "Liverpool FC",
    teamLogo: "/placeholder.svg?height=40&width=40",
    playerName: "Mark Williams",
    playerPosition: "ST",
    offerAmount: 35000000,
    status: ScoutingStatusEnum.NEGOTIATING,
    expiresIn: "1 day",
  },
  {
    id: 3,
    teamName: "Arsenal",
    teamLogo: "/placeholder.svg?height=40&width=40",
    playerName: "Daniel Martinez",
    playerPosition: "CM",
    offerAmount: 22000000,
    status: ScoutingStatusEnum.REJECTED,
    expiresIn: "Expired",
  },
];

export const outgoingLists: IScoutingRequest[] = [
  {
    id: 101,
    teamName: "Bayern Munich",
    teamLogo: "/placeholder.svg?height=40&width=40",
    playerName: "Thomas Müller",
    playerPosition: "CAM",
    offerAmount: 40000000,
    status: ScoutingStatusEnum.PENDING,
    expiresIn: "3 days",
  },
  {
    id: 102,
    teamName: "Real Madrid",
    teamLogo: "/placeholder.svg?height=40&width=40",
    playerName: "Carlos Vega",
    playerPosition: "RW",
    offerAmount: 32000000,
    status: ScoutingStatusEnum.NEGOTIATING,
    expiresIn: "2 days",
  },
  {
    id: 103,
    teamName: "Manchester United",
    teamLogo: "/placeholder.svg?height=40&width=40",
    playerName: "David Smith",
    playerPosition: "CB",
    offerAmount: 25000000,
    status: ScoutingStatusEnum.ACCEPTED,
    expiresIn: "Expired",
  },
];
