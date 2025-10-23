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
import { YouthPlayer } from "@/types/football/player";

type Props = {
  confirmPromoteDialogOpen: boolean;
  setConfirmPromoteDialogOpen: (open: boolean) => void;
  playerToAction: YouthPlayer | null;
  confirmPromoteToFirstTeam: () => void;
};

const ConfirmPromoteDialog = ({
  confirmPromoteDialogOpen,
  setConfirmPromoteDialogOpen,
  playerToAction,
  confirmPromoteToFirstTeam,
}: Props) => {
  return (
    <AlertDialog
      open={confirmPromoteDialogOpen}
      onOpenChange={setConfirmPromoteDialogOpen}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Promote to First Team</AlertDialogTitle>
          <AlertDialogDescription>
            {playerToAction &&
              `Are you sure you want to promote ${playerToAction?.name || "Player"} to your first team?`}
            {playerToAction && playerToAction.promotionReadiness < 70 && (
              <div className="mt-2 p-2 bg-amber-50 border border-amber-200 text-amber-800 rounded-md">
                <p className="text-sm font-medium">
                  Warning: This player may not be ready for senior football.
                </p>
                <p className="text-xs mt-1">
                  Promotion readiness: {playerToAction.promotionReadiness}%
                </p>
              </div>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={confirmPromoteToFirstTeam}>
            Confirm Promotion
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmPromoteDialog;
