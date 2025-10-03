"use client";

import { useState } from "react";

import {
  BarChart3,
  Calendar,
  ChevronRight,
  Clock,
  Shirt,
  Star,
  Trophy,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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

// Youth match type
type YouthMatch = {
  id: number;
  competition: string;
  opponent: string;
  opponentLogo?: string;
  date: string;
  time: string;
  venue: "home" | "away";
  result?: {
    goalsFor: number;
    goalsAgainst: number;
    scorers: string[];
    assists: string[];
    motm: string;
    rating: number;
    stats?: {
      possession: number;
      shots: number;
      shotsOnTarget: number;
      corners: number;
      fouls: number;
      yellowCards: number;
      redCards: number;
    };
    playerPerformances?: PlayerMatchPerformance[];
  };
  status: "scheduled" | "completed" | "live";
  teamSelection: "U18" | "U23";
  importance: "low" | "medium" | "high";
};

// Youth competition type
type YouthCompetition = {
  id: string;
  name: string;
  type: "league" | "cup";
  teamType: "U18" | "U23";
  standings?: {
    position: number;
    team: string;
    played: number;
    won: number;
    drawn: number;
    lost: number;
    goalsFor: number;
    goalsAgainst: number;
    points: number;
  }[];
  schedule?: {
    round: string;
    matches: {
      homeTeam: string;
      awayTeam: string;
      date: string;
      result?: string;
    }[];
  }[];
};

// Youth player performance type
type PlayerPerformance = {
  id: number;
  name: string;
  position: string;
  age: number;
  appearances: number;
  goals: number;
  assists: number;
  cleanSheets?: number;
  yellowCards: number;
  redCards: number;
  averageRating: number;
  motm: number;
  teamType: "U18" | "U23";
};

// Player match performance type
type PlayerMatchPerformance = {
  id: number;
  name: string;
  position: string;
  rating: number;
  goals: number;
  assists: number;
  minutesPlayed: number;
  yellowCard: boolean;
  redCard: boolean;
  keyPasses: number;
  tackles: number;
  interceptions: number;
  saves?: number;
};

export default function YouthMatches() {
  // Mock youth matches
  const [youthMatches, setYouthMatches] = useState<YouthMatch[]>([
    {
      id: 1,
      competition: "U18 Premier League",
      opponent: "Manchester City U18",
      opponentLogo: "/placeholder.svg?height=40&width=40",
      date: "2025-03-01",
      time: "14:00",
      venue: "home",
      result: {
        goalsFor: 2,
        goalsAgainst: 1,
        scorers: ["James Wilson", "Alejandro Gomez"],
        assists: ["Carlos Mendes", "James Wilson"],
        motm: "Carlos Mendes",
        rating: 7.4,
        stats: {
          possession: 54,
          shots: 14,
          shotsOnTarget: 6,
          corners: 7,
          fouls: 8,
          yellowCards: 2,
          redCards: 0,
        },
        playerPerformances: [
          {
            id: 1,
            name: "James Wilson",
            position: "ST",
            rating: 8.2,
            goals: 1,
            assists: 1,
            minutesPlayed: 90,
            yellowCard: false,
            redCard: false,
            keyPasses: 2,
            tackles: 0,
            interceptions: 0,
          },
          {
            id: 2,
            name: "Carlos Mendes",
            position: "CAM",
            rating: 8.5,
            goals: 0,
            assists: 1,
            minutesPlayed: 90,
            yellowCard: false,
            redCard: false,
            keyPasses: 4,
            tackles: 1,
            interceptions: 2,
          },
          {
            id: 3,
            name: "Alejandro Gomez",
            position: "LW",
            rating: 7.8,
            goals: 1,
            assists: 0,
            minutesPlayed: 85,
            yellowCard: true,
            redCard: false,
            keyPasses: 1,
            tackles: 2,
            interceptions: 1,
          },
        ],
      },
      status: "completed",
      teamSelection: "U18",
      importance: "medium",
    },
    {
      id: 2,
      competition: "U23 Premier League 2",
      opponent: "Liverpool U23",
      opponentLogo: "/placeholder.svg?height=40&width=40",
      date: "2025-03-03",
      time: "19:00",
      venue: "away",
      result: {
        goalsFor: 1,
        goalsAgainst: 3,
        scorers: ["Ryan Cooper"],
        assists: ["Jamal Williams"],
        motm: "Jamal Williams",
        rating: 6.8,
        stats: {
          possession: 45,
          shots: 9,
          shotsOnTarget: 4,
          corners: 5,
          fouls: 10,
          yellowCards: 3,
          redCards: 0,
        },
        playerPerformances: [
          {
            id: 4,
            name: "Ryan Cooper",
            position: "ST",
            rating: 7.2,
            goals: 1,
            assists: 0,
            minutesPlayed: 90,
            yellowCard: false,
            redCard: false,
            keyPasses: 1,
            tackles: 0,
            interceptions: 0,
          },
          {
            id: 5,
            name: "Jamal Williams",
            position: "LW",
            rating: 7.5,
            goals: 0,
            assists: 1,
            minutesPlayed: 90,
            yellowCard: true,
            redCard: false,
            keyPasses: 3,
            tackles: 1,
            interceptions: 2,
          },
          {
            id: 6,
            name: "Matteo Ricci",
            position: "CM",
            rating: 6.5,
            goals: 0,
            assists: 0,
            minutesPlayed: 75,
            yellowCard: true,
            redCard: false,
            keyPasses: 2,
            tackles: 3,
            interceptions: 2,
          },
        ],
      },
      status: "completed",
      teamSelection: "U23",
      importance: "high",
    },
    {
      id: 3,
      competition: "FA Youth Cup",
      opponent: "Arsenal U18",
      opponentLogo: "/placeholder.svg?height=40&width=40",
      date: "2025-03-10",
      time: "15:00",
      venue: "home",
      status: "scheduled",
      teamSelection: "U18",
      importance: "high",
    },
    {
      id: 4,
      competition: "U18 Premier League",
      opponent: "Chelsea U18",
      opponentLogo: "/placeholder.svg?height=40&width=40",
      date: "2025-03-15",
      time: "13:00",
      venue: "away",
      status: "scheduled",
      teamSelection: "U18",
      importance: "medium",
    },
    {
      id: 5,
      competition: "U23 Premier League 2",
      opponent: "Tottenham U23",
      opponentLogo: "/placeholder.svg?height=40&width=40",
      date: "2025-03-18",
      time: "19:30",
      venue: "home",
      status: "scheduled",
      teamSelection: "U23",
      importance: "medium",
    },
    {
      id: 6,
      competition: "U18 Premier League",
      opponent: "Everton U18",
      opponentLogo: "/placeholder.svg?height=40&width=40",
      date: "2025-02-20",
      time: "14:00",
      venue: "away",
      result: {
        goalsFor: 3,
        goalsAgainst: 0,
        scorers: ["James Wilson", "Carlos Mendes", "Alejandro Gomez"],
        assists: ["Carlos Mendes", "Kai Zhang", "James Wilson"],
        motm: "James Wilson",
        rating: 8.2,
        stats: {
          possession: 62,
          shots: 18,
          shotsOnTarget: 9,
          corners: 8,
          fouls: 6,
          yellowCards: 1,
          redCards: 0,
        },
        playerPerformances: [
          {
            id: 1,
            name: "James Wilson",
            position: "ST",
            rating: 9.0,
            goals: 1,
            assists: 1,
            minutesPlayed: 90,
            yellowCard: false,
            redCard: false,
            keyPasses: 3,
            tackles: 0,
            interceptions: 0,
          },
          {
            id: 2,
            name: "Carlos Mendes",
            position: "CAM",
            rating: 8.7,
            goals: 1,
            assists: 1,
            minutesPlayed: 90,
            yellowCard: false,
            redCard: false,
            keyPasses: 5,
            tackles: 2,
            interceptions: 1,
          },
          {
            id: 7,
            name: "Alejandro Gomez",
            position: "LW",
            rating: 8.3,
            goals: 1,
            assists: 0,
            minutesPlayed: 90,
            yellowCard: false,
            redCard: false,
            keyPasses: 2,
            tackles: 1,
            interceptions: 0,
          },
        ],
      },
      status: "completed",
      teamSelection: "U18",
      importance: "medium",
    },
    {
      id: 7,
      competition: "U23 Premier League 2",
      opponent: "Manchester United U23",
      opponentLogo: "/placeholder.svg?height=40&width=40",
      date: "2025-02-25",
      time: "19:00",
      venue: "home",
      result: {
        goalsFor: 2,
        goalsAgainst: 2,
        scorers: ["Jamal Williams", "Ryan Cooper"],
        assists: ["Matteo Ricci", "Jamal Williams"],
        motm: "Matteo Ricci",
        rating: 7.5,
        stats: {
          possession: 51,
          shots: 12,
          shotsOnTarget: 5,
          corners: 6,
          fouls: 9,
          yellowCards: 2,
          redCards: 0,
        },
        playerPerformances: [
          {
            id: 4,
            name: "Ryan Cooper",
            position: "ST",
            rating: 7.6,
            goals: 1,
            assists: 0,
            minutesPlayed: 90,
            yellowCard: false,
            redCard: false,
            keyPasses: 1,
            tackles: 0,
            interceptions: 0,
          },
          {
            id: 5,
            name: "Jamal Williams",
            position: "LW",
            rating: 7.8,
            goals: 1,
            assists: 1,
            minutesPlayed: 90,
            yellowCard: false,
            redCard: false,
            keyPasses: 2,
            tackles: 1,
            interceptions: 1,
          },
          {
            id: 6,
            name: "Matteo Ricci",
            position: "CM",
            rating: 8.2,
            goals: 0,
            assists: 1,
            minutesPlayed: 90,
            yellowCard: true,
            redCard: false,
            keyPasses: 4,
            tackles: 5,
            interceptions: 3,
          },
        ],
      },
      status: "completed",
      teamSelection: "U23",
      importance: "medium",
    },
    {
      id: 8,
      competition: "U23 Premier League 2",
      opponent: "Brighton U23",
      opponentLogo: "/placeholder.svg?height=40&width=40",
      date: new Date().toISOString().split("T")[0],
      time: "15:30",
      venue: "home",
      status: "live",
      teamSelection: "U23",
      importance: "medium",
      result: {
        goalsFor: 1,
        goalsAgainst: 0,
        scorers: ["Ryan Cooper"],
        assists: ["Matteo Ricci"],
        motm: "",
        rating: 7.2,
      },
    },
  ]);

  // Mock youth competitions
  const [youthCompetitions, setYouthCompetitions] = useState<
    YouthCompetition[]
  >([
    {
      id: "u18_premier_league",
      name: "U18 Premier League",
      type: "league",
      teamType: "U18",
      standings: [
        {
          position: 1,
          team: "Chelsea U18",
          played: 20,
          won: 15,
          drawn: 3,
          lost: 2,
          goalsFor: 45,
          goalsAgainst: 15,
          points: 48,
        },
        {
          position: 2,
          team: "FC United U18",
          played: 20,
          won: 14,
          drawn: 4,
          lost: 2,
          goalsFor: 42,
          goalsAgainst: 18,
          points: 46,
        },
        {
          position: 3,
          team: "Manchester City U18",
          played: 20,
          won: 13,
          drawn: 3,
          lost: 4,
          goalsFor: 38,
          goalsAgainst: 20,
          points: 42,
        },
        {
          position: 4,
          team: "Arsenal U18",
          played: 20,
          won: 12,
          drawn: 4,
          lost: 4,
          goalsFor: 36,
          goalsAgainst: 22,
          points: 40,
        },
        {
          position: 5,
          team: "Liverpool U18",
          played: 20,
          won: 11,
          drawn: 5,
          lost: 4,
          goalsFor: 35,
          goalsAgainst: 25,
          points: 38,
        },
        {
          position: 6,
          team: "Tottenham U18",
          played: 20,
          won: 10,
          drawn: 4,
          lost: 6,
          goalsFor: 30,
          goalsAgainst: 25,
          points: 34,
        },
        {
          position: 7,
          team: "Everton U18",
          played: 20,
          won: 9,
          drawn: 3,
          lost: 8,
          goalsFor: 28,
          goalsAgainst: 30,
          points: 30,
        },
        {
          position: 8,
          team: "West Ham U18",
          played: 20,
          won: 7,
          drawn: 5,
          lost: 8,
          goalsFor: 25,
          goalsAgainst: 28,
          points: 26,
        },
      ],
      schedule: [
        {
          round: "Matchday 21",
          matches: [
            {
              homeTeam: "FC United U18",
              awayTeam: "Chelsea U18",
              date: "2025-03-15",
            },
            {
              homeTeam: "Arsenal U18",
              awayTeam: "Manchester City U18",
              date: "2025-03-15",
            },
            {
              homeTeam: "Liverpool U18",
              awayTeam: "Tottenham U18",
              date: "2025-03-15",
            },
            {
              homeTeam: "Everton U18",
              awayTeam: "West Ham U18",
              date: "2025-03-16",
            },
          ],
        },
        {
          round: "Matchday 22",
          matches: [
            {
              homeTeam: "Chelsea U18",
              awayTeam: "Arsenal U18",
              date: "2025-03-22",
            },
            {
              homeTeam: "Manchester City U18",
              awayTeam: "FC United U18",
              date: "2025-03-22",
            },
            {
              homeTeam: "Tottenham U18",
              awayTeam: "Everton U18",
              date: "2025-03-22",
            },
            {
              homeTeam: "West Ham U18",
              awayTeam: "Liverpool U18",
              date: "2025-03-23",
            },
          ],
        },
      ],
    },
    {
      id: "u23_premier_league_2",
      name: "U23 Premier League 2",
      type: "league",
      teamType: "U23",
      standings: [
        {
          position: 1,
          team: "Liverpool U23",
          played: 18,
          won: 13,
          drawn: 3,
          lost: 2,
          goalsFor: 38,
          goalsAgainst: 15,
          points: 42,
        },
        {
          position: 2,
          team: "Manchester United U23",
          played: 18,
          won: 12,
          drawn: 4,
          lost: 2,
          goalsFor: 35,
          goalsAgainst: 18,
          points: 40,
        },
        {
          position: 3,
          team: "Arsenal U23",
          played: 18,
          won: 11,
          drawn: 3,
          lost: 4,
          goalsFor: 32,
          goalsAgainst: 20,
          points: 36,
        },
        {
          position: 4,
          team: "FC United U23",
          played: 18,
          won: 10,
          drawn: 4,
          lost: 4,
          goalsFor: 30,
          goalsAgainst: 22,
          points: 34,
        },
        {
          position: 5,
          team: "Chelsea U23",
          played: 18,
          won: 9,
          drawn: 5,
          lost: 4,
          goalsFor: 28,
          goalsAgainst: 20,
          points: 32,
        },
        {
          position: 6,
          team: "Tottenham U23",
          played: 18,
          won: 8,
          drawn: 4,
          lost: 6,
          goalsFor: 25,
          goalsAgainst: 22,
          points: 28,
        },
        {
          position: 7,
          team: "Manchester City U23",
          played: 18,
          won: 7,
          drawn: 3,
          lost: 8,
          goalsFor: 22,
          goalsAgainst: 25,
          points: 24,
        },
        {
          position: 8,
          team: "Everton U23",
          played: 18,
          won: 6,
          drawn: 5,
          lost: 7,
          goalsFor: 20,
          goalsAgainst: 24,
          points: 23,
        },
      ],
      schedule: [
        {
          round: "Matchday 19",
          matches: [
            {
              homeTeam: "FC United U23",
              awayTeam: "Brighton U23",
              date: new Date().toISOString().split("T")[0],
              result: "1-0 (Live)",
            },
            {
              homeTeam: "Arsenal U23",
              awayTeam: "Manchester City U23",
              date: new Date().toISOString().split("T")[0],
            },
            {
              homeTeam: "Liverpool U23",
              awayTeam: "Tottenham U23",
              date: new Date().toISOString().split("T")[0],
            },
            {
              homeTeam: "Everton U23",
              awayTeam: "Chelsea U23",
              date: new Date().toISOString().split("T")[0],
            },
          ],
        },
        {
          round: "Matchday 20",
          matches: [
            {
              homeTeam: "Chelsea U23",
              awayTeam: "Arsenal U23",
              date: "2025-03-25",
            },
            {
              homeTeam: "Manchester City U23",
              awayTeam: "FC United U23",
              date: "2025-03-25",
            },
            {
              homeTeam: "Tottenham U23",
              awayTeam: "Everton U23",
              date: "2025-03-25",
            },
            {
              homeTeam: "Brighton U23",
              awayTeam: "Liverpool U23",
              date: "2025-03-26",
            },
          ],
        },
      ],
    },
    {
      id: "fa_youth_cup",
      name: "FA Youth Cup",
      type: "cup",
      teamType: "U18",
      schedule: [
        {
          round: "Quarter Finals",
          matches: [
            {
              homeTeam: "FC United U18",
              awayTeam: "Arsenal U18",
              date: "2025-03-10",
            },
            {
              homeTeam: "Chelsea U18",
              awayTeam: "Liverpool U18",
              date: "2025-03-11",
            },
            {
              homeTeam: "Manchester City U18",
              awayTeam: "Tottenham U18",
              date: "2025-03-12",
            },
            {
              homeTeam: "Aston Villa U18",
              awayTeam: "Newcastle U18",
              date: "2025-03-13",
            },
          ],
        },
      ],
    },
  ]);

  // Mock player performances
  const [playerPerformances, setPlayerPerformances] = useState<
    PlayerPerformance[]
  >([
    {
      id: 1,
      name: "James Wilson",
      position: "ST",
      age: 16,
      appearances: 18,
      goals: 12,
      assists: 5,
      cleanSheets: 0,
      yellowCards: 2,
      redCards: 0,
      averageRating: 7.8,
      motm: 3,
      teamType: "U18",
    },
    {
      id: 2,
      name: "Carlos Mendes",
      position: "CAM",
      age: 17,
      appearances: 20,
      goals: 8,
      assists: 14,
      cleanSheets: 0,
      yellowCards: 1,
      redCards: 0,
      averageRating: 8.1,
      motm: 5,
      teamType: "U18",
    },
    {
      id: 3,
      name: "Liam Thompson",
      position: "CB",
      age: 18,
      appearances: 19,
      goals: 2,
      assists: 0,
      cleanSheets: 7,
      yellowCards: 4,
      redCards: 1,
      averageRating: 7.2,
      motm: 1,
      teamType: "U18",
    },
    {
      id: 4,
      name: "Jamal Williams",
      position: "LW",
      age: 19,
      appearances: 16,
      goals: 9,
      assists: 7,
      cleanSheets: 0,
      yellowCards: 3,
      redCards: 0,
      averageRating: 7.6,
      motm: 2,
      teamType: "U23",
    },
    {
      id: 5,
      name: "Matteo Ricci",
      position: "CM",
      age: 20,
      appearances: 18,
      goals: 4,
      assists: 8,
      cleanSheets: 0,
      yellowCards: 5,
      redCards: 0,
      averageRating: 7.5,
      motm: 3,
      teamType: "U23",
    },
    {
      id: 6,
      name: "Ryan Cooper",
      position: "ST",
      age: 20,
      appearances: 15,
      goals: 11,
      assists: 3,
      cleanSheets: 0,
      yellowCards: 2,
      redCards: 0,
      averageRating: 7.4,
      motm: 2,
      teamType: "U23",
    },
    {
      id: 7,
      name: "Alejandro Gomez",
      position: "LB",
      age: 16,
      appearances: 17,
      goals: 2,
      assists: 4,
      cleanSheets: 6,
      yellowCards: 3,
      redCards: 0,
      averageRating: 7.3,
      motm: 1,
      teamType: "U18",
    },
    {
      id: 8,
      name: "Kai Zhang",
      position: "RB",
      age: 17,
      appearances: 18,
      goals: 0,
      assists: 3,
      cleanSheets: 7,
      yellowCards: 4,
      redCards: 0,
      averageRating: 7.0,
      motm: 0,
      teamType: "U18",
    },
    {
      id: 9,
      name: "Samuel Osei",
      position: "CDM",
      age: 18,
      appearances: 19,
      goals: 1,
      assists: 2,
      cleanSheets: 7,
      yellowCards: 6,
      redCards: 0,
      averageRating: 7.2,
      motm: 1,
      teamType: "U18",
    },
    {
      id: 10,
      name: "Lucas Fernandez",
      position: "GK",
      age: 19,
      appearances: 18,
      goals: 0,
      assists: 0,
      cleanSheets: 8,
      yellowCards: 0,
      redCards: 0,
      averageRating: 7.3,
      motm: 2,
      teamType: "U23",
    },
  ]);

  const [activeTab, setActiveTab] = useState("overview");
  const [teamFilter, setTeamFilter] = useState("all");
  const [selectedMatch, setSelectedMatch] = useState<YouthMatch | null>(null);
  const [matchDetailOpen, setMatchDetailOpen] = useState(false);
  const [selectedCompetition, setSelectedCompetition] =
    useState<YouthCompetition | null>(null);
  const [standingsOpen, setStandingsOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] =
    useState<PlayerPerformance | null>(null);
  const [playerDetailOpen, setPlayerDetailOpen] = useState(false);
  const [dateFilter, setDateFilter] = useState("upcoming");
  const [importanceFilter, setImportanceFilter] = useState("all");

  // Handle viewing match details
  const handleViewMatchDetails = (match: YouthMatch) => {
    setSelectedMatch(match);
    setMatchDetailOpen(true);
  };

  // Handle viewing competition standings
  const handleViewStandings = (competitionId: string) => {
    const competition = youthCompetitions.find((c) => c.id === competitionId);
    if (competition) {
      setSelectedCompetition(competition);
      setStandingsOpen(true);
    }
  };

  // Handle viewing player details
  const handleViewPlayerDetails = (player: PlayerPerformance) => {
    setSelectedPlayer(player);
    setPlayerDetailOpen(true);
  };

  // Filter matches based on active tab, team filter, date filter, and importance filter
  const filteredMatches = youthMatches.filter((match) => {
    // Filter by team
    const matchesTeam =
      teamFilter === "all"
        ? true
        : teamFilter === "u18"
          ? match.teamSelection === "U18"
          : teamFilter === "u23"
            ? match.teamSelection === "U23"
            : false;

    // Filter by date
    const today = new Date().toISOString().split("T")[0];
    const matchDate = new Date(match.date);
    const currentDate = new Date(today);

    const matchesDate =
      dateFilter === "all"
        ? true
        : dateFilter === "upcoming"
          ? matchDate >= currentDate && match.status !== "completed"
          : dateFilter === "past"
            ? matchDate < currentDate || match.status === "completed"
            : dateFilter === "today"
              ? match.date === today
              : dateFilter === "thisWeek"
                ? matchDate >= currentDate &&
                  matchDate <=
                    new Date(currentDate.setDate(currentDate.getDate() + 7))
                : true;

    // Filter by importance
    const matchesImportance =
      importanceFilter === "all" ? true : importanceFilter === match.importance;

    return matchesTeam && matchesDate && matchesImportance;
  });

  // Sort matches by date
  const sortedMatches = [...filteredMatches].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);

    // Always put live matches first
    if (a.status === "live" && b.status !== "live") return -1;
    if (a.status !== "live" && b.status === "live") return 1;

    // Then sort by date
    return dateA.getTime() - dateB.getTime();
  });

  // Filter player performances based on team filter
  const filteredPerformances = playerPerformances.filter((player) => {
    return teamFilter === "all"
      ? true
      : teamFilter === "u18"
        ? player.teamType === "U18"
        : teamFilter === "u23"
          ? player.teamType === "U23"
          : false;
  });

  // Sort player performances by goals
  const sortedPerformances = [...filteredPerformances].sort(
    (a, b) => b.goals - a.goals,
  );

  // Get upcoming matches
  const upcomingMatches = youthMatches
    .filter(
      (match) =>
        match.status === "scheduled" && new Date(match.date) >= new Date(),
    )
    .sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    })
    .slice(0, 3);

  // Get recent results
  const recentResults = youthMatches
    .filter((match) => match.status === "completed")
    .sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .slice(0, 3);

  // Get live matches
  const liveMatches = youthMatches.filter((match) => match.status === "live");

  // Get top scorers
  const topScorers = [...playerPerformances]
    .sort((a, b) => b.goals - a.goals)
    .slice(0, 5);

  // Get top assisters
  const topAssisters = [...playerPerformances]
    .sort((a, b) => b.assists - a.assists)
    .slice(0, 5);

  // Get competitions for the selected team filter
  const filteredCompetitions = youthCompetitions.filter((comp) =>
    teamFilter === "all"
      ? true
      : teamFilter === "u18"
        ? comp.teamType === "U18"
        : teamFilter === "u23"
          ? comp.teamType === "U23"
          : false,
  );

  // Get team position in competitions
  const getTeamPosition = (competition: YouthCompetition) => {
    if (!competition.standings) return null;
    const teamEntry = competition.standings.find((s) =>
      s.team.includes("FC United"),
    );
    return teamEntry ? teamEntry.position : null;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full sm:w-auto"
        >
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="fixtures">Fixtures</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
            <TabsTrigger value="competitions">Competitions</TabsTrigger>
            <TabsTrigger value="stats">Player Stats</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex gap-2">
          <Button
            variant={teamFilter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setTeamFilter("all")}
          >
            All Teams
          </Button>
          <Button
            variant={teamFilter === "u18" ? "default" : "outline"}
            size="sm"
            onClick={() => setTeamFilter("u18")}
          >
            U18
          </Button>
          <Button
            variant={teamFilter === "u23" ? "default" : "outline"}
            size="sm"
            onClick={() => setTeamFilter("u23")}
          >
            U23
          </Button>
        </div>
      </div>

      {/* Overview Tab */}
      <TabsContent value="overview" className="mt-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Live Matches & Upcoming Fixtures */}
          <div className="space-y-6">
            {/* Live Matches */}
            {liveMatches.length > 0 && (
              <Card className="border-l-4 border-l-red-500">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <div className="mr-2 h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
                    Live Matches
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {liveMatches.map((match) => (
                    <div
                      key={match.id}
                      className="border rounded-md p-3 bg-muted/20"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <Badge>{match.competition}</Badge>
                        <Badge
                          variant="outline"
                          className="animate-pulse bg-red-500/10"
                        >
                          LIVE
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-2">
                            <Shirt className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium text-sm">
                              FC United {match.teamSelection}
                            </div>
                            <div className="text-xl font-bold">
                              {match.result?.goalsFor || 0}
                            </div>
                          </div>
                        </div>
                        <div className="text-sm font-medium">vs</div>
                        <div className="flex items-center">
                          <div>
                            <div className="font-medium text-sm text-right">
                              {match.opponent}
                            </div>
                            <div className="text-xl font-bold text-right">
                              {match.result?.goalsAgainst || 0}
                            </div>
                          </div>
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center ml-2">
                            <Shirt className="h-4 w-4 text-primary" />
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-3"
                        onClick={() => handleViewMatchDetails(match)}
                      >
                        Watch Live
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Upcoming Fixtures */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                  Upcoming Fixtures
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingMatches.length > 0 ? (
                  upcomingMatches.map((match) => (
                    <div
                      key={match.id}
                      className="border rounded-md p-3 bg-muted/20"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <Badge>{match.competition}</Badge>
                        <Badge
                          variant={
                            match.importance === "high"
                              ? "destructive"
                              : match.importance === "medium"
                                ? "default"
                                : "outline"
                          }
                        >
                          {match.importance === "high"
                            ? "High"
                            : match.importance === "medium"
                              ? "Medium"
                              : "Low"}{" "}
                          Importance
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-2">
                            <Shirt className="h-4 w-4 text-primary" />
                          </div>
                          <div className="font-medium text-sm">
                            FC United {match.teamSelection}
                          </div>
                        </div>
                        <div className="text-sm font-medium">vs</div>
                        <div className="flex items-center">
                          <div className="font-medium text-sm text-right">
                            {match.opponent}
                          </div>
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center ml-2">
                            <Shirt className="h-4 w-4 text-primary" />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(match.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {match.time}
                        </div>
                        <div className="flex items-center">
                          {match.venue === "home" ? "Home" : "Away"}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    No upcoming fixtures scheduled
                  </div>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => setActiveTab("fixtures")}
                >
                  View All Fixtures
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Middle Column - Recent Results & Competitions */}
          <div className="space-y-6">
            {/* Recent Results */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-muted-foreground" />
                  Recent Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentResults.length > 0 ? (
                  recentResults.map((match) => (
                    <div
                      key={match.id}
                      className="border rounded-md p-3 bg-muted/20"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <Badge>{match.competition}</Badge>
                        <Badge
                          className={
                            match.result &&
                            match.result.goalsFor > match.result.goalsAgainst
                              ? "bg-green-500"
                              : match.result &&
                                  match.result.goalsFor ===
                                    match.result.goalsAgainst
                                ? "bg-amber-500"
                                : "bg-red-500"
                          }
                        >
                          {match.result &&
                          match.result.goalsFor > match.result.goalsAgainst
                            ? "Win"
                            : match.result &&
                                match.result.goalsFor ===
                                  match.result.goalsAgainst
                              ? "Draw"
                              : "Loss"}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-2">
                            <Shirt className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium text-sm">
                              FC United {match.teamSelection}
                            </div>
                            <div className="text-xl font-bold">
                              {match.result?.goalsFor}
                            </div>
                          </div>
                        </div>
                        <div className="text-sm font-medium">FT</div>
                        <div className="flex items-center">
                          <div>
                            <div className="font-medium text-sm text-right">
                              {match.opponent}
                            </div>
                            <div className="text-xl font-bold text-right">
                              {match.result?.goalsAgainst}
                            </div>
                          </div>
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center ml-2">
                            <Shirt className="h-4 w-4 text-primary" />
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 text-sm">
                        <span className="font-medium">Scorers: </span>
                        {match.result?.scorers.join(", ")}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-2"
                        onClick={() => handleViewMatchDetails(match)}
                      >
                        Match Report
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    No recent results available
                  </div>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => setActiveTab("results")}
                >
                  View All Results
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            </Card>

            {/* Competitions */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-muted-foreground" />
                  Competitions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredCompetitions.length > 0 ? (
                  filteredCompetitions.map((competition) => {
                    const position = getTeamPosition(competition);
                    return (
                      <div
                        key={competition.id}
                        className="border rounded-md p-3 bg-muted/20"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <div className="font-medium">{competition.name}</div>
                          <Badge variant="outline">
                            {competition.teamType}
                          </Badge>
                        </div>
                        {competition.type === "league" && position && (
                          <div className="flex items-center mb-2">
                            <div className="text-sm">Current Position: </div>
                            <Badge
                              className="ml-2"
                              variant={position <= 3 ? "default" : "outline"}
                            >
                              {position}
                              {position === 1
                                ? "st"
                                : position === 2
                                  ? "nd"
                                  : position === 3
                                    ? "rd"
                                    : "th"}
                            </Badge>
                          </div>
                        )}
                        {competition.type === "cup" && competition.schedule && (
                          <div className="text-sm mb-2">
                            Next Round: {competition.schedule[0].round}
                          </div>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() => handleViewStandings(competition.id)}
                        >
                          {competition.type === "league"
                            ? "View Standings"
                            : "View Schedule"}
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    No competitions available for the selected team
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Top Performers */}
          <div className="space-y-6">
            {/* Top Scorers */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 mr-2 text-amber-500" />
                  Top Scorers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Player</TableHead>
                      <TableHead>Team</TableHead>
                      <TableHead className="text-right">Goals</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topScorers.map((player) => (
                      <TableRow
                        key={player.id}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => handleViewPlayerDetails(player)}
                      >
                        <TableCell className="font-medium">
                          {player.name}
                        </TableCell>
                        <TableCell>{player.teamType}</TableCell>
                        <TableCell className="text-right">
                          {player.goals}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Top Assisters */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-blue-500" />
                  Top Assisters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Player</TableHead>
                      <TableHead>Team</TableHead>
                      <TableHead className="text-right">Assists</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topAssisters.map((player) => (
                      <TableRow
                        key={player.id}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => handleViewPlayerDetails(player)}
                      >
                        <TableCell className="font-medium">
                          {player.name}
                        </TableCell>
                        <TableCell>{player.teamType}</TableCell>
                        <TableCell className="text-right">
                          {player.assists}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Team Form */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-muted-foreground" />
                  Team Form
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">U18 Team</div>
                      <div className="flex space-x-1">
                        {["W", "W", "L", "W", "D"].map((result, i) => (
                          <div
                            key={i}
                            className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${
                              result === "W"
                                ? "bg-green-500 text-white"
                                : result === "D"
                                  ? "bg-amber-500 text-white"
                                  : "bg-red-500 text-white"
                            }`}
                          >
                            {result}
                          </div>
                        ))}
                      </div>
                    </div>
                    <Progress value={65} className="h-2" />
                    <div className="text-xs text-muted-foreground mt-1">
                      Last 5 matches: 3 wins, 1 draw, 1 loss
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">U23 Team</div>
                      <div className="flex space-x-1">
                        {["L", "W", "D", "W", "W"].map((result, i) => (
                          <div
                            key={i}
                            className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${
                              result === "W"
                                ? "bg-green-500 text-white"
                                : result === "D"
                                  ? "bg-amber-500 text-white"
                                  : "bg-red-500 text-white"
                            }`}
                          >
                            {result}
                          </div>
                        ))}
                      </div>
                    </div>
                    <Progress value={70} className="h-2" />
                    <div className="text-xs text-muted-foreground mt-1">
                      Last 5 matches: 3 wins, 1 draw, 1 loss
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </TabsContent>

      {/* Fixtures Tab */}
      <TabsContent value="fixtures" className="mt-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div className="flex flex-wrap gap-2">
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Date Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Dates</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="thisWeek">This Week</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={importanceFilter}
              onValueChange={setImportanceFilter}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Importance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Matches</SelectItem>
                <SelectItem value="high">High Importance</SelectItem>
                <SelectItem value="medium">Medium Importance</SelectItem>
                <SelectItem value="low">Low Importance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sortedMatches.filter((match) => match.status !== "completed")
            .length > 0 ? (
            sortedMatches
              .filter((match) => match.status !== "completed")
              .map((match) => (
                <Card
                  key={match.id}
                  className={
                    match.status === "live" ? "border-l-4 border-l-red-500" : ""
                  }
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <Badge>{match.competition}</Badge>
                      <div className="flex gap-2">
                        <Badge variant="outline">{match.teamSelection}</Badge>
                        {match.status === "live" && (
                          <Badge
                            variant="destructive"
                            className="animate-pulse"
                          >
                            LIVE
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                          <Shirt className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">
                            FC United {match.teamSelection}
                          </div>
                          {match.status === "live" && (
                            <div className="text-2xl font-bold">
                              {match.result?.goalsFor || 0}
                            </div>
                          )}
                          <div className="text-sm text-muted-foreground">
                            {match.venue === "home" ? "Home" : "Away"}
                          </div>
                        </div>
                      </div>
                      <div className="text-xl font-bold">
                        {match.status === "live" ? "LIVE" : "vs"}
                      </div>
                      <div className="flex items-center">
                        <div>
                          <div className="font-medium text-right">
                            {match.opponent}
                          </div>
                          {match.status === "live" && (
                            <div className="text-2xl font-bold text-right">
                              {match.result?.goalsAgainst || 0}
                            </div>
                          )}
                          <div className="text-sm text-muted-foreground text-right">
                            {match.venue === "away" ? "Home" : "Away"}
                          </div>
                        </div>
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center ml-3">
                          <Shirt className="h-5 w-5 text-primary" />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">
                          {new Date(match.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">{match.time}</span>
                      </div>
                      <Badge
                        variant={
                          match.importance === "high"
                            ? "destructive"
                            : match.importance === "medium"
                              ? "default"
                              : "outline"
                        }
                      >
                        {match.importance === "high"
                          ? "High"
                          : match.importance === "medium"
                            ? "Medium"
                            : "Low"}{" "}
                        Importance
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant={match.status === "live" ? "default" : "outline"}
                      className="w-full"
                      onClick={() => handleViewMatchDetails(match)}
                    >
                      {match.status === "live"
                        ? "Watch Live"
                        : "View Match Details"}
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardFooter>
                </Card>
              ))
          ) : (
            <div className="col-span-full text-center py-8 border rounded-md bg-muted/20">
              <Calendar className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
              <h3 className="text-lg font-medium mb-1">No Upcoming Fixtures</h3>
              <p className="text-muted-foreground">
                There are no upcoming fixtures matching your current filters.
              </p>
            </div>
          )}
        </div>
      </TabsContent>

      {/* Results Tab */}
      <TabsContent value="results" className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sortedMatches.filter((match) => match.status === "completed")
            .length > 0 ? (
            sortedMatches
              .filter((match) => match.status === "completed")
              .map((match) => (
                <Card key={match.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <Badge>{match.competition}</Badge>
                      <Badge variant="outline">{match.teamSelection}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                          <Shirt className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">
                            FC United {match.teamSelection}
                          </div>
                          <div className="text-2xl font-bold">
                            {match.result?.goalsFor}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm font-medium">FT</div>
                      <div className="flex items-center">
                        <div>
                          <div className="font-medium text-right">
                            {match.opponent}
                          </div>
                          <div className="text-2xl font-bold text-right">
                            {match.result?.goalsAgainst}
                          </div>
                        </div>
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center ml-3">
                          <Shirt className="h-5 w-5 text-primary" />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">
                          {new Date(match.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div>
                        <Badge
                          className={
                            match.result &&
                            match.result.goalsFor > match.result.goalsAgainst
                              ? "bg-green-500"
                              : match.result &&
                                  match.result.goalsFor ===
                                    match.result.goalsAgainst
                                ? "bg-amber-500"
                                : "bg-red-500"
                          }
                        >
                          {match.result &&
                          match.result.goalsFor > match.result.goalsAgainst
                            ? "Win"
                            : match.result &&
                                match.result.goalsFor ===
                                  match.result.goalsAgainst
                              ? "Draw"
                              : "Loss"}
                        </Badge>
                      </div>
                    </div>

                    <div className="mt-3 text-sm">
                      <div>
                        <span className="font-medium">Scorers:</span>{" "}
                        {match.result?.scorers.join(", ")}
                      </div>
                      <div>
                        <span className="font-medium">Assists:</span>{" "}
                        {match.result?.assists.join(", ")}
                      </div>
                      <div>
                        <span className="font-medium">MOTM:</span>{" "}
                        {match.result?.motm}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      onClick={() => handleViewMatchDetails(match)}
                    >
                      View Match Report
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardFooter>
                </Card>
              ))
          ) : (
            <div className="col-span-full text-center py-8 border rounded-md bg-muted/20">
              <Calendar className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
              <h3 className="text-lg font-medium mb-1">No Recent Results</h3>
              <p className="text-muted-foreground">
                There are no recent results for{" "}
                {teamFilter === "all"
                  ? "your youth teams"
                  : teamFilter === "u18"
                    ? "your U18 team"
                    : "your U23 team"}
                .
              </p>
            </div>
          )}
        </div>
      </TabsContent>

      {/* Competitions Tab */}
      <TabsContent value="competitions" className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCompetitions.map((competition) => (
            <Card key={competition.id}>
              <CardHeader>
                <div className="flex justify-between">
                  <CardTitle>{competition.name}</CardTitle>
                  <Badge variant="outline">{competition.teamType}</Badge>
                </div>
                <CardDescription>
                  {competition.type === "league"
                    ? "League Competition"
                    : "Cup Competition"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {competition.type === "league" && competition.standings && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Trophy className="h-5 w-5 mr-2 text-amber-500" />
                        <span className="font-medium">Current Position</span>
                      </div>
                      <div>
                        {competition.standings.find((s) =>
                          s.team.includes("FC United"),
                        ) ? (
                          <Badge>
                            {
                              competition.standings.find((s) =>
                                s.team.includes("FC United"),
                              )?.position
                            }
                            {competition.standings.find((s) =>
                              s.team.includes("FC United"),
                            )?.position === 1
                              ? "st"
                              : competition.standings.find((s) =>
                                    s.team.includes("FC United"),
                                  )?.position === 2
                                ? "nd"
                                : competition.standings.find((s) =>
                                      s.team.includes("FC United"),
                                    )?.position === 3
                                  ? "rd"
                                  : "th"}
                          </Badge>
                        ) : (
                          <Badge variant="outline">N/A</Badge>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Top 4 Teams</h4>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Pos</TableHead>
                            <TableHead>Team</TableHead>
                            <TableHead className="text-center">P</TableHead>
                            <TableHead className="text-center">W</TableHead>
                            <TableHead className="text-center">D</TableHead>
                            <TableHead className="text-center">L</TableHead>
                            <TableHead className="text-right">Pts</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {competition.standings.slice(0, 4).map((team) => (
                            <TableRow
                              key={team.team}
                              className={
                                team.team.includes("FC United")
                                  ? "bg-muted/30 font-medium"
                                  : ""
                              }
                            >
                              <TableCell>{team.position}</TableCell>
                              <TableCell>{team.team}</TableCell>
                              <TableCell className="text-center">
                                {team.played}
                              </TableCell>
                              <TableCell className="text-center">
                                {team.won}
                              </TableCell>
                              <TableCell className="text-center">
                                {team.drawn}
                              </TableCell>
                              <TableCell className="text-center">
                                {team.lost}
                              </TableCell>
                              <TableCell className="text-right">
                                {team.points}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}

                {competition.type === "cup" && competition.schedule && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">
                        {competition.schedule[0].round}
                      </h4>
                      <div className="space-y-2">
                        {competition.schedule[0].matches.map((match, index) => (
                          <div
                            key={index}
                            className="border rounded-md p-2 flex justify-between items-center"
                          >
                            <div
                              className={
                                match.homeTeam.includes("FC United")
                                  ? "font-medium"
                                  : ""
                              }
                            >
                              {match.homeTeam}
                            </div>
                            <div className="flex items-center">
                              <span className="text-sm text-muted-foreground mr-2">
                                {match.result ||
                                  new Date(match.date).toLocaleDateString()}
                              </span>
                              <span className="text-sm">vs</span>
                            </div>
                            <div
                              className={
                                match.awayTeam.includes("FC United")
                                  ? "font-medium"
                                  : ""
                              }
                            >
                              {match.awayTeam}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={() => handleViewStandings(competition.id)}
                >
                  {competition.type === "league"
                    ? "View Full Standings"
                    : "View Full Schedule"}
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </TabsContent>

      {/* Player Stats Tab */}
      <TabsContent value="stats" className="mt-0">
        <Card>
          <CardHeader>
            <CardTitle>Player Statistics</CardTitle>
            <CardDescription>
              Performance statistics for{" "}
              {teamFilter === "all"
                ? "all youth players"
                : teamFilter === "u18"
                  ? "U18 players"
                  : "U23 players"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Player</TableHead>
                  <TableHead>Pos</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead className="text-center">Apps</TableHead>
                  <TableHead className="text-center">Goals</TableHead>
                  <TableHead className="text-center">Assists</TableHead>
                  <TableHead className="text-center">Rating</TableHead>
                  <TableHead className="text-center">MOTM</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedPerformances.map((player) => (
                  <TableRow
                    key={player.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleViewPlayerDetails(player)}
                  >
                    <TableCell className="font-medium">{player.name}</TableCell>
                    <TableCell>{player.position}</TableCell>
                    <TableCell>{player.age}</TableCell>
                    <TableCell className="text-center">
                      {player.appearances}
                    </TableCell>
                    <TableCell className="text-center">
                      {player.goals}
                    </TableCell>
                    <TableCell className="text-center">
                      {player.assists}
                    </TableCell>
                    <TableCell className="text-center">
                      {player.averageRating.toFixed(1)}
                    </TableCell>
                    <TableCell className="text-center">{player.motm}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Match Detail Dialog */}
      <Dialog open={matchDetailOpen} onOpenChange={setMatchDetailOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {selectedMatch?.status === "live" ? (
                <div className="flex items-center">
                  <div className="mr-2 h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
                  LIVE: FC United {selectedMatch?.teamSelection} vs{" "}
                  {selectedMatch?.opponent}
                </div>
              ) : (
                <div>
                  {selectedMatch?.status === "scheduled"
                    ? "Upcoming Match"
                    : "Match Report"}
                  : FC United {selectedMatch?.teamSelection} vs{" "}
                  {selectedMatch?.opponent}
                </div>
              )}
            </DialogTitle>
            <DialogDescription>
              {selectedMatch?.competition} -{" "}
              {new Date(selectedMatch?.date || "").toLocaleDateString()}{" "}
              {selectedMatch?.time}
            </DialogDescription>
          </DialogHeader>

          {selectedMatch?.status === "completed" && (
            <div className="space-y-6">
              {/* Match Score */}
              <div className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                    <Shirt className="h-8 w-8 text-primary" />
                  </div>
                  <div className="font-medium text-center">
                    FC United {selectedMatch?.teamSelection}
                  </div>
                  <div className="text-4xl font-bold">
                    {selectedMatch?.result?.goalsFor}
                  </div>
                </div>
                <div>
                  <Badge
                    className={
                      selectedMatch?.result &&
                      selectedMatch.result.goalsFor >
                        selectedMatch.result.goalsAgainst
                        ? "bg-green-500"
                        : selectedMatch?.result &&
                            selectedMatch.result.goalsFor ===
                              selectedMatch.result.goalsAgainst
                          ? "bg-amber-500"
                          : "bg-red-500"
                    }
                  >
                    {selectedMatch?.result &&
                    selectedMatch.result.goalsFor >
                      selectedMatch.result.goalsAgainst
                      ? "Win"
                      : selectedMatch?.result &&
                          selectedMatch.result.goalsFor ===
                            selectedMatch.result.goalsAgainst
                        ? "Draw"
                        : "Loss"}
                  </Badge>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                    <Shirt className="h-8 w-8 text-primary" />
                  </div>
                  <div className="font-medium text-center">
                    {selectedMatch?.opponent}
                  </div>
                  <div className="text-4xl font-bold">
                    {selectedMatch?.result?.goalsAgainst}
                  </div>
                </div>
              </div>

              {/* Match Stats */}
              <div>
                <h3 className="text-lg font-medium mb-3">Match Statistics</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-right w-16">
                      {selectedMatch?.result?.stats?.possession}%
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="relative h-2 w-full bg-muted overflow-hidden rounded-full">
                        <div
                          className="absolute h-full bg-primary rounded-full"
                          style={{
                            width: `${selectedMatch?.result?.stats?.possession}%`,
                          }}
                        ></div>
                      </div>
                      <div className="text-xs text-center mt-1">Possession</div>
                    </div>
                    <div className="font-medium w-16">
                      {100 - (selectedMatch?.result?.stats?.possession || 0)}%
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="font-medium text-right w-16">
                      {selectedMatch?.result?.stats?.shots}
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="relative h-2 w-full bg-muted overflow-hidden rounded-full">
                        <div
                          className="absolute h-full bg-primary rounded-full"
                          style={{
                            width: `${
                              ((selectedMatch?.result?.stats?.shots || 0) /
                                ((selectedMatch?.result?.stats?.shots || 0) +
                                  10)) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                      <div className="text-xs text-center mt-1">Shots</div>
                    </div>
                    <div className="font-medium w-16">10</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="font-medium text-right w-16">
                      {selectedMatch?.result?.stats?.shotsOnTarget}
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="relative h-2 w-full bg-muted overflow-hidden rounded-full">
                        <div
                          className="absolute h-full bg-primary rounded-full"
                          style={{
                            width: `${
                              ((selectedMatch?.result?.stats?.shotsOnTarget ||
                                0) /
                                ((selectedMatch?.result?.stats?.shotsOnTarget ||
                                  0) +
                                  5)) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                      <div className="text-xs text-center mt-1">
                        Shots on Target
                      </div>
                    </div>
                    <div className="font-medium w-16">5</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="font-medium text-right w-16">
                      {selectedMatch?.result?.stats?.corners}
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="relative h-2 w-full bg-muted overflow-hidden rounded-full">
                        <div
                          className="absolute h-full bg-primary rounded-full"
                          style={{
                            width: `${
                              ((selectedMatch?.result?.stats?.corners || 0) /
                                ((selectedMatch?.result?.stats?.corners || 0) +
                                  4)) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                      <div className="text-xs text-center mt-1">Corners</div>
                    </div>
                    <div className="font-medium w-16">4</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="font-medium text-right w-16">
                      {selectedMatch?.result?.stats?.fouls}
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="relative h-2 w-full bg-muted overflow-hidden rounded-full">
                        <div
                          className="absolute h-full bg-primary rounded-full"
                          style={{
                            width: `${
                              ((selectedMatch?.result?.stats?.fouls || 0) /
                                ((selectedMatch?.result?.stats?.fouls || 0) +
                                  7)) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                      <div className="text-xs text-center mt-1">Fouls</div>
                    </div>
                    <div className="font-medium w-16">7</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="font-medium text-right w-16">
                      {selectedMatch?.result?.stats?.yellowCards}
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="relative h-2 w-full bg-muted overflow-hidden rounded-full">
                        <div
                          className="absolute h-full bg-amber-500 rounded-full"
                          style={{
                            width: `${
                              ((selectedMatch?.result?.stats?.yellowCards ||
                                0) /
                                ((selectedMatch?.result?.stats?.yellowCards ||
                                  0) +
                                  2)) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                      <div className="text-xs text-center mt-1">
                        Yellow Cards
                      </div>
                    </div>
                    <div className="font-medium w-16">2</div>
                  </div>
                </div>
              </div>

              {/* Player Performances */}
              <div>
                <h3 className="text-lg font-medium mb-3">
                  Player Performances
                </h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Player</TableHead>
                      <TableHead>Pos</TableHead>
                      <TableHead className="text-center">Rating</TableHead>
                      <TableHead className="text-center">Goals</TableHead>
                      <TableHead className="text-center">Assists</TableHead>
                      <TableHead className="text-center">Mins</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedMatch?.result?.playerPerformances?.map(
                      (player) => (
                        <TableRow key={player.id}>
                          <TableCell className="font-medium">
                            {player.name}
                            {player.name === selectedMatch.result?.motm && (
                              <Badge variant="outline" className="ml-2">
                                MOTM
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>{player.position}</TableCell>
                          <TableCell className="text-center">
                            <Badge
                              variant={
                                player.rating >= 8 ? "default" : "outline"
                              }
                              className={
                                player.rating >= 8 ? "bg-green-500" : ""
                              }
                            >
                              {player.rating.toFixed(1)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            {player.goals}
                          </TableCell>
                          <TableCell className="text-center">
                            {player.assists}
                          </TableCell>
                          <TableCell className="text-center">
                            {player.minutesPlayed}'
                          </TableCell>
                        </TableRow>
                      ),
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Match Summary */}
              <div>
                <h3 className="text-lg font-medium mb-3">Match Summary</h3>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm">
                    FC United {selectedMatch?.teamSelection}{" "}
                    {selectedMatch?.result?.goalsFor}-
                    {selectedMatch?.result?.goalsAgainst}{" "}
                    {selectedMatch?.opponent}. A{" "}
                    {selectedMatch?.result &&
                    selectedMatch.result.goalsFor >
                      selectedMatch.result.goalsAgainst
                      ? "convincing win"
                      : selectedMatch?.result &&
                          selectedMatch.result.goalsFor ===
                            selectedMatch.result.goalsAgainst
                        ? "hard-fought draw"
                        : "disappointing loss"}{" "}
                    for our youth team.
                    {selectedMatch?.result?.motm &&
                      `${selectedMatch.result.motm} was named Man of the Match with an outstanding performance.`}
                    The team showed{" "}
                    {selectedMatch?.result && selectedMatch.result.rating >= 7.5
                      ? "excellent"
                      : selectedMatch?.result &&
                          selectedMatch.result.rating >= 6.5
                        ? "good"
                        : "poor"}{" "}
                    overall performance with a team rating of{" "}
                    {selectedMatch?.result?.rating.toFixed(1)}.
                  </p>
                </div>
              </div>
            </div>
          )}

          {selectedMatch?.status === "scheduled" && (
            <div className="space-y-6">
              {/* Match Preview */}
              <div className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                    <Shirt className="h-8 w-8 text-primary" />
                  </div>
                  <div className="font-medium text-center">
                    FC United {selectedMatch?.teamSelection}
                  </div>
                </div>
                <div className="text-2xl font-bold">vs</div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                    <Shirt className="h-8 w-8 text-primary" />
                  </div>
                  <div className="font-medium text-center">
                    {selectedMatch?.opponent}
                  </div>
                </div>
              </div>

              {/* Match Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-medium mb-2 flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Match Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date:</span>
                      <span>
                        {new Date(
                          selectedMatch?.date || "",
                        ).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Time:</span>
                      <span>{selectedMatch?.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Venue:</span>
                      <span>
                        {selectedMatch?.venue === "home" ? "Home" : "Away"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Competition:
                      </span>
                      <span>{selectedMatch?.competition}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-medium mb-2 flex items-center">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Match Importance
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Badge
                        variant={
                          selectedMatch?.importance === "high"
                            ? "destructive"
                            : selectedMatch?.importance === "medium"
                              ? "default"
                              : "outline"
                        }
                        className="mr-2"
                      >
                        {selectedMatch?.importance === "high"
                          ? "High"
                          : selectedMatch?.importance === "medium"
                            ? "Medium"
                            : "Low"}
                      </Badge>
                      <span className="text-sm">Importance</span>
                    </div>
                    <div className="text-sm mt-2">
                      {selectedMatch?.importance === "high"
                        ? "This is a crucial match that could significantly impact our season."
                        : selectedMatch?.importance === "medium"
                          ? "This match is important for our position in the competition."
                          : "This is a regular match with standard importance."}
                    </div>
                  </div>
                </div>
              </div>

              {/* Team Selection */}
              <div>
                <h3 className="text-lg font-medium mb-3">
                  Suggested Team Selection
                </h3>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm mb-4">
                    Based on player form, fitness, and the importance of this
                    match, here is the suggested team selection:
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      "GK",
                      "LB",
                      "CB",
                      "CB",
                      "RB",
                      "CDM",
                      "CM",
                      "CAM",
                      "LW",
                      "ST",
                      "RW",
                    ].map((position, index) => (
                      <div
                        key={index}
                        className="border rounded-md p-2 text-center"
                      >
                        <div className="text-xs text-muted-foreground">
                          {position}
                        </div>
                        <div className="font-medium text-sm">
                          {position === "GK"
                            ? "Lucas Fernandez"
                            : position === "LB"
                              ? "Alejandro Gomez"
                              : position === "CB" && index === 1
                                ? "Liam Thompson"
                                : position === "CB"
                                  ? "Samuel Osei"
                                  : position === "RB"
                                    ? "Kai Zhang"
                                    : position === "CDM"
                                      ? "Matteo Ricci"
                                      : position === "CM"
                                        ? "Carlos Mendes"
                                        : position === "CAM"
                                          ? "Jamal Williams"
                                          : position === "LW"
                                            ? "Ryan Cooper"
                                            : position === "ST"
                                              ? "James Wilson"
                                              : "New Player"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedMatch?.status === "live" && (
            <div className="space-y-6">
              {/* Live Score */}
              <div className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                    <Shirt className="h-8 w-8 text-primary" />
                  </div>
                  <div className="font-medium text-center">
                    FC United {selectedMatch?.teamSelection}
                  </div>
                  <div className="text-4xl font-bold">
                    {selectedMatch?.result?.goalsFor || 0}
                  </div>
                </div>
                <div>
                  <Badge variant="destructive" className="animate-pulse">
                    LIVE
                  </Badge>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                    <Shirt className="h-8 w-8 text-primary" />
                  </div>
                  <div className="font-medium text-center">
                    {selectedMatch?.opponent}
                  </div>
                  <div className="text-4xl font-bold">
                    {selectedMatch?.result?.goalsAgainst || 0}
                  </div>
                </div>
              </div>

              {/* Live Commentary */}
              <div>
                <h3 className="text-lg font-medium mb-3">Live Commentary</h3>
                <div className="border rounded-md p-4 h-60 overflow-y-auto space-y-3">
                  <div className="flex items-start">
                    <Badge className="mt-0.5 mr-2">75'</Badge>
                    <p className="text-sm">
                      Great save by our goalkeeper! The opposition was through
                      on goal but a fantastic diving save keeps our lead intact.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <Badge className="mt-0.5 mr-2">68'</Badge>
                    <p className="text-sm">
                      <span className="font-medium">GOAL!</span> Ryan Cooper
                      scores with a fantastic finish from the edge of the box!
                      FC United 1-0 Brighton U23
                    </p>
                  </div>
                  <div className="flex items-start">
                    <Badge className="mt-0.5 mr-2">62'</Badge>
                    <p className="text-sm">
                      Substitution for FC United: Johnson comes on for Williams
                      who looks to have picked up a slight knock.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <Badge className="mt-0.5 mr-2">55'</Badge>
                    <p className="text-sm">
                      Close! Matteo Ricci's long-range effort just whistles past
                      the post. Great attempt!
                    </p>
                  </div>
                  <div className="flex items-start">
                    <Badge className="mt-0.5 mr-2">46'</Badge>
                    <p className="text-sm">
                      Second half begins. No changes for either side.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <Badge className="mt-0.5 mr-2">45'</Badge>
                    <p className="text-sm">
                      Half time: FC United 0-0 Brighton U23. A tight first half
                      with few clear-cut chances.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <Badge className="mt-0.5 mr-2">32'</Badge>
                    <p className="text-sm">
                      Yellow card for Brighton's number 8 after a late challenge
                      on Matteo Ricci.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <Badge className="mt-0.5 mr-2">15'</Badge>
                    <p className="text-sm">
                      Good chance for FC United! Ryan Cooper's header goes just
                      wide from a great cross by Matteo Ricci.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <Badge className="mt-0.5 mr-2">1'</Badge>
                    <p className="text-sm">
                      Kick off! The match between FC United U23 and Brighton U23
                      is underway.
                    </p>
                  </div>
                </div>
              </div>

              {/* Live Stats */}
              <div>
                <h3 className="text-lg font-medium mb-3">
                  Live Match Statistics
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-right w-16">54%</div>
                    <div className="flex-1 mx-4">
                      <div className="relative h-2 w-full bg-muted overflow-hidden rounded-full">
                        <div
                          className="absolute h-full bg-primary rounded-full"
                          style={{ width: "54%" }}
                        ></div>
                      </div>
                      <div className="text-xs text-center mt-1">Possession</div>
                    </div>
                    <div className="font-medium w-16">46%</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="font-medium text-right w-16">8</div>
                    <div className="flex-1 mx-4">
                      <div className="relative h-2 w-full bg-muted overflow-hidden rounded-full">
                        <div
                          className="absolute h-full bg-primary rounded-full"
                          style={{ width: "57%" }}
                        ></div>
                      </div>
                      <div className="text-xs text-center mt-1">Shots</div>
                    </div>
                    <div className="font-medium w-16">6</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="font-medium text-right w-16">4</div>
                    <div className="flex-1 mx-4">
                      <div className="relative h-2 w-full bg-muted overflow-hidden rounded-full">
                        <div
                          className="absolute h-full bg-primary rounded-full"
                          style={{ width: "67%" }}
                        ></div>
                      </div>
                      <div className="text-xs text-center mt-1">
                        Shots on Target
                      </div>
                    </div>
                    <div className="font-medium w-16">2</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="font-medium text-right w-16">5</div>
                    <div className="flex-1 mx-4">
                      <div className="relative h-2 w-full bg-muted overflow-hidden rounded-full">
                        <div
                          className="absolute h-full bg-primary rounded-full"
                          style={{ width: "62%" }}
                        ></div>
                      </div>
                      <div className="text-xs text-center mt-1">Corners</div>
                    </div>
                    <div className="font-medium w-16">3</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setMatchDetailOpen(false)}>
              Close
            </Button>
            {selectedMatch?.status === "scheduled" && (
              <Button>Manage Team Selection</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Competition Standings Dialog */}
      <Dialog open={standingsOpen} onOpenChange={setStandingsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedCompetition?.name}</DialogTitle>
            <DialogDescription>
              {selectedCompetition?.type === "league"
                ? "League Standings"
                : "Cup Schedule"}
            </DialogDescription>
          </DialogHeader>

          {selectedCompetition?.type === "league" &&
            selectedCompetition.standings && (
              <div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Pos</TableHead>
                      <TableHead>Team</TableHead>
                      <TableHead className="text-center">P</TableHead>
                      <TableHead className="text-center">W</TableHead>
                      <TableHead className="text-center">D</TableHead>
                      <TableHead className="text-center">L</TableHead>
                      <TableHead className="text-center">GF</TableHead>
                      <TableHead className="text-center">GA</TableHead>
                      <TableHead className="text-center">GD</TableHead>
                      <TableHead className="text-right">Pts</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedCompetition.standings.map((team) => (
                      <TableRow
                        key={team.team}
                        className={
                          team.team.includes("FC United")
                            ? "bg-muted/30 font-medium"
                            : ""
                        }
                      >
                        <TableCell>{team.position}</TableCell>
                        <TableCell>{team.team}</TableCell>
                        <TableCell className="text-center">
                          {team.played}
                        </TableCell>
                        <TableCell className="text-center">
                          {team.won}
                        </TableCell>
                        <TableCell className="text-center">
                          {team.drawn}
                        </TableCell>
                        <TableCell className="text-center">
                          {team.lost}
                        </TableCell>
                        <TableCell className="text-center">
                          {team.goalsFor}
                        </TableCell>
                        <TableCell className="text-center">
                          {team.goalsAgainst}
                        </TableCell>
                        <TableCell className="text-center">
                          {team.goalsFor - team.goalsAgainst}
                        </TableCell>
                        <TableCell className="text-right">
                          {team.points}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-100 border border-green-500 mr-2"></div>
                    <span className="text-sm">Promotion positions</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-red-100 border border-red-500 mr-2"></div>
                    <span className="text-sm">Relegation positions</span>
                  </div>
                </div>
              </div>
            )}

          {selectedCompetition?.type === "cup" &&
            selectedCompetition.schedule && (
              <div className="space-y-6">
                {selectedCompetition.schedule.map((round, index) => (
                  <div key={index}>
                    <h3 className="font-medium text-lg mb-3">{round.round}</h3>
                    <div className="space-y-2">
                      {round.matches.map((match, matchIndex) => (
                        <div
                          key={matchIndex}
                          className="border rounded-md p-3 flex justify-between items-center"
                        >
                          <div
                            className={
                              match.homeTeam.includes("FC United")
                                ? "font-medium"
                                : ""
                            }
                          >
                            {match.homeTeam}
                          </div>
                          <div className="flex items-center">
                            <span className="text-sm text-muted-foreground mr-2">
                              {match.result ||
                                new Date(match.date).toLocaleDateString()}
                            </span>
                            <span className="text-sm">vs</span>
                          </div>
                          <div
                            className={
                              match.awayTeam.includes("FC United")
                                ? "font-medium"
                                : ""
                            }
                          >
                            {match.awayTeam}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setStandingsOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Player Detail Dialog */}
      <Dialog open={playerDetailOpen} onOpenChange={setPlayerDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedPlayer?.name}</DialogTitle>
            <DialogDescription>
              {selectedPlayer?.position} - {selectedPlayer?.teamType} Team -{" "}
              {selectedPlayer?.age} years old
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-lg mb-3">Season Statistics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Appearances:</span>
                  <span className="font-medium">
                    {selectedPlayer?.appearances}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Goals:</span>
                  <span className="font-medium">{selectedPlayer?.goals}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Assists:</span>
                  <span className="font-medium">{selectedPlayer?.assists}</span>
                </div>
                {selectedPlayer?.position === "GK" && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Clean Sheets:</span>
                    <span className="font-medium">
                      {selectedPlayer?.cleanSheets}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Yellow Cards:</span>
                  <span className="font-medium">
                    {selectedPlayer?.yellowCards}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Red Cards:</span>
                  <span className="font-medium">
                    {selectedPlayer?.redCards}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">
                    Man of the Match:
                  </span>
                  <span className="font-medium">{selectedPlayer?.motm}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Average Rating:</span>
                  <Badge
                    variant={
                      selectedPlayer && selectedPlayer.averageRating >= 8
                        ? "default"
                        : "outline"
                    }
                    className={
                      selectedPlayer && selectedPlayer.averageRating >= 8
                        ? "bg-green-500"
                        : ""
                    }
                  >
                    {selectedPlayer?.averageRating.toFixed(1)}
                  </Badge>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-lg mb-3">Development</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-muted-foreground">
                      Technical
                    </span>
                    <span className="text-sm font-medium">Good</span>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-muted-foreground">
                      Mental
                    </span>
                    <span className="text-sm font-medium">Developing</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-muted-foreground">
                      Physical
                    </span>
                    <span className="text-sm font-medium">Excellent</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-muted-foreground">
                      Overall Potential
                    </span>
                    <span className="text-sm font-medium">High</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>

                <div className="pt-2">
                  <h4 className="font-medium mb-2">Recent Form</h4>
                  <div className="flex space-x-1">
                    {[8.2, 7.5, 7.8, 6.9, 8.0].map((rating, i) => (
                      <div
                        key={i}
                        className={`w-8 h-8 flex items-center justify-center rounded-md text-xs font-bold ${
                          rating >= 8
                            ? "bg-green-500 text-white"
                            : rating >= 7
                              ? "bg-blue-500 text-white"
                              : rating >= 6
                                ? "bg-amber-500 text-white"
                                : "bg-red-500 text-white"
                        }`}
                      >
                        {rating.toFixed(1)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="font-medium text-lg mb-3">Coach's Notes</h3>
            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="text-sm">
                {selectedPlayer?.name} is showing{" "}
                {selectedPlayer?.averageRating !== undefined &&
                selectedPlayer.averageRating >= 7.5
                  ? "excellent"
                  : selectedPlayer?.averageRating !== undefined &&
                      selectedPlayer.averageRating >= 7
                    ? "good"
                    : "average"}{" "}
                progress this season.
                {selectedPlayer?.goals !== undefined && selectedPlayer.goals > 5
                  ? ` Has demonstrated strong goal-scoring ability with ${selectedPlayer.goals} goals.`
                  : ""}
                {(selectedPlayer?.assists ?? 0) > 5
                  ? ` Creates plenty of chances for teammates with ${selectedPlayer?.assists} assists.`
                  : ""}
                {selectedPlayer?.cleanSheets && selectedPlayer.cleanSheets > 5
                  ? ` Solid defensive contribution with ${selectedPlayer?.cleanSheets} clean sheets.`
                  : ""}
                {(selectedPlayer?.yellowCards ?? 0) > 3
                  ? ` Needs to work on discipline, having received ${selectedPlayer?.yellowCards} yellow cards.`
                  : ""}
                {selectedPlayer?.age !== undefined && selectedPlayer.age <= 17
                  ? " Has significant potential to develop further given their young age."
                  : " Should be ready for first-team consideration soon."}
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setPlayerDetailOpen(false)}
            >
              Close
            </Button>
            <Button>Promote to First Team</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
