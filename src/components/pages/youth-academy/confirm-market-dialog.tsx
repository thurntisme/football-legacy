import React from "react";

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
import { YouthPlayer } from "@/types/player";

type Props = {
  confirmMarketDialogOpen: boolean;
  setConfirmMarketDialogOpen: (open: boolean) => void;
  playerToAction: YouthPlayer | null;
  confirmPlaceOnMarket: () => void;
};

const ConfirmMarketDialog = ({
  confirmMarketDialogOpen,
  setConfirmMarketDialogOpen,
  playerToAction,
  confirmPlaceOnMarket,
}: Props) => {
  return (
    <AlertDialog
      open={confirmMarketDialogOpen}
      onOpenChange={setConfirmMarketDialogOpen}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Place on Transfer Market</AlertDialogTitle>
          <AlertDialogDescription>
            {playerToAction &&
              `Are you sure you want to place ${playerToAction?.name || "Player"} on the transfer market?`}
            {playerToAction && (
              <div className="mt-2 p-2 bg-green-50 border border-green-200 text-green-800 rounded-md">
                <p className="text-sm font-medium">Estimated Market Value:</p>
                <p className="text-lg font-bold">
                  £
                  {((playerToAction?.potential || 75) * 50000).toLocaleString()}
                </p>
              </div>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={confirmPlaceOnMarket}>
            Confirm Listing
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmMarketDialog;
