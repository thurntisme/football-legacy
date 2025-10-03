import PageTitle from "../../common/page-title";

import React from "react";

import { Trophy, Wifi, WifiOff } from "lucide-react";

import { Badge } from "@/components/ui/badge";

type Props = {
  isConnected: boolean;
};

const OnlineMatchOverview = ({ isConnected }: Props) => {
  return (
    <PageTitle
      title="Online Matches"
      subTitle="Play against other managers in real-time"
    >
      <Badge variant={isConnected ? "default" : "destructive"} className="mr-2">
        {isConnected ? (
          <>
            <Wifi className="h-3 w-3 mr-1" /> Connected
          </>
        ) : (
          <>
            <WifiOff className="h-3 w-3 mr-1" /> Disconnected
          </>
        )}
      </Badge>
      <Badge variant="outline">
        <Trophy className="h-3 w-3 mr-1" /> Rank: 1820
      </Badge>
    </PageTitle>
  );
};

export default OnlineMatchOverview;
