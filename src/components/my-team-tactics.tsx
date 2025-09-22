import React from 'react';

import { ArrowDown, ArrowRight, ArrowUp } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

type Props = {
  tactics: string; // 'attacking' | 'balanced' | 'defensive' | 'counter' | 'possession'
  handleTacticsChange: (
    tactics: 'attacking' | 'balanced' | 'defensive' | 'counter' | 'possession'
  ) => void;
};

const MyTeamTactics = ({ tactics, handleTacticsChange }: Props) => {
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="font-medium mb-3">Tactics</h3>
        <div className="space-y-2">
          <div className="grid grid-cols-1 gap-2">
            <Button
              variant={tactics === 'attacking' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleTacticsChange('attacking')}
              className="justify-start"
            >
              <ArrowUp className="h-4 w-4 mr-2 text-green-500" />
              Attacking
            </Button>
            <Button
              variant={tactics === 'balanced' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleTacticsChange('balanced')}
              className="justify-start"
            >
              <ArrowRight className="h-4 w-4 mr-2 text-blue-500" />
              Balanced
            </Button>
            <Button
              variant={tactics === 'defensive' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleTacticsChange('defensive')}
              className="justify-start"
            >
              <ArrowDown className="h-4 w-4 mr-2 text-amber-500" />
              Defensive
            </Button>
            <Button
              variant={tactics === 'counter' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleTacticsChange('counter')}
              className="justify-start"
            >
              <div className="flex mr-2">
                <ArrowDown className="h-4 w-4 text-amber-500" />
                <ArrowUp className="h-4 w-4 -ml-1 text-green-500" />
              </div>
              Counter Attack
            </Button>
            <Button
              variant={tactics === 'possession' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleTacticsChange('possession')}
              className="justify-start"
            >
              <div className="flex mr-2">
                <ArrowRight className="h-4 w-4 text-blue-500" />
                <ArrowRight className="h-4 w-4 -ml-1 text-blue-500" />
              </div>
              Possession
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MyTeamTactics;
