export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  avatar: string;
  plan: string;
  createdAt: Date;
  updatedAt: Date;

  club?: UserClub;
  notifications?: UserNotification[];
  settings?: UserSettings[];
  messages?: UserMessage[];
};

enum ServerEnum {
  EuropeWest = "europe-west",
  EuropeCentral = "europe-central",
  AsiaEast = "asia-east",
  AsiaWest = "asia-west",
  NorthAmerica = "north-america",
  SouthAmerica = "south-america",
  Africa = "africa",
  Australia = "australia",
  Antarctica = "antarctica",
  Arctic = "arctic",
  Pacific = "pacific",
  Atlantic = "atlantic",
  Indian = "indian",
  Southern = "southern",
}

export type UserClub = {
  id: number;
  name: string;
  thumbnail: string;
  budget: number;
  coin: number;
  level: number;
  server: ServerEnum;
  createdAt: Date;
  updatedAt: Date;
};

type UserNotification = {
  id: number;
  userId: number;
  content: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type UserSettings = {
  id: number;
  userId: number;
  theme: string;
  language: string;
  notifications: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type UserMessage = {
  id: number;
  userId: number;
  content: string;
  fromUserId: number;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export enum TicketStatusEnum {
  IN_PROGRESS = "in-progress",
  RESOLVED = "resolved",
  URGENT = "urgent",
}
export type SupportTicket = {
  id: string;
  title: string;
  description: string;
  status: TicketStatusEnum;
  openedDate: string;
  messages: Array<{
    id: string;
    author: string;
    content: string;
    timestamp: string;
    isAdmin: boolean;
  }>;
};
