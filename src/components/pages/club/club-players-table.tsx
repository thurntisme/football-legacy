"use client";

import React from "react";

import {
  Info,
  ShoppingCart,
  Trash2,
  TrendingUp,
  UserPlus,
  UserRoundX,
} from "lucide-react";

import ConfirmDialog from "@/components/common/confirm-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { getEditionBadge } from "@/lib/player";
import { Player } from "@/types/player";

interface PlayerTableProps {
  players: Player[];
  togglePlayerSelection: (playerId: string) => void;
  removePlayer: (player: Player) => void;
  sellPlayer: (player: Player) => void;
  joinTeam: (player: Player) => void;
  viewPlayerDetail: (player: Player) => void;
}

export default function ClubPlayersTable({
  players,
  togglePlayerSelection,
  removePlayer,
  sellPlayer,
  joinTeam,
  viewPlayerDetail,
}: PlayerTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[40px] text-center">#</TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="w-[50px] text-center">Rating</TableHead>
          <TableHead className="text-center">Position</TableHead>
          <TableHead className="text-center">Edition</TableHead>
          <TableHead className="text-center">Level</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {players.length > 0 ? (
          players.map((player) => (
            <TableRow key={player.id}>
              <TableCell className="w-[40px] px-0 text-center">
                <Checkbox
                  checked={player.selected}
                  onCheckedChange={() =>
                    player.id && togglePlayerSelection(player.id)
                  }
                />
              </TableCell>
              <TableCell>{player.name}</TableCell>
              <TableCell className="text-center">{player.rating}</TableCell>
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
                {getEditionBadge(player.edition)}
              </TableCell>
              <TableCell className="text-center">
                <Badge variant="outline" className="font-bold">
                  Lvl {player.level || 1}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex justify-end space-x-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => viewPlayerDetail(player)}
                  >
                    <Info className="h-4 w-4" />
                  </Button>
                  <ConfirmDialog
                    title="Join Team"
                    description={`Are you sure you want to join player ${player.name} to your team?`}
                    onConfirm={() => joinTeam(player)}
                  >
                    <Button variant="outline" size="sm">
                      <UserPlus className="h-4 w-4" />
                    </Button>
                  </ConfirmDialog>
                  <ConfirmDialog
                    title="Sell Player"
                    description={`Are you sure you want to sell player ${player.name}?`}
                    onConfirm={() => sellPlayer(player)}
                  >
                    <Button variant="outline" size="sm">
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </ConfirmDialog>
                  <ConfirmDialog
                    title="Remove Player"
                    description={`Are you sure you want to remove player ${player.name}?`}
                    onConfirm={() => removePlayer(player)}
                  >
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </ConfirmDialog>
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
  );
}
