import type React from "react";

import { Inter } from "next/font/google";

import "@/app/custom.css";
import "@/app/globals.css";
import Layout from "@/components/layouts/dashboard";
import { APP_DESCRIPTION, APP_NAME } from "@/constants/site";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
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
