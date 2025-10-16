"use client";

import { useEffect, useState } from "react";

import { Swords } from "lucide-react";

import PageTitle from "@/components/common/page-title";
import CommunityChat from "@/components/pages/dashboard/community-chat-widget";
import FindOnlineMatch from "@/components/pages/online/find-online-match";
import ForfeitConfirmationDialog from "@/components/pages/online/forfeit-confirmation-dialog";
import MatchApprovalDialog from "@/components/pages/online/match-approval-dialog";
import MatchHistory from "@/components/pages/online/match-history";
import OnlineLeaderboard from "@/components/pages/online/online-leaderboard";
import TeamInfoDialog from "@/components/pages/online/team-info-dialog";
import WaitingOpponentDialog from "@/components/pages/online/waiting-opponent-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { initialChatMessages } from "@/mock/football";
import { MatchDetail, MatchMessage, OnlineManager } from "@/types/match";

export default function OnlineMatchPage() {
  const [inMatch, setInMatch] = useState(false);
  const [opponent, setOpponent] = useState<any>(null);
  const [chatMessages, setChatMessages] =
    useState<MatchMessage[]>(initialChatMessages);
  const [matchEvents, setMatchEvents] = useState<any[]>([]);
  const [matchStats, setMatchStats] = useState({
    possession: { home: 50, away: 50 },
    shots: { home: 0, away: 0 },
    shotsOnTarget: { home: 0, away: 0 },
    corners: { home: 0, away: 0 },
    fouls: { home: 0, away: 0 },
  });
  const [waitingForOpponent, setWaitingForOpponent] = useState(false);
  const [challengedUser, setChallengedUser] = useState<any>(null);
  const [waitTime, setWaitTime] = useState(0);
  const [teamInfoDialogOpen, setTeamInfoDialogOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<OnlineManager | null>(null);
  const [matchDetailDialogOpen, setMatchDetailDialogOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<any>(null);
  const [matchApprovalDialogOpen, setMatchApprovalDialogOpen] = useState(false);
  const [approvalCountdown, setApprovalCountdown] = useState(30);
  const [userApproved, setUserApproved] = useState(false);
  const [opponentApproved, setOpponentApproved] = useState(false);
  const [forfeitDialogOpen, setForfeitDialogOpen] = useState(false);

  // Update wait time counter
  useEffect(() => {
    let waitInterval: ReturnType<typeof setTimeout> | null = null;

    if (waitingForOpponent) {
      waitInterval = setInterval(() => {
        setWaitTime((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (waitInterval) clearInterval(waitInterval);
    };
  }, [waitingForOpponent]);

  // Handle approval countdown
  useEffect(() => {
    let countdownInterval: ReturnType<typeof setTimeout> | null = null;

    if (matchApprovalDialogOpen && approvalCountdown > 0) {
      countdownInterval = setInterval(() => {
        setApprovalCountdown((prev) => {
          // Auto-approve for opponent after random time
          if (!opponentApproved && Math.random() > 0.3) {
            setOpponentApproved(true);
          }
          if (prev <= 1) {
            // If time runs out and user hasn't approved, consider it a forfeit
            if (!userApproved && opponentApproved) {
              handleForfeit();
            }

            // If both approved, start the match
            console.log({ userApproved, opponentApproved });
            if (userApproved && opponentApproved) {
              setMatchApprovalDialogOpen(false);
              if (opponentApproved) {
                beginMatch();
              } else {
                toast({
                  title: "Match Canceled",
                  description:
                    "The opponent did not approve the match request. The match has been canceled.",
                  variant: "destructive",
                });
              }
            }

            clearInterval(countdownInterval!);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (countdownInterval) clearInterval(countdownInterval);
    };
  }, [
    matchApprovalDialogOpen,
    approvalCountdown,
    userApproved,
    opponentApproved,
  ]);

  // View team info
  const viewTeamInfo = (user: OnlineManager) => {
    setSelectedTeam(user);
    setTeamInfoDialogOpen(true);
  };

  // View match details
  const viewMatchDetails = (match: MatchDetail) => {
    setSelectedMatch(match);
    setMatchDetailDialogOpen(true);
  };

  // Challenge a user
  const challengeUser = (user: OnlineManager) => {
    setChallengedUser(user);
    setWaitingForOpponent(true);
    setWaitTime(0);

    // Simulate response after random time (2-5 seconds)
    const responseTime = 2000 + Math.random() * 3000;

    setTimeout(() => {
      // 70% chance to accept
      // if (Math.random() > 0.3) {
      toast({
        title: "Challenge Accepted",
        description: `${user.name} has accepted your challenge!`,
      });
      console.log("Challenge accepted by:", user);

      // Show match approval dialog instead of starting match directly
      setOpponent(user);
      setWaitingForOpponent(false);
      setChallengedUser(null);
      setUserApproved(false);
      setOpponentApproved(false);
      setApprovalCountdown(30);
      setMatchApprovalDialogOpen(true);
      // } else {
      //   toast({
      //     title: 'Challenge Declined',
      //     description: `${user.name} has declined your challenge.`,
      //     variant: 'destructive',
      //   });
      //   console.log('Challenge declined by:', user);
      //   setWaitingForOpponent(false);
      //   setChallengedUser(null);
      // }
    }, responseTime);
  };

  // Approve match
  const approveMatch = () => {
    setUserApproved(true);

    // If opponent has already approved, start the match
    if (opponentApproved) {
      setMatchApprovalDialogOpen(false);
      beginMatch();
    }
  };

  // Begin match after approval
  const beginMatch = () => {
    // Add system message about match starting
    addSystemChatMessage(
      "Both managers have approved. Redirecting to match...",
    );

    // Redirect to match start page after a short delay
    setTimeout(() => {
      // router.push(`${FOOTBALL_STATS_URL}/match/start`);
      setInMatch(true);
      setMatchApprovalDialogOpen(false);
      setApprovalCountdown(30);
      setMatchStats({
        possession: { home: 50, away: 50 },
        shots: { home: 0, away: 0 },
        shotsOnTarget: { home: 0, away: 0 },
        corners: { home: 0, away: 0 },
        fouls: { home: 0, away: 0 },
      });
      setMatchEvents([]);
      setChatMessages([]);
      setOpponent({
        name: opponent.name,
        team: opponent.team,
        avatar: opponent.avatar,
        rating: opponent.rating,
      });
    }, 1500);
  };

  // Handle forfeit
  const handleForfeit = () => {
    toast({
      title: "Match Forfeited",
      description:
        "You've forfeited the match. 1000 coins have been deducted as penalty.",
      variant: "destructive",
    });

    setMatchApprovalDialogOpen(false);
    setForfeitDialogOpen(false);
    setInMatch(false);

    // In a real app, you would deduct coins from the user's account here
  };

  // Cancel challenge
  const cancelChallenge = () => {
    setWaitingForOpponent(false);
    setChallengedUser(null);
    toast({
      title: "Challenge Cancelled",
      description: "You've cancelled the challenge request.",
    });
  };

  // Add a system message to the chat
  const addSystemChatMessage = (message: string) => {
    const systemMessage = {
      id: (chatMessages.length + 1).toString(),
      sender: "system",
      message,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setChatMessages((prev) => [...prev, systemMessage]);
  };

  return (
    <>
      <PageTitle
        title="Online Matches"
        subTitle="Play against other managers in real-time"
      />

      <div className="grid grid-cols-3 gap-3">
        <FindOnlineMatch
          viewTeamInfo={viewTeamInfo}
          challengeUser={challengeUser}
        />
        <div className="flex flex-col gap-4">
          <CommunityChat />
          <MatchHistory />
          <Button>
            <Swords className="h-4 w-4" />
            Find Opponents
          </Button>
        </div>
        <OnlineLeaderboard
          viewTeamInfo={viewTeamInfo}
          challengeUser={challengeUser}
        />
      </div>

      <WaitingOpponentDialog
        waitingForOpponent={waitingForOpponent}
        cancelChallenge={cancelChallenge}
        challengedUser={challengedUser}
        waitTime={waitTime}
      />

      <MatchApprovalDialog
        matchApprovalDialogOpen={matchApprovalDialogOpen}
        userApproved={userApproved}
        setForfeitDialogOpen={setForfeitDialogOpen}
        approvalCountdown={approvalCountdown}
        opponent={opponent}
        opponentApproved={opponentApproved}
        approveMatch={approveMatch}
        setMatchApprovalDialogOpen={setMatchApprovalDialogOpen}
      />

      <ForfeitConfirmationDialog
        forfeitDialogOpen={forfeitDialogOpen}
        setForfeitDialogOpen={setForfeitDialogOpen}
        handleForfeit={handleForfeit}
      />

      <TeamInfoDialog
        teamInfoDialogOpen={teamInfoDialogOpen}
        setTeamInfoDialogOpen={setTeamInfoDialogOpen}
        selectedTeam={selectedTeam}
        challengeUser={challengeUser}
      />
    </>
  );
}
