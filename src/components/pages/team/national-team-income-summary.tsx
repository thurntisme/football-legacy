import React from "react";

import { Flag } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Player } from "@/types/player";

type Props = {
  players: Player[];
};

const NationalTeamIncomeSummary = ({ players }: Props) => {
  const playerCalledUp = players.filter((p) => p.nationalTeam?.callUp);
  const totalNationalTeamIncome = playerCalledUp.reduce((sum, p) => {
    return sum + (p.nationalTeam?.paymentReceived || 0);
  }, 0);

  return (
    <Card className="bg-green-50">
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Flag className="h-5 w-5 mr-2 text-green-600" />
            <div>
              <h3 className="font-medium">National Team Income</h3>
              <p className="text-sm text-muted-foreground">
                Payments received for international call-ups
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-green-600">
              £{totalNationalTeamIncome.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">
              {playerCalledUp.length}/{players.length} players called up
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NationalTeamIncomeSummary;
