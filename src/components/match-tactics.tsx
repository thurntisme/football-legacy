import React from 'react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { PlayerRoles } from '@/types/football/player';

import PlayerRoleSelector from './player-role-selector';

type Props = {
  currentTactic: string;
  changeTactics: (tactic: string) => void;
  tacticalTriggers: { id: string; name: string; description: string }[];
  activeTacticalTriggers: string[];
  toggleTacticalTrigger: (id: string) => void;
  playerRoles: PlayerRoles;
};

const MatchTactics = ({
  currentTactic,
  changeTactics,
  tacticalTriggers,
  activeTacticalTriggers,
  toggleTacticalTrigger,
  playerRoles,
}: Props) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-3">Match Tactics</h3>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={currentTactic === 'balanced' ? 'default' : 'outline'}
                onClick={() => changeTactics('balanced')}
              >
                Balanced
              </Button>
              <Button
                variant={currentTactic === 'attacking' ? 'default' : 'outline'}
                onClick={() => changeTactics('attacking')}
              >
                Attacking
              </Button>
              <Button
                variant={currentTactic === 'defensive' ? 'default' : 'outline'}
                onClick={() => changeTactics('defensive')}
              >
                Defensive
              </Button>
              <Button
                variant={currentTactic === 'possession' ? 'default' : 'outline'}
                onClick={() => changeTactics('possession')}
              >
                Possession
              </Button>
              <Button
                variant={currentTactic === 'counter' ? 'default' : 'outline'}
                onClick={() => changeTactics('counter')}
              >
                Counter
              </Button>
              <Button
                variant={currentTactic === 'pressing' ? 'default' : 'outline'}
                onClick={() => changeTactics('pressing')}
              >
                Pressing
              </Button>
            </div>

            <div className="mt-6">
              <h4 className="font-medium mb-2">Team Instructions</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="tempo">Tempo</Label>
                  <Slider
                    id="tempo"
                    defaultValue={[50]}
                    max={100}
                    step={1}
                    className="w-[60%]"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="width">Width</Label>
                  <Slider
                    id="width"
                    defaultValue={[60]}
                    max={100}
                    step={1}
                    className="w-[60%]"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="defensive-line">Defensive Line</Label>
                  <Slider
                    id="defensive-line"
                    defaultValue={[40]}
                    max={100}
                    step={1}
                    className="w-[60%]"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Play Offside Trap</Label>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Counter Press</Label>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-3">Tactical Triggers</h3>
          <div className="space-y-3">
            {tacticalTriggers.map((trigger) => (
              <div
                key={trigger.id}
                className={`p-3 border rounded-md cursor-pointer transition-all ${
                  activeTacticalTriggers.includes(trigger.id)
                    ? 'border-primary bg-primary/5'
                    : 'hover:border-primary/50'
                }`}
                onClick={() => toggleTacticalTrigger(trigger.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{trigger.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {trigger.description}
                    </div>
                  </div>
                  <Switch
                    checked={activeTacticalTriggers.includes(trigger.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-3">Player Roles</h3>
        <PlayerRoleSelector
          playerRoles={playerRoles}
          onRoleChange={(playerId, roleId) => {
            console.log({
              title: 'Player Role Changed',
              description: `Changed player role to ${roleId}`,
            });
          }}
        />
      </div>
    </>
  );
};

export default MatchTactics;
