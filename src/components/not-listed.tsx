import React from 'react';

import { DollarSign, Share2, Star } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Player } from '@/types/football/player';

type Props = {
  notListedPlayers: Player[];
  handleAddToTransferList: (player: Player) => void;
  onAddToLoanList: (player: Player) => void;
};

const NotListed = ({
  notListedPlayers,
  handleAddToTransferList,
  onAddToLoanList,
}: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {notListedPlayers.map((player) => (
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
                </div>
                <div className="text-right">
                  <div className="font-bold">{player.rating}</div>
                  <div className="text-xs text-muted-foreground">Rating</div>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <div className="text-muted-foreground">Value</div>
                  <div className="font-medium">
                    £{(player.marketValue / 1000000).toFixed(1)}M
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground">Salary</div>
                  <div className="font-medium">
                    £{player.salary.toLocaleString()}/w
                  </div>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={() => handleAddToTransferList(player)}
                >
                  <DollarSign className="h-4 w-4 mr-1" />
                  Transfer List
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => onAddToLoanList(player)}
                >
                  <Share2 className="h-4 w-4 mr-1" />
                  Loan List
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default NotListed;
