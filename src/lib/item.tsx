import { ITEM_CATEGORIES, ItemCategoryEnum } from "@/constants/items";
import { ShopItem } from "@/types/item";

import { formatNumber } from "./finance";

export const getItemActualPrice = (item: ShopItem) => {
  if (item.discount) {
    return Math.round(item.price * (1 - item.discount / 100));
  }
  return item.price;
};

export const getItemPrice = (item: ShopItem) => {
  return formatNumber(getItemActualPrice(item));
};

export const getCategoryIcon = (category: ItemCategoryEnum) => {
  return ITEM_CATEGORIES.find((cate) => cate.slug === category)?.icon ?? null;
};

export const getCategoryLabel = (category: ItemCategoryEnum) => {
  return ITEM_CATEGORIES.find((cate) => cate.slug === category)?.label ?? null;
};
