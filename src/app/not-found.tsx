import { ArrowLeft, Home, Shield } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-6 px-4 text-center md:px-6">
        <div className="space-y-2">
          <div className="flex justify-center">
            <Shield className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            404 - Page Not Found
          </h1>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        <div className="flex flex-col gap-2 min-[400px]:flex-row">
          <Button asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Go to Homepage
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="javascript:history.back()">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
