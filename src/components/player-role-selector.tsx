'use client';

import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PlayerRoles } from '@/types/football/player';

type PlayerRolesProps = {
  playerRoles: PlayerRoles;
  onRoleChange: (playerId: number, roleId: string) => void;
};

export default function PlayerRoleSelector({
  playerRoles,
  onRoleChange,
}: PlayerRolesProps) {
  // Sample players
  const players = [
    { id: 1, name: 'David Miller', position: 'GK', currentRole: 'goalkeeper' },
    {
      id: 2,
      name: 'James Wilson',
      position: 'LB',
      currentRole: 'complete-wingback',
    },
    {
      id: 3,
      name: 'Robert Garcia',
      position: 'CB',
      currentRole: 'ball-playing-defender',
    },
    {
      id: 4,
      name: 'Michael Brown',
      position: 'CB',
      currentRole: 'no-nonsense-defender',
    },
    {
      id: 5,
      name: 'Thomas Lee',
      position: 'RB',
      currentRole: 'inverted-wingback',
    },
    {
      id: 6,
      name: 'Daniel Martinez',
      position: 'CM',
      currentRole: 'deep-lying-playmaker',
    },
    {
      id: 7,
      name: 'Steven Taylor',
      position: 'CDM',
      currentRole: 'ball-winning-midfielder',
    },
    {
      id: 8,
      name: 'Kevin Anderson',
      position: 'CM',
      currentRole: 'box-to-box',
    },
    {
      id: 9,
      name: 'Chris Johnson',
      position: 'LW',
      currentRole: 'advanced-playmaker',
    },
    {
      id: 10,
      name: 'Mark Williams',
      position: 'ST',
      currentRole: 'advanced-forward',
    },
    { id: 11, name: 'Paul Davis', position: 'RW', currentRole: 'mezzala' },
  ];

  const [selectedPlayers, setSelectedPlayers] = useState<number[]>([]);

  // Get role category for a position
  const getRoleCategory = (
    position: string
  ): keyof typeof playerRoles | null => {
    if (['ST', 'CF', 'LW', 'RW'].includes(position)) return 'striker';
    if (['CM', 'CDM', 'CAM', 'LM', 'RM'].includes(position))
      return 'midfielder';
    if (['CB', 'LB', 'RB', 'LWB', 'RWB'].includes(position)) return 'defender';
    return null;
  };

  // Get available roles for a player
  const getAvailableRoles = (position: string) => {
    const category = getRoleCategory(position);
    if (!category) return [];
    return playerRoles[category];
  };

  // Get role name by ID
  const getRoleName = (roleId: string) => {
    for (const category in playerRoles) {
      const role = playerRoles[category as keyof typeof playerRoles].find(
        (r) => r.id === roleId
      );
      if (role) return role.name;
    }
    return roleId;
  };

  // Toggle player selection
  const togglePlayerSelection = (playerId: number) => {
    setSelectedPlayers((prev) =>
      prev.includes(playerId)
        ? prev.filter((id) => id !== playerId)
        : [...prev, playerId]
    );
  };

  // Handle role change
  const handleRoleChange = (playerId: number, roleId: string) => {
    // Update player's role
    const player = players.find((p) => p.id === playerId);
    if (player) {
      player.currentRole = roleId;
      onRoleChange(playerId, roleId);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {players.map((player) => {
          const availableRoles = getAvailableRoles(player.position);
          const isSelected = selectedPlayers.includes(player.id);

          return (
            <Card
              key={player.id}
              className={`cursor-pointer transition-all ${isSelected ? 'ring-2 ring-primary' : ''}`}
              onClick={() => togglePlayerSelection(player.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-medium">{player.name}</div>
                    <Badge variant="outline" className="mt-1">
                      {player.position}
                    </Badge>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold">
                    {player.id}
                  </div>
                </div>

                <div className="mt-3">
                  <div className="text-sm text-muted-foreground mb-1">
                    Current Role
                  </div>
                  {/* <Select
                    value={player.currentRole}
                    onValueChange={(value) =>
                      handleRoleChange(player.id, value)
                    }
                    onClick={(e) => e.stopPropagation()}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableRoles.map((role) => (
                        <SelectItem key={role.id} value={role.id}>
                          <div className="flex flex-col">
                            <span>{role.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {role.description}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select> */}
                </div>

                <div className="mt-3 text-sm">
                  <span className="text-muted-foreground">Role: </span>
                  <span className="font-medium">
                    {getRoleName(player.currentRole)}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {selectedPlayers.length > 0 && (
        <div className="flex justify-end mt-4">
          <Button
            variant="outline"
            className="mr-2"
            onClick={() => setSelectedPlayers([])}
          >
            Clear Selection
          </Button>
          <Button>Apply Role Changes ({selectedPlayers.length})</Button>
        </div>
      )}
    </div>
  );
}
