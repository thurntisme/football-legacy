import React from "react";

import { BarChart, Calendar, Trophy } from "lucide-react";

import TeamFormBadges from "@/components/common/team-form-badges";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getStandingPosition } from "@/lib/league";

type Props = {
  league: any;
};

const SeasonOverview = ({ league }: Props) => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle>Season Overview</CardTitle>
        <CardDescription>
          {league?.title || ""} {league?.season || ""}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center">
            <div className="mr-4 p-3 bg-primary/10 rounded-full">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Next Match</p>
              <p className="text-xl font-bold">
                vs {league?.next_match?.opponent || ""}
              </p>
              <p className="text-sm text-muted-foreground">
                {league?.next_match?.date || ""}
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="mr-4 p-3 bg-primary/10 rounded-full">
              <Trophy className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Competitions</p>
              <p className="text-xl font-bold">
                {league?.next_match?.position
                  ? getStandingPosition(league?.next_match?.position)
                  : "N/A"}{" "}
                Place
              </p>
              <TeamFormBadges forms={league?.next_match?.form} />
            </div>
          </div>

          <div className="flex items-center">
            <div className="mr-4 p-3 bg-primary/10 rounded-full">
              <BarChart className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Win Probability</p>
              <p className="text-xl font-bold">
                {league?.probability?.win || 0}%
              </p>
              <p className="text-sm text-muted-foreground">
                Top 1: {league?.probability?.on_top || 0}%
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SeasonOverview;
