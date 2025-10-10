"use client";

import { ArrowRight, Users } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FOOTBALL_STATS_URL } from "@/constants/site";

export default function StaffManagementCard() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Staff Management</CardTitle>
        <CardDescription>
          Manage your coaching and support staff
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center">
          <Users className="h-8 w-8 mr-4 text-primary" />
          <div>
            <p className="text-sm">
              Hire and manage your coaching, medical, and scouting staff
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full" variant="outline">
          <Link href={`${FOOTBALL_STATS_URL}/game/staff`}>
            Manage Staff
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
