'use client';

import { ArrowRight, Inbox } from 'lucide-react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FOOTBALL_STATS_URL } from '@/constants/site';

export default function LatestNewsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Inbox className="h-5 w-5 mr-2" />
          Latest News
        </CardTitle>
        <CardDescription>
          Breaking news and updates from around the football world
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="team">
          <TabsList className="mb-4">
            <TabsTrigger value="team">Team News</TabsTrigger>
            <TabsTrigger value="transfers">Transfer News</TabsTrigger>
            <TabsTrigger value="league">League News</TabsTrigger>
          </TabsList>
          <TabsContent value="team" className="space-y-4">
            <div className="flex items-start space-x-4 p-3 border rounded-md">
              <div className="flex-shrink-0 w-16 h-16 bg-muted rounded-md overflow-hidden">
                <img
                  src="/placeholder.svg?height=64&width=64"
                  alt="Training"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="font-medium">Training Intensity Increased</h4>
                  <span className="text-xs text-muted-foreground">
                    Today, 09:15
                  </span>
                </div>
                <p className="text-sm mt-1">
                  The coaching staff has decided to increase training intensity
                  ahead of the crucial match against City FC.
                </p>
                <div className="mt-2">
                  <Badge variant="outline" className="text-xs">
                    Training
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-3 border rounded-md">
              <div className="flex-shrink-0 w-16 h-16 bg-muted rounded-md overflow-hidden">
                <img
                  src="/placeholder.svg?height=64&width=64"
                  alt="Injury"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="font-medium">
                    James Wilson Returns from Injury
                  </h4>
                  <span className="text-xs text-muted-foreground">
                    Yesterday, 16:30
                  </span>
                </div>
                <p className="text-sm mt-1">
                  Left-back James Wilson has recovered from his hamstring injury
                  and is now available for selection.
                </p>
                <div className="mt-2">
                  <Badge variant="outline" className="text-xs">
                    Injury Update
                  </Badge>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="transfers" className="space-y-4">
            <div className="flex items-start space-x-4 p-3 border rounded-md">
              <div className="flex-shrink-0 w-16 h-16 bg-muted rounded-md overflow-hidden">
                <img
                  src="/placeholder.svg?height=64&width=64"
                  alt="Transfer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="font-medium">
                    City FC Signs Brazilian Wonderkid
                  </h4>
                  <span className="text-xs text-muted-foreground">
                    Today, 11:20
                  </span>
                </div>
                <p className="text-sm mt-1">
                  City FC has completed the signing of 18-year-old Brazilian
                  attacking midfielder Carlos Silva for a reported fee of £35M.
                </p>
                <div className="mt-2">
                  <Badge variant="outline" className="text-xs">
                    Transfer
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-3 border rounded-md">
              <div className="flex-shrink-0 w-16 h-16 bg-muted rounded-md overflow-hidden">
                <img
                  src="/placeholder.svg?height=64&width=64"
                  alt="Rumor"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="font-medium">
                    Transfer Rumor: United After Star Striker
                  </h4>
                  <span className="text-xs text-muted-foreground">
                    Yesterday, 14:45
                  </span>
                </div>
                <p className="text-sm mt-1">
                  Reports suggest Manchester United is preparing a £75M bid for
                  Atletico Madrid's star striker Antoine Fernandez.
                </p>
                <div className="mt-2">
                  <Badge variant="outline" className="text-xs">
                    Rumor
                  </Badge>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="league" className="space-y-4">
            <div className="flex items-start space-x-4 p-3 border rounded-md">
              <div className="flex-shrink-0 w-16 h-16 bg-muted rounded-md overflow-hidden">
                <img
                  src="/placeholder.svg?height=64&width=64"
                  alt="League"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="font-medium">
                    Premier League Announces New TV Deal
                  </h4>
                  <span className="text-xs text-muted-foreground">
                    Today, 08:30
                  </span>
                </div>
                <p className="text-sm mt-1">
                  The Premier League has announced a record-breaking £10B TV
                  rights deal for the next three seasons.
                </p>
                <div className="mt-2">
                  <Badge variant="outline" className="text-xs">
                    League News
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-3 border rounded-md">
              <div className="flex-shrink-0 w-16 h-16 bg-muted rounded-md overflow-hidden">
                <img
                  src="/placeholder.svg?height=64&width=64"
                  alt="Schedule"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="font-medium">Fixture Changes Announced</h4>
                  <span className="text-xs text-muted-foreground">
                    Yesterday, 10:15
                  </span>
                </div>
                <p className="text-sm mt-1">
                  Several fixtures in December have been rescheduled for TV
                  coverage, including the derby match against City FC.
                </p>
                <div className="mt-2">
                  <Badge variant="outline" className="text-xs">
                    Fixtures
                  </Badge>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          <Link href={`${FOOTBALL_STATS_URL}/news`}>
            View All News
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
