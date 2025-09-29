"use client";

import type React from "react";
import { useEffect, useState } from "react";

import { Star } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
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
import { toast } from "@/hooks/use-toast";
import { Player } from "@/types/player";

interface ShirtNumberManagerProps {
  players: Player[];
}

const ShirtNumberManager: React.FC<ShirtNumberManagerProps> = ({ players }) => {
  const [shirtNumbers, setShirtNumbers] = useState<{
    [playerId: string]: number;
  }>({});
  const [availableNumbers, setAvailableNumbers] = useState<number[]>([]);

  useEffect(() => {
    // Initialize shirt numbers from player data
    const initialNumbers: { [playerId: string]: number } = {};
    players.forEach((player) => {
      initialNumbers[player.id] = player.shirtNumber;
    });
    setShirtNumbers(initialNumbers);

    // Initialize available numbers (1-99)
    const usedNumbers = new Set(Object.values(initialNumbers));
    const available = Array.from({ length: 99 }, (_, i) => i + 1).filter(
      (num) => !usedNumbers.has(num),
    );
    setAvailableNumbers(available);
  }, [players]);

  const handleShirtNumberChange = (playerId: string, newNumber: number) => {
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
      description: `Updated shirt number for player ID ${playerId} to ${newNumber}.`,
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
    <Card>
      <CardHeader>
        <CardTitle>Squad Numbers</CardTitle>
        <CardDescription>
          Assign and manage shirt numbers for your squad
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
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
                    {player.position}
                  </TableCell>
                  <TableCell className="flex justify-center">
                    <Select
                      value={shirtNumbers[player.id]?.toString() || ""}
                      onValueChange={(value) =>
                        handleShirtNumberChange(
                          player.id,
                          Number.parseInt(value),
                        )
                      }
                    >
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Select number" />
                      </SelectTrigger>
                      <SelectContent>{renderOptions(player.id)}</SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShirtNumberManager;
