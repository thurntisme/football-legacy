import { Badge } from "@/components/ui/badge";

export const getFormColor = (form: string) => {
  switch (form) {
    case "excellent":
      return "bg-green-500";
    case "good":
      return "bg-emerald-400";
    case "average":
      return "bg-amber-400";
    case "poor":
      return "bg-red-400";
    default:
      return "bg-gray-400";
  }
};

export const getFormBadge = (form: string) => {
  switch (form) {
    case "excellent":
      return <Badge className="bg-green-500">Excellent</Badge>;
    case "good":
      return <Badge className="bg-emerald-400">Good</Badge>;
    case "average":
      return <Badge className="bg-amber-400">Average</Badge>;
    case "poor":
      return <Badge className="bg-red-400">Poor</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

export const getFitnessColor = (fitness: number) => {
  if (fitness >= 90) return "text-green-500";
  if (fitness >= 75) return "text-emerald-400";
  if (fitness >= 60) return "text-amber-400";
  return "text-red-500";
};
