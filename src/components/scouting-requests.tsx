'use client';

import { useState } from 'react';

import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Eye,
  FileText,
  Loader2,
  Star,
  TrendingUp,
  UserMinus,
  UserPlus,
  Users,
  XCircle,
} from 'lucide-react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';

// Types
type ScoutingRequest = {
  id: number;
  teamId: number;
  teamName: string;
  teamLogo: string;
  playerId: number;
  playerName: string;
  playerPosition: string;
  playerAge: number;
  playerRating: number;
  offerAmount: number;
  offerSalary: number;
  offerYears: number;
  status: 'pending' | 'accepted' | 'rejected' | 'negotiating';
  expiresIn: string;
  message?: string;
  counterOffer?: {
    amount: number;
    salary: number;
    years: number;
  };
};

type PlayerInTeam = {
  id: number;
  name: string;
  position: string;
  age: number;
  nationality: string;
  rating: number;
  value: number;
  salary: number;
  contractYears: number;
  status: 'active' | 'injured' | 'suspended';
  inStartingLineup: boolean;
};

type PlayerInClub = {
  id: number;
  name: string;
  position: string;
  age: number;
  nationality: string;
  rating: number;
  potential: number;
  readiness: number;
  salary: number;
  status: 'training' | 'youth' | 'reserve';
};

