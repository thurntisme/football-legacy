// Youth scouting mission type
export type ScoutingMission = {
  id: number;
  region: string;
  country: string;
  focus:
    | "general"
    | "specific_position"
    | "high_potential"
    | "physical"
    | "technical";
  positions: string[];
  ageRange: [number, number];
  duration: number; // in days
  cost: number;
  startDate: string;
  progress: number;
  status: "active" | "completed";
  results?: ScoutingResult[];
};

// Scouting result type
export type ScoutingResult = {
  id: number;
  playerName: string;
  age: number;
  position: string;
  nationality: string;
  club: string;
  potential: number; // 1-100
  attributes: {
    technical: number;
    mental: number;
    physical: number;
  };
  signCost: number;
  signChance: "high" | "medium" | "low";
  status: "pending" | "approached" | "signed" | "rejected";
};

// Facility type
export type Facility = {
  id: string;
  name: string;
  description: string;
  level: number;
  maxLevel: number;
  benefits: string[];
  upgradeCost: number;
  upgradeTime: number; // in days
  upgradeInProgress: boolean;
  upgradeCompletionDate?: string;
};
