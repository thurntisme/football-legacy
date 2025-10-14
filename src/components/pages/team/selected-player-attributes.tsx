import React from "react";

import { PlusIcon } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { playerAttributes } from "@/constants/player";
import { Player } from "@/types/player";

type Props = {
  selectedPlayer: Player | null;
};

const SelectedPlayerAttributes = ({ selectedPlayer }: Props) => {
  if (!selectedPlayer) return null;

  return (
    <Card>
      <CardContent className="px-4 py-1">
        <Accordion type="single" collapsible className="w-full">
          {playerAttributes.map(({ key, title, attributes, maxValue }) => (
            <AccordionItem
              value={key}
              key={key}
              className="player-attr-progress"
            >
              <AccordionTrigger
                className="text-sm font-medium flex flex-col space-y-2 hover:no-underline"
                isShowArrow={false}
              >
                <div className="flex justify-between items-center w-full space-x-2">
                  <span className="text-sm font-medium">{title}</span>
                  {selectedPlayer?.attributeBonus &&
                  selectedPlayer?.attributeBonus > 0 ? (
                    <Badge
                      variant="outline"
                      className="w-4 h-4 p-0.5 flex justify-center items-center !ml-auto rounded-sm"
                    >
                      <PlusIcon className="!w-3 !h-3" />
                    </Badge>
                  ) : null}
                  <span className="text-xs text-muted-foreground flex space-x-1 items-center">
                    <span>123</span>
                    <span>/</span>
                    <span className="text-blue-500">{maxValue}</span>
                  </span>
                </div>
                <Progress
                  value={65}
                  className="h-4 rounded-none bg-gray-200 p-0.5 progress"
                  indicatorBg="bg-white"
                />
              </AccordionTrigger>
              <AccordionContent>
                <div className="p-3 border border-gray-200 rounded-md space-y-2">
                  {attributes.map(({ key, label }) => (
                    <div className="flex flex-col space-y-1" key={key}>
                      <div className="flex justify-between items-center w-full space-x-2">
                        <span className="text-xs font-medium">{label}</span>
                        {selectedPlayer?.attributeBonus &&
                        selectedPlayer?.attributeBonus > 0 ? (
                          <Button
                            variant="outline"
                            className="w-4 h-4 p-0.5 flex justify-center items-center !ml-auto"
                          >
                            <PlusIcon className="!w-3 !h-3" />
                          </Button>
                        ) : null}
                        <span className="text-xs text-muted-foreground flex space-x-1 items-center">
                          <span>
                            {selectedPlayer?.attributes[
                              key as keyof typeof selectedPlayer.attributes
                            ] || 0}
                          </span>
                          <span>/</span>
                          <span className="text-blue-500">{110}</span>
                        </span>
                      </div>
                      <Progress
                        value={
                          selectedPlayer?.attributes[
                            key as keyof typeof selectedPlayer.attributes
                          ] || 0
                        }
                        className="h-2 rounded-none bg-gray-200 p-0.5 progress"
                        indicatorBg="bg-white"
                      />
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default SelectedPlayerAttributes;
