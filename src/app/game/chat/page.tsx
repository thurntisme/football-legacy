"use client";

import { useState } from "react";

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
} from "lucide-react";

import PageTitle from "@/components/common/page-title";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockFriends, mockGroups, mockMessages } from "@/mock/chat";
import { ChatMessage } from "@/types/chat";

export default function ChatPage() {
  const [activeTab, setActiveTab] = useState<"groups" | "friends">("groups");
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");
  const [activeChatId, setActiveChatId] = useState<number>(1); // Default to Community Chat
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages[1]);
  const [showNewGroupDialog, setShowNewGroupDialog] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [selectedFriends, setSelectedFriends] = useState<number[]>([]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage: ChatMessage = {
      id: messages.length + 1,
      sender: {
        id: 999,
        name: "Alex Manager",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "AM",
      },
      content: message,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isCurrentUser: true,
    };

    setMessages([...messages, newMessage]);
    setMessage("");
  };

  const handleChatSelect = (id: number) => {
    setActiveChatId(id);
    setMessages(mockMessages[id] || []);
  };

  const filteredGroups = mockGroups.filter((group) =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredFriends = mockFriends.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const activeChat =
    activeTab === "groups"
      ? mockGroups.find((g) => g.id === activeChatId)
      : mockFriends.find((f) => f.id === activeChatId);

  const handleCreateGroup = () => {
    if (!newGroupName.trim() || selectedFriends.length === 0) return;
    // In a real app, you would create the group on the server
    setShowNewGroupDialog(false);
    setNewGroupName("");
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
    <>
      <PageTitle
        title="Chat"
        subTitle="Connect with other managers and friends"
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[calc(100vh-200px)]">
        {/* Sidebar */}
        <div className="md:col-span-1 border rounded-lg overflow-hidden flex flex-col">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-4">
              <Tabs
                defaultValue="groups"
                className="w-full"
                onValueChange={(value) =>
                  setActiveTab(value as "groups" | "friends")
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
              {activeTab === "groups" ? (
                <>
                  <div className="flex justify-between items-center p-2">
                    <h3 className="font-medium text-sm">GROUPS</h3>
                    <Dialog
                      open={showNewGroupDialog}
                      onOpenChange={setShowNewGroupDialog}
                    >
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
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
                              onChange={(e) => setNewGroupName(e.target.value)}
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
                        activeChatId === group.id ? "bg-muted" : ""
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
                        activeChatId === friend.id ? "bg-muted" : ""
                      }`}
                      onClick={() => handleChatSelect(friend.id)}
                    >
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={friend.avatar} alt={friend.name} />
                          <AvatarFallback>{friend.initials}</AvatarFallback>
                        </Avatar>
                        <span
                          className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${
                            friend.status === "online"
                              ? "bg-green-500"
                              : friend.status === "away"
                                ? "bg-yellow-500"
                                : "bg-gray-500"
                          }`}
                        ></span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <p className="font-medium truncate">{friend.name}</p>
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
                        : activeChat.status === "online"
                          ? "Online"
                          : activeChat.status === "away"
                            ? "Away"
                            : "Offline"}
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
                      className={`flex ${msg.isCurrentUser ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex ${
                          msg.isCurrentUser ? "flex-row-reverse" : "flex-row"
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
                          className={`space-y-1 ${msg.isCurrentUser ? "mr-2" : "ml-2"}`}
                        >
                          <div
                            className={`rounded-lg px-3 py-2 ${
                              msg.isCurrentUser
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
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
                              msg.isCurrentUser ? "text-right" : "text-left"
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
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
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
    </>
  );
}
