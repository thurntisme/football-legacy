import {
  Binoculars,
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
  Settings,
  Shirt,
  ShoppingCart,
  Stethoscope,
  Trophy,
  Users,
  Users2Icon,
  Wifi,
} from "lucide-react";

export const navItems = [
  {
    href: "dashboard",
    label: "Dashboard",
    icon: Home,
  },
  {
    href: "game/team",
    label: "Team",
    icon: Users,
    children: [
      {
        href: "",
        label: "Roster",
        icon: Users2Icon,
      },
      {
        href: "contract",
        label: "Contract",
        icon: FileSignature,
      },
      {
        href: "shirt-number",
        label: "Shirt Number",
        icon: Shirt,
      },
    ],
  },
  {
    href: "game/club",
    label: "Club",
    icon: Building,
  },
  {
    href: "game/stadium",
    label: "Stadium",
    icon: Landmark,
  },
  {
    href: "game/league",
    label: "League",
    icon: Trophy,
    children: [
      {
        href: "schedule",
        label: "Schedule",
        icon: CalendarDays,
      },
      {
        href: "standing",
        label: "Standing",
        icon: ListOrdered,
      },
    ],
  },
  {
    href: "game/market",
    label: "Market",
    icon: ShoppingCart,
  },
  {
    href: "game/staff",
    label: "Staff",
    icon: Users,
  },
  {
    href: "game/medical",
    label: "Medical",
    icon: Stethoscope,
  },
  {
    href: "game/scouting",
    label: "Scouting",
    icon: Binoculars,
  },
  {
    href: "game/training",
    label: "Training",
    icon: Dumbbell,
  },
  {
    href: "game/youth-academy",
    label: "Youth Academy",
    icon: GraduationCap,
  },
  {
    href: "game/online",
    label: "Online",
    icon: Wifi,
  },
  {
    href: "game/news",
    label: "News",
    icon: Newspaper,
  },
  {
    href: "game/items",
    label: "Items",
    icon: Package,
  },
];

export const userItems = [
  {
    href: "user/settings",
    label: "Settings",
    icon: Settings,
  },
  {
    href: "user/payment",
    label: "Payment",
    icon: CreditCard,
  },
  {
    href: "user/support",
    label: "Ticket Support",
    icon: HelpCircle,
  },
  {
    href: "user/feedback",
    label: "Feedback",
    icon: MessageSquare,
  },
];
