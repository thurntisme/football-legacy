import React from "react";

import { Globe, Trophy, Users } from "lucide-react";

type Props = {};

const QuickTips = (props: Props) => {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Tips</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Trophy className="h-6 w-6 text-gray-700" />
            <h3 className="font-semibold text-gray-900">Getting Started</h3>
          </div>
          <p className="text-gray-600 text-sm">
            Build your team, sign players, and start competing in matches to
            earn rewards.
          </p>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Users className="h-6 w-6 text-gray-700" />
            <h3 className="font-semibold text-gray-900">Multiplayer</h3>
          </div>
          <p className="text-gray-600 text-sm">
            Challenge other managers online and climb the global leaderboard
            rankings.
          </p>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Globe className="h-6 w-6 text-gray-700" />
            <h3 className="font-semibold text-gray-900">Cross-Platform</h3>
          </div>
          <p className="text-gray-600 text-sm">
            Play on any device and sync your progress across all platforms
            seamlessly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuickTips;
