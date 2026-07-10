"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught rendering error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-neutral-950 p-6 text-center select-none font-sans">
          <div className="absolute top-1/4 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-500/10 blur-3xl" />
          
          <div className="max-w-md w-full border border-neutral-800 bg-neutral-900/60 backdrop-blur-xl p-8 rounded-2xl shadow-xl flex flex-col items-center gap-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-500/15 border border-rose-500/20 text-rose-500">
              <AlertTriangle className="h-8 w-8" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold font-display tracking-tight text-white">
                Something went wrong
              </h1>
              <p className="text-sm text-neutral-400">
                An unexpected interface rendering crash occurred. Our operations logging hub has registered the incident.
              </p>
            </div>

            {process.env.NODE_ENV === "development" && this.state.error && (
              <pre className="w-full text-left p-3 rounded-lg bg-neutral-950 text-rose-400 text-xs overflow-x-auto max-h-40 border border-neutral-800 font-mono">
                {this.state.error.toString()}
              </pre>
            )}

            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 px-4 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-950 focus:ring-rose-400"
            >
              Restart Application
            </button>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}
