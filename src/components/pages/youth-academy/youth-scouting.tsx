"use client";

import { useState } from "react";

import { MapPin, Plus, Search, X } from "lucide-react";

import ConfirmDialog from "@/components/common/confirm-dialog";
import ContentWrapper from "@/components/common/content-wrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { internalApi } from "@/lib/api/internal";
import { StaffAssignment } from "@/types/staff";
import { ScoutingMission, ScoutingResult } from "@/types/youth-academy";
import { useQuery } from "@tanstack/react-query";

import ApproachPlayerDialog from "./approach-player-dialog";
import NewScoutingDialog from "./new-scouting-dialog";
import ScoutingResultDialog from "./scouting-result-dialog";

export default function YouthScouting() {
  // Mock scouting missions
  const [scoutingMissions, setScoutingMissions] = useState<ScoutingMission[]>([
    {
      id: 1,
      region: "Europe",
      country: "England",
      focus: "general",
      positions: [],
      ageRange: [15, 18],
      duration: 30,
      cost: 15000,
      startDate: "2025-02-01",
      progress: 100,
      status: "completed",
      results: [
        {
          id: 1,
          playerName: "Jack Thompson",
          age: 16,
          position: "CM",
          nationality: "England",
          club: "Sunderland AFC Youth",
          potential: 78,
          attributes: {
            technical: 65,
            mental: 62,
            physical: 60,
          },
          signCost: 250000,
          signChance: "high",
          status: "pending",
        },
        {
          id: 2,
          playerName: "Oliver Wilson",
          age: 17,
          position: "RW",
          nationality: "England",
          club: "Leeds United Academy",
          potential: 82,
          attributes: {
            technical: 70,
            mental: 65,
            physical: 68,
          },
          signCost: 350000,
          signChance: "medium",
          status: "pending",
        },
        {
          id: 3,
          playerName: "Harry Davis",
          age: 15,
          position: "CB",
          nationality: "England",
          club: "Manchester City Academy",
          potential: 85,
          attributes: {
            technical: 62,
            mental: 68,
            physical: 72,
          },
          signCost: 500000,
          signChance: "low",
          status: "pending",
        },
      ],
    },
    {
      id: 2,
      region: "South America",
      country: "Brazil",
      focus: "technical",
      positions: ["CAM", "LW", "RW"],
      ageRange: [16, 19],
      duration: 45,
      cost: 25000,
      startDate: "2025-02-10",
      progress: 65,
      status: "active",
    },
    {
      id: 3,
      region: "Europe",
      country: "Spain",
      focus: "specific_position",
      positions: ["GK"],
      ageRange: [15, 17],
      duration: 21,
      cost: 12000,
      startDate: "2025-02-20",
      progress: 30,
      status: "active",
    },
  ]);

  const [activeTab, setActiveTab] = useState("active");
  const [showNewMissionDialog, setShowNewMissionDialog] = useState(false);
  const [showResultsDialog, setShowResultsDialog] = useState(false);
  const [selectedMission, setSelectedMission] =
    useState<ScoutingMission | null>(null);
  const [selectedResult, setSelectedResult] = useState<ScoutingResult | null>(
    null,
  );
  const [showApproachDialog, setShowApproachDialog] = useState(false);
  const [isApproaching, setIsApproaching] = useState(false);
  const [approachResult, setApproachResult] = useState<
    "success" | "failure" | null
  >(null);

  // New mission form state
  const [newMission, setNewMission] = useState({
    region: "Europe",
    country: "",
    focus: "general",
    positions: [] as string[],
    ageRange: [15, 18] as [number, number],
    duration: 30,
  });

  // Available regions and countries
  const regions = [
    {
      id: "Europe",
      countries: [
        "England",
        "Spain",
        "Germany",
        "France",
        "Italy",
        "Portugal",
        "Netherlands",
      ],
    },
    {
      id: "South America",
      countries: ["Brazil", "Argentina", "Uruguay", "Colombia", "Chile"],
    },
    {
      id: "Africa",
      countries: [
        "Nigeria",
        "Ghana",
        "Senegal",
        "Ivory Coast",
        "Cameroon",
        "South Africa",
      ],
    },
    { id: "North America", countries: ["USA", "Mexico", "Canada"] },
    { id: "Asia", countries: ["Japan", "South Korea", "China", "Australia"] },
  ];

  // Available positions
  const positions = [
    "GK",
    "CB",
    "LB",
    "RB",
    "CDM",
    "CM",
    "CAM",
    "LW",
    "RW",
    "ST",
  ];

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["youth-assignments-staff-list"],
    queryFn: async () => {
      const res = await internalApi.get("/youth-academy/assignments");
      return res.data?.data || [];
    },
  });

  // Handle viewing mission results
  const handleViewResults = (mission: ScoutingMission) => {
    setSelectedMission(mission);
    setShowResultsDialog(true);
  };

  // Handle approaching a player
  const handleApproachPlayer = (result: ScoutingResult) => {
    setSelectedResult(result);
    setApproachResult(null);
    setShowApproachDialog(true);
  };

  // Attempt to approach and sign a player
  const attemptApproach = () => {
    if (!selectedResult || !selectedMission) return;

    setIsApproaching(true);

    // Simulate loading time
    setTimeout(() => {
      // Determine success based on sign chance
      let successChance = 0.3; // Low
      if (selectedResult.signChance === "medium") successChance = 0.5;
      if (selectedResult.signChance === "high") successChance = 0.8;

      const success = Math.random() < successChance;
      setApproachResult(success ? "success" : "failure");

      if (success) {
        // Update the result status
        const updatedMissions = scoutingMissions.map((mission) => {
          if (mission.id === selectedMission.id && mission.results) {
            const updatedResults = mission.results.map((result) =>
              result.id === selectedResult.id
                ? { ...result, status: "approached" }
                : result,
            );
            return { ...mission, results: updatedResults };
          }
          return mission;
        });

        // setScoutingMissions(updatedMissions);

        toast({
          title: "Approach Successful",
          description: `${selectedResult.playerName} and ${selectedResult.club} have agreed to negotiate.`,
        });
      } else {
        toast({
          title: "Approach Failed",
          description: `${selectedResult.club} has rejected your approach for ${selectedResult.playerName}.`,
          variant: "destructive",
        });
      }

      setIsApproaching(false);
    }, 2000);
  };

  // Complete the signing of a player
  const completeSigningPlayer = () => {
    if (!selectedResult || !selectedMission) return;

    // Update the result status
    const updatedMissions = scoutingMissions.map((mission) => {
      if (mission.id === selectedMission.id && mission.results) {
        const updatedResults = mission.results.map((result) =>
          result.id === selectedResult.id
            ? { ...result, status: "signed" }
            : result,
        );
        return { ...mission, results: updatedResults };
      }
      return mission;
    });

    // setScoutingMissions(updatedMissions);
    setShowApproachDialog(false);

    toast({
      title: "Player Signed",
      description: `${selectedResult.playerName} has joined your youth academy!`,
    });
  };

  // Get days remaining
  const getDaysRemaining = (
    startDate: string,
    duration: number,
    progress: number,
  ) => {
    if (progress >= 100) return "Completed";

    const start = new Date(startDate);
    const daysElapsed = Math.floor(
      (new Date().getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
    );
    const daysRemaining = duration - daysElapsed;

    return daysRemaining > 0
      ? `${daysRemaining} days remaining`
      : "Completing soon";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="text-lg font-medium">Active Missions</div>

        <NewScoutingDialog
          showNewMissionDialog={showNewMissionDialog}
          setShowNewMissionDialog={setShowNewMissionDialog}
        />
      </div>

      <ContentWrapper isLoading={isLoading} error={error} onRefetch={refetch}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data?.assignments?.length ? (
            data?.assignments?.map((mission: StaffAssignment) => (
              <Card
                key={mission.id}
                className={
                  mission.status === "completed"
                    ? "border-green-500/50"
                    : "border-blue-500/50"
                }
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {mission.country}, {mission.region}
                    </CardTitle>
                    <div>{getFocusBadge(mission.focus)}</div>
                  </div>
                  <CardDescription>
                    {mission.focus === "specific_position"
                      ? `Scouting for ${mission.positions.join(", ")} positions`
                      : `${mission.focus.replace("_", " ").charAt(0).toUpperCase() + mission.focus.replace("_", " ").slice(1)} scouting`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">
                          Age Range
                        </div>
                        <div className="font-medium">
                          {mission.ageRange[0]}-{mission.ageRange[1]} years
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">
                          Duration
                        </div>
                        <div className="font-medium">
                          {mission.duration} days
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">
                          Start Date
                        </div>
                        <div className="font-medium">
                          {new Date(mission.startDate).toLocaleDateString()}
                        </div>
                      </div>
                      <div></div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress:</span>
                        <span>{mission.progress}%</span>
                      </div>
                      <Progress value={mission.progress} className="h-2" />
                      <div className="flex justify-end text-xs text-muted-foreground">
                        {getDaysRemaining(
                          mission.startDate,
                          mission.duration,
                          mission.progress,
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  {mission.status === "completed" ? (
                    <Button
                      className="w-full"
                      onClick={() => handleViewResults(mission)}
                    >
                      View Results ({mission.results?.length || 0} players)
                    </Button>
                  ) : (
                    <>
                      <ConfirmDialog
                        title="Cancel Scouting Assignment"
                        description={`Are you sure to cancel this scouting from staff ${mission.name || ""}?`}
                      >
                        <Button variant="outline" className="w-full">
                          <X className="w-4 h-4" />
                          Cancel
                        </Button>
                      </ConfirmDialog>
                      <Button variant="outline" className="w-full" disabled>
                        Scouting in Progress...
                      </Button>
                    </>
                  )}
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-8 border rounded-md bg-muted/20">
              <Search className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
              <h3 className="text-lg font-medium mb-1">No Scouting Missions</h3>
              <p className="text-muted-foreground mb-4">
                {activeTab === "active"
                  ? "You don't have any active scouting missions. Create a new mission to start scouting for youth talent."
                  : activeTab === "completed"
                    ? "You don't have any completed scouting missions yet."
                    : "You haven't created any scouting missions yet."}
              </p>
              <Button onClick={() => setShowNewMissionDialog(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create Scouting Mission
              </Button>
            </div>
          )}
        </div>
      </ContentWrapper>

      <ScoutingResultDialog
        selectedMission={selectedMission}
        showResultsDialog={showResultsDialog}
        setShowResultsDialog={setShowResultsDialog}
        approachPlayer={handleApproachPlayer}
      />

      <ApproachPlayerDialog
        selectedResult={selectedResult}
        showApproachDialog={showApproachDialog}
        isApproaching={isApproaching}
        approachResult={approachResult}
        setShowApproachDialog={setShowApproachDialog}
        attemptApproach={attemptApproach}
        completeSigningPlayer={completeSigningPlayer}
      />
    </div>
  );
}
