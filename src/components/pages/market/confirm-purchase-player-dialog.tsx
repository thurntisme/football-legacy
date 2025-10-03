import React from "react";

import { Check, ShoppingCart, X } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/finance";
import { Player } from "@/types/player";

type Props = {
  isPossibleToPurchase: boolean;
  player: Player;
  userBudget: number;
  purchasePlayer: (player: Player) => void;
  children?: React.ReactNode;
};

const ConfirmPurchasePlayerDialog = ({
  isPossibleToPurchase,
  player,
  userBudget,
  purchasePlayer,
  children,
}: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Purchase</AlertDialogTitle>
          <AlertDialogDescription>
            {isPossibleToPurchase ? (
              <>
                Are you sure you want to sign <b>{player.name}</b>?
                <div className="mt-2 p-3 bg-muted rounded-md">
                  <div className="flex justify-between mb-1">
                    <span>Your Budget:</span>
                    <span className="font-medium">
                      {formatCurrency(userBudget)}
                    </span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span>Player Market Value:</span>
                    <span className="font-medium">
                      {formatCurrency(player.marketValue)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t mt-2">
                    <span className="font-bold">Remaining Budget:</span>
                    <span className="font-bold">
                      {formatCurrency(userBudget - player.marketValue)}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <>
                You don't have enough budget to sign <b>{player.name}</b>.
              </>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            <X className="h-4 w-4" />
            {isPossibleToPurchase ? "Cancel" : "Close"}
          </AlertDialogCancel>
          {isPossibleToPurchase && (
            <AlertDialogAction onClick={() => purchasePlayer(player)}>
              <Check className="h-4 w-4" />
              Confirm Purchase
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmPurchasePlayerDialog;
