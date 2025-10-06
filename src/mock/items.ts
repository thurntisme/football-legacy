import {
  ClubItemEnum,
  ItemCategoryEnum,
  ItemDurationUnitEnum,
  PlayerItemEnum,
  TeamItemEnum,
} from "@/constants/items";
import { PlayerEditionEnum } from "@/constants/player";
import { ShopItem } from "@/types/item";

const PlayerItems: ShopItem[] = [
  {
    slug: PlayerItemEnum.STAMINA_BOOSTER,
    name: "Stamina Booster",
    description: "Instantly restores stamina for a player",
    price: 1000,
    category: ItemCategoryEnum.PLAYER,
    effect: "+30% Stamina Recovery",
    duration: {
      quantity: 1,
      unit: ItemDurationUnitEnum.MATCH,
    },
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    slug: PlayerItemEnum.FORM_ENHANCER,
    name: "Form Enhancer",
    description: "Improves a player's form",
    price: 2500,
    category: ItemCategoryEnum.PLAYER,
    effect: "Improves form by one level",
    duration: {
      quantity: 3,
      unit: ItemDurationUnitEnum.MATCH,
    },
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    slug: PlayerItemEnum.FITNESS_ENHANCER,
    name: "Fitness Enhancer",
    description: "Improves a player's fitness",
    price: 2500,
    category: ItemCategoryEnum.PLAYER,
    effect: "Improves fitness by one level",
    duration: {
      quantity: 1,
      unit: ItemDurationUnitEnum.LIFETIME,
    },
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    slug: PlayerItemEnum.MORALE_ENHANCER,
    name: "Morale Enhancer",
    description: "Improves a player's morale",
    price: 2500,
    category: ItemCategoryEnum.PLAYER,
    effect: "Improves morale by one level",
    duration: {
      quantity: 1,
      unit: ItemDurationUnitEnum.LIFETIME,
    },
    image: "/placeholder.svg?height=80&width=80",
  },
];

const TeamItems: ShopItem[] = [
  {
    slug: TeamItemEnum.MORALE_ENHANCER,
    name: "Morale Enhancer",
    description: "Improves a player's morale",
    price: 2500,
    category: ItemCategoryEnum.TEAM,
    effect: "Improves morale by one level",
    duration: {
      quantity: 1,
      unit: ItemDurationUnitEnum.LIFETIME,
    },
    image: "/placeholder.svg?height=80&width=80",
  },
];

const ClubItems: ShopItem[] = [
  {
    slug: ClubItemEnum.CLUB_NAME_CHANGE,
    name: "Club Name Change",
    description: "Change your club's name",
    price: 10000,
    category: ItemCategoryEnum.CLUB,
    effect: "Rename your club",
    duration: {
      quantity: 1,
      unit: ItemDurationUnitEnum.LIFETIME,
    },
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    slug: ClubItemEnum.STADIUM_UPGRADE,
    name: "Stadium Upgrade",
    description: "Temporary stadium capacity increase",
    price: 5000,
    category: ItemCategoryEnum.CLUB,
    effect: "+10% Stadium Capacity",
    duration: {
      quantity: 1,
      unit: ItemDurationUnitEnum.LIFETIME,
    },
    image: "/placeholder.svg?height=80&width=80",
  },
];

const PlayerCardItems: ShopItem[] = [
  {
    slug: PlayerEditionEnum.LEGEND,
    name: "Legend",
    description: "Legend",
    price: 10000,
    category: ItemCategoryEnum.PLAYER_CARD,
    effect: "Legend",
    duration: {
      quantity: 1,
      unit: ItemDurationUnitEnum.LIFETIME,
    },
    image: "/placeholder.svg?height=80&width=80",
  },
];

export const ShopItems: ShopItem[] = [
  ...PlayerItems,
  ...TeamItems,
  ...ClubItems,
  ...PlayerCardItems,
];
