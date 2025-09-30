import { Formation, LineupFormation } from "@/types/formation";

export const POSITIONS = [
  "GK",
  "CB",
  "LB",
  "RB",
  "CDM",
  "CM",
  "CAM",
  "LW",
  "RW",
  "ST",
  "CF",
];

export enum PlayerPosition {
  // 🧤 Goalkeeper
  GK = "GK",

  // 🧱 Defenders
  CB = "CB",
  LCB = "LCB",
  RCB = "RCB",
  LB = "LB",
  RB = "RB",
  LWB = "LWB",
  RWB = "RWB",

  // 🧱 Defensive Midfielders
  CDM = "CDM",
  LCDM = "LCDM",
  RCDM = "RCDM",

  // ⚙️ Central Midfielders
  CM = "CM",
  LCM = "LCM",
  RCM = "RCM",

  // 🎯 Attacking Midfielders
  CAM = "CAM",
  LCAM = "LCAM",
  RCAM = "RCAM",

  // 🪶 Wide Midfielders / Wingers
  LM = "LM",
  RM = "RM",
  LW = "LW",
  RW = "RW",

  // 🎯 Forwards
  LT = "LT",
  ST = "ST",
  RT = "RT",
  CF = "CF",
  SS = "SS",
}

export const PlayerPositionLabel: Record<PlayerPosition, string> = {
  // 🧤 Goalkeeper
  [PlayerPosition.GK]: "Goalkeeper",

  // 🧱 Defenders
  [PlayerPosition.CB]: "Center Back",
  [PlayerPosition.LCB]: "Left Center Back",
  [PlayerPosition.RCB]: "Right Center Back",
  [PlayerPosition.LB]: "Left Back",
  [PlayerPosition.RB]: "Right Back",
  [PlayerPosition.LWB]: "Left Wing Back",
  [PlayerPosition.RWB]: "Right Wing Back",

  // 🧱 Defensive Midfielders
  [PlayerPosition.CDM]: "Central Defensive Midfielder",
  [PlayerPosition.LCDM]: "Left Defensive Midfielder",
  [PlayerPosition.RCDM]: "Right Defensive Midfielder",

  // ⚙️ Central Midfielders
  [PlayerPosition.CM]: "Central Midfielder",
  [PlayerPosition.LCM]: "Left Central Midfielder",
  [PlayerPosition.RCM]: "Right Central Midfielder",

  // 🎯 Attacking Midfielders
  [PlayerPosition.CAM]: "Central Attacking Midfielder",
  [PlayerPosition.LCAM]: "Left Attacking Midfielder",
  [PlayerPosition.RCAM]: "Right Attacking Midfielder",

  // 🪶 Wide Midfielders / Wingers
  [PlayerPosition.LM]: "Left Midfielder",
  [PlayerPosition.RM]: "Right Midfielder",
  [PlayerPosition.LW]: "Left Winger",
  [PlayerPosition.RW]: "Right Winger",

  // 🎯 Forwards
  [PlayerPosition.LT]: "Left Tackle",
  [PlayerPosition.ST]: "Striker",
  [PlayerPosition.RT]: "Right Tackle",
  [PlayerPosition.CF]: "Center Forward",
  [PlayerPosition.SS]: "Second Striker",
};

// Default formations
export const lineupFormations: LineupFormation[] = [
  {
    name: "4-4-2",
    positions: [
      "GK",
      "LB",
      "CB",
      "CB",
      "RB",
      "LM",
      "CM",
      "CM",
      "RM",
      "ST",
      "ST",
    ],
  },
  {
    name: "4-3-3",
    positions: [
      "GK",
      "LB",
      "CB",
      "CB",
      "RB",
      "CDM",
      "CM",
      "CM",
      "LW",
      "ST",
      "RW",
    ],
  },
  {
    name: "4-2-3-1",
    positions: [
      "GK",
      "LB",
      "CB",
      "CB",
      "RB",
      "CDM",
      "CDM",
      "CAM",
      "LW",
      "ST",
      "RW",
    ],
  },
  {
    name: "3-5-2",
    positions: [
      "GK",
      "CB",
      "CB",
      "CB",
      "LWB",
      "CM",
      "CM",
      "CM",
      "RWB",
      "ST",
      "ST",
    ],
  },
  {
    name: "5-3-2",
    positions: [
      "GK",
      "LWB",
      "CB",
      "CB",
      "CB",
      "RWB",
      "CM",
      "CM",
      "CM",
      "ST",
      "ST",
    ],
  },
];

