"use client";

import { useState } from "react";

import {
  Brain,
  Check,
  Dumbbell,
  Footprints,
  Save,
  Target,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";

// Mock player data
const players = [
  {
    id: "1",
    name: "Alex Johnson",
    position: "ST",
    age: 24,
    image: "/placeholder.svg?height=40&width=40",
    attributes: {
      technical: 78,
      tactical: 72,
      physical: 85,
      mental: 76,
    },
    focus: "technical",
    development: 68,
    trainingIntensity: 75,
  },
  {
    id: "2",
    name: "Marcus Silva",
    position: "CM",
    age: 26,
    image: "/placeholder.svg?height=40&width=40",
    attributes: {
      technical: 82,
      tactical: 84,
      physical: 76,
      mental: 80,
    },
    focus: "tactical",
    development: 75,
    trainingIntensity: 80,
  },
  {
    id: "3",
    name: "James Wilson",
    position: "CB",
    age: 29,
    image: "/placeholder.svg?height=40&width=40",
    attributes: {
      technical: 70,
      tactical: 83,
      physical: 88,
      mental: 79,
    },
    focus: "physical",
    development: 62,
    trainingIntensity: 70,
  },
  {
    id: "4",
    name: "Kai Zhang",
    position: "LW",
    age: 22,
    image: "/placeholder.svg?height=40&width=40",
    attributes: {
      technical: 85,
      tactical: 75,
      physical: 82,
      mental: 73,
    },
    focus: "mental",
    development: 80,
    trainingIntensity: 85,
  },
  {
    id: "5",
    name: "Leo Martins",
    position: "GK",
    age: 31,
    image: "/placeholder.svg?height=40&width=40",
    attributes: {
      technical: 79,
      tactical: 80,
      physical: 77,
      mental: 85,
    },
    focus: "technical",
    development: 55,
    trainingIntensity: 65,
  },
];

// Team focus areas
const teamFocusAreas = [
  {
    id: "possession",
    name: "Possession Play",
    description: "Focus on ball retention and circulation",
    currentLevel: 65,
    icon: <Footprints className="h-5 w-5" />,
  },
  {
    id: "pressing",
    name: "High Pressing",
    description: "Focus on winning the ball high up the pitch",
    currentLevel: 72,
    icon: <Dumbbell className="h-5 w-5" />,
  },
  {
    id: "counter_attack",
    name: "Counter Attacking",
    description: "Focus on quick transitions after winning possession",
    currentLevel: 78,
    icon: <Target className="h-5 w-5" />,
  },
  {
    id: "set_pieces",
    name: "Set Pieces",
    description: "Focus on corners, free kicks and throw-ins",
    currentLevel: 60,
    icon: <Brain className="h-5 w-5" />,
  },
  {
    id: "team_cohesion",
    name: "Team Cohesion",
    description: "Focus on team spirit and communication",
    currentLevel: 68,
    icon: <Users className="h-5 w-5" />,
  },
];

// Training focus options
const focusOptions = [
  {
    id: "technical",
    name: "Technical",
    icon: <Footprints className="h-4 w-4" />,
  },
  { id: "tactical", name: "Tactical", icon: <Brain className="h-4 w-4" /> },
  { id: "physical", name: "Physical", icon: <Dumbbell className="h-4 w-4" /> },
  { id: "mental", name: "Mental", icon: <Target className="h-4 w-4" /> },
];

// Specific training drills
const trainingDrills = {
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

export default function TrainingFocus() {
  const [playersList, setPlayersList] = useState(players);
  const [teamFocus, setTeamFocus] = useState(teamFocusAreas);
  const [activeTab, setActiveTab] = useState("individual");
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [specificTrainingOpen, setSpecificTrainingOpen] = useState(false);
  const [selectedDrill, setSelectedDrill] = useState<string>("");
  const [drillIntensity, setDrillIntensity] = useState(70);
  const [drillDuration, setDrillDuration] = useState(45);

  // Handle player focus change
  const updatePlayerFocus = () => {
    if (!selectedPlayer) return;

    setPlayersList(
      playersList.map((player) =>
        player.id === selectedPlayer.id ? selectedPlayer : player,
      ),
    );

    setDialogOpen(false);
    toast({
      title: "Training focus updated",
      description: `${selectedPlayer.name}'s training focus has been updated.`,
    });
  };

  // Update team focus area
  const updateTeamFocusArea = (id: string, level: number) => {
    setTeamFocus(
      teamFocus.map((area) =>
        area.id === id ? { ...area, currentLevel: level } : area,
      ),
    );
  };

  // Save team focus
  const saveTeamFocus = () => {
    // Here you would typically save to a backend
    toast({
      title: "Team focus areas saved",
      description: "Your team's training focus areas have been updated.",
    });
  };

  // Open specific training dialog
  const openSpecificTraining = (player: any) => {
    setSelectedPlayer(player);
    setSelectedDrill("");
    setDrillIntensity(70);
    setDrillDuration(45);
    setSpecificTrainingOpen(true);
  };

  // Save specific training
  const saveSpecificTraining = () => {
    if (!selectedDrill) {
      toast({
        title: "Error",
        description: "Please select a training drill",
        variant: "destructive",
      });
      return;
    }

    // Here you would save the specific training to the backend
    toast({
      title: "Specific training assigned",
      description: `${selectedPlayer.name} will focus on ${
        trainingDrills[
          selectedPlayer.focus as keyof typeof trainingDrills
        ].find((d) => d.id === selectedDrill)?.name
      } for ${drillDuration} minutes at ${drillIntensity}% intensity.`,
    });

    setSpecificTrainingOpen(false);
  };

  // Get attribute color based on value
  const getAttributeColor = (value: number) => {
    if (value >= 85) return "text-green-600";
    if (value >= 75) return "text-blue-600";
    if (value >= 65) return "text-yellow-600";
    return "text-red-600";
  };

  // Get development progress color
  const getDevelopmentColor = (value: number) => {
    if (value >= 80) return "bg-green-600";
    if (value >= 65) return "bg-blue-600";
    if (value >= 50) return "bg-yellow-600";
    return "bg-red-600";
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="individual">Individual Focus</TabsTrigger>
          <TabsTrigger value="team">Team Focus Areas</TabsTrigger>
        </TabsList>

        <TabsContent value="individual" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {playersList.map((player) => (
              <Card key={player.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={player.image} alt={player.name} />
                        <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{player.name}</CardTitle>
                        <CardDescription>
                          {player.position} • {player.age} yrs
                        </CardDescription>
                      </div>
                    </div>
                    <Badge>
                      {focusOptions.find((f) => f.id === player.focus)?.name}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-sm">Technical</span>
                      <span
                        className={`text-sm font-medium ${getAttributeColor(player.attributes.technical)}`}
                      >
                        {player.attributes.technical}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Tactical</span>
                      <span
                        className={`text-sm font-medium ${getAttributeColor(player.attributes.tactical)}`}
                      >
                        {player.attributes.tactical}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Physical</span>
                      <span
                        className={`text-sm font-medium ${getAttributeColor(player.attributes.physical)}`}
                      >
                        {player.attributes.physical}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Mental</span>
                      <span
                        className={`text-sm font-medium ${getAttributeColor(player.attributes.mental)}`}
                      >
                        {player.attributes.mental}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Development Progress</span>
                      <span>{player.development}%</span>
                    </div>
                    <Progress
                      value={player.development}
                      className={getDevelopmentColor(player.development)}
                    />

                    <div className="flex justify-between text-sm mt-2">
                      <span>Training Intensity</span>
                      <span>{player.trainingIntensity}%</span>
                    </div>
                    <Progress
                      value={player.trainingIntensity}
                      className="bg-blue-600"
                    />
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        setSelectedPlayer({ ...player });
                        setDialogOpen(true);
                      }}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Edit Focus
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => openSpecificTraining(player)}
                    >
                      <UserPlus className="mr-2 h-4 w-4" />
                      Specific Training
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Training Focus</DialogTitle>
                <DialogDescription>
                  {selectedPlayer &&
                    `Customize ${selectedPlayer.name}'s training focus and intensity.`}
                </DialogDescription>
              </DialogHeader>

              {selectedPlayer && (
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Primary Training Focus</Label>
                    <RadioGroup
                      value={selectedPlayer.focus}
                      onValueChange={(value) =>
                        setSelectedPlayer({ ...selectedPlayer, focus: value })
                      }
                      className="grid grid-cols-2 gap-4"
                    >
                      {focusOptions.map((option) => (
                        <div
                          key={option.id}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem value={option.id} id={option.id} />
                          <Label
                            htmlFor={option.id}
                            className="flex items-center cursor-pointer"
                          >
                            {option.icon}
                            <span className="ml-2">{option.name}</span>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Training Intensity</Label>
                      <span className="text-sm">
                        {selectedPlayer.trainingIntensity}%
                      </span>
                    </div>
                    <Slider
                      value={[selectedPlayer.trainingIntensity]}
                      min={0}
                      max={100}
                      step={5}
                      onValueChange={(value) =>
                        setSelectedPlayer({
                          ...selectedPlayer,
                          trainingIntensity: value[0],
                        })
                      }
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Low Risk</span>
                      <span>Balanced</span>
                      <span>High Risk</span>
                    </div>
                  </div>

                  <div className="pt-4 text-sm text-muted-foreground">
                    <p>
                      {selectedPlayer.trainingIntensity > 80
                        ? "⚠️ High intensity training increases injury risk but accelerates development."
                        : selectedPlayer.trainingIntensity < 50
                          ? "Low intensity training minimizes injury risk but slows development."
                          : "Balanced training provides moderate development with manageable injury risk."}
                    </p>
                  </div>
                </div>
              )}

              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={updatePlayerFocus}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog
            open={specificTrainingOpen}
            onOpenChange={setSpecificTrainingOpen}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Specific Training</DialogTitle>
                <DialogDescription>
                  {selectedPlayer &&
                    `Assign specific training drills for ${selectedPlayer.name}`}
                </DialogDescription>
              </DialogHeader>

              {selectedPlayer && (
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Select Training Drill</Label>
                    <Select
                      value={selectedDrill}
                      onValueChange={setSelectedDrill}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a training drill" />
                      </SelectTrigger>
                      <SelectContent>
                        {trainingDrills[
                          selectedPlayer.focus as keyof typeof trainingDrills
                        ].map((drill) => (
                          <SelectItem key={drill.id} value={drill.id}>
                            {drill.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {selectedDrill && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {
                          trainingDrills[
                            selectedPlayer.focus as keyof typeof trainingDrills
                          ].find((d) => d.id === selectedDrill)?.description
                        }
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Training Intensity</Label>
                      <span className="text-sm">{drillIntensity}%</span>
                    </div>
                    <Slider
                      value={[drillIntensity]}
                      min={0}
                      max={100}
                      step={5}
                      onValueChange={(value) => setDrillIntensity(value[0])}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Low</span>
                      <span>Medium</span>
                      <span>High</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Session Duration (minutes)</Label>
                      <span className="text-sm">{drillDuration} min</span>
                    </div>
                    <Slider
                      value={[drillDuration]}
                      min={15}
                      max={90}
                      step={15}
                      onValueChange={(value) => setDrillDuration(value[0])}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Short</span>
                      <span>Medium</span>
                      <span>Long</span>
                    </div>
                  </div>

                  <div className="pt-2 text-sm text-muted-foreground">
                    <p>
                      {drillIntensity > 80
                        ? "⚠️ High intensity specific training may cause fatigue for upcoming matches."
                        : drillDuration > 60
                          ? "Longer sessions provide better skill development but may impact player freshness."
                          : "This balanced training session will help improve skills without excessive fatigue."}
                    </p>
                  </div>
                </div>
              )}

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setSpecificTrainingOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={saveSpecificTraining}>
                  <Save className="mr-2 h-4 w-4" />
                  Assign Training
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>

        <TabsContent value="team" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Training Focus Areas</CardTitle>
              <CardDescription>
                Allocate training time to different tactical aspects of your
                team's play
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {teamFocus.map((area) => (
                <div key={area.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      {area.icon}
                      <div className="ml-2">
                        <h4 className="text-sm font-medium">{area.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          {area.description}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline">{area.currentLevel}%</Badge>
                  </div>
                  <Slider
                    value={[area.currentLevel]}
                    min={0}
                    max={100}
                    step={5}
                    onValueChange={(value) =>
                      updateTeamFocusArea(area.id, value[0])
                    }
                  />
                </div>
              ))}

              <Button onClick={saveTeamFocus} className="mt-4">
                <Check className="mr-2 h-4 w-4" />
                Save Team Focus
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Training Recommendations</CardTitle>
              <CardDescription>
                Based on your team's strengths and upcoming fixtures
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                <h4 className="font-medium text-yellow-800 mb-1">
                  Upcoming Match Preparation
                </h4>
                <p className="text-sm text-yellow-700">
                  Your next opponent favors a high-pressing style. Consider
                  increasing focus on counter-attacking and quick transitions.
                </p>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                <h4 className="font-medium text-blue-800 mb-1">
                  Team Weakness
                </h4>
                <p className="text-sm text-blue-700">
                  Set piece defense is below average (60%). Allocate more
                  training time to set pieces to improve defensive organization.
                </p>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                <h4 className="font-medium text-green-800 mb-1">
                  Team Strength
                </h4>
                <p className="text-sm text-green-700">
                  Counter-attacking is your team's strongest area (78%).
                  Maintain this focus to capitalize on your team's natural
                  strengths.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
