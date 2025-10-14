import React, { useMemo, useState } from "react";

import {
  ArrowDown,
  ArrowUp,
  Flag,
  Info,
  ShoppingCart,
  TrendingUp,
  UserRoundX,
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Player } from "@/types/player";

interface PlayerTableProps {
  initPlayers: Player[];
  upgradePlayer: (player: Player) => void;
  viewPlayerInNationalTeam: (player: Player) => void;
  sellPlayer: (player: Player) => void;
  releasePlayer: (player: Player) => void;
  viewPlayerDetail: (player: Player) => void;
}

const SORT_TYPES = ["desc", "asc"] as const;

function PlayerTable({
  initPlayers,
  upgradePlayer,
  viewPlayerInNationalTeam,
  sellPlayer,
  releasePlayer,
  viewPlayerDetail,
}: PlayerTableProps) {
  const [players, setPlayers] = useState<Player[]>(initPlayers);
  const [sortOrderIndex, setSortOrderIndex] = useState<number>(
    SORT_TYPES.length,
  );

  const toggleSortOrder = () => {
    let newSortOrderIndex = sortOrderIndex;
    if (sortOrderIndex === SORT_TYPES.length) {
      newSortOrderIndex = 0;
      setPlayers([...players].sort((a, b) => b.rating - a.rating));
      setSortOrderIndex(newSortOrderIndex);
    } else {
      newSortOrderIndex += 1;
      if (newSortOrderIndex >= SORT_TYPES.length) {
        newSortOrderIndex = SORT_TYPES.length;
        setPlayers([...initPlayers]);
      } else {
        setPlayers(
          [...players].sort((a, b) =>
            SORT_TYPES[newSortOrderIndex] === "asc"
              ? a.rating - b.rating
              : b.rating - a.rating,
          ),
        );
      }
      setSortOrderIndex(newSortOrderIndex);
    }
  };

  const sortOrderHtml = useMemo(() => {
    if (sortOrderIndex === 0) {
      return <ArrowDown className="ml-1 h-4 w-4" />;
    }
    if (sortOrderIndex === 1) {
      return <ArrowUp className="ml-1 h-4 w-4" />;
    }
    return null;
  }, [sortOrderIndex]);

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
                {sortOrderHtml}
              </span>
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-center">Position</TableHead>
            <TableHead className="text-center">Nationality</TableHead>
            <TableHead className="text-center">Birthday</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {players.length > 0 ? (
            players.map((player) => (
              <TableRow key={player.id}>
                <TableCell className="text-center">{player.rating}</TableCell>
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
                <TableCell className="text-center">
                  {player.nationalTeam?.callUp ? (
                    <Badge
                      className="bg-blue-500 cursor-pointer"
                      onClick={() => viewPlayerInNationalTeam(player)}
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
                <TableCell className="text-center">{player.birthday}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => viewPlayerDetail(player)}
                          >
                            <Info className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Info</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => upgradePlayer(player)}
                          >
                            <TrendingUp className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Upgrade</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => sellPlayer(player)}
                          >
                            <ShoppingCart className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Sell</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => releasePlayer(player)}
                          >
                            <UserRoundX className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Release</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={6}
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
