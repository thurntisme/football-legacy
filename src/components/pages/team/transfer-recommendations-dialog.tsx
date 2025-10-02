"use client";

import { useState } from "react";

import {
  ArrowRight,
  ArrowUpRight,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  UserSearch,
  X,
} from "lucide-react";
import Link from "next/link";

import ContentWrapper from "@/components/common/content-wrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FOOTBALL_STATS_URL } from "@/constants/site";
import { toast } from "@/hooks/use-toast";

type Player = {
  id: number;
  name: string;
  position: string;
  age: number;
  nationality: string;
  club: string;
  rating: number;
  price: number;
  image: string;
  comparisonScore?: number;
};
type TransferRecommendationsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rcmPlayers: recommendationProps;
  isLoading: boolean;
  error: Error | null;
};
type recommendationProps = {
  similar?: Player[];
  upgrade?: Player[];
  bargain?: Player[];
  young?: Player[];
};

export default function TransferRecommendationsDialog({
  open,
  onOpenChange,
  rcmPlayers,
  isLoading,
  error,
}: TransferRecommendationsDialogProps) {
  const [selectedTab, setSelectedTab] = useState("similar");

  const handleViewInMarket = (player: Player) => {
    // In a real app, this would navigate to the transfer market with this player pre-selected
    toast({
      title: "Viewing Player in Market",
      description: `Navigating to ${player.name} in the transfer market.`,
    });
    onOpenChange(false);
  };

  const renderPlayerCard = (player: Player) => (
    <Card key={player.id} className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <img
              src={player.image || "/placeholder.svg"}
              alt={player.name}
              className="w-12 h-12 rounded-full border-2 border-primary/20"
            />
            <div>
              <h3 className="font-bold">{player.name}</h3>
              <div className="flex items-center text-sm text-muted-foreground">
                <Badge className="mr-2">{player.position}</Badge>
                <span>{player.age} yrs</span>
              </div>
            </div>
            <Badge variant="outline" className="ml-auto">
              {player.rating}
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="text-sm">
              <span className="text-muted-foreground">Club:</span> {player.club}
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Nation:</span>{" "}
              {player.nationality}
            </div>
          </div>
          <div className="mb-3">
            <div className="flex justify-between text-sm mb-1">
              <span>Comparison Score</span>
              <span className="font-medium">{player.comparisonScore}%</span>
            </div>
            <Progress
              value={player.comparisonScore}
              className={`h-2 ${
                player.comparisonScore
                  ? player.comparisonScore > 100
                    ? "bg-green-500"
                    : player.comparisonScore > 80
                      ? "bg-blue-500"
                      : "bg-amber-500"
                  : ""
              }`}
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="font-bold text-lg">
              £{(player.price / 1000000).toFixed(1)}M
            </div>
            <Button size="sm" onClick={() => handleViewInMarket(player)}>
              <UserSearch className="h-4 w-4" />
              View in Market
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const handleOpenChange = (open: boolean) => {
    onOpenChange(open);
    if (!open) {
      setSelectedTab("similar");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Transfer Market Recommendations</DialogTitle>
          <DialogDescription>
            Recommended players for your team based on your current squad
          </DialogDescription>
        </DialogHeader>
        <ContentWrapper isLoading={isLoading} error={error}>
          <Tabs
            defaultValue="similar"
            value={selectedTab}
            onValueChange={setSelectedTab}
          >
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger
                value="similar"
                className="flex items-center justify-center"
              >
                <ArrowRight className="h-4 w-4 mr-2" />
                Similar Players
              </TabsTrigger>
              <TabsTrigger
                value="upgrade"
                className="flex items-center justify-center"
              >
                <ArrowUpRight className="h-4 w-4 mr-2" />
                Upgrades
              </TabsTrigger>
              <TabsTrigger
                value="bargain"
                className="flex items-center justify-center"
              >
                <DollarSign className="h-4 w-4 mr-2" />
                Bargains
              </TabsTrigger>
              <TabsTrigger
                value="young"
                className="flex items-center justify-center"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Young Talent
              </TabsTrigger>
            </TabsList>
            <TabsContent value="similar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rcmPlayers?.similar?.map(renderPlayerCard)}
              </div>
            </TabsContent>
            <TabsContent value="upgrade">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rcmPlayers?.upgrade?.map(renderPlayerCard)}
              </div>
            </TabsContent>
            <TabsContent value="bargain">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rcmPlayers?.bargain?.map(renderPlayerCard)}
              </div>
            </TabsContent>
            <TabsContent value="young">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rcmPlayers?.young?.map(renderPlayerCard)}
              </div>
            </TabsContent>
          </Tabs>
        </ContentWrapper>
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            <X className="h-4 w-4" />
            Close
          </Button>
          <Button asChild>
            <Link href={`${FOOTBALL_STATS_URL}/game/market`}>
              <ShoppingCart className="h-4 w-4" />
              Go to Transfer Market
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
