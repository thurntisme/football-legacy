"use client";

import { useState, useEffect } from "react";

import AvailableSlots from "@/components/pages/welcome/available-slots";
import QuickTips from "@/components/pages/welcome/quick-tips";
import ServerInfo from "@/components/pages/welcome/server-info";
import TeamGrid from "@/components/pages/welcome/team-grid";
import { apiClient } from "@/lib/api/api";
import { Club, Server } from "@/types/club";


export default function WelcomePage() {
  const [teams, setTeams] = useState<Club[]>([]);
  const [servers, setServers] = useState<Server[]>([]);
  const [loadingTeams, setLoadingTeams] = useState(true);
  const [loadingServers, setLoadingServers] = useState(true);
  const [teamsError, setTeamsError] = useState<string | null>(null);
  const [serversError, setServersError] = useState<string | null>(null);

  const fetchClubs = async () => {
    try {
      setLoadingTeams(true);
      setTeamsError(null);
      const clubsResponse = await apiClient.get("/api/clubs");
      
      if (clubsResponse.data.success) {
        setTeams(clubsResponse.data.clubs || []);
      } else {
        setTeamsError(clubsResponse.data.message || "Failed to load clubs");
      }
    } catch (err) {
      console.error("Error fetching clubs:", err);
      setTeamsError("Failed to load clubs");
    } finally {
      setLoadingTeams(false);
    }
  };

  const fetchServers = async () => {
    try {
      setLoadingServers(true);
      setServersError(null);
      const serversResponse = await apiClient.get("/api/servers");
      
      if (serversResponse.data.success) {
        setServers(serversResponse.data.servers || []);
      } else {
        setServersError(serversResponse.data.message || "Failed to load servers");
      }
    } catch (err) {
      console.error("Error fetching servers:", err);
      setServersError("Failed to load servers");
    } finally {
      setLoadingServers(false);
    }
  };

  useEffect(() => {
    fetchClubs();
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
        loading={loadingTeams}
        error={teamsError}
        servers={servers}
        onRefreshTeams={fetchClubs}
      />

      <ServerInfo servers={servers} loading={loadingServers} error={serversError} />

      <QuickTips />
    </div>
  );
}