// Position compatibility mapping
export const positionCompatibility: Record<string, string[]> = {
  GK: ["GK"],
  CB: ["CB", "RCB", "LCB"],
  LB: ["LB", "LWB", "LCB"],
  RB: ["RB", "RWB", "RCB"],
  LWB: ["LWB", "LB", "LM"],
  RWB: ["RWB", "RB", "RM"],
  CDM: ["CDM", "CM", "CB"],
  CM: ["CM", "CDM", "CAM"],
  CAM: ["CAM", "CM", "ST"],
  LM: ["LM", "LW", "LWB"],
  RM: ["RM", "RW", "RWB"],
  LW: ["LW", "LM", "ST"],
  RW: ["RW", "RM", "ST"],
  ST: ["ST", "CF", "CAM", "LW", "RW"],
  CF: ["CF", "ST", "CAM"],
};

export const formations: { [key: string]: Formation } = {
  "4-4-2": {
    name: "4-4-2",
    positions: [
      { id: "gk", x: 50, y: 90, player: null },
      { id: "lb", x: 20, y: 70, player: null },
      { id: "cb1", x: 35, y: 70, player: null },
      { id: "cb2", x: 65, y: 70, player: null },
      { id: "rb", x: 80, y: 70, player: null },
      { id: "lm", x: 20, y: 50, player: null },
      { id: "cm1", x: 35, y: 50, player: null },
      { id: "cm2", x: 65, y: 50, player: null },
      { id: "rm", x: 80, y: 50, player: null },
      { id: "st1", x: 35, y: 30, player: null },
      { id: "st2", x: 65, y: 30, player: null },
    ],
  },
  "4-3-3": {
    name: "4-3-3",
    positions: [
      { id: "gk", x: 50, y: 90, player: null },
      { id: "lb", x: 20, y: 70, player: null },
      { id: "cb1", x: 35, y: 70, player: null },
      { id: "cb2", x: 65, y: 70, player: null },
      { id: "rb", x: 80, y: 70, player: null },
      { id: "cm1", x: 30, y: 50, player: null },
      { id: "cdm", x: 50, y: 55, player: null },
      { id: "cm2", x: 70, y: 50, player: null },
      { id: "lw", x: 20, y: 30, player: null },
      { id: "st", x: 50, y: 25, player: null },
      { id: "rw", x: 80, y: 30, player: null },
    ],
  },
  "3-5-2": {
    name: "3-5-2",
    positions: [
      { id: "gk", x: 50, y: 90, player: null },
      { id: "cb1", x: 30, y: 70, player: null },
      { id: "cb2", x: 50, y: 70, player: null },
      { id: "cb3", x: 70, y: 70, player: null },
      { id: "lwb", x: 15, y: 55, player: null },
      { id: "cm1", x: 30, y: 50, player: null },
      { id: "cdm", x: 50, y: 50, player: null },
      { id: "cm2", x: 70, y: 50, player: null },
      { id: "rwb", x: 85, y: 55, player: null },
      { id: "st1", x: 35, y: 30, player: null },
      { id: "st2", x: 65, y: 30, player: null },
    ],
  },
  "4-2-3-1": {
    name: "4-2-3-1",
    positions: [
      { id: "gk", x: 50, y: 90, player: null },
      { id: "lb", x: 20, y: 70, player: null },
      { id: "cb1", x: 35, y: 70, player: null },
      { id: "cb2", x: 65, y: 70, player: null },
      { id: "rb", x: 80, y: 70, player: null },
      { id: "cdm1", x: 35, y: 55, player: null },
      { id: "cdm2", x: 65, y: 55, player: null },
      { id: "lam", x: 25, y: 40, player: null },
      { id: "cam", x: 50, y: 35, player: null },
      { id: "ram", x: 75, y: 40, player: null },
      { id: "st", x: 50, y: 20, player: null },
    ],
  },
  // Add other formations here...
};

