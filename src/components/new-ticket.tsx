import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type Props = {};

const NewTicket = (props: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit a New Support Ticket</CardTitle>
        <CardDescription>
          Our support team will respond to your inquiry as soon as possible
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value="">Select a category</option>
                <option value="technical">Technical Issue</option>
                <option value="billing">Billing & Payments</option>
                <option value="account">Account Management</option>
                <option value="gameplay">Gameplay</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <select
                id="priority"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" placeholder="Brief description of your issue" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Please provide as much detail as possible about your issue"
              rows={6}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="attachment">Attachments (optional)</Label>
            <Input id="attachment" type="file" multiple />
            <p className="text-xs text-muted-foreground">
              You can upload screenshots or files to help us understand your
              issue better. Max 5 files, 5MB each.
            </p>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-2">
        <Button variant="outline" className="sm:w-auto w-full">
          Cancel
        </Button>
        <Button className="sm:w-auto w-full">Submit Ticket</Button>
      </CardFooter>
    </Card>
  );
};

export default NewTicket;
