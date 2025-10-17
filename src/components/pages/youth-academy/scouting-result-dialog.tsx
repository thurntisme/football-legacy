import React from "react";

import { Search, Star } from "lucide-react";

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { getSignChanceBadge, getStatusBadge } from "@/lib/youth-academy";

type Props = {
  selectedMission: any;
  showResultsDialog: boolean;
  setShowResultsDialog: (value: boolean) => void;
  approachPlayer: (playerId: string) => void;
};

const ScoutingResultDialog = ({
  selectedMission,
  showResultsDialog,
  setShowResultsDialog,
  approachPlayer,
}: Props) => {
  return (
    <Dialog open={showResultsDialog} onOpenChange={setShowResultsDialog}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        {selectedMission && (
          <>
            <DialogHeader>
              <DialogTitle>
                Scouting Results: {selectedMission.country}
              </DialogTitle>
              <DialogDescription>
                Players discovered during your scouting mission in{" "}
                {selectedMission.country}, {selectedMission.region}
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <div className="grid grid-cols-1 gap-4">
                {selectedMission.results &&
                selectedMission.results.length > 0 ? (
                  selectedMission.results.map((result) => (
                    <Card key={result.id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <CardTitle className="text-lg">
                            {result.playerName}
                          </CardTitle>
                          <div className="flex gap-2">
                            {getStatusBadge(result.status)}
                            {getSignChanceBadge(result.signChance)}
                          </div>
                        </div>
                        <CardDescription>
                          {result.age} years • {result.position} •{" "}
                          {result.nationality} • {result.club}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <div className="text-sm text-muted-foreground mb-1">
                              Potential
                            </div>
                            <div className="flex">
                              {Array(5)
                                .fill(0)
                                .map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < Math.round(result.potential / 20) ? "fill-amber-400 text-amber-400" : "text-muted"}`}
                                  />
                                ))}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground mb-1">
                              Sign Cost
                            </div>
                            <div className="font-medium">
                              £{result.signCost.toLocaleString()}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Technical</span>
                              <span>{result.attributes.technical}</span>
                            </div>
                            <Progress
                              value={result.attributes.technical}
                              className="h-1"
                            />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Mental</span>
                              <span>{result.attributes.mental}</span>
                            </div>
                            <Progress
                              value={result.attributes.mental}
                              className="h-1"
                            />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Physical</span>
                              <span>{result.attributes.physical}</span>
                            </div>
                            <Progress
                              value={result.attributes.physical}
                              className="h-1"
                            />
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        {result.status === "pending" ? (
                          <Button
                            className="w-full"
                            onClick={() => approachPlayer(result)}
                          >
                            Approach Player
                          </Button>
                        ) : result.status === "approached" ? (
                          <Button
                            className="w-full"
                            onClick={() => approachPlayer(result)}
                          >
                            Complete Signing
                          </Button>
                        ) : result.status === "signed" ? (
                          <Button variant="outline" className="w-full" disabled>
                            Player Signed
                          </Button>
                        ) : (
                          <Button variant="outline" className="w-full" disabled>
                            Approach Rejected
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8 border rounded-md bg-muted/20">
                    <Search className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                    <h3 className="text-lg font-medium mb-1">
                      No Players Found
                    </h3>
                    <p className="text-muted-foreground">
                      Your scouts didn't find any suitable players during this
                      mission.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ScoutingResultDialog;
