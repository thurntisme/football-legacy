"use client";

import { useEffect, useState } from "react";

import { ArrowLeft, CheckCircle, Mail, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams?.get("email") || "";

  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (countdown > 0 && !canResend) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && !canResend) {
      setCanResend(true);
    }
  }, [countdown, canResend]);

  const handleResendEmail = () => {
    setIsResending(true);

    // Simulate API call
    setTimeout(() => {
      setIsResending(false);
      setCanResend(false);
      setCountdown(60);

      toast({
        title: "Verification email resent!",
        description: "Please check your inbox for the verification link.",
      });
    }, 1500);
  };

  const handleVerifyDemo = () => {
    // Simulate verification process
    setIsVerified(true);

    setTimeout(() => {
      toast({
        title: "Email verified successfully!",
        description: "Your account is now active.",
      });

      setTimeout(() => {
        router.push("/");
      }, 1500);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <div className="container max-w-screen-xl mx-auto px-4 py-8 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
            FM
          </div>
          Football Manager
        </Link>
        <Button variant="ghost" asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader className="text-center">
              {isVerified ? (
                <>
                  <div className="mx-auto mb-4">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                  </div>
                  <CardTitle>Email Verified!</CardTitle>
                  <CardDescription>
                    Your email has been successfully verified. Your account is
                    now active.
                  </CardDescription>
                </>
              ) : (
                <>
                  <div className="mx-auto mb-4">
                    <Mail className="h-16 w-16 text-primary mx-auto" />
                  </div>
                  <CardTitle>Verify Your Email</CardTitle>
                  <CardDescription>
                    We've sent a verification link to{" "}
                    <span className="font-medium">{email}</span>
                  </CardDescription>
                </>
              )}
            </CardHeader>
            <CardContent>
              {isVerified ? (
                <div className="text-center space-y-4">
                  <p className="text-muted-foreground">
                    You will be redirected to the dashboard in a few seconds...
                  </p>
                  <div className="flex justify-center">
                    <svg
                      className="animate-spin h-6 w-6 text-primary"
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
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg text-sm">
                    <p className="mb-2">
                      Please check your email inbox and click on the
                      verification link to activate your account.
                    </p>
                    <p>
                      If you don't see the email, please check your spam folder.
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">
                      Didn't receive the email?
                    </p>
                    <Button
                      variant="outline"
                      onClick={handleResendEmail}
                      disabled={isResending || !canResend}
                      className="w-full"
                    >
                      {isResending ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Resending...
                        </>
                      ) : canResend ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Resend Verification Email
                        </>
                      ) : (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Resend in {countdown}s
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              {!isVerified && (
                <>
                  <div className="relative w-full">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        For demo purposes
                      </span>
                    </div>
                  </div>
                  <Button onClick={handleVerifyDemo} className="w-full">
                    Simulate Email Verification
                  </Button>
                </>
              )}
              <p className="text-center text-sm text-muted-foreground">
                <Link
                  href="/auth/signin"
                  className="text-primary hover:underline"
                >
                  Back to Sign In
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
