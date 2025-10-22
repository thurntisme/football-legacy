"use client";

import { useEffect, useState } from "react";

import { CheckCheck, X } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FOOTBALL_STATS_URL } from "@/constants/site";

interface AdModalProps {
  isVisible: boolean;
  showDelay?: number; // in milliseconds
}

export function AdModal({ isVisible, showDelay = 60000 }: AdModalProps) {
  const [isOpen, setIsOpen] = useState(isVisible);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, showDelay);

    return () => clearTimeout(timer);
  }, [showDelay]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const onUpgrade = () => {
    router.push(`${FOOTBALL_STATS_URL}/user/payment`);
    handleClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upgrade to Pro and Unlock Premium Features</DialogTitle>
          <DialogDescription>
            Take your football management experience to the next level with our
            Pro subscription.
          </DialogDescription>
        </DialogHeader>
        <div className="aspect-video bg-muted rounded-md flex items-center justify-center my-4">
          <span className="text-sm text-muted-foreground">
            Advertisement Content
          </span>
        </div>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col items-center p-2 border rounded-md">
              <div className="font-medium text-sm">Advanced Scouting</div>
              <div className="text-xs text-muted-foreground">
                Find hidden gems
              </div>
            </div>
            <div className="flex flex-col items-center p-2 border rounded-md">
              <div className="font-medium text-sm">Detailed Analytics</div>
              <div className="text-xs text-muted-foreground">
                Make data-driven decisions
              </div>
            </div>
            <div className="flex flex-col items-center p-2 border rounded-md">
              <div className="font-medium text-sm">Ad-Free Experience</div>
              <div className="text-xs text-muted-foreground">
                No interruptions
              </div>
            </div>
            <div className="flex flex-col items-center p-2 border rounded-md">
              <div className="font-medium text-sm">Premium Support</div>
              <div className="text-xs text-muted-foreground">
                Priority assistance
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0 mt-4">
          <Button
            variant="outline"
            onClick={handleClose}
            className="sm:w-auto w-full"
          >
            <X className="w-4 h-4" />
            Maybe Later
          </Button>
          <Button className="sm:w-auto w-full" onClick={onUpgrade}>
            <CheckCheck className="w-4 h-4" />
            Upgrade Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
