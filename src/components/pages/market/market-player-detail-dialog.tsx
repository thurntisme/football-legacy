import React from "react";

import {
  Calendar,
  Flag,
  Footprints,
  Info,
  Ruler,
  ShoppingCart,
  Target,
  TrendingUp,
  Trophy,
  Users,
  Weight,
  X,
} from "lucide-react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/finance";
import { Player } from "@/types/player";
import { Separator } from "@radix-ui/react-dropdown-menu";

import ConfirmPurchasePlayerDialog from "./confirm-purchase-player-dialog";

type Props = {
  player: Player;
  selectedPlayer: Player | null;
  isPossibleToPurchase: boolean;
  userBudget: number;
  onSelectPlayer: (player: Player) => void;
  purchasePlayer: (player: Player) => void;
};

const MarketPlayerDetailDialog = ({
  player,
  selectedPlayer,
  isPossibleToPurchase,
  userBudget,
  onSelectPlayer,
  purchasePlayer,
}: Props) => {
  const generatePurchaseReasons = (player: Player) => {
    const reasons = [];

    if (player.age < 24) {
      reasons.push(
        "Young player with high potential for growth and development",
      );
    }

    if (player.rating >= 82) {
      reasons.push(
        "World-class ability that can immediately improve your squad",
      );
    }

    if (player.position === "ST" || player.position === "CF") {
      reasons.push(
        "Proven goalscorer who can provide consistent attacking threat",
      );
    } else if (player.position === "CAM" || player.position === "CM") {
      reasons.push("Creative midfielder who can control the tempo of matches");
    } else if (player.position === "CB") {
      reasons.push("Solid defensive presence to strengthen your backline");
    } else if (player.position === "GK") {
      reasons.push("Reliable goalkeeper with excellent shot-stopping ability");
    }

    const marketValueRatio = player.marketValue / (player.rating * 500000);
    if (marketValueRatio < 0.8) {
      reasons.push("Excellent value for money compared to similar players");
    }

    if (player.age >= 26 && player.age <= 29) {
      reasons.push("In prime playing years with peak performance expected");
    }

    reasons.push("Low injury history and excellent fitness record");

    if (player.rating >= 80) {
      reasons.push("Strong marketing potential to increase club revenue");
    }

    return reasons.slice(0, 4);
  };

  const CLUBS = [
    "Manchester City",
    "Real Madrid",
    "Bayern Munich",
    "Paris Saint-Germain",
    "Liverpool",
    "Chelsea",
    "Barcelona",
    "Juventus",
    "Arsenal",
    "Tottenham",
    "Inter Milan",
    "AC Milan",
    "Atletico Madrid",
  ];

  const generateCompetingOffers = (player: Player) => {
    const offers = [];
    const numOffers = Math.floor(Math.random() * 3) + 3; // 3-5 offers

    for (let i = 0; i < numOffers; i++) {
      const club = CLUBS[Math.floor(Math.random() * CLUBS.length)];
      const offerMultiplier = 0.8 + Math.random() * 0.5; // 80% to 130% of asking price
      const offer = Math.round(player.marketValue * offerMultiplier);
      const weeklyWage = Math.round((offer / 1000000) * 15000); // Rough wage calculation

      offers.push({
        club,
        transferFee: offer,
        weeklyWage,
        contractLength: Math.floor(Math.random() * 3) + 3, // 3-5 years
      });
    }

    return offers.sort((a, b) => b.transferFee - a.transferFee).slice(0, 5);
  };
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            size="icon"
            onClick={() => onSelectPlayer(player)}
            className="w-8 h-8"
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          {selectedPlayer && (
            <>
              <AlertDialogHeader>
                <AlertDialogTitle className="text-2xl">
                  {selectedPlayer.name}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Transfer Market - Player Details
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column: Player Summary Info */}
                <div className="space-y-6">
                  <div className="flex justify-center">
                    <img
                      src={selectedPlayer.avatar || "/placeholder.svg"}
                      alt={selectedPlayer.name}
                      className="w-32 h-32 rounded-full border-4 border-primary/20"
                    />
                  </div>
                  <div className="text-center flex flex-col space-y-2">
                    <h2 className="text-2xl font-bold">
                      {selectedPlayer.name}
                    </h2>
                    <div className="text-center">
                      <div className="flex flex-wrap justify-center gap-1 mt-1">
                        {selectedPlayer.playablePositions.map((pos) => (
                          <Badge
                            key={pos}
                            variant="outline"
                            className={
                              pos === selectedPlayer.position
                                ? "border-primary"
                                : ""
                            }
                          >
                            {pos}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 md:w-[80%] mx-auto">
                      <div className="flex items-center">
                        <Flag className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{selectedPlayer.nationality}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{selectedPlayer.age} yrs</span>
                      </div>
                      <div className="flex items-center">
                        <Footprints className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>
                          {selectedPlayer.foot.charAt(0).toUpperCase() +
                            selectedPlayer.foot.slice(1)}{" "}
                          foot
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Ruler className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{selectedPlayer.height} cm</span>
                      </div>
                      <div className="flex items-center">
                        <Weight className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{selectedPlayer.weight} kg</span>
                      </div>
                      <div className="flex items-center">
                        <Trophy className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{selectedPlayer.internationalCaps} caps</span>
                      </div>
                    </div>
                  </div>
                  <Card className="w-full ">
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            Personality:
                          </span>
                          <span className="font-medium">
                            {selectedPlayer.personality}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            Preferred Role:
                          </span>
                          <span className="font-medium">
                            {selectedPlayer.preferredRole}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            Morale:
                          </span>
                          <span
                            className={`font-medium ${selectedPlayer.morale === "high" ? "text-green-500" : selectedPlayer.morale === "low" ? "text-red-500" : ""}`}
                          >
                            {selectedPlayer.morale.charAt(0).toUpperCase() +
                              selectedPlayer.morale.slice(1)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            Injury Prone:
                          </span>
                          <span
                            className={`font-medium ${selectedPlayer.injuryProne ? "text-red-500" : "text-green-500"}`}
                          >
                            {selectedPlayer.injuryProne ? "Yes" : "No"}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-4">
                        <Target className="h-5 w-5 text-green-600" />
                        <h3 className="font-semibold text-lg">
                          Why Purchase This Player?
                        </h3>
                      </div>
                      <ul className="space-y-3">
                        {generatePurchaseReasons(selectedPlayer).map(
                          (reason, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                              <span className="text-sm">{reason}</span>
                            </li>
                          ),
                        )}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Right Column: Market Info */}
                <div className="space-y-6">
                  <Card className="bg-primary/5">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold text-lg">Market Value</h3>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">
                            Transfer Fee:
                          </span>
                          <span className="text-2xl font-bold text-primary">
                            {formatCurrency(selectedPlayer.marketValue)}
                          </span>
                        </div>
                        <Separator />
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">
                            Weekly Salary:
                          </span>
                          <span className="font-semibold">
                            {formatCurrency(selectedPlayer.salary)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">
                            Contract Length:
                          </span>
                          <span className="font-semibold">
                            {Math.floor(Math.random() * 3) + 3} years
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">
                            Agent Fee:
                          </span>
                          <span className="font-semibold">
                            {formatCurrency(selectedPlayer.salary)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-4">
                        <Users className="h-5 w-5 text-orange-600" />
                        <h3 className="font-semibold text-lg">
                          Competing Offers
                        </h3>
                      </div>
                      <div className="space-y-3">
                        {generateCompetingOffers(selectedPlayer).map(
                          (offer, index) => (
                            <div
                              key={index}
                              className={`p-3 rounded-lg border-2 ${index === 0 ? "border-orange-600 bg-orange-50 dark:bg-orange-950/20" : "border-muted"}`}
                            >
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <div className="font-semibold flex items-center gap-2">
                                    {offer.club}
                                    {index === 0 && (
                                      <Badge
                                        variant="destructive"
                                        className="text-xs"
                                      >
                                        Highest Bid
                                      </Badge>
                                    )}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {offer.contractLength} year contract
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="font-bold text-primary">
                                    £{(offer.transferFee / 1000000).toFixed(1)}M
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    Transfer Fee
                                  </div>
                                </div>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Weekly Wage: £
                                {offer.weeklyWage.toLocaleString()}
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                      <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
                        <p className="text-sm text-amber-900 dark:text-amber-100">
                          <strong>⚠️ High Competition:</strong> Multiple clubs
                          are interested in this player. Act fast to secure the
                          transfer!
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>
                  <X className="h-4 w-4" />
                  Close
                </AlertDialogCancel>
                {isPossibleToPurchase && (
                  <ConfirmPurchasePlayerDialog
                    isPossibleToPurchase={isPossibleToPurchase}
                    player={player}
                    userBudget={userBudget}
                    purchasePlayer={purchasePlayer}
                  >
                    <Button size="icon" className="w-fit h-10 px-4 py-2">
                      <ShoppingCart className="h-4 w-4" />
                      Confirm Purchase
                    </Button>
                  </ConfirmPurchasePlayerDialog>
                )}
              </AlertDialogFooter>
            </>
          )}
        </AlertDialogContent>
      </AlertDialog>
      {/* <ConfirmPurchasePlayerDialog
        isPossibleToPurchase={isPossibleToPurchase}
        player={player}
        userBudget={userBudget}
        purchasePlayer={purchasePlayer}
      >
        <Button size="icon" className="w-8 h-8">
          <ShoppingCart className="h-4 w-4" />
        </Button>
      </ConfirmPurchasePlayerDialog> */}
    </>
  );
};

export default MarketPlayerDetailDialog;
