import React from 'react';

import { Check } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { RewardItem } from '@/types/football/match';

type Props = {
  playerRewards: RewardItem[];
  selectedReward: number | null;
  setSelectedReward: React.Dispatch<React.SetStateAction<number | null>>;
  rewardClaimed: boolean;
  handleClaimReward: () => void;
};

const MatchResultReward = ({
  playerRewards,
  selectedReward,
  rewardClaimed,
  setSelectedReward,
  handleClaimReward,
}: Props) => {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'rare':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'epic':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
      case 'legendary':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Match Rewards</CardTitle>
        <CardDescription>Select one player to recruit</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {playerRewards.length > 0 ? (
            playerRewards.map((reward) => (
              <div
                key={reward.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedReward === reward.id
                    ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                    : 'hover:border-primary/50'
                } ${rewardClaimed ? 'opacity-50 pointer-events-none' : ''}`}
                onClick={() => !rewardClaimed && setSelectedReward(reward.id)}
              >
                <div className="flex items-center">
                  <div className="mr-4 p-2 rounded-full bg-muted">
                    {reward.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{reward.name}</h3>
                      <Badge className={getRarityColor(reward.rarity)}>
                        {reward.rarity.charAt(0).toUpperCase() +
                          reward.rarity.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {reward.description}
                    </p>
                    <div className="mt-2 flex items-center justify-between text-sm">
                      <span>{reward.playerDetails.position}</span>
                      <span className="font-medium">
                        Rating: {reward.playerDetails.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={handleClaimReward}
          disabled={rewardClaimed || selectedReward === null}
        >
          {rewardClaimed ? 'Redirecting to home...' : 'Claim Selected Player'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MatchResultReward;
