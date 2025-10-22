import { Button } from "../ui/button";

import React from "react";

import { CreditCard } from "lucide-react";
import Link from "next/link";

import { FOOTBALL_STATS_URL } from "@/constants/site";

type Props = {};

const BtnPayment = (props: Props) => {
  return (
    <Button variant="outline" asChild>
      <Link href={`${FOOTBALL_STATS_URL}/user/payment`}>
        <CreditCard className="h-4 w-4" />
        Payment
      </Link>
    </Button>
  );
};

export default BtnPayment;
