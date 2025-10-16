import { Button } from "../ui/button";

import React from "react";

import { Users } from "lucide-react";
import Link from "next/link";

import { FOOTBALL_STATS_URL } from "@/constants/site";

type Props = {};

const BtnStaffManagement = (props: Props) => {
  return (
    <Button variant="outline" asChild>
      <Link href={`${FOOTBALL_STATS_URL}/game/staff`}>
        <Users className="h-4 w-4" />
        Staff Management
      </Link>
    </Button>
  );
};

export default BtnStaffManagement;
