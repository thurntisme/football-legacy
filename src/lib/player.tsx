import { AlertTriangle, ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { PlayerEditionEnum } from "@/constants/player";
import { PlayerForm, PlayerStatus } from "@/types/player";

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

export const getEditionBadge = (edition: PlayerEditionEnum) => {
  switch (edition) {
    case PlayerEditionEnum.LEGEND:
      return <Badge className="bg-red-500">Legend</Badge>;
    case PlayerEditionEnum.CLASSIC_70S:
      return <Badge className="bg-emerald-400">70s</Badge>;
    case PlayerEditionEnum.CLASSIC_80S:
      return <Badge className="bg-amber-400">80s</Badge>;
    case PlayerEditionEnum.CLASSIC_90S:
      return <Badge className="bg-red-400">90s</Badge>;
    case PlayerEditionEnum.CLASSIC_2000S:
      return <Badge className="bg-blue-400">2000s</Badge>;
    case PlayerEditionEnum.CLASSIC_2010S:
      return <Badge className="bg-purple-400">2010s</Badge>;
    case PlayerEditionEnum.MODERN:
      return <Badge className="bg-green-400">Modern</Badge>;
    case PlayerEditionEnum.FUTURE_STAR:
      return <Badge className="bg-yellow-400">Future Star</Badge>;
    case PlayerEditionEnum.WORLD_CUP:
      return <Badge className="bg-blue-400">World Cup</Badge>;
    case PlayerEditionEnum.EURO:
      return <Badge className="bg-green-400">Euro</Badge>;
    default:
      return null;
  }
};

export const getStatusBadge = (status: PlayerStatus) => {
  if (!status) return null;
  switch (status.type) {
    case "injured":
      return (
        <Badge variant="destructive" className="flex items-center gap-1">
          <AlertTriangle className="h-3 w-3" /> Injured: {status.details} (
          {status.until})
        </Badge>
      );
    case "unhappy":
      return (
        <Badge variant="secondary" className="flex items-center gap-1">
          Unhappy: {status.details}
        </Badge>
      );
    case "transfer":
      return (
        <Badge variant="secondary" className="flex items-center gap-1">
          <ArrowUpRight className="h-3 w-3" /> Transfer Listed: {status.details}
        </Badge>
      );
    case "suspended":
      return (
        <Badge variant="destructive" className="flex items-center gap-1">
          Suspended: {status.details} ({status.until})
        </Badge>
      );
    case "fit":
      return (
        <Badge
          variant="outline"
          className="bg-green-50 text-green-700 border-green-200"
        >
          Fit to Play
        </Badge>
      );
    default:
      return null;
  }
};
