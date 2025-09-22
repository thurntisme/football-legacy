'use client';

import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Player } from '@/types/football/player';

interface PlayerStatisticsProps {
  players: Player[];
}

export default function PlayerStatistics({ players }: PlayerStatisticsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-2">Player Types</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Badge className="bg-blue-500 mr-2">Normal</Badge>
              <span>Normal Players</span>
            </div>
            <span className="font-medium">
              {players.filter((p) => p.type === 'normal').length}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Badge className="bg-purple-500 mr-2">Rising</Badge>
              <span>Rising Stars</span>
            </div>
            <span className="font-medium">
              {players.filter((p) => p.type === 'rising').length}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Badge className="bg-amber-500 mr-2">Young</Badge>
              <span>Young Talents</span>
            </div>
            <span className="font-medium">
              {players.filter((p) => p.type === 'young').length}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Badge className="bg-red-500 mr-2">Legend</Badge>
              <span>Legends</span>
            </div>
            <span className="font-medium">
              {players.filter((p) => p.type === 'legend').length}
            </span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Player Levels</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span>Level 1</span>
            <span className="font-medium">
              {players.filter((p) => (p.level || 1) === 1).length}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span>Level 2</span>
            <span className="font-medium">
              {players.filter((p) => p.level === 2).length}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span>Level 3+</span>
            <span className="font-medium">
              {players.filter((p) => (p.level || 0) >= 3).length}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 border rounded-md bg-muted/50">
        <h4 className="font-medium mb-2">Player Generation Tips</h4>
        <ul className="text-sm space-y-1">
          <li>• Normal players are balanced and reliable</li>
          <li>• Rising stars develop faster with training</li>
          <li>• Young talents have the highest potential</li>
          <li>• Legends provide immediate impact and leadership</li>
        </ul>
      </div>
    </div>
  );
}
