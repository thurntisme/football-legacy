'use client';

import { useState } from 'react';

import {
  AlertTriangle,
  Calendar,
  GraduationCap,
  Loader2,
  Sparkles,
  Star,
  Users,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';

// Youth player type
type YouthPlayer = {
  id: number;
  name: string;
  age: number;
  position: string;
  nationality: string;
  potential: number; // 1-100
  personality: string;
  attributes: {
    technical: number;
    mental: number;
    physical: number;
  };
  promoted: boolean;
  status: 'new' | 'developing' | 'ready';
};

// Intake event type
type IntakeEvent = {
  id: number;
  date: string;
  status: 'upcoming' | 'in_progress' | 'completed';
  quality: 'poor' | 'average' | 'good' | 'excellent';
  players: YouthPlayer[];
  description: string;
};

export default function YouthIntake() {
  // Mock intake events
  const [intakeEvents, setIntakeEvents] = useState<IntakeEvent[]>([
    {
      id: 1,
      date: '2025-03-15',
      status: 'completed',
      quality: 'good',
      description: 'Annual youth intake with several promising talents.',
      players: [
        {
          id: 1,
          name: 'James Wilson',
          age: 16,
          position: 'ST',
          nationality: 'England',
          potential: 78,
          personality: 'Determined',
          attributes: {
            technical: 65,
            mental: 62,
            physical: 60,
          },
          promoted: false,
          status: 'new',
        },
        {
          id: 2,
          name: 'Carlos Mendes',
          age: 15,
          position: 'CAM',
          nationality: 'Portugal',
          potential: 82,
          personality: 'Professional',
          attributes: {
            technical: 70,
            mental: 65,
            physical: 58,
          },
          promoted: false,
          status: 'new',
        },
        {
          id: 3,
          name: 'Liam Thompson',
          age: 16,
          position: 'CB',
          nationality: 'England',
          potential: 75,
          personality: 'Ambitious',
          attributes: {
            technical: 62,
            mental: 68,
            physical: 72,
          },
          promoted: false,
          status: 'new',
        },
        {
          id: 4,
          name: 'Kai Zhang',
          age: 15,
          position: 'RW',
          nationality: 'China',
          potential: 80,
          personality: 'Determined',
          attributes: {
            technical: 68,
            mental: 64,
            physical: 63,
          },
          promoted: false,
          status: 'new',
        },
        {
          id: 5,
          name: 'Samuel Osei',
          age: 16,
          position: 'CDM',
          nationality: 'Ghana',
          potential: 77,
          personality: 'Resolute',
          attributes: {
            technical: 64,
            mental: 70,
            physical: 68,
          },
          promoted: false,
          status: 'new',
        },
      ],
    },
    {
      id: 2,
      date: '2026-03-15',
      status: 'upcoming',
      quality: 'average',
      description: 'Annual youth intake scheduled for next season.',
      players: [],
    },
  ]);

  const [selectedEvent, setSelectedEvent] = useState<IntakeEvent | null>(null);
  const [intakeDialogOpen, setIntakeDialogOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<YouthPlayer | null>(
    null
  );
  const [playerDialogOpen, setPlayerDialogOpen] = useState(false);
  const [isPromoting, setIsPromoting] = useState(false);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showIntakePreview, setShowIntakePreview] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewQuality, setPreviewQuality] = useState<string | null>(null);

  // Handle viewing intake details
  const handleViewIntake = (event: IntakeEvent) => {
    setSelectedEvent(event);
    setIntakeDialogOpen(true);
  };

  // Handle viewing player details
  const handleViewPlayer = (player: YouthPlayer) => {
    setSelectedPlayer(player);
    setPlayerDialogOpen(true);
  };

  // Handle promoting player to senior team
  const handlePromotePlayer = (player: YouthPlayer) => {
    setIsPromoting(true);

    // Simulate loading time
    setTimeout(() => {
      // Update player status
      const updatedEvents = intakeEvents.map((event) => {
        if (event.id === selectedEvent?.id) {
          const updatedPlayers = event.players.map((p) =>
            p.id === player.id ? { ...p, promoted: true } : p
          );
          return { ...event, players: updatedPlayers };
        }
        return event;
      });

      setIntakeEvents(updatedEvents);
      setIsPromoting(false);
      setPlayerDialogOpen(false);

      toast({
        title: 'Player Promoted',
        description: `${player.name} has been promoted to the senior team.`,
      });
    }, 1500);
  };

  // Handle requesting intake preview
  const handleRequestPreview = () => {
    setPreviewLoading(true);

    // Simulate loading time
    setTimeout(() => {
      // Randomly determine preview quality
      const qualities = ['poor', 'average', 'good', 'excellent'];
      const randomQuality =
        qualities[Math.floor(Math.random() * qualities.length)];

      setPreviewQuality(randomQuality);
      setPreviewLoading(false);
      setShowIntakePreview(true);
    }, 2000);
  };

  // Get quality badge
  const getQualityBadge = (quality: string) => {
    switch (quality) {
      case 'excellent':
        return <Badge className="bg-green-500">Excellent</Badge>;
      case 'good':
        return <Badge className="bg-blue-500">Good</Badge>;
      case 'average':
        return <Badge className="bg-amber-500">Average</Badge>;
      case 'poor':
        return <Badge className="bg-red-500">Poor</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500">Completed</Badge>;
      case 'in_progress':
        return <Badge className="bg-blue-500">In Progress</Badge>;
      case 'upcoming':
        return <Badge className="bg-amber-500">Upcoming</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Get player status badge
  const getPlayerStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge className="bg-blue-500">New</Badge>;
      case 'developing':
        return <Badge className="bg-amber-500">Developing</Badge>;
      case 'ready':
        return <Badge className="bg-green-500">Ready</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Filter events based on active tab
  const filteredEvents = intakeEvents.filter((event) => {
    if (activeTab === 'upcoming') {
      return event.status === 'upcoming' || event.status === 'in_progress';
    } else if (activeTab === 'completed') {
      return event.status === 'completed';
    }
    return true;
  });

  // Calculate days until next intake
  const getDaysUntilNextIntake = () => {
    const upcomingEvent = intakeEvents.find(
      (event) => event.status === 'upcoming'
    );
    if (!upcomingEvent) return 'Unknown';

    const eventDate = new Date(upcomingEvent.date);
    const today = new Date();
    const diffTime = Math.abs(eventDate.getTime() - today.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full md:w-auto"
        >
          <TabsList>
            <TabsTrigger value="upcoming">
              Upcoming Intakes (
              {intakeEvents.filter((e) => e.status !== 'completed').length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Past Intakes (
              {intakeEvents.filter((e) => e.status === 'completed').length})
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredEvents.map((event) => (
          <Card
            key={event.id}
            className={
              event.status === 'completed'
                ? 'border-green-500/50'
                : 'border-amber-500/50'
            }
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Youth Intake {new Date(event.date).getFullYear()}
                </CardTitle>
                <div className="flex gap-2">
                  {getStatusBadge(event.status)}
                  {event.status === 'completed' &&
                    getQualityBadge(event.quality)}
                </div>
              </div>
              <CardDescription>{event.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Date
                    </div>
                    <div className="font-medium">
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Status
                    </div>
                    <div className="font-medium capitalize">
                      {event.status.replace('_', ' ')}
                    </div>
                  </div>
                  {event.status === 'completed' && (
                    <>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">
                          Players
                        </div>
                        <div className="font-medium">
                          {event.players.length} youth players
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">
                          Quality
                        </div>
                        <div className="font-medium capitalize">
                          {event.quality}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {event.status === 'upcoming' && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-md">
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 text-amber-600 mr-2 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-amber-800 mb-1">
                          Upcoming Youth Intake
                        </h4>
                        <p className="text-sm text-amber-700">
                          Your next youth intake is scheduled in{' '}
                          {getDaysUntilNextIntake()} days. You can request a
                          preview from your Head of Youth Development.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              {event.status === 'completed' ? (
                <Button
                  className="w-full"
                  onClick={() => handleViewIntake(event)}
                >
                  View Youth Players ({event.players.length})
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSelectedEvent(event);
                    setShowIntakePreview(false);
                    setPreviewQuality(null);
                    setIntakeDialogOpen(true);
                  }}
                >
                  Preview Upcoming Intake
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Intake Details Dialog */}
      <Dialog open={intakeDialogOpen} onOpenChange={setIntakeDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedEvent && (
            <>
              <DialogHeader>
                <DialogTitle>
                  {selectedEvent.status === 'completed'
                    ? `Youth Intake ${new Date(selectedEvent.date).getFullYear()}`
                    : `Upcoming Youth Intake (${new Date(selectedEvent.date).toLocaleDateString()})`}
                </DialogTitle>
                <DialogDescription>
                  {selectedEvent.status === 'completed'
                    ? `Youth players who joined your academy in ${new Date(selectedEvent.date).getFullYear()}`
                    : 'Preview of your upcoming youth intake'}
                </DialogDescription>
              </DialogHeader>

              <div className="py-4">
                {selectedEvent.status === 'completed' ? (
                  <div className="grid grid-cols-1 gap-4">
                    {selectedEvent.players.map((player) => (
                      <Card key={player.id} className="overflow-hidden">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <CardTitle className="text-lg">
                              {player.name}
                            </CardTitle>
                            <div className="flex gap-2">
                              {getPlayerStatusBadge(player.status)}
                              {player.promoted && (
                                <Badge className="bg-purple-500">
                                  Promoted
                                </Badge>
                              )}
                            </div>
                          </div>
                          <CardDescription>
                            {player.age} years • {player.position} •{' '}
                            {player.nationality} • {player.personality}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <div className="text-sm text-muted-foreground mb-1">
                                Potential
                              </div>
                              <div className="flex">
                                {Array(5)
                                  .fill(0)
                                  .map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${i < Math.round(player.potential / 20) ? 'fill-amber-400 text-amber-400' : 'text-muted'}`}
                                    />
                                  ))}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground mb-1">
                                Personality
                              </div>
                              <div className="font-medium">
                                {player.personality}
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Technical</span>
                                <span>{player.attributes.technical}</span>
                              </div>
                              <Progress
                                value={player.attributes.technical}
                                className="h-1"
                              />
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Mental</span>
                                <span>{player.attributes.mental}</span>
                              </div>
                              <Progress
                                value={player.attributes.mental}
                                className="h-1"
                              />
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Physical</span>
                                <span>{player.attributes.physical}</span>
                              </div>
                              <Progress
                                value={player.attributes.physical}
                                className="h-1"
                              />
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          {player.promoted ? (
                            <Button
                              variant="outline"
                              className="w-full"
                              disabled
                            >
                              Already Promoted
                            </Button>
                          ) : (
                            <Button
                              className="w-full"
                              onClick={() => handleViewPlayer(player)}
                            >
                              View Player Details
                            </Button>
                          )}
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {!showIntakePreview ? (
                      <div className="text-center py-8 border rounded-md bg-muted/20">
                        <GraduationCap className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                        <h3 className="text-lg font-medium mb-1">
                          Preview Upcoming Intake
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          Your Head of Youth Development can provide a preview
                          of the upcoming youth intake quality.
                        </p>
                        {previewLoading ? (
                          <Button disabled>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Analyzing Youth Prospects...
                          </Button>
                        ) : (
                          <Button onClick={handleRequestPreview}>
                            Request Intake Preview
                          </Button>
                        )}
                      </div>
                    ) : (
                      <div className="p-6 border rounded-md">
                        <div className="flex items-start">
                          <Users className="h-8 w-8 mr-4 text-blue-500" />
                          <div>
                            <h3 className="text-xl font-bold mb-2">
                              Youth Intake Preview
                            </h3>
                            <div className="flex items-center mb-4">
                              <span className="mr-2">Expected Quality:</span>
                              {getQualityBadge(previewQuality || 'unknown')}
                            </div>

                            <div className="space-y-4">
                              {previewQuality === 'excellent' && (
                                <p>
                                  Your Head of Youth Development is extremely
                                  excited about this year's intake. There appear
                                  to be several highly promising talents coming
                                  through, with at least one player showing
                                  potential first-team quality. This could be
                                  one of the best youth classes in recent club
                                  history.
                                </p>
                              )}

                              {previewQuality === 'good' && (
                                <p>
                                  Your Head of Youth Development is optimistic
                                  about this year's intake. There are a few
                                  promising talents that could develop into
                                  solid players for the club. While not
                                  exceptional, this appears to be a good year
                                  for youth development.
                                </p>
                              )}

                              {previewQuality === 'average' && (
                                <p>
                                  Your Head of Youth Development reports that
                                  this year's intake looks fairly standard.
                                  There might be one or two players worth
                                  developing, but overall the quality is
                                  average. With good training, some players
                                  could still develop into useful squad members.
                                </p>
                              )}

                              {previewQuality === 'poor' && (
                                <p>
                                  Your Head of Youth Development is disappointed
                                  with this year's prospects. The quality
                                  appears to be below average, with few standout
                                  talents. It might be worth investing in youth
                                  facilities to improve future intakes.
                                </p>
                              )}

                              <div className="p-4 bg-amber-50 border border-amber-200 rounded-md">
                                <div className="flex items-start">
                                  <AlertTriangle className="h-5 w-5 text-amber-600 mr-2 mt-0.5" />
                                  <div>
                                    <h4 className="font-medium text-amber-800 mb-1">
                                      Youth Intake Information
                                    </h4>
                                    <p className="text-sm text-amber-700">
                                      The actual quality of youth intake can
                                      vary from this preview. The quality
                                      depends on your youth facilities, youth
                                      recruitment network, and Head of Youth
                                      Development's judgment. Improving your
                                      youth facilities and recruitment can lead
                                      to better youth intakes in the future.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Player Details Dialog */}
      <Dialog open={playerDialogOpen} onOpenChange={setPlayerDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Player Details</DialogTitle>
            <DialogDescription>
              {selectedPlayer &&
                `${selectedPlayer.name} - ${selectedPlayer.position}`}
            </DialogDescription>
          </DialogHeader>

          {selectedPlayer && (
            <div className="py-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Name
                    </div>
                    <div className="font-medium">{selectedPlayer.name}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Age
                    </div>
                    <div className="font-medium">
                      {selectedPlayer.age} years
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Position
                    </div>
                    <div className="font-medium">{selectedPlayer.position}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Nationality
                    </div>
                    <div className="font-medium">
                      {selectedPlayer.nationality}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Potential
                    </div>
                    <div className="flex">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < Math.round(selectedPlayer.potential / 20) ? 'fill-amber-400 text-amber-400' : 'text-muted'}`}
                          />
                        ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Personality
                    </div>
                    <div className="font-medium">
                      {selectedPlayer.personality}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium mb-2">Attributes</h4>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Technical</span>
                      <span>{selectedPlayer.attributes.technical}</span>
                    </div>
                    <Progress
                      value={selectedPlayer.attributes.technical}
                      className="h-1"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Mental</span>
                      <span>{selectedPlayer.attributes.mental}</span>
                    </div>
                    <Progress
                      value={selectedPlayer.attributes.mental}
                      className="h-1"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Physical</span>
                      <span>{selectedPlayer.attributes.physical}</span>
                    </div>
                    <Progress
                      value={selectedPlayer.attributes.physical}
                      className="h-1"
                    />
                  </div>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                  <div className="flex items-start">
                    <GraduationCap className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-800 mb-1">
                        Development Information
                      </h4>
                      <p className="text-sm text-blue-700">
                        This player is currently in your youth academy. You can
                        promote them to the senior team if you believe they are
                        ready. Players with high potential will develop faster
                        with proper training and match experience.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setPlayerDialogOpen(false)}
            >
              Close
            </Button>
            {selectedPlayer &&
              !selectedPlayer.promoted &&
              (isPromoting ? (
                <Button disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Promoting...
                </Button>
              ) : (
                <Button onClick={() => handlePromotePlayer(selectedPlayer)}>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Promote to Senior Team
                </Button>
              ))}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Youth Intake Schedule</CardTitle>
            <CardDescription>Annual youth player generation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-800 mb-1">
                      Next Youth Intake
                    </h4>
                    <p className="text-sm text-blue-700">
                      Your next youth intake is scheduled for{' '}
                      {intakeEvents.find((e) => e.status === 'upcoming')?.date
                        ? new Date(
                            intakeEvents.find(
                              (e) => e.status === 'upcoming'
                            )!.date
                          ).toLocaleDateString()
                        : 'Unknown'}
                      . ({getDaysUntilNextIntake()} days remaining)
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Intake Factors</h4>
                <ul className="text-sm space-y-1">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      Youth Facilities Quality - Better facilities produce
                      better youth players
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      Youth Recruitment Network - Wider networks find more
                      talented players
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      Head of Youth Development - Better staff produces better
                      youth intakes
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      Club Reputation - Higher reputation attracts better youth
                      prospects
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Youth Development</CardTitle>
            <CardDescription>Current youth academy status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Badge className="bg-blue-500 mr-2">Facilities</Badge>
                  <span>Youth Facilities</span>
                </div>
                <span className="font-medium">Good</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Badge className="bg-green-500 mr-2">Coaching</Badge>
                  <span>Youth Coaching</span>
                </div>
                <span className="font-medium">Adequate</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Badge className="bg-amber-500 mr-2">Recruitment</Badge>
                  <span>Youth Recruitment</span>
                </div>
                <span className="font-medium">Basic</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Badge className="bg-purple-500 mr-2">Academy</Badge>
                  <span>Academy Reputation</span>
                </div>
                <span className="font-medium">Regional</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Badge className="bg-red-500 mr-2">Staff</Badge>
                  <span>Head of Youth Development</span>
                </div>
                <span className="font-medium">★★★☆☆</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Youth Statistics</CardTitle>
            <CardDescription>Academy performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Youth Players</span>
                <span className="font-medium">18</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Average Potential</span>
                <span className="font-medium">★★★☆☆</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Players Promoted (Last Year)</span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">First Team Graduates</span>
                <span className="font-medium">2</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">
                  Youth Intake Quality (Last Year)
                </span>
                <span className="font-medium">Good</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
