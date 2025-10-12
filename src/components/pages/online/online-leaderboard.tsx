import React from "react";

import { Award, Eye, Shield, Star, Swords, Trophy } from "lucide-react";

import ContentWrapper from "@/components/common/content-wrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    queryKey: ["online-leaderboard-user-list"],
    queryFn: async () => {
      const { data } = await internalApi.get("/online-leaderboard");
      return data;
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Global Leaderboard</CardTitle>
        <CardDescription>Top managers ranked by rating</CardDescription>
      </CardHeader>
      <CardContent>
        <ContentWrapper isLoading={isLoading} error={error} onRefetch={refetch}>
          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-3 text-center font-medium">Rank</th>
                  <th className="p-3 text-left font-medium">Manager</th>
                  <th className="p-3 text-center font-medium">Rating</th>
                  <th className="p-3 text-center font-medium">Record</th>
                  <th className="p-3 text-right font-medium w-[100px]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {onlineUsers &&
                  onlineUsers
                    .sort((a, b) => b.rating - a.rating)
                    .map((user, index) => (
                      <tr
                        key={user.id}
                        className={`border-b ${
                          user.name === "Alex Manager" ? "bg-primary/10" : ""
                        }`}
                      >
                        <td className="p-3 text-center">
                          {index === 0 ? (
                            <Trophy className="h-5 w-5 text-yellow-500 mx-auto" />
                          ) : index === 1 ? (
                            <Award className="h-5 w-5 text-gray-400 mx-auto" />
                          ) : index === 2 ? (
                            <Shield className="h-5 w-5 text-amber-700 mx-auto" />
                          ) : (
                            index + 1
                          )}
                        </td>
                        <td className="p-3">
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {user.team}
                          </div>
                        </td>
                        <td className="p-3 text-center">
                          <div className="flex items-center justify-center">
                            <Star className="h-4 w-4 text-amber-500 mr-1" />
                            <span>{user.rating}</span>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex space-x-1 justify-center">
                            <Badge variant="default" className="bg-green-500">
                              {user?.wins || 0}W
                            </Badge>
                            <Badge variant="outline">{user?.draws || 0}D</Badge>
                            <Badge variant="destructive">
                              {user?.losses || 0}L
                            </Badge>
                          </div>
                        </td>
                        <td className="p-3 text-right flex space-x-2 justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => viewTeamInfo(user)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Detail
                          </Button>
                          <Button size="sm" onClick={() => challengeUser(user)}>
                            <Swords className="h-4 w-4" />
                            Challenge
                          </Button>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </ContentWrapper>
      </CardContent>
    </Card>
  );
};

export default OnlineLeaderboard;
