'use client';

import { useState } from 'react';

import {
  Hash,
  Image,
  Info,
  MoreVertical,
  Paperclip,
  Phone,
  Plus,
  Search,
  Send,
  Smile,
  User,
  UserPlus,
  Users,
  Video,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

type ChatMessage = {
  id: number;
  sender: {
    id: number;
    name: string;
    avatar: string;
    initials: string;
  };
  content: string;
  timestamp: string;
  isCurrentUser: boolean;
};

type ChatContact = {
  id: number;
  name: string;
  avatar: string;
  initials: string;
  status: 'online' | 'offline' | 'away';
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
  isGroup?: boolean;
  members?: number;
};

const mockGroups: ChatContact[] = [
  {
    id: 1,
    name: 'Community Chat',
    avatar: '/placeholder.svg?height=40&width=40',
    initials: 'CC',
    status: 'online',
    lastMessage: 'Emma: Check out the new youth intake!',
    lastMessageTime: '2m ago',
    unreadCount: 3,
    isGroup: true,
    members: 245,
  },
  {
    id: 2,
    name: 'Tactics Discussion',
    avatar: '/placeholder.svg?height=40&width=40',
    initials: 'TD',
    status: 'online',
    lastMessage: 'John: 4-3-3 is the best formation',
    lastMessageTime: '1h ago',
    isGroup: true,
    members: 78,
  },
  {
    id: 3,
    name: 'Transfer Market Tips',
    avatar: '/placeholder.svg?height=40&width=40',
    initials: 'TM',
    status: 'online',
    lastMessage: 'Sarah: Found a great striker for £2M',
    lastMessageTime: '3h ago',
    isGroup: true,
    members: 156,
  },
  {
    id: 4,
    name: 'Premier League Managers',
    avatar: '/placeholder.svg?height=40&width=40',
    initials: 'PL',
    status: 'online',
    lastMessage: 'Mike: Anyone playing the derby this weekend?',
    lastMessageTime: '1d ago',
    isGroup: true,
    members: 42,
  },
];

const mockFriends: ChatContact[] = [
  {
    id: 101,
    name: 'John Manager',
    avatar: '/placeholder.svg?height=40&width=40',
    initials: 'JM',
    status: 'online',
    lastMessage: 'Has anyone tried the new 4-2-3-1 formation?',
    lastMessageTime: '5m ago',
    unreadCount: 2,
  },
  {
    id: 102,
    name: 'Sarah Coach',
    avatar: '/placeholder.svg?height=40&width=40',
    initials: 'SC',
    status: 'away',
    lastMessage: "I'm struggling with my defense. Any tips?",
    lastMessageTime: '30m ago',
  },
  {
    id: 103,
    name: 'Mike Tactics',
    avatar: '/placeholder.svg?height=40&width=40',
    initials: 'MT',
    status: 'offline',
    lastMessage: 'Just signed an amazing striker for only £5M!',
    lastMessageTime: '2h ago',
  },
  {
    id: 104,
    name: 'Emma Scout',
    avatar: '/placeholder.svg?height=40&width=40',
    initials: 'ES',
    status: 'online',
    lastMessage: 'Check out the new youth intake in South America.',
    lastMessageTime: '1d ago',
  },
  {
    id: 105,
    name: 'David Analyst',
    avatar: '/placeholder.svg?height=40&width=40',
    initials: 'DA',
    status: 'online',
    lastMessage: "I've analyzed your last match. Let's discuss.",
    lastMessageTime: '2d ago',
  },
];

const mockMessages: Record<number, ChatMessage[]> = {
  1: [
    {
      id: 1,
      sender: {
        id: 101,
        name: 'John Manager',
        avatar: '/placeholder.svg?height=40&width=40',
        initials: 'JM',
      },
      content:
        "Has anyone tried the new 4-2-3-1 formation? It's working great for me!",
      timestamp: '10:15 AM',
      isCurrentUser: false,
    },
    {
      id: 2,
      sender: {
        id: 102,
        name: 'Sarah Coach',
        avatar: '/placeholder.svg?height=40&width=40',
        initials: 'SC',
      },
      content: "I'm struggling with my defense. Any tips?",
      timestamp: '10:17 AM',
      isCurrentUser: false,
    },
    {
      id: 3,
      sender: {
        id: 999,
        name: 'Alex Manager',
        avatar: '/placeholder.svg?height=40&width=40',
        initials: 'AM',
      },
      content:
        'Try using a defensive midfielder to shield your back four. Works wonders for me!',
      timestamp: '10:20 AM',
      isCurrentUser: true,
    },
    {
      id: 4,
      sender: {
        id: 103,
        name: 'Mike Tactics',
        avatar: '/placeholder.svg?height=40&width=40',
        initials: 'MT',
      },
      content: 'Just signed an amazing striker for only £5M! What a bargain!',
      timestamp: '10:25 AM',
      isCurrentUser: false,
    },
    {
      id: 5,
      sender: {
        id: 104,
        name: 'Emma Scout',
        avatar: '/placeholder.svg?height=40&width=40',
        initials: 'ES',
      },
      content:
        'Check out the new youth intake in South America. Some real gems there!',
      timestamp: '10:30 AM',
      isCurrentUser: false,
    },
  ],
  101: [
    {
      id: 1,
      sender: {
        id: 101,
        name: 'John Manager',
        avatar: '/placeholder.svg?height=40&width=40',
        initials: 'JM',
      },
      content: "Hey, how's your team doing this season?",
      timestamp: 'Yesterday, 4:30 PM',
      isCurrentUser: false,
    },
    {
      id: 2,
      sender: {
        id: 999,
        name: 'Alex Manager',
        avatar: '/placeholder.svg?height=40&width=40',
        initials: 'AM',
      },
      content: "Pretty good! We're second in the league right now.",
      timestamp: 'Yesterday, 4:35 PM',
      isCurrentUser: true,
    },
    {
      id: 3,
      sender: {
        id: 101,
        name: 'John Manager',
        avatar: '/placeholder.svg?height=40&width=40',
        initials: 'JM',
      },
      content: "That's awesome! Any standout players?",
      timestamp: 'Yesterday, 4:40 PM',
      isCurrentUser: false,
    },
    {
      id: 4,
      sender: {
        id: 999,
        name: 'Alex Manager',
        avatar: '/placeholder.svg?height=40&width=40',
        initials: 'AM',
      },
      content: "My striker has 15 goals in 12 games! He's been incredible.",
      timestamp: 'Yesterday, 4:45 PM',
      isCurrentUser: true,
    },
    {
      id: 5,
      sender: {
        id: 101,
        name: 'John Manager',
        avatar: '/placeholder.svg?height=40&width=40',
        initials: 'JM',
      },
      content:
        "Has anyone tried the new 4-2-3-1 formation? It's working great for me!",
      timestamp: 'Today, 10:15 AM',
      isCurrentUser: false,
    },
  ],
};

export default function ChatPage() {
  const [activeTab, setActiveTab] = useState<'groups' | 'friends'>('groups');
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState('');
  const [activeChatId, setActiveChatId] = useState<number>(1); // Default to Community Chat
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages[1]);
  const [showNewGroupDialog, setShowNewGroupDialog] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [selectedFriends, setSelectedFriends] = useState<number[]>([]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage: ChatMessage = {
      id: messages.length + 1,
      sender: {
        id: 999,
        name: 'Alex Manager',
        avatar: '/placeholder.svg?height=40&width=40',
        initials: 'AM',
      },
      content: message,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      isCurrentUser: true,
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  const handleChatSelect = (id: number) => {
    setActiveChatId(id);
    setMessages(mockMessages[id] || []);
  };

  const filteredGroups = mockGroups.filter((group) =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredFriends = mockFriends.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeChat =
    activeTab === 'groups'
      ? mockGroups.find((g) => g.id === activeChatId)
      : mockFriends.find((f) => f.id === activeChatId);

  const handleCreateGroup = () => {
    if (!newGroupName.trim() || selectedFriends.length === 0) return;
    // In a real app, you would create the group on the server
    setShowNewGroupDialog(false);
    setNewGroupName('');
    setSelectedFriends([]);
  };

  const toggleFriendSelection = (id: number) => {
    if (selectedFriends.includes(id)) {
      setSelectedFriends(selectedFriends.filter((friendId) => friendId !== id));
    } else {
      setSelectedFriends([...selectedFriends, id]);
    }
  };

  return (
    <main className="container mx-auto px-4 pt-10 pb-[100px]">
      <div className="flex flex-col space-y-4">
        <div>
          <h1 className="text-3xl font-bold">Chat</h1>
          <p className="text-muted-foreground">
            Connect with other managers and friends
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[calc(100vh-200px)]">
          {/* Sidebar */}
          <div className="md:col-span-1 border rounded-lg overflow-hidden flex flex-col">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between mb-4">
                <Tabs
                  defaultValue="groups"
                  className="w-full"
                  onValueChange={(value) =>
                    setActiveTab(value as 'groups' | 'friends')
                  }
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="groups">
                      <Hash className="h-4 w-4 mr-2" />
                      Groups
                    </TabsTrigger>
                    <TabsTrigger value="friends">
                      <User className="h-4 w-4 mr-2" />
                      Friends
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-2">
                {activeTab === 'groups' ? (
                  <>
                    <div className="flex justify-between items-center p-2">
                      <h3 className="font-medium text-sm">GROUPS</h3>
                      <Dialog
                        open={showNewGroupDialog}
                        onOpenChange={setShowNewGroupDialog}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Create New Group</DialogTitle>
                            <DialogDescription>
                              Create a new group chat with your friends.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <label
                                htmlFor="group-name"
                                className="text-sm font-medium"
                              >
                                Group Name
                              </label>
                              <Input
                                id="group-name"
                                placeholder="Enter group name"
                                value={newGroupName}
                                onChange={(e) =>
                                  setNewGroupName(e.target.value)
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">
                                Add Friends
                              </label>
                              <ScrollArea className="h-[200px] border rounded-md p-2">
                                {mockFriends.map((friend) => (
                                  <div
                                    key={friend.id}
                                    className="flex items-center justify-between p-2 hover:bg-muted rounded-md cursor-pointer"
                                    onClick={() =>
                                      toggleFriendSelection(friend.id)
                                    }
                                  >
                                    <div className="flex items-center">
                                      <Avatar className="h-8 w-8 mr-2">
                                        <AvatarImage
                                          src={friend.avatar}
                                          alt={friend.name}
                                        />
                                        <AvatarFallback>
                                          {friend.initials}
                                        </AvatarFallback>
                                      </Avatar>
                                      <span>{friend.name}</span>
                                    </div>
                                    {selectedFriends.includes(friend.id) && (
                                      <div className="h-4 w-4 rounded-full bg-primary"></div>
                                    )}
                                  </div>
                                ))}
                              </ScrollArea>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button
                              variant="outline"
                              onClick={() => setShowNewGroupDialog(false)}
                            >
                              Cancel
                            </Button>
                            <Button onClick={handleCreateGroup}>
                              Create Group
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                    {filteredGroups.map((group) => (
                      <div
                        key={group.id}
                        className={`flex items-center space-x-3 p-2 rounded-md cursor-pointer hover:bg-muted ${
                          activeChatId === group.id ? 'bg-muted' : ''
                        }`}
                        onClick={() => handleChatSelect(group.id)}
                      >
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={group.avatar} alt={group.name} />
                          <AvatarFallback>{group.initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <p className="font-medium truncate">{group.name}</p>
                            <span className="text-xs text-muted-foreground">
                              {group.lastMessageTime}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <p className="text-sm text-muted-foreground truncate">
                              {group.lastMessage}
                            </p>
                            {group.unreadCount && (
                              <Badge variant="default" className="ml-auto">
                                {group.unreadCount}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-center p-2">
                      <h3 className="font-medium text-sm">FRIENDS</h3>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <UserPlus className="h-4 w-4" />
                      </Button>
                    </div>
                    {filteredFriends.map((friend) => (
                      <div
                        key={friend.id}
                        className={`flex items-center space-x-3 p-2 rounded-md cursor-pointer hover:bg-muted ${
                          activeChatId === friend.id ? 'bg-muted' : ''
                        }`}
                        onClick={() => handleChatSelect(friend.id)}
                      >
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={friend.avatar}
                              alt={friend.name}
                            />
                            <AvatarFallback>{friend.initials}</AvatarFallback>
                          </Avatar>
                          <span
                            className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${
                              friend.status === 'online'
                                ? 'bg-green-500'
                                : friend.status === 'away'
                                  ? 'bg-yellow-500'
                                  : 'bg-gray-500'
                            }`}
                          ></span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <p className="font-medium truncate">
                              {friend.name}
                            </p>
                            <span className="text-xs text-muted-foreground">
                              {friend.lastMessageTime}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <p className="text-sm text-muted-foreground truncate">
                              {friend.lastMessage}
                            </p>
                            {friend.unreadCount && (
                              <Badge variant="default" className="ml-auto">
                                {friend.unreadCount}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Chat Area */}
          <div className="md:col-span-3 border rounded-lg overflow-hidden flex flex-col">
            {activeChat ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage
                        src={activeChat.avatar}
                        alt={activeChat.name}
                      />
                      <AvatarFallback>{activeChat.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{activeChat.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {activeChat.isGroup
                          ? `${activeChat.members} members`
                          : activeChat.status === 'online'
                            ? 'Online'
                            : activeChat.status === 'away'
                              ? 'Away'
                              : 'Offline'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!activeChat.isGroup && (
                      <>
                        <Button variant="ghost" size="icon">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Video className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    <Button variant="ghost" size="icon">
                      <Info className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Options</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Mute notifications</DropdownMenuItem>
                        <DropdownMenuItem>
                          Search in conversation
                        </DropdownMenuItem>
                        {activeChat.isGroup && (
                          <DropdownMenuItem>Leave group</DropdownMenuItem>
                        )}
                        {!activeChat.isGroup && (
                          <DropdownMenuItem>Block user</DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.isCurrentUser ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`flex ${
                            msg.isCurrentUser ? 'flex-row-reverse' : 'flex-row'
                          } items-start space-x-2 max-w-[80%]`}
                        >
                          {!msg.isCurrentUser && (
                            <Avatar className="h-8 w-8 mt-1">
                              <AvatarImage
                                src={msg.sender.avatar}
                                alt={msg.sender.name}
                              />
                              <AvatarFallback>
                                {msg.sender.initials}
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div
                            className={`space-y-1 ${msg.isCurrentUser ? 'mr-2' : 'ml-2'}`}
                          >
                            <div
                              className={`rounded-lg px-3 py-2 ${
                                msg.isCurrentUser
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-muted'
                              }`}
                            >
                              {!msg.isCurrentUser && activeChat.isGroup && (
                                <p className="text-xs font-medium">
                                  {msg.sender.name}
                                </p>
                              )}
                              <p>{msg.content}</p>
                            </div>
                            <p
                              className={`text-xs text-muted-foreground ${
                                msg.isCurrentUser ? 'text-right' : 'text-left'
                              }`}
                            >
                              {msg.timestamp}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Message Input */}
                <div className="p-4 border-t">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Image className="h-4 w-4" />
                    </Button>
                    <Input
                      placeholder="Type a message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === 'Enter' && handleSendMessage()
                      }
                      className="flex-1"
                    />
                    <Button variant="ghost" size="icon">
                      <Smile className="h-4 w-4" />
                    </Button>
                    <Button size="icon" onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Users className="h-12 w-12 mx-auto text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">
                    Select a chat to start messaging
                  </h3>
                  <p className="text-muted-foreground">
                    Choose from your groups or friends to start a conversation
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
