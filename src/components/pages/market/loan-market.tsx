"use client";

import ContentWrapper from "../../common/content-wrapper";

import { useState } from "react";

import { Check, Filter, Search, Star, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { internalApi } from "@/lib/api/internal";
import { formatCurrency } from "@/lib/finance";
import { Player } from "@/types/player";
import { useQuery } from "@tanstack/react-query";

export default function LoanMarket() {
  const [searchTerm, setSearchTerm] = useState("");
  const [positionFilter, setPositionFilter] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [loanDuration, setLoanDuration] = useState("6");
  const [loanFee, setLoanFee] = useState("");
  const [wageContribution, setWageContribution] = useState("50");
  const [optionToBuy, setOptionToBuy] = useState(false);
  const [buyoutPrice, setBuyoutPrice] = useState("");

  const {
    data: players,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["market-players"],
    queryFn: async () => {
      const res = await internalApi.get("/market/list");
      return res.data;
    },
  });

  return (
    <ContentWrapper isLoading={isLoading} error={error}>
      <Card>
        <CardHeader>
          <CardTitle>Loan Listing</CardTitle>
          <CardDescription>
            Manage your transfer and loan listings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search players..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Select
                  value={positionFilter}
                  onValueChange={setPositionFilter}
                >
                  <SelectTrigger className="w-[130px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Positions</SelectItem>
                    <SelectItem value="gk">Goalkeepers</SelectItem>
                    <SelectItem value="def">Defenders</SelectItem>
                    <SelectItem value="mid">Midfielders</SelectItem>
                    <SelectItem value="att">Attackers</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="age">Age</SelectItem>
                    <SelectItem value="fee">Loan Fee</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {players.map((player: Player) => (
                <Card key={player.id} className="overflow-hidden">
                  <div className="flex">
                    <div className="p-4 flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-bold">{player.name}</h3>
                          </div>
                          <div className="flex items-center mt-1">
                            <Badge className="mr-1">{player.position}</Badge>
                            <span className="text-sm text-muted-foreground">
                              {player.age} • {player.nationality}
                            </span>
                          </div>
                        </div>
                        <div className="text-right pt-1">
                          <div className="font-bold">{player.rating}</div>
                          {player.rating >= 80 && (
                            <Star className="h-3 w-3 text-amber-400 ml-1" />
                          )}
                        </div>
                      </div>
                      <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
                        <div className="flex flex-col space-y-1">
                          <div className="text-muted-foreground">Loan Fee</div>
                          <div className="font-medium">
                            {formatCurrency(player?.loan?.fee)}
                          </div>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <div className="text-muted-foreground">Duration</div>
                          <div className="font-medium">
                            {player?.loan?.duration
                              ? `${player?.loan?.duration}M`
                              : "-"}
                          </div>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <div className="text-muted-foreground">Wage</div>
                          <div className="font-medium">
                            {formatCurrency(player?.loan?.wage)}
                          </div>
                        </div>
                      </div>
                      <div className="mt-3">
                        <Button
                          size="sm"
                          className="w-full"
                          onClick={() => {
                            setSelectedPlayer(player);
                            setIsDialogOpen(true);
                          }}
                        >
                          Make Loan Offer
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Loan Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Player to Loan List</DialogTitle>
            <DialogDescription>
              {selectedPlayer
                ? `Set loan terms for ${selectedPlayer.name}`
                : "Set loan terms for your player"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="loan-duration" className="text-right">
                Duration
              </Label>
              <Select value={loanDuration} onValueChange={setLoanDuration}>
                <SelectTrigger className="col-span-2">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6">6 Months</SelectItem>
                  <SelectItem value="12">12 Months</SelectItem>
                  <SelectItem value="18">18 Months</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="loan-fee" className="text-right">
                Loan Fee
              </Label>
              <div className="col-span-2 flex items-center">
                <Input
                  id="loan-fee"
                  value={loanFee}
                  onChange={(e) => setLoanFee(e.target.value)}
                  placeholder="e.g. 500,000"
                  className="flex-1"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="wage-contribution" className="text-right">
                Wage %
              </Label>
              <Select
                value={wageContribution}
                onValueChange={setWageContribution}
              >
                <SelectTrigger className="col-span-2">
                  <SelectValue placeholder="Select wage contribution" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">
                    0% (Borrowing club pays all)
                  </SelectItem>
                  <SelectItem value="25">25%</SelectItem>
                  <SelectItem value="50">50%</SelectItem>
                  <SelectItem value="75">75%</SelectItem>
                  <SelectItem value="100">100% (You pay all)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="option-to-buy" className="text-right">
                Option to Buy
              </Label>
              <div className="col-span-2 flex items-center">
                <input
                  type="checkbox"
                  id="option-to-buy"
                  checked={optionToBuy}
                  onChange={(e) => setOptionToBuy(e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="option-to-buy">
                  Include option to buy clause
                </label>
              </div>
            </div>
            {optionToBuy && (
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="buyout-price" className="text-right">
                  Buyout Price
                </Label>
                <div className="col-span-2 flex items-center">
                  <Input
                    id="buyout-price"
                    value={buyoutPrice}
                    onChange={(e) => setBuyoutPrice(e.target.value)}
                    placeholder="e.g. 5,000,000"
                    className="flex-1"
                  />
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              <X className="h-4 w-4" />
              Cancel
            </Button>
            <Button
              onClick={() => {
                toast({
                  title: "Player added to loan list",
                  description: `${selectedPlayer?.name} has been added to your loan listings.`,
                });
                setIsDialogOpen(false);
              }}
            >
              <Check className="h-4 w-4" />
              Add to Loan List
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ContentWrapper>
  );
}
