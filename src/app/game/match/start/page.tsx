"use client";

import { useEffect, useRef, useState } from "react";

import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
import { commentaryPhrases } from "@/mock/match-start";
import {
  MatchProcessEvent,
  MatchProcessPsychological,
  MatchProcessScore,
  MatchProcessStats,
} from "@/types/match";

const initialMatchScore: MatchProcessScore = { home: 0, away: 0 };
const initialPsychologicalState: MatchProcessPsychological = {
  confidence: 70,
  pressure: 50,
  fatigue: 0,
  teamwork: 75,
};
const initialStat = {
  possession: 50,
  shots: 0,
  shotsOnTarget: 0,
  corners: 0,
  fouls: 0,
  yellowCards: 0,
  passes: 0,
  passAccuracy: 85,
  tackles: 0,
  interceptions: 0,
  heatmap: Array(10).fill(Array(10).fill(0)),
};
const initialMatchStats: MatchProcessStats = {
  home: initialStat,
  away: initialStat,
};
const extraFirstHalfTime = Math.ceil(Math.random() * 10); // Extra time in the first half (in minutes)
const extraSecondHalfTime = Math.ceil(Math.random() * 10); // Extra time in the second half (in minutes)

export default function MatchStartPage() {
  const router = useRouter();
  const [matchStarted, setMatchStarted] = useState<boolean>(false);
  const [matchPaused, setMatchPaused] = useState<boolean>(false);
  const [currentMinute, setCurrentMinute] = useState<number>(0);
  const [score, setScore] = useState<MatchProcessScore>(initialMatchScore);
  const [matchEvents, setMatchEvents] = useState<MatchProcessEvent[]>([]);
  const [matchEnded, setMatchEnded] = useState(false);
  const [waitingForApproval, setWaitingForApproval] = useState(false);
  const [homeApproved, setHomeApproved] = useState(false);
  const [awayApproved, setAwayApproved] = useState(false);
  const [abortDialogOpen, setAbortDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("match");
  const [matchSpeed, setMatchSpeed] = useState(1); // 1 = normal, 2 = fast, 0.5 = slow
  const [activeTacticalTriggers, setActiveTacticalTriggers] = useState<
    string[]
  >([]);
  const [currentTactic, setCurrentTactic] = useState("balanced");
  const [psychologicalState, setPsychologicalState] =
    useState<MatchProcessPsychological>(initialPsychologicalState);
  const [matchStats, setMatchStats] =
    useState<MatchProcessStats>(initialMatchStats);

  // Commentary state
  const [commentary, setCommentary] = useState("");
  const [commentaryHistory, setCommentaryHistory] = useState<string[]>([]);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const commentaryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const matchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstHalf = useRef<boolean>(true);

  // Add commentary
  const addCommentary = (
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

    setCommentary(fullPhrase);
    setCommentaryHistory((prev) => [fullPhrase, ...prev.slice(0, 9)]);

    // Clear commentary after a few seconds
    if (commentaryTimeoutRef.current) {
      clearTimeout(commentaryTimeoutRef.current);
    }

    commentaryTimeoutRef.current = setTimeout(() => {
      setCommentary("");
    }, 5000);
  };

  // Request match approval
  const requestMatchApproval = () => {
    setWaitingForApproval(true);

    // Simulate home team (user) approval after 1 second
    setTimeout(() => {
      setHomeApproved(true);

      // Simulate away team approval after 2-5 seconds
      setTimeout(
        () => {
          setAwayApproved(true);

          // Start match after both approvals
          setTimeout(() => {
            setWaitingForApproval(false);
            startMatch();
          }, 1000);
        },
        2000 + Math.random() * 3000,
      );
    }, 1000);
  };

  // Abort match
  const abortMatch = () => {
    setAbortDialogOpen(false);
    setWaitingForApproval(false);

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
          addCommentary("fatigue");
        } else if (newState.confidence > 85) {
          addCommentary("confidence");
        } else if (newState.pressure > 85) {
          addCommentary("pressure");
        }
      }

      return newState;
    });
  };

  // Check and apply tactical triggers
  const checkTacticalTriggers = () => {
    // Check score-based triggers
    if (
      score.home < score.away - 1 &&
      !activeTacticalTriggers.includes("losing-by-2")
    ) {
      setActiveTacticalTriggers((prev) => [...prev, "losing-by-2"]);
      setCurrentTactic("attacking");
      addCommentary("tactical");
      toast({
        title: "Tactical Change",
        description:
          "Switched to attacking mentality due to being behind by 2+ goals.",
      });
    } else if (
      score.home > score.away + 1 &&
      !activeTacticalTriggers.includes("winning-by-2")
    ) {
      setActiveTacticalTriggers((prev) => [...prev, "winning-by-2"]);
      setCurrentTactic("defensive");
      addCommentary("tactical");
      toast({
        title: "Tactical Change",
        description: "Switched to defensive mentality to protect the lead.",
      });
    }

    // Check time-based triggers
    if (
      currentMinute >= 75 &&
      score.home === score.away &&
      !activeTacticalTriggers.includes("last-15-mins-drawing")
    ) {
      setActiveTacticalTriggers((prev) => [...prev, "last-15-mins-drawing"]);
      setCurrentTactic("attacking");
      addCommentary("tactical");
      toast({
        title: "Tactical Change",
        description:
          "Pushing more players forward in the final minutes to find a winner.",
      });
    }

    // Check fatigue-based triggers
    if (
      psychologicalState.fatigue > 70 &&
      !activeTacticalTriggers.includes("player-tired")
    ) {
      setActiveTacticalTriggers((prev) => [...prev, "player-tired"]);
      toast({
        title: "Substitution Needed",
        description: "Key players are showing signs of fatigue.",
      });
    }
  };

  // Update match statistics
  const updateMatchStats = () => {
    setMatchStats((prev) => {
      const newStats = { ...prev };

      // Update possession based on current tactic and psychological state
      const possessionShift = Math.random() * 5 - 2.5; // Random shift between -2.5 and 2.5
      const tacticBonus =
        currentTactic === "possession"
          ? 5
          : currentTactic === "defensive"
            ? -5
            : 0;
      const confidenceBonus = (psychologicalState.confidence - 50) / 10; // -5 to +5 based on confidence

      newStats.home.possession = Math.max(
        30,
        Math.min(
          70,
          newStats.home.possession +
            possessionShift +
            tacticBonus +
            confidenceBonus,
        ),
      );
      newStats.away.possession = 100 - newStats.home.possession;

      // Update passes
      newStats.home.passes +=
        Math.floor(newStats.home.possession / 10) +
        Math.floor(Math.random() * 3);
      newStats.away.passes +=
        Math.floor(newStats.away.possession / 10) +
        Math.floor(Math.random() * 3);

      // Update pass accuracy based on pressure and fatigue
      newStats.home.passAccuracy = Math.max(
        70,
        Math.min(
          95,
          85 -
            psychologicalState.pressure / 20 -
            psychologicalState.fatigue / 25,
        ),
      );
      newStats.away.passAccuracy = Math.max(
        70,
        Math.min(95, 85 - Math.random() * 10),
      );

      // Update tackles and interceptions
      if (Math.random() < 0.2) {
        newStats.home.tackles += 1;
      }
      if (Math.random() < 0.2) {
        newStats.away.tackles += 1;
      }
      if (Math.random() < 0.15) {
        newStats.home.interceptions += 1;
      }
      if (Math.random() < 0.15) {
        newStats.away.interceptions += 1;
      }

      return newStats;
    });
  };

  // Match simulation logic
  const startMatch = () => {
    setMatchStarted(true);

    // Initial commentary
    addCommentary("start");

    // Start the match timer
    const timerSpeed = 500 / matchSpeed; // Adjust speed based on matchSpeed setting

    matchTimerRef.current = setInterval(() => {
      if (matchPaused) return;

      setCurrentMinute((prev) => updateCurrentMinute(prev));
    }, timerSpeed);

    // Cleanup
    return () => {
      if (commentaryTimeoutRef.current) {
        clearTimeout(commentaryTimeoutRef.current);
      }
      if (matchTimerRef.current) {
        clearInterval(matchTimerRef.current);
      }
    };
  };

  const updateCurrentMinute = (minute: number) => {
    let newMinute = minute + 1;

    // Update psychological factors
    updatePsychologicalFactors(newMinute);

    // Check tactical triggers
    checkTacticalTriggers();

    // Update match statistics
    updateMatchStats();

    // Generate random events and commentary
    if (isFirstHalf.current) {
      if (newMinute === 45) {
        if (!extraFirstHalfTime) {
          addCommentary("halfTime");
        } else {
          addCommentary(
            "extraTime",
            `Extra time is ${extraFirstHalfTime} minutes`,
          );
        }
      }
      if (newMinute === 45 + extraFirstHalfTime) {
        addCommentary("halfTime");
        isFirstHalf.current = false;
        newMinute = 45;
      }
    } else {
      if (newMinute === 90) {
        if (!extraSecondHalfTime) {
          onMatchCompleted();
        } else {
          addCommentary(
            "extraTime",
            `Extra time is ${extraSecondHalfTime} minutes`,
          );
        }
      }
      if (newMinute === 90 + extraSecondHalfTime) {
        onMatchCompleted();
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
      addCommentary(randomType);
    }

    return newMinute;
  };

  const onMatchCompleted = () => {
    setMatchPaused(true);
    addCommentary("fullTime");
    // Navigate to result page after a short delay
    setTimeout(() => {
      // router.push(`${FOOTBALL_STATS_URL}/game/match/result`);
      console.log("save the match");
    }, 5000);
  };
  console.log("render");

  // Update match speed
  const updateMatchSpeed = (newSpeed: number) => {
    setMatchSpeed(newSpeed);

    // Restart the timer with the new speed
    if (matchStarted && !matchEnded && matchTimerRef.current) {
      clearInterval(matchTimerRef.current);

      const timerSpeed = 500 / newSpeed;
      matchTimerRef.current = setInterval(() => {
        if (matchPaused) return;

        setCurrentMinute((prev) => {
          const newMinute = prev + 1;

          // Same logic as in startMatch
          updatePsychologicalFactors(newMinute);
          checkTacticalTriggers();
          updateMatchStats();

          if (newMinute === 45) {
            addCommentary("halfTime");
          } else if (newMinute === 46) {
            addCommentary("secondHalf");
          } else if (newMinute >= 80) {
            if (Math.random() < 0.1) addCommentary("lateGame");
          }

          if (newMinute % 10 === 0 || Math.random() < 0.05) {
            generateMatchEvent(newMinute);
          } else if (Math.random() < 0.1) {
            const commentaryTypes: Array<keyof typeof commentaryPhrases> = [
              "possession",
              "attack",
            ];
            const randomType: keyof typeof commentaryPhrases =
              commentaryTypes[
                Math.floor(Math.random() * commentaryTypes.length)
              ];
            addCommentary(randomType);
          }

          if (newMinute >= 90) {
            if (matchTimerRef.current) {
              clearInterval(matchTimerRef.current);
            }
            setMatchEnded(true);
            addCommentary("fullTime");

            setTimeout(() => {
              router.push(`${FOOTBALL_STATS_URL}/game/match/result`);
            }, 5000);
          }

          return newMinute;
        });
      }, timerSpeed);
    }
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

    // Update match statistics based on event type
    setMatchStats((prev) => {
      const newStats = { ...prev };
      const team = event.team as "home" | "away";

      if (event.type === "shot") {
        newStats[team].shots += 1;
        newStats[team].shotsOnTarget += 1;
      } else if (event.type === "miss") {
        newStats[team].shots += 1;
      } else if (event.type === "corner") {
        newStats[team].corners += 1;
      } else if (event.type === "foul") {
        newStats[team].fouls += 1;
      } else if (event.type === "card") {
        newStats[team].yellowCards += 1;
      }

      return newStats;
    });

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

    // Add event to list
    setMatchEvents((prev) => [
      { minute, text: eventText, type: event.type },
      ...prev,
    ]);

    // Add commentary for this event
    addCommentary(event.commentary as keyof typeof commentaryPhrases);
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

    // Final commentary
    addCommentary("fullTime");

    // Navigate to result page after a short delay
    setTimeout(() => {
      router.push(`${FOOTBALL_STATS_URL}/game/match/result`);
    }, 3000);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (commentaryTimeoutRef.current) {
        clearTimeout(commentaryTimeoutRef.current);
      }
      if (matchTimerRef.current) {
        clearInterval(matchTimerRef.current);
      }
    };
  }, []);

  const changeMatchPaused = (isPause: boolean) => {
    setMatchPaused(isPause);
    if (matchTimerRef.current) {
      if (isPause) {
        if (commentaryTimeoutRef.current) {
          clearTimeout(commentaryTimeoutRef.current);
        }
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
    <>
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
          <CardTitle>Premier League - Matchday 24</CardTitle>
          <CardDescription className="flex items-center justify-center">
            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>Saturday, 22 Mar - 15:00</span>
            <MapPin className="h-4 w-4 ml-4 mr-2 text-muted-foreground" />
            <span>United Arena (Home)</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center">
            <MatchTeamOverview
              matchStarted={matchStarted}
              score={score}
              matchEnded={matchEnded}
              currentMinute={currentMinute}
            />

            <MatchAction
              matchStarted={matchStarted}
              waitingForApproval={waitingForApproval}
              homeApproved={homeApproved}
              awayApproved={awayApproved}
              requestMatchApproval={requestMatchApproval}
            />

            {matchStarted && (
              <MatchProcess
                currentMinute={currentMinute}
                matchEnded={matchEnded}
                matchPaused={matchPaused}
                setMatchPaused={changeMatchPaused}
                setAbortDialogOpen={handleAbortOpenDialog}
                matchSpeed={matchSpeed}
                updateMatchSpeed={updateMatchSpeed}
                skipToEnd={skipToEnd}
                audioEnabled={audioEnabled}
                setAudioEnabled={setAudioEnabled}
                showTacticalOverlay={false}
                currentTactic={currentTactic}
                score={score}
                matchEvents={matchEvents}
                psychologicalState={psychologicalState}
                commentary={commentary}
                commentaryHistory={commentaryHistory}
                matchStats={matchStats}
              />
            )}
          </div>
        </CardContent>
      </Card>

      <AbortMatchDialog
        abortDialogOpen={abortDialogOpen}
        setAbortDialogOpen={setAbortDialogOpen}
        abortMatch={abortMatch}
      />
    </>
  );
}
