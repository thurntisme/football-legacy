import React from "react";

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
