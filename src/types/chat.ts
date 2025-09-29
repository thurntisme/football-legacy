export type ChatMessage = {
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

export type ChatContact = {
  id: number;
  name: string;
  avatar: string;
  initials: string;
  status: "online" | "offline" | "away";
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
  isGroup?: boolean;
  members?: number;
};
