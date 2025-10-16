import React, { useState } from "react";

import { Info, Send, Star, Swords } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { OnlineManager } from "@/types/match";

type Props = {
  users: OnlineManager[] | null | undefined;
  viewTeamInfo: (user: OnlineManager) => void;
  challengeUser: (user: OnlineManager) => void;
  searchPlayer: (query: string) => void;
};

const OnlineUserList = ({
  users,
  viewTeamInfo,
  challengeUser,
  searchPlayer,
}: Props) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Input
          placeholder="Search by name or team..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
        <Button onClick={() => searchPlayer(searchQuery)}>
          <Send className="h-4 w-4" />
          Search
        </Button>
      </div>
      <ScrollArea className="h-[480px]">
        <div className="flex flex-col gap-2">
          {users?.length &&
            users.map((user) => (
              <Card key={user.id} className="overflow-hidden">
                <div className="flex items-center p-4">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>
                        {user.name.substring(0, 2)}
                      </AvatarFallback>
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
                          user.status === "online" ? "outline" : "secondary"
                        }
                        className={`ml-2 text-xs ${
                          user.status === "online"
                            ? "bg-green-100"
                            : "bg-gray-100"
                        }`}
                      >
                        {user.status === "online" ? "Online" : "In Match"}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => viewTeamInfo(user)}
                          >
                            <Info className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Team Info</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger>
                          <Button
                            size="sm"
                            disabled={user.status !== "online"}
                            onClick={() => challengeUser(user)}
                          >
                            <Swords className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Challenge</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </Card>
            ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default OnlineUserList;
