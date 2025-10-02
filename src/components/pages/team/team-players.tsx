"use client";

import React from "react";

import { ArrowLeftRight, FileSignature, Shirt } from "lucide-react";
import Link from "next/link";

import PageTitle from "@/components/common/page-title";
import PlayerList from "@/components/pages/team/player-list";
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
        <PageTitle title="Players" subTitle="Manage your squad and line-up">
          <Button variant="outline" asChild>
            <Link href={`${FOOTBALL_STATS_URL}/game/team/contract`}>
              <FileSignature className="mr-2 h-4 w-4" />
              Contract
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={`${FOOTBALL_STATS_URL}/game/team/shirt-number`}>
              <Shirt className="mr-2 h-4 w-4" />
              Shirt Number
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={`${FOOTBALL_STATS_URL}/game/club`}>
              <ArrowLeftRight className="mr-2 h-4 w-4" />
              Club Management
            </Link>
          </Button>
        </PageTitle>
      </CardHeader>
      <CardContent>
        <PlayerList initPlayers={players} />
      </CardContent>
      <div className="mt-4 p-4 bg-muted rounded-md">
        <h3 className="text-sm font-medium mb-2">Player Management</h3>
        <p className="text-sm text-muted-foreground">
          Player management actions like detailed editing, upgrades, and
          contract management have been moved to this page for easier access.
          Use the info and edit buttons to manage your players.
        </p>
      </div>
    </Card>
  );
};

export default TeamPlayers;
