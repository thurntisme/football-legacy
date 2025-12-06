import React from "react";

export interface Club {
  id: string;
  name: string;
  server: Server;
  squadSize: number;
  createdDate: string;
  level: number;
  squadValue: number;
  budget: number;
}

export interface Server {
  id: string;
  name: string;
  region: string;
  status: string;
  capacity?: number;
  [key: string]: any;
}

export type HistoricalEvent = {
  id: number;
  year: number;
  month?: number;
  title: string;
  description: string;
  type:
    | "foundation"
    | "trophy"
    | "transfer"
    | "manager"
    | "stadium"
    | "promotion"
    | "relegation"
    | "milestone";
  icon: React.ReactNode;
  details?: string;
};
