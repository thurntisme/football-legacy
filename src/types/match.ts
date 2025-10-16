import React from "react";

import { TeamFormEnum } from "@/constants/league";

export type OnlineManager = {
  id: string;
  name: string;
  team: string;
  rating: number;
  status: "online" | "in-match";
  avatar: string;
  teamInfo: {
    formation: string;
    avgRating: number;
    topPlayers: string[];
    recentForm: TeamFormEnum[];
    style: string;
    strengths: string[];
    weaknesses: string[];
  };
  wins?: number;
  draws?: number;
  losses?: number;
  isFriend?: boolean;
};

export type MatchMessage = {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
};

export type MatchDetail = {
  id: string;
  opponent: string;
  opponentTeam: string;
  result: TeamFormEnum;
  score: string;
  date: string;
  details: {
    possession: { home: number; away: number };
    shots: { home: number; away: number };
    shotsOnTarget: { home: number; away: number };
    corners: { home: number; away: number };
    fouls: { home: number; away: number };
    scorers: {
      home: string[];
      away: string[];
    };
    cards: { home: string[]; away: string[] };
    rating: { home: number; away: number };
  };
};

type MatchOutcome = "win" | "loss" | "draw";
type TeamType = "home" | "away";

interface Score {
  home: number;
  away: number;
}

interface XG {
  home: number;
  away: number;
}

interface StatByTeam {
  home: number;
  away: number;
}

interface PlayerRating {
  id: number;
  name: string;
  position: string;
  rating: number;
  motm?: boolean; // optional: Man of the Match
}

interface Goal {
  minute: number;
  player: string;
  assist: string;
  team: TeamType;
}

export interface MatchResult {
  score: Score;
  result: MatchOutcome;
  venue: string;
  competition: string;
  matchday: number;
  xg: XG;
  possession: StatByTeam;
  shots: StatByTeam;
  shotsOnTarget: StatByTeam;
  corners: StatByTeam;
  fouls: StatByTeam;
  yellowCards: StatByTeam;
  redCards: StatByTeam;
  playerRatings: PlayerRating[];
  goals: Goal[];
}

export type MatchStats = {
  possession: { home: number; away: number };
  shots: { home: number; away: number };
  shotsOnTarget: { home: number; away: number };
  corners: { home: number; away: number };
  fouls: { home: number; away: number };
};

export type MatchScore = { home: number; away: number };
type HeatmapGrid = number[][];

interface TeamStats {
  possession: number;
  shots: number;
  shotsOnTarget: number;
  corners: number;
  fouls: number;
  yellowCards: number;
  passes: number;
  passAccuracy: number;
  tackles: number;
  interceptions: number;
  heatmap: HeatmapGrid;
}

export interface MatchStatics {
  home: TeamStats;
  away: TeamStats;
}

export type RewardItem = {
  id: number;
  name: string;
  description: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  type: "player";
  playerDetails: {
    position: string;
    rating: number;
    nationality: string;
    age: number;
  };
  icon: React.ReactNode;
};

export interface MatchEvent {
  type:
    | "kickoff"
    | "goal"
    | "yellow-card"
    | "half-time"
    | "second-half"
    | "substitution"
    | "full-time";
  title: string;
  description: string;
  assist?: string;
  team?: "home" | "away";
  player?: string;
  minute: number;
}

export type BallPosition = {
  x: number;
  y: number;
  team: "home" | "away" | "neutral";
  moving: boolean;
  direction: { x: number; y: number };
};

export type PlayerPosition = {
  id: number;
  x: number;
  y: number;
  team: "home" | "away";
  moving: boolean;
  direction: { x: number; y: number };
  targetX: number;
  targetY: number;
};

export type MatchProcessScore = {
  home: number;
  away: number;
};
export type MatchProcessEvent = {
  minute: number;
  text: string;
  type: string;
};
export type MatchProcessPsychological = {
  confidence: number; // 0-100
  pressure: number; // 0-100
  fatigue: number; // 0-100
  teamwork: number; // 0-100
};
export type TeamStat = {
  possession: number;
  shots: number;
  shotsOnTarget: number;
  corners: number;
  fouls: number;
  yellowCards: number;
  passes: number;
  passAccuracy: number;
  tackles: number;
  interceptions: number;
  heatmap: number[][];
};
export type MatchProcessStats = {
  home: TeamStat;
  away: TeamStat;
};
