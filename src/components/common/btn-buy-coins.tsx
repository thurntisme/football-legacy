import { Button } from "../ui/button";

import React from "react";

import { Coins } from "lucide-react";
import Link from "next/link";

import { FOOTBALL_STATS_URL } from "@/constants/site";

type Props = {};

const BtnBuyCoins = (props: Props) => {
  return (
    <Button variant="outline" asChild>
      <Link href={`${FOOTBALL_STATS_URL}/user/payment/coins`}>
        <Coins className="h-4 w-4" />
        Buy Coins
      </Link>
    </Button>
  );
};

export default BtnBuyCoins;
