import React from 'react';

import { Pencil } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Player } from '@/types/football/player';

type Props = {
  filteredPlayers: Player[];
  handleContractEdit: (player: Player) => void;
};

const PlayerContractShirtTable = ({
  filteredPlayers,
  handleContractEdit,
}: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="text-center">Position</TableHead>
          <TableHead className="text-center">Shirt #</TableHead>
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
              {player.shirtNumber}
            </TableCell>
            <TableCell className="text-center">
              £{player.salary.toLocaleString()}
            </TableCell>
            <TableCell className="text-center">
              {player.contractYears} years
            </TableCell>
            <TableCell className="text-right">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleContractEdit(player)}
              >
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PlayerContractShirtTable;
