import {
  Building,
  CalendarDays,
  Dumbbell,
  FileSignature,
  Home,
  Landmark,
  ListOrdered,
  Newspaper,
  Package,
  Search,
  Shirt,
  ShoppingCart,
  Trophy,
  Users,
  Users2Icon,
  Wifi,
} from "lucide-react";

export const navItems = [
  {
    href: "dashboard",
    label: "Dashboard",
    icon: <Home className="h-4 w-4 mr-2" />,
  },
  {
    href: "game/team",
    label: "Team",
    icon: <Users className="h-4 w-4 mr-2" />,
    children: [
      {
        href: "",
        label: "Roster",
        icon: <Users2Icon className="h-4 w-4 mr-2" />,
      },
      {
        href: "contract",
        label: "Contract",
        icon: <FileSignature className="h-4 w-4 mr-2" />,
      },
      {
        href: "shirt-number",
        label: "Shirt Number",
        icon: <Shirt className="h-4 w-4 mr-2" />,
      },
    ],
  },
  {
    href: "game/club",
    label: "Club",
    icon: <Building className="h-4 w-4 mr-2" />,
  },
  {
    href: "game/stadium",
    label: "Stadium",
    icon: <Landmark className="h-4 w-4 mr-2" />,
  },
  {
    href: "league",
    label: "League",
    icon: <Trophy className="h-4 w-4 mr-2" />,
    children: [
      {
        href: "schedule",
        label: "Schedule",
        icon: <CalendarDays className="h-4 w-4 mr-2" />,
      },
      {
        href: "standing",
        label: "Standing",
        icon: <ListOrdered className="h-4 w-4 mr-2" />,
      },
    ],
  },
  {
    href: "game/market",
    label: "Market",
    icon: <ShoppingCart className="h-4 w-4 mr-2" />,
  },
  {
    href: "game/scouting",
    label: "Scouting",
    icon: <Search className="h-4 w-4 mr-2" />,
  },
  {
    href: "training",
    label: "Training",
    icon: <Dumbbell className="h-4 w-4 mr-2" />,
  },
  {
    href: "game/youth-academy",
    label: "Youth Academy",
    icon: <Users className="h-4 w-4 mr-2" />,
  },
  {
    href: "online-match",
    label: "Online",
    icon: <Wifi className="h-4 w-4 mr-2" />,
  },
  {
    href: "game/news",
    label: "News",
    icon: <Newspaper className="h-4 w-4 mr-2" />,
  },
  {
    href: "game/items",
    label: "Items",
    icon: <Package className="h-4 w-4 mr-2" />,
  },
];
