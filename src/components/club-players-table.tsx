"use client";

import React, { JSX } from "react";

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
import { Player } from "@/types/player";

interface PlayerTableProps {
  players: Player[];
  togglePlayerSelection: (playerId: string) => void;
  handleRemovePlayer: (playerId: string) => void;
  handlePlaceOnMarket: (playerId: string) => void;
  handleJoinTeam: (playerId: string) => void;
  handleReleasePlayer: (playerId: string) => void;
  getPlayerTypeBadge: (type?: string) => JSX.Element | null;
  getStatusBadge: (status: Player["status"]) => JSX.Element | null;
}

export default function ClubPlayersTable({
  players,
  togglePlayerSelection,
  handleRemovePlayer,
  handlePlaceOnMarket,
  handleJoinTeam,
  handleReleasePlayer,
  getPlayerTypeBadge,
  getStatusBadge,
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
                onCheckedChange={() => togglePlayerSelection(player.id)}
              />
            </TableCell>
            <TableCell>{player.name}</TableCell>
            <TableCell className="text-center">{player.position}</TableCell>
            <TableCell className="text-center">
              {getPlayerTypeBadge(player.type)}
            </TableCell>
            <TableCell className="text-center">
              <Badge variant="outline" className="font-bold">
                Lvl {player.level || 1}
              </Badge>
            </TableCell>
            <TableCell className="text-center">
              {getStatusBadge(player.status)}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                {index < 11 ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleReleasePlayer(player.id)}
                  >
                    <UserX className="h-4 w-4 mr-1" />
                    Release
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleJoinTeam(player.id)}
                    >
                      <UserPlus className="h-4 w-4 mr-1" />
                      Join
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePlaceOnMarket(player.id)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Market
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemovePlayer(player.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
