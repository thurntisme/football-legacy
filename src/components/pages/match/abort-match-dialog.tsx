import React from "react";

import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  abortDialogOpen: boolean;
  setAbortDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  abortMatch: () => void;
};

const AbortMatchDialog = ({
  abortDialogOpen,
  setAbortDialogOpen,
  abortMatch,
}: Props) => {
  return (
    <Dialog open={abortDialogOpen} onOpenChange={setAbortDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Match Abort</DialogTitle>
          <DialogDescription>
            Are you sure you want to abort this match? This will result in a
            financial penalty.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="flex items-center p-3 bg-amber-50 border border-amber-200 rounded-md text-amber-800">
            <AlertTriangle className="h-5 w-5 mr-2 text-amber-600" />
            <p className="text-sm">
              Aborting this match will cost you $5,000 from your club finances.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setAbortDialogOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={abortMatch}>
            Abort Match and Pay Penalty
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AbortMatchDialog;
