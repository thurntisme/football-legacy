'use client';

import { useState } from 'react';

import { Building, User, Users } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { ShopItems } from '@/mock/football';
import { ShopItem } from '@/types/football/item';

import ShopItemCard from './shop-item-card';

export default function ShopItemList() {
  const [shopItems, setShopItems] = useState<ShopItem[]>(ShopItems);

  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);
  const [itemToBuy, setItemToBuy] = useState<ShopItem | null>(null);
  const [coins, setCoins] = useState(15000);

  const handleBuyItem = (item: ShopItem) => {
    if (coins >= item.price) {
      setCoins(coins - item.price);

      // Special handling for stadium name change
      if (item.name === 'Stadium Name Change') {
        const newName = prompt('Enter new stadium name:', '');
        if (newName && newName.trim() !== '') {
          toast({
            title: 'Stadium Renamed',
            description: `Your stadium has been renamed to "${newName}"`,
          });
        } else {
          toast({
            title: 'Rename Cancelled',
            description: 'Stadium name was not changed',
          });
        }
      } else {
        toast({
          title: 'Item Purchased!',
          description: `You have successfully purchased ${item.name}`,
        });
      }

      setItemToBuy(null);
    } else {
      toast({
        title: 'Insufficient Coins',
        description: "You don't have enough coins to purchase this item",
        variant: 'destructive',
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
        <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
          <Button variant="default" className="rounded-full">
            All Items
          </Button>
          <Button variant="outline" className="rounded-full flex items-center">
            <User className="mr-2 h-4 w-4" />
            Player Items
          </Button>
          <Button variant="outline" className="rounded-full flex items-center">
            <Users className="mr-2 h-4 w-4" />
            Team Items
          </Button>
          <Button variant="outline" className="rounded-full flex items-center">
            <Building className="mr-2 h-4 w-4" />
            Club Items
          </Button>
          <Button variant="outline" className="rounded-full">
            Special Offers
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {shopItems.map((item) => (
            <ShopItemCard
              item={item}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              coins={coins}
              handleBuyItem={handleBuyItem}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
