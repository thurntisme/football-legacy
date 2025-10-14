import React from "react";

import { Check, X } from "lucide-react";

import ConfirmDialog from "@/components/common/confirm-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatCurrency } from "@/lib/finance";
import { Player } from "@/types/player";

type Props = {
  isDialogOpen: boolean;
  selectedPlayer: Player | null;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  confirmReleasePlayer: (player: Player) => void;
};

const USER_BUDGET = 1000000;
const PERCENT_TO_RELEASE = 0.25;

const ReleasePlayerDialog = ({
  isDialogOpen,
  selectedPlayer,
  setIsDialogOpen,
  confirmReleasePlayer,
}: Props) => {
  const onConfirmRelease = (player: Player | null) => {
    if (!player) return;

    confirmReleasePlayer(player);
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Release Player</DialogTitle>
          <DialogDescription>
            Release {selectedPlayer?.name || "player"} from your team
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <p className="text-sm text-muted-foreground">
            Releasing this player will refund 25% of his current market value.
          </p>
          {selectedPlayer && (
            <div className="text-sm text-muted-foreground">
              <div className="p-3 bg-muted rounded-md">
                <div className="flex justify-between mb-2">
                  <span>Market Value:</span>
                  <span className="text-gray-400">
                    {formatCurrency(selectedPlayer.marketValue)}
                  </span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>Your Refund:</span>
                  <span className="font-medium">
                    {formatCurrency(
                      selectedPlayer.marketValue * PERCENT_TO_RELEASE,
                    )}
                  </span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>Your Balance:</span>
                  <span className="font-medium">
                    {formatCurrency(USER_BUDGET)}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t mt-2">
                  <span className="font-bold">Total:</span>
                  <span className="font-bold">
                    {formatCurrency(
                      selectedPlayer.marketValue * PERCENT_TO_RELEASE +
                        USER_BUDGET,
                    )}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={() => setIsDialogOpen(false)} variant="outline">
            <X className="h-4 w-4" />
            Cancel
          </Button>
          <ConfirmDialog
            title="Release Player"
            description={`Do you really want to release ${selectedPlayer?.name}?`}
            onConfirm={() => onConfirmRelease(selectedPlayer)}
          >
            <Button>
              <Check className="h-4 w-4" />
              Release Player
            </Button>
          </ConfirmDialog>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReleasePlayerDialog;
