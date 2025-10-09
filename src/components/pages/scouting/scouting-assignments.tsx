"use client";

import { useState } from "react";

import { Plus, Search, User } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/hooks/use-toast";

type Assignment = {
  id: number;
  scoutId: number;
  scoutName: string;
  region: string;
  country: string | null;
  focus: string;
  ageRange: [number, number];
  positionGroups: string[];
  duration: number; // in days
  startDate: string;
  progress: number;
  status: "active" | "completed";
};

interface ScoutingAssignmentsProps {
  activeRegion: string | null;
}

export default function ScoutingAssignments({
  activeRegion,
}: ScoutingAssignmentsProps) {
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: 1,
      scoutId: 2,
      scoutName: "Carlos Mendez",
      region: "South America",
      country: "Brazil",
      focus: "Young Talents",
      ageRange: [16, 19],
      positionGroups: ["Midfielders", "Attackers"],
      duration: 90,
      startDate: "2025-01-15",
      progress: 65,
      status: "active",
    },
    {
      id: 2,
      scoutId: 4,
      scoutName: "Samuel Osei",
      region: "Africa",
      country: null,
      focus: "Physical Attributes",
      ageRange: [18, 23],
      positionGroups: ["Defenders", "Midfielders"],
      duration: 60,
      startDate: "2025-02-10",
      progress: 30,
      status: "active",
    },
    {
      id: 3,
      scoutId: 1,
      scoutName: "James Wilson",
      region: "Europe",
      country: "Germany",
      focus: "Technical Ability",
      ageRange: [20, 26],
      positionGroups: ["Midfielders"],
      duration: 45,
      startDate: "2024-12-05",
      progress: 100,
      status: "completed",
    },
  ]);

  const [showNewAssignmentDialog, setShowNewAssignmentDialog] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    scoutId: "",
    region: activeRegion || "",
    country: "",
    focus: "young_talents",
    ageRange: [16, 23] as [number, number],
    positionGroups: [] as string[],
    duration: "30",
  });

  const availableScouts = [
    { id: "1", name: "James Wilson" },
    { id: "3", name: "Hiroshi Tanaka" },
    { id: "5", name: "David Thompson" },
  ];

  const regions = ["Europe", "South America", "Africa", "Asia"];

  const countries = {
    Europe: [
      "England",
      "Spain",
      "Germany",
      "France",
      "Italy",
      "Portugal",
      "Netherlands",
      "Belgium",
    ],
    "South America": ["Brazil", "Argentina", "Uruguay", "Colombia", "Chile"],
    Africa: [
      "Nigeria",
      "Senegal",
      "Ghana",
      "Ivory Coast",
      "Cameroon",
      "Morocco",
      "Egypt",
    ],
    Asia: ["Japan", "South Korea", "Australia", "Iran", "Saudi Arabia"],
  };

  const positionGroups = [
    "Goalkeepers",
    "Defenders",
    "Midfielders",
    "Attackers",
  ];

  const handleCreateAssignment = () => {
    if (
      !newAssignment.scoutId ||
      !newAssignment.region ||
      !newAssignment.focus
    ) {
      toast({
        title: "Missing Information",
        description:
          "Please fill in all required fields to create an assignment.",
        variant: "destructive",
      });
      return;
    }

    const scout = availableScouts.find((s) => s.id === newAssignment.scoutId);

    if (!scout) {
      toast({
        title: "Invalid Scout",
        description: "Please select a valid scout for this assignment.",
        variant: "destructive",
      });
      return;
    }

    const newAssignmentObj: Assignment = {
      id: assignments.length + 1,
      scoutId: Number.parseInt(newAssignment.scoutId),
      scoutName: scout.name,
      region: newAssignment.region,
      country: newAssignment.country || null,
      focus: getFocusLabel(newAssignment.focus),
      ageRange: newAssignment.ageRange,
      positionGroups:
        newAssignment.positionGroups.length > 0
          ? newAssignment.positionGroups
          : ["All Positions"],
      duration: Number.parseInt(newAssignment.duration),
      startDate: new Date().toISOString().split("T")[0],
      progress: 0,
      status: "active",
    };

    setAssignments([...assignments, newAssignmentObj]);
    setShowNewAssignmentDialog(false);

    // Reset form
    setNewAssignment({
      scoutId: "",
      region: activeRegion || "",
      country: "",
      focus: "young_talents",
      ageRange: [16, 23] as [number, number],
      positionGroups: [] as string[],
      duration: "30",
    });

    toast({
      title: "Assignment Created",
      description: `${scout.name} has been assigned to scout in ${newAssignment.region}.`,
    });
  };

  const getFocusLabel = (focus: string) => {
    switch (focus) {
      case "young_talents":
        return "Young Talents";
      case "technical_ability":
        return "Technical Ability";
      case "physical_attributes":
        return "Physical Attributes";
      case "mental_attributes":
        return "Mental Attributes";
      case "specific_positions":
        return "Specific Positions";
      default:
        return "General Scouting";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "completed":
        return <Badge className="bg-blue-500">Completed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

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

  const togglePositionGroup = (group: string) => {
    if (newAssignment.positionGroups.includes(group)) {
      setNewAssignment({
        ...newAssignment,
        positionGroups: newAssignment.positionGroups.filter((g) => g !== group),
      });
    } else {
      setNewAssignment({
        ...newAssignment,
        positionGroups: [...newAssignment.positionGroups, group],
      });
    }
  };

  const filteredAssignments = activeRegion
    ? assignments.filter(
        (a) => a.region.toLowerCase() === activeRegion.toLowerCase(),
      )
    : assignments;

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <div className="gap-2">
          <CardTitle>Scouting Assignments</CardTitle>
          <CardDescription>
            Manage your scouting assignments and track progress.
          </CardDescription>
        </div>
        <div className="flex justify-end">
          <Dialog
            open={showNewAssignmentDialog}
            onOpenChange={setShowNewAssignmentDialog}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Assignment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create Scouting Assignment</DialogTitle>
                <DialogDescription>
                  Assign a scout to discover new talent
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="scout" className="text-right">
                    Scout
                  </Label>
                  <Select
                    value={newAssignment.scoutId}
                    onValueChange={(value) =>
                      setNewAssignment({ ...newAssignment, scoutId: value })
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select scout" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableScouts.map((scout) => (
                        <SelectItem key={scout.id} value={scout.id}>
                          {scout.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="region" className="text-right">
                    Region
                  </Label>
                  <Select
                    value={newAssignment.region}
                    onValueChange={(value) =>
                      setNewAssignment({
                        ...newAssignment,
                        region: value,
                        country: "",
                      })
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map((region) => (
                        <SelectItem key={region} value={region}>
                          {region}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {newAssignment.region && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="country" className="text-right">
                      Country
                    </Label>
                    <Select
                      value={newAssignment.country}
                      onValueChange={(value) =>
                        setNewAssignment({ ...newAssignment, country: value })
                      }
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="All Countries" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Countries</SelectItem>
                        {countries[
                          newAssignment.region as keyof typeof countries
                        ]?.map((country) => (
                          <SelectItem key={country} value={country}>
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="focus" className="text-right">
                    Focus
                  </Label>
                  <Select
                    value={newAssignment.focus}
                    onValueChange={(value) =>
                      setNewAssignment({ ...newAssignment, focus: value })
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select focus" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="young_talents">
                        Young Talents
                      </SelectItem>
                      <SelectItem value="technical_ability">
                        Technical Ability
                      </SelectItem>
                      <SelectItem value="physical_attributes">
                        Physical Attributes
                      </SelectItem>
                      <SelectItem value="mental_attributes">
                        Mental Attributes
                      </SelectItem>
                      <SelectItem value="specific_positions">
                        Specific Positions
                      </SelectItem>
                      <SelectItem value="general">General Scouting</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Age Range</Label>
                  <div className="col-span-3">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">
                        {newAssignment.ageRange[0]} years
                      </span>
                      <span className="text-sm">
                        {newAssignment.ageRange[1]} years
                      </span>
                    </div>
                    <Slider
                      value={[
                        newAssignment.ageRange[0],
                        newAssignment.ageRange[1],
                      ]}
                      min={15}
                      max={35}
                      step={1}
                      onValueChange={(value) =>
                        setNewAssignment({
                          ...newAssignment,
                          ageRange: [value[0], value[1]] as [number, number],
                        })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-4 items-start gap-4">
                  <Label className="text-right pt-2">Positions</Label>
                  <div className="col-span-3 space-y-2">
                    {positionGroups.map((group) => (
                      <div key={group} className="flex items-center space-x-2">
                        <Checkbox
                          id={`position-${group}`}
                          checked={newAssignment.positionGroups.includes(group)}
                          onCheckedChange={() => togglePositionGroup(group)}
                        />
                        <label
                          htmlFor={`position-${group}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {group}
                        </label>
                      </div>
                    ))}
                    {newAssignment.positionGroups.length === 0 && (
                      <p className="text-sm text-muted-foreground">
                        No selection means all positions will be scouted
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="duration" className="text-right">
                    Duration
                  </Label>
                  <Select
                    value={newAssignment.duration}
                    onValueChange={(value) =>
                      setNewAssignment({ ...newAssignment, duration: value })
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">1 Month</SelectItem>
                      <SelectItem value="60">2 Months</SelectItem>
                      <SelectItem value="90">3 Months</SelectItem>
                      <SelectItem value="180">6 Months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleCreateAssignment}>
                  Create Assignment
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {filteredAssignments.length > 0 ? (
            filteredAssignments.map((assignment) => (
              <Card
                key={assignment.id}
                className={
                  assignment.status === "completed"
                    ? "border-blue-500/50"
                    : "border-green-500/50"
                }
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <div>
                      <CardTitle className="flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        {assignment.scoutName}
                      </CardTitle>
                      <CardDescription>
                        {assignment.region}
                        {assignment.country ? ` - ${assignment.country}` : ""}
                      </CardDescription>
                    </div>
                    <div>{getStatusBadge(assignment.status)}</div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">
                          Focus
                        </div>
                        <div className="font-medium">{assignment.focus}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">
                          Age Range
                        </div>
                        <div className="font-medium">
                          {assignment.ageRange[0]}-{assignment.ageRange[1]}{" "}
                          years
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">
                          Positions
                        </div>
                        <div className="font-medium">
                          {assignment.positionGroups.join(", ")}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">
                          Duration
                        </div>
                        <div className="font-medium">
                          {assignment.duration} days
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress:</span>
                        <span>{assignment.progress}%</span>
                      </div>
                      <Progress value={assignment.progress} className="h-2" />
                      <div className="flex justify-end text-xs text-muted-foreground">
                        {getDaysRemaining(
                          assignment.startDate,
                          assignment.duration,
                          assignment.progress,
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    {assignment.status === "completed"
                      ? "View Report"
                      : "View Details"}
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="text-center py-8 border rounded-md bg-muted/20">
              <Search className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
              <h3 className="text-lg font-medium mb-1">No Assignments Found</h3>
              <p className="text-muted-foreground mb-4">
                {activeRegion
                  ? `No scouting assignments in ${activeRegion}. Create a new assignment to start scouting.`
                  : "No active scouting assignments. Create a new assignment to start scouting."}
              </p>
              <Button onClick={() => setShowNewAssignmentDialog(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create Assignment
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
