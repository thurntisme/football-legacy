import React from "react";

import { Building, User, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatNumber } from "@/lib/finance";
import { getItemPrice } from "@/lib/item";
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
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "player":
        return <User className="h-4 w-4" />;
      case "team":
        return <Users className="h-4 w-4" />;
      case "club":
        return <Building className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <Card
      key={item.id}
      className={`${item.discount ? "border-primary" : ""} relative flex flex-col`}
    >
      {item.discount && (
        <div className="absolute top-2 right-2">
          <Badge className="bg-primary">-{item.discount}%</Badge>
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
      <CardContent className="pb-2">
        <div className="flex justify-center space-x-2 mb-2">
          <Badge variant="outline" className="flex items-center">
            {getCategoryIcon(item.category)}
            <span className="ml-1 capitalize">{item.category}</span>
          </Badge>
          <Badge variant="outline">{item.duration}</Badge>
        </div>
        <p className="text-sm text-center text-muted-foreground">
          {item.effect}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between py-2 px-3 border-t mt-auto">
        <div className="flex items-center">
          {item.discount ? (
            <div className="flex flex-col">
              <span className="text-sm line-through text-muted-foreground">
                {formatNumber(item.price)}
              </span>
              <span className="font-bold">{getItemPrice(item)} coins</span>
            </div>
          ) : (
            <span className="font-bold">{formatNumber(item.price)} coins</span>
          )}
        </div>
        <div className="flex gap-2">
          <InfoDialog
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            item={item}
            getCategoryIcon={getCategoryIcon}
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
