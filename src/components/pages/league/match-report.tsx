import React from "react";

import { Printer, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IMatch } from "@/types/common";
import MatchReportSummary from "./match-report-summary";
import MatchReportStats from "./match-report-stats";
import MatchReportLineup from "./match-report-lineup";
import MatchReportTimeline from "./match-report-timeline";

type Props = {
  selectedMatch: IMatch | null;
  setSelectedMatch: (match: IMatch | null) => void;
};

const MatchReport = ({ selectedMatch, setSelectedMatch }: Props) => {
  return (
    <Dialog
      open={!!selectedMatch}
      onOpenChange={(open) => !open && setSelectedMatch(null)}
    >
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
        {selectedMatch && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">Match Report</DialogTitle>
              <DialogDescription>
                {selectedMatch.date} • {selectedMatch.competition}
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <div className="flex justify-between items-center mb-6">
                <div className="text-center">
                  <div className="text-4xl font-bold">
                    {selectedMatch.homeScore}
                  </div>
                  <div className="mt-2">{selectedMatch.homeTeam}</div>
                </div>
                <div className="text-center space-y-1">
                  <div className="text-sm font-medium">
                    {selectedMatch.stadium}
                  </div>
                  <div className="text-xs text-muted-foreground">Full Time</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold">
                    {selectedMatch.awayScore}
                  </div>
                  <div className="mt-2">{selectedMatch.awayTeam}</div>
                </div>
              </div>

              <Tabs defaultValue="summary">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="summary">Summary</TabsTrigger>
                  <TabsTrigger value="stats">Stats</TabsTrigger>
                  <TabsTrigger value="lineup">Lineups</TabsTrigger>
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                </TabsList>

                <TabsContent value="summary">
                  <MatchReportSummary selectedMatch={selectedMatch} />
                </TabsContent>

                <TabsContent value="stats">
                  <MatchReportStats />
                </TabsContent>

                <TabsContent value="lineup">
                  <MatchReportLineup selectedMatch={selectedMatch} />
                </TabsContent>

                <TabsContent value="timeline">
                  <MatchReportTimeline selectedMatch={selectedMatch} />
                </TabsContent>
              </Tabs>
            </div>

            <DialogFooter className="flex justify-between items-center">
              <Button variant="outline" onClick={() => setSelectedMatch(null)}>
                <X className="mr-2 h-4 w-4" />
                Close
              </Button>
              <Button>
                <Printer className="mr-2 h-4 w-4" />
                Print Report
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MatchReport;
