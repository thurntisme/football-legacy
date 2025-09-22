import { ArrowLeft, BarChart, TrendingUp, Trophy } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FOOTBALL_STATS_URL } from '@/constants/site';
import { leagueStanding } from '@/mock/football';

export default function LeagueStandingsPage() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">League Standings</h1>
        <Button asChild>
          <Link href={`${FOOTBALL_STATS_URL}/dashboard`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Premier League 2024/25</CardTitle>
          <CardDescription>
            Season Progress: 23 of 38 matches played
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center">
              <div className="mr-4 p-3 bg-primary/10 rounded-full">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">League Leaders</p>
                <p className="text-xl font-bold">United FC</p>
                <p className="text-sm text-muted-foreground">72 points</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="mr-4 p-3 bg-primary/10 rounded-full">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Your Position</p>
                <p className="text-xl font-bold">2nd Place</p>
                <p className="text-sm text-muted-foreground">
                  68 points (4 pts behind)
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
                <p className="text-xl font-bold">35%</p>
                <p className="text-sm text-muted-foreground">Top 4: 92%</p>
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
              {leagueStanding.map((team) => (
                <TableRow
                  key={team.position}
                  className={team.highlight ? 'bg-accent/30' : ''}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      {team.position}
                      {team.zone === 'champions' && (
                        <div
                          className="ml-2 w-2 h-2 rounded-full bg-blue-500"
                          title="Champions League"
                        ></div>
                      )}
                      {team.zone === 'europa' && (
                        <div
                          className="ml-2 w-2 h-2 rounded-full bg-orange-500"
                          title="Europa League"
                        ></div>
                      )}
                      {team.zone === 'conference' && (
                        <div
                          className="ml-2 w-2 h-2 rounded-full bg-green-500"
                          title="Conference League"
                        ></div>
                      )}
                      {team.zone === 'relegation' && (
                        <div
                          className="ml-2 w-2 h-2 rounded-full bg-red-500"
                          title="Relegation"
                        ></div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{team.team}</TableCell>
                  <TableCell className="text-center">{team.played}</TableCell>
                  <TableCell className="text-center">{team.won}</TableCell>
                  <TableCell className="text-center">{team.drawn}</TableCell>
                  <TableCell className="text-center">{team.lost}</TableCell>
                  <TableCell className="text-center">{team.goalsFor}</TableCell>
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
                      {team.form.map((result, i) => (
                        <Badge
                          key={i}
                          className={
                            result === 'W'
                              ? 'bg-green-500'
                              : result === 'D'
                                ? 'bg-amber-500'
                                : 'bg-red-500'
                          }
                        >
                          {result}
                        </Badge>
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
    </>
  );
}
