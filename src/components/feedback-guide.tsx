import React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type Props = {};

const FeedbackGuide = (props: Props) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Feedback Guidelines</CardTitle>
          <CardDescription>
            Tips for providing effective feedback
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium">Be Specific</h3>
            <p className="text-sm text-muted-foreground">
              Include details about what you experienced, including where and
              when it happened.
            </p>
          </div>
          <div>
            <h3 className="font-medium">Be Constructive</h3>
            <p className="text-sm text-muted-foreground">
              Explain why something is an issue and suggest possible
              improvements.
            </p>
          </div>
          <div>
            <h3 className="font-medium">Include Steps</h3>
            <p className="text-sm text-muted-foreground">
              For bug reports, list the steps to reproduce the issue.
            </p>
          </div>
          <div>
            <h3 className="font-medium">Provide Context</h3>
            <p className="text-sm text-muted-foreground">
              Mention your device, browser, or any relevant settings.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Recent Updates</CardTitle>
          <CardDescription>Changes based on community feedback</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium">Match Engine Improvements</h3>
            <p className="text-sm text-muted-foreground">
              Enhanced player movement and tactical responsiveness.
            </p>
          </div>
          <div>
            <h3 className="font-medium">Transfer Negotiation Realism</h3>
            <p className="text-sm text-muted-foreground">
              More realistic AI behavior during transfer negotiations.
            </p>
          </div>
          <div>
            <h3 className="font-medium">Youth Academy Enhancements</h3>
            <p className="text-sm text-muted-foreground">
              Improved youth player development and scouting.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedbackGuide;
