import { Brain, Dumbbell, Footprints, Target } from "lucide-react";

export const focusOptions = [
  {
    id: "technical",
    name: "Technical",
    icon: <Footprints className="h-4 w-4" />,
  },
  { id: "tactical", name: "Tactical", icon: <Brain className="h-4 w-4" /> },
  { id: "physical", name: "Physical", icon: <Dumbbell className="h-4 w-4" /> },
  { id: "mental", name: "Mental", icon: <Target className="h-4 w-4" /> },
];

export const trainingDrills = {
  technical: [
    {
      id: "passing",
      name: "Passing Drills",
      description: "Improve short and long passing accuracy",
    },
    {
      id: "shooting",
      name: "Shooting Practice",
      description: "Work on finishing and shot power",
    },
    {
      id: "dribbling",
      name: "Dribbling Skills",
      description: "Enhance ball control and dribbling",
    },
    {
      id: "first_touch",
      name: "First Touch",
      description: "Improve ball reception and control",
    },
  ],
  tactical: [
    {
      id: "positioning",
      name: "Positional Awareness",
      description: "Improve positioning and spatial awareness",
    },
    {
      id: "game_reading",
      name: "Game Reading",
      description: "Enhance ability to read the game and anticipate",
    },
    {
      id: "defensive_shape",
      name: "Defensive Organization",
      description: "Work on defensive positioning and shape",
    },
    {
      id: "attacking_movement",
      name: "Attacking Movement",
      description: "Practice off-the-ball movement and runs",
    },
  ],
  physical: [
    {
      id: "strength",
      name: "Strength Training",
      description: "Build muscle strength and power",
    },
    {
      id: "stamina",
      name: "Stamina Building",
      description: "Improve endurance and recovery",
    },
    {
      id: "speed",
      name: "Speed Training",
      description: "Enhance acceleration and top speed",
    },
    {
      id: "agility",
      name: "Agility Work",
      description: "Improve balance, coordination and agility",
    },
  ],
  mental: [
    {
      id: "concentration",
      name: "Concentration Drills",
      description: "Improve focus during matches",
    },
    {
      id: "decision_making",
      name: "Decision Making",
      description: "Enhance in-game decision making",
    },
    {
      id: "leadership",
      name: "Leadership Training",
      description: "Develop leadership qualities",
    },
    {
      id: "pressure_handling",
      name: "Pressure Situations",
      description: "Practice performing under pressure",
    },
  ],
};
