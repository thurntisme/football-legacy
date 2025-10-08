import React from "react";

import { AlertTriangle, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  message?: string;
  onRetry: () => void;
};

const ContentError = ({ message, onRetry }: Props) => {
  return (
    <Card className="w-full h-[70vh] flex flex-col items-center justify-center">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle className="h-6 w-6 text-destructive" />
        </div>
        <CardTitle className="text-xl font-semibold">
          Something went wrong
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-center text-muted-foreground">
          An unexpected error occurred. Please try again.
        </p>

        {message && (
          <div className="rounded-md bg-muted p-3">
            <p className="text-xs font-mono text-muted-foreground break-all">
              {message}
            </p>
          </div>
        )}

        <div className="flex flex-col space-y-2">
          <Button onClick={onRetry} className="w-full">
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </div>

        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            If the problem persists, please contact support
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentError;
