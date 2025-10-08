"use client";

import { ArrowRight, CalendarDays } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FOOTBALL_STATS_URL } from "@/constants/site";

export default function NextMatchCard() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <CalendarDays className="h-5 w-5 mr-2" />
          Next Match
        </CardTitle>
      </CardHeader>
      <CardContent className="mt-auto pb-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center">
            <Avatar className="h-14 w-14 mb-2">
              <AvatarImage
                src="/placeholder.svg?height=56&width=56"
                alt="Your Team"
              />
              <AvatarFallback>YT</AvatarFallback>
            </Avatar>
            <span className="font-medium text-sm">Your Team</span>
          </div>

          <div className="text-center">
            <div className="text-xl font-bold mb-1">VS</div>
            <Badge variant="outline">Sat, 22 Mar - 15:00</Badge>
          </div>

          <div className="flex flex-col items-center">
            <Avatar className="h-14 w-14 mb-2">
              <AvatarImage
                src="/placeholder.svg?height=56&width=56"
                alt="City FC"
              />
              <AvatarFallback>CF</AvatarFallback>
            </Avatar>
            <span className="font-medium text-sm">City FC</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          <Link href={`${FOOTBALL_STATS_URL}/game/match/prepare`}>
            Prepare for Match
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
