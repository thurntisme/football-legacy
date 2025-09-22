import React from 'react';

import {
  Clock,
  Pause,
  Play,
  Settings,
  SkipForward,
  Volume2,
  VolumeX,
  XCircle,
  Zap,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MatchStatics } from '@/types/football/match';

import MatchVisualization from './match-visualization';
import TacticalOverlay from './tactical-overlay';

type Props = {
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
  matchStats: MatchStatics;
};

const MatchView = ({
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
  showTacticalOverlay,
  setShowTacticalOverlay,
  currentTactic,
  score,
  matchEvents,
  psychologicalState,
  commentary,
  commentaryHistory,
  matchStats,
}: Props) => {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-2" />
          <span className="font-medium">{currentMinute}' / 90'</span>
        </div>

        <div className="flex gap-2">
          {!matchEnded && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setMatchPaused(!matchPaused)}
              >
                {matchPaused ? (
                  <Play className="h-4 w-4 mr-1" />
                ) : (
                  <Pause className="h-4 w-4 mr-1" />
                )}
                {matchPaused ? 'Resume' : 'Pause'}
              </Button>
              <Button
                variant="destructive"
                onClick={() => setAbortDialogOpen(true)}
              >
                <XCircle className="mr-2 h-4 w-4" />
                Abort Match
              </Button>
              <Select
                value={matchSpeed.toString()}
                onValueChange={(value) =>
                  updateMatchSpeed(Number.parseFloat(value))
                }
              >
                <SelectTrigger className="w-[130px]">
                  <Zap className="h-4 w-4 mr-1" />
                  <SelectValue placeholder="Match Speed" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0.5">Slow</SelectItem>
                  <SelectItem value="1">Normal</SelectItem>
                  <SelectItem value="2">Fast</SelectItem>
                  <SelectItem value="4">Very Fast</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" onClick={skipToEnd}>
                <SkipForward className="h-4 w-4 mr-1" />
                Skip
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAudioEnabled(!audioEnabled)}
              >
                {audioEnabled ? (
                  <Volume2 className="h-4 w-4" />
                ) : (
                  <VolumeX className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowTacticalOverlay(!showTacticalOverlay)}
              >
                <Settings className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>

      <Progress value={(currentMinute / 90) * 100} className="h-2 mb-4" />

      {/* Match visualization */}
      <div className="relative w-full h-[300px] bg-emerald-800 rounded-lg overflow-hidden mb-4">
        {showTacticalOverlay ? (
          <TacticalOverlay
            formation={
              currentTactic === 'attacking'
                ? '4-3-3'
                : currentTactic === 'defensive'
                  ? '5-3-2'
                  : '4-4-2'
            }
            playerPositions={[]} // This would be populated with actual player positions
            heatmap={matchStats.home.heatmap}
          />
        ) : (
          <MatchVisualization
            currentMinute={currentMinute}
            score={score}
            matchEvents={matchEvents}
            psychologicalState={psychologicalState}
          />
        )}

        {/* Current tactic overlay */}
        <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
          {currentTactic.charAt(0).toUpperCase() + currentTactic.slice(1)}{' '}
          Tactics
        </div>
      </div>

      {/* Commentary section */}
      {commentary && (
        <div className="p-3 bg-primary/10 border border-primary/20 rounded-md mb-4">
          <p className="text-sm font-medium">{commentary}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="border rounded-md">
          <div className="p-3 border-b bg-muted/50">
            <h3 className="font-medium">Match Events</h3>
          </div>
          <div className="p-3 max-h-[200px] overflow-y-auto">
            {matchEvents.length > 0 ? (
              <div className="space-y-2">
                {matchEvents.map((event, index) => (
                  <div key={index} className="flex items-start">
                    <Badge
                      variant="outline"
                      className="mr-2 mt-0.5 min-w-[32px] text-center"
                    >
                      {event.minute}'
                    </Badge>
                    <div
                      className={`flex-1 ${event.type === 'goal' ? 'font-bold' : ''}`}
                    >
                      {event.text}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                No events yet. The match is just getting started.
              </div>
            )}
          </div>
        </div>

        <div className="border rounded-md">
          <div className="p-3 border-b bg-muted/50">
            <h3 className="font-medium">Commentary</h3>
          </div>
          <div className="p-3 max-h-[200px] overflow-y-auto">
            {commentaryHistory.length > 0 ? (
              <div className="space-y-2">
                {commentaryHistory.map((comment, index) => (
                  <div key={index} className="text-sm">
                    {comment}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                The commentator is getting ready...
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MatchView;
