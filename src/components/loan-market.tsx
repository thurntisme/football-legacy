'use client';

import { useState } from 'react';

import { Filter, Search, Star } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

type Player = {
  id: number;
  name: string;
  position: string;
  age: number;
  nationality: string;
  rating: number;
  club: string;
  loanFee: string;
  duration: string;
  wage: string;
};

export default function LoanMarket() {
  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [loanDialogOpen, setLoanDialogOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [loanDuration, setLoanDuration] = useState('6');
  const [loanFee, setLoanFee] = useState('');
  const [wageContribution, setWageContribution] = useState('50');
  const [optionToBuy, setOptionToBuy] = useState(false);
  const [buyoutPrice, setBuyoutPrice] = useState('');

  const players: Player[] = [
    {
      id: 1,
      name: 'Carlos Mendez',
      position: 'CAM',
      age: 23,
      nationality: 'Spain',
      rating: 82,
      club: 'Madrid FC',
      loanFee: '£1.2M',
      duration: 'Season',
      wage: '80%',
    },
    {
      id: 2,
      name: 'James Wilson',
      position: 'CB',
      age: 21,
      nationality: 'England',
      rating: 76,
      club: 'London United',
      loanFee: '£800K',
      duration: '6 Months',
      wage: '100%',
    },
    {
      id: 3,
      name: 'Luca Rossi',
      position: 'ST',
      age: 19,
      nationality: 'Italy',
      rating: 74,
      club: 'Turin FC',
      loanFee: '£500K',
      duration: 'Season',
      wage: '50%',
    },
    {
      id: 4,
      name: 'Tomas Hernandez',
      position: 'LW',
      age: 20,
      nationality: 'Argentina',
      rating: 75,
      club: 'Buenos Aires FC',
      loanFee: '£650K',
      duration: 'Season',
      wage: '70%',
    },
    {
      id: 5,
      name: 'Kevin Schmidt',
      position: 'CDM',
      age: 22,
      nationality: 'Germany',
      rating: 77,
      club: 'Munich City',
      loanFee: '£900K',
      duration: '6 Months',
      wage: '90%',
    },
    {
      id: 6,
      name: 'Alex Turner',
      position: 'RB',
      age: 20,
      nationality: 'England',
      rating: 73,
      club: 'Northern FC',
      loanFee: '£450K',
      duration: 'Season',
      wage: '60%',
    },
  ];

  return (
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
          <Select value={positionFilter} onValueChange={setPositionFilter}>
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
        {players.map((player) => (
          <Card key={player.id} className="overflow-hidden">
            <div className="flex">
              <div className="p-4 flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-bold">{player.name}</h3>
                      {player.rating >= 80 && (
                        <Star className="h-3 w-3 text-amber-400 ml-1" />
                      )}
                    </div>
                    <div className="flex items-center mt-1">
                      <Badge className="mr-1">{player.position}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {player.age} • {player.nationality}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      From: {player.club}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{player.rating}</div>
                    <div className="text-xs text-muted-foreground">Rating</div>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <div className="text-muted-foreground">Loan Fee</div>
                    <div className="font-medium">{player.loanFee}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Duration</div>
                    <div className="font-medium">{player.duration}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Wage</div>
                    <div className="font-medium">{player.wage}</div>
                  </div>
                </div>
                <div className="mt-3">
                  <Button
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      setSelectedPlayer(player);
                      setLoanDialogOpen(true);
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

      {/* Loan Dialog */}
      <Dialog open={loanDialogOpen} onOpenChange={setLoanDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Player to Loan List</DialogTitle>
            <DialogDescription>
              {selectedPlayer
                ? `Set loan terms for ${selectedPlayer.name}`
                : 'Set loan terms for your player'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="loan-duration" className="text-right">
                Duration
              </Label>
              <Select value={loanDuration} onValueChange={setLoanDuration}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6">6 Months</SelectItem>
                  <SelectItem value="12">1 Season</SelectItem>
                  <SelectItem value="18">18 Months</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="loan-fee" className="text-right">
                Loan Fee
              </Label>
              <div className="col-span-3 flex items-center">
                <span className="mr-2">£</span>
                <Input
                  id="loan-fee"
                  value={loanFee}
                  onChange={(e) => setLoanFee(e.target.value)}
                  placeholder="e.g. 500,000"
                  className="flex-1"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="wage-contribution" className="text-right">
                Wage %
              </Label>
              <Select
                value={wageContribution}
                onValueChange={setWageContribution}
              >
                <SelectTrigger className="col-span-3">
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="option-to-buy" className="text-right">
                Option to Buy
              </Label>
              <div className="col-span-3 flex items-center">
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
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="buyout-price" className="text-right">
                  Buyout Price
                </Label>
                <div className="col-span-3 flex items-center">
                  <span className="mr-2">£</span>
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
            <Button variant="outline" onClick={() => setLoanDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                toast({
                  title: 'Player added to loan list',
                  description: `${selectedPlayer?.name} has been added to your loan listings.`,
                });
                setLoanDialogOpen(false);
              }}
            >
              Add to Loan List
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
