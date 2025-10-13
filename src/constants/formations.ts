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

export const POSITION_COLORS = [
  {
    positions: [PlayerPosition.GK],
    color: "oklch(76.9% 0.188 70.08)",
  },
  {
    positions: [
      PlayerPosition.CB,
      PlayerPosition.LCB,
      PlayerPosition.RCB,
      PlayerPosition.LB,
      PlayerPosition.RB,
      PlayerPosition.LWB,
      PlayerPosition.RWB,
    ],
    color: "oklch(54.6% 0.245 262.881)",
  },
  {
    positions: [
      PlayerPosition.CDM,
      PlayerPosition.LCDM,
      PlayerPosition.RCDM,
      PlayerPosition.CM,
      PlayerPosition.LCM,
      PlayerPosition.RCM,
      PlayerPosition.CAM,
      PlayerPosition.LCAM,
      PlayerPosition.RCAM,
      PlayerPosition.LM,
      PlayerPosition.RM,
    ],
    color: "oklch(72.3% 0.219 149.579)",
  },
  {
    positions: [
      PlayerPosition.LW,
      PlayerPosition.RW,
      PlayerPosition.ST,
      PlayerPosition.CF,
      PlayerPosition.SS,
    ],
    color: "oklch(57.7% 0.245 27.325)",
  },
];

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
export const positionCompatibility: Record<string, string> = {
  GK: "GK",
  CB: "CB",
  LCB: "CB",
  RCB: "CB",
  LB: "LB",
  RB: "RB",
  LWB: "LB",
  RWB: "RB",
  CDM: "CDM",
  LCDM: "CDM",
  RCDM: "CDM",
  CM: "CM",
  LCM: "CM",
  RCM: "CM",
  CAM: "CAM",
  LCAM: "CAM",
  RCAM: "CAM",
  LM: "LM",
  RM: "RM",
  LW: "LW",
  RW: "RW",
  LT: "ST",
  ST: "ST",
  RT: "ST",
  CF: "ST",
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
      { id: PlayerPosition.LM, x: 25, y: 40 },
      { id: PlayerPosition.CAM, x: 50, y: 35 },
      { id: PlayerPosition.RM, x: 75, y: 40 },
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
      { id: PlayerPosition.LCB, x: 30, y: 75 },
      { id: PlayerPosition.CB, x: 50, y: 70 },
      { id: PlayerPosition.RCB, x: 70, y: 75 },
      { id: PlayerPosition.LWB, x: 20, y: 50 },
      { id: PlayerPosition.LCDM, x: 40, y: 55 },
      { id: PlayerPosition.RCDM, x: 60, y: 55 },
      { id: PlayerPosition.RWB, x: 80, y: 50 },
      { id: PlayerPosition.CAM, x: 50, y: 30 },
      { id: PlayerPosition.LT, x: 35, y: 15 },
      { id: PlayerPosition.RT, x: 65, y: 15 },
    ],
  },
];
