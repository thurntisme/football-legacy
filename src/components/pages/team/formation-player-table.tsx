import React, { useMemo, useState } from "react";

import { ArrowLeft, ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlayerPosition } from "@/constants/formations";
import {
  getFitnessColor,
  getFitnessColorCode,
  getFormBadgeIcon,
  getPlayerStatusIcons,
  getPositionColor,
  getRatingColor,
} from "@/lib/player";
import { Player } from "@/types/player";

type Props = {
  initPlayers: Player[];
  selectedPlayer: Player | null;
  onClickPlayer: (player: Player | null) => void;
  isSubstitute?: boolean;
};

const MAX_SUBSTITUTES_PER_PAGE = 5;

const FormationPlayerTable = ({
  initPlayers,
  selectedPlayer,
  onClickPlayer,
  isSubstitute = false,
}: Props) => {
  const [currentSubPage, setCurrentSubPage] = useState(0);

  const players = useMemo(() => {
    if (isSubstitute) {
      const startIndex = currentSubPage * MAX_SUBSTITUTES_PER_PAGE;
      const endIndex = startIndex + MAX_SUBSTITUTES_PER_PAGE;
      return initPlayers.slice(startIndex, endIndex);
    }
    return initPlayers;
  }, [isSubstitute, initPlayers, currentSubPage]);

  const maxSubPages = Math.ceil(initPlayers.length / MAX_SUBSTITUTES_PER_PAGE);
  const isLastSubPage = currentSubPage === maxSubPages - 1;
  const remainingSubNeedFill = isLastSubPage
    ? MAX_SUBSTITUTES_PER_PAGE - (players.length % MAX_SUBSTITUTES_PER_PAGE)
    : 0;

  return (
    <Table>
      <TableBody>
        {players.length ? (
          players.map((player, index) => (
            <>
              <TableRow
                key={player.id}
                className={`btn-sm cursor-pointer ${getRatingColor(player.rating)}`}
                onClick={() => player.id && onClickPlayer(player)}
              >
                <TableCell className="w-[40px]">
                  <span
                    className="block w-[40px] pl-2 border-l-4"
                    style={{
                      borderColor: getPositionColor(
                        player.position as PlayerPosition,
                      ),
                    }}
                  >
                    {player.position}
                  </span>
                </TableCell>
                <TableCell className="w-full">
                  <div className="flex gap-4">
                    {player.name}
                    <div className="flex items-center justify-center gap-2">
                      {getPlayerStatusIcons(player)}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-medium ">
                  <div className="flex items-center justify-center">
                    {player.rating}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center">
                    {getFormBadgeIcon(player.form)}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Progress
                    value={player.fitness}
                    className="h-2 w-12"
                    indicatorBg={`bg-${getFitnessColorCode(player.fitness)}`}
                  />
                </TableCell>
              </TableRow>
              {index === players.length - 1 &&
                remainingSubNeedFill > 0 &&
                Array.from({ length: remainingSubNeedFill }).map(() => (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-4 text-muted-foreground pointer-events-none"
                    >
                      <span className="opacity-0">{player.position}</span>
                    </TableCell>
                  </TableRow>
                ))}
            </>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={5}
              className="text-center py-4 text-muted-foreground"
            >
              No players found matching your filters
            </TableCell>
          </TableRow>
        )}
      </TableBody>
      {isSubstitute && (
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5} className="py-2">
              <div className="flex justify-between gap-2 items-center">
                <span className="text-sm mr-auto">
                  Showing {currentSubPage * MAX_SUBSTITUTES_PER_PAGE + 1} -{" "}
                  {Math.min(
                    currentSubPage * MAX_SUBSTITUTES_PER_PAGE +
                      MAX_SUBSTITUTES_PER_PAGE,
                    initPlayers.length,
                  )}{" "}
                  of {initPlayers.length}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentSubPage((prev) => prev - 1)}
                  disabled={currentSubPage === 0}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentSubPage((prev) => prev + 1)}
                  disabled={isLastSubPage}
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      )}
    </Table>
  );
};

export default FormationPlayerTable;
