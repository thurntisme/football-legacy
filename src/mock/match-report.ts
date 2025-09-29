import { MatchEvent } from "@/types/match";

export const teamALineup = [
  {
    number: 1,
    name: "David Smith",
    position: "GK",
    rating: 7.2,
  },
  {
    number: 2,
    name: "James Wilson",
    position: "RB",
    rating: 6.8,
  },
  {
    number: 5,
    name: "Michael Brown",
    position: "CB",
    rating: 7.5,
  },
  {
    number: 6,
    name: "Robert Johnson",
    position: "CB",
    rating: 7.3,
  },
  {
    number: 3,
    name: "Thomas Davis",
    position: "LB",
    rating: 6.9,
  },
  {
    number: 8,
    name: "John Thompson",
    position: "CM",
    rating: 8.1,
  },
  {
    number: 4,
    name: "William Taylor",
    position: "CM",
    rating: 7.7,
  },
  {
    number: 10,
    name: "David Williams",
    position: "CAM",
    rating: 8.4,
  },
  {
    number: 7,
    name: "Richard Martin",
    position: "RW",
    rating: 7.6,
  },
  {
    number: 11,
    name: "Daniel White",
    position: "LW",
    rating: 7.8,
  },
  {
    number: 9,
    name: "Michael Johnson",
    position: "ST",
    rating: 9.2,
  },
];

export const teamASubs = [
  {
    number: 12,
    name: "Paul Anderson",
    position: "GK",
    rating: "-",
  },
  {
    number: 14,
    name: "Mark Wilson",
    position: "DF",
    rating: 6.5,
    minute: 67,
  },
  {
    number: 16,
    name: "Steven Clark",
    position: "MF",
    rating: 6.8,
    minute: 72,
  },
  {
    number: 20,
    name: "Robert Thompson",
    position: "ST",
    rating: 7.4,
    minute: 63,
  },
  {
    number: 23,
    name: "Kevin Lewis",
    position: "MF",
    rating: "-",
  },
];

export const teamBLineup = [
  {
    number: 1,
    name: "Carlos Rodriguez",
    position: "GK",
    rating: 6.5,
  },
  {
    number: 2,
    name: "Juan Martinez",
    position: "RB",
    rating: 6.3,
  },
  {
    number: 5,
    name: "Pedro Sanchez",
    position: "CB",
    rating: 6.7,
  },
  {
    number: 6,
    name: "Miguel Hernandez",
    position: "CB",
    rating: 6.4,
  },
  {
    number: 3,
    name: "Antonio Lopez",
    position: "LB",
    rating: 6.2,
  },
  {
    number: 8,
    name: "Fernando Garcia",
    position: "CM",
    rating: 7.0,
  },
  {
    number: 4,
    name: "Javier Perez",
    position: "CM",
    rating: 6.8,
  },
  {
    number: 10,
    name: "Carlos Mendez",
    position: "CAM",
    rating: 7.5,
  },
  {
    number: 7,
    name: "Raul Gonzalez",
    position: "RW",
    rating: 6.9,
  },
  {
    number: 11,
    name: "Diego Morales",
    position: "LW",
    rating: 6.6,
  },
  {
    number: 9,
    name: "Luis Torres",
    position: "ST",
    rating: 7.2,
  },
];

export const teamBSubs = [
  {
    number: 12,
    name: "Alejandro Diaz",
    position: "GK",
    rating: "-",
  },
  {
    number: 14,
    name: "Roberto Flores",
    position: "DF",
    rating: 6.3,
    minute: 58,
  },
  {
    number: 16,
    name: "Eduardo Vega",
    position: "MF",
    rating: 6.5,
    minute: 70,
  },
  {
    number: 20,
    name: "Ricardo Reyes",
    position: "ST",
    rating: 6.7,
    minute: 75,
  },
  {
    number: 23,
    name: "Gabriel Ortiz",
    position: "MF",
    rating: "-",
  },
];

export const matchEvents: MatchEvent[] = [
  {
    minute: 1,
    type: "kickoff",
    title: "Kick Off",
    description: "Match begins at ${selectedMatch.stadium}",
  },
  {
    minute: 12,
    type: "goal",
    title: "GOAL! ${selectedMatch.homeTeam}",
    description: "Michael Johnson scores from close range",
    assist: "Assist: David Williams",
    team: "home",
    player: "Michael Johnson",
  },
  {
    minute: 23,
    type: "yellow-card",
    title: "Yellow Card",
    description:
      "Fernando Garcia (${selectedMatch.awayTeam}) booked for a late tackle",
    team: "away",
    player: "Fernando Garcia",
  },
  {
    minute: 34,
    type: "goal",
    title: "GOAL! ${selectedMatch.homeTeam}",
    description: "Michael Johnson doubles the lead with a header",
    assist: "Assist: John Thompson",
    team: "home",
    player: "Michael Johnson",
  },
  {
    minute: 45,
    type: "half-time",
    title: "Half Time",
    description: "${selectedMatch.homeTeam} 2-0 ${selectedMatch.awayTeam}",
  },
  {
    minute: 46,
    type: "second-half",
    title: "Second Half",
    description: "Second half begins",
  },
  {
    minute: 56,
    type: "goal",
    title: "GOAL! ${selectedMatch.awayTeam}",
    description: "Carlos Mendez with a long-range strike",
    assist: "Assist: Fernando Garcia",
    team: "away",
    player: "Carlos Mendez",
  },
  {
    minute: 63,
    type: "substitution",
    title: "Substitution - ${selectedMatch.homeTeam}",
    description: "Robert Thompson replaces Daniel White",
    team: "home",
  },
  {
    minute: 67,
    type: "substitution",
    title: "Substitution - ${selectedMatch.homeTeam}",
    description: "Mark Wilson replaces James Wilson (Injury)",
    team: "home",
  },
  {
    minute: 78,
    type: "goal",
    title: "GOAL! ${selectedMatch.homeTeam}",
    description: "Robert Thompson with a tap-in",
    assist: "Assist: John Thompson",
    team: "home",
    player: "Robert Thompson",
  },
  {
    minute: 93,
    type: "full-time",
    title: "Full Time",
    description: "${selectedMatch.homeTeam} 3-1 ${selectedMatch.awayTeam}",
  },
];
