import PageTitle from "@/components/common/page-title";
import UpcomingMatchOverview from "@/components/upcoming-match-overview";
import UpcomingMatchSelection from "@/components/upcoming-match-selection";

export default function MatchPreparePage() {
  return (
    <>
      <PageTitle title="Match Preparation" />

      <UpcomingMatchOverview />
      <UpcomingMatchSelection />
    </>
  );
}
