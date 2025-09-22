import React from 'react';

export type StadiumFacilityLevel = {
  level: number;
  cost: number;
  maintenanceCost: number;
  benefits: string[];
  capacity?: number;
  income?: number;
};

export type IStadiumFacility = {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
  currentLevel: number;
  maxLevel: number;
  levels: StadiumFacilityLevel[];
  defaultLevel?: number;
};

export type IMatch = {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  date: string;
  competition: string;
  result: 'win' | 'loss' | 'draw';
  stadium: string;
};

export type ICalendarEvent = {
  id: number;
  date: string;
  type: 'match' | 'contract' | 'transfer' | 'loan' | 'other';
  title: string;
  description: string;
  icon: React.ReactNode;
  badge?: string;
  badgeVariant?: 'default' | 'secondary' | 'outline' | 'destructive';
};

export type IScoutingRequest = {
  id: number;
  teamName: string;
  teamLogo: string;
  playerName: string;
  playerPosition: string;
  offerAmount: number;
  status: 'pending' | 'accepted' | 'rejected' | 'negotiating';
  expiresIn: string;
};

export type INotification = {
  id: string;
  type: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
};
