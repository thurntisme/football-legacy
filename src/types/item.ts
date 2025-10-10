import { LucideIcon } from "lucide-react";

import {
  ClubItemEnum,
  ItemCategoryEnum,
  ItemDurationUnitEnum,
  PlayerItemEnum,
  TeamItemEnum,
} from "@/constants/items";
import { PlayerEditionEnum } from "@/constants/player";

type Item = {
  slug: PlayerItemEnum | TeamItemEnum | ClubItemEnum | PlayerEditionEnum;
  name: string;
  description: string;
  discount?: number;
  limited?: boolean;
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

export type PlayerItem = {
  id: number;
  name: string;
  description: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  type: "normal" | "rising" | "young" | "legend";
  icon: LucideIcon;
  iconClassName: string;
  boostDescription: string;
};
