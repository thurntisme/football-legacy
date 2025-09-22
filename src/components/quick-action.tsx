import React from 'react';

import { ShoppingCart, UserCog, Wand2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

type Props = {
  onChooseBestPlayers: () => void;
  onShowTransferRecommendations: () => void;
  setPlayerRolesOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const QuickAction = ({
  onChooseBestPlayers,
  onShowTransferRecommendations,
  setPlayerRolesOpen,
}: Props) => {
  return (
    <div className="mb-6 flex flex-col sm:flex-row gap-4 p-4 bg-muted/30 rounded-lg border">
      <div className="flex-1">
        <h3 className="font-medium mb-1">Quick Actions</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Optimize your team with one click
        </p>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={onChooseBestPlayers}
            className="flex items-center gap-2"
          >
            <Wand2 className="h-4 w-4" />
            Choose Best Players
          </Button>
          <Button variant="outline" onClick={() => setPlayerRolesOpen(true)}>
            <UserCog className="h-4 w-4" />
            Player Roles
          </Button>
          <Button
            variant="outline"
            onClick={onShowTransferRecommendations}
            className="flex items-center gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            Transfer Recommendations
          </Button>
        </div>
      </div>
      <div className="w-1/3">
        <h3 className="font-medium mb-1">Current Status</h3>
        <p className="text-sm text-muted-foreground mb-1">
          Team Strength: <span className="font-medium">82/100</span>
        </p>
        <p className="text-sm text-muted-foreground mb-1">
          Average Form: <span className="font-medium text-green-600">Good</span>
        </p>
        <p className="text-sm text-muted-foreground">
          Substitutes: <span className="font-medium">12 players</span>
        </p>
      </div>
    </div>
  );
};

export default QuickAction;
