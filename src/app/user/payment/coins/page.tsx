"use client";

import React from "react";

import { CreditCard, Gem, Gift, Info, Zap } from "lucide-react";

import BtnClubFunds from "@/components/common/btn-buy-club-funds";
import BtnPayment from "@/components/common/btn-payment";
import ConfirmDialog from "@/components/common/confirm-dialog";
import PageTitle from "@/components/common/page-title";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { formatNumber } from "@/lib/finance";

type Props = {};

const COIN_PACKAGES = [
  {
    name: "Starter Pack",
    coins: 500,
    price: 4.99,
    extra: 0,
    featured: false,
  },
  {
    name: "Popular Pack",
    coins: 1200,
    price: 9.99,
    extra: 10,
    featured: true,
  },
  {
    name: "Gold Pack",
    coins: 2500,
    price: 19.99,
    extra: 15,
    featured: false,
  },
  {
    name: "Premium Pack",
    coins: 5500,
    price: 39.99,
    extra: 25,
    featured: false,
  },
];

const CoinsPage = (props: Props) => {
  const buyPackage = (packageItem: any) => {
    toast({
      title: "Package bought",
      description: `You bought the ${packageItem.name} package`,
    });
  };

  return (
    <>
      <PageTitle
        title="Buy Game Coins"
        subTitle="Purchase coins to unlock premium features and items"
      >
        <BtnClubFunds />
        <BtnPayment />
      </PageTitle>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Available Packages</CardTitle>
            <CardDescription>
              Choose a coin bundle to boost your club’s progress.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {COIN_PACKAGES.map((packageItem, index) => (
                <Card key={index}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center justify-center">
                      <Gem className="h-5 w-5 mr-2 text-amber-400" />
                      {packageItem.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="text-center mb-4">
                      <div className="text-3xl font-bold">
                        {formatNumber(packageItem.coins)}
                      </div>
                      <div className="text-sm text-muted-foreground">Coins</div>
                    </div>
                    <div className="text-center text-xl font-bold mb-4">
                      £{packageItem.price}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <ConfirmDialog
                      title="Confirm Buy Package"
                      description="Confirm your purchase to add these coins to your club balance instantly."
                      onConfirm={() => buyPackage(packageItem)}
                    >
                      <Button
                        variant={packageItem.featured ? "default" : "outline"}
                        className="w-full"
                      >
                        Buy Now
                      </Button>
                    </ConfirmDialog>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>What You Can Buy With Coins</CardTitle>
            <CardDescription>
              Enhance your gameplay with premium features and items
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 rounded-lg border">
                <div className="p-2 rounded-full bg-primary/10">
                  <Gift className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Premium Player Packs</h3>
                  <p className="text-sm text-muted-foreground">
                    Unlock high-rated players to strengthen your squad
                  </p>
                  <div className="mt-1 text-sm font-medium">From 300 coins</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg border">
                <div className="p-2 rounded-full bg-primary/10">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Training Boosts</h3>
                  <p className="text-sm text-muted-foreground">
                    Accelerate player development and attribute improvements
                  </p>
                  <div className="mt-1 text-sm font-medium">From 100 coins</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg border">
                <div className="p-2 rounded-full bg-primary/10">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Transfer Budget Boosts</h3>
                  <p className="text-sm text-muted-foreground">
                    Increase your transfer budget to sign better players
                  </p>
                  <div className="mt-1 text-sm font-medium">From 500 coins</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg border">
                <div className="p-2 rounded-full bg-primary/10">
                  <Info className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Advanced Scouting Reports</h3>
                  <p className="text-sm text-muted-foreground">
                    Get detailed information on potential transfer targets
                  </p>
                  <div className="mt-1 text-sm font-medium">From 200 coins</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Coin Balance</CardTitle>
            <CardDescription>
              Current balance and transaction history
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-6">
              <Gem className="h-10 w-10 text-amber-400 mx-auto mb-2" />
              <div className="text-4xl font-bold">250</div>
              <div className="text-sm text-muted-foreground">
                Available Coins
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Recent Transactions</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 rounded-md bg-muted/50">
                  <div>
                    <div className="font-medium">Starter Pack Purchase</div>
                    <div className="text-xs text-muted-foreground">
                      Mar 15, 2025
                    </div>
                  </div>
                  <div className="text-green-600 font-medium">+500</div>
                </div>
                <div className="flex justify-between items-center p-2 rounded-md bg-muted/50">
                  <div>
                    <div className="font-medium">Training Boost</div>
                    <div className="text-xs text-muted-foreground">
                      Mar 16, 2025
                    </div>
                  </div>
                  <div className="text-red-600 font-medium">-150</div>
                </div>
                <div className="flex justify-between items-center p-2 rounded-md bg-muted/50">
                  <div>
                    <div className="font-medium">Player Pack</div>
                    <div className="text-xs text-muted-foreground">
                      Mar 18, 2025
                    </div>
                  </div>
                  <div className="text-red-600 font-medium">-100</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CoinsPage;
