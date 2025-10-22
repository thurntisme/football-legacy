"use client";

import React, { useState } from "react";

import { Check, Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

type Props = {};

const NewTicketDialog = (props: Props) => {
  const [newTicketOpen, setNewTicketOpen] = useState(false);

  const onSubmitTicket = () => {
    toast({
      title: "Ticket Submitted",
      description: "Your ticket has been submitted successfully",
    });
    setNewTicketOpen(false);
  };

  return (
    <Dialog open={newTicketOpen} onOpenChange={setNewTicketOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="w-4 h-4" />
          New Ticket
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Submit a New Support Ticket</DialogTitle>
          <DialogDescription>
            Our support team will respond to your inquiry as soon as possible
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
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
              <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
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
              Max 5 files, 5MB each
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setNewTicketOpen(false)}>
              <X className="w-4 h-4" />
              Cancel
            </Button>
            <Button onClick={onSubmitTicket}>
              <Check className="w-4 h-4" />
              Submit Ticket
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewTicketDialog;
