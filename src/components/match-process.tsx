import React, { useState } from 'react';

import { BarChart3, Layers, Play, Users } from 'lucide-react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MatchStatics } from '@/types/football/match';
import { PlayerRoles } from '@/types/football/player';

import MatchPlayers from './match-players';
import MatchStatistics from './match-statistics';
import MatchTactics from './match-tactics';
import MatchView from './match-view';

export type Props = {
  currentMinute: number;
  matchEnded: boolean;
  matchPaused: boolean;
  setMatchPaused: (option: boolean) => void;
  setAbortDialogOpen: (open: boolean) => void;
  matchSpeed: number;
  updateMatchSpeed: (newSpeed: number) => void;
  skipToEnd: () => void;
  audioEnabled: boolean;
  setAudioEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  showTacticalOverlay: boolean;
  setShowTacticalOverlay: React.Dispatch<React.SetStateAction<boolean>>;
  currentTactic: string;
  score: { home: number; away: number };
  matchEvents: { minute: number; type: string; text: string }[];
  psychologicalState: {
    confidence: number;
    pressure: number;
    fatigue: number;
    teamwork: number;
  };
  commentary: string;
  commentaryHistory: string[];
  changeTactics: (tactic: string) => void;
  tacticalTriggers: { id: string; name: string; description: string }[];
  activeTacticalTriggers: string[];
  toggleTacticalTrigger: (id: string) => void;
  playerRoles: PlayerRoles;
  matchStats: MatchStatics;
};

const MatchProcess = ({
  currentMinute,
  matchEnded,
  matchPaused,
  setMatchPaused,
  setAbortDialogOpen,
  matchSpeed,
  updateMatchSpeed,
  skipToEnd,
  audioEnabled,
  setAudioEnabled,
  setShowTacticalOverlay,
  currentTactic,
  score,
  matchEvents,
  psychologicalState,
  commentary,
  commentaryHistory,
  changeTactics,
  tacticalTriggers,
  activeTacticalTriggers,
  toggleTacticalTrigger,
  playerRoles,
  matchStats,
}: Props) => {
  const [activeTab, setActiveTab] = useState('match');

  return (
    <div className="w-full mt-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="match">
            <Play className="h-4 w-4 mr-2" />
            Match
          </TabsTrigger>
          <TabsTrigger value="tactics">
            <Layers className="h-4 w-4 mr-2" />
            Tactics
          </TabsTrigger>
          <TabsTrigger value="stats">
            <BarChart3 className="h-4 w-4 mr-2" />
            Stats
          </TabsTrigger>
          <TabsTrigger value="players">
            <Users className="h-4 w-4 mr-2" />
            Players
          </TabsTrigger>
        </TabsList>

        <TabsContent value="match" className="space-y-4">
          <MatchView
            currentMinute={currentMinute}
            matchEnded={matchEnded}
            matchPaused={matchPaused}
            setMatchPaused={setMatchPaused}
            setAbortDialogOpen={setAbortDialogOpen}
            matchSpeed={matchSpeed}
            updateMatchSpeed={updateMatchSpeed}
            skipToEnd={skipToEnd}
            audioEnabled={audioEnabled}
            setAudioEnabled={setAudioEnabled}
            showTacticalOverlay={false}
            setShowTacticalOverlay={setShowTacticalOverlay}
            currentTactic={currentTactic}
            score={score}
            matchEvents={matchEvents}
            psychologicalState={psychologicalState}
            commentary={commentary}
            commentaryHistory={commentaryHistory}
            matchStats={matchStats}
          />
        </TabsContent>

        <TabsContent value="tactics" className="space-y-4">
          <MatchTactics
            currentTactic={currentTactic}
            changeTactics={changeTactics}
            tacticalTriggers={tacticalTriggers}
            activeTacticalTriggers={activeTacticalTriggers}
            toggleTacticalTrigger={toggleTacticalTrigger}
            playerRoles={playerRoles}
          />
        </TabsContent>

        <TabsContent value="stats" className="space-y-4">
          <MatchStatistics
            homeTeam="Your Team"
            awayTeam="City FC"
            stats={matchStats}
            currentMinute={currentMinute}
          />
        </TabsContent>

        <TabsContent value="players" className="space-y-4">
          <MatchPlayers psychologicalState={psychologicalState} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MatchProcess;
