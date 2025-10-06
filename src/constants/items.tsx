import { Building, SquareUser, User, Users } from "lucide-react";

export enum ItemCategoryEnum {
  ALL = "all",
  PLAYER = "player",
  TEAM = "team",
  CLUB = "club",
  PLAYER_CARD = "player_card",
}

export const ITEM_CATEGORIES = [
  {
    label: "All Items",
    slug: ItemCategoryEnum.ALL,
    icon: null,
  },
  {
    label: "Player Items",
    slug: ItemCategoryEnum.PLAYER,
    icon: <User className="h-4 w-4" />,
  },
  {
    label: "Team Items",
    slug: ItemCategoryEnum.TEAM,
    icon: <Users className="h-4 w-4" />,
  },
  {
    label: "Club Items",
    slug: ItemCategoryEnum.CLUB,
    icon: <Building className="h-4 w-4" />,
  },
  {
    label: "Player Cards",
    slug: ItemCategoryEnum.PLAYER_CARD,
    icon: <SquareUser className="h-4 h-4" />,
  },
];

export enum ItemDurationUnitEnum {
  MATCH = "matches",
  DAYS = "days",
  WEEKS = "weeks",
  LIFETIME = "lifetime",
}

export enum PlayerItemEnum {
  STAMINA_BOOSTER = "player_stamina_booster",
  FORM_ENHANCER = "player_form_enhancer",
  FITNESS_ENHANCER = "player_fitness_enhancer",
  MORALE_ENHANCER = "player_morale_enhancer",
}

export enum TeamItemEnum {
  MORALE_ENHANCER = "team_morale_enhancer",
}

export enum ClubItemEnum {
  CLUB_NAME_CHANGE = "club_name_change",
  STADIUM_UPGRADE = "stadium_upgrade",
}
