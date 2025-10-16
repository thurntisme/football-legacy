"use client";

import React, { useMemo, useState } from "react";

import { Info, Trash2, UserSearchIcon, UserX, Users } from "lucide-react";

import ContentWrapper from "@/components/common/content-wrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DialogCloseBtn,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { StaffCategoryEnum } from "@/constants/staff";
import { toast } from "@/hooks/use-toast";
import { internalApi } from "@/lib/api/internal";
import { getReputationColor, getRoleLabel } from "@/lib/staff";
import { StaffMember } from "@/types/staff";
import { useQuery } from "@tanstack/react-query";

import CategorySelector from "./category-selector";
import StaffDetail from "./staff-detail";

type props = {
  onSelectHireTab: () => void;
};

const StaffList = ({ onSelectHireTab }: props) => {
  const [selectedCategory, setSelectedCategory] = useState<StaffCategoryEnum>(
    StaffCategoryEnum.ALL,
  );
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [selectedFireStaff, setSelectedFireStaff] =
    useState<StaffMember | null>(null);

  const {
    data: staffList,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["own-staff-list"],
    queryFn: async () => {
      const res = await internalApi.get("/staff/own");
      return res.data?.data || [];
    },
  });

  const filteredStaff = useMemo(() => {
    if (!staffList) return [];
    return staffList.filter((staff: StaffMember) => {
      if (selectedCategory === StaffCategoryEnum.ALL) {
        return true;
      } else {
        return staff.role === selectedCategory;
      }
    });
  }, [selectedCategory, staffList]);

  const handleFireStaff = (staff: StaffMember) => {
    setSelectedFireStaff(null);

    toast({
      title: "Staff Fired",
      description: `${staff.name} has been removed from your staff team.`,
    });
  };

  return (
    <ContentWrapper isLoading={isLoading} error={error} onRefetch={refetch}>
      <CategorySelector
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      {filteredStaff && filteredStaff.length ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredStaff.map((staff: StaffMember) => (
            <Card key={staff.id} className="overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <CardTitle className="text-base">{staff.name}</CardTitle>
                    {getRoleLabel(staff.role)}
                  </div>
                  <Badge className={getReputationColor(staff.reputation)}>
                    {staff.reputation.charAt(0).toUpperCase() +
                      staff.reputation.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-4">
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
                      View Detail
                      <Info className="h-4 w-4" />
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
      ) : (
        <div className="text-center py-8">
          <Users className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
          <h3 className="text-lg font-medium mb-1">No Staff Found</h3>
          <p className="text-muted-foreground mb-4">
            You don't have any staff in this category.
          </p>
          <Button onClick={onSelectHireTab}>
            Hire Staff <UserSearchIcon className="h-4 w-4" />
          </Button>
        </div>
      )}
    </ContentWrapper>
  );
};

export default StaffList;
