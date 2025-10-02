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
