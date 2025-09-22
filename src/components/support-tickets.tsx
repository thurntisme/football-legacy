import React from 'react';

import { AlertCircle, CheckCircle, Clock, MessageSquare } from 'lucide-react';

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

type Props = {};

const SupportTickets = (props: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Support Tickets</CardTitle>
        <CardDescription>View and manage your support requests</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-muted px-4 py-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Recent Tickets</span>
              </div>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
            <div className="divide-y">
              <div className="p-4 hover:bg-muted/50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">Transfer Market Issue</h3>
                    <p className="text-sm text-muted-foreground">
                      Unable to complete player transfer due to an error
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-yellow-50 text-yellow-700 border-yellow-200"
                  >
                    <Clock className="h-3 w-3 mr-1" />
                    In Progress
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Ticket #12345 • Opened 2 days ago</span>
                  <Button variant="ghost" size="sm" className="h-7">
                    View Details
                  </Button>
                </div>
              </div>
              <div className="p-4 hover:bg-muted/50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">Payment Not Processed</h3>
                    <p className="text-sm text-muted-foreground">
                      Pro subscription payment was charged but not activated
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200"
                  >
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Resolved
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Ticket #12289 • Closed 1 week ago</span>
                  <Button variant="ghost" size="sm" className="h-7">
                    View Details
                  </Button>
                </div>
              </div>
              <div className="p-4 hover:bg-muted/50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">Match Simulation Bug</h3>
                    <p className="text-sm text-muted-foreground">
                      Game crashes during match simulation in certain scenarios
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-red-50 text-red-700 border-red-200"
                  >
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Urgent
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Ticket #12401 • Opened 1 day ago</span>
                  <Button variant="ghost" size="sm" className="h-7">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Load More Tickets
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SupportTickets;
