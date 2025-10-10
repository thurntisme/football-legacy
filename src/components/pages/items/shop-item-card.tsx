import React from "react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getCategoryIcon,
  getCategoryLabel,
  getItemPriceHtml,
} from "@/lib/item";
import { ShopItem } from "@/types/item";

import ConfirmPurchaseDialog from "./confirm-purchase-dialog";
import InfoDialog from "./info-dialog";

type Props = {
  item: ShopItem;
  selectedItem: ShopItem | null;
  setSelectedItem: (item: ShopItem | null) => void;
  userCoin: number;
  handleBuyItem: (item: ShopItem) => void;
};

const ShopItemCard = ({
  item,
  selectedItem,
  setSelectedItem,
  userCoin,
  handleBuyItem,
}: Props) => {
  return (
    <Card
      key={item.slug}
      className={`${item.discount ? "border-primary" : ""} relative flex flex-col`}
    >
      {item.discount && (
        <div className="absolute top-2 right-2">
          <Badge className="bg-primary">{item.discount}%</Badge>
        </div>
      )}
      {item.limited && (
        <div className="absolute top-2 left-2">
          <Badge variant="outline" className="border-amber-400 text-amber-400">
            Limited
          </Badge>
        </div>
      )}
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
      <CardContent className="pb-2 px-4">
        <div className="flex justify-center space-x-2 mb-2">
          <Badge variant="outline" className="flex items-center">
            {getCategoryIcon(item.category)}
            <span className="ml-1 capitalize">
              {getCategoryLabel(item.category)}
            </span>
          </Badge>
          <Badge variant="outline">
            {item.duration.quantity} {item.duration.unit}
          </Badge>
        </div>
        <p className="text-sm text-center text-muted-foreground">
          {item.effect}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between py-2 px-3 border-t mt-auto">
        <div className="flex items-center">{getItemPriceHtml(item)}</div>
        <div className="flex gap-2">
          <InfoDialog
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            item={item}
          >
            <ConfirmPurchaseDialog
              item={item}
              coins={userCoin}
              handleBuyItem={handleBuyItem}
            />
          </InfoDialog>

          <ConfirmPurchaseDialog
            item={item}
            coins={userCoin}
            handleBuyItem={handleBuyItem}
          />
        </div>
      </CardFooter>
    </Card>
  );
};

export default ShopItemCard;
