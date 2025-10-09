"use client";

import React from "react";

import { ShoppingCart, Trash2, UserPlus, UserX } from "lucide-react";

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
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getEditionBadge, getStatusBadge } from "@/lib/player";
import { Player } from "@/types/player";
import { TooltipContent } from "@radix-ui/react-tooltip";

interface PlayerTableProps {
  players: Player[];
  togglePlayerSelection: (playerId: string) => void;
  handleRemovePlayer: (playerId: string) => void;
  handlePlaceOnMarket: (playerId: string) => void;
  handleJoinTeam: (playerId: string) => void;
  handleReleasePlayer: (playerId: string) => void;
}

export default function ClubPlayersTable({
  players,
  togglePlayerSelection,
  handleRemovePlayer,
  handlePlaceOnMarket,
  handleJoinTeam,
  handleReleasePlayer,
}: PlayerTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[40px] text-center">#</TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="text-center">Position</TableHead>
          <TableHead className="text-center">Type</TableHead>
          <TableHead className="text-center">Level</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {players.map((player, index) => (
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
            <TableCell className="text-center">{player.position}</TableCell>
            <TableCell className="text-center">
              {getEditionBadge(player.edition)}
            </TableCell>
            <TableCell className="text-center">
              <Badge variant="outline" className="font-bold">
                Lvl {player.level || 1}
              </Badge>
            </TableCell>
            <TableCell className="text-center">
              {player.status && getStatusBadge(player.status)}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          player.id && handleReleasePlayer(player.id)
                        }
                      >
                        <UserX className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Release</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => player.id && handleJoinTeam(player.id)}
                      >
                        <UserPlus className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Join Team</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          player.id && handlePlaceOnMarket(player.id)
                        }
                      >
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Place on Market</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          player.id && handleRemovePlayer(player.id)
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Remove</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
