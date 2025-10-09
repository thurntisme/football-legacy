import React from "react";

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
  confirmDialogOpen: boolean;
  setConfirmDialogOpen: (open: boolean) => void;
  dialogAction: "remove" | "edit";
  selectedPlayer: { name: string } | null;
  confirmRemoveFromList: () => void;
};

const LoanConfirmationDialog = ({
  confirmDialogOpen,
  setConfirmDialogOpen,
  dialogAction,
  selectedPlayer,
  confirmRemoveFromList,
}: Props) => {
  return (
    <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {dialogAction === "remove"
              ? "Remove from Listings"
              : "Edit Listing"}
          </DialogTitle>
          <DialogDescription>
            {dialogAction === "remove" && selectedPlayer
              ? `Are you sure you want to remove ${selectedPlayer.name} from your listings?`
              : "Edit the listing details for this player."}
          </DialogDescription>
        </DialogHeader>

        {dialogAction === "remove" ? (
          <div className="py-4">
            <p>
              This will make the player unavailable on the transfer market, but
              you can add them back at any time.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 py-4">{/* Edit form would go here */}</div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => setConfirmDialogOpen(false)}>
            Cancel
          </Button>
          {dialogAction === "remove" ? (
            <Button variant="destructive" onClick={confirmRemoveFromList}>
              Remove from Listings
            </Button>
          ) : (
            <Button>Save Changes</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LoanConfirmationDialog;
