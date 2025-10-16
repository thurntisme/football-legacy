import React from "react";

import ContentWrapper from "@/components/common/content-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { internalApi } from "@/lib/api/internal";
import { OnlineManager } from "@/types/match";
import { useQuery } from "@tanstack/react-query";

import OnlineUserList from "./user-list";

type Props = {
  viewTeamInfo: (onlineManager: OnlineManager) => void;
  challengeUser: (user: OnlineManager) => void;
};

const FindOnlineMatch = ({ viewTeamInfo, challengeUser }: Props) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["online-users"],
    queryFn: async () => {
      const res = await internalApi.get("/online/users");
      return res.data?.data || [];
    },
  });

  const searchPlayer = (query: string) => {
    toast({
      title: "Searching for player...",
      description: "Please wait while we search for the player.",
    });
  };

  return (
    <ContentWrapper isLoading={isLoading} error={error} onRefetch={refetch}>
      <Card>
        <CardContent className="p-4">
          <Tabs defaultValue="community" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="community">Community</TabsTrigger>
              <TabsTrigger value="friend">Friend</TabsTrigger>
            </TabsList>

            <TabsContent value="community">
              <OnlineUserList
                users={data?.community || []}
                viewTeamInfo={viewTeamInfo}
                challengeUser={challengeUser}
                searchPlayer={searchPlayer}
              />
            </TabsContent>
            <TabsContent value="friend">
              <OnlineUserList
                users={data?.friend || []}
                viewTeamInfo={viewTeamInfo}
                challengeUser={challengeUser}
                searchPlayer={searchPlayer}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </ContentWrapper>
  );
};

export default FindOnlineMatch;
