/* eslint-disable no-unused-vars */
import React from "react";

import { PlayerEditionEnum } from "@/constants/player";

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

type PlayerAttributes = {
  // ⚡ Physical Attributes
  pace: number; // Overall running speed (top speed)
  acceleration: number; // How quickly the player reaches top speed
  agility: number; // Quickness in changing direction
  stamina: number; // Endurance — how long the player maintains performance
  strength: number; // Physical power in duels and shielding
  jumping: number; // Ability to leap and win aerial duels

  // 🎯 Technical Skills
  dribbling: number; // Ball control while moving
  ballControl: number; // First touch and control of the ball
  crossing: number; // Accuracy and power of crosses
  shooting: number; // General shooting accuracy and power
  longShots: number; // Shooting ability from long distance
  reactions: number; // Response time to situations (second ball, rebounds)
  heading: number; // Accuracy and power of headers
  tackling: number; // Ability to win the ball through tackles
  defending: number; // Overall defensive awareness and positioning
  finishing: number; // Accuracy in front of goal
  shortPassing: number; // Accuracy in short passes
  longPassing: number; // Accuracy and vision in long passes
  powerShots: number; // Power and technique in powerful shots
  setPieces: number; // Ability to take free kicks, corners, and penalties

  // 🧠 Mental Attributes
  vision: number; // Ability to see and execute creative passes
  positioning: number; // Off-the-ball movement / defensive positioning
  anticipation: number; // Ability to predict opponent’s actions
  decisionMaking: number; // Choosing the right option under pressure
  composure: number; // Calmness and control under pressure
  concentration: number; // Focus throughout the match
  workRate: number; // Effort level, both offensively and defensively
  leadership: number; // Influence and command on the pitch
  flair: number; // Creativity and willingness to attempt unique plays
  creativity: number; // Ability to create chances from nothing

  // 🧤 Goalkeeper-Specific Attributes
  reflexes: number; // Quick reactions to shots
  diving: number; // Ability to dive and save shots
  handling: number; // Securely catching the ball, avoiding rebounds
  kicking: number; // Accuracy and distance of goal kicks
  positioningGK: number; // Positioning when facing shots
  oneOnOne: number; // Ability to stop attackers in 1v1 situations
  commandOfArea: number; // Control of the penalty area (coming for crosses, directing defense)
};

export type BasePlayer = {
  uuid: string; // Player unique ID in the database
  avatarUrl: string; // Full URL of the avatar image
  playerIndex: number; // Index/order in the squad
  name: string; // Player's full name
  position: string; // Main position (e.g. "CB", "ST")
  playablePositions: string[]; // List of positions the player can play
  foot: PlayerFootPreference; // Preferred foot (e.g. "Left", "Right", "Both")
  rating: number; // Overall rating (0–100)
  form: PlayerForm; // Recent performance form (e.g. "Excellent", "Poor")
  fitness: number; // Current fitness level (0–100)
  shirtNumber: number; // Jersey number
  salary: number; // Weekly or monthly salary
  contractLength: number; // Remaining contract by matches
  birthday: string; // Player's date of birth
  nationality: string; // Nationality
  height: number; // Height in cm
  weight: number; // Weight in kg

  stats: {
    matches: number; // Number of matches played
    goals: number; // Goals scored
    assists: number; // Assists provided
    yellowCards: number; // Yellow cards received
    redCards: number; // Red cards received
    cleanSheets: number; // Clean sheets (for GK/defenders)
    minutesPlayed: number; // Total minutes played
    rating: number; // Average match rating
  };

  edition: PlayerEditionEnum; // Player edition (e.g. "Classic", "Iconic")
  attributes: PlayerAttributes; // Player's detailed attributes
  marketValue: number; // Estimated market value
  potential: number; // Potential maximum rating (0–5)
  skillMoves: number; // Skill move ability (1 = basic, 5 = advanced)

  preferredRole: PlayerPreferredRole | null; // Preferred tactical role (e.g. "Poacher", "Playmaker")
  personality: PlayerPersonality | null; // Personality type (e.g. "Leader", "Calm", "Aggressive")
  injuryProne: number; // Likelihood of getting injured (0 = never, 5 = very high)
  consistency: number; // Performance consistency (0 = unstable, 100 = very reliable)
};

export type Player = Partial<BasePlayer> & {
  id?: string; // Player ID in the team
  clubId?: string; // Current club name

  nationalTeam?: {
    name: string; // National team name
    callUp: boolean; // Whether called up to the national team
    nextMatch: string; // Next national team match
    paymentReceived: number; // Compensation from national team
    internationalCaps: number; // Number of international appearances
  };

  transferStatus?: "transfer-listed" | "loan-listed" | "not-listed"; // Transfer market status
  loan?: {
    fee: number; // Loan fee
    duration: string; // Loan duration
    wage: number; // Wage contribution
  };

  level?: number; // Player level or experience tier
  role?: PlayerRoleEnum | null; // Current role in the team
  morale?: PlayerMorale; // Current morale level

  status: {
    type: PlayerStatusType; // Current status (e.g. "Injured", "Suspended")
    details: string; // Additional info about status
    until: string; // Status expiry date
  };

  trainingPerformance: PlayerTrainingPerformance; // Training evaluation
};

export enum PlayerRoleEnum {
  CAPTION = "captain",
  VICE_CAPTION = "vice-captain",
  PENALTY_TAKER = "penalty-taker",
  FREE_KICK_TAKER = "free-kick-taker",
  LEFT_CORNER_TAKER = "left-corner-taker",
  RIGHT_CORNER_TAKER = "right-corner-taker",
}

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
