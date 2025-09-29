"use client";

import { useState } from "react";

import { Bar, Cell, Line, Pie } from "recharts";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart, LineChart, PieChart } from "@/components/ui/chart";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TeamAnalytics() {
  const [compareTeam, setCompareTeam] = useState<string>("none");
  const [timeRange, setTimeRange] = useState<string>("season");
  // Team performance data
  const performanceData = [
    { name: "Match 1", points: 3, goalsFor: 2, goalsAgainst: 0 },
    { name: "Match 2", points: 1, goalsFor: 1, goalsAgainst: 1 },
    { name: "Match 3", points: 3, goalsFor: 3, goalsAgainst: 1 },
    { name: "Match 4", points: 0, goalsFor: 0, goalsAgainst: 2 },
    { name: "Match 5", points: 3, goalsFor: 2, goalsAgainst: 0 },
    { name: "Match 6", points: 3, goalsFor: 1, goalsAgainst: 0 },
    { name: "Match 7", points: 1, goalsFor: 2, goalsAgainst: 2 },
    { name: "Match 8", points: 3, goalsFor: 3, goalsAgainst: 1 },
  ];
  // Team stats by position
  const positionData = [
    { name: "Goalkeepers", rating: 82, potential: 85 },
    { name: "Defenders", rating: 79, potential: 83 },
    { name: "Midfielders", rating: 83, potential: 86 },
    { name: "Forwards", rating: 85, potential: 88 },
  ];
  // Team attributes
  const attributeData = [
    { name: "Pace", value: 78 },
    { name: "Shooting", value: 82 },
    { name: "Passing", value: 85 },
    { name: "Dribbling", value: 80 },
    { name: "Defending", value: 76 },
    { name: "Physical", value: 79 },
  ];
  // Team composition data
  const compositionData = [
    { name: "Under 23", value: 30 },
    { name: "23-27", value: 40 },
    { name: "28-32", value: 25 },
    { name: "Over 32", value: 5 },
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  // Comparison team data (if selected)
  const comparisonData = {
    "city fc": {
      name: "City FC",
      attributes: [
        { name: "Pace", value: 85 },
        { name: "Shooting", value: 84 },
        { name: "Passing", value: 88 },
        { name: "Dribbling", value: 86 },
        { name: "Defending", value: 80 },
        { name: "Physical", value: 82 },
      ],
    },
    "united fc": {
      name: "United FC",
      attributes: [
        { name: "Pace", value: 82 },
        { name: "Shooting", value: 86 },
        { name: "Passing", value: 83 },
        { name: "Dribbling", value: 84 },
        { name: "Defending", value: 78 },
        { name: "Physical", value: 81 },
      ],
    },
  };
  // Combined data for comparison
  const getComparisonData = () => {
    if (compareTeam === "none") {
      return attributeData.map((attr) => ({
        name: attr.name,
        "Your Team": attr.value,
      }));
    }
    const opponent = comparisonData[compareTeam as keyof typeof comparisonData];
    return attributeData.map((attr, index) => ({
      name: attr.name,
      "Your Team": attr.value,
      [opponent.name]: opponent.attributes[index].value,
    }));
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Analytics</CardTitle>
        <CardDescription>
          Real-time analysis of your team's strengths and weaknesses
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
            <h3 className="text-lg font-medium">Real-time Team Analytics</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-48">
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Time Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last5">Last 5 Matches</SelectItem>
                    <SelectItem value="last10">Last 10 Matches</SelectItem>
                    <SelectItem value="season">Full Season</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full sm:w-48">
                <Select value={compareTeam} onValueChange={setCompareTeam}>
                  <SelectTrigger>
                    <SelectValue placeholder="Compare with..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Comparison</SelectItem>
                    <SelectItem value="city fc">City FC</SelectItem>
                    <SelectItem value="united fc">United FC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <Tabs defaultValue="performance">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="players">Players</TabsTrigger>
              <TabsTrigger value="attributes">Attributes</TabsTrigger>
              <TabsTrigger value="composition">Composition</TabsTrigger>
            </TabsList>
            <TabsContent value="performance" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Points Trend</CardTitle>
                  <CardDescription>
                    Points earned over recent matches
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ChartContainer
                      data={performanceData}
                      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                    >
                      <LineChart>
                        <Line
                          type="monotone"
                          dataKey="points"
                          stroke="#8884d8"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                        <ChartTooltip
                          content={
                            <ChartTooltipContent
                              className="bg-background border-border"
                              valueSuffix=" pts"
                            />
                          }
                        />
                      </LineChart>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">
                      Goals Scored vs Conceded
                    </CardTitle>
                    <CardDescription>Goal difference analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px]">
                      <ChartContainer
                        data={performanceData}
                        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                      >
                        <BarChart>
                          <Bar
                            dataKey="goalsFor"
                            fill="#4ade80"
                            name="Goals For"
                          />
                          <Bar
                            dataKey="goalsAgainst"
                            fill="#f87171"
                            name="Goals Against"
                          />
                          <ChartTooltip
                            content={
                              <ChartTooltipContent className="bg-background border-border" />
                            }
                          />
                        </BarChart>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Match Results</CardTitle>
                    <CardDescription>
                      Win, draw, and loss distribution
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center">
                    <div className="h-[250px] w-[250px]">
                      <ChartContainer
                        data={[
                          { name: "Wins", value: 5 },
                          { name: "Draws", value: 2 },
                          { name: "Losses", value: 1 },
                        ]}
                        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                      >
                        <PieChart>
                          <Pie
                            data={[
                              { name: "Wins", value: 5 },
                              { name: "Draws", value: 2 },
                              { name: "Losses", value: 1 },
                            ]}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                            label
                          >
                            {[
                              { name: "Wins", value: 5 },
                              { name: "Draws", value: 2 },
                              { name: "Losses", value: 1 },
                            ].map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={
                                  ["#4ade80", "#facc15", "#f87171"][index % 3]
                                }
                              />
                            ))}
                          </Pie>
                          <ChartTooltip
                            content={
                              <ChartTooltipContent className="bg-background border-border" />
                            }
                          />
                        </PieChart>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="players" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">
                    Player Ratings by Position
                  </CardTitle>
                  <CardDescription>
                    Current ratings and potential
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ChartContainer
                      data={positionData}
                      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                    >
                      <BarChart>
                        <Bar
                          dataKey="rating"
                          fill="#3b82f6"
                          name="Current Rating"
                        />
                        <Bar
                          dataKey="potential"
                          fill="#8b5cf6"
                          name="Potential"
                        />
                        <ChartTooltip
                          content={
                            <ChartTooltipContent className="bg-background border-border" />
                          }
                        />
                      </BarChart>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Top Performers</CardTitle>
                    <CardDescription>Highest rated players</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {[
                        { name: "Mark Williams", position: "ST", rating: 86 },
                        { name: "Chris Johnson", position: "LW", rating: 85 },
                        { name: "Steven Taylor", position: "CDM", rating: 84 },
                      ].map((player, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 rounded-md bg-muted/50"
                        >
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                              {index + 1}
                            </div>
                            <div>
                              <div className="font-medium">{player.name}</div>
                              <Badge variant="outline">{player.position}</Badge>
                            </div>
                          </div>
                          <div className="font-bold">{player.rating}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Form Players</CardTitle>
                    <CardDescription>Players in excellent form</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {[
                        {
                          name: "Chris Johnson",
                          position: "LW",
                          form: "Excellent",
                        },
                        {
                          name: "Thomas Lee",
                          position: "RB",
                          form: "Excellent",
                        },
                        {
                          name: "Eric Thompson",
                          position: "LW",
                          form: "Excellent",
                        },
                      ].map((player, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 rounded-md bg-muted/50"
                        >
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                            <div>
                              <div className="font-medium">{player.name}</div>
                              <Badge variant="outline">{player.position}</Badge>
                            </div>
                          </div>
                          <Badge className="bg-green-500">{player.form}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">
                      Fitness Concerns
                    </CardTitle>
                    <CardDescription>Players with low fitness</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {[
                        { name: "John Smith", position: "ST", fitness: 45 },
                        { name: "Mike Johnson", position: "CM", fitness: 65 },
                      ].map((player, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 rounded-md bg-muted/50"
                        >
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                            <div>
                              <div className="font-medium">{player.name}</div>
                              <Badge variant="outline">{player.position}</Badge>
                            </div>
                          </div>
                          <div className="text-red-500 font-medium">
                            {player.fitness}%
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="attributes" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Team Attributes</CardTitle>
                  <CardDescription>
                    {compareTeam !== "none"
                      ? `Comparing with ${comparisonData[compareTeam as keyof typeof comparisonData].name}`
                      : "Overall team attributes"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ChartContainer
                      data={getComparisonData()}
                      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                    >
                      <BarChart>
                        <Bar dataKey="Your Team" fill="#3b82f6" />
                        {compareTeam !== "none" && (
                          <Bar
                            dataKey={
                              comparisonData[
                                compareTeam as keyof typeof comparisonData
                              ].name
                            }
                            fill="#f97316"
                          />
                        )}
                        <ChartTooltip
                          content={
                            <ChartTooltipContent className="bg-background border-border" />
                          }
                        />
                      </BarChart>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">
                      Strengths & Weaknesses
                    </CardTitle>
                    <CardDescription>
                      Analysis of team attributes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">
                          Team Strengths
                        </h4>
                        <div className="space-y-2">
                          {attributeData
                            .sort((a, b) => b.value - a.value)
                            .slice(0, 3)
                            .map((attr, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between"
                              >
                                <span>{attr.name}</span>
                                <div className="flex items-center">
                                  <span className="font-bold mr-2">
                                    {attr.value}
                                  </span>
                                  <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-green-500 rounded-full"
                                      style={{ width: `${attr.value}%` }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-2">
                          Team Weaknesses
                        </h4>
                        <div className="space-y-2">
                          {attributeData
                            .sort((a, b) => a.value - b.value)
                            .slice(0, 3)
                            .map((attr, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between"
                              >
                                <span>{attr.name}</span>
                                <div className="flex items-center">
                                  <span className="font-bold mr-2">
                                    {attr.value}
                                  </span>
                                  <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-amber-500 rounded-full"
                                      style={{ width: `${attr.value}%` }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">
                      Playing Style Analysis
                    </CardTitle>
                    <CardDescription>Based on team attributes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 rounded-md bg-muted/50">
                        <h4 className="font-medium mb-1">Recommended Style</h4>
                        <p className="text-sm text-muted-foreground">
                          Based on your team's attributes, a{" "}
                          <span className="font-medium">Possession-based</span>{" "}
                          style would be most effective, utilizing your strong
                          passing and technical abilities.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Possession</span>
                          <div className="w-32 h-2 bg-secondary rounded-full">
                            <div className="bg-blue-500 h-2 rounded-full w-[85%]"></div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Counter-Attack</span>
                          <div className="w-32 h-2 bg-secondary rounded-full">
                            <div className="bg-blue-500 h-2 rounded-full w-[70%]"></div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">High Press</span>
                          <div className="w-32 h-2 bg-secondary rounded-full">
                            <div className="bg-blue-500 h-2 rounded-full w-[65%]"></div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Defensive</span>
                          <div className="w-32 h-2 bg-secondary rounded-full">
                            <div className="bg-blue-500 h-2 rounded-full w-[60%]"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="composition" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">
                      Age Distribution
                    </CardTitle>
                    <CardDescription>Player age groups</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center">
                      <div className="h-[250px] w-[250px]">
                        <ChartContainer
                          data={compositionData}
                          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                        >
                          <PieChart>
                            <Pie
                              data={compositionData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              nameKey="name"
                              label
                            >
                              {compositionData.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={COLORS[index % COLORS.length]}
                                />
                              ))}
                            </Pie>
                            <ChartTooltip
                              content={
                                <ChartTooltipContent
                                  className="bg-background border-border"
                                  valueSuffix="%"
                                />
                              }
                            />
                          </PieChart>
                        </ChartContainer>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">
                      Squad Composition
                    </CardTitle>
                    <CardDescription>Players by position</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ChartContainer
                        data={[
                          { name: "Goalkeepers", value: 2 },
                          { name: "Defenders", value: 6 },
                          { name: "Midfielders", value: 7 },
                          { name: "Forwards", value: 5 },
                        ]}
                        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                      >
                        <BarChart>
                          <Bar dataKey="value" fill="#3b82f6" />
                          <ChartTooltip
                            content={
                              <ChartTooltipContent
                                className="bg-background border-border"
                                valueSuffix=" players"
                              />
                            }
                          />
                        </BarChart>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">
                    Nationality Distribution
                  </CardTitle>
                  <CardDescription>Players by country</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {[
                      { country: "England", count: 7, percentage: 35 },
                      { country: "Spain", count: 2, percentage: 10 },
                      { country: "France", count: 2, percentage: 10 },
                      { country: "Brazil", count: 1, percentage: 5 },
                      { country: "Argentina", count: 1, percentage: 5 },
                      { country: "Germany", count: 1, percentage: 5 },
                      { country: "Italy", count: 1, percentage: 5 },
                      { country: "Wales", count: 2, percentage: 10 },
                      { country: "Scotland", count: 1, percentage: 5 },
                      { country: "USA", count: 1, percentage: 5 },
                      { country: "Denmark", count: 1, percentage: 5 },
                      { country: "South Korea", count: 1, percentage: 5 },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center p-3 border rounded-md"
                      >
                        <div className="font-medium">{item.country}</div>
                        <div className="text-2xl font-bold">{item.count}</div>
                        <div className="text-xs text-muted-foreground">
                          {item.percentage}% of squad
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
}
