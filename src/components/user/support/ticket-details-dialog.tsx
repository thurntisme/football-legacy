import React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getTicketStatusColor, getTicketStatusIcon } from "@/lib/user";
import { SupportTicket } from "@/types/user";

type Props = {
  detailsOpen: boolean;
  setDetailsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTicket: SupportTicket | null;
};

const TicketDetailsDialog = ({
  detailsOpen,
  setDetailsOpen,
  selectedTicket,
}: Props) => {
  return (
    <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
      <DialogContent className="max-w-2xl max-h-96 overflow-y-auto">
        {selectedTicket && (
          <>
            <DialogHeader>
              <div className="flex items-center justify-between">
                <div>
                  <DialogTitle>{selectedTicket.title}</DialogTitle>
                  <DialogDescription>
                    Ticket #{selectedTicket.id}
                  </DialogDescription>
                </div>
                <Badge
                  variant="outline"
                  className={getTicketStatusColor(selectedTicket.status)}
                >
                  {getTicketStatusIcon(selectedTicket.status)}
                  {selectedTicket.status === "in-progress" && "In Progress"}
                  {selectedTicket.status === "resolved" && "Resolved"}
                  {selectedTicket.status === "urgent" && "Urgent"}
                </Badge>
              </div>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Description
                </p>
                <p className="text-sm">{selectedTicket.description}</p>
              </div>

              <div>
                <p className="text-sm font-medium mb-3">Conversation</p>
                <div className="space-y-3 bg-muted/30 p-3 rounded-lg">
                  {selectedTicket.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.isAdmin ? "justify-start" : "justify-end"}`}
                    >
                      <div
                        className={`max-w-xs p-3 rounded-lg ${msg.isAdmin ? "bg-blue-100" : "bg-green-100"}`}
                      >
                        <p className="text-xs font-medium text-gray-700 mb-1">
                          {msg.author}
                        </p>
                        <p className="text-sm">{msg.content}</p>
                        <p className="text-xs text-gray-600 mt-1">
                          {msg.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {selectedTicket.status !== "resolved" && (
                <div className="space-y-2">
                  <Label htmlFor="reply">Reply</Label>
                  <Textarea
                    id="reply"
                    placeholder="Type your response..."
                    rows={3}
                  />
                  <Button className="w-full">Send Reply</Button>
                </div>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TicketDetailsDialog;
