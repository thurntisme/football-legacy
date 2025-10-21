import React, { useState } from "react";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DialogHeader } from "@/components/ui/dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SERVERS } from "@/constants/common";
import { FOOTBALL_STATS_URL } from "@/constants/site";
import { toast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/finance";

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

type Props = {
  teams: Team[];
  availableSlots: number;
  setTeams: React.Dispatch<React.SetStateAction<Team[]>>;
};

const TeamGrid = ({ teams, availableSlots, setTeams }: Props) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newTeamName, setNewTeamName] = useState("");
  const [newTeamServer, setNewTeamServer] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();

  const handleCreateTeam = async () => {
    if (!newTeamName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a team name",
        variant: "destructive",
      });
      return;
    }

    if (!newTeamServer) {
      toast({
        title: "Error",
        description: "Please select a server",
        variant: "destructive",
      });
      return;
    }

    setIsCreating(true);

    setTimeout(() => {
      const newTeam: Team = {
        id: String(teams.length + 1),
        name: newTeamName,
        server: newTeamServer,
        region:
          SERVERS.find((s) => s.id === newTeamServer)?.region || "Unknown",
        squadSize: 0,
        createdDate: new Date().toISOString().split("T")[0],
        level: 1,
        squadValue: 0,
      };

      setTeams([...teams, newTeam]);
      setNewTeamName("");
      setNewTeamServer("");
      setIsCreating(false);
      setDialogOpen(false);

      toast({
        title: "Success!",
        description: `Team "${newTeamName}" created successfully!`,
      });
    }, 1500);
  };

  const handleSelectTeam = (teamId: string) => {
    router.push(`${FOOTBALL_STATS_URL}/dashboard`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {teams.map((team) => (
        <Card
          key={team.id}
          className="bg-white border-gray-200 hover:border-gray-400 hover:shadow-lg transition-all cursor-pointer group"
          onClick={() => handleSelectTeam(team.id)}
        >
          <CardHeader>
            <CardTitle className="text-gray-900 group-hover:text-gray-700 transition-colors">
              {team.name}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {team.region}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500">Server</p>
                <p className="text-sm font-semibold text-gray-900">
                  {team.server}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Level</p>
                <p className="text-sm font-semibold text-gray-900">
                  {team.level}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Squad Size</p>
                <p className="text-sm font-semibold text-gray-900">
                  {team.squadSize}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Squad Value</p>
                <p className="text-sm font-semibold text-gray-900">
                  {formatCurrency(team.squadValue)}
                </p>
              </div>
            </div>
            <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white">
              Enter Dashboard
            </Button>
          </CardContent>
        </Card>
      ))}

      {availableSlots > 0 && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Card className="bg-gray-50 border-dashed border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-100 transition-all cursor-pointer flex items-center justify-center min-h-72">
              <CardContent className="flex flex-col items-center justify-center text-center">
                <Plus className="h-12 w-12 text-gray-600 mb-4" />
                <p className="text-gray-900 font-semibold">Create New Team</p>
                <p className="text-gray-600 text-sm">
                  {availableSlots} slot available
                </p>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent className="bg-white border-gray-200">
            <DialogHeader>
              <DialogTitle className="text-gray-900">
                Create a New Team
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Fill in the details to create your new football team
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="team-name" className="text-gray-900">
                  Team Name
                </Label>
                <Input
                  id="team-name"
                  placeholder="Enter team name"
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                  className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="server" className="text-gray-900">
                  Server
                </Label>
                <Select value={newTeamServer} onValueChange={setNewTeamServer}>
                  <SelectTrigger className="bg-gray-50 border-gray-300 text-gray-900">
                    <SelectValue placeholder="Select a server" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200">
                    {SERVERS.map((server) => (
                      <SelectItem
                        key={server.id}
                        value={server.id}
                        className="text-gray-900"
                      >
                        <div className="flex items-center gap-2">
                          <span>{server.name}</span>
                          <span className="text-xs text-gray-500">
                            ({server.region})
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {newTeamServer && (
                <Card className="bg-gray-50 border-gray-200">
                  <CardContent className="pt-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className="text-green-600 font-semibold">
                          {SERVERS.find((s) => s.id === newTeamServer)?.status}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Region:</span>
                        <span className="text-gray-900">
                          {SERVERS.find((s) => s.id === newTeamServer)?.region}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Active Players:</span>
                        <span className="text-gray-900">
                          {SERVERS.find(
                            (s) => s.id === newTeamServer,
                          )?.players.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Button
                onClick={handleCreateTeam}
                disabled={isCreating}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white"
              >
                {isCreating ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Creating Team...
                  </>
                ) : (
                  "Create Team"
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default TeamGrid;
