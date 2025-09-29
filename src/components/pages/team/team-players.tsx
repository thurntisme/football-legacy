"use client";

import React from "react";

import { ArrowLeftRight } from "lucide-react";
import Link from "next/link";

import PlayerList from "@/components/player-list";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FOOTBALL_STATS_URL } from "@/constants/site";
import { Player } from "@/types/player";

type Props = {
  players: Player[];
};

const TeamPlayers = ({ players }: Props) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Player List</CardTitle>
            <CardDescription>Manage your squad and line-up</CardDescription>
          </div>
          <Button variant="outline" asChild>
            <Link href={`${FOOTBALL_STATS_URL}/club`}>
              <ArrowLeftRight className="mr-2 h-4 w-4" />
              Club Management
            </Link>
          </Button>
        </div>
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
