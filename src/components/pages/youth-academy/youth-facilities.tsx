"use client";

import type React from "react";
import { useState } from "react";

import { ArrowUp, Loader2 } from "lucide-react";

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
import { Facility } from "@/types/youth-academy";
import { useQuery } from "@tanstack/react-query";

import FacilityUpgradeDialog from "./facility-upgrade-dialog";

export default function YouthFacilities() {
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(
    null,
  );
  const [upgradeDialogOpen, setUpgradeDialogOpen] = useState(false);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["youth-academy-facilities"],
    queryFn: async () => {
      const res = await internalApi.get("/youth-academy/facilities");
      return res.data?.data || [];
    },
  });

  // Handle facility upgrade
  const handleUpgradeFacility = (facility: Facility) => {
    setSelectedFacility(facility);
    setUpgradeDialogOpen(true);
  };

  // Get level badge
  const getLevelBadge = (level: number) => {
    switch (level) {
      case 1:
        return <Badge className="bg-red-500">Basic</Badge>;
      case 2:
        return <Badge className="bg-amber-500">Adequate</Badge>;
      case 3:
        return <Badge className="bg-blue-500">Good</Badge>;
      case 4:
        return <Badge className="bg-green-500">Excellent</Badge>;
      case 5:
        return <Badge className="bg-purple-500">State of the Art</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Get days remaining for upgrade
  const getDaysRemaining = (completionDate?: string) => {
    if (!completionDate) return "Unknown";

    const completion = new Date(completionDate);
    const now = new Date();
    const daysRemaining = Math.ceil(
      (completion.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
    );

    return daysRemaining > 0
      ? `${daysRemaining} days remaining`
      : "Completing today";
  };

  return (
    <ContentWrapper isLoading={isLoading} error={error} onRefetch={refetch}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data?.length &&
          data?.map((facility: Facility) => (
            <Card
              key={facility.id}
              className={facility.upgradeInProgress ? "border-blue-500/50" : ""}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle className="flex items-center">
                    <span>{facility.name}</span>
                  </CardTitle>
                  <div>{getLevelBadge(facility.level)}</div>
                </div>
                <CardDescription>{facility.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Current Level</span>
                      <span>
                        {facility.level} / {facility.maxLevel}
                      </span>
                    </div>
                    <Progress
                      value={(facility.level / facility.maxLevel) * 100}
                      className="h-2"
                    />
                  </div>

                  {facility.upgradeInProgress &&
                    facility.upgradeCompletionDate && (
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                        <div className="flex items-start">
                          <Loader2 className="h-5 w-5 text-blue-600 mr-2 mt-0.5 animate-spin" />
                          <div>
                            <h4 className="font-medium text-blue-800 mb-1">
                              Upgrade in Progress
                            </h4>
                            <p className="text-sm text-blue-700">
                              Upgrading to Level {facility.level + 1}.{" "}
                              {getDaysRemaining(facility.upgradeCompletionDate)}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                  {!facility.upgradeInProgress && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Benefits</h4>
                      <ul className="text-sm space-y-1">
                        {facility.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                {facility.upgradeInProgress ? (
                  <Button variant="outline" className="w-full" disabled>
                    Upgrade in Progress
                  </Button>
                ) : facility.level === facility.maxLevel ? (
                  <Button variant="outline" className="w-full" disabled>
                    Maximum Level Reached
                  </Button>
                ) : (
                  <Button
                    className="w-full"
                    onClick={() => handleUpgradeFacility(facility)}
                  >
                    <ArrowUp className="mr-2 h-4 w-4" />
                    Upgrade to Level {facility.level + 1} (£
                    {facility.upgradeCost.toLocaleString()})
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
      </div>

      <FacilityUpgradeDialog
        selectedFacility={selectedFacility}
        upgradeDialogOpen={upgradeDialogOpen}
        setUpgradeDialogOpen={setUpgradeDialogOpen}
      />
    </ContentWrapper>
  );
}
