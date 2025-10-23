"use client";

import React from "react";
import { useState } from "react";

import { AxiosError } from "axios";
import {
  AlertCircle,
  Github,
  Loader2,
  Lock,
  Mail,
  Twitter,
} from "lucide-react";
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
import { internalApi } from "@/lib/api/internal";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Simulate API call
    try {
      if (!email || !password) {
        setError("Please enter both email and password");
      }

      const res = await internalApi.post("/auth/login", {
        email,
        password,
      });

      if (res.data.success) {
        toast({
          title: "Sign in successful",
          description: "Welcome back to Football Manager!",
        });

        router.push(`${FOOTBALL_STATS_URL}/welcome`);
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || "Axios error occurred");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred during sign in");
      }
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
              Welcome back
            </h1>
            <p className="text-sm text-muted-foreground">
              Sign in to your account to continue
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
                  <CardTitle className="text-xl">Sign in with email</CardTitle>
                  <CardDescription>
                    Enter your email and password to sign in
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <form onSubmit={handleSignIn} className="space-y-4">
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
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link
                          href="/auth/forgot-password"
                          className="text-xs text-primary hover:underline"
                        >
                          Forgot password?
                        </Link>
                      </div>
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
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remember" />
                      <Label htmlFor="remember" className="text-sm">
                        Remember me
                      </Label>
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading && (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      )}
                      Sign In
                    </Button>
                  </form>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <p className="mt-2 text-xs text-center text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link
                      href={`${FOOTBALL_STATS_URL}/auth/signup`}
                      className="text-primary hover:underline"
                    >
                      Sign up
                    </Link>
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="social">
              <Card>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-xl">Sign in with social</CardTitle>
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
                    By signing in, you agree to our{" "}
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
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/auth/signup"
                      className="text-primary hover:underline"
                    >
                      Sign up
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
