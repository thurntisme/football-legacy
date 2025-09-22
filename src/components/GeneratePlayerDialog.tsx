"use client";

import { Loader2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PlayerItem } from "@/constants/player-items";

interface GeneratePlayerDialogProps {
  selectedPlayerItem: PlayerItem | null;
  isGeneratingPlayer: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function GeneratePlayerDialog({
  selectedPlayerItem,
  isGeneratingPlayer,
  onClose,
  onConfirm,
}: GeneratePlayerDialogProps) {
  return (
    <Dialog
      open={!!selectedPlayerItem}
      onOpenChange={(open) => !open && onClose()}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate New Player</DialogTitle>
          <DialogDescription>
            {selectedPlayerItem?.description}
          </DialogDescription>
        </DialogHeader>

        {selectedPlayerItem && (
          <div className="py-4 space-y-4">
            <div className="flex items-center justify-center">
              <div className="p-4 rounded-full bg-muted">
                <selectedPlayerItem.icon
                  className={selectedPlayerItem.iconClassName}
                />
              </div>
            </div>

            <div className="text-center">
              <h3 className="font-bold text-lg">{selectedPlayerItem.name}</h3>
              <Badge
                className={
                  selectedPlayerItem.rarity === "common"
                    ? "bg-blue-100 text-blue-800"
                    : selectedPlayerItem.rarity === "rare"
                    ? "bg-purple-100 text-purple-800"
                    : selectedPlayerItem.rarity === "epic"
                    ? "bg-amber-100 text-amber-800"
                    : "bg-red-100 text-red-800"
                }
              >
                {selectedPlayerItem.rarity.charAt(0).toUpperCase() +
                  selectedPlayerItem.rarity.slice(1)}
              </Badge>
            </div>

            <div className="p-4 border rounded-md">
              <h4 className="font-medium mb-2">Player Type Details</h4>
              <p className="text-sm mb-2">
                {selectedPlayerItem.boostDescription}
              </p>

              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Initial Rating</span>
                  <span
                    className={
                      selectedPlayerItem.type === "legend"
                        ? "text-green-600 font-medium"
                        : selectedPlayerItem.type === "rising"
                        ? "text-blue-600 font-medium"
                        : selectedPlayerItem.type === "young"
                        ? "text-amber-600 font-medium"
                        : "text-gray-600 font-medium"
                    }
                  >
                    {selectedPlayerItem.type === "legend"
                      ? "Very High"
                      : selectedPlayerItem.type === "rising"
                      ? "Above Average"
                      : selectedPlayerItem.type === "young"
                      ? "Lower"
                      : "Average"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Growth Potential</span>
                  <span
                    className={
                      selectedPlayerItem.type === "legend"
                        ? "text-red-600 font-medium"
                        : selectedPlayerItem.type === "rising"
                        ? "text-green-600 font-medium"
                        : selectedPlayerItem.type === "young"
                        ? "text-green-600 font-medium"
                        : "text-gray-600 font-medium"
                    }
                  >
                    {selectedPlayerItem.type === "legend"
                      ? "Limited"
                      : selectedPlayerItem.type === "rising"
                      ? "High"
                      : selectedPlayerItem.type === "young"
                      ? "Very High"
                      : "Average"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Age Range</span>
                  <span className="font-medium">
                    {selectedPlayerItem.type === "legend"
                      ? "30-34"
                      : selectedPlayerItem.type === "rising"
                      ? "21-24"
                      : selectedPlayerItem.type === "young"
                      ? "17-20"
                      : "24-31"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        <DialogFooter>
          {isGeneratingPlayer ? (
            <Button disabled className="w-full">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Player...
            </Button>
          ) : (
            <>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={onConfirm}>Generate Player</Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
