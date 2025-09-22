import React, { useEffect, useRef, useState } from 'react';

import { MessageSquare, Send } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/hooks/use-toast';
import { initialChatMessages } from '@/mock/football';
import {
  MatchEvent,
  MatchMessage,
  MatchStats,
  OnlineManager,
} from '@/types/football/match';

type Props = {
  inMatch: boolean;
  opponent: OnlineManager | null;
  setForfeitDialogOpen: (open: boolean) => void;
  setInMatch: (inMatch: boolean) => void;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
};

const LiveMatch = ({
  inMatch,
  opponent,
  setForfeitDialogOpen,
  setInMatch,
  setActiveTab,
}: Props) => {
  const matchTime = useRef<number>(0);
  const [matchStats, setMatchStats] = useState<MatchStats>({
    possession: { home: 50, away: 50 },
    shots: { home: 0, away: 0 },
    shotsOnTarget: { home: 0, away: 0 },
    corners: { home: 0, away: 0 },
    fouls: { home: 0, away: 0 },
  });
  const [score, setScore] = useState({ home: 0, away: 0 });
  const [chatMessages, setChatMessages] =
    useState<MatchMessage[]>(initialChatMessages);
  const [matchEvents, setMatchEvents] = useState<MatchEvent[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');

  // Add a system message to the chat
  const addSystemChatMessage = React.useCallback(
    (message: string) => {
      const systemMessage = {
        id: (chatMessages.length + 1).toString(),
        sender: 'system',
        message,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setChatMessages((prev) => [...prev, systemMessage]);
    },
    [chatMessages]
  );

  // Send a chat message
  const sendChatMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: (chatMessages.length + 1).toString(),
      sender: 'you',
      message: newMessage,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setChatMessages((prev) => [...prev, message]);
    setNewMessage('');

    // Simulate opponent response
    if (Math.random() > 0.7) {
      setTimeout(
        () => {
          const responses = [
            'Nice play!',
            'Good game so far',
            'My defense is struggling today',
            "You're playing well",
            'I need to make some changes',
            'Lucky goal!',
            'Great tactics',
          ];

          const opponentMessage = {
            id: (chatMessages.length + 2).toString(),
            sender: 'opponent',
            message: responses[Math.floor(Math.random() * responses.length)],
            timestamp: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
          };

          setChatMessages((prev) => [...prev, opponentMessage]);
        },
        1000 + Math.random() * 3000
      );
    }
  };

  // Generate a random match event
  const generateMatchEvent = React.useCallback(
    (minute: number) => {
      const teams = ['home', 'away'];
      const team = teams[Math.floor(Math.random() * teams.length)];
      const eventTypes = ['shot', 'goal', 'corner', 'foul', 'card'];
      const eventType =
        eventTypes[Math.floor(Math.random() * eventTypes.length)];

      let eventText = '';
      const playerName =
        team === 'home' ? 'Your Player' : `${opponent?.name}'s Player`;

      switch (eventType) {
        case 'shot':
          eventText = `Shot by ${playerName}`;
          setMatchStats((prev) => ({
            ...prev,
            shots: {
              ...prev.shots,
              [team]: prev.shots[team as keyof typeof prev.shots] + 1,
            },
          }));

          // 40% chance for shot on target
          if (Math.random() < 0.4) {
            setMatchStats((prev) => ({
              ...prev,
              shotsOnTarget: {
                ...prev.shotsOnTarget,
                [team]:
                  prev.shotsOnTarget[team as keyof typeof prev.shotsOnTarget] +
                  1,
              },
            }));
          }
          break;

        case 'goal':
          eventText = `GOAL! Scored by ${playerName}`;
          setScore((prev) => ({
            ...prev,
            [team]: prev[team as keyof typeof prev] + 1,
          }));
          setMatchStats((prev) => ({
            ...prev,
            shots: {
              ...prev.shots,
              [team]: prev.shots[team as keyof typeof prev.shots] + 1,
            },
            shotsOnTarget: {
              ...prev.shotsOnTarget,
              [team]:
                prev.shotsOnTarget[team as keyof typeof prev.shotsOnTarget] + 1,
            },
          }));

          // Add system message to chat
          addSystemChatMessage(
            `GOAL! ${team === 'home' ? 'Your team' : opponent?.team} has scored!`
          );
          break;

        case 'corner':
          eventText = `Corner for ${team === 'home' ? 'your team' : opponent?.team}`;
          setMatchStats((prev) => ({
            ...prev,
            corners: {
              ...prev.corners,
              [team]: prev.corners[team as keyof typeof prev.corners] + 1,
            },
          }));
          break;

        case 'foul':
          eventText = `Foul by ${playerName}`;
          setMatchStats((prev) => ({
            ...prev,
            fouls: {
              ...prev.fouls,
              [team]: prev.fouls[team as keyof typeof prev.fouls] + 1,
            },
          }));
          break;

        case 'card':
          eventText = `Yellow card for ${playerName}`;
          break;
      }

      setMatchEvents((prev) => [
        ...prev,
        { minute, text: eventText, type: eventType, team },
      ]);
    },
    [
      opponent?.name,
      opponent?.team,
      setMatchStats,
      setScore,
      addSystemChatMessage,
    ]
  );

  // Update match stats randomly
  const updateMatchStats = () => {
    // Update possession
    const possessionChange = Math.floor(Math.random() * 5);
    const homeGetsChange = Math.random() > 0.5;

    setMatchStats((prev) => {
      const newHomePossession = homeGetsChange
        ? Math.min(prev.possession.home + possessionChange, 100)
        : Math.max(prev.possession.home - possessionChange, 0);

      return {
        ...prev,
        possession: {
          home: newHomePossession,
          away: 100 - newHomePossession,
        },
      };
    });
  };

  // End the match
  const endMatch = React.useCallback(() => {
    // Add final whistle message
    addSystemChatMessage(
      `Full time! Final score: Your Team ${score.home}-${score.away} ${opponent?.team}`
    );

    if (score.home > score.away) {
      toast({
        title: 'Victory!',
        description: `You won ${score.home}-${score.away} against ${opponent?.name}`,
      });
    } else if (score.home < score.away) {
      toast({
        title: 'Defeat',
        description: `You lost ${score.home}-${score.away} against ${opponent?.name}`,
      });
    } else {
      toast({
        title: 'Draw',
        description: `The match ended in a ${score.home}-${score.away} draw`,
      });
    }

    // Add to match history (would be handled by backend in real app)
    // const newMatch = {
    //   id: matchHistory.length + 1,
    //   opponent: opponent?.name,
    //   opponentTeam: opponent?.team,
    //   result: score.home > score.away ? 'win' : score.home < score.away ? 'loss' : 'draw',
    //   score: `${score.home}-${score.away}`,
    //   date: new Date().toISOString().split('T')[0],
    // };

    // In a real app, this would be handled by the backend
    // matchHistory.unshift(newMatch)
  }, [
    addSystemChatMessage,
    opponent?.name,
    opponent?.team,
    score.home,
    score.away,
  ]);

  // Update match time every second and generate events, match stats
  useEffect(() => {
    if (!inMatch) return;

    const interval = setInterval(() => {
      matchTime.current += 1;

      // Generate random events every 5 minutes
      if (matchTime.current % 5 === 0) {
        generateMatchEvent(matchTime.current);
      }

      // Update match stats every minute
      if (matchTime.current % 1 === 0) {
        updateMatchStats();
      }

      // End match after 90 minutes
      if (matchTime.current >= 90) {
        clearInterval(interval);
        endMatch();
        setInMatch(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [inMatch, setInMatch, opponent, generateMatchEvent, endMatch]);

  return (
    <>
      {inMatch && opponent ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Live Match</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center items-center mb-6">
                  <div className="text-center w-[140px]">
                    <div className="font-medium">Your Team</div>
                    <Avatar className="h-16 w-16 mx-auto my-2">
                      <AvatarImage
                        src="/placeholder.svg?height=64&width=64"
                        alt="Your Team"
                      />
                      <AvatarFallback>YT</AvatarFallback>
                    </Avatar>
                    <Badge className="mt-1">Your Rating: 1820</Badge>
                  </div>

                  <div className="mx-8 text-center w-[100px]">
                    <div className="text-4xl font-bold mb-2">
                      {score.home} - {score.away}
                    </div>
                    <Badge
                      variant={
                        matchTime.current >= 90 ? 'secondary' : 'default'
                      }
                    >
                      {matchTime.current >= 90
                        ? 'Full Time'
                        : `${matchTime.current}'`}
                    </Badge>
                  </div>

                  <div className="text-center w-[140px]">
                    <div className="font-medium">{opponent.team}</div>
                    <Avatar className="h-16 w-16 mx-auto my-2">
                      <AvatarImage src={opponent.avatar} alt={opponent.team} />
                      <AvatarFallback>
                        {opponent.team.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <Badge className="mt-1">Rating: {opponent.rating}</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mt-10">
                  <div>
                    <h3 className="font-medium mb-4 text-center">
                      Match Stats
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{matchStats.possession.home}%</span>
                          <span>Possession</span>
                          <span>{matchStats.possession.away}%</span>
                        </div>
                        <div className="flex h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="bg-blue-500"
                            style={{
                              width: `${matchStats.possession.home}%`,
                            }}
                          />
                          <div
                            className="bg-red-500"
                            style={{
                              width: `${matchStats.possession.away}%`,
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{matchStats.shots.home}</span>
                          <span>Shots</span>
                          <span>{matchStats.shots.away}</span>
                        </div>
                        <div className="flex h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="bg-blue-500"
                            style={{
                              width: `${
                                !matchStats.shots.home
                                  ? 50
                                  : (matchStats.shots.home /
                                      (matchStats.shots.home +
                                        matchStats.shots.away || 1)) *
                                    100
                              }%`,
                            }}
                          />
                          <div
                            className="bg-red-500"
                            style={{
                              width: `${
                                !matchStats.shots.away
                                  ? 50
                                  : (matchStats.shots.away /
                                      (matchStats.shots.home +
                                        matchStats.shots.away || 1)) *
                                    100
                              }%`,
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{matchStats.shotsOnTarget.home}</span>
                          <span>Shots on Target</span>
                          <span>{matchStats.shotsOnTarget.away}</span>
                        </div>
                        <div className="flex h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="bg-blue-500"
                            style={{
                              width: `${
                                !matchStats.shotsOnTarget.home
                                  ? 50
                                  : (matchStats.shotsOnTarget.home /
                                      (matchStats.shotsOnTarget.home +
                                        matchStats.shotsOnTarget.away || 1)) *
                                    100
                              }%`,
                            }}
                          />
                          <div
                            className="bg-red-500"
                            style={{
                              width: `${
                                !matchStats.shotsOnTarget.away
                                  ? 50
                                  : (matchStats.shotsOnTarget.away /
                                      (matchStats.shotsOnTarget.home +
                                        matchStats.shotsOnTarget.away || 1)) *
                                    100
                              }%`,
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{matchStats.corners.home}</span>
                          <span>Corners</span>
                          <span>{matchStats.corners.away}</span>
                        </div>
                        <div className="flex h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="bg-blue-500"
                            style={{
                              width: `${
                                !matchStats.corners.home
                                  ? 50
                                  : (matchStats.corners.home /
                                      (matchStats.corners.home +
                                        matchStats.corners.away || 1)) *
                                    100
                              }%`,
                            }}
                          />
                          <div
                            className="bg-red-500"
                            style={{
                              width: `${
                                !matchStats.corners.away
                                  ? 50
                                  : (matchStats.corners.away /
                                      (matchStats.corners.home +
                                        matchStats.corners.away || 1)) *
                                    100
                              }%`,
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{matchStats.fouls.home}</span>
                          <span>Fouls</span>
                          <span>{matchStats.fouls.away}</span>
                        </div>
                        <div className="flex h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="bg-blue-500"
                            style={{
                              width: `${
                                !matchStats.fouls.home
                                  ? 50
                                  : (matchStats.fouls.home /
                                      (matchStats.fouls.home +
                                        matchStats.fouls.away || 1)) *
                                    100
                              }%`,
                            }}
                          />
                          <div
                            className="bg-red-500"
                            style={{
                              width: `${
                                !matchStats.fouls.away
                                  ? 50
                                  : (matchStats.fouls.away /
                                      (matchStats.fouls.home +
                                        matchStats.fouls.away || 1)) *
                                    100
                              }%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-4 text-center">
                      Match Events
                    </h3>
                    <ScrollArea className="h-[200px] rounded-md border p-2">
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
                    </ScrollArea>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t py-3 mt-3">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    if (matchTime.current < 90) {
                      setForfeitDialogOpen(true);
                    } else {
                      setInMatch(false);
                    }
                  }}
                >
                  {matchTime.current >= 90
                    ? 'Return to Lobby'
                    : 'Forfeit Match'}
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div>
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Match Chat
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 overflow-hidden">
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    {chatMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${
                          msg.sender === 'you' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`rounded-lg px-3 py-2 max-w-[80%] ${
                            msg.sender === 'system'
                              ? 'bg-muted text-center w-full'
                              : msg.sender === 'you'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted'
                          }`}
                        >
                          <div className="text-sm">{msg.message}</div>
                          <div className="text-xs opacity-70 mt-1 text-right">
                            {msg.timestamp}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter className="border-t p-3">
                <div className="flex w-full items-center space-x-2">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        sendChatMessage();
                      }
                    }}
                  />
                  <Button size="icon" onClick={sendChatMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <div className="text-center mb-4">
              <h3 className="text-lg font-medium">No Active Match</h3>
              <p className="text-muted-foreground">
                Challenge a manager to start playing
              </p>
            </div>
            <Button onClick={() => setActiveTab('find')}>Find Opponents</Button>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default LiveMatch;
