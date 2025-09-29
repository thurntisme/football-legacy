"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DialogHeader,
  DialogFooter,
  DialogCloseBtn,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { availableStaffList, staffList } from "@/mock/staff";
import { StaffMember } from "@/types/staff";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { CheckCheck, Megaphone } from "lucide-react";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import StaffDetail from "./staff-detail";
import { getAttributeColor, getReputationColor } from "@/lib/staff";

const HireStaff = () => {
  const [currentStaff, setCurrentStaff] = useState<StaffMember[]>(
    staffList as StaffMember[],
  );
  const [availableStaff, setAvailableStaff] = useState<StaffMember[]>(
    availableStaffList as StaffMember[],
  );
  const [hireCategory, setHireCategory] = useState<string>("all");
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [selectedHireStaff, setSelectedHireStaff] =
    useState<StaffMember | null>(null);

  const getFilteredAvailableStaff = () => {
    if (hireCategory === "all") {
      return availableStaff;
    } else {
      return availableStaff.filter((staff) => {
        if (hireCategory === "tactical") {
          return ["Tactical Manager", "Assistant Manager"].includes(staff.role);
        } else if (hireCategory === "technical") {
          return [
            "Technical Coach",
            "Technical Manager",
            "Set-Piece Coach",
            "Attacking Coach",
          ].includes(staff.role);
        } else if (hireCategory === "fitness") {
          return [
            "Fitness Manager",
            "Fitness Coach",
            "Performance Director",
          ].includes(staff.role);
        } else if (hireCategory === "youth") {
          return ["Youth Development Manager", "Youth Scout"].includes(
            staff.role,
          );
        } else if (hireCategory === "medical") {
          return [
            "Head of Medical",
            "Head Physio",
            "Sports Scientist",
            "Nutritionist",
          ].includes(staff.role);
        } else if (hireCategory === "scouting") {
          return [
            "Director of Scouting",
            "Chief Scout",
            "Data Analysis Director",
          ].includes(staff.role);
        }
        return true;
      });
    }
  };

  const handleCloseHireDialog = () => {
    console.log("handleCloseHirePopup");
    setSelectedStaff(null);
  };

  const handleHireStaff = (staff: StaffMember) => {
    // Add to current staff
    const updatedStaff = { ...staff, hired: true, contractYears: 2 };
    setCurrentStaff([...currentStaff, updatedStaff]);

    // Remove from available staff
    setAvailableStaff(availableStaff.filter((s) => s.id !== staff.id));

    // Close dialog
    setSelectedStaff(null);

    toast({
      title: "Staff Hired",
      description: `${staff.name} has joined your staff team.`,
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" onValueChange={setHireCategory}>
        <TabsList className="grid grid-cols-7">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="tactical">Tactical</TabsTrigger>
          <TabsTrigger value="technical">Technical</TabsTrigger>
          <TabsTrigger value="fitness">Fitness</TabsTrigger>
          <TabsTrigger value="youth">Youth</TabsTrigger>
          <TabsTrigger value="medical">Medical</TabsTrigger>
          <TabsTrigger value="scouting">Scouting</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {getFilteredAvailableStaff().map((staff) => (
          <Card key={staff.id} className="overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="p-4 flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{staff.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {staff.role}
                    </p>
                  </div>
                  <Badge className={getReputationColor(staff.reputation)}>
                    {staff.reputation.charAt(0).toUpperCase() +
                      staff.reputation.slice(1)}
                  </Badge>
                </div>

                <div className="mt-3 space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Nationality:</span>
                    <span>{staff.nationality}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Age:</span>
                    <span>{staff.age}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Salary:</span>
                    <span className="font-medium">
                      £{staff.salary.toLocaleString()}/week
                    </span>
                  </div>
                  {staff.specialty && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Specialty:</span>
                      <span>{staff.specialty}</span>
                    </div>
                  )}
                </div>

                <div className="mt-4 flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedStaff(staff)}
                      >
                        View Profile
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>Staff Profile</DialogTitle>
                        <DialogDescription>
                          View detailed information about this staff member
                        </DialogDescription>
                      </DialogHeader>
                      {selectedStaff && (
                        <StaffDetail selectedStaff={selectedStaff} />
                      )}
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        onClick={() => setSelectedHireStaff(staff)}
                      >
                        Hire
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Hire Staff Member</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to hire{" "}
                          {selectedHireStaff?.name} as your{" "}
                          {selectedHireStaff?.role}?
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <div className="flex justify-between mb-2">
                          <span>Salary:</span>
                          <span className="font-bold">
                            £{selectedHireStaff?.salary.toLocaleString()}/week
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Contract Length:</span>
                          <span className="font-bold">2 years</span>
                        </div>
                      </div>
                      <DialogFooter>
                        <DialogCloseBtn />
                        <Button
                          onClick={() =>
                            selectedHireStaff &&
                            handleHireStaff(selectedHireStaff)
                          }
                        >
                          <CheckCheck className="w-4 h-4" />
                          Confirm Hire
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div className="p-4 bg-muted md:w-48 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-medium mb-2">Key Attributes</h4>
                  <div className="space-y-1">
                    {Object.entries(staff.attributes)
                      .sort(([, a], [, b]) => b - a)
                      .slice(0, 3)
                      .map(([key, value]) => (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="capitalize">{key}:</span>
                          <span className={getAttributeColor(value)}>
                            {value}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-1">Top Benefit</h4>
                  <p className="text-xs">{staff.benefits[0]}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {getFilteredAvailableStaff().length === 0 && (
        <div className="text-center py-8">
          <Megaphone className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
          <h3 className="text-lg font-medium mb-1">No Staff Available</h3>
          <p className="text-muted-foreground">
            There are no staff available in this category.
          </p>
        </div>
      )}
    </div>
  );
};

export default HireStaff;
