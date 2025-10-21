import React from "react";

import { Zap } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SERVERS } from "@/constants/common";

type Props = {};

const ServerInfo = (props: Props) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Available Servers
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SERVERS.map((server) => (
          <Card key={server.id} className="bg-white border-gray-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-gray-900">{server.name}</CardTitle>
                <Zap className="h-5 w-5 text-gray-700" />
              </div>
              <CardDescription className="text-gray-600">
                {server.region}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-gray-600 mb-1">Status</p>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-600" />
                  <p className="text-sm font-semibold text-gray-900">
                    {server.status}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Active Players</p>
                <p className="text-lg font-bold text-gray-900">
                  {(server.players / 1000).toFixed(1)}K
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ServerInfo;
