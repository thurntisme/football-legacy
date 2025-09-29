import { StaffMember, StaffType } from "@/types/staff";
import {
  Users,
  Brain,
  Briefcase,
  Dumbbell,
  FileText,
  Flag,
  Footprints,
  Heart,
  Info,
  Lightbulb,
  Search,
  Shield,
  Swords,
  TrendingUp,
  Clipboard,
} from "lucide-react";

export const getFilteredCurrentStaff = (
  list: StaffMember[],
  type: StaffType,
) => {
  if (type === "coaching") {
    return list.filter((staff) =>
      [
        "Assistant Manager",
        "Tactical Manager",
        "Fitness Coach",
        "Technical Coach",
        "Goalkeeping Coach",
        "Set-Piece Coach",
        "Mental Coach",
        "Youth Development Manager",
      ].includes(staff.role),
    );
  } else if (type === "medical") {
    return list.filter((staff) =>
      [
        "Head Physio",
        "Sports Scientist",
        "Nutritionist",
        "Head of Medical",
        "Performance Director",
      ].includes(staff.role),
    );
  } else if (type === "scouting") {
    return list.filter((staff) =>
      [
        "Chief Scout",
        "Youth Scout",
        "Data Analyst",
        "Director of Scouting",
        "Technical Director",
        "Data Analysis Director",
      ].includes(staff.role),
    );
  }
  return list;
};

export const getReputationColor = (reputation: string) => {
  switch (reputation) {
    case "world class":
      return "bg-red-500";
    case "elite":
      return "bg-purple-500";
    case "established":
      return "bg-blue-500";
    case "developing":
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
};

export const getAttributeColor = (value: number) => {
  if (value >= 18) return "text-green-600 font-bold";
  if (value >= 15) return "text-green-500";
  if (value >= 12) return "text-blue-500";
  if (value >= 9) return "text-amber-500";
  return "text-red-500";
};

export const getRoleIcon = (role: string) => {
  switch (role) {
    case "Assistant Manager":
    case "Tactical Manager":
      return <Clipboard className="h-5 w-5 text-blue-500" />;
    case "Fitness Coach":
    case "Fitness Manager":
      return <Dumbbell className="h-5 w-5 text-green-500" />;
    case "Technical Coach":
    case "Technical Manager":
      return <Footprints className="h-5 w-5 text-purple-500" />;
    case "Goalkeeping Coach":
      return <Shield className="h-5 w-5 text-amber-500" />;
    case "Head Physio":
    case "Head of Medical":
      return <Heart className="h-5 w-5 text-red-500" />;
    case "Sports Scientist":
    case "Performance Director":
      return <TrendingUp className="h-5 w-5 text-cyan-500" />;
    case "Chief Scout":
    case "Director of Scouting":
      return <Search className="h-5 w-5 text-indigo-500" />;
    case "Youth Scout":
    case "Youth Development Manager":
      return <Users className="h-5 w-5 text-emerald-500" />;
    case "Data Analyst":
    case "Data Analysis Director":
      return <FileText className="h-5 w-5 text-violet-500" />;
    case "Mental Coach":
      return <Brain className="h-5 w-5 text-pink-500" />;
    case "Set-Piece Coach":
      return <Flag className="h-5 w-5 text-orange-500" />;
    case "Nutritionist":
      return <Lightbulb className="h-5 w-5 text-yellow-500" />;
    case "Attacking Coach":
      return <Swords className="h-5 w-5 text-red-500" />;
    case "Defensive Coach":
      return <Shield className="h-5 w-5 text-blue-500" />;
    case "Technical Director":
      return <Briefcase className="h-5 w-5 text-gray-500" />;
    default:
      return <Info className="h-5 w-5 text-gray-500" />;
  }
};
