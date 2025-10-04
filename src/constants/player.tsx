import {
  CornerUpRight,
  Flag,
  Footprints,
  Megaphone,
  RotateCcw,
  Target,
} from "lucide-react";

import playerData from "@/data/football-player.json";
import { Player, PlayerRole } from "@/types/player";

export const players = playerData as Player[];

export const playerRoles: PlayerRole[] = [
  {
    id: "captain",
    name: "Captain",
    description:
      "Team leader who communicates with the referee and boosts team morale",
    icon: <Megaphone className="h-5 w-5" />,
    assignedPlayerId: null,
  },
  {
    id: "vice-captain",
    name: "Vice-Captain",
    description: "Takes over captain duties when the captain is unavailable",
    icon: <Flag className="h-5 w-5" />,
    assignedPlayerId: null,
  },
  {
    id: "penalty-taker",
    name: "Penalty Taker",
    description: "Primary player to take penalty kicks",
    icon: <Target className="h-5 w-5" />,
    assignedPlayerId: null,
  },
  {
    id: "free-kick-taker",
    name: "Free Kick Taker",
    description: "Primary player to take direct free kicks",
    icon: <Footprints className="h-5 w-5" />,
    assignedPlayerId: null,
  },
  {
    id: "corner-taker-right",
    name: "Corner Taker (Right)",
    description: "Takes corner kicks from the right side",
    icon: <CornerUpRight className="h-5 w-5" />,
    assignedPlayerId: null,
  },
  {
    id: "corner-taker-left",
    name: "Corner Taker (Left)",
    description: "Takes corner kicks from the left side",
    icon: <RotateCcw className="h-5 w-5" />,
    assignedPlayerId: null,
  },
];

export const playerAttributes = [
  {
    key: "physical",
    title: "Physical Attributes",
    attributes: [
      { key: "pace", label: "Pace" },
      { key: "acceleration", label: "Acceleration" },
      { key: "agility", label: "Agility" },
      { key: "stamina", label: "Stamina" },
      { key: "strength", label: "Strength" },
      { key: "jumping", label: "Jumping" },
    ],
  },
  {
    key: "technical",
    title: "Technical Attributes",
    attributes: [
      { key: "dribbling", label: "Dribbling" },
      { key: "ballControl", label: "Ball Control" },
      { key: "crossing", label: "Crossing" },
      { key: "shooting", label: "Shooting" },
      { key: "finishing", label: "Finishing" },
      { key: "longShots", label: "Long Shots" },
      { key: "heading", label: "Heading" },
      { key: "tackling", label: "Tackling" },
      { key: "defending", label: "Defending" },
      { key: "shortPassing", label: "Short Passing" },
      { key: "longPassing", label: "Long Passing" },
      { key: "powerShots", label: "Power Shots" },
      { key: "setPieces", label: "Set Pieces" },
    ],
  },
  {
    key: "mental",
    title: "Mental Attributes",
    attributes: [
      { key: "vision", label: "Vision" },
      { key: "positioning", label: "Positioning" },
      { key: "anticipation", label: "Anticipation" },
      { key: "decisionMaking", label: "Decision Making" },
      { key: "composure", label: "Composure" },
      { key: "concentration", label: "Concentration" },
      { key: "workRate", label: "Work Rate" },
      { key: "leadership", label: "Leadership" },
      { key: "flair", label: "Flair" },
      { key: "creativity", label: "Creativity" },
    ],
  },
  {
    key: "goalkeeping",
    title: "Goalkeeping Attributes",
    attributes: [
      { key: "reflexes", label: "Reflexes" },
      { key: "diving", label: "Diving" },
      { key: "handling", label: "Handling" },
      { key: "kicking", label: "Kicking" },
      { key: "positioningGK", label: "GK Positioning" },
      { key: "oneOnOne", label: "One-on-One" },
      { key: "commandOfArea", label: "Command of Area" },
    ],
  },
];
