"use client";

import React from "react";

import {
  Banknote,
  DollarSign,
  Link,
  ShoppingBag,
  TrendingUp,
  Zap,
} from "lucide-react";

import BtnBuyCoins from "@/components/common/btn-buy-coins";
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
import { formatCurrency } from "@/lib/finance";

type Props = {};

const FUND_PACKAGES = [
  {
    name: "Small Budget",
    budget: 5000000,
    price: 4.99,
    extra: 0,
    featured: false,
  },
  {
    name: "Medium Budget",
    budget: 15000000,
    price: 9.99,
    extra: 0,
    featured: true,
  },
  {
    name: "Large Budget",
    budget: 40000000,
    price: 19.99,
    extra: 0,
    featured: false,
  },
  {
    name: "Elite Budget",
    budget: 100000000,
    price: 39.99,
    extra: 0,
    featured: false,
  },
];

const TransferFundsPage = (props: Props) => {
  const buyPackage = (packageItem: any) => {
    toast({
      title: "Package bought",
      description: `You bought the ${packageItem.name} package`,
    });
  };
  return (
    <>
      <PageTitle
        title="Buy Club Funds"
        subTitle="Purchase funds specifically for boosting your club’s finances and operations."
      >
        <BtnBuyCoins />
        <BtnPayment />
      </PageTitle>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center">
              Available Packages
            </CardTitle>
            <CardDescription>
              Select a package to strengthen your club’s financial position.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {FUND_PACKAGES.map((packageItem, index) => (
                <Card key={index}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center justify-center">
                      <Banknote className="h-5 w-5 mr-2 text-green-500" />
                      {packageItem.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="text-center mb-4">
                      <div className="text-3xl font-bold">
                        {formatCurrency(packageItem.budget)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Club Budget
                      </div>
                    </div>
                    <div className="text-center text-xl font-bold mb-4">
                      £{packageItem.price}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <ConfirmDialog
                      title="Confirm Buy Package"
                      description="Confirm your purchase to add these funds to your club’s account instantly."
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
            <CardTitle>Transfer Market Benefits</CardTitle>
            <CardDescription>
              How additional funds can improve your team
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 rounded-lg border">
                <div className="p-2 rounded-full bg-primary/10">
                  <ShoppingBag className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Sign Star Players</h3>
                  <p className="text-sm text-muted-foreground">
                    Acquire top talent that would otherwise be out of your
                    budget range
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg border">
                <div className="p-2 rounded-full bg-primary/10">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Invest in Young Talent</h3>
                  <p className="text-sm text-muted-foreground">
                    Build for the future by signing promising youngsters with
                    high potential
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg border">
                <div className="p-2 rounded-full bg-primary/10">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Quick Squad Improvement</h3>
                  <p className="text-sm text-muted-foreground">
                    Immediately strengthen weak positions without waiting to
                    generate funds
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg border">
                <div className="p-2 rounded-full bg-primary/10">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Wage Budget Increase</h3>
                  <p className="text-sm text-muted-foreground">
                    Each package also includes a proportional increase to your
                    wage budget
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Club Finances</CardTitle>
            <CardDescription>
              Your available transfer and wage budgets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <h3 className="font-medium">Transfer Budget</h3>
                  <span className="font-bold text-green-600">$12,500,000</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: "25%" }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  25% of average top division club
                </p>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <h3 className="font-medium">Wage Budget</h3>
                  <span className="font-bold text-amber-600">
                    $120,000 / week
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="bg-amber-500 h-2 rounded-full"
                    style={{ width: "30%" }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  30% of average top division club
                </p>
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-medium mb-2">Recent Transfer Activity</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 rounded-md bg-muted/50">
                    <div>
                      <div className="font-medium">James Wilson (OUT)</div>
                      <div className="text-xs text-muted-foreground">
                        To Manchester City
                      </div>
                    </div>
                    <div className="text-green-600 font-medium">+$8.5M</div>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-md bg-muted/50">
                    <div>
                      <div className="font-medium">Carlos Mendez (IN)</div>
                      <div className="text-xs text-muted-foreground">
                        From Atletico Madrid
                      </div>
                    </div>
                    <div className="text-red-600 font-medium">-$12M</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/market">Visit Transfer Market</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default TransferFundsPage;
