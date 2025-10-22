import { Button } from "../ui/button";

import React from "react";

import { Coins, PiggyBank, Wallet } from "lucide-react";
import Link from "next/link";

import { FOOTBALL_STATS_URL } from "@/constants/site";

type Props = {};

const BtnClubFunds = (props: Props) => {
  return (
    <Button variant="outline" asChild>
      <Link href={`${FOOTBALL_STATS_URL}/user/payment/club-funds`}>
        <Wallet className="h-4 w-4" />
        Buy Club Funds
      </Link>
    </Button>
  );
};

export default BtnClubFunds;
