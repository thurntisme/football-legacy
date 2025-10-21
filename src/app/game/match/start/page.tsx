"use client";

import { useEffect, useRef, useState } from "react";

import { ArrowLeft, Calendar, MapPin } from "lucide-react";
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
import { commentaryPhrases } from "@/mock/match-start";
import {
  MatchProcessEvent,
  MatchProcessPsychological,
  MatchProcessScore,
  MatchProcessStats,
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
const TACTICS = ["balanced", "offensive", "defensive", "possession", "counter"];

export default function MatchStartPage() {
  const router = useRouter();
  const [matchStarted, setMatchStarted] = useState<boolean>(false);
  const [matchPaused, setMatchPaused] = useState<boolean>(false);
  const [currentMinute, setCurrentMinute] = useState<number>(0);
  const [score, setScore] = useState<MatchProcessScore>(initialMatchScore);
  const [matchEvents, setMatchEvents] = useState<MatchProcessEvent[]>([]);
  const [matchEnded, setMatchEnded] = useState(false);
  const [abortDialogOpen, setAbortDialogOpen] = useState(false);
  const [matchSpeed, setMatchSpeed] = useState(1); // 1 = normal, 2 = fast, 0.5 = slow
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

    const timerSpeed = 500 / matchSpeed;
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

    if (newMinute % 10 === 0 || Math.random() < 0.05) {
      generateMatchEvent(newMinute);
    } else if (Math.random() < 0.1) {
      // Random commentary for atmosphere
      const commentaryTypes: Array<keyof typeof commentaryPhrases> = [
        "possession",
        "attack",
      ];
      const randomType: keyof typeof commentaryPhrases =
        commentaryTypes[Math.floor(Math.random() * commentaryTypes.length)];
      addCommentary(newMinute, randomType);
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

      // Add psychological commentary occasionally
      if (minute % 15 === 0 || (Math.random() < 0.05 && minute > 60)) {
        if (newState.fatigue > 75) {
          addCommentary(minute, "fatigue");
        } else if (newState.confidence > 85) {
          addCommentary(minute, "confidence");
        } else if (newState.pressure > 85) {
          addCommentary(minute, "pressure");
        }
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
    // Navigate to result page after a short delay
    setTimeout(() => {
      // router.push(`${FOOTBALL_STATS_URL}/game/match/result`);
      console.log("save the match");
    }, 5000);
  };

  // Generate random match events
  const generateMatchEvent = (minute: number) => {
    // Adjust event probabilities based on psychological state and tactics
    const eventProbabilities = {
      shot: 0.25,
      goal: 0.1,
      card: 0.1,
      corner: 0.15,
      save: 0.15,
      foul: 0.15,
      miss: 0.1,
    };

    // random tactic
    const currentTactic = TACTICS[Math.floor(Math.random() * TACTICS.length)];

    // Adjust based on current tactic
    if (currentTactic === "attacking") {
      eventProbabilities.shot += 0.1;
      eventProbabilities.goal += 0.05;
      eventProbabilities.corner += 0.05;
    } else if (currentTactic === "defensive") {
      eventProbabilities.shot -= 0.05;
      eventProbabilities.goal -= 0.03;
      eventProbabilities.save += 0.05;
      eventProbabilities.foul += 0.03;
    } else if (currentTactic === "possession") {
      eventProbabilities.shot -= 0.03;
      eventProbabilities.foul -= 0.05;
      eventProbabilities.corner += 0.03;
    } else if (currentTactic === "counter") {
      eventProbabilities.shot += 0.05;
      eventProbabilities.miss += 0.05;
      eventProbabilities.goal += 0.02;
    }

    // Adjust based on confidence
    if (psychologicalState.confidence > 80) {
      eventProbabilities.goal += 0.03;
      eventProbabilities.shot += 0.05;
    } else if (psychologicalState.confidence < 40) {
      eventProbabilities.miss += 0.05;
      eventProbabilities.goal -= 0.03;
    }

    // Adjust based on pressure
    if (psychologicalState.pressure > 80) {
      eventProbabilities.foul += 0.05;
      eventProbabilities.card += 0.03;
      eventProbabilities.miss += 0.03;
    }

    // Adjust based on fatigue
    if (psychologicalState.fatigue > 70) {
      eventProbabilities.foul += 0.03;
      eventProbabilities.miss += 0.05;
      eventProbabilities.goal -= 0.03;
    }

    // Normalize probabilities
    const totalProb = Object.values(eventProbabilities).reduce(
      (sum, val) => sum + val,
      0,
    );
    Object.keys(eventProbabilities).forEach((key) => {
      eventProbabilities[key as keyof typeof eventProbabilities] /= totalProb;
    });

    // Select event based on adjusted probabilities
    const random = Math.random();
    let cumulativeProb = 0;
    let selectedEventType = "";

    for (const [type, prob] of Object.entries(eventProbabilities)) {
      cumulativeProb += prob;
      if (random <= cumulativeProb) {
        selectedEventType = type;
        break;
      }
    }

    // Determine which team the event happens for
    const homeTeamProbability =
      0.5 +
      (psychologicalState.confidence - 50) / 100 +
      (currentTactic === "attacking"
        ? 0.1
        : currentTactic === "defensive"
          ? -0.1
          : 0);
    const eventTeam: "home" | "away" =
      Math.random() < homeTeamProbability ? "home" : "away";

    // Create the event
    const eventTypes = [
      {
        type: "shot",
        text: "Shot on target by",
        team: eventTeam,
        commentary: "shot",
      },
      {
        type: "goal",
        text: "GOAL! Scored by",
        team: eventTeam,
        commentary: "goal",
      },
      {
        type: "card",
        text: "Yellow card shown to",
        team: eventTeam,
        commentary: "card",
      },
      {
        type: "corner",
        text: "Corner kick for",
        team: eventTeam,
        commentary: "corner",
      },
      {
        type: "save",
        text: "Great save by",
        team: eventTeam === "home" ? "away" : "home",
        commentary: "save",
      },
      {
        type: "foul",
        text: "Foul committed by",
        team: eventTeam,
        commentary: "foul",
      },
      {
        type: "miss",
        text: "Shot goes wide from",
        team: eventTeam,
        commentary: "miss",
      },
    ];

    // Find the event object that matches the selected type
    const event =
      eventTypes.find((e) => e.type === selectedEventType) || eventTypes[0];

    // Player names
    const homePlayers = [
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
    ];
    const awayPlayers = [
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
    ];

    const playerName =
      event.team === "home"
        ? homePlayers[Math.floor(Math.random() * homePlayers.length)]
        : awayPlayers[Math.floor(Math.random() * awayPlayers.length)];

    // Create event text
    let eventText = `${event.text} ${playerName}`;

    // Update score for goals
    if (event.type === "goal") {
      setScore((prev) => ({
        ...prev,
        [event.team]: prev[event.team as keyof typeof prev] + 1,
      }));

      eventText += ` (${event.team === "home" ? score.home + 1 : score.home}-${
        event.team === "away" ? score.away + 1 : score.away
      })`;

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
        const timerSpeed = 500 / matchSpeed;
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
          <div className="flex flex-col items-center">
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
