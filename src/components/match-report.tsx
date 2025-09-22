import React from 'react';

import {
  AlertCircle,
  CheckCircle,
  Goal,
  Printer,
  Sparkles,
  Star,
  XCircle,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IMatch } from '@/types/football/common';

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
                {selectedMatch.homeTeam} {selectedMatch.homeScore} -{' '}
                {selectedMatch.awayScore} {selectedMatch.awayTeam}
                <div className="mt-1 text-sm">
                  {selectedMatch.date} • {selectedMatch.competition}
                </div>
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
                <div className="text-center">
                  <div className="text-sm font-medium mb-2">
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

                <TabsContent value="summary" className="space-y-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Match Summary</h3>
                    <p>
                      {selectedMatch.homeTeam}{' '}
                      {(selectedMatch.result === 'win'
                        ? 'W'
                        : selectedMatch.result === 'loss'
                          ? 'L'
                          : 'D') === 'W'
                        ? 'secured a convincing victory'
                        : selectedMatch.result === 'loss'
                          ? 'suffered a defeat'
                          : 'battled to a draw'}{' '}
                      against {selectedMatch.awayTeam} in this{' '}
                      {selectedMatch.competition} match.
                      {(selectedMatch.result === 'win'
                        ? 'W'
                        : selectedMatch.result === 'loss'
                          ? 'L'
                          : 'D') === 'W'
                        ? ' Your team dominated possession and created numerous chances throughout the game.'
                        : selectedMatch.result === 'loss'
                          ? ' Despite some good moments, your team struggled to contain the opposition attack.'
                          : ' Both teams had their moments in a closely contested match.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">
                          Key Performers
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <Star className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium">
                                Player of the Match
                              </div>
                              <div className="text-sm text-muted-foreground">
                                John Smith - 9.2 Rating
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <Goal className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium">Top Scorer</div>
                              <div className="text-sm text-muted-foreground">
                                Michael Johnson - 2 Goals
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <Sparkles className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium">Most Assists</div>
                              <div className="text-sm text-muted-foreground">
                                David Williams - 2 Assists
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">
                          Manager's Notes
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                            <div>
                              <div className="font-medium">
                                What Worked Well
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Counter-attacking play created numerous chances
                              </div>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                            <div>
                              <div className="font-medium">
                                Areas for Improvement
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Defensive organization on set pieces needs work
                              </div>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                            <div>
                              <div className="font-medium">Injury Concerns</div>
                              <div className="text-sm text-muted-foreground">
                                James Wilson (Hamstring) - 2 weeks
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">
                        Match Highlights
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="w-16 text-center">
                            12'
                          </Badge>
                          <div className="flex-1">
                            <div className="font-medium">
                              GOAL! {selectedMatch.homeTeam}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Michael Johnson scores from close range after a
                              great cross from David Williams
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="w-16 text-center">
                            34'
                          </Badge>
                          <div className="flex-1">
                            <div className="font-medium">
                              GOAL! {selectedMatch.homeTeam}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Michael Johnson doubles the lead with a powerful
                              header from a corner
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="w-16 text-center">
                            56'
                          </Badge>
                          <div className="flex-1">
                            <div className="font-medium">
                              GOAL! {selectedMatch.awayTeam}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Carlos Mendez pulls one back for the visitors with
                              a long-range strike
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="w-16 text-center">
                            78'
                          </Badge>
                          <div className="flex-1">
                            <div className="font-medium">
                              GOAL! {selectedMatch.homeTeam}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Robert Thompson seals the win with a tap-in after
                              great team play
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="stats">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <div className="w-16 text-right font-medium">65%</div>
                          <div className="flex-1 mx-4">
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="bg-primary h-full"
                                style={{ width: '65%' }}
                              ></div>
                            </div>
                          </div>
                          <div className="w-16 font-medium">35%</div>
                          <div className="w-24 text-center text-sm text-muted-foreground">
                            Possession
                          </div>
                        </div>

                        <div className="flex items-center">
                          <div className="w-16 text-right font-medium">18</div>
                          <div className="flex-1 mx-4">
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="bg-primary h-full"
                                style={{ width: '75%' }}
                              ></div>
                            </div>
                          </div>
                          <div className="w-16 font-medium">6</div>
                          <div className="w-24 text-center text-sm text-muted-foreground">
                            Shots
                          </div>
                        </div>

                        <div className="flex items-center">
                          <div className="w-16 text-right font-medium">9</div>
                          <div className="flex-1 mx-4">
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="bg-primary h-full"
                                style={{ width: '82%' }}
                              ></div>
                            </div>
                          </div>
                          <div className="w-16 font-medium">2</div>
                          <div className="w-24 text-center text-sm text-muted-foreground">
                            On Target
                          </div>
                        </div>

                        <div className="flex items-center">
                          <div className="w-16 text-right font-medium">7</div>
                          <div className="flex-1 mx-4">
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="bg-primary h-full"
                                style={{ width: '70%' }}
                              ></div>
                            </div>
                          </div>
                          <div className="w-16 font-medium">3</div>
                          <div className="w-24 text-center text-sm text-muted-foreground">
                            Corners
                          </div>
                        </div>

                        <div className="flex items-center">
                          <div className="w-16 text-right font-medium">2</div>
                          <div className="flex-1 mx-4">
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="bg-primary h-full"
                                style={{ width: '40%' }}
                              ></div>
                            </div>
                          </div>
                          <div className="w-16 font-medium">3</div>
                          <div className="w-24 text-center text-sm text-muted-foreground">
                            Offsides
                          </div>
                        </div>

                        <div className="flex items-center">
                          <div className="w-16 text-right font-medium">12</div>
                          <div className="flex-1 mx-4">
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="bg-primary h-full"
                                style={{ width: '60%' }}
                              ></div>
                            </div>
                          </div>
                          <div className="w-16 font-medium">8</div>
                          <div className="w-24 text-center text-sm text-muted-foreground">
                            Fouls
                          </div>
                        </div>

                        <div className="flex items-center">
                          <div className="w-16 text-right font-medium">2</div>
                          <div className="flex-1 mx-4">
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="bg-primary h-full"
                                style={{ width: '50%' }}
                              ></div>
                            </div>
                          </div>
                          <div className="w-16 font-medium">2</div>
                          <div className="w-24 text-center text-sm text-muted-foreground">
                            Yellow Cards
                          </div>
                        </div>

                        <div className="flex items-center">
                          <div className="w-16 text-right font-medium">0</div>
                          <div className="flex-1 mx-4">
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="bg-primary h-full"
                                style={{ width: '0%' }}
                              ></div>
                            </div>
                          </div>
                          <div className="w-16 font-medium">0</div>
                          <div className="w-24 text-center text-sm text-muted-foreground">
                            Red Cards
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="lineup">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">
                          {selectedMatch.homeTeam} Lineup
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {[
                            {
                              number: 1,
                              name: 'David Smith',
                              position: 'GK',
                              rating: 7.2,
                            },
                            {
                              number: 2,
                              name: 'James Wilson',
                              position: 'RB',
                              rating: 6.8,
                            },
                            {
                              number: 5,
                              name: 'Michael Brown',
                              position: 'CB',
                              rating: 7.5,
                            },
                            {
                              number: 6,
                              name: 'Robert Johnson',
                              position: 'CB',
                              rating: 7.3,
                            },
                            {
                              number: 3,
                              name: 'Thomas Davis',
                              position: 'LB',
                              rating: 6.9,
                            },
                            {
                              number: 8,
                              name: 'John Thompson',
                              position: 'CM',
                              rating: 8.1,
                            },
                            {
                              number: 4,
                              name: 'William Taylor',
                              position: 'CM',
                              rating: 7.7,
                            },
                            {
                              number: 10,
                              name: 'David Williams',
                              position: 'CAM',
                              rating: 8.4,
                            },
                            {
                              number: 7,
                              name: 'Richard Martin',
                              position: 'RW',
                              rating: 7.6,
                            },
                            {
                              number: 11,
                              name: 'Daniel White',
                              position: 'LW',
                              rating: 7.8,
                            },
                            {
                              number: 9,
                              name: 'Michael Johnson',
                              position: 'ST',
                              rating: 9.2,
                            },
                          ].map((player) => (
                            <div
                              key={player.number}
                              className="flex items-center"
                            >
                              <div className="w-8 text-center font-medium">
                                {player.number}
                              </div>
                              <div className="flex-1 ml-2">{player.name}</div>
                              <div className="w-10 text-center text-sm text-muted-foreground">
                                {player.position}
                              </div>
                              <div className="w-10 text-center font-medium">
                                {player.rating}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 pt-4 border-t">
                          <h4 className="font-medium mb-2">Substitutes</h4>
                          <div className="space-y-2">
                            {[
                              {
                                number: 12,
                                name: 'Paul Anderson',
                                position: 'GK',
                                rating: '-',
                              },
                              {
                                number: 14,
                                name: 'Mark Wilson',
                                position: 'DF',
                                rating: 6.5,
                                minute: 67,
                              },
                              {
                                number: 16,
                                name: 'Steven Clark',
                                position: 'MF',
                                rating: 6.8,
                                minute: 72,
                              },
                              {
                                number: 20,
                                name: 'Robert Thompson',
                                position: 'ST',
                                rating: 7.4,
                                minute: 63,
                              },
                              {
                                number: 23,
                                name: 'Kevin Lewis',
                                position: 'MF',
                                rating: '-',
                              },
                            ].map((player) => (
                              <div
                                key={player.number}
                                className="flex items-center"
                              >
                                <div className="w-8 text-center font-medium">
                                  {player.number}
                                </div>
                                <div className="flex-1 ml-2">{player.name}</div>
                                <div className="w-10 text-center text-sm text-muted-foreground">
                                  {player.position}
                                </div>
                                <div className="w-10 text-center font-medium">
                                  {player.rating}
                                </div>
                                {player.minute && (
                                  <div className="ml-2 text-xs text-muted-foreground">
                                    {player.minute}'
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">
                          {selectedMatch.awayTeam} Lineup
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {[
                            {
                              number: 1,
                              name: 'Carlos Rodriguez',
                              position: 'GK',
                              rating: 6.5,
                            },
                            {
                              number: 2,
                              name: 'Juan Martinez',
                              position: 'RB',
                              rating: 6.3,
                            },
                            {
                              number: 5,
                              name: 'Pedro Sanchez',
                              position: 'CB',
                              rating: 6.7,
                            },
                            {
                              number: 6,
                              name: 'Miguel Hernandez',
                              position: 'CB',
                              rating: 6.4,
                            },
                            {
                              number: 3,
                              name: 'Antonio Lopez',
                              position: 'LB',
                              rating: 6.2,
                            },
                            {
                              number: 8,
                              name: 'Fernando Garcia',
                              position: 'CM',
                              rating: 7.0,
                            },
                            {
                              number: 4,
                              name: 'Javier Perez',
                              position: 'CM',
                              rating: 6.8,
                            },
                            {
                              number: 10,
                              name: 'Carlos Mendez',
                              position: 'CAM',
                              rating: 7.5,
                            },
                            {
                              number: 7,
                              name: 'Raul Gonzalez',
                              position: 'RW',
                              rating: 6.9,
                            },
                            {
                              number: 11,
                              name: 'Diego Morales',
                              position: 'LW',
                              rating: 6.6,
                            },
                            {
                              number: 9,
                              name: 'Luis Torres',
                              position: 'ST',
                              rating: 7.2,
                            },
                          ].map((player) => (
                            <div
                              key={player.number}
                              className="flex items-center"
                            >
                              <div className="w-8 text-center font-medium">
                                {player.number}
                              </div>
                              <div className="flex-1 ml-2">{player.name}</div>
                              <div className="w-10 text-center text-sm text-muted-foreground">
                                {player.position}
                              </div>
                              <div className="w-10 text-center font-medium">
                                {player.rating}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 pt-4 border-t">
                          <h4 className="font-medium mb-2">Substitutes</h4>
                          <div className="space-y-2">
                            {[
                              {
                                number: 12,
                                name: 'Alejandro Diaz',
                                position: 'GK',
                                rating: '-',
                              },
                              {
                                number: 14,
                                name: 'Roberto Flores',
                                position: 'DF',
                                rating: 6.3,
                                minute: 58,
                              },
                              {
                                number: 16,
                                name: 'Eduardo Vega',
                                position: 'MF',
                                rating: 6.5,
                                minute: 70,
                              },
                              {
                                number: 20,
                                name: 'Ricardo Reyes',
                                position: 'ST',
                                rating: 6.7,
                                minute: 75,
                              },
                              {
                                number: 23,
                                name: 'Gabriel Ortiz',
                                position: 'MF',
                                rating: '-',
                              },
                            ].map((player) => (
                              <div
                                key={player.number}
                                className="flex items-center"
                              >
                                <div className="w-8 text-center font-medium">
                                  {player.number}
                                </div>
                                <div className="flex-1 ml-2">{player.name}</div>
                                <div className="w-10 text-center text-sm text-muted-foreground">
                                  {player.position}
                                </div>
                                <div className="w-10 text-center font-medium">
                                  {player.rating}
                                </div>
                                {player.minute && (
                                  <div className="ml-2 text-xs text-muted-foreground">
                                    {player.minute}'
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="timeline">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="relative">
                        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-muted"></div>
                        <div className="space-y-6">
                          <div className="relative pl-10">
                            <div className="absolute left-0 w-8 text-center text-sm font-medium">
                              1'
                            </div>
                            <div className="absolute left-4 -translate-x-1/2 w-3 h-3 rounded-full bg-primary"></div>
                            <div className="font-medium">Kick Off</div>
                            <div className="text-sm text-muted-foreground">
                              Match begins at {selectedMatch.stadium}
                            </div>
                          </div>

                          <div className="relative pl-10">
                            <div className="absolute left-0 w-8 text-center text-sm font-medium">
                              12'
                            </div>
                            <div className="absolute left-4 -translate-x-1/2 w-3 h-3 rounded-full bg-green-500"></div>
                            <div className="font-medium">
                              GOAL! {selectedMatch.homeTeam}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Michael Johnson scores from close range
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              Assist: David Williams
                            </div>
                          </div>

                          <div className="relative pl-10">
                            <div className="absolute left-0 w-8 text-center text-sm font-medium">
                              23'
                            </div>
                            <div className="absolute left-4 -translate-x-1/2 w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="font-medium">Yellow Card</div>
                            <div className="text-sm text-muted-foreground">
                              Fernando Garcia ({selectedMatch.awayTeam}) booked
                              for a late tackle
                            </div>
                          </div>

                          <div className="relative pl-10">
                            <div className="absolute left-0 w-8 text-center text-sm font-medium">
                              34'
                            </div>
                            <div className="absolute left-4 -translate-x-1/2 w-3 h-3 rounded-full bg-green-500"></div>
                            <div className="font-medium">
                              GOAL! {selectedMatch.homeTeam}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Michael Johnson doubles the lead with a header
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              Assist: John Thompson
                            </div>
                          </div>

                          <div className="relative pl-10">
                            <div className="absolute left-0 w-8 text-center text-sm font-medium">
                              45'
                            </div>
                            <div className="absolute left-4 -translate-x-1/2 w-3 h-3 rounded-full bg-primary"></div>
                            <div className="font-medium">Half Time</div>
                            <div className="text-sm text-muted-foreground">
                              {selectedMatch.homeTeam} 2-0{' '}
                              {selectedMatch.awayTeam}
                            </div>
                          </div>

                          <div className="relative pl-10">
                            <div className="absolute left-0 w-8 text-center text-sm font-medium">
                              46'
                            </div>
                            <div className="absolute left-4 -translate-x-1/2 w-3 h-3 rounded-full bg-primary"></div>
                            <div className="font-medium">Second Half</div>
                            <div className="text-sm text-muted-foreground">
                              Second half begins
                            </div>
                          </div>

                          <div className="relative pl-10">
                            <div className="absolute left-0 w-8 text-center text-sm font-medium">
                              56'
                            </div>
                            <div className="absolute left-4 -translate-x-1/2 w-3 h-3 rounded-full bg-green-500"></div>
                            <div className="font-medium">
                              GOAL! {selectedMatch.awayTeam}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Carlos Mendez with a long-range strike
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              Assist: Fernando Garcia
                            </div>
                          </div>

                          <div className="relative pl-10">
                            <div className="absolute left-0 w-8 text-center text-sm font-medium">
                              63'
                            </div>
                            <div className="absolute left-4 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-500"></div>
                            <div className="font-medium">
                              Substitution - {selectedMatch.homeTeam}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Robert Thompson replaces Daniel White
                            </div>
                          </div>

                          <div className="relative pl-10">
                            <div className="absolute left-0 w-8 text-center text-sm font-medium">
                              67'
                            </div>
                            <div className="absolute left-4 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-500"></div>
                            <div className="font-medium">
                              Substitution - {selectedMatch.homeTeam}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Mark Wilson replaces James Wilson (Injury)
                            </div>
                          </div>

                          <div className="relative pl-10">
                            <div className="absolute left-0 w-8 text-center text-sm font-medium">
                              78'
                            </div>
                            <div className="absolute left-4 -translate-x-1/2 w-3 h-3 rounded-full bg-green-500"></div>
                            <div className="font-medium">
                              GOAL! {selectedMatch.homeTeam}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Robert Thompson with a tap-in
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              Assist: John Thompson
                            </div>
                          </div>

                          <div className="relative pl-10">
                            <div className="absolute left-0 w-8 text-center text-sm font-medium">
                              90+3'
                            </div>
                            <div className="absolute left-4 -translate-x-1/2 w-3 h-3 rounded-full bg-primary"></div>
                            <div className="font-medium">Full Time</div>
                            <div className="text-sm text-muted-foreground">
                              {selectedMatch.homeTeam} 3-1{' '}
                              {selectedMatch.awayTeam}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <DialogFooter className="flex justify-between items-center">
              <Button variant="outline" onClick={() => setSelectedMatch(null)}>
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
