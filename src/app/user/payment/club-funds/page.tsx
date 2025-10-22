import React from "react";

import {
  Coins,
  DollarSign,
  Link,
  ShoppingBag,
  TrendingUp,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {};

const TransferFundsPage = (props: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-3">
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="h-5 w-5 mr-2" />
            Transfer Market Funds
          </CardTitle>
          <CardDescription>
            Purchase funds specifically for the transfer market
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Transfer Fund Package 1 */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Coins className="h-5 w-5 mr-2 text-green-500" />
                  Small Budget
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold">$5M</div>
                  <div className="text-sm text-muted-foreground">
                    Transfer Budget
                  </div>
                </div>
                <div className="text-center text-xl font-bold mb-4">£4.99</div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Buy Now
                </Button>
              </CardFooter>
            </Card>

            {/* Transfer Fund Package 2 */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Coins className="h-5 w-5 mr-2 text-green-500" />
                  Medium Budget
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold">$15M</div>
                  <div className="text-sm text-muted-foreground">
                    Transfer Budget
                  </div>
                </div>
                <div className="text-center text-xl font-bold mb-4">£9.99</div>
                <Badge className="w-full justify-center" variant="secondary">
                  10% Extra
                </Badge>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Buy Now</Button>
              </CardFooter>
            </Card>

            {/* Transfer Fund Package 3 */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Coins className="h-5 w-5 mr-2 text-green-500" />
                  Large Budget
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold">$40M</div>
                  <div className="text-sm text-muted-foreground">
                    Transfer Budget
                  </div>
                </div>
                <div className="text-center text-xl font-bold mb-4">£19.99</div>
                <Badge className="w-full justify-center" variant="secondary">
                  15% Extra
                </Badge>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Buy Now
                </Button>
              </CardFooter>
            </Card>

            {/* Transfer Fund Package 4 */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Coins className="h-5 w-5 mr-2 text-green-500" />
                  Elite Budget
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold">$100M</div>
                  <div className="text-sm text-muted-foreground">
                    Transfer Budget
                  </div>
                </div>
                <div className="text-center text-xl font-bold mb-4">£39.99</div>
                <Badge className="w-full justify-center" variant="secondary">
                  25% Extra
                </Badge>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Buy Now
                </Button>
              </CardFooter>
            </Card>
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
                  Acquire top talent that would otherwise be out of your budget
                  range
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
                  Build for the future by signing promising youngsters with high
                  potential
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
  );
};

export default TransferFundsPage;
