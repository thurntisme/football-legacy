import React from "react";

import { Card, CardContent } from "@/components/ui/card";

const MatchReportStats = () => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="w-16 text-right font-medium">65%</div>
            <div className="flex-1 mx-4">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="bg-primary h-full"
                  style={{ width: "65%" }}
                ></div>
              </div>
            </div>
            <div className="w-16 font-medium">35%</div>
            <div className="w-24 text-center text-sm text-muted-foreground">
              Possession
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-16 text-right font-medium">18</div>
            <div className="flex-1 mx-4">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="bg-primary h-full"
                  style={{ width: "75%" }}
                ></div>
              </div>
            </div>
            <div className="w-16 font-medium">6</div>
            <div className="w-24 text-center text-sm text-muted-foreground">
              Shots
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-16 text-right font-medium">9</div>
            <div className="flex-1 mx-4">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="bg-primary h-full"
                  style={{ width: "82%" }}
                ></div>
              </div>
            </div>
            <div className="w-16 font-medium">2</div>
            <div className="w-24 text-center text-sm text-muted-foreground">
              On Target
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-16 text-right font-medium">7</div>
            <div className="flex-1 mx-4">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="bg-primary h-full"
                  style={{ width: "70%" }}
                ></div>
              </div>
            </div>
            <div className="w-16 font-medium">3</div>
            <div className="w-24 text-center text-sm text-muted-foreground">
              Corners
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-16 text-right font-medium">2</div>
            <div className="flex-1 mx-4">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="bg-primary h-full"
                  style={{ width: "40%" }}
                ></div>
              </div>
            </div>
            <div className="w-16 font-medium">3</div>
            <div className="w-24 text-center text-sm text-muted-foreground">
              Offsides
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-16 text-right font-medium">12</div>
            <div className="flex-1 mx-4">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="bg-primary h-full"
                  style={{ width: "60%" }}
                ></div>
              </div>
            </div>
            <div className="w-16 font-medium">8</div>
            <div className="w-24 text-center text-sm text-muted-foreground">
              Fouls
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-16 text-right font-medium">2</div>
            <div className="flex-1 mx-4">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="bg-primary h-full"
                  style={{ width: "50%" }}
                ></div>
              </div>
            </div>
            <div className="w-16 font-medium">2</div>
            <div className="w-24 text-center text-sm text-muted-foreground">
              Yellow Cards
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-16 text-right font-medium">0</div>
            <div className="flex-1 mx-4">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="bg-primary h-full"
                  style={{ width: "0%" }}
                ></div>
              </div>
            </div>
            <div className="w-16 font-medium">0</div>
            <div className="w-24 text-center text-sm text-muted-foreground">
              Red Cards
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MatchReportStats;
