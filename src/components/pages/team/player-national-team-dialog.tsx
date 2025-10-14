import React from "react";

import { Flag } from "lucide-react";

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
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPlayer: Player | null;
};

const PlayerNationalTeamDialog = ({
  isDialogOpen,
  setIsDialogOpen,
  selectedPlayer,
}: Props) => {
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>National Team Details</DialogTitle>
          <DialogDescription>
            {selectedPlayer?.nationalTeam
              ? `${selectedPlayer.name}'s international duty information`
              : "Player has not been called up for international duty"}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          {selectedPlayer?.nationalTeam ? (
            <>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                  <Flag className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">
                    {selectedPlayer.nationalTeam.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedPlayer.position} • #{selectedPlayer.shirtNumber}
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-muted rounded-md">
                  <span>Next Match</span>
                  <span className="font-medium">
                    {selectedPlayer.nationalTeam.nextMatch}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 text-green-800 rounded-md">
                  <span>Payment Received</span>
                  <span className="font-bold">
                    £
                    {selectedPlayer.nationalTeam.paymentReceived?.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="p-4 border rounded-md">
                <h4 className="font-medium mb-2">
                  Benefits of International Duty
                </h4>
                <ul className="text-sm space-y-1">
                  <li>• Financial compensation for the club</li>
                  <li>• Increased player exposure and market value</li>
                  <li>• Experience against top international players</li>
                  <li>• Potential attribute improvements</li>
                </ul>
              </div>
            </>
          ) : (
            <div className="text-center py-6">
              <Flag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">
                No International Call-up
              </h3>
              <p className="text-muted-foreground mb-4">
                This player has not been called up for international duty by
                their national team.
              </p>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PlayerNationalTeamDialog;
