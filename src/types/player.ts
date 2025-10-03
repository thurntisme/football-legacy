/* eslint-disable no-unused-vars */
import React from "react";

// Enum for Player Form
export enum PlayerForm {
  EXCELLENT = "excellent",
  GOOD = "good",
  AVERAGE = "average",
  POOR = "poor",
}

// Enum for Player Status Type
export enum PlayerStatusType {
  INJURED = "injured",
  UNHAPPY = "unhappy",
  TRANSFER = "transfer",
  SUSPENDED = "suspended",
  FIT = "fit",
}

// Enum for Player Morale
export enum PlayerMorale {
  HIGH = "high",
  NORMAL = "normal",
  LOW = "low",
}

// Enum for Training Performance
export enum PlayerTrainingPerformance {
  EXCELLENT = "excellent",
  GOOD = "good",
  AVERAGE = "average",
  POOR = "poor",
}

// Enum for Player Type
export enum PlayerType {
  NORMAL = "normal",
  RISING = "rising",
  YOUNG = "young",
  LEGEND = "legend",
}

// Enum for Foot Preference
export enum PlayerFootPreference {
  LEFT = "left",
  RIGHT = "right",
  BOTH = "both",
}

export enum PlayerPreferredRole {
  PLAYMAKER = "playmaker",
  TARGETMAN = "targetman",
  WINGER = "winger",
  BOX_TO_BOX = "box_to_box",
  SWEEPER = "sweeper",
  POACHER = "poacher",
  BALL_WINNER = "ball_winner",
}

export enum PlayerPersonality {
  AMBITIOUS = "ambitious",
  CALM = "calm",
  AGGRESSIVE = "aggressive",
  LAID_BACK = "laid_back",
  OPTIMISTIC = "optimistic",
  PESSIMISTIC = "pessimistic",
  DETERMINED = "determined",
  SELFISH = "selfish",
  TEAM_PLAYER = "team_player",
  LOYAL = "loyal",
  UNRELIABLE = "unreliable",
  UNPREDICTABLE = "unpredictable",
  DISCIPLINED = "disciplined",
  UNDISCIPLINED = "undisciplined",
  CONFIDENT = "confident",
}

type BaseAttributes = {
  // Core Physical & Technical
  pace: number;
  acceleration: number;
  agility: number;
  stamina: number;
  strength: number;
  jumping: number;

  // Technical Skills
  dribbling: number;
  ballControl: number;
  crossing: number;
  shooting: number;
  longShots: number;
  reactions: number;
  heading: number;
  tackling: number;
  defending: number;
  finishing: number;
  shortPassing: number;
  longPassing: number;
  powerShots: number;
  setPieces: number;

  // Mental Attributes
  vision: number;
  positioning: number;
  anticipation: number;
  decisionMaking: number;
  composure: number;
  concentration: number;
  workRate: number;
  leadership: number;
  flair: number;
  creativity: number;

  // Optional Extras
  weakFoot?: number; // 1 to 5
  skillMoves?: number; // 1 to 5
  injuryProne?: number; // 0 to 100
  consistency?: number; // 0 to 100
  morale?: number; // 0 to 100
  level?: number; // overall rating
  potential?: number; // future max rating
};

type GoalkeeperAttributes = {
  // Only applies to GK
  reflexes: number;
  diving: number;
  handling: number;
  kicking: number;
  positioningGK: number;
  oneOnOne: number;
  commandOfArea: number;
};

type PlayerAttributes = BaseAttributes & Partial<GoalkeeperAttributes>;

export type Player = {
  id: string; // Player in team
  uuid: string; // Player in database
  avatar?: string | null;
  avatar_url: string;
  playerIndex: number;
  name: string;
  position: string;
  rating: number;
  form: PlayerForm;
  fitness: number;
  shirtNumber: number;
  selected: boolean;
  salary: number;
  contractYears: number;
  age: number;
  nationality: string;
  height: number;
  weight: number;
  status: {
    type: PlayerStatusType;
    details: string;
    until: string;
  };
  contractExpiring: boolean;
  morale: PlayerMorale;
  trainingPerformance: PlayerTrainingPerformance;
  stats: {
    matches: number;
    goals: number;
    assists: number;
    yellowCards: number;
    redCards: number;
    cleanSheets: number;
    minutesPlayed: number;
    rating: number;
  };
  level: number;
  type: PlayerType;
  nationalTeam?: {
    name: string;
    callUp: boolean;
    nextMatch: string;
    paymentReceived: number;
  };
  attributes: PlayerAttributes;
  inLineup?: boolean;
  playablePositions: string[];
  foot: PlayerFootPreference;
  marketValue: number;
  market_value: number;
  birthdate: string;
  potential: number;
  preferredRole: PlayerPreferredRole;
  internationalCaps: number;
  injuryProne: boolean;
  personality: PlayerPersonality;
  club?: string;
  transferStatus?: "listed" | "transfer-listed" | "loan-listed" | "not-listed";
};

export type YouthPlayer = {
  id: string;
  name: string;
  age: number;
  nationality: string;
  position: string;
  potential: number;
  currentAbility: number;
  personality: PlayerPersonality;
  contractYears: number;
  developmentStage: string;
  potentialRange: string;
  promotionReadiness: number;
  lastYouthMatchRating: number;
  trainingPerformance: number;
  growthRate: string;
  mentorRelationship: string;
  developmentFocus: string;
  strengths: string[];
  weaknesses: string[];
  recentForm: number[];
  youthCoachFeedback: string;
};

type PlayerRoleType = {
  id: string;
  name: string;
  description: string;
};

export type PlayerRoles = {
  striker: PlayerRoleType[];
  midfielder: PlayerRoleType[];
  defender: PlayerRoleType[];
};

export type PlayerContract = {
  player: Player;
  newSalary: number;
};

export type PlayerRole = {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  assignedPlayerId: string | null;
};
