import React from 'react';

import { Info, Star } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { OnlineManager } from '@/types/football/match';

type Props = {
  onlineUsers: OnlineManager[];
  viewTeamInfo: (user: OnlineManager) => void;
  challengeUser: (user: OnlineManager) => void;
};

const FindOnlineMatch = ({
  onlineUsers,
  viewTeamInfo,
  challengeUser,
}: Props) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isConnected, setIsConnected] = React.useState(true); // Simulate

  return (
    <Card>
      <CardHeader>
        <CardTitle>Online Managers</CardTitle>
        <CardDescription>Challenge other managers to a match</CardDescription>
        <div className="mt-2">
          <Input
            placeholder="Search by name or team..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {onlineUsers.map((user) => (
            <Card key={user.id} className="overflow-hidden">
              <div className="flex items-center p-4">
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
                </div>
                <div className="ml-4 flex-1">
                  <div className="font-medium">{user.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {user.team}
                  </div>
                  <div className="flex items-center mt-1">
                    <Star className="h-3 w-3 text-amber-500 mr-1" />
                    <span className="text-sm">{user.rating}</span>
                    <Badge
                      variant={
                        user.status === 'online' ? 'outline' : 'secondary'
                      }
                      className={`ml-2 text-xs ${
                        user.status === 'online'
                          ? 'bg-green-100'
                          : 'bg-gray-100'
                      }`}
                    >
                      {user.status === 'online' ? 'Online' : 'In Match'}
                    </Badge>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => viewTeamInfo(user)}
                  >
                    <Info className="h-4 w-4 mr-1" />
                    Team Info
                  </Button>
                  <Button
                    size="sm"
                    disabled={user.status !== 'online' || !isConnected}
                    onClick={() => challengeUser(user)}
                  >
                    Challenge
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FindOnlineMatch;
