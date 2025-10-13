import { PlayerPosition } from "@/types/match";

// Commentator phrases
export const commentaryPhrases = {
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
  extraTime: [
    "Extra time is being called.",
    "The match is going into extra time.",
    "The referee blows for extra time.",
    "The teams are heading to the extra time break.",
  ],
};

// Player roles with descriptions
export const playerRoles = {
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
export const tacticalTriggers = [
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
export const statCategories = [
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

const homePlayers: PlayerPosition[] = [
  {
    id: 1,
    x: 50,
    y: 90,
    team: "home",
    moving: false,
    direction: { x: 0, y: 0 },
    targetX: 50,
    targetY: 90,
  }, // GK
  {
    id: 2,
    x: 20,
    y: 75,
    team: "home",
    moving: false,
    direction: { x: 0, y: 0 },
    targetX: 20,
    targetY: 75,
  }, // LB
  {
    id: 3,
    x: 35,
    y: 75,
    team: "home",
    moving: false,
    direction: { x: 0, y: 0 },
    targetX: 35,
    targetY: 75,
  }, // CB
  {
    id: 4,
    x: 65,
    y: 75,
    team: "home",
    moving: false,
    direction: { x: 0, y: 0 },
    targetX: 65,
    targetY: 75,
  }, // CB
  {
    id: 5,
    x: 80,
    y: 75,
    team: "home",
    moving: false,
    direction: { x: 0, y: 0 },
    targetX: 80,
    targetY: 75,
  }, // RB
  {
    id: 6,
    x: 35,
    y: 60,
    team: "home",
    moving: false,
    direction: { x: 0, y: 0 },
    targetX: 35,
    targetY: 60,
  }, // CM
  {
    id: 7,
    x: 50,
    y: 55,
    team: "home",
    moving: false,
    direction: { x: 0, y: 0 },
    targetX: 50,
    targetY: 55,
  }, // CM
  {
    id: 8,
    x: 65,
    y: 60,
    team: "home",
    moving: false,
    direction: { x: 0, y: 0 },
    targetX: 65,
    targetY: 60,
  }, // CM
  {
    id: 9,
    x: 25,
    y: 40,
    team: "home",
    moving: false,
    direction: { x: 0, y: 0 },
    targetX: 25,
    targetY: 40,
  }, // LW
  {
    id: 10,
    x: 50,
    y: 35,
    team: "home",
    moving: false,
    direction: { x: 0, y: 0 },
    targetX: 50,
    targetY: 35,
  }, // ST
  {
    id: 11,
    x: 75,
    y: 40,
    team: "home",
    moving: false,
    direction: { x: 0, y: 0 },
    targetX: 75,
    targetY: 40,
  }, // RW
];

const awayPlayers: PlayerPosition[] = [
  {
    id: 12,
    x: 50,
    y: 10,
    team: "away",
    moving: false,
    direction: { x: 0, y: 0 },
    targetX: 50,
    targetY: 10,
  }, // GK
  {
    id: 13,
    x: 20,
    y: 25,
    team: "away",
    moving: false,
    direction: { x: 0, y: 0 },
    targetX: 20,
    targetY: 25,
  }, // LB
  {
    id: 14,
    x: 35,
    y: 25,
    team: "away",
    moving: false,
    direction: { x: 0, y: 0 },
    targetX: 35,
    targetY: 25,
  }, // CB
  {
    id: 15,
    x: 65,
    y: 25,
    team: "away",
    moving: false,
    direction: { x: 0, y: 0 },
    targetX: 65,
    targetY: 25,
  }, // CB
  {
    id: 16,
    x: 80,
    y: 25,
    team: "away",
    moving: false,
    direction: { x: 0, y: 0 },
    targetX: 80,
    targetY: 25,
  }, // RB
  {
    id: 17,
    x: 20,
    y: 40,
    team: "away",
    moving: false,
    direction: { x: 0, y: 0 },
    targetX: 20,
    targetY: 40,
  }, // LM
  {
    id: 18,
    x: 35,
    y: 45,
    team: "away",
    moving: false,
    direction: { x: 0, y: 0 },
    targetX: 35,
    targetY: 45,
  }, // CM
  {
    id: 19,
    x: 65,
    y: 45,
    team: "away",
    moving: false,
    direction: { x: 0, y: 0 },
    targetX: 65,
    targetY: 45,
  }, // CM
  {
    id: 20,
    x: 80,
    y: 40,
    team: "away",
    moving: false,
    direction: { x: 0, y: 0 },
    targetX: 80,
    targetY: 40,
  }, // RM
  {
    id: 21,
    x: 40,
    y: 65,
    team: "away",
    moving: false,
    direction: { x: 0, y: 0 },
    targetX: 40,
    targetY: 65,
  }, // ST
  {
    id: 22,
    x: 60,
    y: 65,
    team: "away",
    moving: false,
    direction: { x: 0, y: 0 },
    targetX: 60,
    targetY: 65,
  }, // ST
];

export const playerInMatch = [...homePlayers, ...awayPlayers];
