"use client";

import type React from "react";
import { useState } from "react";

import { ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
import { toast } from "@/hooks/use-toast";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Email is invalid");
      return;
    }

    setError("");
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);

      toast({
        title: "Reset link sent!",
        description: "Please check your email for password reset instructions.",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <div className="container max-w-screen-xl mx-auto px-4 py-8 flex justify-between items-center">
        <Link
          href="/landing"
          className="flex items-center gap-2 text-xl font-bold"
        >
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
            FM
          </div>
          Football Manager
        </Link>
        <Button variant="ghost" asChild>
          <Link href="/auth/signin">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Sign In
          </Link>
        </Button>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader>
              <CardTitle>Reset Password</CardTitle>
              <CardDescription>
                {isSubmitted
                  ? `We've sent password reset instructions to ${email}`
                  : "Enter your email address and we'll send you a link to reset your password"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg text-sm">
                    <p className="mb-2">
                      Please check your email inbox and click on the password
                      reset link.
                    </p>
                    <p>
                      If you don't see the email, please check your spam folder.
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <Mail className="h-16 w-16 text-primary" />
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          placeholder="name@example.com"
                          type="email"
                          autoComplete="email"
                          className={`pl-10 ${error ? "border-red-500" : ""}`}
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (error) setError("");
                          }}
                        />
                      </div>
                      {error && <p className="text-sm text-red-500">{error}</p>}
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending reset link...
                        </>
                      ) : (
                        "Send Reset Link"
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              {isSubmitted ? (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setIsSubmitted(false)}
                >
                  Try a different email
                </Button>
              ) : (
                <p className="text-center text-sm text-muted-foreground">
                  Remember your password?{" "}
                  <Link
                    href="/auth/signin"
                    className="text-primary hover:underline"
                  >
                    Back to sign in
                  </Link>
                </p>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
