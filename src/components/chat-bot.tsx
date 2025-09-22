'use client';

import { useState } from 'react';

import { Send } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
};

// Mock responses for the chatbot
const getBotResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('formation') || lowerMessage.includes('tactic')) {
    return "Based on your current squad, I'd recommend a 4-3-3 formation to maximize your attacking potential. Your wingers have excellent pace and crossing ability.";
  }

  if (
    lowerMessage.includes('transfer') ||
    lowerMessage.includes('market') ||
    lowerMessage.includes('buy')
  ) {
    return "The transfer market is open for 15 more days. I've identified a few promising midfielders that would strengthen your squad. Check the market page for my recommendations.";
  }

  if (lowerMessage.includes('injury') || lowerMessage.includes('injured')) {
    return 'You currently have 2 injured players. John Smith will be out for 2 weeks with a hamstring injury, and Mike Johnson should recover from his ankle sprain in 3 days.';
  }

  if (
    lowerMessage.includes('next match') ||
    lowerMessage.includes('opponent')
  ) {
    return 'Your next match is against City FC. They typically play a 4-2-3-1 formation and have a strong midfield. I suggest focusing on wing play to exploit their full-backs.';
  }

  return "I'm your assistant coach. Ask me about tactics, player conditions, transfer recommendations, or upcoming matches!";
};

export default function ChatBot() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello, I'm your assistant coach. How can I help you today?",
      sender: 'bot',
    },
  ]);

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: getBotResponse(input),
        sender: 'bot',
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 500);
  };

  return (
    <div className="flex flex-col h-[300px]">
      <ScrollArea className="flex-1 pr-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-3 py-2 ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="flex items-center gap-2 mt-4">
        <Input
          placeholder="Ask your assistant coach..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1"
        />
        <Button size="icon" onClick={handleSend}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
