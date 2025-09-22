import React, { useState } from "react";

import { Search } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { NATIONALITIES } from "@/constants/common";
import { POSITIONS } from "@/constants/formations";

type Props = {
  resetFilters: () => void;
  togglePosition: (position: string) => void;
  toggleNationality: (nationality: string) => void;
  filteredPlayers: any[]; // Replace with actual type
  marketPlayers: any[]; // Replace with actual type
};

const TransferMarketFilter = ({
  resetFilters,
  togglePosition,
  toggleNationality,
  filteredPlayers,
  marketPlayers,
}: Props) => {
  const [nameFilter, setNameFilter] = useState("");
  const [ageRange, setAgeRange] = useState<[number, number]>([18, 40]);
  const [heightRange, setHeightRange] = useState<[number, number]>([160, 210]);
  const [weightRange, setWeightRange] = useState<[number, number]>([60, 100]);
  const [ratingRange, setRatingRange] = useState<[number, number]>([70, 100]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50]);
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
  const [selectedNationalities, setSelectedNationalities] = useState<string[]>(
    []
  );

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">Advanced Filters</h3>
        <Button variant="ghost" size="sm" onClick={resetFilters}>
          Reset Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Search</label>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Player name or club..."
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">
              Age Range: {ageRange[0]} - {ageRange[1]}
            </label>
            <Slider
              defaultValue={[18, 40]}
              min={18}
              max={40}
              step={1}
              value={ageRange}
              onValueChange={(value) => setAgeRange(value as [number, number])}
              className="my-4"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">
              Height Range: {heightRange[0]} - {heightRange[1]} cm
            </label>
            <Slider
              defaultValue={[160, 210]}
              min={160}
              max={210}
              step={1}
              value={heightRange}
              onValueChange={(value) =>
                setHeightRange(value as [number, number])
              }
              className="my-4"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">
              Weight Range: {weightRange[0]} - {weightRange[1]} kg
            </label>
            <Slider
              defaultValue={[60, 100]}
              min={60}
              max={100}
              step={1}
              value={weightRange}
              onValueChange={(value) =>
                setWeightRange(value as [number, number])
              }
              className="my-4"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">
              Rating Range: {ratingRange[0]} - {ratingRange[1]}
            </label>
            <Slider
              defaultValue={[70, 100]}
              min={70}
              max={100}
              step={1}
              value={ratingRange}
              onValueChange={(value) =>
                setRatingRange(value as [number, number])
              }
              className="my-4"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">
              Price Range: £{priceRange[0]}M - £{priceRange[1]}M
            </label>
            <Slider
              defaultValue={[0, 50]}
              min={0}
              max={50}
              step={1}
              value={priceRange}
              onValueChange={(value) =>
                setPriceRange(value as [number, number])
              }
              className="my-4"
            />
          </div>
        </div>

        <div className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="positions">
              <AccordionTrigger className="text-sm font-medium">
                Positions{" "}
                {selectedPositions.length > 0 &&
                  `(${selectedPositions.length})`}
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-3 gap-2">
                  {POSITIONS.map((position) => (
                    <div key={position} className="flex items-center space-x-2">
                      <Checkbox
                        id={`position-${position}`}
                        checked={selectedPositions.includes(position)}
                        onCheckedChange={() => togglePosition(position)}
                      />
                      <label
                        htmlFor={`position-${position}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {position}
                      </label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="nationalities">
              <AccordionTrigger className="text-sm font-medium">
                Nationalities{" "}
                {selectedNationalities.length > 0 &&
                  `(${selectedNationalities.length})`}
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                  {NATIONALITIES.map((nationality) => (
                    <div
                      key={nationality}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`nationality-${nationality}`}
                        checked={selectedNationalities.includes(nationality)}
                        onCheckedChange={() => toggleNationality(nationality)}
                      />
                      <label
                        htmlFor={`nationality-${nationality}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {nationality}
                      </label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="pt-2">
            <div className="flex items-center justify-between text-sm">
              <span>Total players: {filteredPlayers.length}</span>
              {filteredPlayers.length !== marketPlayers.length && (
                <span className="text-muted-foreground">
                  Filtered from {marketPlayers.length}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TransferMarketFilter;
