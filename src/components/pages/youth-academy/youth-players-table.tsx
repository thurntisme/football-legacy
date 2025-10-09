import React from 'react';

import { Plane, ShoppingCart, Users } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { YouthPlayer } from '@/types/football/player';

type Props = {
  toggleSort: (column: string) => void;
  getSortIcon: (column: string) => React.ReactNode;
  filteredPlayers: YouthPlayer[];
  handlePromotePlayer: (player: any) => void;
  handleLoanPlayer: (player: any) => void;
  handlePlaceOnMarket: (player: any) => void;
};

const YouthPlayersTable = ({
  toggleSort,
  getSortIcon,
  filteredPlayers,
  handlePromotePlayer,
  handleLoanPlayer,
  handlePlaceOnMarket,
}: Props) => {
  const getPotentialBadgeColor = (value: number) => {
    if (value >= 85) return 'bg-purple-500 hover:bg-purple-600';
    if (value >= 80) return 'bg-blue-500 hover:bg-blue-600';
    if (value >= 75) return 'bg-green-500 hover:bg-green-600';
    return 'bg-gray-500 hover:bg-gray-600';
  };
  const getDevelopmentStageBadge = (stage: string) => {
    switch (stage) {
      case 'Elite Prospect':
        return (
          <Badge className="bg-purple-500 hover:bg-purple-600">{stage}</Badge>
        );
      case 'Promising':
        return <Badge className="bg-blue-500 hover:bg-blue-600">{stage}</Badge>;
      case 'Developing Well':
        return (
          <Badge className="bg-green-500 hover:bg-green-600">{stage}</Badge>
        );
      case 'Raw Talent':
        return (
          <Badge className="bg-amber-500 hover:bg-amber-600">{stage}</Badge>
        );
      case 'Ready for Promotion':
        return (
          <Badge className="bg-emerald-500 hover:bg-emerald-600">{stage}</Badge>
        );
      default:
        return <Badge>{stage}</Badge>;
    }
  };
  const getPromotionReadinessColor = (value: number) => {
    if (value >= 75) return 'bg-green-500';
    if (value >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead className="w-[80px] text-center">Age</TableHead>
              <TableHead className="w-[100px] text-center">Position</TableHead>
              <TableHead className="w-[120px] text-center">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => toggleSort('potential')}
                >
                  Potential {getSortIcon('potential')}
                </div>
              </TableHead>
              <TableHead className="w-[120px] text-center">
                <div
                  className="flex items-center justify-center cursor-pointer"
                  onClick={() => toggleSort('currentAbility')}
                >
                  Current {getSortIcon('currentAbility')}
                </div>
              </TableHead>
              <TableHead className="w-[150px] text-center">
                Development
              </TableHead>
              <TableHead className="w-[120px] text-center">Promotion</TableHead>
              <TableHead className="w-[220px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPlayers.map((player) => (
              <TableRow key={player.id}>
                <TableCell className="font-medium">{player.name}</TableCell>
                <TableCell className="text-center">{player.age}</TableCell>
                <TableCell className="text-center">
                  <Badge variant="outline">{player.position}</Badge>
                </TableCell>
                <TableCell className="text-center">
                  <Badge className={getPotentialBadgeColor(player.potential)}>
                    {player.potential}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  {player.currentAbility}
                </TableCell>
                <TableCell className="text-center">
                  {getDevelopmentStageBadge(player.developmentStage)}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col space-y-1">
                    <Progress
                      value={player.promotionReadiness}
                      className={`h-2 ${getPromotionReadinessColor(player.promotionReadiness)}`}
                    />
                    <span className="text-xs text-gray-500">
                      {player.promotionReadiness}%
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePromotePlayer(player)}
                      className="flex items-center"
                    >
                      <Users className="h-3 w-3 mr-1" />
                      Join Team
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleLoanPlayer(player)}
                      className="flex items-center"
                    >
                      <Plane className="h-3 w-3 mr-1" />
                      Loan
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePlaceOnMarket(player)}
                      className="flex items-center"
                    >
                      <ShoppingCart className="h-3 w-3 mr-1" />
                      Market
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default YouthPlayersTable;
