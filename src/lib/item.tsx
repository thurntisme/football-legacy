import { ITEM_CATEGORIES, ItemCategoryEnum } from "@/constants/items";
import { ShopItems } from "@/mock/items";
import { ShopItem } from "@/types/item";

import { formatNumber } from "./finance";

export const getItemActualPrice = (item: ShopItem) => {
  if (item.discount) {
    return Math.round(item.price * (1 - item.discount / 100));
  }
  return item.price;
};

export const getItemPrice = (item: ShopItem) => {
  return formatNumber(item.price);
};

export const getCategoryIcon = (category: ItemCategoryEnum | undefined) => {
  if (!category) return null;
  return ITEM_CATEGORIES.find((cate) => cate.slug === category)?.icon ?? null;
};

export const getCategoryLabel = (category: ItemCategoryEnum) => {
  return ITEM_CATEGORIES.find((cate) => cate.slug === category)?.label ?? null;
};

export const getItemBySlug = (slug: string | undefined) => {
  if (!slug) return null;
  return ShopItems.find((item) => item.slug === slug) ?? null;
};

export const getItemPriceHtml = (item: ShopItem, direction = "col") => {
  if (item.discount) {
    return getItemPriceAfterDiscountHtml(item, direction);
  }
  return getOriginalItemPriceHtml(item);
};

export const getItemPriceAfterDiscount = (item: ShopItem) => {
  let itemPrice = item.price;
  if (item.discount) {
    itemPrice = Math.round(item.price * (1 - item.discount / 100));
  }
  return formatNumber(itemPrice);
};

export const getOriginalItemPriceHtml = (item: ShopItem) => {
  return <span className="font-bold">{getItemPrice(item)} coins</span>;
};

export const getItemPriceAfterDiscountHtml = (
  item: ShopItem,
  direction = "col",
) => {
  return (
    <div
      className={`flex flex-${direction} gap-${direction === "col" ? 0.5 : 2}`}
    >
      <span className="text-sm line-through text-muted-foreground">
        {getItemPrice(item)}
      </span>
      <span className="font-bold">{getItemPriceAfterDiscount(item)} coins</span>
    </div>
  );
};
