import React from "react";

import { Check, X } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Facility } from "@/types/stadium";

type Props = {
  confirmUpgradeDialogOpen: boolean;
  setConfirmUpgradeDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedFacility: Facility | null;
  confirmUpgrade: () => void;
};

const ConfirmUpgradeDialog = ({
  confirmUpgradeDialogOpen,
  setConfirmUpgradeDialogOpen,
  selectedFacility,
  confirmUpgrade,
}: Props) => {
  return (
    <AlertDialog
      open={confirmUpgradeDialogOpen}
      onOpenChange={setConfirmUpgradeDialogOpen}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Facility Upgrade</AlertDialogTitle>
          <AlertDialogDescription>
            {selectedFacility &&
              selectedFacility.currentLevel < selectedFacility.maxLevel && (
                <>
                  Are you sure you want to upgrade {selectedFacility.name} to
                  level {selectedFacility.currentLevel + 1}?
                </>
              )}
          </AlertDialogDescription>
          <div>
            {selectedFacility &&
              selectedFacility.currentLevel < selectedFacility.maxLevel && (
                <>
                  <div className="mt-4 p-4 bg-muted rounded-md">
                    <div className="flex justify-between mb-2">
                      <span>Upgrade Cost:</span>
                      <span className="font-bold">
                        £
                        {selectedFacility.levels[
                          selectedFacility.currentLevel
                        ].cost.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>New Maintenance Cost:</span>
                      <span>
                        £
                        {selectedFacility.levels[
                          selectedFacility.currentLevel
                        ].maintenanceCost.toLocaleString()}
                        /month
                      </span>
                    </div>
                    {selectedFacility.levels[selectedFacility.currentLevel]
                      .income && (
                      <div className="flex justify-between mt-2">
                        <span>New Income:</span>
                        <span className="text-green-600">
                          £
                          {selectedFacility.levels[
                            selectedFacility.currentLevel
                          ].income?.toLocaleString()}
                          /match
                        </span>
                      </div>
                    )}
                  </div>
                </>
              )}
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            <X className="w-4 h-4" />
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={confirmUpgrade}>
            <Check className="w-4 h-4" />
            Confirm Upgrade
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmUpgradeDialog;
