import React from 'react';

import { CreditCard, Gem, Gift, Info, Zap } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type Props = {};

const BuyCoins = (props: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-3">
        <CardHeader>
          <CardTitle>Buy Game Coins</CardTitle>
          <CardDescription>
            Purchase coins to unlock premium features and items
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Coin Package 1 */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Gem className="h-5 w-5 mr-2 text-amber-400" />
                  Starter Pack
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold">500</div>
                  <div className="text-sm text-muted-foreground">Coins</div>
                </div>
                <div className="text-center text-xl font-bold mb-4">£4.99</div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Buy Now
                </Button>
              </CardFooter>
            </Card>

            {/* Coin Package 2 */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Gem className="h-5 w-5 mr-2 text-amber-400" />
                  Popular Pack
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold">1,200</div>
                  <div className="text-sm text-muted-foreground">Coins</div>
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

            {/* Coin Package 3 */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Gem className="h-5 w-5 mr-2 text-amber-400" />
                  Value Pack
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold">2,500</div>
                  <div className="text-sm text-muted-foreground">Coins</div>
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

            {/* Coin Package 4 */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Gem className="h-5 w-5 mr-2 text-amber-400" />
                  Premium Pack
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold">5,500</div>
                  <div className="text-sm text-muted-foreground">Coins</div>
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
            <div className="text-sm text-muted-foreground">Available Coins</div>
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
  );
};

export default BuyCoins;
