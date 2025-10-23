import React from "react";

import { HelpCircle } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {};

const Faq = (props: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Frequently Asked Questions</CardTitle>
        <CardDescription>
          Find quick answers to common questions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium text-lg flex items-center">
              <HelpCircle className="h-5 w-5 mr-2 text-primary" />
              Account & Subscription
            </h3>
            <div className="space-y-3 pl-7">
              <div className="border-l-2 pl-4 py-1">
                <h4 className="font-medium">
                  How do I upgrade my subscription?
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  You can upgrade your subscription by navigating to the Payment
                  & Subscriptions page from your profile menu. There you'll find
                  different subscription options to choose from.
                </p>
              </div>
              <div className="border-l-2 pl-4 py-1">
                <h4 className="font-medium">Can I cancel my subscription?</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Yes, you can cancel your subscription at any time. Your
                  benefits will remain active until the end of your current
                  billing period. To cancel, go to your account settings and
                  select "Manage Subscription."
                </p>
              </div>
              <div className="border-l-2 pl-4 py-1">
                <h4 className="font-medium">
                  How do I change my account email or password?
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  You can update your email address and password in the Settings
                  page under the Profile tab.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-lg flex items-center">
              <HelpCircle className="h-5 w-5 mr-2 text-primary" />
              Gameplay
            </h3>
            <div className="space-y-3 pl-7">
              <div className="border-l-2 pl-4 py-1">
                <h4 className="font-medium">
                  How does the transfer market work?
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  The transfer market allows you to buy and sell players. You
                  can search for players based on various criteria, make offers,
                  and negotiate contracts. Your transfer budget is determined by
                  your club's finances.
                </p>
              </div>
              <div className="border-l-2 pl-4 py-1">
                <h4 className="font-medium">
                  How do I improve my players' skills?
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Players improve through training sessions, match experience,
                  and specialized development programs. You can customize
                  training schedules in the Training section and focus on
                  specific attributes.
                </p>
              </div>
              <div className="border-l-2 pl-4 py-1">
                <h4 className="font-medium">What affects match results?</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Match results are influenced by player abilities, team
                  tactics, formation, morale, fitness, opposition strength, and
                  some random factors to simulate real football
                  unpredictability.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-lg flex items-center">
              <HelpCircle className="h-5 w-5 mr-2 text-primary" />
              Technical Issues
            </h3>
            <div className="space-y-3 pl-7">
              <div className="border-l-2 pl-4 py-1">
                <h4 className="font-medium">
                  The game is running slowly. What can I do?
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Try clearing your browser cache, ensuring you have a stable
                  internet connection, and closing other resource-intensive
                  applications. If problems persist, try using a different
                  browser.
                </p>
              </div>
              <div className="border-l-2 pl-4 py-1">
                <h4 className="font-medium">
                  I found a bug. How do I report it?
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  You can report bugs by submitting a support ticket with
                  detailed information about the issue, including steps to
                  reproduce it and screenshots if possible.
                </p>
              </div>
              <div className="border-l-2 pl-4 py-1">
                <h4 className="font-medium">
                  Is my game progress saved automatically?
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Yes, your game progress is saved automatically to our servers.
                  However, it's always a good idea to manually save important
                  changes by clicking the save button when available.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Faq;
