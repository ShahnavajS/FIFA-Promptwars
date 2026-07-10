"use client";

import React from "react";
import { AlertCircle, FileText, Map, PhoneCall, WifiOff } from "lucide-react";

export default function OfflinePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-neutral-950 p-6 text-center select-none font-sans">
      <div className="absolute top-1/4 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/10 blur-3xl" />

      <div className="max-w-md w-full border border-neutral-800 bg-neutral-900/60 backdrop-blur-xl p-8 rounded-2xl shadow-xl flex flex-col items-center gap-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/15 border border-amber-500/20 text-amber-500 animate-pulse">
          <WifiOff className="h-8 w-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold font-display tracking-tight text-white">
            Connection Lost
          </h1>
          <p className="text-sm text-neutral-400">
            Stadium network is congested. StadiumPulse AI is running in local offline-first mode. Your core tools remain active.
          </p>
        </div>

        <div className="w-full grid grid-cols-2 gap-3 mt-2">
          <button 
            className="flex flex-col items-center gap-3 p-4 rounded-xl border border-neutral-800 bg-neutral-950/40 hover:bg-neutral-800/40 transition-colors text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
            onClick={() => window.location.reload()}
          >
            <Map className="h-6 w-6 text-cyan-400" />
            <span className="text-xs font-semibold">Offline Maps</span>
          </button>

          <button 
            className="flex flex-col items-center gap-3 p-4 rounded-xl border border-neutral-800 bg-neutral-950/40 hover:bg-neutral-800/40 transition-colors text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
            onClick={() => window.location.reload()}
          >
            <FileText className="h-6 w-6 text-emerald-400" />
            <span className="text-xs font-semibold">Cached Tickets</span>
          </button>
        </div>

        <div className="w-full border-t border-neutral-800 pt-4 flex flex-col gap-3 text-left">
          <div className="flex items-start gap-3">
            <PhoneCall className="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-neutral-300">Emergency Support</h4>
              <p className="text-xs text-neutral-400">Locate closest volunteer or report to medical/security desks without internet.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-neutral-300">Live Congestion</h4>
              <p className="text-xs text-neutral-400">Restrooms and gates will sync automatically once network returns.</p>
            </div>
          </div>
        </div>

        <button 
          onClick={() => window.location.reload()}
          className="w-full mt-2 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-950 focus:ring-amber-400"
        >
          Check Connection
        </button>
      </div>
    </main>
  );
}
