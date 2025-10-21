export const randomMatchEvent = (minute: number, data: any) => {
  const TACTICS = [
    "balanced",
    "offensive",
    "defensive",
    "possession",
    "counter",
  ];
  const psychologicalState = {
    confidence: Math.random() * 100,
    pressure: Math.random() * 100,
    fatigue: Math.random() * 100,
  };

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

  return event;
};
