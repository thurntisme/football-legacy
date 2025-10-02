"use client";

import React, { useEffect, useState } from "react";

import { ArrowLeft, Star, Users } from "lucide-react";
import Link from "next/link";

import ContentWrapper from "@/components/common/content-wrapper";
import PageTitle from "@/components/common/page-title";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SelectItem } from "@/components/ui/select";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { players } from "@/constants/player";
import { FOOTBALL_STATS_URL } from "@/constants/site";
import { toast } from "@/hooks/use-toast";
import { internalApi } from "@/lib/api/internal";
import { Player } from "@/types/player";
import { useQuery } from "@tanstack/react-query";

const ShirtNumber = () => {
  const [shirtNumbers, setShirtNumbers] = useState<{
    [playerId: string]: number;
  }>({});
  const [availableNumbers, setAvailableNumbers] = useState<number[]>([]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["my-team-player-contract"],
    queryFn: async () => {
      const { data } = await internalApi.get("/team");
      return data;
    },
  });

  useEffect(() => {
    if (!data?.players) return;
    // Initialize shirt numbers from player data
    const initialNumbers: { [playerId: string]: number } = {};
    data?.players.forEach((player: Player) => {
      initialNumbers[player.id] = player.shirtNumber;
    });
    setShirtNumbers(initialNumbers);

    // Initialize available numbers (1-99)
    const usedNumbers = new Set(Object.values(initialNumbers));
    const available = Array.from({ length: 99 }, (_, i) => i + 1).filter(
      (num) => !usedNumbers.has(num),
    );
    setAvailableNumbers(available);
  }, [data?.players]);

  const handleShirtNumberChange = (player: Player, newNumber: number) => {
    const playerId = player.id;
    // Check if the new number is already taken by another player
    const isNumberTaken = Object.entries(shirtNumbers).some(
      ([id, number]) => id !== playerId && number === newNumber,
    );

    if (isNumberTaken) {
      toast({
        title: "Number Taken",
        description: "This shirt number is already assigned to another player.",
        variant: "destructive",
      });
      return;
    }

    // Update the shirt numbers state
    setShirtNumbers((prevNumbers) => ({
      ...prevNumbers,
      [playerId]: newNumber,
    }));

    // Update available numbers
    const usedNumbers = new Set(
      Object.values({
        ...shirtNumbers,
        [playerId]: newNumber,
      }),
    );
    const available = Array.from({ length: 99 }, (_, i) => i + 1).filter(
      (num) => !usedNumbers.has(num),
    );
    setAvailableNumbers(available);

    toast({
      title: "Shirt Number Updated",
      description: `Updated shirt number for ${player.name} to ${newNumber}.`,
    });
  };

  const getAvailableNumbersForPlayer = (playerId: string): number[] => {
    const currentNumber = shirtNumbers[playerId];
    return [...availableNumbers, currentNumber]
      .sort((a, b) => a - b)
      .filter((i) => i);
  };

  const renderOptions = (id: string) => {
    const options = getAvailableNumbersForPlayer(id);
    if (options && options.length) {
      return (
        <>
          {options.map((number) => (
            <SelectItem key={number} value={number.toString()}>
              {number}
            </SelectItem>
          ))}
        </>
      );
    }
    return null;
  };

  return (
    <>
      <PageTitle
        title="Shirt Number"
        subTitle="Assign and manage shirt numbers for your squad"
      >
        <Button variant="outline" asChild>
          <Link href={`${FOOTBALL_STATS_URL}/game/team`}>
            <Users className="h-4 w-4 mr-2" />
            Team
          </Link>
        </Button>
        <Button asChild>
          <Link href={`${FOOTBALL_STATS_URL}/game/dashboard`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
      </PageTitle>
      <ContentWrapper isLoading={isLoading} error={error}>
        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="text-center">Rating</TableHead>
                  <TableHead className="text-center">Position</TableHead>
                  <TableHead className="text-center">Shirt Number</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {players.map((player) => (
                  <TableRow key={player.id}>
                    <TableCell>{player.name}</TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center justify-center">
                        {player.rating >= 80 && (
                          <Star className="h-3 w-3 text-amber-400 mr-1" />
                        )}
                        {player.rating}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex flex-col align-items-center">
                        <div className="flex flex-wrap justify-center gap-1 mt-1">
                          {player.playablePositions.map((pos) => (
                            <Badge
                              key={pos}
                              variant="outline"
                              className={
                                pos === player.position ? "border-primary" : ""
                              }
                            >
                              {pos}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="flex justify-center">
                      <Select
                        value={shirtNumbers[player.id]?.toString() || ""}
                        onValueChange={(value) =>
                          handleShirtNumberChange(
                            player,
                            Number.parseInt(value),
                          )
                        }
                      >
                        <SelectTrigger className="w-[100px]">
                          <SelectValue placeholder="Select number" />
                        </SelectTrigger>
                        <SelectContent>
                          {renderOptions(player.id)}
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </ContentWrapper>
    </>
  );
};

export default ShirtNumber;
