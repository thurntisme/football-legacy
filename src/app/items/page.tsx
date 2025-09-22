"use client";

import { useState } from "react";

import PageTitle from "@/components/common/page-title";
import InventoryList from "@/components/inventory-list";
import ItemsOverview from "@/components/items-overview";
import ShopItemList from "@/components/shop-item-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ItemsPage() {
  const [tabsValue, setTabsValue] = useState("shop");
  return (
    <>
      <PageTitle title="Item Shop" />

      <ItemsOverview />

      <Tabs
        value={tabsValue}
        onValueChange={setTabsValue}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="shop">Shop Items</TabsTrigger>
          <TabsTrigger value="inventory">My Inventory</TabsTrigger>
        </TabsList>

        <TabsContent value="shop" className="space-y-6">
          <ShopItemList />
        </TabsContent>

        <TabsContent value="inventory" className="space-y-6">
          <InventoryList setTabsValue={setTabsValue} />
        </TabsContent>
      </Tabs>
    </>
  );
}
