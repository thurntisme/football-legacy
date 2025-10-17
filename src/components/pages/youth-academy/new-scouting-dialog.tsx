import React, { useState } from "react";

import { AlertTriangle, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { regions } from "@/constants/scouting";
import { toast } from "@/hooks/use-toast";
import { ScoutingMission } from "@/types/youth-academy";

type Props = {
  showNewMissionDialog: boolean;
  setShowNewMissionDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

const NewScoutingDialog = ({
  showNewMissionDialog,
  setShowNewMissionDialog,
}: Props) => {
  const [newMission, setNewMission] = useState({
    region: "Europe",
    country: "",
    focus: "general",
    positions: [] as string[],
    ageRange: [15, 18] as [number, number],
    duration: 30,
  });
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

  // Handle creating a new scouting mission
  const handleCreateMission = () => {
    // Validate form
    if (!newMission.region || !newMission.country || !newMission.focus) {
      toast({
        title: "Missing Information",
        description:
          "Please fill in all required fields to create a scouting mission.",
        variant: "destructive",
      });
      return;
    }

    // Calculate cost based on duration, region, and focus
    let baseCost = 10000;
    if (newMission.region === "South America") baseCost = 15000;
    if (newMission.region === "Africa") baseCost = 12000;
    if (newMission.focus === "high_potential") baseCost *= 1.5;
    if (newMission.focus === "specific_position") baseCost *= 1.2;

    const cost = Math.round(baseCost * (newMission.duration / 30));

    // Create new mission
    const newMissionObj: ScoutingMission = {
      id: Math.max(...scoutingMissions.map((m) => m.id)) + 1,
      region: newMission.region,
      country: newMission.country,
      focus: newMission.focus as any,
      positions: newMission.positions,
      ageRange: newMission.ageRange,
      duration: newMission.duration,
      cost: cost,
      startDate: new Date().toISOString().split("T")[0],
      progress: 0,
      status: "active",
    };

    setScoutingMissions([...scoutingMissions, newMissionObj]);
    setShowNewMissionDialog(false);

    // Reset form
    setNewMission({
      region: "Europe",
      country: "",
      focus: "general",
      positions: [],
      ageRange: [15, 18] as [number, number],
      duration: 30,
    });

    toast({
      title: "Scouting Mission Created",
      description: `Your scouts have been sent to ${newMission.country} to find young talent.`,
    });
  };

  return (
    <Dialog open={showNewMissionDialog} onOpenChange={setShowNewMissionDialog}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Scouting Mission
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Scouting Mission</DialogTitle>
          <DialogDescription>
            Send your scouts to find young talent around the world
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="region" className="text-right">
              Region
            </Label>
            <Select
              value={newMission.region}
              onValueChange={(value) =>
                setNewMission({ ...newMission, region: value, country: "" })
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                {regions.map((region) => (
                  <SelectItem key={region.id} value={region.id}>
                    {region.id}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="country" className="text-right">
              Country
            </Label>
            <Select
              value={newMission.country}
              onValueChange={(value) =>
                setNewMission({ ...newMission, country: value })
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                {regions
                  .find((r) => r.id === newMission.region)
                  ?.countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="focus" className="text-right">
              Focus
            </Label>
            <Select
              value={newMission.focus}
              onValueChange={(value) =>
                setNewMission({ ...newMission, focus: value })
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select focus" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Scouting</SelectItem>
                <SelectItem value="specific_position">
                  Specific Positions
                </SelectItem>
                <SelectItem value="high_potential">High Potential</SelectItem>
                <SelectItem value="physical">Physical Attributes</SelectItem>
                <SelectItem value="technical">Technical Attributes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {newMission.focus === "specific_position" && (
            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right pt-2">Positions</Label>
              <div className="col-span-3 grid grid-cols-3 gap-2">
                {positions.map((position) => (
                  <div key={position} className="flex items-center space-x-2">
                    <Checkbox
                      id={`position-${position}`}
                      checked={newMission.positions.includes(position)}
                      onCheckedChange={() => togglePosition(position)}
                    />
                    <label
                      htmlFor={`position-${position}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {position}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Age Range</Label>
            <div className="col-span-3">
              <div className="flex justify-between mb-2">
                <span className="text-sm">{newMission.ageRange[0]} years</span>
                <span className="text-sm">{newMission.ageRange[1]} years</span>
              </div>
              <Slider
                value={[newMission.ageRange[0], newMission.ageRange[1]]}
                min={15}
                max={21}
                step={1}
                onValueChange={(value) =>
                  setNewMission({
                    ...newMission,
                    ageRange: [value[0], value[1]] as [number, number],
                  })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="duration" className="text-right">
              Duration
            </Label>
            <Select
              value={newMission.duration.toString()}
              onValueChange={(value) =>
                setNewMission({
                  ...newMission,
                  duration: Number.parseInt(value),
                })
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="14">2 Weeks</SelectItem>
                <SelectItem value="21">3 Weeks</SelectItem>
                <SelectItem value="30">1 Month</SelectItem>
                <SelectItem value="45">6 Weeks</SelectItem>
                <SelectItem value="60">2 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="col-span-4 p-4 bg-amber-50 border border-amber-200 rounded-md">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-amber-600 mr-2 mt-0.5" />
              <div>
                <h4 className="font-medium text-amber-800 mb-1">
                  Estimated Cost
                </h4>
                <p className="text-sm text-amber-700">
                  This scouting mission will cost approximately £
                  {(() => {
                    let baseCost = 10000;
                    if (newMission.region === "South America") baseCost = 15000;
                    if (newMission.region === "Africa") baseCost = 12000;
                    if (newMission.focus === "high_potential") baseCost *= 1.5;
                    if (newMission.focus === "specific_position")
                      baseCost *= 1.2;

                    return Math.round(
                      baseCost * (newMission.duration / 30),
                    ).toLocaleString();
                  })()}
                  . This will be deducted from your youth scouting budget.
                </p>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleCreateMission}>Create Mission</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewScoutingDialog;
