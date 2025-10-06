import { ItemCategoryEnum, ItemDurationUnitEnum } from "@/constants/items";

export type ShopItem = {
  id?: number;
  slug?: string;
  name: string;
  description: string;
  price: number;
  category: ItemCategoryEnum;
  effect: string;
  duration: {
    quantity: number;
    unit: ItemDurationUnitEnum;
  };
  image: string;
  discount?: number;
  limited?: boolean;
};

export type InventoryItem = {
  id: number;
  name: string;
  description: string;
  category: ItemCategoryEnum;
  effect: string;
  duration: string;
  image: string;
  quantity: number;
  used?: boolean;
};
