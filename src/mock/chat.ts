import { ChatContact, ChatMessage } from "@/types/chat";

export const mockCommunityMessages: ChatMessage[] = [
  {
    id: 1,
    sender: {
      id: 1,
      name: "John Manager",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JM",
    },
    content:
      "Has anyone tried the new 4-2-3-1 formation? It's working great for me!",
    timestamp: "2 min ago",
    isCurrentUser: false,
  },
  {
    id: 2,
    sender: {
      id: 2,
      name: "Sarah Coach",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SC",
    },
    content: "I'm struggling with my defense. Any tips?",
    timestamp: "5 min ago",
    isCurrentUser: false,
  },
  {
    id: 3,
    sender: {
      id: 3,
      name: "Mike Tactics",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MT",
    },
    content: "Just signed an amazing striker for only £5M! What a bargain!",
    timestamp: "12 min ago",
    isCurrentUser: false,
  },
  {
    id: 4,
    sender: {
      id: 4,
      name: "Emma Scout",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "ES",
    },
    content:
      "Check out the new youth intake in South America. Some real gems there!",
    timestamp: "25 min ago",
    isCurrentUser: false,
  },
];

export const mockGroups: ChatContact[] = [
  {
    id: 1,
    name: "Community Chat",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "CC",
    status: "online",
    lastMessage: "Emma: Check out the new youth intake!",
    lastMessageTime: "2m ago",
    unreadCount: 3,
    isGroup: true,
    members: 245,
  },
  {
    id: 2,
    name: "Tactics Discussion",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "TD",
    status: "online",
    lastMessage: "John: 4-3-3 is the best formation",
    lastMessageTime: "1h ago",
    isGroup: true,
    members: 78,
  },
  {
    id: 3,
    name: "Transfer Market Tips",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "TM",
    status: "online",
    lastMessage: "Sarah: Found a great striker for £2M",
    lastMessageTime: "3h ago",
    isGroup: true,
    members: 156,
  },
  {
    id: 4,
    name: "Premier League Managers",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "PL",
    status: "online",
    lastMessage: "Mike: Anyone playing the derby this weekend?",
    lastMessageTime: "1d ago",
    isGroup: true,
    members: 42,
  },
];

export const mockFriends: ChatContact[] = [
  {
    id: 101,
    name: "John Manager",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "JM",
    status: "online",
    lastMessage: "Has anyone tried the new 4-2-3-1 formation?",
    lastMessageTime: "5m ago",
    unreadCount: 2,
  },
  {
    id: 102,
    name: "Sarah Coach",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "SC",
    status: "away",
    lastMessage: "I'm struggling with my defense. Any tips?",
    lastMessageTime: "30m ago",
  },
  {
    id: 103,
    name: "Mike Tactics",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "MT",
    status: "offline",
    lastMessage: "Just signed an amazing striker for only £5M!",
    lastMessageTime: "2h ago",
  },
  {
    id: 104,
    name: "Emma Scout",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "ES",
    status: "online",
    lastMessage: "Check out the new youth intake in South America.",
    lastMessageTime: "1d ago",
  },
  {
    id: 105,
    name: "David Analyst",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "DA",
    status: "online",
    lastMessage: "I've analyzed your last match. Let's discuss.",
    lastMessageTime: "2d ago",
  },
];

export const mockMessages: Record<number, ChatMessage[]> = {
  1: [
    {
      id: 1,
      sender: {
        id: 101,
        name: "John Manager",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "JM",
      },
      content:
        "Has anyone tried the new 4-2-3-1 formation? It's working great for me!",
      timestamp: "10:15 AM",
      isCurrentUser: false,
    },
    {
      id: 2,
      sender: {
        id: 102,
        name: "Sarah Coach",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "SC",
      },
      content: "I'm struggling with my defense. Any tips?",
      timestamp: "10:17 AM",
      isCurrentUser: false,
    },
    {
      id: 3,
      sender: {
        id: 999,
        name: "Alex Manager",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "AM",
      },
      content:
        "Try using a defensive midfielder to shield your back four. Works wonders for me!",
      timestamp: "10:20 AM",
      isCurrentUser: true,
    },
    {
      id: 4,
      sender: {
        id: 103,
        name: "Mike Tactics",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "MT",
      },
      content: "Just signed an amazing striker for only £5M! What a bargain!",
      timestamp: "10:25 AM",
      isCurrentUser: false,
    },
    {
      id: 5,
      sender: {
        id: 104,
        name: "Emma Scout",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "ES",
      },
      content:
        "Check out the new youth intake in South America. Some real gems there!",
      timestamp: "10:30 AM",
      isCurrentUser: false,
    },
  ],
  101: [
    {
      id: 1,
      sender: {
        id: 101,
        name: "John Manager",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "JM",
      },
      content: "Hey, how's your team doing this season?",
      timestamp: "Yesterday, 4:30 PM",
      isCurrentUser: false,
    },
    {
      id: 2,
      sender: {
        id: 999,
        name: "Alex Manager",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "AM",
      },
      content: "Pretty good! We're second in the league right now.",
      timestamp: "Yesterday, 4:35 PM",
      isCurrentUser: true,
    },
    {
      id: 3,
      sender: {
        id: 101,
        name: "John Manager",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "JM",
      },
      content: "That's awesome! Any standout players?",
      timestamp: "Yesterday, 4:40 PM",
      isCurrentUser: false,
    },
    {
      id: 4,
      sender: {
        id: 999,
        name: "Alex Manager",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "AM",
      },
      content: "My striker has 15 goals in 12 games! He's been incredible.",
      timestamp: "Yesterday, 4:45 PM",
      isCurrentUser: true,
    },
    {
      id: 5,
      sender: {
        id: 101,
        name: "John Manager",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "JM",
      },
      content:
        "Has anyone tried the new 4-2-3-1 formation? It's working great for me!",
      timestamp: "Today, 10:15 AM",
      isCurrentUser: false,
    },
  ],
};
