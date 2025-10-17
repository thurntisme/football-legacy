import React from "react";

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { focusOptions } from "@/constants/training";
import { IPlayerTraining } from "@/types/training";

type Props = {
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPlayer: IPlayerTraining | null;
  setSelectedPlayer: React.Dispatch<
    React.SetStateAction<IPlayerTraining | null>
  >;
  updatePlayerFocus: () => void;
};

const EditTrainingDialog = ({
  dialogOpen,
  setDialogOpen,
  selectedPlayer,
  setSelectedPlayer,
  updatePlayerFocus,
}: Props) => {
  return (
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
                  <div key={option.id} className="flex items-center space-x-2">
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
            <X className="h-4 w-4" />
            Cancel
          </Button>
          <Button onClick={updatePlayerFocus}>
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditTrainingDialog;
