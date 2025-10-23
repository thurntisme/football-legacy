"use client";

import React from "react";
import { useState } from "react";

import { AlertCircle, Github, Lock, Mail, Twitter, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import LeftBanner from "@/components/pages/auth/left-banner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FOOTBALL_STATS_URL } from "@/constants/site";
import { toast } from "@/hooks/use-toast";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Simulate API call
    try {
      // In a real app, this would be an API call to register
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Basic validation
      if (!name || !email || !password) {
        throw new Error("Please fill in all required fields");
      }

      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      if (!acceptTerms) {
        throw new Error("You must accept the terms and conditions");
      }

      // Success - in a real app, this would create a user account
      toast({
        title: "Account created successfully",
        description: "Please check your email to verify your account",
      });

      // Redirect to verification page
      router.push("/auth/verify-email?email=" + encodeURIComponent(email));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred during sign up",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container relative flex min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <LeftBanner />
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Sign up to start your managerial career
            </p>
          </div>

          <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="social">Social</TabsTrigger>
            </TabsList>

            <TabsContent value="email">
              <Card>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-xl">Sign up with email</CardTitle>
                  <CardDescription>
                    Enter your information to create an account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="name"
                          type="text"
                          placeholder="John Doe"
                          className="pl-8"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="name@example.com"
                          className="pl-8"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          className="pl-8"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="confirm-password"
                          type="password"
                          placeholder="••••••••"
                          className="pl-8"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="terms"
                        checked={acceptTerms}
                        onCheckedChange={(checked) =>
                          setAcceptTerms(checked === true)
                        }
                      />
                      <Label htmlFor="terms" className="text-sm">
                        I agree to the{" "}
                        <Link
                          href="/terms"
                          className="text-primary hover:underline"
                        >
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                          href="/privacy"
                          className="text-primary hover:underline"
                        >
                          Privacy Policy
                        </Link>
                      </Label>
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating account..." : "Create Account"}
                    </Button>
                  </form>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <p className="mt-2 text-xs text-center text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                      href={`${FOOTBALL_STATS_URL}/auth/signin`}
                      className="text-primary hover:underline"
                    >
                      Sign in
                    </Link>
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="social">
              <Card>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-xl">Sign up with social</CardTitle>
                  <CardDescription>
                    Choose your preferred social provider
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() =>
                      toast({
                        title: "Coming soon",
                        description: "This feature is not yet implemented",
                      })
                    }
                  >
                    <Github className="mr-2 h-4 w-4" />
                    Github
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() =>
                      toast({
                        title: "Coming soon",
                        description: "This feature is not yet implemented",
                      })
                    }
                  >
                    <Twitter className="mr-2 h-4 w-4" />
                    Twitter
                  </Button>
                  <Separator className="my-4" />
                  <div className="text-center text-sm text-muted-foreground">
                    By signing up, you agree to our{" "}
                    <Link
                      href="/terms"
                      className="underline underline-offset-4 hover:text-primary"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="underline underline-offset-4 hover:text-primary"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <p className="mt-2 text-xs text-center text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                      href={`${FOOTBALL_STATS_URL}/auth/signin`}
                      className="text-primary hover:underline"
                    >
                      Sign in
                    </Link>
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
