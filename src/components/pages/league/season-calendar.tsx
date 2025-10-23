import React from "react";

import { Calendar } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ICalendarEvent } from "@/types/common";

type Props = {
  eventFilters: {
    match: boolean;
    contract: boolean;
    transfer: boolean;
    loan: boolean;
    other: boolean;
  };
  toggleEventFilter: (filter: keyof Props["eventFilters"]) => void;
  groupedEvents: Record<string, ICalendarEvent[]>;
  setEventFilters: (filters: Props["eventFilters"]) => void;
};

const SeasonCalendar = ({
  eventFilters,
  toggleEventFilter,
  groupedEvents,
  setEventFilters,
}: Props) => {
  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div className="space-y-1">
          <CardTitle>Season Calendar</CardTitle>
          <CardDescription>
            Full season schedule and important events
          </CardDescription>
        </div>
        <div className="mt-4 sm:mt-0">
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center">
              <Checkbox
                id="filter-match"
                checked={eventFilters.match}
                onCheckedChange={() => toggleEventFilter("match")}
                className="mr-2 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
              />
              <label htmlFor="filter-match" className="text-sm cursor-pointer">
                Matches
              </label>
            </div>
            <div className="flex items-center">
              <Checkbox
                id="filter-contract"
                checked={eventFilters.contract}
                onCheckedChange={() => toggleEventFilter("contract")}
                className="mr-2 data-[state=checked]:bg-amber-500"
              />
              <label
                htmlFor="filter-contract"
                className="text-sm cursor-pointer"
              >
                Contracts
              </label>
            </div>
            <div className="flex items-center">
              <Checkbox
                id="filter-transfer"
                checked={eventFilters.transfer}
                onCheckedChange={() => toggleEventFilter("transfer")}
                className="mr-2 data-[state=checked]:bg-green-500"
              />
              <label
                htmlFor="filter-transfer"
                className="text-sm cursor-pointer"
              >
                Transfers
              </label>
            </div>
            <div className="flex items-center">
              <Checkbox
                id="filter-loan"
                checked={eventFilters.loan}
                onCheckedChange={() => toggleEventFilter("loan")}
                className="mr-2 data-[state=checked]:bg-blue-500"
              />
              <label htmlFor="filter-loan" className="text-sm cursor-pointer">
                Loans
              </label>
            </div>
            <div className="flex items-center">
              <Checkbox
                id="filter-other"
                checked={eventFilters.other}
                onCheckedChange={() => toggleEventFilter("other")}
                className="mr-2 data-[state=checked]:bg-purple-500"
              />
              <label htmlFor="filter-other" className="text-sm cursor-pointer">
                Other
              </label>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Object.entries(groupedEvents).map(([month, events]) => (
            <div key={month}>
              <h3 className="text-lg font-medium mb-3">{month} 2025</h3>
              <div className="space-y-2">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="flex justify-between items-center p-3 border rounded-md"
                  >
                    <div className="flex items-center">
                      <div className="w-10 text-center font-bold">
                        {event.date.split(" ")[1].replace(",", "")}
                      </div>
                      <div className="ml-4 flex items-start">
                        <div className="mr-2 mt-1">{event.icon}</div>
                        <div>
                          <div className="font-medium">{event.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {event.description}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {event.badge && (
                        <Badge
                          variant={event.badgeVariant || "default"}
                          className="mr-2"
                        >
                          {event.badge}
                        </Badge>
                      )}
                      {event.type === "match" && (
                        <Button variant="outline" size="sm">
                          Details
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {Object.keys(groupedEvents).length === 0 && (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <h3 className="text-lg font-medium mb-1">No Events Found</h3>
              <p className="text-muted-foreground mb-4">
                No events match your current filter settings.
              </p>
              <Button
                onClick={() =>
                  setEventFilters({
                    match: true,
                    contract: true,
                    transfer: true,
                    loan: true,
                    other: true,
                  })
                }
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SeasonCalendar;
