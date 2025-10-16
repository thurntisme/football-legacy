import { StandingZoneEnum, TeamFormEnum } from "@/constants/league";

export type Standing = {
  position: number;
  name: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  form: TeamFormEnum[];
  highlight: boolean;
  zone: StandingZoneEnum;
};
