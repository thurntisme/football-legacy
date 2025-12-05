import React from "react";

import { Zap, Loader2, AlertCircle } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Server {
  id: string;
  name: string;
  region: string;
  status: string;
  capacity?: number;
  [key: string]: any;
}

interface Props {
  servers?: Server[];
  loading?: boolean;
  error?: string | null;
}

const ServerInfo = ({ servers, loading, error }: Props) => {
  // Use API data if available, otherwise fallback to constants
  const displayServers = servers && servers.length > 0 ? servers : [];

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Available Servers
      </h2>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          <span className="ml-2 text-gray-600">Loading servers...</span>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center py-12 text-red-600">
          <AlertCircle className="h-5 w-5 mr-2" />
          <span>{error}</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayServers.map((server) => (
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
                    <div
                      className={`h-2 w-2 rounded-full ${
                        server.status === "online"
                          ? "bg-green-600"
                          : server.status === "offline"
                            ? "bg-yellow-600"
                            : "bg-red-600"
                      }`}
                    />
                    <p className="text-sm font-semibold text-gray-900 capitalize">
                      {server.status}
                    </p>
                  </div>
                </div>
                {server.capacity !== undefined && (
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Capacity</p>
                    <p className="text-lg font-bold text-gray-900">
                      {server.capacity >= 1000
                        ? `${(server.capacity / 1000).toFixed(1)}K`
                        : server.capacity}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServerInfo;
