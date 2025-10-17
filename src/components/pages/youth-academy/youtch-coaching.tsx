"use client";

import { useState } from "react";

import { Eye, FileBox, Plus, Search, User, X } from "lucide-react";

import ConfirmDialog from "@/components/common/confirm-dialog";
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
import { Progress } from "@/components/ui/progress";
import { internalApi } from "@/lib/api/internal";
import { StaffMember } from "@/types/staff";
import { useQuery } from "@tanstack/react-query";

import AssignmentDialog from "./assignment-dialog";

export default function YouthCoaching() {
  const [showNewAssignmentDialog, setShowNewAssignmentDialog] = useState(false);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["youth-academy-assignments-staff-list"],
    queryFn: async () => {
      const res = await internalApi.get("/youth-academy/assignments");
      return res.data?.data || [];
    },
  });

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
            <AssignmentDialog
              isOpen={showNewAssignmentDialog}
              onDialogOpenChange={setShowNewAssignmentDialog}
              availableStaff={data?.available || []}
            />
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
                          <div className="font-medium">
                            {assignment.focus &&
                              getFocusLabel(assignment.focus)}
                          </div>
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
                            years old
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">
                            Positions
                          </div>
                          <div className="font-medium">
                            {assignment?.positionGroups?.length
                              ? assignment?.positionGroups.join(", ")
                              : null}
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
                  <CardFooter className="flex gap-2">
                    {assignment.status === "completed" ? (
                      <>
                        <Button variant="outline" className="w-full">
                          <FileBox className="w-4 h-4" />
                          View Report
                        </Button>
                        <Button className="w-full">
                          <FileBox className="w-4 h-4" />
                          Renew
                        </Button>
                      </>
                    ) : (
                      <>
                        <ConfirmDialog
                          title="Cancel Scouting Assignment"
                          description={`Are you sure to cancel this scouting from staff ${assignment.name || ""}?`}
                        >
                          <Button variant="outline" className="w-full">
                            <X className="w-4 h-4" />
                            Cancel
                          </Button>
                        </ConfirmDialog>
                        <Button className="w-full">
                          <Eye className="w-4 h-4" />
                          View Detail
                        </Button>
                      </>
                    )}
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="text-center py-8 border rounded-md bg-muted/20 col-start-1 col-end-3">
                <Search className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                <h3 className="text-lg font-medium mb-1">
                  No Assignments Found
                </h3>
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
