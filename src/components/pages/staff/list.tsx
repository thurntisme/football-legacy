"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DialogHeader,
  DialogFooter,
  DialogClose,
  DialogCloseBtn,
} from "@/components/ui/dialog";
import { staffList } from "@/mock/staff";
import { StaffMember, StaffType } from "@/types/staff";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Trash2, Users, Link, UserX } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { getFilteredCurrentStaff, getReputationColor } from "@/lib/staff";
import StaffDetail from "./staff-detail";

const StaffList = ({ type }: { type: StaffType }) => {
  const [currentStaff, setCurrentStaff] = useState<StaffMember[]>(
    staffList as StaffMember[],
  );
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [selectedFireStaff, setSelectedFireStaff] =
    useState<StaffMember | null>(null);

  const filteredStaff = getFilteredCurrentStaff(currentStaff, type);

  const handleFireStaff = (staff: StaffMember) => {
    // Remove from current staff
    setCurrentStaff(currentStaff.filter((s) => s.id !== staff.id));

    // Close dialog
    setSelectedFireStaff(null);

    toast({
      title: "Staff Fired",
      description: `${staff.name} has been removed from your staff team.`,
    });
  };

  return (
    <>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredStaff.map((staff) => (
            <Card key={staff.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base">{staff.name}</CardTitle>
                    <CardDescription>{staff.role}</CardDescription>
                  </div>
                  <Badge className={getReputationColor(staff.reputation)}>
                    {staff.reputation.charAt(0).toUpperCase() +
                      staff.reputation.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Nationality:</span>
                    <span>{staff.nationality}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Age:</span>
                    <span>{staff.age}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Salary:</span>
                    <span>£{staff.salary.toLocaleString()}/week</span>
                  </div>
                  {staff.specialty && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Specialty:</span>
                      <span>{staff.specialty}</span>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedStaff(staff)}
                    >
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Staff Details</DialogTitle>
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
                      variant="ghost"
                      size="sm"
                      className="text-red-500"
                      onClick={() => setSelectedFireStaff(staff)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Fire Staff Member</DialogTitle>
                      <DialogDescription>
                        Firing this staff member will remove them from your team
                        immediately.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <p className="text-muted-foreground">
                        Are you sure you want to fire{" "}
                        <span className="font-medium">
                          {selectedFireStaff?.name}
                        </span>
                        ? This action cannot be undone.
                      </p>
                    </div>
                    <DialogFooter>
                      <DialogCloseBtn />
                      <Button
                        variant="destructive"
                        onClick={() =>
                          selectedFireStaff &&
                          handleFireStaff(selectedFireStaff)
                        }
                      >
                        <UserX className="h-4 w-4" />
                        Fire Staff Member
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredStaff.length === 0 && (
          <div className="text-center py-8">
            <Users className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
            <h3 className="text-lg font-medium mb-1">No Staff Found</h3>
            <p className="text-muted-foreground mb-4">
              You don't have any staff in this category.
            </p>
            <Button asChild>
              <Link href="/game/staff?tab=hire">Hire Staff</Link>
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default StaffList;
