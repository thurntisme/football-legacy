"use client";

import { useEffect, useRef, useState } from "react";

import { ArrowLeft, Calendar, MapPin, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import ContentWrapper from "@/components/common/content-wrapper";
import PageTitle from "@/components/common/page-title";
import AbortMatchDialog from "@/components/pages/match/abort-match-dialog";
import MatchAction from "@/components/pages/match/match-action";
import MatchProcess from "@/components/pages/match/match-process";
import MatchTeamOverview from "@/components/pages/match/match-team-overview";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FOOTBALL_STATS_URL } from "@/constants/site";
import { toast } from "@/hooks/use-toast";
import { internalApi } from "@/lib/api/internal";
import { randomMatchEvent } from "@/lib/match";
import { commentaryPhrases } from "@/mock/match-start";
import {
  MatchProcessEvent,
  MatchProcessPsychological,
  MatchProcessScore,
} from "@/types/match";
import { useQuery } from "@tanstack/react-query";

const initialMatchScore: MatchProcessScore = { home: 0, away: 0 };
const initialPsychologicalState: MatchProcessPsychological = {
  confidence: 70,
  pressure: 50,
  fatigue: 0,
  teamwork: 75,
};
const extraFirstHalfTime = Math.ceil(Math.random() * 10); // Extra time in the first half (in minutes)
const extraSecondHalfTime = Math.ceil(Math.random() * 10); // Extra time in the second half (in minutes)
const timerSpeed = 500;

