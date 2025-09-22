'use client';

import { ArrowRight, BarChart3 } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
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

export default function TeamPerformanceCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart3 className="h-5 w-5 mr-2" />
          Team Performance
        </CardTitle>
        <CardDescription>Last 5 matches</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between">
            <div className="flex space-x-1">
              <Badge className="bg-green-500">W</Badge>
              <Badge className="bg-green-500">W</Badge>
              <Badge variant="outline">D</Badge>
              <Badge className="bg-red-500">L</Badge>
              <Badge className="bg-green-500">W</Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              Form: <span className="font-medium">10 pts from 15</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <div className="flex items-center">
                <Badge variant="outline" className="mr-2 w-6 text-center">
                  1
                </Badge>
                <span>Goals Scored</span>
              </div>
              <span className="font-medium">12</span>
            </div>
            <div className="flex justify-between text-sm">
              <div className="flex items-center">
                <Badge variant="outline" className="mr-2 w-6 text-center">
                  2
                </Badge>
                <span>Goals Conceded</span>
              </div>
              <span className="font-medium">4</span>
            </div>
            <div className="flex justify-between text-sm">
              <div className="flex items-center">
                <Badge variant="outline" className="mr-2 w-6 text-center">
                  3
                </Badge>
                <span>Clean Sheets</span>
              </div>
              <span className="font-medium">2</span>
            </div>
            <div className="flex justify-between text-sm">
              <div className="flex items-center">
                <Badge variant="outline" className="mr-2 w-6 text-center">
                  4
                </Badge>
                <span>Possession Avg</span>
              </div>
              <span className="font-medium">58%</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          <Link href={`${FOOTBALL_STATS_URL}/team`}>
            Team Analysis
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
