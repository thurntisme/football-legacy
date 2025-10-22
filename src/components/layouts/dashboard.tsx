"use client";

import { AdProvider } from "../advertisements/ad-provider";

import React from "react";

import { usePathname } from "next/navigation";

import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/toaster";

import Footer from "./footer";
import Navbar from "./navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname();

  const isBlank =
    pathname === "/" ||
    pathname?.startsWith("/auth/") ||
    pathname?.startsWith("/welcome");

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AdProvider isShowAd={!isBlank}>
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
      <Toaster />
    </ThemeProvider>
  );
};

export default Layout;
