import React from 'react';

import { AlertTriangle, ArrowRight, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Player } from '@/types/football/player';

type Props = {
  upgradeDialogOpen: boolean;
  setUpgradeDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPlayerForUpgrade: Player | null;
  showUpgradeResult: boolean;
  upgradeSuccess: boolean | null;
  attemptUpgrade: () => void;
};

const PlayerUpgradeDialog = ({
  upgradeDialogOpen,
  setUpgradeDialogOpen,
  selectedPlayerForUpgrade,
  showUpgradeResult,
  upgradeSuccess,
  attemptUpgrade,
}: Props) => {
  return (
    <Dialog open={upgradeDialogOpen} onOpenChange={setUpgradeDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upgrade Player</DialogTitle>
          <DialogDescription>
            {selectedPlayerForUpgrade &&
              `Attempt to upgrade ${selectedPlayerForUpgrade.name} from level ${
                selectedPlayerForUpgrade.attributes.level || 1
              } to ${(selectedPlayerForUpgrade.attributes.level || 1) + 1}`}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          {selectedPlayerForUpgrade && (
            <div className="flex items-center justify-center gap-4">
              <div className="text-center">
                <div
                  className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center font-bold text-xl ${
                    selectedPlayerForUpgrade.attributes.level === 1
                      ? 'bg-blue-100 text-blue-800'
                      : selectedPlayerForUpgrade.attributes.level === 2
                        ? 'bg-purple-100 text-purple-800'
                        : selectedPlayerForUpgrade.attributes.level === 3
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-800'
                  }`}
                >
                  {selectedPlayerForUpgrade.attributes.level || 1}
                </div>
                <p className="mt-2 font-medium">Current</p>
              </div>
              <ArrowRight className="h-8 w-8 text-muted-foreground" />
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center font-bold text-xl bg-green-100 text-green-800">
                  {(selectedPlayerForUpgrade.attributes.level || 1) + 1}
                </div>
                <p className="mt-2 font-medium">Next</p>
              </div>
            </div>
          )}
          {showUpgradeResult ? (
            <div
              className={`p-4 rounded-md text-center ${
                upgradeSuccess
                  ? 'bg-green-50 border border-green-200 text-green-800'
                  : 'bg-red-50 border border-red-200 text-red-800'
              }`}
            >
              {upgradeSuccess ? (
                <>
                  <Sparkles className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <h3 className="font-bold text-lg">Upgrade Successful!</h3>
                  <p>
                    {selectedPlayerForUpgrade?.name} has been upgraded to level{' '}
                    {(selectedPlayerForUpgrade?.attributes.level || 1) + 1}!
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
          ) : (
            <>
              <div className="p-4 border rounded-md bg-muted/50">
                <h4 className="font-medium mb-2">Upgrade Success Chance</h4>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Progress
                    value={
                      selectedPlayerForUpgrade?.attributes.level === 1
                        ? 60
                        : selectedPlayerForUpgrade?.attributes.level === 2
                          ? 40
                          : 20
                    }
                    className="h-2 w-40"
                  />
                  <span className="text-sm font-medium">
                    {selectedPlayerForUpgrade?.attributes.level === 1
                      ? '60%'
                      : selectedPlayerForUpgrade?.attributes.level === 2
                        ? '40%'
                        : '20%'}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Higher level players have a lower chance of successful
                  upgrades
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
          )}
        </div>
        <DialogFooter>
          {showUpgradeResult ? (
            <Button onClick={() => setUpgradeDialogOpen(false)}>Close</Button>
          ) : (
            <Button onClick={attemptUpgrade}>Attempt Upgrade</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PlayerUpgradeDialog;
