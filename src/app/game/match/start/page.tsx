"use client";

import { useEffect, useRef, useState } from "react";

import { ArrowLeft, Calendar, MapPin, Play } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import AbortMatchDialog from "@/components/abort-match-dialog";
import PageTitle from "@/components/common/page-title";
import MatchProcess from "@/components/match-process";
import MatchTeamOverview from "@/components/match-team-overview";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import WaitingForApproval from "@/components/waiting-for-approval";
import { FOOTBALL_STATS_URL } from "@/constants/site";
import { toast } from "@/hooks/use-toast";

// Commentator phrases
const commentaryPhrases = {
  start: [
    "And we're underway here at United Arena!",
    "The referee blows the whistle and we're off!",
    "The match begins with both teams looking eager to make an early impact.",
  ],
  possession: [
    "Nice build-up play from the home team.",
    "The away side is keeping possession well.",
    "Patient play in the midfield.",
    "They're moving the ball around nicely.",
    "Good passing sequence here.",
  ],
  attack: [
    "They're pushing forward now!",
    "Dangerous attack developing!",
    "They're getting into a good position here.",
    "This looks promising!",
    "They're putting the pressure on!",
  ],
  shot: [
    "And there's a shot!",
    "He tries his luck from distance!",
    "Going for goal!",
    "Takes the shot!",
    "Strikes it towards goal!",
  ],
  goal: [
    "GOAL! What a fantastic finish!",
    "GOAL! The net bulges and the crowd erupts!",
    "GOAL! A clinical finish!",
    "GOAL! Absolutely brilliant strike!",
    "GOAL! The goalkeeper had no chance with that one!",
  ],
  save: [
    "Great save by the goalkeeper!",
    "The keeper gets down well to make the stop!",
    "Brilliant reflexes from the goalkeeper!",
    "What a save that is!",
    "The goalkeeper denies them with a fantastic stop!",
  ],
  miss: [
    "Just wide of the post!",
    "That's gone over the bar!",
    "Not far away, but it's missed the target!",
    "He couldn't keep it down!",
    "That's flashed just wide of the goal!",
  ],
  foul: [
    "The referee has called a foul there.",
    "Free kick awarded for that challenge.",
    "That's a late tackle and the ref blows for a foul.",
    "The referee didn't like that challenge.",
    "Foul given against the defender.",
  ],
  card: [
    "The referee reaches for his pocket...",
    "That's going to be a card for that challenge.",
    "The referee has no choice but to book him for that.",
    "He's going into the book for that foul.",
    "Yellow card shown for that reckless challenge.",
  ],
  corner: [
    "Corner kick coming up.",
    "The defender puts it behind for a corner.",
    "They've won a corner here.",
    "It's gone behind for a corner kick.",
    "Corner to be taken.",
  ],
  halfTime: [
    "The referee blows for half time.",
    "And that's the end of the first half.",
    "Half time here, with the score at",
    "The teams head to the dressing rooms at the break.",
    "That's the first 45 minutes completed.",
  ],
  secondHalf: [
    "The second half is underway!",
    "We're back for the second half!",
    "The teams are back out and we're ready for the second half.",
    "The referee gets the second half started.",
    "Here we go with the second half!",
  ],
  lateGame: [
    "We're into the final stages of this match.",
    "Not long left in this game now.",
    "Time is running out for a comeback.",
    "Just a few minutes remaining.",
    "We're approaching the final whistle.",
  ],
  fullTime: [
    "And there's the final whistle!",
    "The referee brings this match to an end!",
    "It's all over here!",
    "Full time and that's the end of the match!",
    "The match is over!",
  ],
  pressure: [
    "The pressure is mounting now!",
    "They're really feeling the pressure here.",
    "You can see the tension in their play.",
    "The crowd is getting anxious as the pressure builds.",
    "They need to stay composed under this pressure.",
  ],
  confidence: [
    "They're playing with real confidence now.",
    "You can see the confidence flowing through the team.",
    "Their body language shows how confident they are.",
    "That's the kind of play that comes with confidence.",
    "They're expressing themselves with confidence.",
  ],
  fatigue: [
    "You can see the fatigue setting in now.",
    "Some tired legs out there as we approach the final stages.",
    "They're looking a bit leggy now.",
    "Fatigue might be a factor in these closing minutes.",
    "They're digging deep to overcome the fatigue.",
  ],
  tactical: [
    "Interesting tactical adjustment there.",
    "That's a clever tactical change from the manager.",
    "They've shifted their formation slightly.",
    "The manager is trying to change the flow of the game tactically.",
    "That tactical switch could make all the difference.",
  ],
};

