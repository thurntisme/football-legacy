import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Goal,
  Sparkles,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import React from "react";
import { IMatch } from "@/types/common";

type Props = {
  selectedMatch: IMatch;
};

const MatchReportSummary = ({ selectedMatch }: Props) => {
  return (
    <div className="space-y-4">
      <div className="bg-muted/50 p-4 rounded-lg">
        <h3 className="font-medium mb-2">Match Summary</h3>
        <p className="text-muted-foreground text-sm">
          {selectedMatch.homeTeam}{" "}
          {(selectedMatch.result === "win"
            ? "W"
            : selectedMatch.result === "loss"
              ? "L"
              : "D") === "W"
            ? "secured a convincing victory"
            : selectedMatch.result === "loss"
              ? "suffered a defeat"
              : "battled to a draw"}{" "}
          against {selectedMatch.awayTeam} in this {selectedMatch.competition}{" "}
          match.
          {(selectedMatch.result === "win"
            ? "W"
            : selectedMatch.result === "loss"
              ? "L"
              : "D") === "W"
            ? " Your team dominated possession and created numerous chances throughout the game."
            : selectedMatch.result === "loss"
              ? " Despite some good moments, your team struggled to contain the opposition attack."
              : " Both teams had their moments in a closely contested match."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Key Performers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Star className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium">Player of the Match</div>
                  <div className="text-sm text-muted-foreground">
                    John Smith - 9.2 Rating
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Goal className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium">Top Scorer</div>
                  <div className="text-sm text-muted-foreground">
                    Michael Johnson - 2 Goals
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium">Most Assists</div>
                  <div className="text-sm text-muted-foreground">
                    David Williams - 2 Assists
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Manager's Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <div className="font-medium">What Worked Well</div>
                  <div className="text-sm text-muted-foreground">
                    Counter-attacking play created numerous chances
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                <div>
                  <div className="font-medium">Areas for Improvement</div>
                  <div className="text-sm text-muted-foreground">
                    Defensive organization on set pieces needs work
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                <div>
                  <div className="font-medium">Injury Concerns</div>
                  <div className="text-sm text-muted-foreground">
                    James Wilson (Hamstring) - 2 weeks
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Match Highlights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="w-16 text-center">
                12'
              </Badge>
              <div className="flex-1">
                <div className="font-medium">
                  GOAL! {selectedMatch.homeTeam}
                </div>
                <div className="text-sm text-muted-foreground">
                  Michael Johnson scores from close range after a great cross
                  from David Williams
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="w-16 text-center">
                34'
              </Badge>
              <div className="flex-1">
                <div className="font-medium">
                  GOAL! {selectedMatch.homeTeam}
                </div>
                <div className="text-sm text-muted-foreground">
                  Michael Johnson doubles the lead with a powerful header from a
                  corner
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="w-16 text-center">
                56'
              </Badge>
              <div className="flex-1">
                <div className="font-medium">
                  GOAL! {selectedMatch.awayTeam}
                </div>
                <div className="text-sm text-muted-foreground">
                  Carlos Mendez pulls one back for the visitors with a
                  long-range strike
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="w-16 text-center">
                78'
              </Badge>
              <div className="flex-1">
                <div className="font-medium">
                  GOAL! {selectedMatch.homeTeam}
                </div>
                <div className="text-sm text-muted-foreground">
                  Robert Thompson seals the win with a tap-in after great team
                  play
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MatchReportSummary;
