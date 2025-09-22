'use client';

import type React from 'react';
import { useState } from 'react';

import {
  Award,
  Check,
  CornerUpRight,
  Flag,
  Footprints,
  Megaphone,
  RotateCcw,
  Target,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { Player } from '@/types/football/player';

type PlayerRole = {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  assignedPlayerId: string | null;
};
type PlayerRolesDialogProps = {
  players: Player[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
export default function PlayerRolesDialog({
  players,
  open,
  onOpenChange,
}: PlayerRolesDialogProps) {
  // Define available roles
  const [roles, setRoles] = useState<PlayerRole[]>([
    {
      id: 'captain',
      name: 'Captain',
      description:
        'Team leader who communicates with the referee and boosts team morale',
      icon: <Megaphone className="h-5 w-5" />,
      assignedPlayerId: '3', // Default to Robert Garcia (CB)
    },
    {
      id: 'vice-captain',
      name: 'Vice-Captain',
      description: 'Takes over captain duties when the captain is unavailable',
      icon: <Flag className="h-5 w-5" />,
      assignedPlayerId: '7', // Default to Steven Taylor (CDM)
    },
    {
      id: 'penalty-taker',
      name: 'Penalty Taker',
      description: 'Primary player to take penalty kicks',
      icon: <Target className="h-5 w-5" />,
      assignedPlayerId: '10', // Default to Mark Williams (ST)
    },
    {
      id: 'free-kick-taker',
      name: 'Free Kick Taker',
      description: 'Primary player to take direct free kicks',
      icon: <Footprints className="h-5 w-5" />,
      assignedPlayerId: '6', // Default to Daniel Martinez (CM)
    },
    {
      id: 'corner-taker-right',
      name: 'Corner Taker (Right)',
      description: 'Takes corner kicks from the right side',
      icon: <CornerUpRight className="h-5 w-5" />,
      assignedPlayerId: '9', // Default to Chris Johnson (LW)
    },
    {
      id: 'corner-taker-left',
      name: 'Corner Taker (Left)',
      description: 'Takes corner kicks from the left side',
      icon: <RotateCcw className="h-5 w-5" />,
      assignedPlayerId: '11', // Default to Paul Davis (RW)
    },
  ]);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  // Handle role assignment
  const assignPlayerToRole = (roleId: string, playerId: string) => {
    setRoles((prevRoles) =>
      prevRoles.map((role) =>
        role.id === roleId ? { ...role, assignedPlayerId: playerId } : role
      )
    );
    const role = roles.find((r) => r.id === roleId);
    const player = players.find((p) => p.id === playerId);
    if (role && player) {
      toast({
        title: `Role Updated`,
        description: `${player.name} is now the ${role.name}`,
      });
    }
  };
  // Get player by ID
  const getPlayerById = (id: string | null) => {
    if (id === null) return null;
    return players.find((player) => player.id === id) || null;
  };
  // Get form color
  const getFormColor = (form: string | undefined) => {
    switch (form) {
      case 'excellent':
        return 'bg-green-500';
      case 'good':
        return 'bg-emerald-400';
      case 'average':
        return 'bg-amber-400';
      case 'poor':
        return 'bg-red-400';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Player Roles</DialogTitle>
          <DialogDescription>
            Assign specific roles to players in your team
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Available Roles</h3>
            <div className="space-y-3">
              {roles.map((role) => {
                const assignedPlayer = getPlayerById(role.assignedPlayerId);
                return (
                  <div
                    key={role.id}
                    className={`p-3 border rounded-md cursor-pointer transition-all ${
                      selectedRole === role.id
                        ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                        : 'hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedRole(role.id)}
                  >
                    <div className="flex items-center">
                      <div className="mr-3 p-2 rounded-full bg-muted">
                        {role.icon}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{role.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {role.description}
                        </div>
                        {assignedPlayer && (
                          <div className="mt-2 flex items-center">
                            <Badge variant="outline" className="mr-2">
                              {assignedPlayer.position}
                            </Badge>
                            <span className="text-sm font-medium">
                              {assignedPlayer.name}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-3">Squad Players</h3>
            {selectedRole ? (
              <div className="space-y-3">
                {players.map((player) => (
                  <div
                    key={player.id}
                    className="flex items-center p-3 border rounded-md cursor-pointer hover:border-primary/50"
                    onClick={() => assignPlayerToRole(selectedRole, player.id)}
                  >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary/10 font-bold mr-3 relative">
                      {player.rating}
                      <div
                        className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${getFormColor(player.form)}`}
                      ></div>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{player.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {player.position}
                      </div>
                    </div>
                    {roles.find((role) => role.id === selectedRole)
                      ?.assignedPlayerId === player.id && (
                      <Check className="h-5 w-5 text-green-500" />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 border rounded-md text-center text-muted-foreground">
                <Award className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>Select a role to assign players</p>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button onClick={() => onOpenChange(false)}>Done</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
