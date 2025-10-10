import React from "react";

import { ChevronDown, ChevronUp, Power } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { IStadiumFacility } from "@/types/common";
import { Facility } from "@/types/stadium";

type Props = {
  facilities: Facility[] | undefined;
  handleToggleFacility: (facilityId: string) => void;
  handleUpgradeFacility: (facility: IStadiumFacility) => void;
  handleDowngradeFacility: (facility: IStadiumFacility) => void;
};

const StadiumFacility = ({
  facilities,
  handleToggleFacility,
  handleDowngradeFacility,
  handleUpgradeFacility,
}: Props) => {
  if (!facilities) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Facility Details</CardTitle>
        <CardDescription>
          Detailed information about each stadium facility
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {facilities.map((facility: Facility) => (
            <div key={facility.id} className="border-b pb-6 last:border-0">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <div className="mr-3 p-2 bg-primary/10 rounded-full">
                    {/* {facility.icon} */}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">{facility.name}</h3>
                    <p className="text-muted-foreground">
                      {facility.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor={`enable-${facility.id}`} className="mr-2">
                    Enabled
                  </Label>
                  <Switch
                    id={`enable-${facility.id}`}
                    checked={facility.enabled}
                    onCheckedChange={() => handleToggleFacility(facility.id)}
                  />
                </div>
              </div>

              {facility.enabled ? (
                <>
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span>
                        Current Level: {facility.currentLevel} /{" "}
                        {facility.maxLevel}
                      </span>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDowngradeFacility(facility)}
                          disabled={facility.currentLevel <= 1}
                        >
                          <ChevronDown className="w-4 mr-1" />
                          Downgrade
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleUpgradeFacility(facility)}
                          disabled={facility.currentLevel >= facility.maxLevel}
                        >
                          <ChevronUp className="w-4 mr-1" />
                          Upgrade
                        </Button>
                      </div>
                    </div>
                    <Progress
                      value={(facility.currentLevel / facility.maxLevel) * 100}
                      className="h-2"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">
                        Current Benefits (Level {facility.currentLevel})
                      </h4>
                      {facility.currentLevel > 0 && (
                        <div className="space-y-2">
                          <ul className="list-disc pl-5 space-y-1">
                            {facility.levels[
                              facility.currentLevel - 1
                            ].benefits.map((benefit, index) => (
                              <li key={index} className="text-sm">
                                {benefit}
                              </li>
                            ))}
                          </ul>
                          <div className="pt-2 space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Maintenance Cost:
                              </span>
                              <span>
                                £
                                {facility.levels[
                                  facility.currentLevel - 1
                                ].maintenanceCost.toLocaleString()}
                                /month
                              </span>
                            </div>
                            {facility.levels[facility.currentLevel - 1]
                              .income && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Income:
                                </span>
                                <span className="text-green-600">
                                  £
                                  {facility.levels[
                                    facility.currentLevel - 1
                                  ].income?.toLocaleString()}
                                  /match
                                </span>
                              </div>
                            )}
                            {facility.levels[facility.currentLevel - 1]
                              .capacity && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Capacity:
                                </span>
                                <span>
                                  {facility.levels[
                                    facility.currentLevel - 1
                                  ].capacity?.toLocaleString()}{" "}
                                  seats
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {facility.currentLevel < facility.maxLevel && (
                      <div>
                        <h4 className="font-medium mb-2">
                          Next Level Benefits (Level {facility.currentLevel + 1}
                          )
                        </h4>
                        <div className="space-y-2">
                          <ul className="list-disc pl-5 space-y-1">
                            {facility.levels[
                              facility.currentLevel
                            ].benefits.map((benefit, index) => (
                              <li key={index} className="text-sm">
                                {benefit}
                              </li>
                            ))}
                          </ul>
                          <div className="pt-2 space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Upgrade Cost:
                              </span>
                              <span className="font-medium">
                                £
                                {facility.levels[
                                  facility.currentLevel
                                ].cost.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                New Maintenance:
                              </span>
                              <span>
                                £
                                {facility.levels[
                                  facility.currentLevel
                                ].maintenanceCost.toLocaleString()}
                                /month
                              </span>
                            </div>
                            {facility.levels[facility.currentLevel].income && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  New Income:
                                </span>
                                <span className="text-green-600">
                                  £
                                  {facility.levels[
                                    facility.currentLevel
                                  ].income?.toLocaleString()}
                                  /match
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="py-4 text-center text-muted-foreground bg-muted/30 rounded-md">
                  <Power className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>This facility is currently disabled</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => handleToggleFacility(facility.id)}
                  >
                    Enable Facility
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StadiumFacility;
