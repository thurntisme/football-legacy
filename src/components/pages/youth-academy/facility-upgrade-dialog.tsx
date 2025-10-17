import React, { useState } from "react";

import { AlertTriangle, Check, CheckCircle, Loader2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Facility } from "@/types/youth-academy";

type Props = {
  selectedFacility: Facility | null;
  upgradeDialogOpen: boolean;
  setUpgradeDialogOpen: (open: boolean) => void;
};

const FacilityUpgradeDialog = ({
  selectedFacility,
  upgradeDialogOpen,
  setUpgradeDialogOpen,
}: Props) => {
  const [upgradeComplete, setUpgradeComplete] = useState(false);
  const [isUpgrading, setIsUpgrading] = useState(false);

  const confirmUpgrade = () => {
    if (!selectedFacility) return;

    setIsUpgrading(true);

    setTimeout(() => {
      setIsUpgrading(false);
      setUpgradeComplete(true);

      toast({
        title: "Upgrade Started",
        description: `Upgrade of ${selectedFacility.name} has begun and will be completed in ${selectedFacility.upgradeTime} days.`,
      });
    }, 2000);
  };

  return (
    <Dialog open={upgradeDialogOpen} onOpenChange={setUpgradeDialogOpen}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upgrade Facility</DialogTitle>
          <DialogDescription>
            {selectedFacility &&
              `Upgrade ${selectedFacility.name} from Level ${selectedFacility.level} to Level ${selectedFacility.level + 1}`}
          </DialogDescription>
        </DialogHeader>

        {selectedFacility && (
          <div className="py-4">
            {upgradeComplete ? (
              <div className="p-4 bg-green-50 border border-green-200 rounded-md text-center">
                <CheckCircle className="h-8 w-8 mx-auto text-green-600 mb-2" />
                <h3 className="font-bold text-lg text-green-800">
                  Upgrade Started
                </h3>
                <p className="text-green-700">
                  The upgrade of {selectedFacility.name} has begun and will be
                  completed in {selectedFacility.upgradeTime} days.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 border rounded-md">
                  <h4 className="font-medium mb-2">Upgrade Details</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Current Level:
                      </span>
                      <span className="font-medium">
                        {selectedFacility.level}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        New Level:
                      </span>
                      <span className="font-medium">
                        {selectedFacility.level + 1}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Upgrade Cost:
                      </span>
                      <span className="font-medium">
                        £{selectedFacility.upgradeCost.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Upgrade Time:
                      </span>
                      <span className="font-medium">
                        {selectedFacility.upgradeTime} days
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-md">
                  <h4 className="font-medium mb-2">
                    New Benefits at Level {selectedFacility.level + 1}
                  </h4>
                  <ul className="text-sm space-y-1">
                    {selectedFacility.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>
                          {benefit}{" "}
                          {index === 0
                            ? "(+20%)"
                            : index === 1
                              ? "(+15%)"
                              : "(+10%)"}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-amber-50 border border-amber-200 rounded-md">
                  <div className="flex items-start">
                    <div>
                      <h4 className="font-medium text-amber-800 mb-1 flex items-start">
                        <AlertTriangle className="h-4 w-4 text-amber-600 mr-2 mt-0.5" />
                        Upgrade Information
                      </h4>
                      <p className="text-sm text-amber-700">
                        This upgrade will cost £
                        {selectedFacility.upgradeCost.toLocaleString()} from
                        your facilities budget. The upgrade will take{" "}
                        {selectedFacility.upgradeTime} days to complete. During
                        this time, the facility will continue to function at its
                        current level.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <DialogFooter>
          {upgradeComplete ? (
            <Button onClick={() => setUpgradeDialogOpen(false)}>Close</Button>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={() => setUpgradeDialogOpen(false)}
              >
                <X className="h-4 w-4" />
                Cancel
              </Button>
              {isUpgrading ? (
                <Button disabled>
                  <Loader2 className=" h-4 w-4 animate-spin" />
                  Processing...
                </Button>
              ) : (
                <Button onClick={confirmUpgrade}>
                  <Check className="h-4 w-4" />
                  Confirm Upgrade
                </Button>
              )}
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FacilityUpgradeDialog;
