"use client";

import React, { useState, useEffect } from "react";
import { Activity, Globe, Compass, Cpu, CheckCircle2 } from "lucide-react";

interface TransitionStage {
  id: number;
  timeRange: [number, number];
  title: string;
  sub: string;
  metric: string;
  icon: React.ComponentType<{ className?: string }>;
}

export function CinematicTransition({ onComplete }: { onComplete: () => void }) {
  const [seconds, setSeconds] = useState<number>(0);

  const stages: TransitionStage[] = [
    {
      id: 0,
      timeRange: [0, 2],
      title: "ORBITAL TELEMETRY CONNECTED",
      sub: "Establishing secure connection to Vertex AI satellite core.",
      metric: "GEO-SYNC CORE // LNK-89D2",
      icon: Globe
    },
    {
      id: 1,
      timeRange: [2, 4],
      title: "ESTABLISHING GEOSPATIAL COMPASS",
      sub: "Mapping transit loops and surrounding highways.",
      metric: "RESOLVING PLATFORM 3 RAIL CHANNELS",
      icon: Compass
    },
    {
      id: 2,
      timeRange: [4, 6],
      title: "HOST COORDINATES LOCKED",
      sub: "MetLife Stadium, New York / New Jersey.",
      metric: "GPS: 40.8135° N, 74.0743° W",
      icon: Activity
    },
    {
      id: 3,
      timeRange: [6, 8],
      title: "STADIUM SHIELD DOME SYNCHRONIZED",
      sub: "Roof status open. Environmental climate controls ready.",
      metric: "DOME STABILITY: 99.8%",
      icon: Cpu
    },
    {
      id: 4,
      timeRange: [8, 10],
      title: "ACTIVATING STADIUM BRAIN CORE",
      sub: "Deploying multi-agent companion loops and SRE decision narratives.",
      metric: "COMPANION STATUS: ACTIVE & STABLE",
      icon: CheckCircle2
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev >= 10) {
          clearInterval(timer);
          onComplete();
          return 10;
        }
        return prev + 0.5;
      });
    }, 500);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Find active stage based on current elapsed seconds
  const activeStage = stages.find(
    (s) => seconds >= s.timeRange[0] && seconds < s.timeRange[1]
  ) || stages[4];

  const StageIcon = activeStage.icon;
  const progressPercent = Math.min((seconds / 10) * 100, 100);

  return (
    <div className="fixed inset-0 z-50 bg-[#030303] flex flex-col items-center justify-center p-6 text-center font-sans overflow-hidden">
      {/* Background neon visual overlay grids */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 229, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 229, 255, 0.05) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          transform: `scale(${1 + seconds * 0.04})`,
          transition: "transform 0.5s ease-out"
        }}
      />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-cyber-green/5 blur-[100px] animate-pulse-slow" />
      </div>

      {/* Center Cinematic Widget Block */}
      <div className="max-w-2xl w-full mx-auto space-y-8 relative z-10 flex flex-col items-center">
        
        {/* Stage icon with rotating borders */}
        <div className="h-20 w-20 rounded-3xl border border-cyber-green/30 bg-neutral-950 flex items-center justify-center shadow-[0_0_30px_rgba(0,230,118,0.15)] relative">
          <div className="absolute inset-[-4px] rounded-[32px] border-2 border-dashed border-victory-gold/20 animate-spin" style={{ animationDuration: "20s" }} />
          <StageIcon className="h-9 w-9 text-cyber-green" />
        </div>

        {/* Text descriptions */}
        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white tracking-widest uppercase">
            {activeStage.title}
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed h-12">
            {activeStage.sub}
          </p>
        </div>

        {/* Live coordinate / metric ticker */}
        <div className="px-4 py-2 rounded-xl border border-neutral-900 bg-neutral-950/80 font-mono text-[10px] text-victory-gold tracking-widest uppercase">
          {activeStage.metric}
        </div>

        {/* Cinematic Progress Bar */}
        <div className="w-64 space-y-2">
          <div className="w-full bg-neutral-900 h-1 rounded-full overflow-hidden border border-neutral-850">
            <div 
              className="h-full bg-gradient-to-r from-cyber-green via-electric-cyan to-victory-gold transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[9px] text-neutral-500 font-mono uppercase font-bold tracking-wider">
            <span>Loading Twin Core</span>
            <span>{Math.round(progressPercent)}%</span>
          </div>
        </div>

      </div>
    </div>
  );
}
