import React, { useEffect, useState } from "react";

import { Check, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatCurrency } from "@/lib/finance";
import { Player, PlayerContract } from "@/types/player";

type Props = {
  contractEditDialogOpen: boolean;
  setContractEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPlayer: Player | null;
  saveContractChanges: (newContract: PlayerContract) => void;
};
const USER_BUDGET = 1000000;

const PlayerContractEditDialog = ({
  contractEditDialogOpen,
  setContractEditDialogOpen,
  selectedPlayer,
  saveContractChanges,
}: Props) => {
  const [editedSalary, setEditedSalary] = useState<number>(0);

  useEffect(() => {
    if (selectedPlayer) {
      setEditedSalary(selectedPlayer.salary);
    }
  }, [selectedPlayer]);

  const onSave = () => {
    if (!selectedPlayer) return;
    const newContract = {
      player: selectedPlayer,
      newSalary: editedSalary,
    };
    saveContractChanges(newContract);
  };

  return (
    <Dialog
      open={contractEditDialogOpen}
      onOpenChange={setContractEditDialogOpen}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Contract Details</DialogTitle>
          <DialogDescription>
            {selectedPlayer && (
              <>
                Update{" "}
                <span className="font-semibold">{selectedPlayer.name}</span>
                's contract details
              </>
            )}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {selectedPlayer && (
            <>
              <div className="p-4 border rounded-md bg-muted/50">
                <h4 className="font-medium mb-3">Contract Information</h4>
                <div className="grid grid-cols-2 gap-1 text-sm">
                  <div>Player Salary:</div>
                  <div className="font-medium">
                    {formatCurrency(selectedPlayer.salary)}
                  </div>
                  <div>Contract Length:</div>
                  <div className="font-medium">
                    {selectedPlayer.contractLength} matches
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-1 text-sm mt-2">
                  <div>Remaining Matches:</div>
                  <div className="font-medium">
                    {selectedPlayer.remainingMatches} matches
                  </div>
                  <div>New Match Length:</div>
                  <div className="font-medium">
                    {selectedPlayer.remainingMatches +
                      selectedPlayer.contractLength}{" "}
                    matches
                  </div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                <div className="flex justify-between mb-1">
                  <span>Your Balance:</span>
                  <span className="font-medium">
                    {formatCurrency(USER_BUDGET)}
                  </span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>Player Salary:</span>
                  <span className="font-medium">
                    {formatCurrency(selectedPlayer.salary)}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t mt-2">
                  <span className="font-bold">Net Balance:</span>
                  <span className="font-bold">
                    {formatCurrency(USER_BUDGET - selectedPlayer.salary)}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setContractEditDialogOpen(false)}
          >
            <X className="h-4 w-4" />
            Cancel
          </Button>
          <Button onClick={onSave} size="sm">
            <Check className="h-4 w-4" />
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PlayerContractEditDialog;
