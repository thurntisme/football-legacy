import type React from "react";

import { Inter } from "next/font/google";

import Layout from "@/components/layouts/dashboard";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Football Manager Game",
  description: "Manage your football team to glory",
  keywords: "football, manager, game, team, players, transfers, schedule, news",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
