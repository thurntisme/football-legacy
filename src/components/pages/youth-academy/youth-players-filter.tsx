import React, { useState } from "react";

import { Calendar, Filter, Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  setGeneratePlayerDialogOpen: (open: boolean) => void;
};

const YouthPlayersFilter = ({ setGeneratePlayerDialogOpen }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [positionFilter, setPositionFilter] = useState("All");

  return (
    <div className="flex flex-col md:flex-row justify-between gap-4">
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-2">
          <Select value={positionFilter} onValueChange={setPositionFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Position" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Positions</SelectItem>
              <SelectItem value="GK">Goalkeeper</SelectItem>
              <SelectItem value="CB">Center Back</SelectItem>
              <SelectItem value="LB">Left Back</SelectItem>
              <SelectItem value="RB">Right Back</SelectItem>
              <SelectItem value="CM">Center Mid</SelectItem>
              <SelectItem value="CDM">Def. Mid</SelectItem>
              <SelectItem value="CAM">Att. Mid</SelectItem>
              <SelectItem value="LW">Left Wing</SelectItem>
              <SelectItem value="RW">Right Wing</SelectItem>
              <SelectItem value="ST">Striker</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setGeneratePlayerDialogOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Generate Youth Player
        </Button>
        <Button variant="outline" size="sm">
          <Calendar className="h-4 w-4 mr-2" />
          Youth Intake
        </Button>
      </div>
    </div>
  );
};

export default YouthPlayersFilter;
