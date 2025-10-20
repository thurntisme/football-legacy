"use client";

import ContentWrapper from "@/components/common/content-wrapper";
import PageTitle from "@/components/common/page-title";
import UpcomingMatchOverview from "@/components/pages/match/upcoming-match-overview";
import UpcomingMatchSelection from "@/components/pages/match/upcoming-match-selection";
import { internalApi } from "@/lib/api/internal";
import { useQuery } from "@tanstack/react-query";

export default function MatchPreparePage() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["upcoming-match"],
    queryFn: async () => {
      const res = await internalApi.get("/match/upcoming");
      return res.data?.data || [];
    },
  });

  return (
    <ContentWrapper isLoading={isLoading} error={error} onRefetch={refetch}>
      <PageTitle title="Match Preparation" />

      <UpcomingMatchOverview match={data?.match} />
      <UpcomingMatchSelection players={data?.players} />
    </ContentWrapper>
  );
}
