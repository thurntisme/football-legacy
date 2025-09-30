import React from "react";

import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FORMATIONS, formations } from "@/constants/formations";

type Props = {
  currentFormation: string | undefined;
  handleFormationChange: (formation: string) => void;
};

const MyTeamFormationSelector = ({
  currentFormation,
  handleFormationChange,
}: Props) => {
  const formationList = FORMATIONS.map((f) => f.name);

  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="font-medium mb-3">Formation</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              {currentFormation}
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {formationList.map((formation) => (
              <DropdownMenuItem
                key={formation}
                className={currentFormation === formation ? "bg-accent" : ""}
                onClick={() => handleFormationChange(formation)}
              >
                {formation}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  );
};

export default MyTeamFormationSelector;
