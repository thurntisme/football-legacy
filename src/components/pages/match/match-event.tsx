import React from "react";

import { Badge } from "@/components/ui/badge";

type Props = {};

const MatchEvent = (props: Props) => {
  const [matchEvents, setMatchEvents] = useState<MatchProcessEvent[]>([]);
  return (
    <div className="border rounded-md">
      <div className="p-3 border-b bg-muted/50">
        <h3 className="font-medium">Match Events</h3>
      </div>
      <div className="p-3 max-h-[480px] overflow-auto">
        {matchEvents.length > 0 ? (
          <div className="space-y-2">
            {matchEvents.map((event, index) => (
              <div key={index} className="flex items-start">
                <Badge
                  variant="outline"
                  className="mr-2 mt-0.5 min-w-[32px] text-center"
                >
                  {event.minute}'
                </Badge>
                <div
                  className={`flex-1 ${event.type === "goal" ? "font-bold" : ""}`}
                >
                  {event.text}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            No events yet. The match is just getting started.
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchEvent;
