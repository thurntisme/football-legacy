import { Player } from "./player";

export type Position = {
  id: string;
  x: number;
  y: number;
  player: Player | null;
};

export type Formation = {
  name: string;
  positions: Position[];
};

export type LineupFormation = {
  name: string;
  positions: string[];
};
