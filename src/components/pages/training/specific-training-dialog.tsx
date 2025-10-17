import React, { useState } from "react";

import { Save, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { trainingDrills } from "@/constants/training";
import { IPlayerTraining } from "@/types/training";

type Props = {
  selectedPlayer: IPlayerTraining | null;
  saveSpecificTraining: () => void;
  specificTrainingOpen: boolean;
  setSpecificTrainingOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SpecificTrainingDialog = ({
  selectedPlayer,
  saveSpecificTraining,
  specificTrainingOpen,
  setSpecificTrainingOpen,
}: Props) => {
  const [selectedDrill, setSelectedDrill] = useState<string>("");
  const [drillIntensity, setDrillIntensity] = useState(70);
  const [drillDuration, setDrillDuration] = useState(45);

  return (
    <Dialog open={specificTrainingOpen} onOpenChange={setSpecificTrainingOpen}>
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
              <Select value={selectedDrill} onValueChange={setSelectedDrill}>
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
            <X className="h-4 w-4" />
            Cancel
          </Button>
          <Button onClick={saveSpecificTraining}>
            <Save className="h-4 w-4" />
            Assign Training
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SpecificTrainingDialog;
