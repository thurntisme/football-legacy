"use client";

import React, { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PaginationDynamic } from "@/components/ui/pagination";
import { getTicketStatusColor, getTicketStatusIcon } from "@/lib/user";
import { allTickets } from "@/mock/support-tickets";
import { SupportTicket } from "@/types/user";

import TicketDetailsDialog from "./ticket-details-dialog";

type Props = {};
const ITEMS_PER_PAGE = 5;

const SupportTickets = (props: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(
    null,
  );
  const [detailsOpen, setDetailsOpen] = useState(false);

  const totalPages = Math.ceil(allTickets.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTickets = allTickets.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const openTicketDetails = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setDetailsOpen(true);
  };

  const onPageChange = (page: number) => {
    console.log("Page changed to: ", page);
    setCurrentPage(page);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>My Support Tickets</CardTitle>
          <CardDescription>
            View and manage your support requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-lg overflow-hidden">
              <div className="divide-y">
                {paginatedTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => openTicketDetails(ticket)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h3 className="font-medium">{ticket.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {ticket.description}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={getTicketStatusColor(ticket.status)}
                      >
                        {getTicketStatusIcon(ticket.status)}
                        {ticket.status === "in-progress" && "In Progress"}
                        {ticket.status === "resolved" && "Resolved"}
                        {ticket.status === "urgent" && "Urgent"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>
                        Ticket #{ticket.id} • Opened {ticket.openedDate}
                      </span>
                      <Button variant="ghost" size="sm" className="h-7">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <PaginationDynamic
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        </CardFooter>
      </Card>
      <TicketDetailsDialog
        detailsOpen={detailsOpen}
        setDetailsOpen={setDetailsOpen}
        selectedTicket={selectedTicket}
      />
    </>
  );
};

export default SupportTickets;
