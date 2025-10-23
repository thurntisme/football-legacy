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
  confirmLoanDialogOpen: boolean;
  setConfirmLoanDialogOpen: (open: boolean) => void;
  playerToAction: YouthPlayer | null;
  confirmLoanOut: () => void;
};

const ConfirmLoanDialog = ({
  confirmLoanDialogOpen,
  setConfirmLoanDialogOpen,
  playerToAction,
  confirmLoanOut,
}: Props) => {
  return (
    <AlertDialog
      open={confirmLoanDialogOpen}
      onOpenChange={setConfirmLoanDialogOpen}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Loan Player Out</AlertDialogTitle>
          <AlertDialogDescription>
            {playerToAction &&
              `Are you sure you want to loan out ${playerToAction?.name || "Player"} for development?`}
            <div className="mt-2 p-2 bg-blue-50 border border-blue-200 text-blue-800 rounded-md">
              <p className="text-sm font-medium">Loan Benefits:</p>
              <ul className="text-xs mt-1 list-disc pl-4">
                <li>Regular playing time</li>
                <li>Match experience</li>
                <li>Accelerated development</li>
              </ul>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={confirmLoanOut}>
            Confirm Loan
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmLoanDialog;
