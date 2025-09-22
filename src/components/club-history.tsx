'use client';

import type React from 'react';

import {
  ArrowUpRight,
  Banknote,
  Calendar,
  StickerIcon as Stadium,
  Star,
  Trophy,
  Users,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

type HistoricalEvent = {
  id: number;
  year: number;
  month?: number;
  title: string;
  description: string;
  type:
    | 'foundation'
    | 'trophy'
    | 'transfer'
    | 'manager'
    | 'stadium'
    | 'promotion'
    | 'relegation'
    | 'milestone';
  icon: React.ReactNode;
  details?: string;
};

export default function ClubHistory() {
  // Sample historical events
  const events: HistoricalEvent[] = [
    {
      id: 1,
      year: 1985,
      month: 6,
      title: 'Club Foundation',
      description: 'FC United was founded by local businessman James Wilson',
      type: 'foundation',
      icon: <Star className="h-5 w-5 text-yellow-500" />,
      details:
        'The club was established with the aim of bringing top-flight football to the local community.',
    },
    {
      id: 2,
      year: 1992,
      month: 5,
      title: 'First Promotion',
      description: 'Promotion to the Second Division',
      type: 'promotion',
      icon: <ArrowUpRight className="h-5 w-5 text-green-500" />,
      details:
        'Under manager Robert Thompson, the club secured promotion with a dramatic final day victory.',
    },
    {
      id: 3,
      year: 1998,
      month: 8,
      title: 'Stadium Expansion',
      description: 'United Arena expanded to 25,000 capacity',
      type: 'stadium',
      icon: <Stadium className="h-5 w-5 text-blue-500" />,
      details:
        'The £15 million expansion project included a new East Stand and improved facilities.',
    },
    {
      id: 4,
      year: 2005,
      month: 5,
      title: 'Premier League Promotion',
      description: 'First promotion to the Premier League',
      type: 'promotion',
      icon: <ArrowUpRight className="h-5 w-5 text-green-500" />,
      details:
        'The club achieved promotion to the top flight for the first time in its history.',
    },
    {
      id: 5,
      year: 2010,
      month: 1,
      title: 'Record Signing',
      description: 'Signed Brazilian striker Carlos Silva for £20 million',
      type: 'transfer',
      icon: <Banknote className="h-5 w-5 text-emerald-500" />,
      details:
        "This transfer broke the club's previous record and signaled their ambition in the transfer market.",
    },
    {
      id: 6,
      year: 2012,
      month: 6,
      title: 'Appointment of John Smith',
      description: 'John Smith appointed as manager',
      type: 'manager',
      icon: <Users className="h-5 w-5 text-indigo-500" />,
      details:
        "Smith's appointment marked the beginning of the most successful period in the club's history.",
    },
    {
      id: 7,
      year: 2015,
      month: 8,
      title: 'Stadium Renovation',
      description: 'Complete renovation of United Arena to 45,000 capacity',
      type: 'stadium',
      icon: <Stadium className="h-5 w-5 text-blue-500" />,
      details:
        'The £75 million project transformed the stadium into one of the most modern in the country.',
    },
    {
      id: 8,
      year: 2020,
      month: 5,
      title: 'Europa League Victory',
      description: 'First European trophy in club history',
      type: 'trophy',
      icon: <Trophy className="h-5 w-5 text-purple-500" />,
      details:
        "A historic 2-1 victory over Sevilla in the final secured the club's first European silverware.",
    },
    {
      id: 9,
      year: 2021,
      month: 2,
      title: 'League Cup Victory',
      description: 'Defeated Arsenal 3-0 in the final',
      type: 'trophy',
      icon: <Trophy className="h-5 w-5 text-blue-500" />,
      details:
        'A commanding performance at Wembley secured the League Cup trophy.',
    },
    {
      id: 10,
      year: 2022,
      month: 5,
      title: 'FA Cup Victory',
      description: 'Defeated Manchester City 2-1 in the final',
      type: 'trophy',
      icon: <Trophy className="h-5 w-5 text-blue-500" />,
      details:
        'A thrilling match at Wembley saw the club lift the FA Cup for the first time.',
    },
    {
      id: 11,
      year: 2023,
      month: 5,
      title: 'Premier League Champions',
      description: 'First league title in club history',
      type: 'trophy',
      icon: <Trophy className="h-5 w-5 text-yellow-500" />,
      details:
        'The culmination of years of progress, the club finally claimed the Premier League title.',
    },
  ];

  // Sort events by year (descending) and then by month if available
  const sortedEvents = [...events].sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    return (b.month || 0) - (a.month || 0);
  });

  // Group events by decade
  const eventsByDecade: Record<string, HistoricalEvent[]> = {};

  sortedEvents.forEach((event) => {
    const decade = Math.floor(event.year / 10) * 10;
    const decadeKey = `${decade}s`;

    if (!eventsByDecade[decadeKey]) {
      eventsByDecade[decadeKey] = [];
    }

    eventsByDecade[decadeKey].push(event);
  });

  const getMonthName = (month: number) => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return months[month - 1];
  };

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case 'foundation':
        return 'Foundation';
      case 'trophy':
        return 'Trophy';
      case 'transfer':
        return 'Transfer';
      case 'manager':
        return 'Management';
      case 'stadium':
        return 'Stadium';
      case 'promotion':
        return 'Promotion';
      case 'relegation':
        return 'Relegation';
      case 'milestone':
        return 'Milestone';
      default:
        return 'Event';
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <Calendar className="h-8 w-8 text-blue-500 mb-2" />
            <h3 className="font-bold text-xl">{2023 - 1985}</h3>
            <p className="text-sm text-muted-foreground">Years of History</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <Trophy className="h-8 w-8 text-yellow-500 mb-2" />
            <h3 className="font-bold text-xl">
              {events.filter((e) => e.type === 'trophy').length}
            </h3>
            <p className="text-sm text-muted-foreground">Major Trophies</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <ArrowUpRight className="h-8 w-8 text-green-500 mb-2" />
            <h3 className="font-bold text-xl">
              {events.filter((e) => e.type === 'promotion').length}
            </h3>
            <p className="text-sm text-muted-foreground">Promotions</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <Stadium className="h-8 w-8 text-blue-500 mb-2" />
            <h3 className="font-bold text-xl">45,000</h3>
            <p className="text-sm text-muted-foreground">Stadium Capacity</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Club Timeline</CardTitle>
          <CardDescription>Key events in FC United's history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {Object.entries(eventsByDecade).map(([decade, decadeEvents]) => (
              <div key={decade} className="space-y-4">
                <h3 className="text-lg font-bold">{decade}</h3>
                <div className="space-y-6">
                  {decadeEvents.map((event, index) => (
                    <div key={event.id} className="relative pl-8 pb-6">
                      {/* Timeline connector */}
                      {index < decadeEvents.length - 1 && (
                        <div className="absolute left-[15px] top-[28px] bottom-0 w-[2px] bg-muted"></div>
                      )}

                      {/* Event dot */}
                      <div className="absolute left-0 top-1 w-[30px] h-[30px] rounded-full bg-muted flex items-center justify-center">
                        {event.icon}
                      </div>

                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-medium">{event.year}</span>
                          {event.month && (
                            <span className="text-muted-foreground text-sm">
                              {getMonthName(event.month)}
                            </span>
                          )}
                          <Badge variant="outline" className="ml-auto">
                            {getEventTypeLabel(event.type)}
                          </Badge>
                        </div>

                        <h4 className="font-medium">{event.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {event.description}
                        </p>

                        {event.details && (
                          <>
                            <Separator className="my-2" />
                            <p className="text-sm">{event.details}</p>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Club Records</CardTitle>
          <CardDescription>Notable achievements and statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-3">Team Records</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Highest League Finish:
                  </span>
                  <span className="font-medium">
                    1st (Premier League, 2023)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Most Goals in a Season:
                  </span>
                  <span className="font-medium">87 (2022/23)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Fewest Goals Conceded:
                  </span>
                  <span className="font-medium">28 (2022/23)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Longest Winning Streak:
                  </span>
                  <span className="font-medium">12 matches (2022/23)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Biggest Victory:
                  </span>
                  <span className="font-medium">7-0 vs Southampton (2021)</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">Individual Records</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Most Appearances:
                  </span>
                  <span className="font-medium">Steven Taylor (412)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    All-time Top Scorer:
                  </span>
                  <span className="font-medium">Mark Williams (156)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Most Goals in a Season:
                  </span>
                  <span className="font-medium">
                    Mark Williams (28, 2022/23)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Most Assists in a Season:
                  </span>
                  <span className="font-medium">
                    Chris Johnson (17, 2022/23)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Longest-serving Manager:
                  </span>
                  <span className="font-medium">
                    John Smith (11 years, 2012-present)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
