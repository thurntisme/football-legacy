"use client";

import { useState } from "react";

import {
  ArrowDownRight,
  ArrowLeft,
  ArrowUpRight,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import Link from "next/link";

import PageTitle from "@/components/common/page-title";
import IncomingScoutingRequests from "@/components/incoming-scouting-requests";
import OutgoingScoutingRequests from "@/components/outgoing-scouting-requests";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FOOTBALL_STATS_URL } from "@/constants/site";
import { toast } from "@/hooks/use-toast";
import { IScoutingRequest } from "@/types/football/common";

export default function ScoutingPage() {
  // Mock data for incoming transfer requests
  const [incomingRequests, setIncomingRequests] = useState<IScoutingRequest[]>([
    {
      id: 1,
      teamName: "Manchester City",
      teamLogo: "/placeholder.svg?height=40&width=40",
      playerName: "Chris Johnson",
      playerPosition: "LW",
      offerAmount: 28000000,
      status: "pending",
      expiresIn: "2 days",
    },
    {
      id: 2,
      teamName: "Liverpool FC",
      teamLogo: "/placeholder.svg?height=40&width=40",
      playerName: "Mark Williams",
      playerPosition: "ST",
      offerAmount: 35000000,
      status: "negotiating",
      expiresIn: "1 day",
    },
    {
      id: 3,
      teamName: "Arsenal",
      teamLogo: "/placeholder.svg?height=40&width=40",
      playerName: "Daniel Martinez",
      playerPosition: "CM",
      offerAmount: 22000000,
      status: "rejected",
      expiresIn: "Expired",
    },
  ]);

  // Mock data for outgoing transfer requests
  const [outgoingRequests, setOutgoingRequests] = useState<IScoutingRequest[]>([
    {
      id: 101,
      teamName: "Bayern Munich",
      teamLogo: "/placeholder.svg?height=40&width=40",
      playerName: "Thomas Müller",
      playerPosition: "CAM",
      offerAmount: 40000000,
      status: "pending",
      expiresIn: "3 days",
    },
    {
      id: 102,
      teamName: "Real Madrid",
      teamLogo: "/placeholder.svg?height=40&width=40",
      playerName: "Carlos Vega",
      playerPosition: "RW",
      offerAmount: 32000000,
      status: "negotiating",
      expiresIn: "2 days",
    },
  ]);

  // Function to handle accepting a transfer request
  const handleAcceptRequest = (requestId: number) => {
    // In a real app, this would make an API call
    toast({
      title: "Transfer Accepted",
      description: "You have accepted the transfer request.",
    });

    // Update the request status
    setIncomingRequests((prevRequests) =>
      prevRequests.map((req) =>
        req.id === requestId
          ? { ...req, status: "accepted", expiresIn: "Completed" }
          : req
      )
    );
  };

  // Function to handle rejecting a transfer request
  const handleRejectRequest = (requestId: number) => {
    // In a real app, this would make an API call
    toast({
      title: "Transfer Rejected",
      description: "You have rejected the transfer request.",
    });

    // Update the request status
    setIncomingRequests((prevRequests) =>
      prevRequests.map((req) =>
        req.id === requestId
          ? { ...req, status: "rejected", expiresIn: "Expired" }
          : req
      )
    );
  };

  // Function to get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> Pending
          </Badge>
        );
      case "accepted":
        return (
          <Badge className="bg-green-600 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" /> Accepted
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <XCircle className="h-3 w-3" /> Rejected
          </Badge>
        );
      case "negotiating":
        return (
          <Badge className="bg-amber-500 flex items-center gap-1">
            Negotiating
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <>
      <PageTitle
        title="Scouting Center"
        subTitle="Manage transfer requests and player contracts"
      >
        <Button asChild>
          <Link href={`${FOOTBALL_STATS_URL}/team`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Team
          </Link>
        </Button>
      </PageTitle>

      <Tabs defaultValue="incoming" className="space-y-8">
        <TabsList className="grid grid-cols-2 gap-2">
          <TabsTrigger value="incoming" className="flex items-center">
            <ArrowDownRight className="mr-2 h-4 w-4" />
            Incoming Requests
          </TabsTrigger>
          <TabsTrigger value="outgoing" className="flex items-center">
            <ArrowUpRight className="mr-2 h-4 w-4" />
            Outgoing Requests
          </TabsTrigger>
        </TabsList>

        <TabsContent value="incoming" className="space-y-4">
          <IncomingScoutingRequests
            incomingRequests={incomingRequests}
            handleRejectRequest={handleRejectRequest}
            handleAcceptRequest={handleAcceptRequest}
            getStatusBadge={getStatusBadge}
          />
        </TabsContent>

        <TabsContent value="outgoing" className="space-y-4">
          <OutgoingScoutingRequests
            outgoingRequests={outgoingRequests}
            getStatusBadge={getStatusBadge}
          />
        </TabsContent>
      </Tabs>
    </>
  );
}