// Player roles with descriptions
const playerRoles = {
  striker: [
    {
      id: "advanced-forward",
      name: "Advanced Forward",
      description: "Leads the attack and looks to get behind the defense",
    },
    {
      id: "target-man",
      name: "Target Man",
      description: "Holds up play and brings others into the game",
    },
    {
      id: "false-nine",
      name: "False Nine",
      description: "Drops deep to create space and link play",
    },
    {
      id: "poacher",
      name: "Poacher",
      description: "Stays forward and focuses on scoring goals",
    },
    {
      id: "complete-forward",
      name: "Complete Forward",
      description: "Combines all aspects of forward play",
    },
  ],
  midfielder: [
    {
      id: "box-to-box",
      name: "Box-to-Box",
      description: "Contributes to both attack and defense",
    },
    {
      id: "deep-lying-playmaker",
      name: "Deep-Lying Playmaker",
      description: "Dictates play from deep positions",
    },
    {
      id: "advanced-playmaker",
      name: "Advanced Playmaker",
      description: "Creates chances in advanced positions",
    },
    {
      id: "ball-winning-midfielder",
      name: "Ball-Winning Midfielder",
      description: "Focuses on winning possession",
    },
    {
      id: "mezzala",
      name: "Mezzala",
      description: "Operates in half-spaces to create overloads",
    },
  ],
  defender: [
    {
      id: "ball-playing-defender",
      name: "Ball-Playing Defender",
      description: "Comfortable in possession and starts attacks",
    },
    {
      id: "no-nonsense-defender",
      name: "No-Nonsense Defender",
      description: "Focuses purely on defensive duties",
    },
    {
      id: "libero",
      name: "Libero",
      description: "Sweeps behind the defense and joins midfield",
    },
    {
      id: "inverted-wingback",
      name: "Inverted Wing-Back",
      description: "Moves inside to create midfield overloads",
    },
    {
      id: "complete-wingback",
      name: "Complete Wing-Back",
      description: "Provides width in attack and defense",
    },
  ],
};

// Tactical triggers
const tacticalTriggers = [
  {
    id: "losing-by-2",
    name: "When losing by 2+ goals",
    description: "Switch to attacking mentality",
  },
  {
    id: "winning-by-2",
    name: "When winning by 2+ goals",
    description: "Switch to defensive mentality",
  },
  {
    id: "last-15-mins-drawing",
    name: "Last 15 mins when drawing",
    description: "Push more players forward",
  },
  {
    id: "opponent-red-card",
    name: "Opponent gets a red card",
    description: "Increase attacking width",
  },
  {
    id: "player-tired",
    name: "Key player below 70% fitness",
    description: "Prepare substitution",
  },
  {
    id: "concede-from-set-piece",
    name: "Concede from set piece",
    description: "Add extra defender at set pieces",
  },
];

// Match statistics categories
const statCategories = [
  "possession",
  "shots",
  "shotsOnTarget",
  "corners",
  "fouls",
  "yellowCards",
  "passes",
  "passAccuracy",
  "tackles",
  "interceptions",
];

// Player psychological states
type PsychologicalState = {
  confidence: number; // 0-100
  pressure: number; // 0-100
  fatigue: number; // 0-100
  teamwork: number; // 0-100
};

