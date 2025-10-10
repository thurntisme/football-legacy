"use client";

import { Trophy, Users } from "lucide-react";
import Link from "next/link";

import PageTitle from "@/components/common/page-title";
import CommunityChat from "@/components/pages/dashboard/community-chat-widget";
import FinancialSummaryCard from "@/components/pages/dashboard/financial-summary-card";
import LatestNewsCard from "@/components/pages/dashboard/latest-news-card";
import LeaguePositionCard from "@/components/pages/dashboard/league-position-card";
import NextMatchCard from "@/components/pages/dashboard/next-match-card";
import OnlineMatchWidget from "@/components/pages/dashboard/online-match-widget";
import StadiumCard from "@/components/pages/dashboard/stadium-card";
import StaffManagementCard from "@/components/pages/dashboard/staff-management-card";
import TeamPerformanceCard from "@/components/pages/dashboard/team-performance-card";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <PageTitle
        title="Dashboard"
        subTitle="Welcome back to your football manager dashboard"
      >
        <Button variant="outline" asChild>
          <Link href="/game/match/prepare">
            <Trophy className="h-4 w-4" />
            Prepare Match
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/game/training">
            <Users className="h-4 w-4" />
            Training
          </Link>
        </Button>
      </PageTitle>

      <div className="mb-6">
        <FinancialSummaryCard />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <NextMatchCard />
        <StadiumCard />
        <StaffManagementCard />
        <OnlineMatchWidget />
        <CommunityChat />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <LeaguePositionCard />
        <TeamPerformanceCard />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <LatestNewsCard />
      </div>
    </>
  );
}
