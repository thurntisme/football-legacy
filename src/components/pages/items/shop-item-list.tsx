"use client";

import { useMemo, useState } from "react";

import ContentWrapper from "@/components/common/content-wrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ITEM_CATEGORIES, ItemCategoryEnum } from "@/constants/items";
import { toast } from "@/hooks/use-toast";
import { internalApi } from "@/lib/api/internal";
import { ShopItem } from "@/types/item";
import { useQuery } from "@tanstack/react-query";

import ShopItemCard from "./shop-item-card";

const USER_COINS = 1000;

export default function ShopItemList() {
  const [selectedCategory, setSelectedCategory] = useState<ItemCategoryEnum>(
    ItemCategoryEnum.ALL,
  );
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);

  const {
    data: shopItems,
    isLoading,
    error,
  } = useQuery<ShopItem[] | null>({
    queryKey: ["item-list"],
    queryFn: async () => {
      const { data } = await internalApi.get("/items");
      return data;
    },
  });

  const filteredCategory = useMemo(() => {
    if (!shopItems) return [];
    if (selectedCategory === ItemCategoryEnum.ALL) {
      return shopItems;
    }
    return shopItems.filter((item) => item.category === selectedCategory);
  }, [selectedCategory, shopItems]);

  const handleBuyItem = (item: ShopItem) => {
    if (USER_COINS >= item.price) {
      // Special handling for stadium name change
      if (item.name === "Stadium Name Change") {
        const newName = prompt("Enter new stadium name:", "");
        if (newName && newName.trim() !== "") {
          toast({
            title: "Stadium Renamed",
            description: `Your stadium has been renamed to "${newName}"`,
          });
        } else {
          toast({
            title: "Rename Cancelled",
            description: "Stadium name was not changed",
          });
        }
      } else {
        toast({
          title: "Item Purchased!",
          description: `You have successfully purchased ${item.name}`,
        });
      }
    } else {
      toast({
        title: "Insufficient Coins",
        description: "You don't have enough coins to purchase this item",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Item Shop</CardTitle>
        <CardDescription>
          Purchase items to boost your team and players
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ContentWrapper isLoading={isLoading} error={error}>
          <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
            {ITEM_CATEGORIES.map(({ label, slug, icon }) => (
              <Button
                key={label}
                variant={selectedCategory === slug ? "default" : "outline"}
                className={`rounded-full${icon ? " flex items-center" : ""}`}
                onClick={() => setSelectedCategory(slug)}
              >
                {icon}
                {label}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredCategory.map((item) => (
              <ShopItemCard
                key={item.id}
                item={item}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                userCoin={USER_COINS}
                handleBuyItem={handleBuyItem}
              />
            ))}
          </div>
        </ContentWrapper>
      </CardContent>
    </Card>
  );
}
