"use client";

import React from "react";
import { useMatchStore, MatchPhase } from "@/stores/useMatchStore";
import { Card } from "./card";
import { Users, CloudSun, Smile, Activity, ShieldAlert, Tv, Sparkles } from "lucide-react";

export function StadiumHero() {
  const {
    currentPhase,
    matchName,
    timeRemaining,
    attendance,
    crowdMood,
    aiConfidence,
    opsStatus,
    activeEmergency,
    domeStatus,
  } = useMatchStore();

  // Helper to map phases to primary timeline milestones
  const milestones: { label: string; phases: MatchPhase[] }[] = [
    { label: "Arrival", phases: ["pre-match", "arrival"] },
    { label: "Security", phases: ["security"] },
    { label: "Gate Entry", phases: ["gate-entry"] },
    { label: "Find Seat", phases: ["find-seat", "pre-kickoff"] },
    { label: "Live Match", phases: ["kickoff", "second-half"] },
    { label: "Halftime", phases: ["halftime"] },
    { label: "Exit Flow", phases: ["full-time", "exit", "post-match"] },
  ];

  // Mood emoji mapping
  const moodData = {
    calm: { label: "Calm", color: "text-cyber-green bg-cyber-green/10 border-cyber-green/20" },
    excited: {
      label: "Energetic",
      color: "text-electric-cyan bg-electric-cyan/10 border-electric-cyan/20 animate-pulse",
    },
    tense: {
      label: "Tense Queue",
      color: "text-crowd-orange bg-crowd-orange/10 border-crowd-orange/20",
    },
    celebrating: {
      label: "Celebrating",
      color: "text-victory-gold bg-victory-gold/10 border-victory-gold/20 animate-bounce",
    },
  };

  return (
    <Card
      variant="glass"
      className="w-full text-left relative overflow-hidden p-6 border-neutral-800 bg-neutral-950/60 backdrop-blur-xl"
    >
      {/* Background Image overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay -z-20 pointer-events-none"
        style={{ backgroundImage: "url('/images/stadium_hero.jpg')" }}
      />

      {/* Background radial gradient glow based on status */}
      <div
        className={`absolute top-0 right-0 w-80 h-80 rounded-full blur-[100px] pointer-events-none -z-10 transition-colors duration-500 ${
          opsStatus === "critical" ? "bg-rose-500/10" : "bg-stadium-blue/10"
        }`}
      />

      {/* Main Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left Side: Game details & countdown (5 cols) */}
        <div className="md:col-span-5 space-y-3">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  opsStatus === "critical" ? "bg-rose-500" : "bg-cyber-green"
                }`}
              ></span>
              <span
                className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                  opsStatus === "critical" ? "bg-rose-500" : "bg-cyber-green"
                }`}
              ></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 font-display">
              FIFA World Cup 2026 Companion
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight leading-none">
            {matchName}
          </h2>

          <div className="flex items-center gap-3">
            <div className="text-xl font-bold text-white tracking-tight flex items-center gap-1.5 font-mono">
              <Tv className="h-5 w-5 text-electric-cyan" />
              {timeRemaining}
            </div>
            {activeEmergency && (
              <div
                aria-live="assertive"
                className="px-2 py-0.5 rounded border border-rose-500/30 bg-rose-950/40 text-rose-500 text-[10px] font-bold uppercase tracking-wider animate-pulse flex items-center gap-1"
              >
                <ShieldAlert className="h-3 w-3" />
                <span>EMERGENCY ALERT: {activeEmergency}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Operational Telemetry gauges (7 cols) */}
        <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {/* Attendance */}
          <div className="p-3 rounded-xl border border-neutral-900 bg-neutral-950/40 text-xs">
            <div className="flex items-center gap-1.5 text-neutral-500 font-bold uppercase tracking-wider text-[10px] mb-1 font-display">
              <Users className="h-3.5 w-3.5" />
              Occupancy
            </div>
            <div className="text-base font-bold text-white">{attendance.toLocaleString()}</div>
            <div className="text-[10px] text-neutral-400">Fans inside bowl</div>
          </div>

          {/* Weather / Dome */}
          <div className="p-3 rounded-xl border border-neutral-900 bg-neutral-950/40 text-xs">
            <div className="flex items-center gap-1.5 text-neutral-500 font-bold uppercase tracking-wider text-[10px] mb-1 font-display">
              <CloudSun className="h-3.5 w-3.5" />
              Dome Status
            </div>
            <div className="text-base font-bold text-white capitalize">{domeStatus} Roof</div>
            <div className="text-[10px] text-neutral-400">Solar offsets active</div>
          </div>

          {/* Crowd Mood */}
          <div className="p-3 rounded-xl border border-neutral-900 bg-neutral-950/40 text-xs">
            <div className="flex items-center gap-1.5 text-neutral-500 font-bold uppercase tracking-wider text-[10px] mb-1 font-display">
              <Smile className="h-3.5 w-3.5" />
              Crowd Pulse
            </div>
            <div
              className={`inline-flex px-2 py-0.5 rounded-md text-xs font-bold capitalize border ${moodData[crowdMood].color}`}
            >
              {moodData[crowdMood].label}
            </div>
            <div className="text-[10px] text-neutral-400 mt-1">Telemetry mood logs</div>
          </div>

          {/* AI Confidence */}
          <div className="p-3 rounded-xl border border-neutral-900 bg-neutral-950/40 text-xs">
            <div className="flex items-center gap-1.5 text-neutral-500 font-bold uppercase tracking-wider text-[10px] mb-1 font-display">
              <Activity className="h-3.5 w-3.5" />
              AI Routing
            </div>
            <div className="text-base font-bold text-cyber-green flex items-center gap-1">
              <Sparkles className="h-4 w-4 text-cyber-green" />
              {aiConfidence}%
            </div>
            <div className="text-[10px] text-neutral-400">Dispatch confidence</div>
          </div>
        </div>
      </div>

      {/* Bottom: Milestone Timeline Progress Line */}
      <div className="mt-6 pt-4 border-t border-neutral-900">
        <div className="relative flex items-center justify-between w-full">
          {/* Background bar */}
          <div className="absolute left-0 right-0 h-0.5 bg-neutral-900 -z-10" />

          {/* Milestone nodes */}
          {milestones.map((m: { label: string; phases: MatchPhase[] }, idx: number) => {
            const isCompleted =
              milestones
                .slice(0, idx)
                .some((prev: { label: string; phases: MatchPhase[] }) =>
                  prev.phases.includes(currentPhase)
                ) || m.phases.includes(currentPhase);

            const isActive = m.phases.includes(currentPhase);

            return (
              <div key={idx} className="flex flex-col items-center gap-2">
                <div
                  className={`h-3 w-3 rounded-full border transition-all duration-300 ${
                    isActive
                      ? "bg-cyber-green border-cyber-green scale-125 glow-green"
                      : isCompleted
                        ? "bg-neutral-500 border-neutral-500"
                        : "bg-neutral-950 border-neutral-900"
                  }`}
                />
                <span
                  className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider ${
                    isActive ? "text-white" : "text-neutral-500"
                  }`}
                >
                  {m.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
