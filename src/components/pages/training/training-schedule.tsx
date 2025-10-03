"use client";

import { useState } from "react";

import {
  AlertCircle,
  Brain,
  Dumbbell,
  Footprints,
  Save,
  Target,
  Users,
} from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/components/ui/use-toast";

// Training types with their icons and descriptions
const trainingTypes = [
  {
    id: "fitness",
    name: "Fitness",
    icon: <Dumbbell className="h-5 w-5" />,
    description: "Focus on physical conditioning and stamina",
  },
  {
    id: "tactical",
    name: "Tactical",
    icon: <Brain className="h-5 w-5" />,
    description: "Focus on team shape and tactical understanding",
  },
  {
    id: "technical",
    name: "Technical",
    icon: <Footprints className="h-5 w-5" />,
    description: "Focus on ball control and technique",
  },
  {
    id: "teamwork",
    name: "Teamwork",
    icon: <Users className="h-5 w-5" />,
    description: "Focus on team cohesion and communication",
  },
  {
    id: "match_prep",
    name: "Match Preparation",
    icon: <Target className="h-5 w-5" />,
    description: "Focus on preparing for upcoming matches",
  },
  {
    id: "rest",
    name: "Rest Day",
    icon: null,
    description: "Recovery day with no training",
  },
];

// Days of the week
const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function TrainingSchedule() {
  // Initial training schedule
  const [schedule, setSchedule] = useState(
    daysOfWeek.map((day) => ({
      day,
      type: day === "Sunday" ? "rest" : "fitness",
      intensity: day === "Sunday" ? 0 : 50,
    })),
  );

  const [hasChanges, setHasChanges] = useState(false);

  // Handle training type change
  const handleTypeChange = (day: string, type: string) => {
    setSchedule(
      schedule.map((item) => {
        if (item.day === day) {
          return {
            ...item,
            type,
            // Set intensity to 0 for rest days
            intensity: type === "rest" ? 0 : item.intensity,
          };
        }
        return item;
      }),
    );
    setHasChanges(true);
  };

  // Handle intensity change
  const handleIntensityChange = (day: string, intensity: number) => {
    setSchedule(
      schedule.map((item) => {
        if (item.day === day) {
          return { ...item, intensity };
        }
        return item;
      }),
    );
    setHasChanges(true);
  };

  // Save training schedule
  const saveSchedule = () => {
    // Here you would typically save to a backend
    toast({
      title: "Training schedule saved",
      description: "Your weekly training schedule has been updated.",
    });
    setHasChanges(false);
  };

  // Get intensity label
  const getIntensityLabel = (intensity: number) => {
    if (intensity === 0) return "None";
    if (intensity < 33) return "Light";
    if (intensity < 66) return "Medium";
    return "High";
  };

  // Get intensity color
  const getIntensityColor = (intensity: number) => {
    if (intensity === 0) return "bg-gray-200 text-gray-700";
    if (intensity < 33) return "bg-green-100 text-green-800";
    if (intensity < 66) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <div className="space-y-6">
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Training Load Management</AlertTitle>
        <AlertDescription>
          Balance high and low intensity days to avoid player fatigue and
          injuries. Include at least one rest day per week.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {schedule.map((day) => (
          <Card
            key={day.day}
            className={day.type === "rest" ? "opacity-80" : ""}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{day.day}</CardTitle>
              <CardDescription>
                {day.type !== "rest" && (
                  <Badge className={getIntensityColor(day.intensity)}>
                    {getIntensityLabel(day.intensity)}
                  </Badge>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select
                value={day.type}
                onValueChange={(value) => handleTypeChange(day.day, value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {trainingTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      <div className="flex items-center gap-2">
                        {type.icon}
                        <span>{type.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {day.type !== "rest" && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Intensity</span>
                    <span>{day.intensity}%</span>
                  </div>
                  <Slider
                    value={[day.intensity]}
                    min={0}
                    max={100}
                    step={5}
                    onValueChange={(value) =>
                      handleIntensityChange(day.day, value[0])
                    }
                  />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Button
        onClick={saveSchedule}
        disabled={!hasChanges}
        className="w-full md:w-auto"
      >
        <Save className="mr-2 h-4 w-4" />
        Save Training Schedule
      </Button>
    </div>
  );
}
