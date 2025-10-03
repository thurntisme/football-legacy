"use client";

import { useState } from "react";

import {
  Calendar,
  Clock,
  Edit,
  Plus,
  Save,
  Target,
  Trash2,
  Users,
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

// Mock training sessions data
const initialSessions = [
  {
    id: "1",
    title: "Pre-Match Tactical Session",
    description: "Focus on opponent analysis and tactical preparation",
    date: "2025-03-25",
    time: "10:00",
    duration: 60,
    type: "tactical",
    participants: "First Team",
    objectives: [
      "Defensive organization",
      "Set piece preparation",
      "Counter-attack strategy",
    ],
  },
  {
    id: "2",
    title: "Recovery Session",
    description: "Light recovery session after match",
    date: "2025-03-23",
    time: "09:30",
    duration: 45,
    type: "fitness",
    participants: "Match Players",
    objectives: ["Active recovery", "Injury prevention", "Light stretching"],
  },
  {
    id: "3",
    title: "Technical Drills",
    description: "Focus on passing and ball control",
    date: "2025-03-24",
    time: "14:00",
    duration: 90,
    type: "technical",
    participants: "All Players",
    objectives: [
      "Passing accuracy",
      "First touch improvement",
      "Small-sided games",
    ],
  },
];

// Training types
const trainingTypes = [
  { id: "fitness", name: "Fitness" },
  { id: "tactical", name: "Tactical" },
  { id: "technical", name: "Technical" },
  { id: "teamwork", name: "Teamwork" },
  { id: "match_prep", name: "Match Preparation" },
];

// Participant groups
const participantGroups = [
  "All Players",
  "First Team",
  "Reserves",
  "Match Players",
  "Non-Match Players",
  "Goalkeepers",
  "Defenders",
  "Midfielders",
  "Forwards",
];

export default function TrainingSessions() {
  const [sessions, setSessions] = useState(initialSessions);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSession, setEditingSession] = useState<any>(null);

  // New session form state
  const [newSession, setNewSession] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    duration: 60,
    type: "tactical",
    participants: "All Players",
    objectives: [""],
  });

  // Filter sessions based on active tab
  const filteredSessions = sessions.filter((session) => {
    const sessionDate = new Date(session.date);
    const today = new Date();

    if (activeTab === "upcoming") {
      return sessionDate >= today;
    } else if (activeTab === "past") {
      return sessionDate < today;
    }
    return true;
  });

  // Handle form input changes
  const handleInputChange = (field: string, value: any) => {
    if (editingSession) {
      setEditingSession({
        ...editingSession,
        [field]: value,
      });
    } else {
      setNewSession({
        ...newSession,
        [field]: value,
      });
    }
  };

  // Handle objective changes
  const handleObjectiveChange = (index: number, value: string) => {
    const currentSession = editingSession || newSession;
    const updatedObjectives = [...currentSession.objectives];
    updatedObjectives[index] = value;

    if (editingSession) {
      setEditingSession({
        ...editingSession,
        objectives: updatedObjectives,
      });
    } else {
      setNewSession({
        ...newSession,
        objectives: updatedObjectives,
      });
    }
  };

  // Add new objective field
  const addObjective = () => {
    const currentSession = editingSession || newSession;
    if (editingSession) {
      setEditingSession({
        ...editingSession,
        objectives: [...currentSession.objectives, ""],
      });
    } else {
      setNewSession({
        ...newSession,
        objectives: [...currentSession.objectives, ""],
      });
    }
  };

  // Remove objective field
  const removeObjective = (index: number) => {
    // const currentSession = editingSession || newSession;
    // const updatedObjectives = currentSession.objectives.filter(
    //   (_, i) => i !== index
    // );
    // if (editingSession) {
    //   setEditingSession({
    //     ...editingSession,
    //     objectives: updatedObjectives,
    //   });
    // } else {
    //   setNewSession({
    //     ...newSession,
    //     objectives: updatedObjectives,
    //   });
    // }
  };

  // Save new or edited session
  const saveSession = () => {
    if (editingSession) {
      // Update existing session
      setSessions(
        sessions.map((session) =>
          session.id === editingSession.id ? editingSession : session,
        ),
      );
      toast({
        title: "Training session updated",
        description: "The training session has been successfully updated.",
      });
    } else {
      // Add new session
      const newId = Math.random().toString(36).substring(2, 9);
      setSessions([...sessions, { ...newSession, id: newId }]);
      toast({
        title: "Training session created",
        description: "A new training session has been added to the schedule.",
      });
    }

    // Reset form and close dialog
    setNewSession({
      title: "",
      description: "",
      date: "",
      time: "",
      duration: 60,
      type: "tactical",
      participants: "All Players",
      objectives: [""],
    });
    setEditingSession(null);
    setDialogOpen(false);
  };

  // Delete session
  const deleteSession = (id: string) => {
    setSessions(sessions.filter((session) => session.id !== id));
    toast({
      title: "Training session deleted",
      description: "The training session has been removed from the schedule.",
    });
  };

  // Edit session
  const editSession = (session: any) => {
    setEditingSession(session);
    setDialogOpen(true);
  };

  // Get type badge color
  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "fitness":
        return "bg-green-100 text-green-800";
      case "tactical":
        return "bg-blue-100 text-blue-800";
      case "technical":
        return "bg-purple-100 text-purple-800";
      case "teamwork":
        return "bg-yellow-100 text-yellow-800";
      case "match_prep":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full md:w-auto"
        >
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
            <TabsTrigger value="past">Past Sessions</TabsTrigger>
            <TabsTrigger value="all">All Sessions</TabsTrigger>
          </TabsList>
        </Tabs>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingSession(null)}>
              <Plus className="mr-2 h-4 w-4" />
              New Session
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingSession
                  ? "Edit Training Session"
                  : "Create New Training Session"}
              </DialogTitle>
              <DialogDescription>
                {editingSession
                  ? "Update the details of this training session."
                  : "Add a new training session to your schedule."}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="title">Session Title</Label>
                <Input
                  id="title"
                  value={editingSession?.title || newSession.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="e.g., Pre-Match Tactical Session"
                />
              </div>

              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={editingSession?.description || newSession.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  placeholder="Brief description of the training session"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="date">Date</Label>
                  <div className="flex">
                    <Calendar className="mr-2 h-4 w-4 mt-3" />
                    <Input
                      id="date"
                      type="date"
                      value={editingSession?.date || newSession.date}
                      onChange={(e) =>
                        handleInputChange("date", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="time">Start Time</Label>
                  <div className="flex">
                    <Clock className="mr-2 h-4 w-4 mt-3" />
                    <Input
                      id="time"
                      type="time"
                      value={editingSession?.time || newSession.time}
                      onChange={(e) =>
                        handleInputChange("time", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input
                    id="duration"
                    type="number"
                    min="15"
                    step="15"
                    value={editingSession?.duration || newSession.duration}
                    onChange={(e) =>
                      handleInputChange(
                        "duration",
                        Number.parseInt(e.target.value),
                      )
                    }
                  />
                </div>

                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="type">Session Type</Label>
                  <Select
                    value={editingSession?.type || newSession.type}
                    onValueChange={(value) => handleInputChange("type", value)}
                  >
                    <SelectTrigger id="type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {trainingTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="participants">Participants</Label>
                <div className="flex">
                  <Users className="mr-2 h-4 w-4 mt-3" />
                  <Select
                    value={
                      editingSession?.participants || newSession.participants
                    }
                    onValueChange={(value) =>
                      handleInputChange("participants", value)
                    }
                  >
                    <SelectTrigger id="participants" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {participantGroups.map((group) => (
                        <SelectItem key={group} value={group}>
                          {group}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2">
                <div className="flex justify-between items-center">
                  <Label>Session Objectives</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addObjective}
                    type="button"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {(editingSession?.objectives || newSession.objectives).map(
                  (objective: string, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <Target className="h-4 w-4 flex-shrink-0" />
                      <Input
                        value={objective}
                        onChange={(e) =>
                          handleObjectiveChange(index, e.target.value)
                        }
                        placeholder={`Objective ${index + 1}`}
                      />
                      {(editingSession?.objectives || newSession.objectives)
                        .length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeObjective(index)}
                          type="button"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ),
                )}
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setDialogOpen(false);
                  setEditingSession(null);
                }}
              >
                Cancel
              </Button>
              <Button onClick={saveSession}>
                <Save className="mr-2 h-4 w-4" />
                {editingSession ? "Update Session" : "Create Session"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {filteredSessions.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <p className="text-muted-foreground mb-4">
              No training sessions found
            </p>
            <Button
              onClick={() => {
                setEditingSession(null);
                setDialogOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Session
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSessions.map((session) => (
            <Card key={session.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <Badge className={getTypeBadgeColor(session.type)}>
                    {trainingTypes.find((t) => t.id === session.type)?.name}
                  </Badge>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => editSession(session)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteSession(session.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardTitle className="text-lg mt-2">{session.title}</CardTitle>
                <CardDescription>{session.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>{new Date(session.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>
                      {session.time} ({session.duration} minutes)
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    <span>{session.participants}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Objectives:</p>
                  <ul className="text-sm space-y-1">
                    {session.objectives.map(
                      (objective: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <Target className="mr-2 h-4 w-4 mt-0.5 flex-shrink-0" />
                          <span>{objective}</span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
