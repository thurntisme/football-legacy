import {
  CornerUpRight,
  Flag,
  Footprints,
  Megaphone,
  RotateCcw,
  Target,
} from "lucide-react";

import playerData from "@/data/football-player.json";
import { Player, PlayerRole, PlayerRoleEnum } from "@/types/player";

export const players = playerData as Player[];

export const playerRoles: PlayerRole[] = [
  {
    id: PlayerRoleEnum.CAPTION,
    name: "Captain",
    description:
      "Team leader who communicates with the referee and boosts team morale",
    icon: <Megaphone className="h-5 w-5" />,
    assignedPlayerId: null,
  },
  {
    id: PlayerRoleEnum.VICE_CAPTION,
    name: "Vice-Captain",
    description: "Takes over captain duties when the captain is unavailable",
    icon: <Flag className="h-5 w-5" />,
    assignedPlayerId: null,
  },
  {
    id: PlayerRoleEnum.PENALTY_TAKER,
    name: "Penalty Taker",
    description: "Primary player to take penalty kicks",
    icon: <Target className="h-5 w-5" />,
    assignedPlayerId: null,
  },
  {
    id: PlayerRoleEnum.FREE_KICK_TAKER,
    name: "Free Kick Taker",
    description: "Primary player to take direct free kicks",
    icon: <Footprints className="h-5 w-5" />,
    assignedPlayerId: null,
  },
  {
    id: PlayerRoleEnum.LEFT_CORNER_TAKER,
    name: "Corner Taker (Left)",
    description: "Takes corner kicks from the left side",
    icon: <RotateCcw className="h-5 w-5" />,
    assignedPlayerId: null,
  },
  {
    id: PlayerRoleEnum.RIGHT_CORNER_TAKER,
    name: "Corner Taker (Right)",
    description: "Takes corner kicks from the right side",
    icon: <CornerUpRight className="h-5 w-5" />,
    assignedPlayerId: null,
  },
];

export const playerAttributes = [
  {
    key: "physical",
    title: "Physical",
    attributes: [
      { key: "pace", label: "Pace" },
      { key: "acceleration", label: "Acceleration" },
      { key: "agility", label: "Agility" },
      { key: "stamina", label: "Stamina" },
      { key: "strength", label: "Strength" },
      { key: "jumping", label: "Jumping" },
    ],
    maxValue: 660,
  },
  {
    key: "technical",
    title: "Technical",
    attributes: [
      { key: "dribbling", label: "Dribbling" },
      { key: "ball_control", label: "Ball Control" },
      { key: "crossing", label: "Crossing" },
      { key: "shooting", label: "Shooting" },
      { key: "finishing", label: "Finishing" },
      { key: "long_shots", label: "Long Shots" },
      { key: "reactions", label: "Reactions" },
      { key: "heading", label: "Heading" },
      { key: "tackling", label: "Tackling" },
      { key: "defending", label: "Defending" },
      { key: "short_passing", label: "Short Passing" },
      { key: "long_passing", label: "Long Passing" },
      { key: "power_shots", label: "Power Shots" },
      { key: "set_pieces", label: "Set Pieces" },
    ],
    maxValue: 1540,
  },
  {
    key: "mental",
    title: "Mental",
    attributes: [
      { key: "vision", label: "Vision" },
      { key: "positioning", label: "Positioning" },
      { key: "anticipation", label: "Anticipation" },
      { key: "decision_making", label: "Decision Making" },
      { key: "composure", label: "Composure" },
      { key: "concentration", label: "Concentration" },
      { key: "work_rate", label: "Work Rate" },
      { key: "leadership", label: "Leadership" },
      { key: "flair", label: "Flair" },
      { key: "creativity", label: "Creativity" },
    ],
    maxValue: 1100,
  },
  {
    key: "goalkeeping",
    title: "Goalkeeping",
    attributes: [
      { key: "reflexes", label: "Reflexes" },
      { key: "diving", label: "Diving" },
      { key: "handling", label: "Handling" },
      { key: "kicking", label: "Kicking" },
      { key: "positioning_gk", label: "GK Positioning" },
      { key: "one_on_one", label: "One-on-One" },
      { key: "command_of_area", label: "Command of Area" },
    ],
    maxValue: 770,
  },
];

export enum PlayerEditionEnum {
  LEGEND = "legend",
  CLASSIC_70S = "classic_70s",
  CLASSIC_80S = "classic_80s",
  CLASSIC_90S = "classic_90s",
  CLASSIC_2000S = "classic_2000s",
  CLASSIC_2010S = "classic_2010s",
  CLASSIC_2020S = "classic_2020s",
  MODERN = "modern",
  FUTURE_STAR = "future_star",
  WORLD_CUP = "world_cup",
  EURO = "euro",
  CONTINENTAL = "continental",
  ICON = "icon",
  HERO = "hero",
  SPECIAL = "special",
  TEAM_OF_THE_YEAR = "toty",
  TEAM_OF_THE_SEASON = "tots",
}

export const PlayerEditionLabel: Record<PlayerEditionEnum, string> = {
  [PlayerEditionEnum.LEGEND]: "Legend",
  [PlayerEditionEnum.CLASSIC_70S]: "Classic 70s",
  [PlayerEditionEnum.CLASSIC_80S]: "Classic 80s",
  [PlayerEditionEnum.CLASSIC_90S]: "Classic 90s",
  [PlayerEditionEnum.CLASSIC_2000S]: "Classic 2000s",
  [PlayerEditionEnum.CLASSIC_2010S]: "Classic 2010s",
  [PlayerEditionEnum.CLASSIC_2020S]: "Classic 2020s",
  [PlayerEditionEnum.MODERN]: "Modern",
  [PlayerEditionEnum.FUTURE_STAR]: "Future Star",
  [PlayerEditionEnum.WORLD_CUP]: "World Cup",
  [PlayerEditionEnum.EURO]: "Euro",
  [PlayerEditionEnum.CONTINENTAL]: "Continental",
  [PlayerEditionEnum.ICON]: "Icon",
  [PlayerEditionEnum.HERO]: "Hero",
  [PlayerEditionEnum.SPECIAL]: "Special",
  [PlayerEditionEnum.TEAM_OF_THE_YEAR]: "TOTY",
  [PlayerEditionEnum.TEAM_OF_THE_SEASON]: "TOTS",
};

export const expThresholds: {
  min: number;
  max: number;
  expPerLevel: number;
  attributeBonus: number;
}[] = [
    { min: 1, max: 10, expPerLevel: 1000, attributeBonus: 4 },
    { min: 11, max: 20, expPerLevel: 1500, attributeBonus: 3 },
    { min: 21, max: 40, expPerLevel: 2500, attributeBonus: 3 },
    { min: 41, max: 60, expPerLevel: 4000, attributeBonus: 2 },
    { min: 61, max: 80, expPerLevel: 6000, attributeBonus: 1 },
    { min: 81, max: 99, expPerLevel: 9000, attributeBonus: 1 },
  ];
