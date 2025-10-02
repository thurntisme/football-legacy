import React from "react";

import { Pencil, UserX } from "lucide-react";

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
import { Player } from "@/types/player";

type Props = {
  filteredPlayers: Player[];
  openContractEditDialog: (player: Player) => void;
};

const PlayerContractTable = ({
  filteredPlayers,
  openContractEditDialog,
}: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="text-center">Position</TableHead>
          <TableHead className="text-center">Rating</TableHead>
          <TableHead className="text-center">Position</TableHead>
          <TableHead className="text-center">Salary (£/week)</TableHead>
          <TableHead className="text-center">Contract Years</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredPlayers.map((player) => (
          <TableRow key={player.id}>
            <TableCell>{player.name}</TableCell>
            <TableCell className="text-center">{player.position}</TableCell>
            <TableCell className="font-medium text-center">
              {player.rating}
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
            <TableCell className="text-center">
              £{player.salary.toLocaleString()}
            </TableCell>
            <TableCell className="text-center">
              {player.contractYears} years
            </TableCell>
            <TableCell className="text-right space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => openContractEditDialog(player)}
              >
                <Pencil className="h-4 w-4" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                // onClick={() => handleReleasePlayer(player.id)}
              >
                <UserX className="h-4 w-4" />
                Release
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PlayerContractTable;
