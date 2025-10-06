import { ItemCategoryEnum, ItemDurationUnitEnum } from "@/constants/items";

type Item = {
  slug: string;
  name: string;
  description: string;
  originalPrice: number;
  price: number;
  category: ItemCategoryEnum;
  effect: string;
  image: string;
};

export type ShopItem = Item & {
  duration: {
    quantity: number;
    unit: ItemDurationUnitEnum;
  };
};

export type InventoryItem = Item & {
  remaining_quantity: number;
};
