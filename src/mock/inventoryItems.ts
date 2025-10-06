import { ClubItemEnum, PlayerItemEnum, TeamItemEnum } from "@/constants/items";
import { PlayerEditionEnum } from "@/constants/player";
import { InventoryItem } from "@/types/item";

export const inventoryItems: InventoryItem[] = [
  {
    slug: PlayerItemEnum.FITNESS_ENHANCER,
    remaining_quantity: 1,
  },
  {
    slug: TeamItemEnum.MORALE_ENHANCER,
    remaining_quantity: 1,
  },
  {
    slug: ClubItemEnum.CLUB_NAME_CHANGE,
    remaining_quantity: 1,
  },
  {
    slug: PlayerEditionEnum.LEGEND,
    remaining_quantity: 2,
  },
];
