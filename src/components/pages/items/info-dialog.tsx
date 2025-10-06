import React, { ReactElement } from "react";

import { Info } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatNumber } from "@/lib/finance";
import { getCategoryIcon, getCategoryLabel, getItemPrice } from "@/lib/item";
import { ShopItem } from "@/types/item";

type Props = {
  selectedItem: ShopItem | null;
  setSelectedItem: (item: ShopItem | null) => void;
  item: ShopItem;
  children?: ReactElement;
};

const InfoDialog = ({
  selectedItem,
  setSelectedItem,
  item,
  children,
}: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSelectedItem(item)}
        >
          <Info className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        {selectedItem && (
          <>
            <DialogHeader>
              <DialogTitle>Item Details</DialogTitle>
              <DialogDescription>
                Detailed information about {selectedItem.name}
              </DialogDescription>
            </DialogHeader>

            <div className="flex items-center py-4">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                <img
                  src={selectedItem.image || "/placeholder.svg"}
                  alt={selectedItem.name}
                  className="w-12 h-12"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold">{selectedItem.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="flex items-center">
                    {getCategoryIcon(selectedItem.category)}
                    <span className="ml-1 capitalize">
                      {getCategoryLabel(selectedItem.category)} Item
                    </span>
                  </Badge>
                  <Badge variant="outline">
                    {item.duration.quantity} {item.duration.unit}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Description</h3>
                <p className="text-sm">{selectedItem.description}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Effect</h3>
                <p className="text-sm">{selectedItem.effect}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Duration</h3>
                <p className="text-sm">
                  {item.duration.quantity} {item.duration.unit}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Price</h3>
                {selectedItem.discount ? (
                  <div className="flex items-center">
                    <span className="text-sm line-through text-muted-foreground mr-2">
                      {formatNumber(selectedItem.price)} coins
                    </span>
                    <span className="text-lg font-bold">
                      {getItemPrice(selectedItem)} coins
                    </span>
                    <Badge className="ml-2 bg-primary">
                      -{selectedItem.discount}% OFF
                    </Badge>
                  </div>
                ) : (
                  <p className="text-lg font-bold">
                    {formatNumber(selectedItem.price)} coins
                  </p>
                )}
              </div>
            </div>

            <DialogFooter>
              {children ? children : <Button>Close</Button>}
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default InfoDialog;
