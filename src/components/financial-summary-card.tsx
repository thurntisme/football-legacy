"use client";

import { Building, Coins, DollarSign } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FOOTBALL_STATS_URL } from "@/constants/site";
import { getGuestData } from "@/lib/user";
import { convertNumberWithSeparator } from "@/lib/utils";

export default function FinancialSummaryCard() {
  const guestUser = getGuestData();

  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center p-3 bg-primary/5 rounded-lg">
            <DollarSign className="h-8 w-8 mr-3 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Transfer Budget</p>
              <p className="text-2xl font-bold">
                {convertNumberWithSeparator(guestUser.budget ?? 0)}
              </p>
            </div>
          </div>

          <div className="flex items-center p-3 bg-primary/5 rounded-lg">
            <Coins className="h-8 w-8 mr-3 text-amber-500" />
            <div>
              <p className="text-sm text-muted-foreground">Game Coins</p>
              <p className="text-2xl font-bold">
                {convertNumberWithSeparator(guestUser.coin ?? 0)}
              </p>
              <Button variant="link" className="h-auto p-0 text-xs" asChild>
                <Link href={`${FOOTBALL_STATS_URL}/payment`}>Buy More</Link>
              </Button>
            </div>
          </div>

          <div className="flex items-center p-3 bg-primary/5 rounded-lg">
            <Building className="h-8 w-8 mr-3 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Stadium Income</p>
              <p className="text-2xl font-bold">£1,200,000</p>
              <p className="text-xs text-muted-foreground">per month</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
