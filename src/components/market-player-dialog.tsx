import React from 'react';

import { ShoppingCart, Star, X } from 'lucide-react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { convertNumberWithSeparator } from '@/lib/utils';
import { Player } from '@/types/football/player';

type Props = {
  showPlayerDetails: boolean;
  setShowPlayerDetails: (open: boolean) => void;
  selectedPlayer: Player | null;
  favorites: Set<string>;
  handleToggleFavorite: (playerId: string) => void;
  handleBuyPlayer: (player: Player) => void;
};

const MarketPlayerDialog = ({
  showPlayerDetails,
  setShowPlayerDetails,
  selectedPlayer,
  favorites,
  handleToggleFavorite,
  handleBuyPlayer,
}: Props) => {
  return (
    <Dialog open={showPlayerDetails} onOpenChange={setShowPlayerDetails}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        {selectedPlayer && (
          <>
            <DialogHeader>
              <div className="flex justify-between items-start">
                <DialogTitle>Player Details</DialogTitle>
              </div>
              <DialogDescription>
                Detailed information about {selectedPlayer?.name}
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <img
                      src={selectedPlayer.avatar_url || '/placeholder.svg'}
                      alt={selectedPlayer.name}
                      className="w-40 h-40 rounded-full border-2 border-primary/20 object-cover"
                    />
                    <div className="absolute bottom-[-8px] left-[50%] translate-x-[-50%]">
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`h-8 w-8 rounded-full ${selectedPlayer && favorites.has(selectedPlayer.uuid) ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}
                        onClick={(e) =>
                          selectedPlayer &&
                          handleToggleFavorite(selectedPlayer.uuid)
                        }
                      >
                        <Star
                          className={`h-4 w-4 ${selectedPlayer && favorites.has(selectedPlayer.uuid) ? 'fill-primary' : ''}`}
                        />
                      </Button>
                    </div>
                  </div>
                  <div className="text-center">
                    <h2 className="text-xl font-bold">{selectedPlayer.name}</h2>
                    <div className="flex items-center justify-center gap-2 mt-1">
                      <Badge>{selectedPlayer.position}</Badge>
                      <Badge variant="outline">
                        {selectedPlayer.nationality}
                      </Badge>
                      <Badge variant="secondary">
                        {selectedPlayer.age} years
                      </Badge>
                    </div>
                    <div className="mt-2 text-muted-foreground">
                      Currently at {selectedPlayer.club}
                    </div>
                  </div>

                  <div className="w-full space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">
                        Player Rating
                      </h3>
                      <div className="flex items-center justify-center">
                        <div className="flex items-center mr-2">
                          {[
                            ...Array(Math.floor(selectedPlayer.rating / 20)),
                          ].map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 fill-amber-400 text-amber-400"
                            />
                          ))}
                          {[
                            ...Array(
                              5 - Math.floor(selectedPlayer.rating / 20)
                            ),
                          ].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-muted" />
                          ))}
                        </div>
                        <span className="font-bold">
                          {selectedPlayer.rating}/100
                        </span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-2">Transfer Fee</h3>
                      <p className="text-2xl font-bold text-center">
                        £
                        {convertNumberWithSeparator(
                          selectedPlayer.market_value
                        )}
                      </p>
                      <p className="text-sm text-muted-foreground text-center">
                        Estimated weekly wage: £
                        {convertNumberWithSeparator(selectedPlayer.salary)}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-2">Physical</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-muted/50 p-2 rounded text-center">
                          <div className="text-xs text-muted-foreground">
                            Height
                          </div>
                          <div className="font-medium">
                            {selectedPlayer.height} cm
                          </div>
                        </div>
                        <div className="bg-muted/50 p-2 rounded text-center">
                          <div className="text-xs text-muted-foreground">
                            Weight
                          </div>
                          <div className="font-medium">
                            {selectedPlayer.weight} kg
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">
                      Player Attributes
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Pace</span>
                            <span className="text-sm font-medium">
                              {70 + Math.floor(Math.random() * 20)}
                            </span>
                          </div>
                          <div className="w-full bg-secondary h-2 rounded-full">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{
                                width: `${70 + Math.floor(Math.random() * 20)}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Shooting</span>
                            <span className="text-sm font-medium">
                              {65 + Math.floor(Math.random() * 25)}
                            </span>
                          </div>
                          <div className="w-full bg-secondary h-2 rounded-full">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{
                                width: `${65 + Math.floor(Math.random() * 25)}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Passing</span>
                            <span className="text-sm font-medium">
                              {60 + Math.floor(Math.random() * 30)}
                            </span>
                          </div>
                          <div className="w-full bg-secondary h-2 rounded-full">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{
                                width: `${60 + Math.floor(Math.random() * 30)}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Dribbling</span>
                            <span className="text-sm font-medium">
                              {65 + Math.floor(Math.random() * 25)}
                            </span>
                          </div>
                          <div className="w-full bg-secondary h-2 rounded-full">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{
                                width: `${65 + Math.floor(Math.random() * 25)}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Defending</span>
                            <span className="text-sm font-medium">
                              {50 + Math.floor(Math.random() * 40)}
                            </span>
                          </div>
                          <div className="w-full bg-secondary h-2 rounded-full">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{
                                width: `${50 + Math.floor(Math.random() * 40)}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Physical</span>
                            <span className="text-sm font-medium">
                              {60 + Math.floor(Math.random() * 30)}
                            </span>
                          </div>
                          <div className="w-full bg-secondary h-2 rounded-full">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{
                                width: `${60 + Math.floor(Math.random() * 30)}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Vision</span>
                            <span className="text-sm font-medium">
                              {55 + Math.floor(Math.random() * 35)}
                            </span>
                          </div>
                          <div className="w-full bg-secondary h-2 rounded-full">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{
                                width: `${55 + Math.floor(Math.random() * 35)}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Potential</span>
                            <span className="text-sm font-medium">
                              {selectedPlayer.rating +
                                Math.floor(Math.random() * 10)}
                            </span>
                          </div>
                          <div className="w-full bg-secondary h-2 rounded-full">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{
                                width: `${selectedPlayer.rating + Math.floor(Math.random() * 10)}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Scout Report</h3>
                    <div className="p-4 bg-muted/30 rounded-md">
                      <p className="text-sm">
                        {selectedPlayer.name} is a talented{' '}
                        {selectedPlayer.position} with good technical abilities.
                        At {selectedPlayer.age} years old, {selectedPlayer.name}{' '}
                        is{' '}
                        {selectedPlayer.age < 25
                          ? 'still developing and has great potential'
                          : selectedPlayer.age < 30
                            ? 'in the prime of their career'
                            : 'an experienced player with valuable leadership qualities'}
                        .
                        {selectedPlayer.rating > 82
                          ? ' This player would be a star signing for your team.'
                          : selectedPlayer.rating > 78
                            ? ' Would be a valuable addition to your squad.'
                            : ' Could provide good squad depth.'}
                      </p>
                      <p className="text-sm mt-2">
                        {selectedPlayer.position === 'ST' ||
                        selectedPlayer.position === 'CF'
                          ? 'Known for clinical finishing and good movement in the box.'
                          : selectedPlayer.position === 'CAM' ||
                              selectedPlayer.position === 'CM'
                            ? 'Has excellent vision and passing ability to control the midfield.'
                            : selectedPlayer.position === 'CB' ||
                                selectedPlayer.position === 'LB' ||
                                selectedPlayer.position === 'RB'
                              ? 'Strong in defensive duels and good positional awareness.'
                              : selectedPlayer.position === 'GK'
                                ? 'Reliable shot-stopper with good command of the area.'
                                : 'Versatile player who can perform well in multiple positions.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="mt-6">
              <Button
                variant="outline"
                onClick={() => setShowPlayerDetails(false)}
              >
                <X className="mr-2 h-4 w-4" />
                Close
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Buy Player
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Purchase</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to sign {selectedPlayer.name} for £
                      {convertNumberWithSeparator(selectedPlayer.market_value)}
                      M?
                      <div className="mt-2 p-3 bg-muted rounded-md">
                        <div className="flex justify-between mb-1">
                          <span>Transfer Fee:</span>
                          <span className="font-medium">
                            £
                            {convertNumberWithSeparator(
                              selectedPlayer.market_value
                            )}
                            M
                          </span>
                        </div>
                        <div className="flex justify-between mb-1">
                          <span>Weekly Wage:</span>
                          <span className="font-medium">
                            £
                            {Math.round(
                              selectedPlayer.salary / 500
                            ).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between pt-2 border-t mt-2">
                          <span className="font-bold">Remaining Budget:</span>
                          <span className="font-bold">
                            £
                            {25000000 - selectedPlayer.market_value > 0
                              ? (
                                  (25000000 - selectedPlayer.market_value) /
                                  1000000
                                ).toFixed(1)
                              : 0}
                            M
                          </span>
                        </div>
                      </div>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleBuyPlayer(selectedPlayer)}
                    >
                      Confirm Purchase
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MarketPlayerDialog;
