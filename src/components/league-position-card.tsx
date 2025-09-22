'use client';

import { ArrowRight, TrendingUp } from 'lucide-react';
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

export default function LeaguePositionCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="h-5 w-5 mr-2" />
          League Position
        </CardTitle>
        <CardDescription>Premier League - 2023/24 Season</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-muted/50 rounded-md">
            <div className="grid grid-cols-12 text-xs font-medium p-2 border-b">
              <div className="col-span-1">#</div>
              <div className="col-span-5">Team</div>
              <div className="col-span-2 text-center">P</div>
              <div className="col-span-2 text-center">GD</div>
              <div className="col-span-2 text-center">Pts</div>
            </div>
            <div className="divide-y">
              <div className="grid grid-cols-12 text-sm p-2">
                <div className="col-span-1 text-green-600">1</div>
                <div className="col-span-5">Man City</div>
                <div className="col-span-2 text-center">24</div>
                <div className="col-span-2 text-center">+32</div>
                <div className="col-span-2 text-center font-medium">58</div>
              </div>
              <div className="grid grid-cols-12 text-sm p-2 bg-primary/10">
                <div className="col-span-1 text-green-600">2</div>
                <div className="col-span-5 font-medium">Your Team</div>
                <div className="col-span-2 text-center">24</div>
                <div className="col-span-2 text-center">+28</div>
                <div className="col-span-2 text-center font-medium">54</div>
              </div>
              <div className="grid grid-cols-12 text-sm p-2">
                <div className="col-span-1 text-green-600">3</div>
                <div className="col-span-5">Arsenal</div>
                <div className="col-span-2 text-center">24</div>
                <div className="col-span-2 text-center">+25</div>
                <div className="col-span-2 text-center font-medium">52</div>
              </div>
              <div className="grid grid-cols-12 text-sm p-2">
                <div className="col-span-1 text-green-600">4</div>
                <div className="col-span-5">Liverpool</div>
                <div className="col-span-2 text-center">24</div>
                <div className="col-span-2 text-center">+22</div>
                <div className="col-span-2 text-center font-medium">49</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          <Link href={`${FOOTBALL_STATS_URL}/league/standings`}>
            View Full Table
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
