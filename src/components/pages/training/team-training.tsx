"use client";

import React, { useEffect, useState } from "react";

import { Check } from "lucide-react";

import ContentWrapper from "@/components/common/content-wrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/hooks/use-toast";
import { internalApi } from "@/lib/api/internal";
import { ITeamTraining } from "@/types/training";
import { useQuery } from "@tanstack/react-query";

type Props = {};

const TeamTraining = (props: Props) => {
  const [teamFocus, setTeamFocus] = useState<ITeamTraining[]>([]);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["training-team-program"],
    queryFn: async () => {
      const res = await internalApi.get("/training/team");
      return res.data?.data || [];
    },
  });

  useEffect(() => {
    if (data) {
      setTeamFocus(data);
    }
  }, [data]);

  const updateTeamFocusArea = (id: string, level: number) => {
    setTeamFocus(
      teamFocus.map((area) =>
        area.id === id ? { ...area, currentLevel: level } : area,
      ),
    );
  };

  const saveTeamFocus = () => {
    toast({
      title: "Team focus areas saved",
      description: "Your team's training focus areas have been updated.",
    });
  };

  return (
    <div className="flex flex-col space-y-6">
      <ContentWrapper isLoading={isLoading} error={error} onRefetch={refetch}>
        <Card>
          <CardHeader>
            <CardTitle>Team Training Focus Areas</CardTitle>
            <CardDescription>
              Allocate training time to different tactical aspects of your
              team's play
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {teamFocus.length
              ? teamFocus.map((area: ITeamTraining) => (
                  <div key={area.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="ml-2">
                          <h4 className="text-sm font-medium">{area.name}</h4>
                          <p className="text-xs text-muted-foreground">
                            {area.description}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline">{area.currentLevel}%</Badge>
                    </div>
                    <Slider
                      value={[area.currentLevel]}
                      min={0}
                      max={100}
                      step={5}
                      onValueChange={(value) =>
                        updateTeamFocusArea(area.id, value[0])
                      }
                    />
                  </div>
                ))
              : null}

            <Button onClick={saveTeamFocus} className="mt-4">
              <Check className="h-4 w-4" />
              Save Team Focus
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Training Recommendations</CardTitle>
            <CardDescription>
              Based on your team's strengths and upcoming fixtures
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
              <h4 className="font-medium text-yellow-800 mb-1">
                Upcoming Match Preparation
              </h4>
              <p className="text-sm text-yellow-700">
                Your next opponent favors a high-pressing style. Consider
                increasing focus on counter-attacking and quick transitions.
              </p>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
              <h4 className="font-medium text-blue-800 mb-1">Team Weakness</h4>
              <p className="text-sm text-blue-700">
                Set piece defense is below average (60%). Allocate more training
                time to set pieces to improve defensive organization.
              </p>
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded-md">
              <h4 className="font-medium text-green-800 mb-1">Team Strength</h4>
              <p className="text-sm text-green-700">
                Counter-attacking is your team's strongest area (78%). Maintain
                this focus to capitalize on your team's natural strengths.
              </p>
            </div>
          </CardContent>
        </Card>
      </ContentWrapper>
    </div>
  );
};

export default TeamTraining;
