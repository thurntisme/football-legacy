import {
  Building,
  CalendarDays,
  CreditCard,
  Dumbbell,
  FileSignature,
  GraduationCap,
  HelpCircle,
  Home,
  Landmark,
  ListOrdered,
  MessageSquare,
  Newspaper,
  Package,
  Search,
  Settings,
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
    href: "game/league",
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
    href: "game/staff",
    label: "Staff",
    icon: <Users className="h-4 w-4 mr-2" />,
  },
  {
    href: "game/scouting",
    label: "Scouting",
    icon: <Search className="h-4 w-4 mr-2" />,
  },
  {
    href: "game/training",
    label: "Training",
    icon: <Dumbbell className="h-4 w-4 mr-2" />,
  },
  {
    href: "game/youth-academy",
    label: "Youth Academy",
    icon: <GraduationCap className="h-4 w-4 mr-2" />,
  },
  {
    href: "game/online",
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

export const userItems = [
  {
    href: "user/settings",
    label: "Settings",
    icon: <Settings className="h-4 w-4 mr-2" />,
  },
  {
    href: "user/payment",
    label: "Payment",
    icon: <CreditCard className="h-4 w-4 mr-2" />,
  },
  {
    href: "user/support",
    label: "Ticket Support",
    icon: <HelpCircle className="h-4 w-4 mr-2" />,
  },
  {
    href: "user/feedback",
    label: "Feedback",
    icon: <MessageSquare className="h-4 w-4 mr-2" />,
  },
];
