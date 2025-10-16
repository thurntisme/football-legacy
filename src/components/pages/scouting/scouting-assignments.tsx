"use client";

import { useEffect, useState } from "react";

import { Eye, File, Plus, Search, User } from "lucide-react";

import ContentWrapper from "@/components/common/content-wrapper";
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
import { internalApi } from "@/lib/api/internal";
import { StaffMember } from "@/types/staff";
import { useQuery } from "@tanstack/react-query";

interface Props {
  activeRegion?: string;
}

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

const positionGroups = ["Goalkeepers", "Defenders", "Midfielders", "Attackers"];

export default function ScoutingAssignments({ activeRegion = "" }: Props) {
  const [assignments, setAssignments] = useState<StaffMember[]>([]);

  const [showNewAssignmentDialog, setShowNewAssignmentDialog] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    assignmentId: "",
    region: activeRegion || "",
    country: "",
    focus: "young_talents",
    ageRange: [16, 23] as [number, number],
    positionGroups: [] as string[],
    duration: "30",
  });

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["assignments-staff-list"],
    queryFn: async () => {
      const res = await internalApi.get("/scouting/assignments");
      return res.data?.data || [];
    },
  });

  const handleCreateAssignment = () => {
    if (!newAssignment.id || !newAssignment.region || !newAssignment.focus) {
      toast({
        title: "Missing Information",
        description:
          "Please fill in all required fields to create an assignment.",
        variant: "destructive",
      });
      return;
    }

    const scout = availableScouts.find((s) => s.id === newAssignment.id);

    if (!scout) {
      toast({
        title: "Invalid Scout",
        description: "Please select a valid scout for this assignment.",
        variant: "destructive",
      });
      return;
    }

    const newAssignmentObj: StaffMember = {
      ...newAssignment,
      assignmentId: assignments.length + 1,
      id: Number.parseInt(newAssignment.id),
      name: scout.name,
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
      id: "",
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
    startDate: string | undefined,
    duration: number | undefined,
    progress: number | undefined,
  ) => {
    if (!startDate || !duration || !progress) return "Unknown";

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

  return (
    <ContentWrapper isLoading={isLoading} error={error} onRefetch={refetch}>
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
                      value={newAssignment.id}
                      onValueChange={(value) =>
                        setNewAssignment({ ...newAssignment })
                      }
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select scout" />
                      </SelectTrigger>
                      <SelectContent>
                        {data?.available?.length &&
                          data?.available.map((scout: StaffMember) => (
                            <SelectItem
                              key={scout.id}
                              value={scout.id.toString()}
                            >
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
                        <SelectItem value="general">
                          General Scouting
                        </SelectItem>
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
                        <div
                          key={group}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`position-${group}`}
                            checked={newAssignment.positionGroups.includes(
                              group,
                            )}
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
            {data?.assignments?.length ? (
              data?.assignments.map((assignment: StaffMember) => (
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
                          {assignment.name}
                        </CardTitle>
                        <CardDescription>
                          {assignment.region}
                          {assignment.country ? ` - ${assignment.country}` : ""}
                        </CardDescription>
                      </div>
                      <div>
                        {assignment?.status &&
                          getStatusBadge(assignment.status)}
                      </div>
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
                            {assignment?.ageRange?.length && (
                              <>
                                {assignment.ageRange[0]}-
                                {assignment.ageRange[1]}{" "}
                              </>
                            )}
                            years
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">
                            Positions
                          </div>
                          <div className="font-medium">
                            {assignment?.positionGroups?.length &&
                              assignment?.positionGroups.join(", ")}
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
                          <span className="text-muted-foreground">
                            Progress:
                          </span>
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
                      {assignment.status === "completed" ? (
                        <>
                          <File className="w-4 h-4" />
                          View Report
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4" />
                          View Detail
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="text-center py-8 border rounded-md bg-muted/20 col-start-1 col-end-3">
                <Search className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                <h3 className="text-lg font-medium mb-1">
                  No Assignments Found
                </h3>
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
    </ContentWrapper>
  );
}
