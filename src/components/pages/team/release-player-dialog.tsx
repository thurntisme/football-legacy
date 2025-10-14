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
import { Player } from "@/types/player";

type Props = {
  isDialogOpen: boolean;
  selectedPlayer: Player | null;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  confirmReleasePlayer: (player: Player) => void;
};

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
          <DialogDescription>Place player on the market</DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          {selectedPlayer && (
            <div className="flex items-center justify-center gap-4">
              content
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
            description={`Are you sure want to sell player ${selectedPlayer?.name}?`}
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