export default function MatchStartPage() {
  const router = useRouter();
  const [matchStarted, setMatchStarted] = useState(false);
  const [matchPaused, setMatchPaused] = useState(false);
  const [currentMinute, setCurrentMinute] = useState(0);
  const [score, setScore] = useState({ home: 0, away: 0 });
  const [matchEvents, setMatchEvents] = useState<
    { minute: number; text: string; type: string }[]
  >([]);
  const [matchEnded, setMatchEnded] = useState(false);
  const [waitingForApproval, setWaitingForApproval] = useState(false);
  const [homeApproved, setHomeApproved] = useState(false);
  const [awayApproved, setAwayApproved] = useState(false);
  const [abortDialogOpen, setAbortDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("match");
  const [showTacticalOverlay, setShowTacticalOverlay] = useState(false);
  const [matchSpeed, setMatchSpeed] = useState(1); // 1 = normal, 2 = fast, 0.5 = slow
  const [activeTacticalTriggers, setActiveTacticalTriggers] = useState<
    string[]
  >([]);
  const [currentTactic, setCurrentTactic] = useState("balanced");
  const [psychologicalState, setPsychologicalState] =
    useState<PsychologicalState>({
      confidence: 70,
      pressure: 50,
      fatigue: 0,
      teamwork: 75,
    });

  // Match statistics
  const [matchStats, setMatchStats] = useState({
    home: {
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
      heatmap: Array(10).fill(Array(10).fill(0)), // 10x10 grid for heatmap
    },
    away: {
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
    },
  });

  // Commentary state
  const [commentary, setCommentary] = useState("");
  const [commentaryHistory, setCommentaryHistory] = useState<string[]>([]);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const commentaryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const matchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Audio synthesis (simulated)
  const speakCommentary = (text: string) => {
    if (!audioEnabled) return;

    // In a real app, we would use the Web Speech API:
    // const utterance = new SpeechSynthesisUtterance(text);
    // window.speechSynthesis.speak(utterance);

    // For now, we'll just show a toast to simulate the audio
    toast({
      title: "Commentary",
      description: text,
      duration: 3000,
    });
  };

  // Add commentary
  const addCommentary = (type: keyof typeof commentaryPhrases) => {
    const phrases = commentaryPhrases[type];
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];

    let fullPhrase = randomPhrase;

    // Add score for certain commentary types
    if (type === "goal" || type === "halfTime" || type === "fullTime") {
      fullPhrase += ` The score is ${score.home}-${score.away}.`;
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

    // Reset match state
    setCurrentMinute(0);
    setScore({ home: 0, away: 0 });
    setMatchEvents([]);
    setCommentaryHistory([]);
    setPsychologicalState({
      confidence: 70,
      pressure: 50,
      fatigue: 0,
      teamwork: 75,
    });
    setMatchStats({
      home: {
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
      },
      away: {
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
      },
    });

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
    const newMinute = minute + 1;

    // Update psychological factors
    updatePsychologicalFactors(newMinute);

    // Check tactical triggers
    checkTacticalTriggers();

    // Update match statistics
    updateMatchStats();

    // Generate random events and commentary
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
      // Random commentary for atmosphere
      const commentaryTypes: Array<keyof typeof commentaryPhrases> = [
        "possession",
        "attack",
      ];
      const randomType: keyof typeof commentaryPhrases =
        commentaryTypes[Math.floor(Math.random() * commentaryTypes.length)];
      addCommentary(randomType);
    }

    // End match at 90 minutes
    if (newMinute >= 90) {
      if (matchTimerRef.current) {
        clearInterval(matchTimerRef.current);
      }
      setMatchEnded(true);
      addCommentary("fullTime");

      // Navigate to result page after a short delay
      setTimeout(() => {
        router.push(`${FOOTBALL_STATS_URL}/game/match/result`);
      }, 5000);
    }

    return newMinute;
  };

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

  // Change tactics
  const changeTactics = (tactic: string) => {
    setCurrentTactic(tactic);

    addCommentary("tactical");

    toast({
      title: "Tactics Changed",
      description: `Switched to ${tactic} tactics.`,
    });
  };

  // Toggle tactical trigger
  const toggleTacticalTrigger = (triggerId: string) => {
    setActiveTacticalTriggers((prev) => {
      if (prev.includes(triggerId)) {
        return prev.filter((id) => id !== triggerId);
      } else {
        return [...prev, triggerId];
      }
    });
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
          <CardDescription>
            <div className="flex items-center justify-center">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>Saturday, 22 Mar - 15:00</span>
              <MapPin className="h-4 w-4 ml-4 mr-2 text-muted-foreground" />
              <span>United Arena (Home)</span>
            </div>
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

            {!matchStarted && !waitingForApproval && (
              <>
                <Button
                  size="lg"
                  onClick={requestMatchApproval}
                  className="mb-4"
                >
                  <Play className="h-5 w-5" />
                  Start Match
                </Button>

                <p className="text-sm text-muted-foreground max-w-md text-center">
                  Starting the match will simulate the game in real-time. You
                  can pause at any time to make tactical changes.
                </p>
              </>
            )}

            {waitingForApproval && (
              <WaitingForApproval
                homeApproved={homeApproved}
                awayApproved={homeApproved}
              />
            )}

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
                setShowTacticalOverlay={setShowTacticalOverlay}
                currentTactic={currentTactic}
                score={score}
                matchEvents={matchEvents}
                psychologicalState={psychologicalState}
                commentary={commentary}
                commentaryHistory={commentaryHistory}
                changeTactics={changeTactics}
                tacticalTriggers={tacticalTriggers}
                activeTacticalTriggers={activeTacticalTriggers}
                toggleTacticalTrigger={toggleTacticalTrigger}
                playerRoles={playerRoles}
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
