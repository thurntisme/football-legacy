import React from "react";

import { Check, X } from "lucide-react";

import {
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Facility } from "@/types/stadium";

type Props = {
  confirmDowngradeDialogOpen: boolean;
  setConfirmDowngradeDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedFacility: Facility | null;
  confirmDowngrade: () => void;
};

const ConfirmDowngradeDialog = ({
  confirmDowngradeDialogOpen,
  setConfirmDowngradeDialogOpen,
  selectedFacility,
  confirmDowngrade,
}: Props) => {
  return (
    <AlertDialog
      open={confirmDowngradeDialogOpen}
      onOpenChange={setConfirmDowngradeDialogOpen}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Facility Downgrade</AlertDialogTitle>
          <AlertDialogDescription>
            {selectedFacility && selectedFacility.currentLevel > 1 && (
              <>
                Are you sure you want to downgrade {selectedFacility.name} to
                level {selectedFacility.currentLevel - 1}?
              </>
            )}
          </AlertDialogDescription>
          <div>
            {selectedFacility && selectedFacility.currentLevel > 1 && (
              <>
                <div className="mt-4 p-4 bg-muted rounded-md">
                  <div className="flex justify-between">
                    <span>New Maintenance Cost:</span>
                    <span>
                      £
                      {selectedFacility.levels[
                        selectedFacility.currentLevel - 2
                      ].maintenanceCost.toLocaleString()}
                      /month
                    </span>
                  </div>
                  {selectedFacility.levels[selectedFacility.currentLevel - 2]
                    .income && (
                    <div className="flex justify-between mt-2">
                      <span>New Income:</span>
                      <span className="text-amber-600">
                        £
                        {selectedFacility.levels[
                          selectedFacility.currentLevel - 2
                        ].income?.toLocaleString()}
                        /match
                      </span>
                    </div>
                  )}
                  <div className="mt-4 text-amber-600">
                    <p className="text-sm">
                      Note: You will not receive a refund for downgrading
                      facilities.
                    </p>
                  </div>
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
          <AlertDialogAction onClick={confirmDowngrade}>
            <Check className="w-4 h-4" />
            Confirm Downgrade
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDowngradeDialog;
