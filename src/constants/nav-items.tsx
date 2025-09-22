import {
  Home,
  Users,
  Building,
  Landmark,
  Calendar,
  ShoppingCart,
  Search,
  Dumbbell,
  Wifi,
  Newspaper,
  Package,
} from "lucide-react";

export const navItems = [
  {
    href: "dashboard",
    label: "Dashboard",
    icon: <Home className="h-4 w-4 mr-2" />,
  },
  { href: "team", label: "Team", icon: <Users className="h-4 w-4 mr-2" /> },
  {
    href: "club",
    label: "Club",
    icon: <Building className="h-4 w-4 mr-2" />,
  },
  {
    href: "stadium",
    label: "Stadium",
    icon: <Landmark className="h-4 w-4 mr-2" />,
  },
  {
    href: "schedule",
    label: "Schedule",
    icon: <Calendar className="h-4 w-4 mr-2" />,
  },
  {
    href: "market",
    label: "Market",
    icon: <ShoppingCart className="h-4 w-4 mr-2" />,
  },
  {
    href: "scouting",
    label: "Scouting",
    icon: <Search className="h-4 w-4 mr-2" />,
  },
  {
    href: "training",
    label: "Training",
    icon: <Dumbbell className="h-4 w-4 mr-2" />,
  },
  {
    href: "youth-academy",
    label: "Youth Academy",
    icon: <Users className="h-4 w-4 mr-2" />,
  },
  {
    href: "online-match",
    label: "Online",
    icon: <Wifi className="h-4 w-4 mr-2" />,
  },
  {
    href: "news",
    label: "News",
    icon: <Newspaper className="h-4 w-4 mr-2" />,
  },
  {
    href: "items",
    label: "Items",
    icon: <Package className="h-4 w-4 mr-2" />,
  },
];
