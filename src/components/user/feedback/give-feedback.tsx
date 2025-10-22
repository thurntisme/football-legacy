"use client";

import React, { useState } from "react";

import { Send, ThumbsUp } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type Props = {};

const GiveFeedback = (props: Props) => {
  const [category, setCategory] = useState("");
  const [satisfaction, setSatisfaction] = useState("satisfied");
  const [feedbackText, setFeedbackText] = useState("");
  const [email, setEmail] = useState("");
  const [feedbackType, setFeedbackType] = useState("suggestion");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    console.log({
      feedbackType,
      satisfaction,
      feedbackText,
      email,
      category,
    });
    setSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFeedbackText("");
      setEmail("");
      setCategory("");
    }, 3000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Share Your Thoughts</CardTitle>
        <CardDescription>
          Help us improve Football Manager by sharing your feedback,
          suggestions, or reporting issues.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {submitted ? (
          <Alert className="bg-green-50 border-green-200">
            <ThumbsUp className="h-4 w-4 text-green-600" />
            <AlertTitle>Thank you for your feedback!</AlertTitle>
            <AlertDescription>
              We appreciate your input and will use it to improve the game
              experience.
            </AlertDescription>
          </Alert>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="feedback-type">Feedback Type</Label>
                <RadioGroup
                  id="feedback-type"
                  defaultValue="suggestion"
                  className="flex flex-col space-y-1 mt-2"
                  value={feedbackType}
                  onValueChange={setFeedbackType}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="suggestion" id="suggestion" />
                    <Label htmlFor="suggestion">Suggestion</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bug" id="bug" />
                    <Label htmlFor="bug">Bug Report</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="feature" id="feature" />
                    <Label htmlFor="feature">Feature Request</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger id="category" className="mt-2">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gameplay">Gameplay</SelectItem>
                    <SelectItem value="ui">User Interface</SelectItem>
                    <SelectItem value="transfers">Transfers</SelectItem>
                    <SelectItem value="tactics">Tactics</SelectItem>
                    <SelectItem value="youth">Youth Academy</SelectItem>
                    <SelectItem value="match">Match Engine</SelectItem>
                    <SelectItem value="performance">Performance</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="satisfaction">Overall Satisfaction</Label>
                <RadioGroup
                  id="satisfaction"
                  defaultValue="satisfied"
                  className="flex space-x-4 mt-2"
                  value={satisfaction}
                  onValueChange={setSatisfaction}
                >
                  <div className="flex flex-col items-center space-y-1">
                    <RadioGroupItem
                      value="very-dissatisfied"
                      id="very-dissatisfied"
                    />
                    <Label htmlFor="very-dissatisfied" className="text-xs">
                      Very Dissatisfied
                    </Label>
                  </div>
                  <div className="flex flex-col items-center space-y-1">
                    <RadioGroupItem value="dissatisfied" id="dissatisfied" />
                    <Label htmlFor="dissatisfied" className="text-xs">
                      Dissatisfied
                    </Label>
                  </div>
                  <div className="flex flex-col items-center space-y-1">
                    <RadioGroupItem value="neutral" id="neutral" />
                    <Label htmlFor="neutral" className="text-xs">
                      Neutral
                    </Label>
                  </div>
                  <div className="flex flex-col items-center space-y-1">
                    <RadioGroupItem value="satisfied" id="satisfied" />
                    <Label htmlFor="satisfied" className="text-xs">
                      Satisfied
                    </Label>
                  </div>
                  <div className="flex flex-col items-center space-y-1">
                    <RadioGroupItem
                      value="very-satisfied"
                      id="very-satisfied"
                    />
                    <Label htmlFor="very-satisfied" className="text-xs">
                      Very Satisfied
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="feedback">Your Feedback</Label>
                <Textarea
                  id="feedback"
                  placeholder="Please describe your feedback in detail..."
                  className="mt-2 resize-none"
                  rows={5}
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email (optional)</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  className="mt-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  We'll only use this to follow up on your feedback if
                  necessary.
                </p>
              </div>
            </div>
          </form>
        )}
      </CardContent>
      {!submitted && (
        <CardFooter className="flex justify-end">
          <Button type="submit" onClick={handleSubmit}>
            <Send className="mr-2 h-4 w-4" />
            Submit Feedback
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default GiveFeedback;
