"use client";

import React, { useMemo, useState } from "react";

import { CheckCheck, Megaphone, UserCheck, UserSearchIcon } from "lucide-react";

import ContentWrapper from "@/components/common/content-wrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
import {
  getAttributeColor,
  getReputationColor,
  getRoleLabel,
} from "@/lib/staff";
import { StaffMember } from "@/types/staff";
import { useQuery } from "@tanstack/react-query";

import CategorySelector from "./category-selector";
import StaffDetail from "./staff-detail";

const HireStaff = () => {
  const [selectedCategory, setSelectedCategory] = useState<StaffCategoryEnum>(
    StaffCategoryEnum.ALL,
  );
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [selectedHireStaff, setSelectedHireStaff] =
    useState<StaffMember | null>(null);

  const {
    data: staffList,
    isLoading,
    error,
    refetch,
  } = useQuery<StaffMember[] | null>({
    queryKey: ["available-staff-list"],
    queryFn: async () => {
      const { data } = await internalApi.get("/staff/available");
      return data;
    },
  });

  const availableStaff = useMemo(() => {
    if (!staffList) return [];
    return staffList.filter((staff) => {
      if (selectedCategory === StaffCategoryEnum.ALL) {
        return true;
      } else {
        return staff.role === selectedCategory;
      }
    });
  }, [selectedCategory, staffList]);

  const handleHireStaff = (staff: StaffMember) => {
    toast({
      title: "Staff Hired",
      description: `${staff.name} has joined your staff team.`,
    });
  };

  return (
    <ContentWrapper isLoading={isLoading} error={error} onRefetch={refetch}>
      <div className="space-y-6">
        <CategorySelector
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        {availableStaff.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableStaff.map((staff) => (
              <Card key={staff.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="p-4 flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold">{staff.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {getRoleLabel(staff.role)}
                        </p>
                      </div>
                      <Badge
                        className={`${getReputationColor(staff.reputation)} capitalize`}
                      >
                        {staff.reputation}
                      </Badge>
                    </div>

                    <div className="mt-3 space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Nationality:
                        </span>
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
                          <span className="text-muted-foreground">
                            Specialty:
                          </span>
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
                            <UserSearchIcon className="h-4 w-4" />
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
                            Hire <UserCheck className="h-4 w-4" />
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
                                £{selectedHireStaff?.salary.toLocaleString()}
                                /week
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
                      <h4 className="text-sm font-medium mb-2">
                        Key Attributes
                      </h4>
                      <div className="space-y-1">
                        {Object.entries(staff.attributes)
                          .sort(([, a], [, b]) => b - a)
                          .slice(0, 3)
                          .map(([key, value]) => (
                            <div
                              key={key}
                              className="flex justify-between text-sm"
                            >
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
        ) : (
          <div className="text-center py-8">
            <Megaphone className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
            <h3 className="text-lg font-medium mb-1">No Staff Available</h3>
            <p className="text-muted-foreground">
              There are no staff available in this category.
            </p>
          </div>
        )}
      </div>
    </ContentWrapper>
  );
};

export default HireStaff;
