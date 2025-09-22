import React from 'react';

import { DollarSign, Pencil, Star, Trash } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

type Props = {
  list: any[];
  onRemoveFromList: (player: any) => void;
};

const TransferListed = ({ list, onRemoveFromList }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {list.length > 0 ? (
        list.map((player) => (
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
                    variant="outline"
                    className="flex-1"
                    onClick={() => onRemoveFromList(player)}
                  >
                    <Trash className="h-4 w-4 mr-1" />
                    Remove
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Pencil className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))
      ) : (
        <div className="col-span-full text-center py-8">
          <DollarSign className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
          <h3 className="text-lg font-medium mb-1">No Transfer Listings</h3>
          <p className="text-muted-foreground mb-4">
            You don't have any players on the transfer list.
          </p>
        </div>
      )}
    </div>
  );
};

export default TransferListed;
