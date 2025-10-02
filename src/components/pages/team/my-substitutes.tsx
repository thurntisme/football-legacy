import React, { useState } from "react";

import { ArrowLeftRight, ChevronLeft, ChevronRight, Info } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getFormColor } from "@/lib/player";
import { Player } from "@/types/player";

type Props = {
  players: Player[];
  selectedPlayer: Player | null;
  setSelectedPlayer: (player: Player | null) => void;
  viewDetailPlayer: (player: Player) => void;
  swapSubPlayers: (player: Player) => void;
};

const MySubstitutes = ({
  players,
  selectedPlayer,
  setSelectedPlayer,
  viewDetailPlayer,
  swapSubPlayers,
}: Props) => {
  const [currentSubPage, setCurrentSubPage] = useState(0);
  const substitutes = players.slice(11);
  const subsPerPage = 5;
  const totalSubPages = Math.ceil(substitutes.length / subsPerPage);

  const handleClickPlayer = (player: Player | null) => {
    if (player) {
      if (selectedPlayer && selectedPlayer.id === player.id) {
        setSelectedPlayer(null);
      } else {
        setSelectedPlayer(player);
      }
    }
  };

  const nextSubPage = () => {
    if (currentSubPage < totalSubPages - 1) {
      setCurrentSubPage(currentSubPage + 1);
    }
  };

  const prevSubPage = () => {
    if (currentSubPage > 0) {
      setCurrentSubPage(currentSubPage - 1);
    }
  };

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-medium">
          Substitutes ({substitutes.length})
        </h3>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={prevSubPage}
            disabled={currentSubPage === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">
            {currentSubPage + 1} / {Math.max(1, totalSubPages)}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={nextSubPage}
            disabled={
              currentSubPage >= totalSubPages - 1 ||
              substitutes.length <= subsPerPage
            }
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {substitutes
          .slice(
            currentSubPage * subsPerPage,
            (currentSubPage + 1) * subsPerPage,
          )
          .map((player) => (
            <div
              key={player.id}
              className={`flex flex-col items-center p-3 border rounded-md cursor-pointer transition-all ${
                selectedPlayer?.id === player.id
                  ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20"
                  : "hover:border-primary"
              }`}
              onClick={() => handleClickPlayer(player)}
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary/10 font-bold mb-2 relative">
                {player.rating}
                <div
                  className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${getFormColor(
                    player.form,
                  )}`}
                ></div>
              </div>
              <div className="text-sm font-medium text-center truncate max-w-full">
                <span className="truncate max-w-full">{player.name}</span>
              </div>
              <Badge variant="outline" className="mt-1">
                {player.position}
              </Badge>
              <div className="text-xs text-muted-foreground mt-1">
                Form: {player.form}
              </div>

              <div className="flex items-center gap-1 mt-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    viewDetailPlayer(player);
                  }}
                >
                  <Info className="h-3 w-3" />
                </Button>

                {selectedPlayer && selectedPlayer.id !== player.id && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={(e) => {
                      e.stopPropagation();
                      swapSubPlayers(player);
                    }}
                  >
                    <ArrowLeftRight className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MySubstitutes;
