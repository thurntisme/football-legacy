import { Badge } from "@/components/ui/badge";

// Get focus badge
export const getFocusBadge = (focus: string) => {
  switch (focus) {
    case "general":
      return <Badge className="bg-blue-500">General</Badge>;
    case "specific_position":
      return <Badge className="bg-purple-500">Position Specific</Badge>;
    case "high_potential":
      return <Badge className="bg-amber-500">High Potential</Badge>;
    case "physical":
      return <Badge className="bg-green-500">Physical</Badge>;
    case "technical":
      return <Badge className="bg-red-500">Technical</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

// Get sign chance badge
export const getSignChanceBadge = (chance: string) => {
  switch (chance) {
    case "high":
      return <Badge className="bg-green-500">High</Badge>;
    case "medium":
      return <Badge className="bg-amber-500">Medium</Badge>;
    case "low":
      return <Badge className="bg-red-500">Low</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

// Get status badge
export const getStatusBadge = (status: string) => {
  switch (status) {
    case "pending":
      return <Badge variant="outline">Pending</Badge>;
    case "approached":
      return <Badge className="bg-blue-500">Approached</Badge>;
    case "signed":
      return <Badge className="bg-green-500">Signed</Badge>;
    case "rejected":
      return <Badge className="bg-red-500">Rejected</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};
