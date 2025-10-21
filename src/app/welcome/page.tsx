"use client";

import { useState } from "react";

import AvailableSlots from "@/components/pages/welcome/available-slots";
import QuickTips from "@/components/pages/welcome/quick-tips";
import ServerInfo from "@/components/pages/welcome/server-info";
import TeamGrid from "@/components/pages/welcome/team-grid";

interface Team {
  id: string;
  name: string;
  server: string;
  region: string;
  squadSize: number;
  createdDate: string;
  level: number;
  squadValue: number;
}

export default function WelcomePage() {
  const [teams, setTeams] = useState<Team[]>([
    {
      id: "1",
      name: "Manchester City",
      server: "EU-1",
      region: "Europe",
      squadSize: 25,
      createdDate: "2024-01-15",
      level: 12,
      squadValue: 8000000,
    },
    {
      id: "2",
      name: "Liverpool FC",
      server: "EU-1",
      region: "Europe",
      squadSize: 23,
      createdDate: "2024-02-10",
      level: 10,
      squadValue: 5000000,
    },
  ]);

  const availableSlots = 3 - teams.length;

  return (
    <div className="container max-w-6xl mx-auto py-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Welcome Manager
        </h1>
        <p className="text-gray-600 text-lg">
          Select or create your football team to get started
        </p>
      </div>

      <AvailableSlots
        teamLength={teams.length}
        availableSlots={availableSlots}
      />

      <TeamGrid
        teams={teams}
        availableSlots={availableSlots}
        setTeams={setTeams}
      />

      <ServerInfo />

      <QuickTips />
    </div>
  );
}
