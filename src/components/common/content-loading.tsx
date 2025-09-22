import React from 'react';

import { Loader2 } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';

type Props = {};

const ContentLoading = (props: Props) => {
  return (
    <Card className="w-full h-[70vh] flex items-center justify-center">
      <CardContent className="flex flex-col items-center justify-center p-8 space-y-4 min-w-[500px] max-w-full">
        <Loader2 className={`h-12 w-12 animate-spin text-primary`} />
        <div className="text-center space-y-2">
          <h3 className="font-semibold text-lg">Football Manager</h3>
          <p className="text-muted-foreground">Loading...</p>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full animate-pulse"
            style={{ width: '60%' }}
          ></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentLoading;
