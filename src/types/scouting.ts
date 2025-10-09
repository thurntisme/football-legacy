export enum ScoutingStatusEnum {
  PENDING = "pending",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
  NEGOTIATING = "negotiating",
}

export type IScoutingRequest = {
  id: number;
  teamName: string;
  teamLogo: string;
  playerName: string;
  playerPosition: string;
  offerAmount: number;
  status: ScoutingStatusEnum;
  expiresIn: string;
};
