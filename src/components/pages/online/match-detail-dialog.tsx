import React, {
  AwaitedReactNode,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
} from "react";

import { Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { MatchDetail } from "@/types/match";

type Props = {
  matchDetailDialogOpen: boolean;
  setMatchDetailDialogOpen: (open: boolean) => void;
  selectedMatch: MatchDetail | null;
};

const MatchDetailDialog = ({
  matchDetailDialogOpen,
  setMatchDetailDialogOpen,
  selectedMatch,
}: Props) => {
  return (
    <Dialog
      open={matchDetailDialogOpen}
      onOpenChange={setMatchDetailDialogOpen}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Match Details</DialogTitle>
          <DialogDescription>
            {selectedMatch?.date} - {selectedMatch?.opponentTeam}
          </DialogDescription>
        </DialogHeader>

        {selectedMatch && (
          <div className="space-y-4">
            <div className="flex justify-center items-center">
              <div className="text-center">
                <div className="font-medium">Your Team</div>
              </div>

              <div className="mx-8 text-center">
                <div className="text-3xl font-bold mb-2">
                  {selectedMatch.score}
                </div>
                <Badge
                  variant={
                    selectedMatch.result === "win"
                      ? "default"
                      : selectedMatch.result === "loss"
                        ? "destructive"
                        : "outline"
                  }
                >
                  {selectedMatch.result === "win"
                    ? "Victory"
                    : selectedMatch.result === "loss"
                      ? "Defeat"
                      : "Draw"}
                </Badge>
              </div>

              <div className="text-center">
                <div className="font-medium">{selectedMatch.opponentTeam}</div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-medium">Match Stats</h3>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>{selectedMatch.details.possession.home}%</span>
                  <span>Possession</span>
                  <span>{selectedMatch.details.possession.away}%</span>
                </div>
                <div className="flex h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="bg-blue-500"
                    style={{
                      width: `${selectedMatch.details.possession.home}%`,
                    }}
                  />
                  <div
                    className="bg-red-500"
                    style={{
                      width: `${selectedMatch.details.possession.away}%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>{selectedMatch.details.shots.home}</span>
                  <span>Shots</span>
                  <span>{selectedMatch.details.shots.away}</span>
                </div>
                <div className="flex h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="bg-blue-500"
                    style={{
                      width: `${
                        (selectedMatch.details.shots.home /
                          (selectedMatch.details.shots.home +
                            selectedMatch.details.shots.away || 1)) *
                        100
                      }%`,
                    }}
                  />
                  <div
                    className="bg-red-500"
                    style={{
                      width: `${
                        (selectedMatch.details.shots.away /
                          (selectedMatch.details.shots.home +
                            selectedMatch.details.shots.away || 1)) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>{selectedMatch.details.shotsOnTarget.home}</span>
                  <span>Shots on Target</span>
                  <span>{selectedMatch.details.shotsOnTarget.away}</span>
                </div>
                <div className="flex h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="bg-blue-500"
                    style={{
                      width: `${
                        (selectedMatch.details.shotsOnTarget.home /
                          (selectedMatch.details.shotsOnTarget.home +
                            selectedMatch.details.shotsOnTarget.away || 1)) *
                        100
                      }%`,
                    }}
                  />
                  <div
                    className="bg-red-500"
                    style={{
                      width: `${
                        (selectedMatch.details.shotsOnTarget.away /
                          (selectedMatch.details.shotsOnTarget.home +
                            selectedMatch.details.shotsOnTarget.away || 1)) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Scorers</h4>
                <div className="space-y-2">
                  <div>
                    <h5 className="text-sm font-medium">Your Team</h5>
                    {selectedMatch.details.scorers.home.length > 0 ? (
                      <ul className="list-disc list-inside">
                        {selectedMatch.details.scorers.home.map(
                          (
                            scorer:
                              | string
                              | number
                              | bigint
                              | boolean
                              | ReactElement<
                                  any,
                                  string | JSXElementConstructor<any>
                                >
                              | Iterable<ReactNode>
                              | ReactPortal
                              | Promise<AwaitedReactNode>
                              | null
                              | undefined,
                            index: Key | null | undefined,
                          ) => (
                            <li key={index} className="text-sm">
                              {scorer}
                            </li>
                          ),
                        )}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">No goals</p>
                    )}
                  </div>

                  <div>
                    <h5 className="text-sm font-medium">
                      {selectedMatch.opponentTeam}
                    </h5>
                    {selectedMatch.details.scorers.away.length > 0 ? (
                      <ul className="list-disc list-inside">
                        {selectedMatch.details.scorers.away.map(
                          (scorer: string, index: number) => (
                            <li key={index} className="text-sm">
                              {scorer}
                            </li>
                          ),
                        )}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">No goals</p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Cards</h4>
                <div className="space-y-2">
                  <div>
                    <h5 className="text-sm font-medium">Your Team</h5>
                    {selectedMatch.details.cards.home.length > 0 ? (
                      <ul className="list-disc list-inside">
                        {selectedMatch.details.cards.home.map(
                          (
                            card:
                              | string
                              | number
                              | bigint
                              | boolean
                              | ReactElement<
                                  any,
                                  string | JSXElementConstructor<any>
                                >
                              | Iterable<ReactNode>
                              | ReactPortal
                              | Promise<AwaitedReactNode>
                              | null
                              | undefined,
                            index: Key | null | undefined,
                          ) => (
                            <li key={index} className="text-sm">
                              {card}
                            </li>
                          ),
                        )}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">No cards</p>
                    )}
                  </div>

                  <div>
                    <h5 className="text-sm font-medium">
                      {selectedMatch.opponentTeam}
                    </h5>
                    {selectedMatch.details.cards.away.length > 0 ? (
                      <ul className="list-disc list-inside">
                        {selectedMatch.details.cards.away.map(
                          (
                            card:
                              | string
                              | number
                              | bigint
                              | boolean
                              | ReactElement<
                                  any,
                                  string | JSXElementConstructor<any>
                                >
                              | Iterable<ReactNode>
                              | ReactPortal
                              | Promise<AwaitedReactNode>
                              | null
                              | undefined,
                            index: Key | null | undefined,
                          ) => (
                            <li key={index} className="text-sm">
                              {card}
                            </li>
                          ),
                        )}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">No cards</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-1">Team Rating</h4>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-amber-500 mr-1" />
                  <span>{selectedMatch.details.rating.home}</span>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-1">Opponent Rating</h4>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-amber-500 mr-1" />
                  <span>{selectedMatch.details.rating.away}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button onClick={() => setMatchDetailDialogOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MatchDetailDialog;
