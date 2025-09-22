import { DialogFooter, DialogHeader } from "@/components/ui/dialog";

import React from "react";

import { DollarSign, Shirt } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Player } from "@/types/football/player";

type Props = {
  contractEditDialogOpen: boolean;
  setContractEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPlayerForContract: Player | null;
  editedShirtNumber: number;
  setEditedShirtNumber: React.Dispatch<React.SetStateAction<number>>;
  editedSalary: number;
  setEditedSalary: React.Dispatch<React.SetStateAction<number>>;
  saveContractChanges: () => void;
};

const PlayerContractEditDialog = ({
  contractEditDialogOpen,
  setContractEditDialogOpen,
  selectedPlayerForContract,
  editedShirtNumber,
  setEditedShirtNumber,
  editedSalary,
  setEditedSalary,
  saveContractChanges,
}: Props) => {
  return (
    <Dialog
      open={contractEditDialogOpen}
      onOpenChange={setContractEditDialogOpen}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Contract Details</DialogTitle>
          <DialogDescription>
            {selectedPlayerForContract &&
              `Update ${selectedPlayerForContract.name}'s contract details`}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          {selectedPlayerForContract && (
            <>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="shirtNumber" className="text-right">
                  <Shirt className="h-4 w-4 inline mr-2" />
                  Shirt Number
                </Label>
                <div className="col-span-2">
                  <Input
                    id="shirtNumber"
                    type="number"
                    min="1"
                    max="99"
                    value={editedShirtNumber}
                    onChange={(e) =>
                      setEditedShirtNumber(Number.parseInt(e.target.value) || 0)
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="salary" className="text-right">
                  <DollarSign className="h-4 w-4 inline mr-2" />
                  Salary (£/week)
                </Label>
                <div className="col-span-2">
                  <Input
                    id="salary"
                    type="number"
                    min="1000"
                    step="1000"
                    value={editedSalary}
                    onChange={(e) =>
                      setEditedSalary(Number.parseInt(e.target.value) || 0)
                    }
                  />
                </div>
              </div>
              <div className="p-4 border rounded-md bg-muted/50">
                <h4 className="font-medium mb-2">Contract Information</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Current Shirt Number:</div>
                  <div className="font-medium">
                    {selectedPlayerForContract.shirtNumber}
                  </div>
                  <div>Current Salary:</div>
                  <div className="font-medium">
                    £{selectedPlayerForContract.salary.toLocaleString()}/week
                  </div>
                  <div>Contract Length:</div>
                  <div className="font-medium">
                    {selectedPlayerForContract.contractYears} years
                  </div>
                  <div>Market Value:</div>
                  <div className="font-medium">
                    {selectedPlayerForContract.marketValue >= 1000000
                      ? `£${(selectedPlayerForContract.marketValue / 1000000).toFixed(1)}M`
                      : `£${selectedPlayerForContract.marketValue.toLocaleString()}`}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setContractEditDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button onClick={saveContractChanges}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PlayerContractEditDialog;
