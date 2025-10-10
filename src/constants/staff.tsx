import {
  Binoculars,
  Compass,
  Dumbbell,
  GraduationCap,
  Stethoscope,
  Users,
  Wrench,
} from "lucide-react";

export enum StaffCategoryEnum {
  ALL = "all",
  TACTICAL = "tactical",
  TECHNICAL = "technical",
  FITNESS = "fitness",
  YOUTH = "youth",
  MEDICAL = "medical",
  SCOUTING = "scouting",
}

export const StaffCategories = [
  {
    slug: StaffCategoryEnum.ALL,
    label: "All",
    icon: Users,
  },
  {
    slug: StaffCategoryEnum.TACTICAL,
    label: "Tactical",
    icon: Compass,
  },
  {
    slug: StaffCategoryEnum.TECHNICAL,
    label: "Technical",
    icon: Wrench,
  },
  {
    slug: StaffCategoryEnum.FITNESS,
    label: "Fitness",
    icon: Dumbbell,
  },
  {
    slug: StaffCategoryEnum.YOUTH,
    label: "Youth",
    icon: GraduationCap,
  },
  {
    slug: StaffCategoryEnum.MEDICAL,
    label: "Medical",
    icon: Stethoscope,
  },
  {
    slug: StaffCategoryEnum.SCOUTING,
    label: "Scouting",
    icon: Binoculars,
  },
];

export enum StaffReputationEnum {
  WORLD_CLASS = "world class",
  ELITE = "elite",
  ESTABLISHED = "established",
  DEVELOPING = "developing",
  AMATEUR = "amateur",
}
