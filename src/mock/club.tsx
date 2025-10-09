import {
  ArrowUpRight,
  Banknote,
  Building,
  Star,
  Trophy,
  Users,
} from "lucide-react";

import { HistoricalEvent } from "@/types/club";

export const IncomeRequests = [
  {
    id: 1,
    title: "Stadium Naming Rights",
    description:
      "Offer from TechCorp to purchase naming rights for the stadium for the next 5 seasons.",
    value: 15000000,
    duration: "5 Seasons",
    proposedBy: "Commercial Director",
    status: "pending",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    title: "Training Ground Sponsorship",
    description:
      "SportsBrand wants to sponsor our training facilities with branded equipment and signage.",
    value: 3500000,
    duration: "3 Seasons",
    proposedBy: "Marketing Team",
    status: "pending",
    image: "/placeholder.svg?height=100&width=100",
  },
];

export const ClubEvents: HistoricalEvent[] = [
  {
    id: 1,
    year: 1985,
    month: 6,
    title: "Club Foundation",
    description: "FC United was founded by local businessman James Wilson",
    type: "foundation",
    icon: <Star className="h-5 w-5 text-yellow-500" />,
    details:
      "The club was established with the aim of bringing top-flight football to the local community.",
  },
  {
    id: 2,
    year: 1992,
    month: 5,
    title: "First Promotion",
    description: "Promotion to the Second Division",
    type: "promotion",
    icon: <ArrowUpRight className="h-5 w-5 text-green-500" />,
    details:
      "Under manager Robert Thompson, the club secured promotion with a dramatic final day victory.",
  },
  {
    id: 3,
    year: 1998,
    month: 8,
    title: "Stadium Expansion",
    description: "United Arena expanded to 25,000 capacity",
    type: "stadium",
    icon: <Building className="h-5 w-5 text-blue-500" />,
    details:
      "The £15 million expansion project included a new East Stand and improved facilities.",
  },
  {
    id: 4,
    year: 2005,
    month: 5,
    title: "Premier League Promotion",
    description: "First promotion to the Premier League",
    type: "promotion",
    icon: <ArrowUpRight className="h-5 w-5 text-green-500" />,
    details:
      "The club achieved promotion to the top flight for the first time in its history.",
  },
  {
    id: 5,
    year: 2010,
    month: 1,
    title: "Record Signing",
    description: "Signed Brazilian striker Carlos Silva for £20 million",
    type: "transfer",
    icon: <Banknote className="h-5 w-5 text-emerald-500" />,
    details:
      "This transfer broke the club's previous record and signaled their ambition in the transfer market.",
  },
  {
    id: 6,
    year: 2012,
    month: 6,
    title: "Appointment of John Smith",
    description: "John Smith appointed as manager",
    type: "manager",
    icon: <Users className="h-5 w-5 text-indigo-500" />,
    details:
      "Smith's appointment marked the beginning of the most successful period in the club's history.",
  },
  {
    id: 7,
    year: 2015,
    month: 8,
    title: "Stadium Renovation",
    description: "Complete renovation of United Arena to 45,000 capacity",
    type: "stadium",
    icon: <Building className="h-5 w-5 text-blue-500" />,
    details:
      "The £75 million project transformed the stadium into one of the most modern in the country.",
  },
  {
    id: 8,
    year: 2020,
    month: 5,
    title: "Europa League Victory",
    description: "First European trophy in club history",
    type: "trophy",
    icon: <Trophy className="h-5 w-5 text-purple-500" />,
    details:
      "A historic 2-1 victory over Sevilla in the final secured the club's first European silverware.",
  },
  {
    id: 9,
    year: 2021,
    month: 2,
    title: "League Cup Victory",
    description: "Defeated Arsenal 3-0 in the final",
    type: "trophy",
    icon: <Trophy className="h-5 w-5 text-blue-500" />,
    details:
      "A commanding performance at Wembley secured the League Cup trophy.",
  },
  {
    id: 10,
    year: 2022,
    month: 5,
    title: "FA Cup Victory",
    description: "Defeated Manchester City 2-1 in the final",
    type: "trophy",
    icon: <Trophy className="h-5 w-5 text-blue-500" />,
    details:
      "A thrilling match at Wembley saw the club lift the FA Cup for the first time.",
  },
  {
    id: 11,
    year: 2023,
    month: 5,
    title: "Premier League Champions",
    description: "First league title in club history",
    type: "trophy",
    icon: <Trophy className="h-5 w-5 text-yellow-500" />,
    details:
      "The culmination of years of progress, the club finally claimed the Premier League title.",
  },
];
