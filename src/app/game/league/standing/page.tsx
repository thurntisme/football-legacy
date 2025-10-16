"use client";

import { BarChart, TrendingUp, Trophy } from "lucide-react";

import ContentWrapper from "@/components/common/content-wrapper";
import PageTitle from "@/components/common/page-title";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TeamFormEnum } from "@/constants/league";
import { internalApi } from "@/lib/api/internal";
import { getStandingZone, getTeamFormBadge } from "@/lib/league";
import { Standing } from "@/types/league";
import { useQuery } from "@tanstack/react-query";

export default function LeagueStandingsPage() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["league-standing"],
    queryFn: async () => {
      const res = await internalApi.get("/league/standing");
      return res.data?.data || [];
    },
  });

  return (
    <>
      <PageTitle title="League Standings" />

      <ContentWrapper isLoading={isLoading} error={error} onRefetch={refetch}>
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle>
              {data?.league?.title || "League Standings"}{" "}
              {data?.league?.season || ""}
            </CardTitle>
            <CardDescription>
              Season Progress: {data?.league?.current_match || 0} of{" "}
              {data?.league?.total_matches || 0} matches played
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center">
                <div className="mr-4 p-3 bg-primary/10 rounded-full">
                  <Trophy className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    League Leaders
                  </p>
                  <p className="text-xl font-bold">
                    {data?.league?.best_team?.name || "N/A"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {data?.league?.best_team?.points || 0} points
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="mr-4 p-3 bg-primary/10 rounded-full">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Your Position</p>
                  <p className="text-xl font-bold">
                    {data?.league?.user_team?.position || "N/A"} Place
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {data?.league?.user_team?.points || 0} points
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="mr-4 p-3 bg-primary/10 rounded-full">
                  <BarChart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Title Probability
                  </p>
                  <p className="text-xl font-bold">
                    {data?.league?.user_team?.probability?.win || 0}%
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Top 4: {data?.league?.user_team?.probability?.on_top || 0}%
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[60px]">Pos</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead className="text-center">Played</TableHead>
                  <TableHead className="text-center">Won</TableHead>
                  <TableHead className="text-center">Drawn</TableHead>
                  <TableHead className="text-center">Lost</TableHead>
                  <TableHead className="text-center">GF</TableHead>
                  <TableHead className="text-center">GA</TableHead>
                  <TableHead className="text-center">GD</TableHead>
                  <TableHead className="text-center">Points</TableHead>
                  <TableHead className="text-center">Form</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.standing &&
                  data?.standing.map((team: Standing) => (
                    <TableRow
                      key={team.position}
                      className={team.highlight ? "bg-accent/30" : ""}
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          {team.position}
                          {getStandingZone(team.zone)}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{team.name}</TableCell>
                      <TableCell className="text-center">
                        {team.played}
                      </TableCell>
                      <TableCell className="text-center">{team.won}</TableCell>
                      <TableCell className="text-center">
                        {team.drawn}
                      </TableCell>
                      <TableCell className="text-center">{team.lost}</TableCell>
                      <TableCell className="text-center">
                        {team.goalsFor}
                      </TableCell>
                      <TableCell className="text-center">
                        {team.goalsAgainst}
                      </TableCell>
                      <TableCell className="text-center">
                        {team.goalsFor - team.goalsAgainst}
                      </TableCell>
                      <TableCell className="text-center font-bold">
                        {team.won * 3 + team.drawn}
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center gap-1">
                          {team.form.map((result: TeamFormEnum, i) => (
                            <>{getTeamFormBadge(result, i)}</>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="flex flex-wrap gap-4 mt-4">
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
            <span className="text-sm">Champions League</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-orange-500 mr-2"></div>
            <span className="text-sm">Europa League</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
            <span className="text-sm">Conference League</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
            <span className="text-sm">Relegation</span>
          </div>
        </div>
      </ContentWrapper>
    </>
  );
}
