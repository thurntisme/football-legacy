import React from 'react';

import { AlertTriangle, CheckCircle } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

type Props = {
  psychologicalState: {
    confidence: number;
    pressure: number;
    fatigue: number;
    teamwork: number;
  };
};

const MatchPlayers = ({ psychologicalState }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="text-lg font-medium mb-3">Team Condition</h3>
        <div className="space-y-4">
          <div className="p-3 border rounded-md">
            <h4 className="font-medium mb-2">Psychological Factors</h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Confidence</span>
                  <span className="text-sm font-medium">
                    {psychologicalState.confidence}%
                  </span>
                </div>
                <Progress
                  value={psychologicalState.confidence}
                  className="h-2"
                />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Pressure</span>
                  <span className="text-sm font-medium">
                    {psychologicalState.pressure}%
                  </span>
                </div>
                <Progress value={psychologicalState.pressure} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Fatigue</span>
                  <span className="text-sm font-medium">
                    {psychologicalState.fatigue}%
                  </span>
                </div>
                <Progress value={psychologicalState.fatigue} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Teamwork</span>
                  <span className="text-sm font-medium">
                    {psychologicalState.teamwork}%
                  </span>
                </div>
                <Progress value={psychologicalState.teamwork} className="h-2" />
              </div>
            </div>
          </div>

          <div className="p-3 border rounded-md">
            <h4 className="font-medium mb-2">Team Morale Effects</h4>
            <div className="space-y-2 text-sm">
              {psychologicalState.confidence > 80 && (
                <div className="flex items-center text-green-600">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  <span>High confidence is improving shooting accuracy</span>
                </div>
              )}
              {psychologicalState.pressure > 80 && (
                <div className="flex items-center text-amber-600">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  <span>High pressure is affecting decision making</span>
                </div>
              )}
              {psychologicalState.fatigue > 70 && (
                <div className="flex items-center text-red-600">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  <span>Fatigue is reducing player stamina and speed</span>
                </div>
              )}
              {psychologicalState.teamwork > 80 && (
                <div className="flex items-center text-green-600">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  <span>Strong teamwork is improving passing accuracy</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Player Performance</h3>
        <div className="space-y-2 max-h-[400px] overflow-y-auto">
          {/* This would be populated with actual player performance data */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num) => {
            const playerNames = [
              'Miller',
              'Wilson',
              'Garcia',
              'Brown',
              'Lee',
              'Martinez',
              'Taylor',
              'Anderson',
              'Johnson',
              'Williams',
              'Davis',
            ];
            const positions = [
              'GK',
              'LB',
              'CB',
              'CB',
              'RB',
              'CDM',
              'CM',
              'CM',
              'LW',
              'ST',
              'RW',
            ];
            const playerRatings = [
              6.8, 7.2, 6.9, 7.0, 7.5, 8.1, 7.3, 6.7, 7.8, 7.4, 7.6,
            ];

            return (
              <div
                key={num}
                className="flex items-center p-2 border rounded-md"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 font-bold">
                  {playerRatings[num - 1]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{playerNames[num - 1]}</span>
                    <Badge variant="outline">{positions[num - 1]}</Badge>
                  </div>
                  <div className="flex items-center mt-1">
                    <Progress
                      value={Math.min(100, (playerRatings[num - 1] / 10) * 100)}
                      className="h-1.5 w-24 mr-2"
                    />
                    <span className="text-xs text-muted-foreground">
                      {Math.floor(Math.random() * 5) + 1} key passes
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MatchPlayers;
