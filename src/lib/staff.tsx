import { Badge } from "@/components/ui/badge";
import {
  StaffCategories,
  StaffCategoryEnum,
  StaffReputationEnum,
} from "@/constants/staff";

export const getReputationColor = (reputation: StaffReputationEnum) => {
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

export const getRoleLabel = (role: StaffCategoryEnum) => {
  const category = StaffCategories.find((category) => category.slug === role);

  if (!category) return null;

  return (
    <Badge className="flex items-center gap-1 w-fit" variant={"outline"}>
      <span className="text-xs">{category.label}</span>
      <category.icon className="h-3 w-3" />
    </Badge>
  );
};
