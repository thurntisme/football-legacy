"use client";

import Footer from "./footer";
import Navbar from "./navbar";
import { Toaster } from "@/components/ui/toaster";

import React from "react";

import { usePathname } from "next/navigation";
import { ThemeProvider } from "@/components/ui/theme-provider";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname();

  // if (
  //   pathname === FOOTBALL_PATH ||
  //   pathname?.startsWith(`${FOOTBALL_PATH}/auth`)
  // ) {
  //   return <>{children}</>;
  // }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="container mx-auto px-4 pt-10 pb-[100px]">
          {children}
        </main>
        <Footer />
      </div>
      <Toaster />
    </ThemeProvider>
  );
};

export default Layout;
