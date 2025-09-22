import React from 'react';

import { MessageSquare } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type Props = {};

const ViewResponses = (props: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Developer Responses</CardTitle>
        <CardDescription>
          View responses to your previous feedback submissions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
          <h3 className="mt-4 text-lg font-medium">No responses yet</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            When our team responds to your feedback, you'll see their messages
            here.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ViewResponses;
