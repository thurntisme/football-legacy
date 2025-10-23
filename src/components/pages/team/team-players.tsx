"use client";

import React from "react";

import { ArrowLeftRight, FileSignature, Shirt } from "lucide-react";
import Link from "next/link";

import PageTitle from "@/components/common/page-title";
import TeamPlayerList from "@/components/pages/team/team-player-list";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FOOTBALL_STATS_URL } from "@/constants/site";
import { Player } from "@/types/player";

type Props = {
  players: Player[];
};

const TeamPlayers = ({ players }: Props) => {
  return (
    <Card>
      <CardHeader className="pb-0">
        <PageTitle
          title="Players"
          subTitle="Manage your squad and line-up"
          showBtnDashboard={false}
        >
          <Button variant="outline" asChild>
            <Link href={`${FOOTBALL_STATS_URL}/game/team/contract`}>
              <FileSignature className="h-4 w-4" />
              Contract
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={`${FOOTBALL_STATS_URL}/game/team/shirt-number`}>
              <Shirt className="h-4 w-4" />
              Shirt Number
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={`${FOOTBALL_STATS_URL}/game/club`}>
              <ArrowLeftRight className="h-4 w-4" />
              Club Management
            </Link>
          </Button>
        </PageTitle>
      </CardHeader>
      <CardContent>
        <TeamPlayerList players={players} />
      </CardContent>
    </Card>
  );
};

export default TeamPlayers;
