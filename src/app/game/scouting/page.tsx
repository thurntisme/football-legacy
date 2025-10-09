"use client";

import { useState } from "react";

import { ArrowDownRight, ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import PageTitle from "@/components/common/page-title";
import IncomingScoutingRequests from "@/components/pages/scouting/incoming-requests";
import OutgoingScoutingRequests from "@/components/pages/scouting/outgoing-requests";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FOOTBALL_STATS_URL } from "@/constants/site";

export default function ScoutingPage() {
  return (
    <>
      <PageTitle
        title="Scouting Center"
        subTitle="Manage transfer requests and player contracts"
      >
        <Button asChild>
          <Link href={`${FOOTBALL_STATS_URL}/team`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Team
          </Link>
        </Button>
      </PageTitle>

      <Tabs defaultValue="incoming" className="space-y-8">
        <TabsList className="grid grid-cols-2 gap-2">
          <TabsTrigger value="incoming" className="flex items-center">
            <ArrowDownRight className="mr-2 h-4 w-4" />
            Incoming Requests
          </TabsTrigger>
          <TabsTrigger value="outgoing" className="flex items-center">
            <ArrowUpRight className="mr-2 h-4 w-4" />
            Outgoing Requests
          </TabsTrigger>
        </TabsList>

        <TabsContent value="incoming" className="space-y-4">
          <IncomingScoutingRequests />
        </TabsContent>

        <TabsContent value="outgoing" className="space-y-4">
          <OutgoingScoutingRequests />
        </TabsContent>
      </Tabs>
    </>
  );
}
