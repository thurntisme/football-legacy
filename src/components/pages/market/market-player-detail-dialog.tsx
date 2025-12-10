import React, { useEffect, useState } from "react";

import {
  Calendar,
  Flag,
  Footprints,
  Ruler,
  ShoppingCart,
  TrendingUp,
  Trophy,
  Users,
  Weight,
  X,
  Loader2,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { apiClient } from "@/lib/api/api";
import { formatCurrency } from "@/lib/finance";
import { getPlayerAge } from "@/lib/player";
import { Player } from "@/types/player";



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
  const [bidAmount, setBidAmount] = useState<string>("0");
  const [weeklyWage, setWeeklyWage] = useState<string>("0");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bidWarning, setBidWarning] = useState("");
  const [wageWarning, setWageWarning] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (selectedPlayer) {
      setBidAmount(selectedPlayer.marketValue.toString());
      setWeeklyWage(selectedPlayer.salary.toString());
    }
  }, [selectedPlayer]);

  const handleBidAmountChange = (value: string) => {
    setBidAmount(value);
    if (!selectedPlayer) return;

    const bidAmountNum = parseFloat(value);
    if (!isNaN(bidAmountNum) && bidAmountNum > 0) {
      if (bidAmountNum < selectedPlayer.marketValue) {
        setBidWarning(
          `⚠️ Your bid is below market value (${formatCurrency(selectedPlayer.marketValue)}). This may be rejected.`
        );
      } else {
        setBidWarning("");
      }
    } else {
      setBidWarning("");
    }
  };

  const handleWageChange = (value: string) => {
    setWeeklyWage(value);
    if (!selectedPlayer) return;

    const weeklyWageNum = parseFloat(value);
    if (!isNaN(weeklyWageNum) && weeklyWageNum > 0) {
      if (weeklyWageNum < selectedPlayer.salary) {
        setWageWarning(
          `⚠️ Your offer is below current salary (${formatCurrency(selectedPlayer.salary)}). Player may reject.`
        );
      } else {
        setWageWarning("");
      }
    } else {
      setWageWarning("");
    }
  };

  const handlePlaceBid = async () => {
    if (!selectedPlayer) return;

    if (!bidAmount || !weeklyWage) {
      toast({
        title: "Error",
        description: "Please enter bid amount and weekly wage offer",
        variant: "destructive",
      });
      return;
    }

    const bidAmountNum = parseFloat(bidAmount);
    const weeklyWageNum = parseFloat(weeklyWage);

    if (isNaN(bidAmountNum) || bidAmountNum <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid bid amount",
        variant: "destructive",
      });
      return;
    }

    if (isNaN(weeklyWageNum) || weeklyWageNum <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid weekly wage offer",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      console.log(selectedPlayer)
      const response = await apiClient.post("api/transfer/bids", {
        player_instance_uuid: selectedPlayer.uuid,
        club_id: selectedPlayer.clubId || 1,
        bid_amount: bidAmountNum,
        weekly_wage_offer: weeklyWageNum,
        ...(notes && { notes }),
      });

      if (response.data.success) {
        toast({
          title: "Success!",
          description: response.data.message || "Bid placed successfully",
        });

        // Reset form
        setBidAmount("");
        setWeeklyWage("");
        setNotes("");

        // Close the dialog
        setIsOpen(false);
      } else {
        toast({
          title: "Error",
          description: response.data.message || "Failed to place bid",
          variant: "destructive",
        });
      }
    } catch (err: any) {
      console.error("Error placing bid:", err);
      toast({
        title: "Error",
        description: err.response?.data?.message || "Failed to place bid",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogTrigger asChild>
          <Button
            size="icon"
            onClick={() => {
              onSelectPlayer(player);
              setIsOpen(true);
            }}
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

                  <Card className="bg-blue-50 dark:bg-blue-950/20">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-4">
                        <ShoppingCart className="h-5 w-5 text-blue-600" />
                        <h3 className="font-semibold text-lg">Place Your Bid</h3>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="bid-amount">Bid Amount</Label>
                          <Input
                            id="bid-amount"
                            type="number"
                            placeholder="Enter bid amount"
                            value={bidAmount}
                            onChange={(e) => handleBidAmountChange(e.target.value)}
                            disabled={isSubmitting}
                          />
                          <p className="text-xs text-muted-foreground">
                            Market Value: {formatCurrency(selectedPlayer.marketValue)}
                          </p>
                          {bidWarning && (
                            <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                              {bidWarning}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="weekly-wage">Weekly Wage Offer</Label>
                          <Input
                            id="weekly-wage"
                            type="number"
                            placeholder="Enter weekly wage offer"
                            value={weeklyWage}
                            onChange={(e) => handleWageChange(e.target.value)}
                            disabled={isSubmitting}
                          />
                          <p className="text-xs text-muted-foreground">
                            Current Salary: {formatCurrency(selectedPlayer.salary)}
                          </p>
                          {wageWarning && (
                            <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                              {wageWarning}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="notes">Notes (Optional)</Label>
                          <Textarea
                            id="notes"
                            placeholder="Add any notes about this bid..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            disabled={isSubmitting}
                            rows={3}
                          />
                        </div>

                        <Button
                          onClick={handlePlaceBid}
                          disabled={isSubmitting}
                          className="w-full"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                              Placing Bid...
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              Confirm Purchase
                            </>
                          )}
                        </Button>
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
              </AlertDialogFooter>
            </>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default MarketPlayerDetailDialog;
