"use client";

import { AdProvider } from "../advertisements/ad-provider";

import React from "react";

import { usePathname } from "next/navigation";

import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { useAppSelector } from "@/store/hooks";

import Footer from "./footer";
import Navbar from "./navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const { user } = useAppSelector((state) => state.auth);

  const isBlank =
    pathname === "/" ||
    pathname?.startsWith("/auth/") ||
    pathname?.startsWith("/welcome");

  // Check if user has "no_ads" feature in their plan
  const hasNoAds = user?.plan_features?.includes("no_ads") ?? false;

  // Show ads only if not blank page and user doesn't have no_ads feature
  const shouldShowAds = !isBlank && !hasNoAds;

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {shouldShowAds ? (
        <AdProvider isShowAd={true}>
          <div className="min-h-screen flex flex-col">
            {!isBlank && <Navbar />}
            <main
              className={
                !isBlank ? "container mx-auto px-4 pt-10 pb-[100px]" : ""
              }
            >
              {children}
            </main>
            {!isBlank && <Footer />}
          </div>
        </AdProvider>
      ) : (
        <div className="min-h-screen flex flex-col">
          {!isBlank && <Navbar />}
          <main
            className={
              !isBlank ? "container mx-auto px-4 pt-10 pb-[100px]" : ""
            }
          >
            {children}
          </main>
          {!isBlank && <Footer />}
        </div>
      )}
      <Toaster />
    </ThemeProvider>
  );
};

export default Layout;
