import { FORMATIONS } from "@/constants/formations";

export const getFormationPositions = (formation: string) => {
  const formationObj = FORMATIONS.find((f) => f.name === formation);
  return formationObj;
};