export default function ScoutingRequests() {
  // State for scouting requests
  const [incomingRequests, setIncomingRequests] = useState<ScoutingRequest[]>([
    {
      id: 1,
      teamId: 101,
      teamName: 'Manchester City',
      teamLogo: '/placeholder.svg?height=40&width=40',
      playerId: 9,
      playerName: 'Chris Johnson',
      playerPosition: 'LW',
      playerAge: 23,
      playerRating: 85,
      offerAmount: 28000000,
      offerSalary: 65000,
      offerYears: 4,
      status: 'pending',
      expiresIn: '2 days',
    },
    {
      id: 2,
      teamId: 102,
      teamName: 'Liverpool FC',
      teamLogo: '/placeholder.svg?height=40&width=40',
      playerId: 10,
      playerName: 'Mark Williams',
      playerPosition: 'ST',
      playerAge: 29,
      playerRating: 86,
      offerAmount: 35000000,
      offerSalary: 80000,
      offerYears: 3,
      status: 'negotiating',
      expiresIn: '1 day',
      counterOffer: {
        amount: 42000000,
        salary: 85000,
        years: 4,
      },
    },
    {
      id: 3,
      teamId: 103,
      teamName: 'Arsenal',
      teamLogo: '/placeholder.svg?height=40&width=40',
      playerId: 6,
      playerName: 'Daniel Martinez',
      playerPosition: 'CM',
      playerAge: 26,
      playerRating: 83,
      offerAmount: 22000000,
      offerSalary: 55000,
      offerYears: 4,
      status: 'rejected',
      expiresIn: 'Expired',
      message: 'Offer too low for player of this quality',
    },
    {
      id: 4,
      teamId: 104,
      teamName: 'Chelsea',
      teamLogo: '/placeholder.svg?height=40&width=40',
      playerId: 2,
      playerName: 'James Wilson',
      playerPosition: 'LB',
      playerAge: 24,
      playerRating: 78,
      offerAmount: 15000000,
      offerSalary: 45000,
      offerYears: 5,
      status: 'accepted',
      expiresIn: 'Completed',
    },
  ]);

  const [outgoingRequests, setOutgoingRequests] = useState<ScoutingRequest[]>([
    {
      id: 101,
      teamId: 201,
      teamName: 'Bayern Munich',
      teamLogo: '/placeholder.svg?height=40&width=40',
      playerId: 1001,
      playerName: 'Thomas Müller',
      playerPosition: 'CAM',
      playerAge: 25,
      playerRating: 87,
      offerAmount: 40000000,
      offerSalary: 90000,
      offerYears: 4,
      status: 'pending',
      expiresIn: '3 days',
    },
    {
      id: 102,
      teamId: 202,
      teamName: 'Real Madrid',
      teamLogo: '/placeholder.svg?height=40&width=40',
      playerId: 1002,
      playerName: 'Carlos Vega',
      playerPosition: 'RW',
      playerAge: 22,
      playerRating: 84,
      offerAmount: 32000000,
      offerSalary: 70000,
      offerYears: 5,
      status: 'negotiating',
      expiresIn: '2 days',
      counterOffer: {
        amount: 38000000,
        salary: 75000,
        years: 4,
      },
    },
    {
      id: 103,
      teamId: 203,
      teamName: 'PSG',
      teamLogo: '/placeholder.svg?height=40&width=40',
      playerId: 1003,
      playerName: 'Jean Dupont',
      playerPosition: 'CB',
      playerAge: 27,
      playerRating: 85,
      offerAmount: 30000000,
      offerSalary: 65000,
      offerYears: 3,
      status: 'rejected',
      expiresIn: 'Expired',
      message: 'Player not for sale at this time',
    },
  ]);

  // State for players in team and club
  const [playersInTeam, setPlayersInTeam] = useState<PlayerInTeam[]>([
    {
      id: 1,
      name: 'David Miller',
      position: 'GK',
      age: 28,
      nationality: 'England',
      rating: 82,
      value: 12000000,
      salary: 45000,
      contractYears: 3,
      status: 'active',
      inStartingLineup: true,
    },
    {
      id: 2,
      name: 'James Wilson',
      position: 'LB',
      age: 24,
      nationality: 'Wales',
      rating: 78,
      value: 8500000,
      salary: 35000,
      contractYears: 4,
      status: 'active',
      inStartingLineup: true,
    },
    {
      id: 3,
      name: 'Robert Garcia',
      position: 'CB',
      age: 29,
      nationality: 'Spain',
      rating: 81,
      value: 15000000,
      salary: 40000,
      contractYears: 2,
      status: 'active',
      inStartingLineup: true,
    },
    {
      id: 4,
      name: 'Michael Brown',
      position: 'CB',
      age: 27,
      nationality: 'England',
      rating: 80,
      value: 14000000,
      salary: 38000,
      contractYears: 3,
      status: 'active',
      inStartingLineup: true,
    },
    {
      id: 5,
      name: 'Thomas Lee',
      position: 'RB',
      age: 25,
      nationality: 'South Korea',
      rating: 79,
      value: 9000000,
      salary: 36000,
      contractYears: 4,
      status: 'active',
      inStartingLineup: true,
    },
    {
      id: 6,
      name: 'Daniel Martinez',
      position: 'CM',
      age: 26,
      nationality: 'Argentina',
      rating: 83,
      value: 18000000,
      salary: 42000,
      contractYears: 3,
      status: 'active',
      inStartingLineup: true,
    },
    {
      id: 7,
      name: 'Steven Taylor',
      position: 'CDM',
      age: 30,
      nationality: 'England',
      rating: 84,
      value: 20000000,
      salary: 48000,
      contractYears: 2,
      status: 'active',
      inStartingLineup: true,
    },
    {
      id: 8,
      name: 'Kevin Anderson',
      position: 'CM',
      age: 27,
      nationality: 'Denmark',
      rating: 82,
      value: 17000000,
      salary: 40000,
      contractYears: 3,
      status: 'active',
      inStartingLineup: true,
    },
    {
      id: 9,
      name: 'Chris Johnson',
      position: 'LW',
      age: 23,
      nationality: 'USA',
      rating: 85,
      value: 25000000,
      salary: 52000,
      contractYears: 5,
      status: 'active',
      inStartingLineup: true,
    },
    {
      id: 10,
      name: 'Mark Williams',
      position: 'ST',
      age: 29,
      nationality: 'England',
      rating: 86,
      value: 32000000,
      salary: 65000,
      contractYears: 3,
      status: 'active',
      inStartingLineup: true,
    },
    {
      id: 11,
      name: 'Paul Davis',
      position: 'RW',
      age: 24,
      nationality: 'France',
      rating: 84,
      value: 24000000,
      salary: 50000,
      contractYears: 4,
      status: 'active',
      inStartingLineup: true,
    },
    {
      id: 12,
      name: 'John Smith',
      position: 'ST',
      age: 26,
      nationality: 'England',
      rating: 81,
      value: 18000000,
      salary: 45000,
      contractYears: 2,
      status: 'injured',
      inStartingLineup: false,
    },
  ]);

  const [playersInClub, setPlayersInClub] = useState<PlayerInClub[]>([
    {
      id: 101,
      name: 'Alex Turner',
      position: 'CB',
      age: 21,
      nationality: 'England',
      rating: 75,
      potential: 85,
      readiness: 70,
      salary: 25000,
      status: 'reserve',
    },
    {
      id: 102,
      name: 'Sam Wilson',
      position: 'GK',
      age: 33,
      nationality: 'Italy',
      rating: 78,
      potential: 80,
      readiness: 90,
      salary: 35000,
      status: 'reserve',
    },
    {
      id: 103,
      name: 'Eric Thompson',
      position: 'LW',
      age: 20,
      nationality: 'Brazil',
      rating: 76,
      potential: 88,
      readiness: 65,
      salary: 28000,
      status: 'training',
    },
    {
      id: 104,
      name: 'Ryan Cooper',
      position: 'RB',
      age: 19,
      nationality: 'England',
      rating: 72,
      potential: 84,
      readiness: 60,
      salary: 20000,
      status: 'youth',
    },
    {
      id: 105,
      name: 'Luke Harris',
      position: 'CDM',
      age: 24,
      nationality: 'Wales',
      rating: 74,
      potential: 79,
      readiness: 85,
      salary: 22000,
      status: 'reserve',
    },
    {
      id: 106,
      name: 'Mike Johnson',
      position: 'CM',
      age: 22,
      nationality: 'Scotland',
      rating: 77,
      potential: 83,
      readiness: 75,
      salary: 30000,
      status: 'training',
    },
    {
      id: 107,
      name: 'Alex Ferguson',
      position: 'CAM',
      age: 18,
      nationality: 'Scotland',
      rating: 70,
      potential: 90,
      readiness: 50,
      salary: 15000,
      status: 'youth',
    },
  ]);

  // State for dialogs
  const [selectedRequest, setSelectedRequest] =
    useState<ScoutingRequest | null>(null);
  const [viewRequestDetails, setViewRequestDetails] = useState(false);
  const [showCounterOfferDialog, setShowCounterOfferDialog] = useState(false);
  const [counterOfferAmount, setCounterOfferAmount] = useState(0);
  const [counterOfferSalary, setCounterOfferSalary] = useState(0);
  const [counterOfferYears, setCounterOfferYears] = useState(0);
  const [isProcessingAction, setIsProcessingAction] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<
    PlayerInTeam | PlayerInClub | null
  >(null);
  const [showPlayerDetails, setShowPlayerDetails] = useState(false);
  const [showReleaseConfirmation, setShowReleaseConfirmation] = useState(false);
  const [showPromoteConfirmation, setShowPromoteConfirmation] = useState(false);

  // Handle viewing request details
  const handleViewRequest = (request: ScoutingRequest) => {
    setSelectedRequest(request);
    setViewRequestDetails(true);
  };

  // Handle accepting a request
  const handleAcceptRequest = (request: ScoutingRequest) => {
    setIsProcessingAction(true);

    // Simulate processing time
    setTimeout(() => {
      setIncomingRequests((prevRequests) =>
        prevRequests.map((r) =>
          r.id === request.id
            ? { ...r, status: 'accepted', expiresIn: 'Completed' }
            : r
        )
      );

      // Remove player from team
      setPlayersInTeam((prevPlayers) =>
        prevPlayers.filter((p) => p.id !== request.playerId)
      );

      setIsProcessingAction(false);
      setViewRequestDetails(false);

      toast({
        title: 'Transfer Accepted',
        description: `${request.playerName} has been transferred to ${request.teamName} for £${(request.offerAmount / 1000000).toFixed(1)}M.`,
      });
    }, 1500);
  };

  // Handle rejecting a request
  const handleRejectRequest = (request: ScoutingRequest) => {
    setIsProcessingAction(true);

    // Simulate processing time
    setTimeout(() => {
      setIncomingRequests((prevRequests) =>
        prevRequests.map((r) =>
          r.id === request.id
            ? {
                ...r,
                status: 'rejected',
                expiresIn: 'Expired',
                message: 'Offer rejected by club',
              }
            : r
        )
      );

      setIsProcessingAction(false);
      setViewRequestDetails(false);

      toast({
        title: 'Transfer Rejected',
        description: `You have rejected ${request.teamName}'s offer for ${request.playerName}.`,
      });
    }, 1500);
  };

  // Handle counter offer
  const handleCounterOffer = (request: ScoutingRequest) => {
    setCounterOfferAmount(request.offerAmount * 1.2);
    setCounterOfferSalary(request.offerSalary * 1.1);
    setCounterOfferYears(request.offerYears);
    setSelectedRequest(request);
    setShowCounterOfferDialog(true);
  };

  // Submit counter offer
  const submitCounterOffer = () => {
    if (!selectedRequest) return;

    setIsProcessingAction(true);

    // Simulate processing time
    setTimeout(() => {
      setIncomingRequests((prevRequests) =>
        prevRequests.map((r) =>
          r.id === selectedRequest.id
            ? {
                ...r,
                status: 'negotiating',
                counterOffer: {
                  amount: counterOfferAmount,
                  salary: counterOfferSalary,
                  years: counterOfferYears,
                },
              }
            : r
        )
      );

      setIsProcessingAction(false);
      setShowCounterOfferDialog(false);
      setViewRequestDetails(false);

      toast({
        title: 'Counter Offer Sent',
        description: `You have sent a counter offer of £${(counterOfferAmount / 1000000).toFixed(1)}M for ${selectedRequest.playerName}.`,
      });
    }, 1500);
  };

  // Handle viewing player details
  const handleViewPlayer = (player: PlayerInTeam | PlayerInClub) => {
    setSelectedPlayer(player);
    setShowPlayerDetails(true);
  };

  // Handle releasing a player
  const handleReleasePlayer = (player: PlayerInTeam) => {
    setSelectedPlayer(player);
    setShowReleaseConfirmation(true);
  };

  // Confirm player release
  const confirmReleasePlayer = () => {
    if (!selectedPlayer) return;

    setPlayersInTeam((prevPlayers) =>
      prevPlayers.filter((p) => p.id !== selectedPlayer.id)
    );

    setShowReleaseConfirmation(false);
    setShowPlayerDetails(false);

    toast({
      title: 'Player Released',
      description: `${selectedPlayer.name} has been released from your team.`,
      variant: 'destructive',
    });
  };

  // Handle promoting a player to the team
  const handlePromotePlayer = (player: PlayerInClub) => {
    setSelectedPlayer(player);
    setShowPromoteConfirmation(true);
  };

  // Confirm player promotion
  const confirmPromotePlayer = () => {
    if (!selectedPlayer) return;
    const clubPlayer = selectedPlayer as PlayerInClub;

    // Add to team
    setPlayersInTeam((prevPlayers) => [
      ...prevPlayers,
      {
        id: clubPlayer.id,
        name: clubPlayer.name,
        position: clubPlayer.position,
        age: clubPlayer.age,
        nationality: clubPlayer.nationality,
        rating: clubPlayer.rating,
        value: clubPlayer.rating * 200000, // Approximate value based on rating
        salary: clubPlayer.salary,
        contractYears: 3, // Default contract length
        status: 'active',
        inStartingLineup: false,
      },
    ]);

    // Remove from club
    setPlayersInClub((prevPlayers) =>
      prevPlayers.filter((p) => p.id !== clubPlayer.id)
    );

    setShowPromoteConfirmation(false);
    setShowPlayerDetails(false);

    toast({
      title: 'Player Promoted',
      description: `${clubPlayer.name} has been promoted to your team.`,
    });
  };

  // Get status badge for requests
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> Pending
          </Badge>
        );
      case 'accepted':
        return (
          <Badge className="bg-green-600 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" /> Accepted
          </Badge>
        );
      case 'rejected':
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <XCircle className="h-3 w-3" /> Rejected
          </Badge>
        );
      case 'negotiating':
        return (
          <Badge className="bg-amber-500 flex items-center gap-1">
            <TrendingUp className="h-3 w-3" /> Negotiating
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Get status badge for players
  const getPlayerStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-600">Active</Badge>;
      case 'injured':
        return <Badge variant="destructive">Injured</Badge>;
      case 'suspended':
        return <Badge variant="destructive">Suspended</Badge>;
      case 'training':
        return <Badge className="bg-blue-500">Training</Badge>;
      case 'youth':
        return <Badge className="bg-amber-500">Youth</Badge>;
      case 'reserve':
        return <Badge variant="outline">Reserve</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Tabs defaultValue="incoming" className="space-y-4">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="incoming" className="flex items-center gap-1">
          <ArrowDownRight className="h-4 w-4" />
          Incoming Requests
        </TabsTrigger>
        <TabsTrigger value="outgoing" className="flex items-center gap-1">
          <ArrowUpRight className="h-4 w-4" />
          Outgoing Requests
        </TabsTrigger>
        <TabsTrigger value="team" className="flex items-center gap-1">
          <Users className="h-4 w-4" />
          Players in Team
        </TabsTrigger>
        <TabsTrigger value="club" className="flex items-center gap-1">
          <UserPlus className="h-4 w-4" />
          Players in Club
        </TabsTrigger>
      </TabsList>

      <TabsContent value="incoming" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Incoming Transfer Requests</CardTitle>
            <CardDescription>
              Other teams interested in signing your players
            </CardDescription>
          </CardHeader>
          <CardContent>
            {incomingRequests.length > 0 ? (
              <div className="space-y-4">
                {incomingRequests.map((request) => (
                  <div
                    key={request.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage
                          src={request.teamLogo}
                          alt={request.teamName}
                        />
                        <AvatarFallback>
                          {request.teamName.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{request.teamName}</div>
                        <div className="text-sm text-muted-foreground">
                          Wants to sign{' '}
                          <span className="font-medium">
                            {request.playerName}
                          </span>{' '}
                          ({request.playerPosition})
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          {getStatusBadge(request.status)}
                          {request.status === 'pending' && (
                            <span className="text-xs text-muted-foreground">
                              Expires in {request.expiresIn}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="font-bold text-lg">
                        £{(request.offerAmount / 1000000).toFixed(1)}M
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewRequest(request)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No incoming transfer requests at this time.
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="outgoing" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Outgoing Transfer Requests</CardTitle>
            <CardDescription>
              Your requests to sign players from other teams
            </CardDescription>
          </CardHeader>
          <CardContent>
            {outgoingRequests.length > 0 ? (
              <div className="space-y-4">
                {outgoingRequests.map((request) => (
                  <div
                    key={request.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage
                          src={request.teamLogo}
                          alt={request.teamName}
                        />
                        <AvatarFallback>
                          {request.teamName.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{request.teamName}</div>
                        <div className="text-sm text-muted-foreground">
                          Your offer for{' '}
                          <span className="font-medium">
                            {request.playerName}
                          </span>{' '}
                          ({request.playerPosition})
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          {getStatusBadge(request.status)}
                          {request.status === 'pending' && (
                            <span className="text-xs text-muted-foreground">
                              Expires in {request.expiresIn}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="font-bold text-lg">
                        £{(request.offerAmount / 1000000).toFixed(1)}M
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewRequest(request)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No outgoing transfer requests at this time.
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="team" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Players in Team</CardTitle>
            <CardDescription>
              Players who are part of your active squad
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {playersInTeam.map((player) => (
                <div
                  key={player.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold">
                      {player.rating}
                    </div>
                    <div>
                      <div className="font-medium">{player.name}</div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{player.position}</Badge>
                        <span className="text-sm text-muted-foreground">
                          {player.age} yrs • {player.nationality}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        {getPlayerStatusBadge(player.status)}
                        {player.inStartingLineup && (
                          <Badge variant="secondary">Starting XI</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="font-bold">
                      £{(player.value / 1000000).toFixed(1)}M
                    </div>
                    <div className="text-sm text-muted-foreground">
                      £{player.salary.toLocaleString()}/week
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewPlayer(player)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleReleasePlayer(player)}
                      >
                        <UserMinus className="h-4 w-4 mr-1" />
                        Release
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="club" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Players in Club</CardTitle>
            <CardDescription>
              Players who haven't joined the team yet
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {playersInClub.map((player) => (
                <div
                  key={player.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold">
                      {player.rating}
                    </div>
                    <div>
                      <div className="font-medium">{player.name}</div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{player.position}</Badge>
                        <span className="text-sm text-muted-foreground">
                          {player.age} yrs • {player.nationality}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        {getPlayerStatusBadge(player.status)}
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                          <span className="text-xs ml-1">
                            Potential: {player.potential}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="font-bold">
                      Readiness: {player.readiness}%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      £{player.salary.toLocaleString()}/week
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewPlayer(player)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handlePromotePlayer(player)}
                      >
                        <UserPlus className="h-4 w-4 mr-1" />
                        Promote
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* View Request Details Dialog */}
      <Dialog open={viewRequestDetails} onOpenChange={setViewRequestDetails}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Transfer Request Details</DialogTitle>
            <DialogDescription>
              {selectedRequest?.teamName}'s offer for{' '}
              {selectedRequest?.playerName}
            </DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="space-y-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={selectedRequest.teamLogo}
                      alt={selectedRequest.teamName}
                    />
                    <AvatarFallback>
                      {selectedRequest.teamName.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-bold">
                      {selectedRequest.teamName}
                    </h3>
                    <p className="text-muted-foreground">Transfer Offer</p>
                  </div>
                </div>
                <div>{getStatusBadge(selectedRequest.status)}</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 border rounded-md">
                    <h4 className="font-medium mb-2">Player Details</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Name:</span>
                        <span className="font-medium">
                          {selectedRequest.playerName}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Position:</span>
                        <span className="font-medium">
                          {selectedRequest.playerPosition}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Age:</span>
                        <span className="font-medium">
                          {selectedRequest.playerAge} years
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rating:</span>
                        <span className="font-medium">
                          {selectedRequest.playerRating}
                        </span>
                      </div>
                    </div>
                  </div>

                  {selectedRequest.message && (
                    <div className="p-4 border rounded-md bg-muted/50">
                      <h4 className="font-medium mb-2">Message</h4>
                      <p className="text-sm">{selectedRequest.message}</p>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="p-4 border rounded-md">
                    <h4 className="font-medium mb-2">Offer Details</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1 text-green-600" />
                          <span>Transfer Fee:</span>
                        </div>
                        <span className="font-bold">
                          £{(selectedRequest.offerAmount / 1000000).toFixed(1)}M
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1 text-green-600" />
                          <span>Weekly Salary:</span>
                        </div>
                        <span className="font-medium">
                          £{selectedRequest.offerSalary.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>Contract Length:</span>
                        </div>
                        <span className="font-medium">
                          {selectedRequest.offerYears} years
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>Expires In:</span>
                        </div>
                        <span className="font-medium">
                          {selectedRequest.expiresIn}
                        </span>
                      </div>
                    </div>
                  </div>

                  {selectedRequest.counterOffer && (
                    <div className="p-4 border rounded-md border-amber-200 bg-amber-50">
                      <h4 className="font-medium mb-2 text-amber-800">
                        Counter Offer
                      </h4>
                      <div className="space-y-2 text-amber-800">
                        <div className="flex justify-between">
                          <span>Transfer Fee:</span>
                          <span className="font-bold">
                            £
                            {(
                              selectedRequest.counterOffer.amount / 1000000
                            ).toFixed(1)}
                            M
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Weekly Salary:</span>
                          <span className="font-medium">
                            £
                            {selectedRequest.counterOffer.salary.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Contract Length:</span>
                          <span className="font-medium">
                            {selectedRequest.counterOffer.years} years
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            {selectedRequest?.status === 'pending' && (
              <>
                {isProcessingAction ? (
                  <Button disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => handleRejectRequest(selectedRequest)}
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Reject Offer
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleCounterOffer(selectedRequest)}
                    >
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Counter Offer
                    </Button>
                    <Button
                      onClick={() => handleAcceptRequest(selectedRequest)}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Accept Offer
                    </Button>
                  </>
                )}
              </>
            )}
            {selectedRequest?.status === 'negotiating' && (
              <>
                {isProcessingAction ? (
                  <Button disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => handleRejectRequest(selectedRequest)}
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Reject Counter
                    </Button>
                    <Button
                      onClick={() => handleAcceptRequest(selectedRequest)}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Accept Counter
                    </Button>
                  </>
                )}
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Counter Offer Dialog */}
      <Dialog
        open={showCounterOfferDialog}
        onOpenChange={setShowCounterOfferDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Make Counter Offer</DialogTitle>
            <DialogDescription>
              Propose different terms for this transfer
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Transfer Fee (in millions)
              </label>
              <div className="flex items-center">
                <span className="mr-2">£</span>
                <input
                  type="number"
                  value={(counterOfferAmount / 1000000).toFixed(1)}
                  onChange={(e) =>
                    setCounterOfferAmount(
                      Number.parseFloat(e.target.value) * 1000000
                    )
                  }
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                />
                <span className="ml-2">M</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Weekly Salary</label>
              <div className="flex items-center">
                <span className="mr-2">£</span>
                <input
                  type="number"
                  value={counterOfferSalary}
                  onChange={(e) =>
                    setCounterOfferSalary(Number.parseInt(e.target.value))
                  }
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Contract Length (years)
              </label>
              <div className="flex items-center">
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={counterOfferYears}
                  onChange={(e) =>
                    setCounterOfferYears(Number.parseInt(e.target.value))
                  }
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                />
                <span className="ml-2">years</span>
              </div>
            </div>
          </div>

          <DialogFooter>
            {isProcessingAction ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => setShowCounterOfferDialog(false)}
                >
                  Cancel
                </Button>
                <Button onClick={submitCounterOffer}>Send Counter Offer</Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Player Details Dialog */}
      <Dialog open={showPlayerDetails} onOpenChange={setShowPlayerDetails}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Player Details</DialogTitle>
            <DialogDescription>
              Detailed information about {selectedPlayer?.name}
            </DialogDescription>
          </DialogHeader>

          {selectedPlayer && (
            <div className="space-y-6 py-4">
              <div className="flex items-center gap-4">
                {/* <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center font-bold text-xl">
                  {'rating' in selectedPlayer
                    ? selectedPlayer.rating
                    : selectedPlayer.rating}
                </div> */}
                <div>
                  <h3 className="text-lg font-bold">{selectedPlayer.name}</h3>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{selectedPlayer.position}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {selectedPlayer.age} yrs • {selectedPlayer.nationality}
                    </span>
                  </div>
                  {/* <div className="flex items-center gap-2 mt-1">
                    {getPlayerStatusBadge(
                      'status' in selectedPlayer
                        ? selectedPlayer.status
                        : selectedPlayer.status
                    )}
                  </div> */}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 border rounded-md">
                    <h4 className="font-medium mb-2">Player Information</h4>
                    <div className="space-y-2">
                      {'value' in selectedPlayer ? (
                        <>
                          <div className="flex justify-between">
                            <span>Market Value:</span>
                            <span className="font-medium">
                              £{(selectedPlayer.value / 1000000).toFixed(1)}M
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Weekly Salary:</span>
                            <span className="font-medium">
                              £{selectedPlayer.salary.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Contract Length:</span>
                            <span className="font-medium">
                              {selectedPlayer.contractYears} years
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>In Starting Lineup:</span>
                            <span className="font-medium">
                              {selectedPlayer.inStartingLineup ? 'Yes' : 'No'}
                            </span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex justify-between">
                            <span>Current Rating:</span>
                            <span className="font-medium">
                              {selectedPlayer.rating}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Potential Rating:</span>
                            <span className="font-medium">
                              {selectedPlayer.potential}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Readiness:</span>
                            <span className="font-medium">
                              {selectedPlayer.readiness}%
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Weekly Salary:</span>
                            <span className="font-medium">
                              £{selectedPlayer.salary.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Status:</span>
                            <span className="font-medium">
                              {selectedPlayer.status}
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {'potential' in selectedPlayer && (
                    <div className="p-4 border rounded-md">
                      <h4 className="font-medium mb-2">Development Progress</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Current Rating</span>
                            <span className="text-sm font-medium">
                              {selectedPlayer.rating}/100
                            </span>
                          </div>
                          <Progress
                            value={selectedPlayer.rating}
                            className="h-2"
                          />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Potential</span>
                            <span className="text-sm font-medium">
                              {selectedPlayer.potential}/100
                            </span>
                          </div>
                          <Progress
                            value={selectedPlayer.potential}
                            className="h-2"
                          />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">
                              Readiness for First Team
                            </span>
                            <span className="text-sm font-medium">
                              {selectedPlayer.readiness}%
                            </span>
                          </div>
                          <Progress
                            value={selectedPlayer.readiness}
                            className="h-2"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="p-4 border rounded-md">
                    <h4 className="font-medium mb-2">Scout Report</h4>
                    {/* <p className="text-sm">
                      {selectedPlayer.name} is a {selectedPlayer.age}-year-old{' '}
                      {selectedPlayer.position} from{' '}
                      {selectedPlayer.nationality}.
                      {' inStartingLineup' in selectedPlayer
                        ? selectedPlayer.inStartingLineup
                          ? ' Currently a key player in your starting lineup.'
                          : ' Currently not in your starting lineup.'
                        : ' Currently not part of your main team.'}
                    </p> */}
                    <p className="text-sm mt-2">
                      {'value' in selectedPlayer
                        ? `With a market value of £${(selectedPlayer.value / 1000000).toFixed(1)}M, ${selectedPlayer.name} is ${selectedPlayer.age < 25 ? 'a promising talent' : selectedPlayer.age < 30 ? 'in the prime of their career' : 'an experienced player'}.`
                        : `With a current rating of ${selectedPlayer.rating} and potential of ${selectedPlayer.potential}, ${selectedPlayer.name} ${selectedPlayer.potential - selectedPlayer.rating > 10 ? 'has significant room for growth' : 'is close to reaching their potential'}.`}
                    </p>
                    <p className="text-sm mt-2">
                      {'readiness' in selectedPlayer &&
                        (selectedPlayer.readiness >= 80
                          ? 'Ready to be promoted to the first team.'
                          : selectedPlayer.readiness >= 60
                            ? 'Could benefit from more development before joining the first team.'
                            : 'Needs significant development before being ready for the first team.')}
                    </p>
                  </div>

                  <div className="p-4 border rounded-md">
                    <h4 className="font-medium mb-2">Actions</h4>
                    <div className="space-y-2">
                      {'value' in selectedPlayer ? (
                        <Button
                          variant="destructive"
                          className="w-full"
                          onClick={() => handleReleasePlayer(selectedPlayer)}
                        >
                          <UserMinus className="mr-2 h-4 w-4" />
                          Release Player
                        </Button>
                      ) : (
                        <Button
                          className="w-full"
                          onClick={() => handlePromotePlayer(selectedPlayer)}
                        >
                          <UserPlus className="mr-2 h-4 w-4" />
                          Promote to Team
                        </Button>
                      )}
                      <Button variant="outline" className="w-full">
                        <FileText className="mr-2 h-4 w-4" />
                        View Full Report
                      </Button>
                      <Button variant="outline" className="w-full">
                        <BarChart3 className="mr-2 h-4 w-4" />
                        View Statistics
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Release Player Confirmation */}
      <AlertDialog
        open={showReleaseConfirmation}
        onOpenChange={setShowReleaseConfirmation}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Player Release</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to release {selectedPlayer?.name} from your
              team? This action cannot be undone and you will not receive any
              transfer fee.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmReleasePlayer}
              className="bg-destructive text-destructive-foreground"
            >
              Release Player
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Promote Player Confirmation */}
      <AlertDialog
        open={showPromoteConfirmation}
        onOpenChange={setShowPromoteConfirmation}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Player Promotion</AlertDialogTitle>
            {/* <AlertDialogDescription>
              Are you sure you want to promote {selectedPlayer?.name} to your
              first team?
              {'readiness' in selectedPlayer &&
                selectedPlayer.readiness < 60 && (
                  <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-md text-amber-800">
                    <AlertTriangle className="h-4 w-4 inline mr-2" />
                    This player's readiness is only {selectedPlayer.readiness}%.
                    They may struggle in the first team.
                  </div>
                )}
            </AlertDialogDescription> */}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmPromotePlayer}>
              Promote Player
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Tabs>
  );
}
