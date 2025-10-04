"use client";

import React, { useState } from "react";

import { ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { inventoryItems } from "@/mock/football";
import { InventoryItem } from "@/types/item";

import InventoryCard from "./inventory-card";

type Props = {
  setTabsValue: React.Dispatch<React.SetStateAction<string>>;
};

export default function InventoryList({ setTabsValue }: Props) {
  const [inventory, setInventory] = useState<InventoryItem[]>(inventoryItems);

  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<string>("");

  const handleUseItem = (item: InventoryItem) => {
    if (item.category === "player" && !selectedPlayer) {
      toast({
        title: "Select a Player",
        description: "Please select a player to use this item on",
        variant: "destructive",
      });
      return;
    }

    // Special handling for stadium name change
    if (item.name === "Stadium Name Change") {
      const newName = prompt("Enter new stadium name:", "");
      if (newName && newName.trim() !== "") {
        // Update inventory
        setInventory(
          inventory
            .map((i) => {
              if (i.id === item.id) {
                return {
                  ...i,
                  quantity: i.quantity - 1,
                };
              }
              return i;
            })
            .filter((i) => i.quantity > 0),
        );

        toast({
          title: "Stadium Renamed",
          description: `Your stadium has been renamed to "${newName}"`,
        });

        setSelectedItem(null);
      } else {
        toast({
          title: "Rename Cancelled",
          description: "Stadium name was not changed",
        });
      }
      return;
    }

    // Update inventory for other items
    setInventory(
      inventory
        .map((i) => {
          if (i.id === item.id) {
            return {
              ...i,
              quantity: i.quantity - 1,
              used: i.category !== "player" ? true : i.used,
            };
          }
          return i;
        })
        .filter((i) => i.quantity > 0),
    );

    // Show success message
    toast({
      title: "Item Used!",
      description:
        item.category === "player"
          ? `${item.name} has been applied to ${selectedPlayer.split("(")[0]}`
          : `${item.name} has been activated`,
    });

    setSelectedItem(null);
    setSelectedPlayer("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Inventory</CardTitle>
        <CardDescription>Items you own and can use</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          {inventory.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {inventory.map((item) => (
                <InventoryCard
                  item={item}
                  key={item.id}
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
                <ShoppingCart className="mr-2 h-4 w-4" />
                Go to Shop
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
