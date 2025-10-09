"use client";

import type React from "react";

import { MessageSquare } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FeedbackGuide from "@/components/user/feedback/feedback-guide";
import GiveFeedback from "@/components/user/feedback/give-feedback";
import ViewResponses from "@/components/user/feedback/view-responses";

export default function FeedbackPage() {
  return (
    <>
      <div className="flex items-center gap-2">
        <MessageSquare className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Feedback</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="md:col-span-2">
          <Tabs defaultValue="give-feedback">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="give-feedback">Give Feedback</TabsTrigger>
              <TabsTrigger value="view-responses">View Responses</TabsTrigger>
            </TabsList>

            <TabsContent value="give-feedback" className="mt-4">
              <GiveFeedback />
            </TabsContent>

            <TabsContent value="view-responses" className="mt-4">
              <ViewResponses />
            </TabsContent>
          </Tabs>
        </div>

        <FeedbackGuide />
      </div>
    </>
  );
}
