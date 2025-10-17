import React, { useState } from "react";

import { Check, Plus } from "lucide-react";

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
import { countries, positionGroups, regions } from "@/constants/scouting";
import { toast } from "@/hooks/use-toast";
import { StaffMember } from "@/types/staff";

type Props = {
  isOpen: boolean;
  onDialogOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  availableStaff: StaffMember[];
};

const initAssignment = {
  region: "",
  country: "",
  focus: "young_talents",
  ageRange: [16, 23] as [number, number],
  positionGroups: [] as string[],
  duration: "1",
  scoutId: 0,
};

const AssignmentDialog = ({
  isOpen,
  onDialogOpenChange,
  availableStaff,
}: Props) => {
  const [newAssignment, setNewAssignment] = useState(initAssignment);

  const onSelectStaff = (staffId: string) => {
    const staff = availableStaff.find((s) => s.id === +staffId);
    if (staff) {
      setNewAssignment({
        ...newAssignment,
        scoutId: +staffId,
      });
    }
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

  const onCreateAssignment = () => {
    onDialogOpenChange(false);
    toast({
      title: "Assignment created",
      description: "Your new scouting assignment has been created",
    });
    setNewAssignment(initAssignment);
  };

  const onOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setNewAssignment(initAssignment);
    }
    onDialogOpenChange(isOpen);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
            <Select onValueChange={(value) => onSelectStaff(value)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select scout" />
              </SelectTrigger>
              <SelectContent>
                {availableStaff.length &&
                  availableStaff.map((staff: StaffMember) => (
                    <SelectItem key={staff.id} value={staff.id.toString()}>
                      {staff.name}
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

          {newAssignment?.region && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="country" className="text-right">
                Country
              </Label>
              <Select
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
                    newAssignment?.region as keyof typeof countries
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
                <SelectItem value="young_talents">Young Talents</SelectItem>
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
                  {newAssignment?.ageRange[0] || 0} years
                </span>
                <span className="text-sm">
                  {newAssignment?.ageRange[1] || 0} years
                </span>
              </div>
              <Slider
                value={[newAssignment.ageRange[0], newAssignment.ageRange[1]]}
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
              <p className="text-xs text-muted-foreground">
                No selection means all positions will be scouted
              </p>
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
                <SelectItem value="1">1 Day</SelectItem>
                <SelectItem value="5">5 Days</SelectItem>
                <SelectItem value="7">7 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={onCreateAssignment}
            disabled={newAssignment === initAssignment}
          >
            <Check className="w-4 h-4" />
            Create Assignment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssignmentDialog;
