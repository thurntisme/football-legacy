import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import UpcomingMatchOverview from "@/components/upcoming-match-overview";
import UpcomingMatchSelection from "@/components/upcoming-match-selection";
import { Button } from "@/components/ui/button";
import { FOOTBALL_STATS_URL } from "@/constants/site";

export default function MatchPreparePage() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Match Preparation</h1>
        <Button asChild>
          <Link href={`${FOOTBALL_STATS_URL}/dashboard`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      <UpcomingMatchOverview />
      <UpcomingMatchSelection />
    </>
  );
}
