import React from "react";

export type StadiumFacilityLevel = {
  level: number;
  cost: number;
  maintenanceCost: number;
  benefits: string[];
  capacity?: number;
  income?: number;
};

export type IMatch = {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  date: string;
  competition: string;
  result: "win" | "loss" | "draw";
  stadium: string;
};

export type ICalendarEvent = {
  id: number;
  date: string;
  type: "match" | "contract" | "transfer" | "loan" | "other";
  title: string;
  description: string;
  icon: React.ReactNode;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "outline" | "destructive";
};

export type INotification = {
  id: string;
  type: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
};
