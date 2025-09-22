"use client";

import { Trophy, Users } from "lucide-react";
import Link from "next/link";

import PageTitle from "@/components/common/page-title";
import CommunityChat from "@/components/community-chat-widget";
import FinancialSummaryCard from "@/components/financial-summary-card";
import LatestNewsCard from "@/components/latest-news-card";
import LeaguePositionCard from "@/components/league-position-card";
import NextMatchCard from "@/components/next-match-card";
import OnlineMatchWidget from "@/components/online-match-widget";
import StadiumCard from "@/components/stadium-card";
import StaffManagementCard from "@/components/staff-management-card";
import TeamPerformanceCard from "@/components/team-performance-card";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <PageTitle
        title="Dashboard"
        subTitle="Welcome back to your football manager dashboard"
      >
        <Button asChild>
          <Link href="/match/prepare">
            <Trophy className="mr-2 h-4 w-4" />
            Prepare Match
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/training">
            <Users className="mr-2 h-4 w-4" />
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
