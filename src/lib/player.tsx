import {
  AlertCircle,
  AlertTriangle,
  ArrowBigUpDash,
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  CheckCircle,
  Cross,
  CrossIcon,
  Hospital,
  OctagonAlert,
  OctagonX,
  ShieldX,
  XCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { POSITION_COLORS, PlayerPosition } from "@/constants/formations";
import { PlayerEditionEnum, expThresholds } from "@/constants/player";
import { Player, PlayerForm, PlayerMorale, PlayerStatus } from "@/types/player";

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

export const getMoraleBadge = (morale: PlayerMorale | undefined) => {
  switch (morale) {
    case PlayerMorale.HIGH:
      return (
        <Badge className="w-4 h-4 bg-green-500 rounded-sm p-0 flex align-middle justify-center">
          <ArrowUp className="w-3.5 h-3.5 text-white" />
        </Badge>
      );
    case PlayerMorale.NORMAL:
      return (
        <Badge className="w-4 h-4 bg-blue-500 rounded-sm p-0 flex align-middle justify-center">
          <ArrowRight className="w-3.5 h-3.5 text-white" />
        </Badge>
      );
    default:
      return (
        <Badge className="w-4 h-4 bg-gray-500 rounded-sm p-0 flex align-middle justify-center">
          <ArrowDown className="w-3.5 h-3.5 text-white" />
        </Badge>
      );
  }
};

export const getFitnessColorCode = (fitness: number) => {
  if (fitness >= 90) return "green-500";
  if (fitness >= 75) return "emerald-400";
  if (fitness >= 60) return "amber-400";
  return "red-500";
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
    case PlayerEditionEnum.CLASSIC_2020S:
      return <Badge className="bg-emerald-400">2020s</Badge>;
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

export const getRatingColor = (rating: number) => {
  if (rating >= 90) return "bg-purple";
  if (rating >= 80) return "bg-red";
  if (rating >= 70) return "bg-amber";
  return "bg-emerald";
};

export const getPositionColor = (position: PlayerPosition) => {
  return (
    POSITION_COLORS.find((p) => p.positions.includes(position))?.color ||
    "gray-300"
  );
};

export const getPlayerStatusIcons = (player: Player) => {
  const isLevelUp = checkPlayerLevelUp(player);
  let levelUp = null;
  if (isLevelUp) {
    levelUp = (
      <Badge
        key="level-up"
        className="
    text-white 
    font-semibold 
    flex items-center gap-1 
    bg-gradient-to-b 
    from-yellow-300 
    via-amber-500 
    to-yellow-300
    shadow-md
    p-0
    w-5 h-5
    justify-center
  "
      >
        <ArrowBigUpDash className="h-4 w-4" />
      </Badge>
    );
  }

  const status = player?.status
    ? player.status.map((status) => {
        switch (status.type) {
          case "injured":
            return (
              <Badge
                key={status.type}
                className="gap-1 rounded-full w-5 h-5 bg-red-500 text-white border-none"
                layout="icon"
              >
                <Hospital />
              </Badge>
            );
          case "suspended":
            return (
              <Badge
                key={status.type}
                className="gap-1 rounded-full w-5 h-5 bg-red-500 text-white border-none"
                layout="icon"
              >
                <ShieldX />
              </Badge>
            );
          default:
            return null;
        }
      })
    : null;

  return (
    <>
      {levelUp}
      {status}
    </>
  );
};

const checkPlayerLevelUp = (player: Player) => {
  return !!player?.attributeBonus;
};

const getLevelConfig = (level: number) => {
  return (
    expThresholds.find((r) => level >= r.min && level <= r.max) ??
    expThresholds.at(-1)!
  );
};

export const getExpForNextLevel = (level: number) => {
  return getLevelConfig(level).expPerLevel;
};

export const getAttributeBonusForLevel = (level: number) => {
  return getLevelConfig(level).attributeBonus;
};

export const levelUpIfPossible = (player: Player): Player => {
  let newLevel = player.level || 1;
  let remainingExp = player.exp || 0;
  let attributeBonus = player.attributeBonus || 0;
  let totalBonus = 0;

  while (remainingExp >= getExpForNextLevel(newLevel) && newLevel < 99) {
    remainingExp -= getExpForNextLevel(newLevel);
    newLevel++;

    totalBonus += getAttributeBonusForLevel(newLevel);
  }

  return {
    ...player,
    level: newLevel,
    exp: remainingExp,
    attributeBonus: attributeBonus + totalBonus,
  };
};
