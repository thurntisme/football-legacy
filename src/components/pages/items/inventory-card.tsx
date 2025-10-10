import React, { useState } from "react";

import { X, Zap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  ClubItemEnum,
  ItemCategoryEnum,
  PlayerItemEnum,
  TeamItemEnum,
} from "@/constants/items";
import { PlayerEditionEnum } from "@/constants/player";
import { getCategoryIcon, getCategoryLabel } from "@/lib/item";
import { InventoryItem } from "@/types/item";

import ClubItem from "./club-item";
import PlayerCardItem from "./player-card-item";
import PlayerItem from "./player-item";
import TeamItem from "./team-item";

type Props = {
  item: InventoryItem;
  selectedItem: InventoryItem | null;
  setSelectedItem: (item: InventoryItem | null) => void;
};

const InventoryCard = ({ item, selectedItem, setSelectedItem }: Props) => {
  const [showDialog, setShowDialog] = useState(false);

  const renderItemSelected = (item: InventoryItem) => {
    if (item.category === ItemCategoryEnum.PLAYER_CARD) {
      return <PlayerCardItem slug={item.slug as PlayerEditionEnum} />;
    }
    if (item.category === ItemCategoryEnum.PLAYER) {
      return <PlayerItem slug={item.slug as PlayerItemEnum} />;
    }
    if (item.category === ItemCategoryEnum.TEAM) {
      return <TeamItem slug={item.slug as TeamItemEnum} />;
    }
    if (item.category === ItemCategoryEnum.CLUB) {
      return <ClubItem slug={item.slug as ClubItemEnum} />;
    }

    return null;
  };

  return (
    <Card className="flex flex-col relative">
      <CardHeader className="pb-2">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <img
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              className="w-10 h-10"
            />
          </div>
        </div>
        <CardTitle className="text-center mt-2">{item.name}</CardTitle>
        <CardDescription className="text-center">
          {item.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex justify-center space-x-2 mb-2">
          <Badge variant="outline" className="flex items-center">
            {getCategoryIcon(item.category)}
            <span className="ml-1 capitalize">
              {getCategoryLabel(item.category)}
            </span>
          </Badge>
        </div>
        <p className="text-sm text-center text-muted-foreground">
          {item.effect}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between py-2 px-3 mt-auto border-t">
        <div className="font-medium">Qty: {item.remaining_quantity}</div>
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button
              variant="default"
              size="sm"
              onClick={() => setSelectedItem(item)}
            >
              <Zap className="h-4 w-4" />
              Use
            </Button>
          </DialogTrigger>
          <DialogContent>
            {selectedItem && (
              <>
                <DialogHeader>
                  <DialogTitle>Use Item</DialogTitle>
                  <DialogDescription>
                    {selectedItem.category === ItemCategoryEnum.PLAYER_CARD
                      ? "Select a player to use this item on"
                      : `Activate ${selectedItem.name} for your ${selectedItem.category}`}
                  </DialogDescription>
                </DialogHeader>

                <div className="flex items-center py-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <img
                      src={selectedItem.image || "/placeholder.svg"}
                      alt={selectedItem.name}
                      className="w-10 h-10"
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">{selectedItem.name}</h2>
                    <p className="text-sm text-muted-foreground">
                      {selectedItem.effect}
                    </p>
                  </div>
                </div>

                <div className="py-4">{renderItemSelected(item)}</div>

                <Separator />

                <DialogFooter className="flex flex-row !justify-center">
                  <Button
                    onClick={() => setShowDialog(false)}
                    variant="outline"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default InventoryCard;
