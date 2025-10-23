"use client";

import * as React from "react";
import { ReactNode } from "react";

import { ThemeProvider as NextThemesProvider } from "next-themes";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface ThemeProviderProps {
  children: ReactNode;
  [key: string]: any;
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const queryClientRef = React.useRef<QueryClient>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        {...props}
      >
        {children}
      </NextThemesProvider>
    </QueryClientProvider>
  );
}
