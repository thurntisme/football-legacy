'use client';

import { Users } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FOOTBALL_STATS_URL } from '@/constants/site';

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
        <Button asChild className="w-full">
          <Link href={`${FOOTBALL_STATS_URL}/staff`}>Manage Staff</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
