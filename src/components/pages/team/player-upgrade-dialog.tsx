import React, { useState } from "react";

import {
  AlertTriangle,
  ArrowRight,
  Sparkles,
  WandSparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { Player } from "@/types/player";

type Props = {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPlayer: Player | null;
};

const PlayerUpgradeDialog = ({
  isDialogOpen,
  setIsDialogOpen,
  selectedPlayer,
}: Props) => {
  const [upgradeSuccess, setUpgradeSuccess] = useState<boolean>(false);
  const [showUpgradeResult, setShowUpgradeResult] = useState<boolean>(false);
  const [isUpgrading, setIsUpgrading] = useState<boolean>(false);
  const [upgradePercent, setUpgradePercent] = useState<number>(0);

  const maxUpgradeTime = 5000; // 5 seconds

  const attemptUpgrade = () => {
    if (!selectedPlayer) return;
    setIsUpgrading(true);
    // 60% chance of success for level 1, 40% for level 2, 20% for level 3+
    let successChance = 0.6;
    if (selectedPlayer.level === 2) successChance = 0.4;
    if (selectedPlayer.level && selectedPlayer.level >= 3) successChance = 0.2;
    const success = Math.random() < successChance;
    setUpgradeSuccess(success);
    setShowUpgradeResult(true);

    const interval = setInterval(() => {
      setUpgradePercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, maxUpgradeTime / 100);

    setTimeout(() => {
      clearInterval(interval);
      setIsUpgrading(false);
      if (success && selectedPlayer) {
        toast({
          title: "Upgrade Successful!",
          description: `${selectedPlayer.name} has been upgraded to level ${
            (selectedPlayer.level || 1) + 1
          }!`,
        });
      } else {
        toast({
          title: "Upgrade Failed",
          description: "The upgrade attempt was unsuccessful. Try again later.",
          variant: "destructive",
        });
      }
    }, maxUpgradeTime);
  };

  const onOpenChange = (open: boolean) => {
    if (!open) {
      setShowUpgradeResult(false);
      setUpgradeSuccess(false);
    }
    setIsDialogOpen(open);
  };

  const content = () => {
    if (isUpgrading) {
      return (
        <div className="flex flex-col items-center justify-center">
          <WandSparkles className="h-8 w-8 text-muted-foreground animate-pulse" />
          <p className="mt-2 font-medium">Upgrading...</p>
          <Progress className="mt-4" value={upgradePercent} />
        </div>
      );
    }

    if (showUpgradeResult) {
      return (
        <div
          className={`p-4 rounded-md text-center ${
            upgradeSuccess
              ? "bg-green-50 border border-green-200 text-green-800"
              : "bg-red-50 border border-red-200 text-red-800"
          }`}
        >
          {upgradeSuccess ? (
            <>
              <Sparkles className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <h3 className="font-bold text-lg">Upgrade Successful!</h3>
              <p>
                {selectedPlayer?.name} has been upgraded to level{" "}
                {(selectedPlayer?.level || 1) + 1}!
              </p>
            </>
          ) : (
            <>
              <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-red-600" />
              <h3 className="font-bold text-lg">Upgrade Failed</h3>
              <p>The upgrade attempt was unsuccessful. Try again later.</p>
            </>
          )}
        </div>
      );
    } else {
      return (
        <>
          <div className="p-4 border rounded-md bg-muted/50">
            <h4 className="font-medium mb-2">Upgrade Success Chance</h4>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Progress
                value={
                  selectedPlayer?.level === 1
                    ? 60
                    : selectedPlayer?.level === 2
                      ? 40
                      : 20
                }
                className="h-2 w-40"
              />
              <span className="text-sm font-medium">
                {selectedPlayer?.level === 1
                  ? "60%"
                  : selectedPlayer?.level === 2
                    ? "40%"
                    : "20%"}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Higher level players have a lower chance of successful upgrades
            </p>
          </div>
          <div className="p-4 border rounded-md">
            <h4 className="font-medium mb-2">Upgrade Benefits</h4>
            <ul className="text-sm space-y-1">
              <li>• Increased player attributes</li>
              <li>• Higher potential ceiling</li>
              <li>• Better performance in matches</li>
              <li>• Higher transfer value</li>
            </ul>
          </div>
        </>
      );
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upgrade Player</DialogTitle>
          <DialogDescription>
            {selectedPlayer &&
              `Attempt to upgrade ${selectedPlayer.name} from level ${
                selectedPlayer.level || 1
              } to ${(selectedPlayer.level || 1) + 1}`}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          {selectedPlayer && (
            <div className="flex items-center justify-center gap-4">
              <div className="text-center">
                <div
                  className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center font-bold text-xl ${
                    selectedPlayer.level === 1
                      ? "bg-blue-100 text-blue-800"
                      : selectedPlayer.level === 2
                        ? "bg-purple-100 text-purple-800"
                        : selectedPlayer.level === 3
                          ? "bg-amber-100 text-amber-800"
                          : "bg-red-100 text-red-800"
                  }`}
                >
                  {selectedPlayer.level || 1}
                </div>
                <p className="mt-2 font-medium">Current</p>
              </div>
              <ArrowRight className="h-8 w-8 text-muted-foreground" />
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center font-bold text-xl bg-green-100 text-green-800">
                  {(selectedPlayer.level || 1) + 1}
                </div>
                <p className="mt-2 font-medium">Next</p>
              </div>
            </div>
          )}
          {content()}
        </div>
        <DialogFooter>
          {showUpgradeResult ? (
            <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
          ) : (
            <Button onClick={attemptUpgrade}>Attempt Upgrade</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PlayerUpgradeDialog;
