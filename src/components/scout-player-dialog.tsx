"use client";

import { useState } from "react";

import { Clock, DollarSign, Flag, Search, Sparkles, Star } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { players } from "@/constants/player";
import { toast } from "@/hooks/use-toast";
import { Player } from "@/types/football/player";

export function ScoutPlayerDialog() {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("search");
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [offerAmount, setOfferAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<Player[]>([]);
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [ageRange, setAgeRange] = useState([16, 40]);
  const [ratingRange, setRatingRange] = useState([60, 90]);
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
  const [selectedDetailPositions, setSelectedDetailPositions] = useState<
    string[]
  >([]);
  // Function to handle search
  const handleSearch = () => {
    setIsLoading(true);
    // Simulate API call with timeout
    setTimeout(() => {
      console.log("Searching for players with query:", searchQuery);
    }, 1000);
  };
  // Function to handle player selection
  const handleSelectPlayer = (player: Player) => {
    setSelectedPlayer(player);
    setOfferAmount(Math.round(player.marketValue / 1000000));
    setActiveTab("offer");
  };
  // Function to handle sending offer
  const handleSendOffer = () => {
    setIsLoading(true);
    // Simulate API call with timeout
    setTimeout(() => {
      selectedPlayer &&
        toast({
          title: "Scouting Offer Sent",
          description: `Your offer for ${selectedPlayer.name} has been sent.`,
        });
      setIsLoading(false);
      setOpen(false);
      // Reset form
      setSearchQuery("");
      setSelectedPlayer(null);
      setOfferAmount(0);
      setActiveTab("search");
    }, 1500);
  };
  // Function to format currency
  const formatCurrency = (value: number) => {
    return `£${(value / 1000000).toFixed(1)}M`;
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Search className="mr-2 h-4 w-4" />
          Scout New Player
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Scout New Player</DialogTitle>
          <DialogDescription>
            Search for players to scout and make transfer offers.
          </DialogDescription>
        </DialogHeader>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="search">Search & Filter</TabsTrigger>
            <TabsTrigger value="offer" disabled={!selectedPlayer}>
              Make Offer
            </TabsTrigger>
          </TabsList>
          <TabsContent value="search" className="space-y-4 mt-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="flex gap-2">
                  <Input
                    placeholder="Search by name, team, position..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleSearch} disabled={isLoading}>
                    {isLoading ? "Searching..." : "Search"}
                  </Button>
                </div>
                <div className="mt-6 space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Price Range (£M)</Label>
                      <span className="text-sm text-muted-foreground">
                        {priceRange[0]} - {priceRange[1]}
                      </span>
                    </div>
                    <Slider
                      defaultValue={priceRange}
                      max={100}
                      step={1}
                      value={priceRange}
                      onValueChange={setPriceRange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Position</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {["GK", "DEF", "MID", "FWD"].map((pos) => (
                        <Button
                          key={pos}
                          variant={
                            selectedPositions.includes(pos)
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          onClick={() => {
                            if (selectedPositions.includes(pos)) {
                              setSelectedPositions(
                                selectedPositions.filter((p) => p !== pos)
                              );
                            } else {
                              setSelectedPositions([...selectedPositions, pos]);
                            }
                          }}
                        >
                          {pos}
                        </Button>
                      ))}
                    </div>
                    <div className="grid grid-cols-4 gap-2 mt-1">
                      {[
                        "CB",
                        "LB/RB",
                        "CM",
                        "CAM/CDM",
                        "LW/RW",
                        "ST",
                        "CF",
                      ].map((pos) => (
                        <Button
                          key={pos}
                          variant={
                            selectedDetailPositions.includes(pos)
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          className="text-xs"
                          onClick={() => {
                            if (selectedDetailPositions.includes(pos)) {
                              setSelectedDetailPositions(
                                selectedDetailPositions.filter((p) => p !== pos)
                              );
                            } else {
                              setSelectedDetailPositions([
                                ...selectedDetailPositions,
                                pos,
                              ]);
                            }
                          }}
                        >
                          {pos}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Age Range</Label>
                      <span className="text-sm text-muted-foreground">
                        {ageRange[0]} - {ageRange[1]}
                      </span>
                    </div>
                    <Slider
                      defaultValue={ageRange}
                      min={16}
                      max={40}
                      step={1}
                      value={ageRange}
                      onValueChange={setAgeRange}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Rating Range</Label>
                      <span className="text-sm text-muted-foreground">
                        {ratingRange[0]} - {ratingRange[1]}
                      </span>
                    </div>
                    <Slider
                      defaultValue={ratingRange}
                      min={50}
                      max={99}
                      step={1}
                      value={ratingRange}
                      onValueChange={setRatingRange}
                    />
                  </div>
                </div>
              </div>
              <div className="flex-1 border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-4">
                <h3 className="text-sm font-medium mb-2">Search Results</h3>
                {isLoading ? (
                  <div className="flex justify-center items-center h-[300px]">
                    <p className="text-muted-foreground">
                      Searching for players...
                    </p>
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                    {searchResults.map((player) => (
                      <Card
                        key={player.id}
                        className="cursor-pointer hover:bg-accent/50 transition-colors"
                        onClick={() => handleSelectPlayer(player)}
                      >
                        <CardContent className="p-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold">
                              {player.rating}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">{player.name}</div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Badge variant="outline">
                                  {player.position}
                                </Badge>
                                <span>{player.age} yrs</span>
                                <span>{player.nationality}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">
                                {formatCurrency(player.marketValue)}
                              </div>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Avatar className="h-4 w-4">
                                  <AvatarImage
                                    src={"placeholder.svg?height=40&width=40"}
                                    alt={"logo"}
                                  />
                                  <AvatarFallback>Player's Team</AvatarFallback>
                                </Avatar>
                                Player's Team
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : searchQuery ? (
                  <div className="flex justify-center items-center h-[300px]">
                    <p className="text-muted-foreground">
                      No players found matching your criteria.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                    <h4 className="text-sm font-medium flex items-center gap-1 mb-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      Popular Players
                    </h4>
                    {players.map((player) => (
                      <Card
                        key={player.id}
                        className="cursor-pointer hover:bg-accent/50 transition-colors"
                        onClick={() => handleSelectPlayer(player)}
                      >
                        <CardContent className="p-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold">
                              {player.rating}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">{player.name}</div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Badge variant="outline">
                                  {player.position}
                                </Badge>
                                <span>{player.age} yrs</span>
                                <span>{player.nationality}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">
                                {formatCurrency(player.marketValue)}
                              </div>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Avatar className="h-4 w-4">
                                  <AvatarImage
                                    src={"placeholder.svg?height=40&width=40"}
                                    alt={"logo"}
                                  />
                                  <AvatarFallback>Player's Team</AvatarFallback>
                                </Avatar>
                                Player's Team
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="offer" className="space-y-4 mt-4">
            {selectedPlayer && (
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <Card>
                    <CardHeader>
                      <CardTitle>Player Details</CardTitle>
                      <CardDescription>
                        Review player information before making an offer
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center font-bold text-xl">
                          {selectedPlayer.rating}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">
                            {selectedPlayer.name}
                          </h3>
                          <div className="flex items-center gap-2 text-sm">
                            <Badge variant="outline">
                              {selectedPlayer.position}
                            </Badge>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" /> {selectedPlayer.age}{" "}
                              yrs
                            </span>
                            <span className="flex items-center gap-1">
                              <Flag className="h-3 w-3" />{" "}
                              {selectedPlayer.nationality}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                            <Avatar className="h-4 w-4">
                              <AvatarImage
                                src={"placeholder.svg?height=40&width=40"}
                                alt="Team Logo"
                              />
                              <AvatarFallback>Player's Team</AvatarFallback>
                            </Avatar>
                            Player's Team
                          </div>
                        </div>
                      </div>
                      <div className="pt-2">
                        <h4 className="text-sm font-medium mb-2">
                          Key Attributes
                        </h4>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                          {Object.entries(selectedPlayer.attributes).map(
                            ([key, value]) => (
                              <div
                                key={key}
                                className="flex justify-between items-center"
                              >
                                <span className="capitalize text-sm">
                                  {key}
                                </span>
                                <div className="flex items-center">
                                  <span className="font-medium">{value}</span>
                                  <div className="w-16 h-2 bg-primary/20 rounded-full ml-2">
                                    <div
                                      className="h-full bg-primary rounded-full"
                                      style={{ width: `${value}%` }}
                                    />
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="flex-1">
                  <Card>
                    <CardHeader>
                      <CardTitle>Make an Offer</CardTitle>
                      <CardDescription>
                        Send a transfer offer to random team
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="offer-amount">Offer Amount (£M)</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <Input
                            id="offer-amount"
                            type="number"
                            value={offerAmount}
                            onChange={(e) =>
                              setOfferAmount(Number(e.target.value))
                            }
                            min={1}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Market value:{" "}
                          {formatCurrency(selectedPlayer.marketValue)}
                        </p>
                      </div>
                      <div className="pt-2">
                        <Label>Offer Details</Label>
                        <div className="mt-2 space-y-2 text-sm">
                          <div className="flex justify-between p-2 border rounded-md">
                            <span>Transfer Fee</span>
                            <span className="font-medium">
                              {formatCurrency(offerAmount * 1000000)}
                            </span>
                          </div>
                          <div className="flex justify-between p-2 border rounded-md">
                            <span>Agent Fee (5%)</span>
                            <span className="font-medium">
                              {formatCurrency(offerAmount * 1000000 * 0.05)}
                            </span>
                          </div>
                          <div className="flex justify-between p-2 border rounded-md">
                            <span>Scouting Fee</span>
                            <span className="font-medium">
                              {formatCurrency(500000)}
                            </span>
                          </div>
                          <div className="flex justify-between p-2 border rounded-md bg-primary/5 font-medium">
                            <span>Total Cost</span>
                            <span>
                              {formatCurrency(
                                offerAmount * 1000000 +
                                  offerAmount * 1000000 * 0.05 +
                                  500000
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="pt-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Sparkles className="h-4 w-4 text-yellow-500" />
                          <span>
                            Scouting success rate: 65% - Offer may be accepted
                            or rejected
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button
                        variant="outline"
                        onClick={() => setActiveTab("search")}
                      >
                        Back to Search
                      </Button>
                      <Button
                        onClick={handleSendOffer}
                        disabled={isLoading || offerAmount <= 0}
                      >
                        {isLoading ? "Sending..." : "Send Offer"}
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
