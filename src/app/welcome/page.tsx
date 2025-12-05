"use client";

import { useState, useEffect } from "react";

import AvailableSlots from "@/components/pages/welcome/available-slots";
import QuickTips from "@/components/pages/welcome/quick-tips";
import ServerInfo from "@/components/pages/welcome/server-info";
import TeamGrid from "@/components/pages/welcome/team-grid";
import { apiClient } from "@/lib/api/api";

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

interface Server {
  id: string;
  name: string;
  region: string;
  status: string;
  players?: number;
  [key: string]: any;
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
  const [servers, setServers] = useState<Server[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServers = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get("/api/servers");
        
        if (response.data.success) {
          setServers(response.data.servers || []);
        } else {
          setError(response.data.message || "Failed to load servers");
        }
      } catch (err) {
        console.error("Error fetching servers:", err);
        setError("Failed to load servers");
      } finally {
        setLoading(false);
      }
    };

    fetchServers();
  }, []);

  const availableSlots = 3 - teams.length;

  return (
    <div className="container max-w-6xl mx-auto py-12">
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

      <ServerInfo servers={servers} loading={loading} error={error} />

      <QuickTips />
    </div>
  );
}
