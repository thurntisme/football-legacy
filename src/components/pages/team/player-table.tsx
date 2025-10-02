import React, { useState } from "react";

import {
  ArrowDown,
  ArrowUp,
  Flag,
  Info,
  Pencil,
  Star,
  TrendingUp,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getFitnessColor, getFormBadge } from "@/lib/player";
import { cn } from "@/lib/utils";
import { Player } from "@/types/player";

interface PlayerTableProps {
  initPlayers: Player[];
  setSelectedDetailPlayer: React.Dispatch<React.SetStateAction<Player | null>>;
  setDetailDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onEditAttributes: (player: Player) => void;
  handlePlayerUpgrade: (player: Player) => void;
  handleNationalTeamDetails: (player: Player) => void;
}
// Update the PlayerTable component to include the detail button
function PlayerTable({
  initPlayers,
  setSelectedDetailPlayer,
  setDetailDialogOpen,
  onEditAttributes,
  handlePlayerUpgrade,
  handleNationalTeamDetails,
}: PlayerTableProps) {
  const [players, setPlayers] = useState<Player[]>(initPlayers);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === "desc" ? "asc" : "desc";
    setSortOrder(newSortOrder);
    setPlayers(
      [...players].sort((a, b) =>
        newSortOrder === "asc" ? a.rating - b.rating : b.rating - a.rating,
      ),
    );
  };

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px] text-center">
              <span
                className="cursor-pointer flex items-center justify-center"
                onClick={toggleSortOrder}
              >
                Rating
                {sortOrder === "desc" ? (
                  <ArrowDown className="ml-1 h-4 w-4" />
                ) : (
                  <ArrowUp className="ml-1 h-4 w-4" />
                )}
              </span>
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-center">Position</TableHead>
            <TableHead className="text-center">Age</TableHead>
            <TableHead className="text-center">Nationality</TableHead>
            <TableHead className="text-center">Form</TableHead>
            <TableHead className="text-center">Fitness</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {players.length > 0 ? (
            players.map((player) => (
              <TableRow key={player.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center justify-center">
                    {player.rating >= 80 && (
                      <Star className="h-3 w-3 text-amber-400 mr-1" />
                    )}
                    {player.rating}
                  </div>
                </TableCell>
                <TableCell>{player.name}</TableCell>
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
                <TableCell className="text-center">{player.age}</TableCell>
                <TableCell className="text-center">
                  {player.nationalTeam?.callUp ? (
                    <Badge
                      className="bg-blue-500 cursor-pointer"
                      onClick={() => handleNationalTeamDetails(player)}
                    >
                      <Flag className="h-3 w-3 mr-1" />
                      {player.nationalTeam.name}
                    </Badge>
                  ) : (
                    <span className="text-muted-foreground text-sm">
                      {player.nationality}
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {getFormBadge(player.form)}
                </TableCell>
                <TableCell
                  className={cn(getFitnessColor(player.fitness), "text-center")}
                >
                  {player.fitness}%
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setSelectedDetailPlayer(player);
                        setDetailDialogOpen(true);
                      }}
                    >
                      <Info className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onEditAttributes(player)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handlePlayerUpgrade(player)}
                    >
                      <TrendingUp className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={9}
                className="text-center py-4 text-muted-foreground"
              >
                No players found matching your filters
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
export default PlayerTable;
