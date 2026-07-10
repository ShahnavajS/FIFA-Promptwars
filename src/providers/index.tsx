"use client";

import React from "react";
import { QueryProvider } from "./query-provider";
import { ThemeProvider } from "./theme-provider";
import { NetworkProvider } from "./network-provider";
import { PwaProvider } from "./pwa-provider";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ToastContainer } from "@/components/ToastContainer";

export function GlobalProviders({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <QueryProvider>
          <NetworkProvider>
            <PwaProvider>
              {children}
              <ToastContainer />
            </PwaProvider>
          </NetworkProvider>
        </QueryProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
