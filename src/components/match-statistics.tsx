'use client';

import { useState } from 'react';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type MatchStatisticsProps = {
  homeTeam: string;
  awayTeam: string;
  stats: {
    home: {
      possession: number;
      shots: number;
      shotsOnTarget: number;
      corners: number;
      fouls: number;
      yellowCards: number;
      passes: number;
      passAccuracy: number;
      tackles: number;
      interceptions: number;
      heatmap: number[][];
    };
    away: {
      possession: number;
      shots: number;
      shotsOnTarget: number;
      corners: number;
      fouls: number;
      yellowCards: number;
      passes: number;
      passAccuracy: number;
      tackles: number;
      interceptions: number;
      heatmap: number[][];
    };
  };
  currentMinute: number;
};

export default function MatchStatistics({
  homeTeam,
  awayTeam,
  stats,
  currentMinute,
}: MatchStatisticsProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // Generate possession history data (simulated)
  const generatePossessionHistory = () => {
    const data = [];
    const intervals = Math.min(9, Math.floor(currentMinute / 10));

    for (let i = 0; i <= intervals; i++) {
      const minute = i * 10;
      // Simulate slight variations in possession
      const homePossession =
        i === intervals
          ? stats.home.possession
          : 50 + (Math.random() * 20 - 10);

      data.push({
        minute: minute === 0 ? 'Start' : `${minute}'`,
        home: Math.round(homePossession),
        away: Math.round(100 - homePossession),
      });
    }

    return data;
  };

  // Generate shot data
  const shotData = [
    {
      name: homeTeam,
      total: stats.home.shots,
      onTarget: stats.home.shotsOnTarget,
    },
    {
      name: awayTeam,
      total: stats.away.shots,
      onTarget: stats.away.shotsOnTarget,
    },
  ];

  // Generate pass data
  const passData = [
    {
      name: homeTeam,
      total: stats.home.passes,
      accurate: Math.round(stats.home.passes * (stats.home.passAccuracy / 100)),
    },
    {
      name: awayTeam,
      total: stats.away.passes,
      accurate: Math.round(stats.away.passes * (stats.away.passAccuracy / 100)),
    },
  ];

  // Generate defensive data
  const defensiveData = [
    {
      name: homeTeam,
      tackles: stats.home.tackles,
      interceptions: stats.home.interceptions,
    },
    {
      name: awayTeam,
      tackles: stats.away.tackles,
      interceptions: stats.away.interceptions,
    },
  ];

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="possession">Possession</TabsTrigger>
          <TabsTrigger value="attacking">Attacking</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Possession</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">
                    {Math.round(stats.home.possession)}%
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Possession
                  </span>
                  <span className="font-medium">
                    {Math.round(stats.away.possession)}%
                  </span>
                </div>
                <Progress value={stats.home.possession} className="h-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Shots</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="font-medium">{stats.home.shots}</div>
                    <div className="text-xs text-muted-foreground">
                      ({stats.home.shotsOnTarget} on target)
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">Shots</span>
                  <div className="text-right">
                    <div className="font-medium">{stats.away.shots}</div>
                    <div className="text-xs text-muted-foreground">
                      ({stats.away.shotsOnTarget} on target)
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Progress
                    value={
                      (stats.home.shots /
                        (stats.home.shots + stats.away.shots || 1)) *
                      100
                    }
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Passes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="font-medium">{stats.home.passes}</div>
                    <div className="text-xs text-muted-foreground">
                      ({stats.home.passAccuracy}% accuracy)
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">Passes</span>
                  <div className="text-right">
                    <div className="font-medium">{stats.away.passes}</div>
                    <div className="text-xs text-muted-foreground">
                      ({stats.away.passAccuracy}% accuracy)
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Progress
                    value={
                      (stats.home.passes /
                        (stats.home.passes + stats.away.passes || 1)) *
                      100
                    }
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Set Pieces</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="font-medium">{stats.home.corners}</div>
                    <div className="text-xs text-muted-foreground">Corners</div>
                  </div>
                  <div>
                    <div className="font-medium">{stats.home.fouls}</div>
                    <div className="text-xs text-muted-foreground">Fouls</div>
                  </div>
                  <div>
                    <div className="font-medium">{stats.home.yellowCards}</div>
                    <div className="text-xs text-muted-foreground">Cards</div>
                  </div>
                </div>
                <div className="h-4"></div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="font-medium">{stats.away.corners}</div>
                    <div className="text-xs text-muted-foreground">Corners</div>
                  </div>
                  <div>
                    <div className="font-medium">{stats.away.fouls}</div>
                    <div className="text-xs text-muted-foreground">Fouls</div>
                  </div>
                  <div>
                    <div className="font-medium">{stats.away.yellowCards}</div>
                    <div className="text-xs text-muted-foreground">Cards</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="possession" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Possession Over Time</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={generatePossessionHistory()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="minute" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="home"
                    stroke="#3b82f6"
                    name={homeTeam}
                  />
                  <Line
                    type="monotone"
                    dataKey="away"
                    stroke="#ef4444"
                    name={awayTeam}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Pass Completion</CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={passData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="accurate"
                      fill="#3b82f6"
                      name="Accurate Passes"
                    />
                    <Bar dataKey="total" fill="#93c5fd" name="Total Passes" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Defensive Actions</CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={defensiveData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="tackles" fill="#3b82f6" name="Tackles" />
                    <Bar
                      dataKey="interceptions"
                      fill="#93c5fd"
                      name="Interceptions"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="attacking" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Shots Analysis</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={shotData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="onTarget"
                    fill="#3b82f6"
                    name="Shots on Target"
                  />
                  <Bar dataKey="total" fill="#93c5fd" name="Total Shots" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Shot Accuracy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>{homeTeam}</span>
                      <span className="font-medium">
                        {stats.home.shots > 0
                          ? Math.round(
                              (stats.home.shotsOnTarget / stats.home.shots) *
                                100
                            )
                          : 0}
                        %
                      </span>
                    </div>
                    <Progress
                      value={
                        stats.home.shots > 0
                          ? (stats.home.shotsOnTarget / stats.home.shots) * 100
                          : 0
                      }
                      className="h-2"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span>{awayTeam}</span>
                      <span className="font-medium">
                        {stats.away.shots > 0
                          ? Math.round(
                              (stats.away.shotsOnTarget / stats.away.shots) *
                                100
                            )
                          : 0}
                        %
                      </span>
                    </div>
                    <Progress
                      value={
                        stats.away.shots > 0
                          ? (stats.away.shotsOnTarget / stats.away.shots) * 100
                          : 0
                      }
                      className="h-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Attacking Efficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>{homeTeam} - Shots per Possession</span>
                      <span className="font-medium">
                        {(
                          stats.home.shots /
                          (stats.home.possession / 100)
                        ).toFixed(2)}
                      </span>
                    </div>
                    <Progress
                      value={Math.min(
                        100,
                        (stats.home.shots / (stats.home.possession / 100)) * 10
                      )}
                      className="h-2"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span>{awayTeam} - Shots per Possession</span>
                      <span className="font-medium">
                        {(
                          stats.away.shots /
                          (stats.away.possession / 100)
                        ).toFixed(2)}
                      </span>
                    </div>
                    <Progress
                      value={Math.min(
                        100,
                        (stats.away.shots / (stats.away.possession / 100)) * 10
                      )}
                      className="h-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
