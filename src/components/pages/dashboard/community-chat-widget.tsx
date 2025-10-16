"use client";

import { useEffect, useState } from "react";

import { Send, Users } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FOOTBALL_STATS_URL } from "@/constants/site";
import { mockCommunityMessages } from "@/mock/chat";
import { ChatMessage } from "@/types/chat";

type Props = {
  showBtnChatAll?: boolean;
};

export default function CommunityChat({ showBtnChatAll = false }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>(
    mockCommunityMessages,
  );
  const [input, setInput] = useState("");
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
      sender: {
        id: messages.length + 1,
        name: "Alex Manager",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "AM",
      },
      content: input,
      timestamp: "Just now",
      isCurrentUser: false,
    };

    setMessages([newMessage, ...messages]);
    setInput("");
  };

  return (
    <Card className="h-full col-start-2 col-end-4">
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
                  <AvatarImage src={msg.sender.avatar} alt={msg.sender.name} />
                  <AvatarFallback>{msg.sender.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center">
                    <p className="text-sm font-medium">{msg.sender.name}</p>
                    <span className="ml-2 text-xs text-muted-foreground">
                      {msg.timestamp}
                    </span>
                  </div>
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="pt-0 flex-col pb-2">
        <div className="flex w-full items-center space-x-2">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1"
          />
          <Button size="icon" onClick={handleSendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
        {showBtnChatAll && (
          <Link
            href={`${FOOTBALL_STATS_URL}/game/chat`}
            className="text-sm text-muted-foreground mt-2 block underline"
          >
            Chat Box
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
