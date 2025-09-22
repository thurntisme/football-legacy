'use client';

import { useState } from 'react';

import { Save } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';

export default function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    email: {
      matches: true,
      transfers: true,
      news: false,
      injuries: true,
    },
    inGame: {
      matches: true,
      transfers: true,
      news: true,
      injuries: true,
      training: true,
      finances: false,
    },
  });

  const handleToggleEmail = (key: string) => {
    setNotifications({
      ...notifications,
      email: {
        ...notifications.email,
        [key]: !notifications.email[key as keyof typeof notifications.email],
      },
    });
  };

  const handleToggleInGame = (key: string) => {
    setNotifications({
      ...notifications,
      inGame: {
        ...notifications.inGame,
        [key]: !notifications.inGame[key as keyof typeof notifications.inGame],
      },
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: 'Notification Settings Updated',
      description: 'Your notification preferences have been saved.',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
        <CardDescription>
          Configure how you receive notifications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Email Notifications</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-matches" className="flex flex-col">
                  <span>Match Updates</span>
                  <span className="text-sm text-muted-foreground">
                    Receive notifications about upcoming and completed matches
                  </span>
                </Label>
                <Switch
                  id="email-matches"
                  checked={notifications.email.matches}
                  onCheckedChange={() => handleToggleEmail('matches')}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="email-transfers" className="flex flex-col">
                  <span>Transfer Activity</span>
                  <span className="text-sm text-muted-foreground">
                    Notifications about transfer offers and completed transfers
                  </span>
                </Label>
                <Switch
                  id="email-transfers"
                  checked={notifications.email.transfers}
                  onCheckedChange={() => handleToggleEmail('transfers')}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="email-news" className="flex flex-col">
                  <span>News & Updates</span>
                  <span className="text-sm text-muted-foreground">
                    Game updates and news about the football world
                  </span>
                </Label>
                <Switch
                  id="email-news"
                  checked={notifications.email.news}
                  onCheckedChange={() => handleToggleEmail('news')}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="email-injuries" className="flex flex-col">
                  <span>Injuries & Suspensions</span>
                  <span className="text-sm text-muted-foreground">
                    Updates about player injuries and suspensions
                  </span>
                </Label>
                <Switch
                  id="email-injuries"
                  checked={notifications.email.injuries}
                  onCheckedChange={() => handleToggleEmail('injuries')}
                />
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">In-Game Notifications</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="ingame-matches" className="flex flex-col">
                  <span>Match Updates</span>
                  <span className="text-sm text-muted-foreground">
                    Notifications about upcoming matches and results
                  </span>
                </Label>
                <Switch
                  id="ingame-matches"
                  checked={notifications.inGame.matches}
                  onCheckedChange={() => handleToggleInGame('matches')}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="ingame-transfers" className="flex flex-col">
                  <span>Transfer Activity</span>
                  <span className="text-sm text-muted-foreground">
                    Alerts about transfer market activity
                  </span>
                </Label>
                <Switch
                  id="ingame-transfers"
                  checked={notifications.inGame.transfers}
                  onCheckedChange={() => handleToggleInGame('transfers')}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="ingame-news" className="flex flex-col">
                  <span>News & Events</span>
                  <span className="text-sm text-muted-foreground">
                    Important news and events in the game world
                  </span>
                </Label>
                <Switch
                  id="ingame-news"
                  checked={notifications.inGame.news}
                  onCheckedChange={() => handleToggleInGame('news')}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="ingame-injuries" className="flex flex-col">
                  <span>Injuries & Suspensions</span>
                  <span className="text-sm text-muted-foreground">
                    Alerts about player injuries and suspensions
                  </span>
                </Label>
                <Switch
                  id="ingame-injuries"
                  checked={notifications.inGame.injuries}
                  onCheckedChange={() => handleToggleInGame('injuries')}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="ingame-training" className="flex flex-col">
                  <span>Training Updates</span>
                  <span className="text-sm text-muted-foreground">
                    Notifications about training sessions and player development
                  </span>
                </Label>
                <Switch
                  id="ingame-training"
                  checked={notifications.inGame.training}
                  onCheckedChange={() => handleToggleInGame('training')}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="ingame-finances" className="flex flex-col">
                  <span>Financial Updates</span>
                  <span className="text-sm text-muted-foreground">
                    Alerts about your club's financial situation
                  </span>
                </Label>
                <Switch
                  id="ingame-finances"
                  checked={notifications.inGame.finances}
                  onCheckedChange={() => handleToggleInGame('finances')}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSaveNotifications}>
              <Save className="mr-2 h-4 w-4" />
              Save Preferences
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
