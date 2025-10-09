import { CheckCircle, Clock, XCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";

export const getStatusBadge = (status: string) => {
  switch (status) {
    case "pending":
      return (
        <Badge variant="outline" className="flex items-center gap-1">
          <Clock className="h-3 w-3" /> Pending
        </Badge>
      );
    case "accepted":
      return (
        <Badge className="bg-green-600 flex items-center gap-1">
          <CheckCircle className="h-3 w-3" /> Accepted
        </Badge>
      );
    case "rejected":
      return (
        <Badge variant="destructive" className="flex items-center gap-1">
          <XCircle className="h-3 w-3" /> Rejected
        </Badge>
      );
    case "negotiating":
      return (
        <Badge className="bg-amber-500 flex items-center gap-1">
          Negotiating
        </Badge>
      );
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};
