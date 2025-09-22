'use client';

import { useEffect, useState } from 'react';

import { Send, Users } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

type ChatMessage = {
  id: number;
  user: {
    name: string;
    avatar: string;
    initials: string;
  };
  message: string;
  timestamp: string;
};

// Mock data for community chat
const mockCommunityMessages: ChatMessage[] = [
  {
    id: 1,
    user: {
      name: 'John Manager',
      avatar: '/placeholder.svg?height=32&width=32',
      initials: 'JM',
    },
    message:
      "Has anyone tried the new 4-2-3-1 formation? It's working great for me!",
    timestamp: '2 min ago',
  },
  {
    id: 2,
    user: {
      name: 'Sarah Coach',
      avatar: '/placeholder.svg?height=32&width=32',
      initials: 'SC',
    },
    message: "I'm struggling with my defense. Any tips?",
    timestamp: '5 min ago',
  },
  {
    id: 3,
    user: {
      name: 'Mike Tactics',
      avatar: '/placeholder.svg?height=32&width=32',
      initials: 'MT',
    },
    message: 'Just signed an amazing striker for only £5M! What a bargain!',
    timestamp: '12 min ago',
  },
  {
    id: 4,
    user: {
      name: 'Emma Scout',
      avatar: '/placeholder.svg?height=32&width=32',
      initials: 'ES',
    },
    message:
      'Check out the new youth intake in South America. Some real gems there!',
    timestamp: '25 min ago',
  },
];

export default function CommunityChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(
    mockCommunityMessages
  );
  const [input, setInput] = useState('');
  const [onlineUsers, setOnlineUsers] = useState(124);

  useEffect(() => {
    // Simulate fluctuating online users
    const interval = setInterval(() => {
      setOnlineUsers((prev) => Math.floor(Math.random() * 10) - 5 + prev);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const newMessage: ChatMessage = {
      id: messages.length + 1,
      user: {
        name: 'Alex Manager',
        avatar: '/placeholder.svg?height=32&width=32',
        initials: 'AM',
      },
      message: input,
      timestamp: 'Just now',
    };

    setMessages([newMessage, ...messages]);
    setInput('');
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <div className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Community Chat
          </div>
          <div className="text-sm font-normal text-muted-foreground flex items-center">
            <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
            {onlineUsers} online
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <ScrollArea className="h-[220px]">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className="flex items-start space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={msg.user.avatar} alt={msg.user.name} />
                  <AvatarFallback>{msg.user.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center">
                    <p className="text-sm font-medium">{msg.user.name}</p>
                    <span className="ml-2 text-xs text-muted-foreground">
                      {msg.timestamp}
                    </span>
                  </div>
                  <p className="text-sm">{msg.message}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="flex w-full items-center space-x-2">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button size="icon" onClick={handleSendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
