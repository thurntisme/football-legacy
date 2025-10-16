import React, { useState } from "react";

import { Eye, History } from "lucide-react";

import ContentWrapper from "@/components/common/content-wrapper";
import TeamFormBadges from "@/components/common/team-form-badges";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { internalApi } from "@/lib/api/internal";
import { MatchDetail } from "@/types/match";
import { useQuery } from "@tanstack/react-query";

import MatchDetailDialog from "./match-detail-dialog";

const MatchHistory = () => {
  const [matchDetailDialogOpen, setMatchDetailDialogOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<MatchDetail | null>(null);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["online-history"],
    queryFn: async () => {
      const res = await internalApi.get("/online/history");
      return res.data?.data || [];
    },
  });

  const viewMatchDetails = (match: MatchDetail) => {
    setSelectedMatch(match);
    setMatchDetailDialogOpen(true);
  };

  return (
    <>
      <Card>
        <CardHeader className="px-3 py-3 font-semibold flex flex-row items-center gap-2">
          <History className="w-4 h-4" />
          Last 3 matches
        </CardHeader>
        <CardContent className="p-0">
          <ContentWrapper
            isLoading={isLoading}
            error={error}
            onRefetch={refetch}
          >
            {data.length
              ? data.map((match: MatchDetail) => (
                  <div
                    key={match.id}
                    className="border-t flex gap-2 items-center"
                  >
                    <div className="p-3 flex-1">
                      <div className="font-medium">{match.opponent}</div>
                      <div className="text-sm text-muted-foreground">
                        {match.opponentTeam}
                      </div>
                    </div>
                    <div className="flex flex-col py-2 gap-2 w-1/4">
                      <div className="text-center ">
                        <TeamFormBadges forms={[match.result]} />
                      </div>
                      <div className="text-center text-sm">{match.score}</div>
                    </div>
                    <div className="p-3 text-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => viewMatchDetails(match)}
                      >
                        <Eye className="h-4 w-4" />
                        Details
                      </Button>
                    </div>
                  </div>
                ))
              : null}
          </ContentWrapper>
        </CardContent>
      </Card>
      <MatchDetailDialog
        matchDetailDialogOpen={matchDetailDialogOpen}
        setMatchDetailDialogOpen={setMatchDetailDialogOpen}
        selectedMatch={selectedMatch}
      />
    </>
  );
};

export default MatchHistory;
