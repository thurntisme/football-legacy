"use client";

import { ArrowRight, Building } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FOOTBALL_STATS_URL } from "@/constants/site";

export default function StadiumCard() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Building className="h-5 w-5 mr-2" />
          Stadium
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>United Arena</span>
              <span className="font-medium">45,000 capacity</span>
            </div>
            <Progress value={65} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Average Attendance</span>
              <span className="font-medium">85%</span>
            </div>
            <Progress value={85} className="h-2" />
          </div>
          <div className="pt-2">
            <div className="flex justify-between text-sm">
              <span>Facility Rating</span>
              <span className="font-medium">4/5 stars</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          <Link href={`${FOOTBALL_STATS_URL}/game/stadium`}>
            Manage Stadium
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
