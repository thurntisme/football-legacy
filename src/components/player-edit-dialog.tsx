import { DialogFooter, DialogHeader } from "@/components/ui/dialog";

import React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Player } from "@/types/player";

type Props = {
  editingPlayer: Player | null;
  handleCancelEdit: () => void;
  handleSaveAttributes: () => void;
  handleAttributeChange: (attribute: string, value: number) => void;
  editedAttributes: Record<string, number>;
};

const PlayerEditDialog = ({
  editingPlayer,
  handleCancelEdit,
  handleAttributeChange,
  handleSaveAttributes,
  editedAttributes,
}: Props) => {
  return (
    <Dialog
      open={!!editingPlayer}
      onOpenChange={(open) => !open && handleCancelEdit()}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Player Attributes</DialogTitle>
          <DialogDescription>
            {editingPlayer && `Adjust attributes for ${editingPlayer.name}`}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {editingPlayer &&
            Object.entries(editedAttributes).map(([attribute, value]) => (
              <div
                key={attribute}
                className="grid grid-cols-4 items-center gap-4"
              >
                <Label htmlFor={attribute} className="text-right capitalize">
                  {attribute}
                </Label>
                <div className="col-span-3 flex items-center gap-2">
                  <Input
                    id={attribute}
                    type="number"
                    min="1"
                    max="99"
                    value={value}
                    onChange={(e) =>
                      handleAttributeChange(
                        attribute,
                        Number.parseInt(e.target.value) || 0,
                      )
                    }
                    className="w-20"
                  />
                  <Slider
                    value={[value]}
                    min={1}
                    max={99}
                    step={1}
                    onValueChange={(values) =>
                      handleAttributeChange(attribute, values[0])
                    }
                    className="flex-1"
                  />
                  <span className="w-8 text-center font-medium">{value}</span>
                </div>
              </div>
            ))}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancelEdit}>
            Cancel
          </Button>
          <Button onClick={handleSaveAttributes}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PlayerEditDialog;
