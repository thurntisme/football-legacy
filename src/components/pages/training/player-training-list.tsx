import React from "react";

import { Trash, User, UserPlus } from "lucide-react";

import ConfirmDialog from "@/components/common/confirm-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { focusOptions } from "@/constants/training";
import { getAttributeColor } from "@/lib/player";
import { IPlayerTraining } from "@/types/training";

type Props = {
  playersList: IPlayerTraining[];
  selectPlayer: (player: IPlayerTraining) => void;
  openSpecificTraining: (player: IPlayerTraining) => void;
};

const PlayerTrainingList = ({
  playersList,
  selectPlayer,
  openSpecificTraining,
}: Props) => {
  const getDevelopmentColor = (value: number) => {
    if (value >= 80) return "bg-green-600";
    if (value >= 65) return "bg-blue-600";
    if (value >= 50) return "bg-yellow-600";
    return "bg-red-600";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {playersList.map((player) => (
        <Card key={player.id} className="overflow-hidden">
          <CardHeader className="p-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10 rounded-full overflow-hidden">
                  <AvatarImage src={player.image} alt={player.name} />
                  <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{player.name}</CardTitle>
                  <CardDescription>
                    {player.position} • {player.age} yrs
                  </CardDescription>
                </div>
              </div>
              <Badge>
                {focusOptions.find((f) => f.id === player.focus)?.name}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="px-3 pb-2">
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
              {focusOptions.map((option) => {
                const attrValue =
                  player.attributes[
                    option.id as keyof typeof player.attributes
                  ];
                return (
                  <div className="flex justify-between" key={option.id}>
                    <span className="text-sm">{option.name}</span>
                    <Badge
                      className={`text-xs font-medium ${getAttributeColor(attrValue)}`}
                    >
                      {attrValue}
                    </Badge>
                  </div>
                );
              })}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Development Progress</span>
                <span>{player.development}%</span>
              </div>
              <Progress
                value={player.development}
                className="h-2"
                indicatorBg={getDevelopmentColor(player.development)}
              />

              <div className="flex justify-between text-sm mt-2">
                <span>Training Intensity</span>
                <span>{player.trainingIntensity}%</span>
              </div>
              <Progress
                value={player.trainingIntensity}
                className="h-2"
                indicatorBg="bg-blue-600"
              />
            </div>

            <div className="flex gap-2 mt-4">
              <ConfirmDialog
                title="Delete Training"
                description="Are you sure you want to delete this training?"
              >
                <Button variant="outline" className="flex-1">
                  <Trash className="h-4 w-4" />
                  Delete
                </Button>
              </ConfirmDialog>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => selectPlayer(player)}
              >
                <User className="h-4 w-4" />
                Edit
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => openSpecificTraining(player)}
              >
                <UserPlus className="h-4 w-4" />
                Specific
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PlayerTrainingList;
