import React from "react";

import { ShoppingCart } from "lucide-react";

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
import { formatNumber } from "@/lib/finance";
import { getItemActualPrice, getItemPrice } from "@/lib/item";
import { ShopItem } from "@/types/item";

type Props = {
  item: ShopItem;
  coins: number;
  handleBuyItem: (item: ShopItem) => void;
};

const ConfirmPurchaseDialog = ({ item, coins, handleBuyItem }: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm" disabled={coins < getItemActualPrice(item)}>
          <ShoppingCart className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Purchase</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          Are you sure you want to purchase{" "}
          <span className="font-medium">{item.name}</span> for{" "}
          <span className="font-medium">{getItemPrice(item)}</span> coins?
        </AlertDialogDescription>
        <div className="text-sm text-muted-foreground">
          <div className="p-3 bg-muted rounded-md">
            <div className="flex justify-between mb-1">
              <span>Your Balance:</span>
              <span className="font-medium">{formatNumber(coins)} coins</span>
            </div>
            <div className="flex justify-between mb-1">
              <span>Item Price:</span>
              <span className="font-medium">{getItemPrice(item)} coins</span>
            </div>
            <div className="flex justify-between pt-2 border-t mt-2">
              <span className="font-bold">Remaining Balance:</span>
              <span
                className={`font-bold ${coins >= getItemActualPrice(item) ? "" : "text-red-500"}`}
              >
                {coins >= getItemActualPrice(item)
                  ? `${formatNumber(coins - getItemActualPrice(item))} coins`
                  : "Insufficient"}
              </span>
            </div>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleBuyItem(item)}>
            Confirm Purchase
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmPurchaseDialog;
