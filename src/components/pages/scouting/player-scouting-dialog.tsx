"use client";

import { useState } from "react";

import {
  AlertTriangle,
  BarChart3,
  Brain,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  Dumbbell,
  FileText,
  Filter,
  Heart,
  Search,
  Shield,
  Star,
  TrendingDown,
  TrendingUp,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Types
type Player = {
  id: number;
  name: string;
  position: string;
  age: number;
  nationality: string;
  rating: number;
  form: "excellent" | "good" | "average" | "poor";
  fitness: number;
  morale: "high" | "normal" | "low";
  attributes: {
    pace: number;
    shooting: number;
    passing: number;
    dribbling: number;
    defending: number;
    physical: number;
    mental: number;
    technical: number;
  };
  stats: {
    appearances: number;
    goals: number;
    assists: number;
    cleanSheets?: number;
    passAccuracy: number;
    tacklesPerGame: number;
    interceptions: number;
    minutesPlayed: number;
    rating: number;
  };
  scoutingLevel: number; // 1-5, represents how much info we have on the player
  strengths: string[];
  weaknesses: string[];
  developmentAreas: string[];
};

export default function PlayerScoutingDialog() {
  // State for players
  const [players, setPlayers] = useState<Player[]>([
    {
      id: 1,
      name: "David Miller",
      position: "GK",
      age: 28,
      nationality: "England",
      rating: 82,
      form: "good",
      fitness: 95,
      morale: "high",
      attributes: {
        pace: 50,
        shooting: 25,
        passing: 65,
        dribbling: 30,
        defending: 40,
        physical: 75,
        mental: 80,
        technical: 85,
      },
      stats: {
        appearances: 24,
        goals: 0,
        assists: 0,
        cleanSheets: 9,
        passAccuracy: 88,
        tacklesPerGame: 0.2,
        interceptions: 0.5,
        minutesPlayed: 2160,
        rating: 7.4,
      },
      scoutingLevel: 5,
      strengths: ["Shot stopping", "Aerial ability", "Concentration"],
      weaknesses: ["Distribution with feet", "Command of area"],
      developmentAreas: ["Positioning", "One-on-one situations"],
    },
    {
      id: 2,
      name: "James Wilson",
      position: "LB",
      age: 24,
      nationality: "Wales",
      rating: 78,
      form: "average",
      fitness: 88,
      morale: "normal",
      attributes: {
        pace: 82,
        shooting: 60,
        passing: 75,
        dribbling: 78,
        defending: 76,
        physical: 72,
        mental: 70,
        technical: 75,
      },
      stats: {
        appearances: 22,
        goals: 1,
        assists: 3,
        passAccuracy: 82,
        tacklesPerGame: 2.5,
        interceptions: 1.8,
        minutesPlayed: 1980,
        rating: 7.1,
      },
      scoutingLevel: 4,
      strengths: ["Crossing", "Stamina", "Work rate"],
      weaknesses: ["Aerial duels", "Concentration"],
      developmentAreas: ["Defensive positioning", "Tackling technique"],
    },
    {
      id: 3,
      name: "Robert Garcia",
      position: "CB",
      age: 29,
      nationality: "Spain",
      rating: 81,
      form: "good",
      fitness: 92,
      morale: "normal",
      attributes: {
        pace: 65,
        shooting: 45,
        passing: 70,
        dribbling: 60,
        defending: 85,
        physical: 84,
        mental: 80,
        technical: 75,
      },
      stats: {
        appearances: 23,
        goals: 2,
        assists: 0,
        passAccuracy: 90,
        tacklesPerGame: 2.8,
        interceptions: 2.2,
        minutesPlayed: 2025,
        rating: 7.3,
      },
      scoutingLevel: 5,
      strengths: ["Aerial ability", "Tackling", "Leadership"],
      weaknesses: ["Pace", "Agility"],
      developmentAreas: ["Ball playing", "Anticipation"],
    },
    {
      id: 4,
      name: "Michael Brown",
      position: "CB",
      age: 27,
      nationality: "England",
      rating: 80,
      form: "good",
      fitness: 90,
      morale: "high",
      attributes: {
        pace: 70,
        shooting: 40,
        passing: 65,
        dribbling: 55,
        defending: 83,
        physical: 85,
        mental: 75,
        technical: 70,
      },
      stats: {
        appearances: 24,
        goals: 1,
        assists: 1,
        passAccuracy: 85,
        tacklesPerGame: 2.6,
        interceptions: 2.0,
        minutesPlayed: 2160,
        rating: 7.5,
      },
      scoutingLevel: 4,
      strengths: ["Strength", "Tackling", "Bravery"],
      weaknesses: ["Technical ability", "Passing range"],
      developmentAreas: ["Positioning", "Decision making"],
    },
    {
      id: 5,
      name: "Thomas Lee",
      position: "RB",
      age: 25,
      nationality: "South Korea",
      rating: 79,
      form: "excellent",
      fitness: 94,
      morale: "high",
      attributes: {
        pace: 85,
        shooting: 65,
        passing: 72,
        dribbling: 75,
        defending: 77,
        physical: 74,
        mental: 72,
        technical: 78,
      },
      stats: {
        appearances: 21,
        goals: 0,
        assists: 4,
        passAccuracy: 80,
        tacklesPerGame: 2.3,
        interceptions: 1.5,
        minutesPlayed: 1890,
        rating: 7.2,
      },
      scoutingLevel: 3,
      strengths: ["Speed", "Stamina", "Crossing"],
      weaknesses: ["Defensive positioning", "Aerial duels"],
      developmentAreas: ["Tackling", "Decision making"],
    },
    {
      id: 6,
      name: "Daniel Martinez",
      position: "CM",
      age: 26,
      nationality: "Argentina",
      rating: 83,
      form: "good",
      fitness: 87,
      morale: "normal",
      attributes: {
        pace: 75,
        shooting: 78,
        passing: 85,
        dribbling: 82,
        defending: 70,
        physical: 72,
        mental: 85,
        technical: 86,
      },
      stats: {
        appearances: 19,
        goals: 3,
        assists: 7,
        passAccuracy: 92,
        tacklesPerGame: 1.8,
        interceptions: 1.2,
        minutesPlayed: 1710,
        rating: 7.8,
      },
      scoutingLevel: 5,
      strengths: ["Vision", "Passing", "Creativity"],
      weaknesses: ["Defensive work rate", "Aerial ability"],
      developmentAreas: ["Shooting", "Physical strength"],
    },
    {
      id: 7,
      name: "Steven Taylor",
      position: "CDM",
      age: 30,
      nationality: "England",
      rating: 84,
      form: "average",
      fitness: 91,
      morale: "normal",
      attributes: {
        pace: 65,
        shooting: 70,
        passing: 82,
        dribbling: 75,
        defending: 85,
        physical: 83,
        mental: 88,
        technical: 80,
      },
      stats: {
        appearances: 23,
        goals: 1,
        assists: 2,
        passAccuracy: 90,
        tacklesPerGame: 3.2,
        interceptions: 2.5,
        minutesPlayed: 2070,
        rating: 7.4,
      },
      scoutingLevel: 5,
      strengths: ["Positioning", "Tackling", "Leadership"],
      weaknesses: ["Pace", "Agility"],
      developmentAreas: ["Forward passing", "Long shots"],
    },
    {
      id: 8,
      name: "Kevin Anderson",
      position: "CM",
      age: 27,
      nationality: "Denmark",
      rating: 82,
      form: "good",
      fitness: 89,
      morale: "high",
      attributes: {
        pace: 78,
        shooting: 80,
        passing: 84,
        dribbling: 80,
        defending: 72,
        physical: 75,
        mental: 82,
        technical: 83,
      },
      stats: {
        appearances: 20,
        goals: 2,
        assists: 5,
        passAccuracy: 88,
        tacklesPerGame: 1.5,
        interceptions: 1.0,
        minutesPlayed: 1800,
        rating: 7.3,
      },
      scoutingLevel: 4,
      strengths: ["Box-to-box ability", "Shooting", "Work rate"],
      weaknesses: ["Defensive positioning", "Concentration"],
      developmentAreas: ["Tackling", "Aerial ability"],
    },
    {
      id: 9,
      name: "Chris Johnson",
      position: "LW",
      age: 23,
      nationality: "USA",
      rating: 85,
      form: "excellent",
      fitness: 93,
      morale: "high",
      attributes: {
        pace: 90,
        shooting: 82,
        passing: 78,
        dribbling: 88,
        defending: 45,
        physical: 70,
        mental: 75,
        technical: 85,
      },
      stats: {
        appearances: 24,
        goals: 8,
        assists: 6,
        passAccuracy: 80,
        tacklesPerGame: 0.8,
        interceptions: 0.5,
        minutesPlayed: 2160,
        rating: 8.1,
      },
      scoutingLevel: 5,
      strengths: ["Pace", "Dribbling", "Finishing"],
      weaknesses: ["Defensive contribution", "Aerial ability"],
      developmentAreas: ["Decision making", "Crossing"],
    },
    {
      id: 10,
      name: "Mark Williams",
      position: "ST",
      age: 29,
      nationality: "England",
      rating: 86,
      form: "good",
      fitness: 90,
      morale: "high",
      attributes: {
        pace: 82,
        shooting: 88,
        passing: 75,
        dribbling: 80,
        defending: 40,
        physical: 85,
        mental: 83,
        technical: 84,
      },
      stats: {
        appearances: 23,
        goals: 17,
        assists: 4,
        passAccuracy: 75,
        tacklesPerGame: 0.5,
        interceptions: 0.3,
        minutesPlayed: 2070,
        rating: 8.3,
      },
      scoutingLevel: 5,
      strengths: ["Finishing", "Heading", "Positioning"],
      weaknesses: ["Defensive work", "Passing"],
      developmentAreas: ["Link-up play", "Hold-up play"],
    },
    {
      id: 11,
      name: "Paul Davis",
      position: "RW",
      age: 24,
      nationality: "France",
      rating: 84,
      form: "average",
      fitness: 86,
      morale: "normal",
      attributes: {
        pace: 88,
        shooting: 80,
        passing: 82,
        dribbling: 86,
        defending: 50,
        physical: 72,
        mental: 78,
        technical: 85,
      },
      stats: {
        appearances: 22,
        goals: 6,
        assists: 9,
        passAccuracy: 82,
        tacklesPerGame: 0.9,
        interceptions: 0.6,
        minutesPlayed: 1980,
        rating: 7.6,
      },
      scoutingLevel: 4,
      strengths: ["Dribbling", "Crossing", "Creativity"],
      weaknesses: ["Defensive work rate", "Physical strength"],
      developmentAreas: ["Finishing", "Decision making"],
    },
    {
      id: 12,
      name: "John Smith",
      position: "ST",
      age: 26,
      nationality: "England",
      rating: 81,
      form: "poor",
      fitness: 45,
      morale: "low",
      attributes: {
        pace: 80,
        shooting: 85,
        passing: 70,
        dribbling: 78,
        defending: 35,
        physical: 80,
        mental: 75,
        technical: 80,
      },
      stats: {
        appearances: 18,
        goals: 7,
        assists: 2,
        passAccuracy: 70,
        tacklesPerGame: 0.4,
        interceptions: 0.2,
        minutesPlayed: 1530,
        rating: 7.1,
      },
      scoutingLevel: 3,
      strengths: ["Finishing", "Movement", "Aerial ability"],
      weaknesses: ["Link-up play", "Work rate"],
      developmentAreas: ["Hold-up play", "Pressing"],
    },
  ]);

  // State for filters and sorting
  const [searchTerm, setSearchTerm] = useState("");
  const [positionFilter, setPositionFilter] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [showPlayerDetails, setShowPlayerDetails] = useState(false);
  const [activeDetailTab, setActiveDetailTab] = useState("overview");

  // Filter and sort players
  const filteredPlayers = players
    .filter((player) => {
      // Search filter
      const matchesSearch =
        player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.nationality.toLowerCase().includes(searchTerm.toLowerCase());

      // Position filter
      const matchesPosition =
        positionFilter === "all" ||
        (positionFilter === "gk" && player.position === "GK") ||
        (positionFilter === "def" &&
          ["CB", "LB", "RB", "LWB", "RWB"].includes(player.position)) ||
        (positionFilter === "mid" &&
          ["CM", "CDM", "CAM", "LM", "RM"].includes(player.position)) ||
        (positionFilter === "att" &&
          ["ST", "LW", "RW", "CF"].includes(player.position));

      return matchesSearch && matchesPosition;
    })
    .sort((a, b) => {
      // Sort logic
      if (sortBy === "rating") {
        return sortOrder === "desc" ? b.rating - a.rating : a.rating - b.rating;
      } else if (sortBy === "name") {
        return sortOrder === "desc"
          ? b.name.localeCompare(a.name)
          : a.name.localeCompare(b.name);
      } else if (sortBy === "age") {
        return sortOrder === "desc" ? b.age - a.age : a.age - b.age;
      } else if (sortBy === "fitness") {
        return sortOrder === "desc"
          ? b.fitness - a.fitness
          : a.fitness - b.fitness;
      } else if (sortBy === "form") {
        const formRank = { excellent: 4, good: 3, average: 2, poor: 1 };
        return sortOrder === "desc"
          ? formRank[b.form as keyof typeof formRank] -
              formRank[a.form as keyof typeof formRank]
          : formRank[a.form as keyof typeof formRank] -
              formRank[b.form as keyof typeof formRank];
      }
      return 0;
    });

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "desc" ? "asc" : "desc");
  };

  // Handle viewing player details
  const handleViewPlayer = (player: Player) => {
    setSelectedPlayer(player);
    setShowPlayerDetails(true);
    setActiveDetailTab("overview");
  };

  // Get form badge
  const getFormBadge = (form: string) => {
    switch (form) {
      case "excellent":
        return <Badge className="bg-green-500">Excellent</Badge>;
      case "good":
        return <Badge className="bg-emerald-400">Good</Badge>;
      case "average":
        return <Badge className="bg-amber-400">Average</Badge>;
      case "poor":
        return <Badge className="bg-red-400">Poor</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Get fitness color
  const getFitnessColor = (fitness: number) => {
    if (fitness >= 90) return "text-green-500";
    if (fitness >= 75) return "text-emerald-400";
    if (fitness >= 60) return "text-amber-400";
    return "text-red-500";
  };

  // Get morale badge
  const getMoraleBadge = (morale: string) => {
    switch (morale) {
      case "high":
        return <Badge className="bg-green-500">High Morale</Badge>;
      case "normal":
        return <Badge className="bg-blue-500">Normal</Badge>;
      case "low":
        return <Badge className="bg-amber-500">Low Morale</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Get scouting level stars
  const getScoutingLevelStars = (level: number) => {
    return (
      <div className="flex">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <Star
              key={i}
              className={`h-3 w-3 ${i < level ? "text-amber-400 fill-amber-400" : "text-gray-300"}`}
            />
          ))}
      </div>
    );
  };

  return (
    <Dialog open={showPlayerDetails} onOpenChange={setShowPlayerDetails}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        {selectedPlayer && (
          <>
            <DialogHeader>
              <DialogTitle>Player Scouting Report</DialogTitle>
              <DialogDescription>
                Detailed analysis of {selectedPlayer.name} (
                {selectedPlayer.position})
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center font-bold text-2xl mb-2">
                    {selectedPlayer.rating}
                  </div>
                  <h3 className="text-lg font-bold">{selectedPlayer.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge>{selectedPlayer.position}</Badge>
                    <Badge variant="outline">
                      {selectedPlayer.nationality}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    {getFormBadge(selectedPlayer.form)}
                    {getMoraleBadge(selectedPlayer.morale)}
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Age: {selectedPlayer.age} • Fitness:{" "}
                    {selectedPlayer.fitness}%
                  </div>
                  <div className="mt-2">
                    <div className="text-sm text-center mb-1">
                      Scouting Level
                    </div>
                    {getScoutingLevelStars(selectedPlayer.scoutingLevel)}
                  </div>
                </div>

                <div className="flex-1">
                  <Tabs
                    value={activeDetailTab}
                    onValueChange={setActiveDetailTab}
                  >
                    <TabsList className="grid grid-cols-4 mb-4">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="attributes">Attributes</TabsTrigger>
                      <TabsTrigger value="stats">Statistics</TabsTrigger>
                      <TabsTrigger value="analysis">Analysis</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">
                              Key Strengths
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {selectedPlayer.strengths.map(
                                (strength, index) => (
                                  <li key={index} className="flex items-center">
                                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                    <span>{strength}</span>
                                  </li>
                                ),
                              )}
                            </ul>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">
                              Areas to Improve
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {selectedPlayer.weaknesses.map(
                                (weakness, index) => (
                                  <li key={index} className="flex items-center">
                                    <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" />
                                    <span>{weakness}</span>
                                  </li>
                                ),
                              )}
                            </ul>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">
                              Development Focus
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {selectedPlayer.developmentAreas.map(
                                (area, index) => (
                                  <li key={index} className="flex items-center">
                                    <TrendingUp className="h-4 w-4 text-blue-500 mr-2" />
                                    <span>{area}</span>
                                  </li>
                                ),
                              )}
                            </ul>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">
                              Current Form
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div>
                                <div className="flex justify-between mb-1">
                                  <span className="text-sm">Form</span>
                                  <span className="text-sm font-medium capitalize">
                                    {selectedPlayer.form}
                                  </span>
                                </div>
                                <Progress
                                  value={
                                    selectedPlayer.form === "excellent"
                                      ? 90
                                      : selectedPlayer.form === "good"
                                        ? 75
                                        : selectedPlayer.form === "average"
                                          ? 50
                                          : 25
                                  }
                                  className="h-2"
                                />
                              </div>
                              <div>
                                <div className="flex justify-between mb-1">
                                  <span className="text-sm">Fitness</span>
                                  <span className="text-sm font-medium">
                                    {selectedPlayer.fitness}%
                                  </span>
                                </div>
                                <Progress
                                  value={selectedPlayer.fitness}
                                  className="h-2"
                                />
                              </div>
                              <div>
                                <div className="flex justify-between mb-1">
                                  <span className="text-sm">Morale</span>
                                  <span className="text-sm font-medium capitalize">
                                    {selectedPlayer.morale}
                                  </span>
                                </div>
                                <Progress
                                  value={
                                    selectedPlayer.morale === "high"
                                      ? 90
                                      : selectedPlayer.morale === "normal"
                                        ? 60
                                        : 30
                                  }
                                  className="h-2"
                                />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">
                            Scout's Summary
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">
                            {selectedPlayer.name} is a {selectedPlayer.age}
                            -year-old {selectedPlayer.position} from{" "}
                            {selectedPlayer.nationality}.
                            {selectedPlayer.form === "excellent"
                              ? " Currently in excellent form, showing consistently high performance levels."
                              : selectedPlayer.form === "good"
                                ? " Currently in good form, performing well in most matches."
                                : selectedPlayer.form === "average"
                                  ? " Currently in average form, with inconsistent performances."
                                  : " Currently in poor form, struggling to perform at expected levels."}
                          </p>
                          <p className="text-sm mt-2">
                            {selectedPlayer.morale === "high"
                              ? "Player morale is high, which is positively affecting performance."
                              : selectedPlayer.morale === "normal"
                                ? "Player morale is at normal levels."
                                : "Player morale is low, which may be negatively affecting performance."}
                            {selectedPlayer.fitness >= 90
                              ? " Fitness levels are excellent."
                              : selectedPlayer.fitness >= 75
                                ? " Fitness levels are good."
                                : selectedPlayer.fitness >= 60
                                  ? " Fitness levels are average."
                                  : " Fitness levels are concerning and need attention."}
                          </p>
                          <p className="text-sm mt-2">
                            Key strengths include{" "}
                            {selectedPlayer.strengths.slice(0, 2).join(" and ")}
                            , while areas for improvement include{" "}
                            {selectedPlayer.weaknesses
                              .slice(0, 2)
                              .join(" and ")}
                            . Development should focus on{" "}
                            {selectedPlayer.developmentAreas
                              .slice(0, 2)
                              .join(" and ")}
                            .
                          </p>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="attributes" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h3 className="font-medium">Technical Attributes</h3>
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Pace</span>
                                <span className="text-sm font-medium">
                                  {selectedPlayer.attributes.pace}
                                </span>
                              </div>
                              <Progress
                                value={selectedPlayer.attributes.pace}
                                className="h-2"
                              />
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Shooting</span>
                                <span className="text-sm font-medium">
                                  {selectedPlayer.attributes.shooting}
                                </span>
                              </div>
                              <Progress
                                value={selectedPlayer.attributes.shooting}
                                className="h-2"
                              />
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Passing</span>
                                <span className="text-sm font-medium">
                                  {selectedPlayer.attributes.passing}
                                </span>
                              </div>
                              <Progress
                                value={selectedPlayer.attributes.passing}
                                className="h-2"
                              />
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Dribbling</span>
                                <span className="text-sm font-medium">
                                  {selectedPlayer.attributes.dribbling}
                                </span>
                              </div>
                              <Progress
                                value={selectedPlayer.attributes.dribbling}
                                className="h-2"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="font-medium">
                            Physical & Mental Attributes
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Defending</span>
                                <span className="text-sm font-medium">
                                  {selectedPlayer.attributes.defending}
                                </span>
                              </div>
                              <Progress
                                value={selectedPlayer.attributes.defending}
                                className="h-2"
                              />
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Physical</span>
                                <span className="text-sm font-medium">
                                  {selectedPlayer.attributes.physical}
                                </span>
                              </div>
                              <Progress
                                value={selectedPlayer.attributes.physical}
                                className="h-2"
                              />
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Mental</span>
                                <span className="text-sm font-medium">
                                  {selectedPlayer.attributes.mental}
                                </span>
                              </div>
                              <Progress
                                value={selectedPlayer.attributes.mental}
                                className="h-2"
                              />
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Technical</span>
                                <span className="text-sm font-medium">
                                  {selectedPlayer.attributes.technical}
                                </span>
                              </div>
                              <Progress
                                value={selectedPlayer.attributes.technical}
                                className="h-2"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base flex items-center">
                              <Zap className="h-4 w-4 mr-2 text-amber-500" />
                              Technical Profile
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-sm">
                              {selectedPlayer.attributes.technical >= 85
                                ? "Exceptional technical ability, can control the ball in tight spaces and execute complex skills."
                                : selectedPlayer.attributes.technical >= 75
                                  ? "Good technical ability, comfortable on the ball in most situations."
                                  : "Average technical ability, occasionally struggles with ball control under pressure."}
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base flex items-center">
                              <Dumbbell className="h-4 w-4 mr-2 text-blue-500" />
                              Physical Profile
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-sm">
                              {selectedPlayer.attributes.physical >= 85
                                ? "Exceptional physical attributes, dominates in physical duels and shows great stamina."
                                : selectedPlayer.attributes.physical >= 75
                                  ? "Good physical presence, holds their own in most physical confrontations."
                                  : "Average physical attributes, can be outmuscled by stronger opponents."}
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base flex items-center">
                              <Brain className="h-4 w-4 mr-2 text-purple-500" />
                              Mental Profile
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-sm">
                              {selectedPlayer.attributes.mental >= 85
                                ? "Exceptional mental attributes, shows great decision-making and concentration."
                                : selectedPlayer.attributes.mental >= 75
                                  ? "Good mental attributes, generally makes good decisions under pressure."
                                  : "Average mental attributes, occasionally makes poor decisions in key moments."}
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">
                            Attribute Recommendations
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">
                            Based on {selectedPlayer.name}'s attribute profile,
                            training should focus on:
                          </p>
                          <ul className="mt-2 space-y-1 text-sm">
                            {selectedPlayer.attributes.pace < 70 && (
                              <li className="flex items-center">
                                <TrendingUp className="h-4 w-4 text-blue-500 mr-2" />
                                <span>
                                  Improving pace through sprint training and
                                  agility drills
                                </span>
                              </li>
                            )}
                            {selectedPlayer.attributes.shooting < 70 && (
                              <li className="flex items-center">
                                <TrendingUp className="h-4 w-4 text-blue-500 mr-2" />
                                <span>
                                  Enhancing shooting accuracy through finishing
                                  drills
                                </span>
                              </li>
                            )}
                            {selectedPlayer.attributes.passing < 70 && (
                              <li className="flex items-center">
                                <TrendingUp className="h-4 w-4 text-blue-500 mr-2" />
                                <span>
                                  Developing passing range and accuracy
                                </span>
                              </li>
                            )}
                            {selectedPlayer.attributes.dribbling < 70 && (
                              <li className="flex items-center">
                                <TrendingUp className="h-4 w-4 text-blue-500 mr-2" />
                                <span>
                                  Improving ball control and dribbling skills
                                </span>
                              </li>
                            )}
                            {selectedPlayer.attributes.defending < 70 && (
                              <li className="flex items-center">
                                <TrendingUp className="h-4 w-4 text-blue-500 mr-2" />
                                <span>
                                  Enhancing defensive positioning and tackling
                                </span>
                              </li>
                            )}
                            {selectedPlayer.attributes.physical < 70 && (
                              <li className="flex items-center">
                                <TrendingUp className="h-4 w-4 text-blue-500 mr-2" />
                                <span>
                                  Building physical strength and stamina
                                </span>
                              </li>
                            )}
                            {selectedPlayer.attributes.mental < 70 && (
                              <li className="flex items-center">
                                <TrendingUp className="h-4 w-4 text-blue-500 mr-2" />
                                <span>
                                  Developing decision-making and concentration
                                </span>
                              </li>
                            )}
                            {selectedPlayer.attributes.technical < 70 && (
                              <li className="flex items-center">
                                <TrendingUp className="h-4 w-4 text-blue-500 mr-2" />
                                <span>
                                  Improving technical skills and ball control
                                </span>
                              </li>
                            )}
                            {Object.values(selectedPlayer.attributes).every(
                              (attr) => attr >= 70,
                            ) && (
                              <li className="flex items-center">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                <span>
                                  Player has well-rounded attributes. Focus on
                                  maintaining balance while enhancing strengths.
                                </span>
                              </li>
                            )}
                          </ul>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="stats" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">
                              Performance Statistics
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <span>Appearances</span>
                                <span className="font-medium">
                                  {selectedPlayer.stats.appearances}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Minutes Played</span>
                                <span className="font-medium">
                                  {selectedPlayer.stats.minutesPlayed}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Average Rating</span>
                                <span className="font-medium">
                                  {selectedPlayer.stats.rating.toFixed(1)}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Goals</span>
                                <span className="font-medium">
                                  {selectedPlayer.stats.goals}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Assists</span>
                                <span className="font-medium">
                                  {selectedPlayer.stats.assists}
                                </span>
                              </div>
                              {selectedPlayer.position === "GK" && (
                                <div className="flex justify-between">
                                  <span>Clean Sheets</span>
                                  <span className="font-medium">
                                    {selectedPlayer.stats.cleanSheets}
                                  </span>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">
                              Detailed Metrics
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <span>Pass Accuracy</span>
                                <span className="font-medium">
                                  {selectedPlayer.stats.passAccuracy}%
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Tackles Per Game</span>
                                <span className="font-medium">
                                  {selectedPlayer.stats.tacklesPerGame.toFixed(
                                    1,
                                  )}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Interceptions</span>
                                <span className="font-medium">
                                  {selectedPlayer.stats.interceptions}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Minutes Per Goal</span>
                                <span className="font-medium">
                                  {selectedPlayer.stats.goals > 0
                                    ? Math.round(
                                        selectedPlayer.stats.minutesPlayed /
                                          selectedPlayer.stats.goals,
                                      )
                                    : "-"}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Minutes Per Assist</span>
                                <span className="font-medium">
                                  {selectedPlayer.stats.assists > 0
                                    ? Math.round(
                                        selectedPlayer.stats.minutesPlayed /
                                          selectedPlayer.stats.assists,
                                      )
                                    : "-"}
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">
                            Performance Analysis
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">
                            {selectedPlayer.name} has made{" "}
                            {selectedPlayer.stats.appearances} appearances this
                            season, playing a total of{" "}
                            {selectedPlayer.stats.minutesPlayed} minutes.
                            {selectedPlayer.stats.goals > 0 &&
                              ` They have scored ${selectedPlayer.stats.goals} goals`}
                            {selectedPlayer.stats.assists > 0 &&
                              ` and provided ${selectedPlayer.stats.assists} assists`}
                            .
                            {selectedPlayer.position === "GK" &&
                              selectedPlayer.stats.cleanSheets &&
                              ` They have kept ${selectedPlayer.stats.cleanSheets} clean sheets.`}
                          </p>
                          <p className="text-sm mt-2">
                            With an average rating of{" "}
                            {selectedPlayer.stats.rating.toFixed(1)},
                            {selectedPlayer.stats.rating >= 8.0
                              ? " they have been performing exceptionally well."
                              : selectedPlayer.stats.rating >= 7.5
                                ? " they have been performing very well."
                                : selectedPlayer.stats.rating >= 7.0
                                  ? " they have been performing well."
                                  : " they have been performing adequately but there is room for improvement."}
                          </p>
                          <p className="text-sm mt-2">
                            Their pass accuracy of{" "}
                            {selectedPlayer.stats.passAccuracy}% is
                            {selectedPlayer.stats.passAccuracy >= 90
                              ? " excellent, showing great precision in distribution."
                              : selectedPlayer.stats.passAccuracy >= 80
                                ? " good, showing reliable passing ability."
                                : " average, and could be improved with focused training."}
                            {selectedPlayer.stats.tacklesPerGame > 2.0
                              ? " They make a significant defensive contribution with " +
                                selectedPlayer.stats.tacklesPerGame.toFixed(1) +
                                " tackles per game."
                              : ""}
                          </p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">
                            Statistical Recommendations
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2 text-sm">
                            {selectedPlayer.stats.passAccuracy < 80 && (
                              <li className="flex items-center">
                                <TrendingUp className="h-4 w-4 text-blue-500 mr-2" />
                                <span>
                                  Focus on improving passing accuracy through
                                  targeted training drills
                                </span>
                              </li>
                            )}
                            {selectedPlayer.position !== "GK" &&
                              selectedPlayer.stats.tacklesPerGame < 1.5 && (
                                <li className="flex items-center">
                                  <TrendingUp className="h-4 w-4 text-blue-500 mr-2" />
                                  <span>
                                    Work on defensive contribution and tackling
                                    technique
                                  </span>
                                </li>
                              )}
                            {selectedPlayer.stats.rating < 7.0 && (
                              <li className="flex items-center">
                                <TrendingUp className="h-4 w-4 text-blue-500 mr-2" />
                                <span>
                                  Overall performance needs improvement -
                                  consider specialized coaching
                                </span>
                              </li>
                            )}
                            {["ST", "CF", "LW", "RW"].includes(
                              selectedPlayer.position,
                            ) &&
                              selectedPlayer.stats.goals < 5 && (
                                <li className="flex items-center">
                                  <TrendingUp className="h-4 w-4 text-blue-500 mr-2" />
                                  <span>
                                    Focus on improving finishing and
                                    goal-scoring opportunities
                                  </span>
                                </li>
                              )}
                            {["CM", "CAM", "LW", "RW"].includes(
                              selectedPlayer.position,
                            ) &&
                              selectedPlayer.stats.assists < 5 && (
                                <li className="flex items-center">
                                  <TrendingUp className="h-4 w-4 text-blue-500 mr-2" />
                                  <span>
                                    Work on creative passing and chance creation
                                  </span>
                                </li>
                              )}
                            {selectedPlayer.position === "GK" &&
                              selectedPlayer.stats.cleanSheets &&
                              selectedPlayer.stats.cleanSheets < 5 && (
                                <li className="flex items-center">
                                  <TrendingUp className="h-4 w-4 text-blue-500 mr-2" />
                                  <span>
                                    Focus on improving shot-stopping and command
                                    of area
                                  </span>
                                </li>
                              )}
                          </ul>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="analysis" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base flex items-center">
                              <Shield className="h-4 w-4 mr-2 text-green-500" />
                              Strengths Analysis
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {selectedPlayer.strengths.map(
                                (strength, index) => (
                                  <li key={index} className="flex items-start">
                                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                                    <div>
                                      <div className="font-medium">
                                        {strength}
                                      </div>
                                      <p className="text-sm text-muted-foreground">
                                        {index === 0
                                          ? `${selectedPlayer.name} consistently demonstrates excellent ${strength.toLowerCase()} in matches.`
                                          : index === 1
                                            ? `Their ${strength.toLowerCase()} gives them an advantage against most opponents.`
                                            : `${strength} is a key part of their playing style.`}
                                      </p>
                                    </div>
                                  </li>
                                ),
                              )}
                            </ul>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base flex items-center">
                              <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                              Weaknesses Analysis
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {selectedPlayer.weaknesses.map(
                                (weakness, index) => (
                                  <li key={index} className="flex items-start">
                                    <TrendingDown className="h-4 w-4 text-amber-500 mr-2 mt-0.5" />
                                    <div>
                                      <div className="font-medium">
                                        {weakness}
                                      </div>
                                      <p className="text-sm text-muted-foreground">
                                        {index === 0
                                          ? `${selectedPlayer.name} struggles with ${weakness.toLowerCase()} which affects their overall performance.`
                                          : index === 1
                                            ? `Improving their ${weakness.toLowerCase()} should be a priority in training.`
                                            : `${weakness} is an area that needs focused development.`}
                                      </p>
                                    </div>
                                  </li>
                                ),
                              )}
                            </ul>
                          </CardContent>
                        </Card>
                      </div>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base flex items-center">
                            <TrendingUp className="h-4 w-4 mr-2 text-blue-500" />
                            Development Plan
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <p className="text-sm">
                              Based on our scouting analysis, we recommend the
                              following development plan for{" "}
                              {selectedPlayer.name}:
                            </p>

                            <div className="space-y-3">
                              <div>
                                <h4 className="text-sm font-medium">
                                  Short-term Focus (1-3 months)
                                </h4>
                                <ul className="mt-1 space-y-1 text-sm">
                                  {selectedPlayer.developmentAreas
                                    .slice(0, 1)
                                    .map((area, index) => (
                                      <li
                                        key={index}
                                        className="flex items-center"
                                      >
                                        <Clock className="h-4 w-4 text-blue-500 mr-2" />
                                        <span>
                                          Intensive training on{" "}
                                          {area.toLowerCase()}
                                        </span>
                                      </li>
                                    ))}
                                  {selectedPlayer.fitness < 80 && (
                                    <li className="flex items-center">
                                      <Clock className="h-4 w-4 text-blue-500 mr-2" />
                                      <span>
                                        Improve overall fitness levels
                                      </span>
                                    </li>
                                  )}
                                  {selectedPlayer.form === "poor" && (
                                    <li className="flex items-center">
                                      <Clock className="h-4 w-4 text-blue-500 mr-2" />
                                      <span>
                                        Focus on regaining form through
                                        confidence-building exercises
                                      </span>
                                    </li>
                                  )}
                                </ul>
                              </div>

                              <div>
                                <h4 className="text-sm font-medium">
                                  Medium-term Goals (3-6 months)
                                </h4>
                                <ul className="mt-1 space-y-1 text-sm">
                                  {selectedPlayer.developmentAreas
                                    .slice(1)
                                    .map((area, index) => (
                                      <li
                                        key={index}
                                        className="flex items-center"
                                      >
                                        <Clock className="h-4 w-4 text-blue-500 mr-2" />
                                        <span>
                                          Develop {area.toLowerCase()} through
                                          specialized training
                                        </span>
                                      </li>
                                    ))}
                                  {selectedPlayer.weaknesses
                                    .slice(0, 1)
                                    .map((weakness, index) => (
                                      <li
                                        key={index}
                                        className="flex items-center"
                                      >
                                        <Clock className="h-4 w-4 text-blue-500 mr-2" />
                                        <span>
                                          Address weakness in{" "}
                                          {weakness.toLowerCase()}
                                        </span>
                                      </li>
                                    ))}
                                </ul>
                              </div>

                              <div>
                                <h4 className="text-sm font-medium">
                                  Long-term Development (6+ months)
                                </h4>
                                <ul className="mt-1 space-y-1 text-sm">
                                  <li className="flex items-center">
                                    <Clock className="h-4 w-4 text-blue-500 mr-2" />
                                    <span>
                                      Build on strengths in{" "}
                                      {selectedPlayer.strengths[0].toLowerCase()}
                                    </span>
                                  </li>
                                  {selectedPlayer.age < 25 ? (
                                    <li className="flex items-center">
                                      <Clock className="h-4 w-4 text-blue-500 mr-2" />
                                      <span>
                                        Focus on overall potential development
                                      </span>
                                    </li>
                                  ) : selectedPlayer.age < 30 ? (
                                    <li className="flex items-center">
                                      <Clock className="h-4 w-4 text-blue-500 mr-2" />
                                      <span>
                                        Maintain peak performance levels
                                      </span>
                                    </li>
                                  ) : (
                                    <li className="flex items-center">
                                      <Clock className="h-4 w-4 text-blue-500 mr-2" />
                                      <span>
                                        Focus on extending career longevity
                                      </span>
                                    </li>
                                  )}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">
                            Tactical Recommendations
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">
                            Based on {selectedPlayer.name}'s profile, we
                            recommend the following tactical approach:
                          </p>

                          <div className="mt-3 space-y-3">
                            <div>
                              <h4 className="text-sm font-medium">
                                Ideal Role
                              </h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                {selectedPlayer.position === "GK" &&
                                  "Traditional Goalkeeper - Focus on shot-stopping and commanding the area"}
                                {selectedPlayer.position === "CB" &&
                                  "Ball-playing Defender - Utilize their defensive strength while encouraging distribution from the back"}
                                {selectedPlayer.position === "LB" ||
                                selectedPlayer.position === "RB"
                                  ? "Wing Back - Encourage overlapping runs and crossing while maintaining defensive responsibilities"
                                  : selectedPlayer.position === "CDM"
                                    ? "Defensive Midfielder - Utilize their positioning to shield the defense and distribute the ball"
                                    : selectedPlayer.position === "CM"
                                      ? "Box-to-Box Midfielder - Leverage their all-round abilities to contribute in both attack and defense"
                                      : selectedPlayer.position === "CAM"
                                        ? "Advanced Playmaker - Focus on their creative abilities to create chances for teammates"
                                        : selectedPlayer.position === "LW" ||
                                            selectedPlayer.position === "RW"
                                          ? "Inside Forward - Cut inside to exploit their pace and shooting abilities"
                                          : selectedPlayer.position === "ST"
                                            ? "Complete Forward - Utilize their finishing abilities while contributing to build-up play"
                                            : "Versatile Role - Adapt based on match requirements"}
                              </p>
                            </div>

                            <div>
                              <h4 className="text-sm font-medium">
                                Team Instructions
                              </h4>
                              <ul className="mt-1 space-y-1 text-sm">
                                {selectedPlayer.attributes.pace > 80 && (
                                  <li className="flex items-center">
                                    <Heart className="h-4 w-4 text-red-500 mr-2" />
                                    <span>
                                      Utilize their pace with through balls and
                                      counter-attacks
                                    </span>
                                  </li>
                                )}
                                {selectedPlayer.attributes.passing > 80 && (
                                  <li className="flex items-center">
                                    <Heart className="h-4 w-4 text-red-500 mr-2" />
                                    <span>
                                      Make them a focal point for distribution
                                      and playmaking
                                    </span>
                                  </li>
                                )}
                                {selectedPlayer.attributes.shooting > 80 && (
                                  <li className="flex items-center">
                                    <Heart className="h-4 w-4 text-red-500 mr-2" />
                                    <span>
                                      Encourage shooting from distance when
                                      opportunities arise
                                    </span>
                                  </li>
                                )}
                                {selectedPlayer.attributes.defending > 80 && (
                                  <li className="flex items-center">
                                    <Heart className="h-4 w-4 text-red-500 mr-2" />
                                    <span>
                                      Rely on their defensive abilities in
                                      challenging situations
                                    </span>
                                  </li>
                                )}
                              </ul>
                            </div>

                            <div>
                              <h4 className="text-sm font-medium">
                                Match Strategy
                              </h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                {selectedPlayer.form === "excellent" ||
                                selectedPlayer.form === "good"
                                  ? "Currently in good form - build team strategy around their strengths"
                                  : "Currently not at peak form - provide tactical support to help regain confidence"}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Export Report
              </Button>
              <Button variant="outline">
                <BarChart3 className="mr-2 h-4 w-4" />
                View Full Statistics
              </Button>
              <Button onClick={() => setShowPlayerDetails(false)}>Close</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