export const FORMATIONS = [
  {
    name: "4-2-3-1",
    positions: [
      { id: PlayerPosition.GK, x: 50, y: 90 },
      { id: PlayerPosition.LB, x: 20, y: 70 },
      { id: PlayerPosition.LCB, x: 35, y: 70 },
      { id: PlayerPosition.RCB, x: 65, y: 70 },
      { id: PlayerPosition.RB, x: 80, y: 70 },
      { id: PlayerPosition.LCDM, x: 35, y: 55 },
      { id: PlayerPosition.RCDM, x: 65, y: 55 },
      { id: PlayerPosition.LCAM, x: 25, y: 40 },
      { id: PlayerPosition.CAM, x: 50, y: 35 },
      { id: PlayerPosition.RCAM, x: 75, y: 40 },
      { id: PlayerPosition.ST, x: 50, y: 20 },
    ],
  },
  {
    name: "4-3-3",
    positions: [
      { id: PlayerPosition.GK, x: 50, y: 90 },
      { id: PlayerPosition.LB, x: 20, y: 70 },
      { id: PlayerPosition.LCB, x: 35, y: 70 },
      { id: PlayerPosition.RCB, x: 65, y: 70 },
      { id: PlayerPosition.RB, x: 80, y: 70 },
      { id: PlayerPosition.LCM, x: 30, y: 50 },
      { id: PlayerPosition.CDM, x: 50, y: 55 },
      { id: PlayerPosition.RCM, x: 70, y: 50 },
      { id: PlayerPosition.LW, x: 20, y: 30 },
      { id: PlayerPosition.ST, x: 50, y: 25 },
      { id: PlayerPosition.RW, x: 80, y: 30 },
    ],
  },
  {
    name: "4-4-2",
    positions: [
      { id: PlayerPosition.GK, x: 50, y: 90 },
      { id: PlayerPosition.LB, x: 20, y: 70 },
      { id: PlayerPosition.LCB, x: 35, y: 70 },
      { id: PlayerPosition.RCB, x: 65, y: 70 },
      { id: PlayerPosition.RB, x: 80, y: 70 },
      { id: PlayerPosition.LM, x: 20, y: 50 },
      { id: PlayerPosition.LCM, x: 35, y: 50 },
      { id: PlayerPosition.RCM, x: 65, y: 50 },
      { id: PlayerPosition.RM, x: 80, y: 50 },
      { id: PlayerPosition.LT, x: 35, y: 30 },
      { id: PlayerPosition.RT, x: 65, y: 30 },
    ],
  },
  {
    name: "3-5-2",
    positions: [
      { id: PlayerPosition.GK, x: 50, y: 90 },
      { id: PlayerPosition.LCB, x: 30, y: 70 },
      { id: PlayerPosition.CB, x: 50, y: 70 },
      { id: PlayerPosition.RCB, x: 70, y: 70 },
      { id: PlayerPosition.LWB, x: 15, y: 55 },
      { id: PlayerPosition.LCM, x: 30, y: 50 },
      { id: PlayerPosition.CDM, x: 50, y: 50 },
      { id: PlayerPosition.RCM, x: 70, y: 50 },
      { id: PlayerPosition.RWB, x: 85, y: 55 },
      { id: PlayerPosition.LT, x: 35, y: 30 },
      { id: PlayerPosition.RT, x: 65, y: 30 },
    ],
  },
];
