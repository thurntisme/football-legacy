import React from "react";

import { Star, Swords, UserMinus, UserPlus, X } from "lucide-react";

import TeamFormBadges from "@/components/common/team-form-badges";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { OnlineManager } from "@/types/match";

type Props = {
  teamInfoDialogOpen: boolean;
  setTeamInfoDialogOpen: (open: boolean) => void;
  selectedTeam: OnlineManager | null;
  challengeUser: (team: OnlineManager) => void;
};

const TeamInfoDialog = ({
  teamInfoDialogOpen,
  setTeamInfoDialogOpen,
  selectedTeam,
  challengeUser,
}: Props) => {
  return (
    <Dialog open={teamInfoDialogOpen} onOpenChange={setTeamInfoDialogOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Team Information</DialogTitle>
          <DialogDescription>
            Details about {selectedTeam?.name}'s team
          </DialogDescription>
        </DialogHeader>

        {selectedTeam && (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage
                  src={selectedTeam.avatar}
                  alt={selectedTeam.team}
                />
                <AvatarFallback>
                  {selectedTeam.team.substring(0, 2)}
                </AvatarFallback>
              </Avatar>

              <div>
                <h3 className="text-lg font-medium">{selectedTeam.team}</h3>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-amber-500 mr-1" />
                  <span className="text-sm font-medium">
                    Rating: {selectedTeam.rating}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Manager: {selectedTeam.name}
                </p>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-1">Formation</h4>
                <p>{selectedTeam.teamInfo.formation}</p>
              </div>

              <div>
                <h4 className="font-medium mb-1">Average Rating</h4>
                <p>{selectedTeam.teamInfo.avgRating}</p>
              </div>

              <div>
                <h4 className="font-medium mb-1">Playing Style</h4>
                <p>{selectedTeam.teamInfo.style}</p>
              </div>

              <div>
                <h4 className="font-medium mb-1">Recent Form</h4>
                <TeamFormBadges forms={selectedTeam.teamInfo.recentForm} />
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Top Players</h4>
              <ul className="space-y-1">
                {selectedTeam.teamInfo.topPlayers.map(
                  (player: string, index: number) => (
                    <li key={index} className="text-sm">
                      {player}
                    </li>
                  ),
                )}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Strengths</h4>
                <ul className="list-disc list-inside space-y-1">
                  {selectedTeam.teamInfo.strengths.map(
                    (strength: string, index: number) => (
                      <li key={index} className="text-sm">
                        {strength}
                      </li>
                    ),
                  )}
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">Weaknesses</h4>
                <ul className="list-disc list-inside space-y-1">
                  {selectedTeam.teamInfo.weaknesses.map(
                    (weakness: string, index: number) => (
                      <li key={index} className="text-sm">
                        {weakness}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}

        <DialogFooter className="pt-4">
          <Button
            onClick={() => setTeamInfoDialogOpen(false)}
            variant="outline"
          >
            <X className="h-4 w-4" />
            Close
          </Button>
          {selectedTeam?.isFriend ? (
            <Button
              onClick={() => {
                // TODO: Remove friend functionality
                console.log("Remove friend");
              }}
            >
              <UserMinus className="h-4 w-4" />
              Add Friend
            </Button>
          ) : (
            <Button
              onClick={() => {
                // TODO: Add friend functionality
                console.log("Add friend");
              }}
            >
              <UserPlus className="h-4 w-4" />
              Add Friend
            </Button>
          )}
          {selectedTeam?.status === "online" && (
            <Button
              onClick={() => {
                setTeamInfoDialogOpen(false);
                challengeUser(selectedTeam);
              }}
            >
              <Swords className="h-4 w-4" />
              Challenge
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TeamInfoDialog;
