import React from "react";

import {
  ArrowDown,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  Delete,
  Info,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getFormColor } from "@/lib/player";

type Props = {
  availablePlayers: any[];
  prevSubPage: () => void;
  nextSubPage: () => void;
  currentSubPage: number;
  totalSubPages: number;
  subsPerPage: number;
  selectedSubstitute: any | null;
  setSelectedSubstitute: (player: any | null) => void;
  setSwappablePositions: (positions: string[]) => void;
  setSelectedDetailPlayer: (player: any) => void;
  setDetailDialogOpen: (open: boolean) => void;
  handleSubstituteSelect: (player: any) => void;
  tactics: string;
};

const MySubstitutes = ({
  availablePlayers,
  prevSubPage,
  nextSubPage,
  currentSubPage,
  totalSubPages,
  subsPerPage,
  selectedSubstitute,
  setSelectedSubstitute,
  setSwappablePositions,
  setSelectedDetailPlayer,
  setDetailDialogOpen,
  handleSubstituteSelect,
  tactics,
}: Props) => {
  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-medium">
          Substitutes ({availablePlayers.length})
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
              availablePlayers.length <= subsPerPage
            }
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {availablePlayers
          .slice(
            currentSubPage * subsPerPage,
            (currentSubPage + 1) * subsPerPage
          )
          .map((player) => (
            <div
              key={player.id}
              className={`flex flex-col items-center p-3 border rounded-md cursor-pointer transition-all ${
                selectedSubstitute?.id === player.id
                  ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20"
                  : "hover:border-primary"
              }`}
              onClick={() => handleSubstituteSelect(player)}
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary/10 font-bold mb-2 relative">
                {player.rating}
                <div
                  className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${getFormColor(
                    player.form
                  )}`}
                ></div>

                {/* Tactical indicators for substitutes */}
                {tactics === "attacking" && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-white flex items-center justify-center">
                    <ArrowUp className="h-2 w-2 text-green-600" />
                  </div>
                )}
                {tactics === "defensive" && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-white flex items-center justify-center">
                    <ArrowDown className="h-2 w-2 text-amber-600" />
                  </div>
                )}
                {tactics === "counter" && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-white flex items-center justify-center">
                    <div className="flex items-center">
                      <ArrowDown className="h-2 w-2 text-amber-600" />
                      <ArrowUp className="h-2 w-2 -ml-1 text-green-600" />
                    </div>
                  </div>
                )}
              </div>
              <div className="text-sm font-medium">{player.name}</div>
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
                    setSelectedDetailPlayer(player);
                    setDetailDialogOpen(true);
                  }}
                >
                  <Info className="h-3 w-3" />
                </Button>

                {selectedSubstitute?.id === player.id && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSubstitute(null);
                      setSwappablePositions([]);
                    }}
                  >
                    <Delete className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
      </div>

      {selectedSubstitute && (
        <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md">
          <p className="text-sm">
            <span className="font-medium">{selectedSubstitute.name}</span>{" "}
            selected. Click on a highlighted position in the formation to swap
            players.
          </p>
        </div>
      )}
    </div>
  );
};

export default MySubstitutes;
