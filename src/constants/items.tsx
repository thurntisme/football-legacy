import { Building, User, Users } from "lucide-react";

export const ITEM_CATEGORIES = [
  {
    label: "All Items",
    slug: "all",
    icon: null,
  },
  {
    label: "Player Items",
    slug: "player",
    icon: <User className="mr-2 h-4 w-4" />,
  },
  {
    label: "Team Items",
    slug: "team",
    icon: <Users className="mr-2 h-4 w-4" />,
  },
  {
    label: "Club Items",
    slug: "club",
    icon: <Building className="mr-2 h-4 w-4" />,
  },
  {
    label: "Special Offers",
    slug: "special",
    icon: null,
  },
];
