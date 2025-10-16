import React from "react";

import { Award, Info, Shield, Star, Swords, Trophy } from "lucide-react";

import ContentWrapper from "@/components/common/content-wrapper";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { internalApi } from "@/lib/api/internal";
import { OnlineManager } from "@/types/match";
import { useQuery } from "@tanstack/react-query";

type Props = {
  viewTeamInfo: (user: OnlineManager) => void;
  challengeUser: (user: OnlineManager) => void;
};

const OnlineLeaderboard = ({ viewTeamInfo, challengeUser }: Props) => {
  const {
    data: onlineUsers,
    isLoading,
    error,
    refetch,
  } = useQuery<OnlineManager[] | null>({
    queryKey: ["online-leaderboards"],
    queryFn: async () => {
      const res = await internalApi.get("/online/leaderboards");
      return res.data?.data || [];
    },
  });

  return (
    <ContentWrapper isLoading={isLoading} error={error} onRefetch={refetch}>
      <div className="rounded-md border">
        <div className="flex border-b bg-muted/50">
          <div className="p-3 text-center font-medium w-[50px]">Rank</div>
          <div className="p-3 text-left font-medium flex-1">Manager</div>
          <div className="p-3 text-right font-medium w-[100px]">Actions</div>
        </div>
        <ScrollArea className="h-[580px]">
          {onlineUsers?.length &&
            onlineUsers
              .sort((a, b) => b.rating - a.rating)
              .map((user, index) => (
                <div
                  key={user.id}
                  className={`flex border-b ${
                    user.name === "Alex Manager" ? "bg-primary/10" : ""
                  }`}
                >
                  <div className="p-3 pt-6 text-center w-[50px]">
                    {index === 0 ? (
                      <Trophy className="h-5 w-5 text-yellow-500 mx-auto" />
                    ) : index === 1 ? (
                      <Award className="h-5 w-5 text-gray-400 mx-auto" />
                    ) : index === 2 ? (
                      <Shield className="h-5 w-5 text-amber-700 mx-auto" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <div className="p-3 flex-1">
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {user.team}
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-amber-500 mr-1" />
                      <span>{user.rating}</span>
                    </div>
                  </div>
                  <div className="p-3 text-right flex space-x-2 justify-end w-[100px]">
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
                </div>
              ))}
        </ScrollArea>
      </div>
    </ContentWrapper>
  );
};

export default OnlineLeaderboard;
