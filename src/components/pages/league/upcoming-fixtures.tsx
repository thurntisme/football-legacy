import React from "react";

import { Calendar, Clock, MapPin, Trophy } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  matches: any[];
}

const UpcomingFixtures = ({ matches }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Fixtures</CardTitle>
        <CardDescription>Next 10 matches</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {matches.length &&
            matches.map((match, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg"
              >
                <div className="flex flex-col mb-2 md:mb-0 w-1/3">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm font-medium">{match.date}</span>
                    <span className="mx-2 text-muted-foreground">•</span>
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">{match.time}</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {match.location}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-center mb-2 md:mb-0 w-1/3">
                  <div className="flex flex-col items-center w-[80px]">
                    <img
                      src="/placeholder.svg?height=40&width=40"
                      alt="Your Team"
                      className="h-10 w-10 mb-1"
                    />
                    <span className="text-xs">Your Team</span>
                  </div>

                  <div className="mx-4 text-center w-[80px]">
                    <div className="text-lg font-bold mb-1">VS</div>
                    <Badge>{match.venue}</Badge>
                  </div>

                  <div className="flex flex-col items-center w-[80px]">
                    <img
                      src="/placeholder.svg?height=40&width=40"
                      alt={match.opponent}
                      className="h-10 w-10 mb-1"
                    />
                    <span className="text-xs">{match.opponent}</span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1.5 w-1/3">
                  <Badge
                    variant={
                      match.badge === "league"
                        ? "default"
                        : match.badge === "champions"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {match.competition}
                  </Badge>
                  {index === 0 && (
                    <Button variant="outline" asChild>
                      <Link href="/game/match/prepare">
                        <Trophy className="h-4 w-4" />
                        Prepare Match
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingFixtures;