export default function MatchStartPage() {
  const router = useRouter();
  const [matchStarted, setMatchStarted] = useState<boolean>(false);
  const [matchPaused, setMatchPaused] = useState<boolean>(false);
  const [currentMinute, setCurrentMinute] = useState<number>(0);
  const [score, setScore] = useState<MatchProcessScore>(initialMatchScore);
  const [matchEvents, setMatchEvents] = useState<MatchProcessEvent[]>([]);
  const [matchEnded, setMatchEnded] = useState(false);
  const [abortDialogOpen, setAbortDialogOpen] = useState(false);
  const [psychologicalState, setPsychologicalState] =
    useState<MatchProcessPsychological>(initialPsychologicalState);

  const matchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstHalf = useRef<boolean>(true);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["upcoming-match"],
    queryFn: async () => {
      const res = await internalApi.get("/match/upcoming");
      return res.data?.data || [];
    },
  });

  const startMatch = () => {
    setMatchStarted(true);
    addCommentary(0, "start");

    matchTimerRef.current = setInterval(() => {
      if (matchPaused) return;
      setCurrentMinute((prev) => updateCurrentMinute(prev));
    }, timerSpeed);

    return () => {
      if (matchTimerRef.current) {
        clearInterval(matchTimerRef.current);
      }
    };
  };

  const updateCurrentMinute = (minute: number) => {
    let newMinute = minute + 1;

    if (Math.random() < 0.05) {
      generateMatchEvent(newMinute);
    }

    // Update psychological factors
    updatePsychologicalFactors(newMinute);

    // Generate random events and commentary
    if (isFirstHalf.current) {
      if (newMinute === 45) {
        if (!extraFirstHalfTime) {
          addCommentary(newMinute, "halfTime");
        } else {
          addCommentary(
            newMinute,
            "extraTime",
            `Extra time is ${extraFirstHalfTime} minutes`,
          );
        }
      }
      if (newMinute === 45 + extraFirstHalfTime) {
        addCommentary(newMinute, "halfTime");
        isFirstHalf.current = false;
        newMinute = 45;
      }
    } else {
      if (newMinute === 90) {
        if (!extraSecondHalfTime) {
          onMatchCompleted(90);
        } else {
          addCommentary(
            newMinute,
            "extraTime",
            `Extra time is ${extraSecondHalfTime} minutes`,
          );
        }
      }
      if (newMinute === 90 + extraSecondHalfTime) {
        onMatchCompleted(90 + extraSecondHalfTime);
      }
    }

    return newMinute;
  };

  // Add commentary
  const addCommentary = (
    minute = 0,
    type: keyof typeof commentaryPhrases,
    message = "",
  ) => {
    const phrases = commentaryPhrases[type];
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];

    let fullPhrase = randomPhrase;

    // Add score for certain commentary types
    if (type === "goal" || type === "halfTime" || type === "fullTime") {
      fullPhrase += ` The score is ${score.home}-${score.away}.`;
    }

    if (message) {
      fullPhrase += ` ${message}`;
    }

    setMatchEvents((prev) => [
      { type: "commentary", text: fullPhrase, minute },
      ...prev,
    ]);
  };

  // Abort match
  const abortMatch = () => {
    setAbortDialogOpen(false);

    // Penalty for aborting
    toast({
      title: "Match Aborted",
      description:
        "You've been charged a penalty of $5,000 for aborting the match.",
      variant: "destructive",
    });

    // In a real app, you would update the user's finances here
  };

  // Update psychological factors
  const updatePsychologicalFactors = (minute: number) => {
    setPsychologicalState((prev) => {
      const newState = { ...prev };

      // Fatigue increases as the match progresses
      newState.fatigue = Math.min(
        100,
        prev.fatigue + (minute > 45 ? 1.2 : 0.8),
      );

      // Confidence changes based on score and recent events
      if (score.home > score.away) {
        newState.confidence = Math.min(100, prev.confidence + 0.5);
      } else if (score.home < score.away) {
        newState.confidence = Math.max(0, prev.confidence - 0.5);
      }

      // Pressure increases in close games and late in the match
      if (Math.abs(score.home - score.away) <= 1 && minute > 70) {
        newState.pressure = Math.min(100, prev.pressure + 0.8);
      } else if (Math.abs(score.home - score.away) >= 3) {
        newState.pressure = Math.max(0, prev.pressure - 0.5);
      }

      return newState;
    });
  };

  const onMatchCompleted = (minute: number) => {
    setMatchPaused(true);
    addCommentary(minute, "fullTime");
    if (matchTimerRef.current) {
      clearInterval(matchTimerRef.current);
    }
    setMatchEnded(true);
  };

  // Generate random match events
  const generateMatchEvent = (minute: number) => {
    const event = randomMatchEvent(minute, data);

    // Update score for goals
    if (event.type === "goal") {
      setScore((prev) => ({
        ...prev,
        [event.team]: prev[event.team as keyof typeof prev] + 1,
      }));

      // Update psychological state after goal
      setPsychologicalState((prev) => {
        const newState = { ...prev };

        if (event.team === "home") {
          newState.confidence = Math.min(100, prev.confidence + 10);
          newState.pressure = Math.max(0, prev.pressure - 5);
        } else {
          newState.confidence = Math.max(0, prev.confidence - 10);
          newState.pressure = Math.min(100, prev.pressure + 10);
        }

        return newState;
      });
    }

    // Add commentary for this event
    addCommentary(minute, event.commentary as keyof typeof commentaryPhrases);
  };

  // Skip to end of match
  const skipToEnd = () => {
    setCurrentMinute(90);
    setMatchEnded(true);

    // Generate a final score if no goals yet
    if (score.home === 0 && score.away === 0) {
      const homeGoals = Math.floor(Math.random() * 3);
      const awayGoals = Math.floor(Math.random() * 3);
      setScore({ home: homeGoals, away: awayGoals });

      // Add goal events
      const events = [];
      for (let i = 0; i < homeGoals; i++) {
        const minute = Math.floor(Math.random() * 90) + 1;
        const player = [
          "Miller",
          "Wilson",
          "Garcia",
          "Brown",
          "Lee",
          "Martinez",
          "Taylor",
          "Anderson",
          "Johnson",
          "Williams",
          "Davis",
        ][Math.floor(Math.random() * 11)];
        events.push({
          minute,
          text: `GOAL! Scored by ${player} (${i + 1}-${score.away})`,
          type: "goal",
        });
      }

      for (let i = 0; i < awayGoals; i++) {
        const minute = Math.floor(Math.random() * 90) + 1;
        const player = [
          "Smith",
          "Jones",
          "Thompson",
          "White",
          "Harris",
          "Martin",
          "Jackson",
          "Clark",
          "Lewis",
          "Walker",
          "Allen",
        ][Math.floor(Math.random() * 11)];
        events.push({
          minute,
          text: `GOAL! Scored by ${player} (${score.home}-${i + 1})`,
          type: "goal",
        });
      }

      // Sort events by minute
      events.sort((a, b) => b.minute - a.minute);
      setMatchEvents(events);
    }

    onMatchCompleted(90);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (matchTimerRef.current) {
        clearInterval(matchTimerRef.current);
      }
    };
  }, []);

  const changeMatchPaused = (isPause: boolean) => {
    setMatchPaused(isPause);
    if (matchTimerRef.current) {
      if (isPause) {
        if (matchTimerRef.current) {
          clearInterval(matchTimerRef.current);
        }
      } else {
        matchTimerRef.current = setInterval(() => {
          setCurrentMinute((prev) => updateCurrentMinute(prev));
        }, timerSpeed);
      }
    }
  };

  const handleAbortOpenDialog = (open: boolean) => {
    setAbortDialogOpen(open);
    changeMatchPaused(open);
  };

  const saveMatch = () => {
    router.push(`${FOOTBALL_STATS_URL}/game/match/result`);
  };

  return (
    <ContentWrapper isLoading={isLoading} error={error} onRefetch={refetch}>
      <PageTitle title="Match Day">
        <Button asChild variant="outline">
          <Link href={`${FOOTBALL_STATS_URL}/game/match/prepare`}>
            <ArrowLeft className="h-4 w-4" />
            Back to Preparation
          </Link>
        </Button>
      </PageTitle>

      <Card className="mb-6 py-8">
        <CardHeader className="pb-3 text-center space-y-3">
          <CardTitle>
            {data?.match?.competition || "N/A"} - Matchday 24
          </CardTitle>
          <CardDescription className="flex items-center justify-center">
            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>
              {data?.match?.date || "N/A"} - {data?.match?.time || "N/A"}
            </span>
            <MapPin className="h-4 w-4 ml-4 mr-2 text-muted-foreground" />
            <span>{data?.match?.stadium || "N/A"}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-4">
            <MatchTeamOverview
              matchStarted={matchStarted}
              score={score}
              matchEnded={matchEnded}
              currentMinute={currentMinute}
              team={data?.team}
            />
            <MatchAction matchStarted={matchStarted} startMatch={startMatch} />
            <MatchProcess
              matchStarted={matchStarted}
              currentMinute={currentMinute}
              matchEnded={matchEnded}
              matchPaused={matchPaused}
              setMatchPaused={changeMatchPaused}
              setAbortDialogOpen={handleAbortOpenDialog}
              skipToEnd={skipToEnd}
              matchEvents={matchEvents}
              psychologicalState={psychologicalState}
            />
            {matchEnded ? (
              <Button onClick={saveMatch}>
                <Save className="h-4 w-4" />
                Save Match
              </Button>
            ) : null}
          </div>
        </CardContent>
      </Card>

      <AbortMatchDialog
        abortDialogOpen={abortDialogOpen}
        setAbortDialogOpen={setAbortDialogOpen}
        abortMatch={abortMatch}
      />
    </ContentWrapper>
  );
}
