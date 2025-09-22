import React, { useState } from 'react';

import { Building, Info, ShoppingCart, User, Users } from 'lucide-react';

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
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ShopItem } from '@/types/football/item';

type Props = {
  item: ShopItem;
  selectedItem: ShopItem | null;
  setSelectedItem: (item: ShopItem | null) => void;
  coins: number;
  handleBuyItem: (item: ShopItem) => void;
};

const ShopItemCard = ({
  item,
  selectedItem,
  setSelectedItem,
  coins,
  handleBuyItem,
}: Props) => {
  const [itemToBuy, setItemToBuy] = useState<ShopItem | null>(null);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'player':
        return <User className="h-4 w-4" />;
      case 'team':
        return <Users className="h-4 w-4" />;
      case 'club':
        return <Building className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getActualPrice = (item: ShopItem) => {
    if (item.discount) {
      return Math.round(item.price * (1 - item.discount / 100));
    }
    return item.price;
  };

  return (
    <Card
      key={item.id}
      className={`${item.discount ? 'border-primary' : ''} relative flex flex-col`}
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
              src={item.image || '/placeholder.svg'}
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
                {item.price}
              </span>
              <span className="font-bold">{getActualPrice(item)} coins</span>
            </div>
          ) : (
            <span className="font-bold">{item.price} coins</span>
          )}
        </div>
        <div className="flex gap-2">
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
                        src={selectedItem.image || '/placeholder.svg'}
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
                            {selectedItem.category} Item
                          </span>
                        </Badge>
                        <Badge variant="outline">{selectedItem.duration}</Badge>
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
                      <p className="text-sm">{selectedItem.duration}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-2">Price</h3>
                      {selectedItem.discount ? (
                        <div className="flex items-center">
                          <span className="text-sm line-through text-muted-foreground mr-2">
                            {selectedItem.price} coins
                          </span>
                          <span className="text-lg font-bold">
                            {getActualPrice(selectedItem)} coins
                          </span>
                          <Badge className="ml-2 bg-primary">
                            -{selectedItem.discount}% OFF
                          </Badge>
                        </div>
                      ) : (
                        <p className="text-lg font-bold">
                          {selectedItem.price} coins
                        </p>
                      )}
                    </div>
                  </div>

                  <DialogFooter>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button>
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Buy Item
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Confirm Purchase</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to purchase{' '}
                            {selectedItem.name} for{' '}
                            {getActualPrice(selectedItem)} coins?
                            <div className="mt-2 p-3 bg-muted rounded-md">
                              <div className="flex justify-between mb-1">
                                <span>Item Price:</span>
                                <span className="font-medium">
                                  {getActualPrice(selectedItem)} coins
                                </span>
                              </div>
                              <div className="flex justify-between mb-1">
                                <span>Your Balance:</span>
                                <span className="font-medium">
                                  {coins} coins
                                </span>
                              </div>
                              <div className="flex justify-between pt-2 border-t mt-2">
                                <span className="font-bold">
                                  Remaining Balance:
                                </span>
                                <span
                                  className={`font-bold ${coins >= getActualPrice(selectedItem) ? '' : 'text-red-500'}`}
                                >
                                  {coins >= getActualPrice(selectedItem)
                                    ? coins - getActualPrice(selectedItem)
                                    : 'Insufficient'}
                                </span>
                              </div>
                            </div>
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleBuyItem(selectedItem)}
                          >
                            Confirm Purchase
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DialogFooter>
                </>
              )}
            </DialogContent>
          </Dialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="sm" onClick={() => setItemToBuy(item)}>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Buy
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Purchase</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to purchase {item.name} for{' '}
                  {getActualPrice(item)} coins?
                  <div className="mt-2 p-3 bg-muted rounded-md">
                    <div className="flex justify-between mb-1">
                      <span>Item Price:</span>
                      <span className="font-medium">
                        {getActualPrice(item)} coins
                      </span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span>Your Balance:</span>
                      <span className="font-medium">{coins} coins</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t mt-2">
                      <span className="font-bold">Remaining Balance:</span>
                      <span
                        className={`font-bold ${coins >= getActualPrice(item) ? '' : 'text-red-500'}`}
                      >
                        {coins >= getActualPrice(item)
                          ? coins - getActualPrice(item)
                          : 'Insufficient'}
                      </span>
                    </div>
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleBuyItem(item)}>
                  Confirm Purchase
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ShopItemCard;
