import React from "react";

import { Plane, ShoppingCart, Users } from "lucide-react";

import PlayerPositionBadge from "@/components/common/player-position-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
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
import { YouthPlayer } from "@/types/player";

type Props = {
  players: YouthPlayer[];
  handlePromotePlayer: (player: YouthPlayer) => void;
  handleLoanPlayer: (player: YouthPlayer) => void;
  handlePlaceOnMarket: (player: YouthPlayer) => void;
};

const YouthPlayersTable = ({
  players,
  handlePromotePlayer,
  handleLoanPlayer,
  handlePlaceOnMarket,
}: Props) => {
  const getPotentialBadgeColor = (value: number) => {
    if (value >= 85) return "bg-purple-500 hover:bg-purple-600";
    if (value >= 80) return "bg-blue-500 hover:bg-blue-600";
    if (value >= 75) return "bg-green-500 hover:bg-green-600";
    return "bg-gray-500 hover:bg-gray-600";
  };
  const getPromotionReadinessColor = (value: number) => {
    if (value >= 75) return "bg-green-500";
    if (value >= 60) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead className="w-[80px] text-center">Age</TableHead>
              <TableHead className="text-center">Position</TableHead>
              <TableHead className="w-[120px] text-center">Potential</TableHead>
              <TableHead className="w-[120px] text-center">Ability</TableHead>
              <TableHead className="w-[120px] text-center">Promotion</TableHead>
              <TableHead className="w-[220px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {players.length
              ? players.map((player) => (
                  <TableRow key={player.id}>
                    <TableCell className="font-medium">{player.name}</TableCell>
                    <TableCell className="text-center">{player.age}</TableCell>
                    <TableCell className="text-center">
                      <PlayerPositionBadge player={player} />
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        className={getPotentialBadgeColor(player.potential)}
                      >
                        {player.potential}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      {player.currentAbility}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col items-center space-y-1">
                        <span className="text-xs text-gray-500">
                          {player.promotionReadiness}%
                        </span>
                        <Progress
                          value={player.promotionReadiness}
                          className="h-2"
                          indicatorBg={getPromotionReadinessColor(
                            player.promotionReadiness,
                          )}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-1">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handlePromotePlayer(player)}
                                className="flex items-center"
                              >
                                <Users className="h-3 w-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Join Team</TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleLoanPlayer(player)}
                                className="flex items-center"
                              >
                                <Plane className="h-3 w-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Loan</TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handlePlaceOnMarket(player)}
                                className="flex items-center"
                              >
                                <ShoppingCart className="h-3 w-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Market</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default YouthPlayersTable;
