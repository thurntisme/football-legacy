import { Badge } from "@/components/ui/badge";
import { PlayerForm } from "@/types/player";

export const getFormColor = (form: PlayerForm) => {
  switch (form) {
    case PlayerForm.EXCELLENT:
      return "bg-green-500";
    case PlayerForm.GOOD:
      return "bg-emerald-400";
    case PlayerForm.AVERAGE:
      return "bg-amber-400";
    case PlayerForm.POOR:
      return "bg-red-400";
    default:
      return "bg-gray-400";
  }
};

export const getFormBadge = (form: string) => {
  switch (form) {
    case "excellent":
      return <Badge className="bg-green-500">Excellent</Badge>;
    case "good":
      return <Badge className="bg-emerald-400">Good</Badge>;
    case "average":
      return <Badge className="bg-amber-400">Average</Badge>;
    case "poor":
      return <Badge className="bg-red-400">Poor</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

export const getFitnessColor = (fitness: number) => {
  if (fitness >= 90) return "text-green-500";
  if (fitness >= 75) return "text-emerald-400";
  if (fitness >= 60) return "text-amber-400";
  return "text-red-500";
};

export const getAttributeColor = (value: number | undefined) => {
  if (value === undefined) return "bg-gray-300";
  if (value >= 90) return "bg-red-500";
  if (value >= 75) return "bg-emerald-400";
  if (value >= 60) return "bg-amber-400";
  return "bg-gray-300";
};

export const getPositionBonus = (position: string) => {
  switch (position) {
    case "GK":
      return {
        pace: -10,
        shooting: -20,
        passing: -5,
        dribbling: -15,
        defending: 15,
        physical: 5,
        vision: 0,
        positioning: 15,
        ballControl: -10,
        longShots: -15,
      };
    case "CB":
      return {
        pace: 0,
        shooting: -10,
        passing: 0,
        dribbling: -5,
        defending: 20,
        physical: 15,
        vision: 0,
        positioning: 10,
        ballControl: 0,
        longShots: -5,
      };
    case "LB":
    case "RB":
    case "LWB":
    case "RWB":
      return {
        pace: 10,
        shooting: -5,
        passing: 5,
        dribbling: 5,
        defending: 10,
        physical: 5,
        vision: 5,
        positioning: 5,
        ballControl: 5,
        longShots: 0,
      };
    case "CDM":
      return {
        pace: 0,
        shooting: -5,
        passing: 10,
        dribbling: 5,
        defending: 15,
        physical: 10,
        vision: 10,
        positioning: 10,
        ballControl: 5,
        longShots: 0,
      };
    case "CM":
      return {
        pace: 0,
        shooting: 0,
        passing: 15,
        dribbling: 10,
        defending: 5,
        physical: 5,
        vision: 15,
        positioning: 5,
        ballControl: 10,
        longShots: 5,
      };
    case "CAM":
      return {
        pace: 5,
        shooting: 10,
        passing: 15,
        dribbling: 15,
        defending: -5,
        physical: 0,
        vision: 15,
        positioning: 10,
        ballControl: 15,
        longShots: 10,
      };
    case "LM":
    case "RM":
      return {
        pace: 15,
        shooting: 5,
        passing: 10,
        dribbling: 10,
        defending: 0,
        physical: 5,
        vision: 10,
        positioning: 5,
        ballControl: 10,
        longShots: 5,
      };
    case "LW":
    case "RW":
      return {
        pace: 15,
        shooting: 10,
        passing: 5,
        dribbling: 15,
        defending: -10,
        physical: 0,
        vision: 10,
        positioning: 10,
        ballControl: 15,
        longShots: 10,
      };
    case "ST":
    case "CF":
      return {
        pace: 10,
        shooting: 20,
        passing: 0,
        dribbling: 10,
        defending: -15,
        physical: 10,
        vision: 5,
        positioning: 15,
        ballControl: 10,
        longShots: 10,
      };
    default:
      return {
        pace: 0,
        shooting: 0,
        passing: 0,
        dribbling: 0,
        defending: 0,
        physical: 0,
        vision: 0,
        positioning: 0,
        ballControl: 0,
        longShots: 0,
      };
  }
};
