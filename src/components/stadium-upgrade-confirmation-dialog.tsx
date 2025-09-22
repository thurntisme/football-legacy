import React from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { IStadiumFacility } from '@/types/football/common';

type Props = {
  confirmUpgradeDialogOpen: boolean;
  setConfirmUpgradeDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedFacility: IStadiumFacility | null;
  confirmUpgrade: () => void;
};

const StadiumUpgradeConfirmationDialog = ({
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
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={confirmUpgrade}>
            Confirm Upgrade
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default StadiumUpgradeConfirmationDialog;
