"use client";

import React, { useState } from "react";

import { ShoppingCart } from "lucide-react";

import ContentWrapper from "@/components/common/content-wrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { internalApi } from "@/lib/api/internal";
import { InventoryItem } from "@/types/item";
import { useQuery } from "@tanstack/react-query";

import InventoryCard from "./inventory-card";

type Props = {
  setTabsValue: React.Dispatch<React.SetStateAction<string>>;
};

export default function InventoryList({ setTabsValue }: Props) {
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<string>("");

  const {
    data: inventoryItems,
    isLoading,
    error,
  } = useQuery<InventoryItem[] | null>({
    queryKey: ["inventory-list"],
    queryFn: async () => {
      const { data } = await internalApi.get("/inventory");
      return data;
    },
  });

  const handleUseItem = (item: InventoryItem) => {
    toast({
      title: "Item Used!",
      description: ``,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Inventory</CardTitle>
        <CardDescription>Items you own and can use</CardDescription>
      </CardHeader>
      <CardContent>
        <ContentWrapper isLoading={isLoading} error={error}>
          {inventoryItems && inventoryItems.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {inventoryItems.map((item) => (
                <InventoryCard
                  item={item}
                  key={item.slug}
                  selectedItem={selectedItem}
                  setSelectedItem={setSelectedItem}
                  selectedPlayer={selectedPlayer}
                  setSelectedPlayer={setSelectedPlayer}
                  handleUseItem={handleUseItem}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>You don't have any items in your inventory.</p>
              <p className="text-sm">
                Visit the shop to purchase items for your team.
              </p>
              <Button
                className="mt-4"
                asChild
                onClick={() => setTabsValue("shop")}
              >
                <ShoppingCart className="h-4 w-4" />
                Go to Shop
              </Button>
            </div>
          )}
        </ContentWrapper>
      </CardContent>
    </Card>
  );
}
