"use client";

import { useState } from "react";

import { Save, Shield, Volume2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";

export default function GameSettings() {
  const [gameSettings, setGameSettings] = useState({
    difficulty: "normal",
    matchSpeed: 50,
    autoSave: true,
    darkMode: false,
    sound: {
      enabled: true,
      volume: 70,
      effects: true,
      music: true,
    },
    gameplay: {
      autoRotate: true,
      autoSubstitute: true,
      realisticInjuries: true,
      transferNegotiations: true,
    },
  });

  const handleSoundVolumeChange = (value: number[]) => {
    setGameSettings({
      ...gameSettings,
      sound: {
        ...gameSettings.sound,
        volume: value[0],
      },
    });
  };

  const handleToggleSound = (key: string) => {
    setGameSettings({
      ...gameSettings,
      sound: {
        ...gameSettings.sound,
        [key]: !gameSettings.sound[key as keyof typeof gameSettings.sound],
      },
    });
  };

  const handleToggleGameplay = (key: string) => {
    setGameSettings({
      ...gameSettings,
      gameplay: {
        ...gameSettings.gameplay,
        [key]:
          !gameSettings.gameplay[key as keyof typeof gameSettings.gameplay],
      },
    });
  };

  const handleSaveSettings = () => {
    toast({
      title: "Game Settings Updated",
      description: "Your game settings have been saved successfully.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Game Settings</CardTitle>
        <CardDescription>Customize your gameplay experience</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Game Preferences</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty Level</Label>
                <Select
                  value={gameSettings.difficulty}
                  onValueChange={(value) =>
                    setGameSettings({ ...gameSettings, difficulty: value })
                  }
                >
                  <SelectTrigger id="difficulty" className="w-full">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                    <SelectItem value="legendary">Legendary</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="match-speed">Match Simulation Speed</Label>
                  <span className="text-sm text-muted-foreground">
                    {gameSettings.matchSpeed}%
                  </span>
                </div>
                <Slider
                  id="match-speed"
                  defaultValue={[gameSettings.matchSpeed]}
                  max={100}
                  step={10}
                  onValueChange={(value) =>
                    setGameSettings({ ...gameSettings, matchSpeed: value[0] })
                  }
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="auto-save" className="flex flex-col">
                <span>Auto-Save</span>
                <span className="text-sm text-muted-foreground">
                  Automatically save game progress
                </span>
              </Label>
              <Switch
                id="auto-save"
                checked={gameSettings.autoSave}
                onCheckedChange={() =>
                  setGameSettings({
                    ...gameSettings,
                    autoSave: !gameSettings.autoSave,
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode" className="flex flex-col">
                <span>Dark Mode</span>
                <span className="text-sm text-muted-foreground">
                  Use dark theme for the game interface
                </span>
              </Label>
              <Switch
                id="dark-mode"
                checked={gameSettings.darkMode}
                onCheckedChange={() =>
                  setGameSettings({
                    ...gameSettings,
                    darkMode: !gameSettings.darkMode,
                  })
                }
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center">
              <Volume2 className="mr-2 h-5 w-5" />
              Sound Settings
            </h3>

            <div className="flex items-center justify-between">
              <Label htmlFor="sound-enabled" className="flex flex-col">
                <span>Sound Enabled</span>
                <span className="text-sm text-muted-foreground">
                  Enable or disable all game sounds
                </span>
              </Label>
              <Switch
                id="sound-enabled"
                checked={gameSettings.sound.enabled}
                onCheckedChange={() => handleToggleSound("enabled")}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="sound-volume">Volume</Label>
                <span className="text-sm text-muted-foreground">
                  {gameSettings.sound.volume}%
                </span>
              </div>
              <Slider
                id="sound-volume"
                defaultValue={[gameSettings.sound.volume]}
                max={100}
                step={5}
                onValueChange={handleSoundVolumeChange}
                disabled={!gameSettings.sound.enabled}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="sound-effects" className="flex flex-col">
                <span>Sound Effects</span>
                <span className="text-sm text-muted-foreground">
                  Game sound effects during matches and events
                </span>
              </Label>
              <Switch
                id="sound-effects"
                checked={gameSettings.sound.effects}
                onCheckedChange={() => handleToggleSound("effects")}
                disabled={!gameSettings.sound.enabled}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="sound-music" className="flex flex-col">
                <span>Background Music</span>
                <span className="text-sm text-muted-foreground">
                  Play background music during gameplay
                </span>
              </Label>
              <Switch
                id="sound-music"
                checked={gameSettings.sound.music}
                onCheckedChange={() => handleToggleSound("music")}
                disabled={!gameSettings.sound.enabled}
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center">
              <Shield className="mr-2 h-5 w-5" />
              Gameplay Settings
            </h3>

            <div className="flex items-center justify-between">
              <Label htmlFor="auto-rotate" className="flex flex-col">
                <span>Auto-Rotate Squad</span>
                <span className="text-sm text-muted-foreground">
                  Automatically rotate players based on fitness
                </span>
              </Label>
              <Switch
                id="auto-rotate"
                checked={gameSettings.gameplay.autoRotate}
                onCheckedChange={() => handleToggleGameplay("autoRotate")}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="auto-substitute" className="flex flex-col">
                <span>Auto-Substitute</span>
                <span className="text-sm text-muted-foreground">
                  Automatically substitute tired or injured players
                </span>
              </Label>
              <Switch
                id="auto-substitute"
                checked={gameSettings.gameplay.autoSubstitute}
                onCheckedChange={() => handleToggleGameplay("autoSubstitute")}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="realistic-injuries" className="flex flex-col">
                <span>Realistic Injuries</span>
                <span className="text-sm text-muted-foreground">
                  Enable more realistic injury frequency and recovery
                </span>
              </Label>
              <Switch
                id="realistic-injuries"
                checked={gameSettings.gameplay.realisticInjuries}
                onCheckedChange={() =>
                  handleToggleGameplay("realisticInjuries")
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="transfer-negotiations" className="flex flex-col">
                <span>Transfer Negotiations</span>
                <span className="text-sm text-muted-foreground">
                  Enable detailed transfer and contract negotiations
                </span>
              </Label>
              <Switch
                id="transfer-negotiations"
                checked={gameSettings.gameplay.transferNegotiations}
                onCheckedChange={() =>
                  handleToggleGameplay("transferNegotiations")
                }
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSaveSettings}>
              <Save className="mr-2 h-4 w-4" />
              Save Settings
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
