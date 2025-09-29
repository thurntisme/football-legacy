import React from "react";

import { ShoppingCart, Users, Zap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ItemsOverview = () => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle>Shop Overview</CardTitle>
        <CardDescription>
          Purchase items to improve your team and players
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center">
            <div className="mr-4 p-3 bg-primary/10 rounded-full">
              <ShoppingCart className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Available Coins</p>
              <p className="text-2xl font-bold">15,000</p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="mr-4 p-3 bg-primary/10 rounded-full">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Special Offers</p>
              <p className="text-2xl font-bold">3</p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="mr-4 p-3 bg-primary/10 rounded-full">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                Team Boosts Active
              </p>
              <p className="text-2xl font-bold">2</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ItemsOverview;
