"use client";

import React, { useState, useEffect } from "react";
import { ReplayService, ReplayStep } from "@/services/replay.service";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AILearningEngine } from "@/components/ui/learning-engine";
import { OperationalInsights } from "@/components/ui/operational-insights";
import { 
  Play, 
  Pause, 
  SkipForward, 
  RotateCcw,
  Activity,
  Cpu,
  ShieldAlert,
  MapPin,
  CloudSun
} from "lucide-react";

export default function ReplayPage() {
  const steps = ReplayService.getReplaySteps();
  const [currentTick, setCurrentTick] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Auto-play interval triggers
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentTick((prev) => (prev + 1) % steps.length);
      }, 2000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, steps.length]);

  const activeStep: ReplayStep = ReplayService.getReplayStep(currentTick);

  // Map layer toggles depending on active step settings
  const hasTransit = ["arrival", "exit", "post-match"].includes(activeStep.phase);
  const hasEmergency = activeStep.emergency !== null;
  const hasFood = activeStep.phase === "halftime";

  return (
    <div className="flex flex-col gap-6 text-left font-sans pb-10">
      
      {/* 1. Header Hero Panel */}
      <Card variant="glass" className="border-neutral-800 bg-neutral-950/60 backdrop-blur-xl relative overflow-hidden">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-victory-gold font-bold text-xs uppercase tracking-wider font-display">
              <Activity className="h-4 w-4 text-rose-500 animate-pulse" />
              Tournament Replay Center
            </div>
            <CardTitle className="text-white text-2xl font-bold">Interactive Command Center Replay</CardTitle>
            <CardDescription className="text-neutral-400 text-xs">
              Scrub or auto-play historical tournament records to audit cognitive AI decisions, map sensors, and agent logs.
            </CardDescription>
          </div>

          {/* Interactive Player Controls */}
          <div className="flex items-center gap-2 self-start sm:self-center">
            <Button
              variant="glass"
              size="sm"
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-xs py-1.5 bg-neutral-900 border-neutral-800 text-white font-bold gap-1"
            >
              {isPlaying ? <Pause className="h-3.5 w-3.5 text-amber-400" /> : <Play className="h-3.5 w-3.5 text-cyber-green fill-current" />}
              <span>{isPlaying ? "Pause" : "Auto Play"}</span>
            </Button>
            
            <Button
              variant="glass"
              size="sm"
              onClick={() => setCurrentTick((prev) => (prev + 1) % steps.length)}
              className="p-2 bg-neutral-900 border-neutral-850 text-neutral-400 hover:text-white"
              aria-label="Skip Forward"
            >
              <SkipForward className="h-3.5 w-3.5" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setCurrentTick(0);
                setIsPlaying(false);
              }}
              className="text-neutral-500 hover:text-white"
              aria-label="Reset Replay"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </Button>
          </div>
        </CardHeader>

        {/* Timeline Slider bar */}
        <CardContent className="pt-0 pb-5">
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] text-neutral-400 font-bold uppercase tracking-wider font-mono">
              <span>Timeline Ticks (Scrub Slider)</span>
              <span className="text-white font-sans">Tick {currentTick} of {steps.length - 1} · Stage: {activeStep.label} ({activeStep.time})</span>
            </div>
            <input
              type="range"
              min="0"
              max={steps.length - 1}
              value={currentTick}
              onChange={(e) => {
                setCurrentTick(Number(e.target.value));
                setIsPlaying(false);
              }}
              className="w-full h-1.5 bg-neutral-900 rounded-lg appearance-none cursor-pointer accent-victory-gold focus:outline-none"
              aria-label="Replay Timeline Slider"
              aria-valuemin={0}
              aria-valuemax={steps.length - 1}
              aria-valuenow={currentTick}
              aria-valuetext={`Tick ${currentTick}: ${activeStep.label}`}
            />
          </div>
        </CardContent>
      </Card>

      {/* 2. Synchronized Workspace (SVG Map & Cognitive Brain) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Side: SVG Digital Twin map (6 Columns) */}
        <div className="lg:col-span-6 flex flex-col">
          <Card variant="glass" className="flex-grow flex flex-col p-0 overflow-hidden relative border-neutral-800 bg-neutral-950/60 backdrop-blur-xl min-h-[380px]">
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 p-2 bg-neutral-950/80 border border-neutral-800 rounded-xl text-xs text-white font-semibold shadow-lg">
              <MapPin className="h-4 w-4 text-cyber-green animate-pulse" />
              <span>Map Replay · {activeStep.label}</span>
            </div>

            <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 bg-neutral-950/80 border border-neutral-800 rounded-xl text-[10px] text-neutral-400 font-mono font-bold uppercase shadow-lg">
              <CloudSun className="h-4 w-4 text-amber-400" />
              <span>Dome Status: {activeStep.domeStatus.toUpperCase()}</span>
            </div>

            {/* Interactive SVG Canvas */}
            <div className="flex-grow flex items-center justify-center p-6 bg-neutral-950/40 relative min-h-[290px]">
              <svg
                className="w-full max-w-[340px] h-auto text-neutral-850 transition-colors"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Stadium Outer Bowl */}
                <ellipse cx="50" cy="50" rx="46" ry="38" fill="none" stroke="currentColor" strokeWidth="1" />
                <ellipse cx="50" cy="50" rx="42" ry="34" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                <ellipse cx="50" cy="50" rx="32" ry="24" fill="none" stroke="currentColor" strokeWidth="1" />

                {/* Central Field */}
                <rect 
                  x="36" 
                  y="38" 
                  width="28" 
                  height="24" 
                  fill={activeStep.phase === "kickoff" ? "rgba(0, 230, 118, 0.06)" : "rgba(0, 230, 118, 0.02)"} 
                  stroke={activeStep.phase === "kickoff" ? "#00e676" : "currentColor"} 
                  strokeWidth="0.75" 
                />
                <circle cx="50" cy="50" r="4" fill="none" stroke="currentColor" strokeWidth="0.5" />

                {/* DYNAMIC TIMELINE OVERLAYS */}

                {/* Transit Platform Loops */}
                {hasTransit && (
                  <g>
                    <path d="M 50 1 L 50 12" fill="none" stroke="#06b6d4" strokeWidth="2" strokeDasharray="2 2" className="animate-[dash_2s_linear_infinite]" />
                    <path d="M 50 99 L 50 88" fill="none" stroke="#06b6d4" strokeWidth="2" strokeDasharray="2 2" className="animate-[dash_2s_linear_infinite]" />
                  </g>
                )}

                {/* Gate B Congestion Redirection */}
                {currentTick === 1 && (
                  <g>
                    <circle cx="86" cy="50" r="8" fill="rgba(255, 23, 68, 0.2)" className="animate-pulse" />
                    <circle cx="86" cy="50" r="4.5" fill="#ff1744" />
                    <path d="M 80 50 A 30 22 0 0 0 54 13" fill="none" stroke="#00e676" strokeWidth="1.5" strokeDasharray="3 3" />
                  </g>
                )}

                {/* Medical Incident */}
                {currentTick === 3 && (
                  <g>
                    <circle cx="68" cy="74" r="5" fill="rgba(239, 68, 68, 0.2)" className="animate-ping" />
                    <circle cx="68" cy="74" r="3" fill="#ef4444" />
                    <line x1="68" y1="74" x2="26" y2="74" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="2 2" />
                  </g>
                )}

                {/* Goal Confetti / Bounce */}
                {currentTick === 5 && (
                  <g>
                    <ellipse cx="50" cy="50" rx="30" ry="22" fill="rgba(245, 158, 11, 0.05)" stroke="#f59e0b" strokeWidth="1.5" className="animate-pulse" />
                    <circle cx="34" cy="28" r="1.5" fill="#f59e0b" className="animate-bounce" />
                    <circle cx="66" cy="28" r="1.5" fill="#f59e0b" className="animate-bounce" />
                  </g>
                )}

                {/* Halftime Refresh highlight */}
                {hasFood && (
                  <g>
                    <circle cx="34" cy="28" r="1.5" fill="#f59e0b" />
                    <circle cx="66" cy="28" r="1.5" fill="#f59e0b" />
                  </g>
                )}
              </svg>
            </div>
          </Card>
        </div>

        {/* Right Side: Synchronized AI Brain & Agent Logs (6 Columns) */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <Card variant="glass" className="border-neutral-850 bg-neutral-950/60 backdrop-blur-xl flex-grow flex flex-col justify-between text-xs">
            <CardHeader className="pb-3 border-b border-neutral-900 flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-victory-gold/10 border border-victory-gold/20 text-victory-gold">
                  <Cpu className="h-4.5 w-4.5 animate-pulse" />
                </div>
                <div>
                  <CardTitle className="text-white text-base">Replay AI Stadium Brain</CardTitle>
                </div>
              </div>

              {/* Status emergency tag */}
              {hasEmergency ? (
                <span className="px-2.5 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-900 text-[9px] uppercase font-bold tracking-wider font-mono flex items-center gap-1">
                  <ShieldAlert className="h-3 w-3 animate-pulse" />
                  {activeStep.emergency}
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-900 text-[9px] uppercase font-bold tracking-wider font-mono">
                  All Systems Normal
                </span>
              )}
            </CardHeader>

            <CardContent className="pt-4 flex flex-col gap-4 text-left leading-relaxed">
              
              {/* Situation */}
              <div>
                <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider block mb-1">
                  Replay Situation Analysis
                </span>
                <p className="text-white font-medium text-xs">&quot;{activeStep.explanation}&quot;</p>
              </div>

              {/* Action */}
              <div>
                <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider block mb-1">
                  AI Recommendation Decided
                </span>
                <p className="text-victory-gold font-semibold text-xs">&quot;{activeStep.recommendedAction}&quot;</p>
              </div>

              {/* Coordinated Sub-agent message */}
              <div className="pt-3 border-t border-neutral-900/60">
                <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider block mb-1">
                  Sub-Agent Telemetry Log
                </span>
                <div className="p-2.5 rounded-lg bg-neutral-900/60 border border-neutral-850 font-mono text-[10px] text-neutral-300">
                  {activeStep.agentsLog}
                </div>
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-neutral-900/60 text-[10px] text-neutral-400 font-semibold font-mono">
                <div>
                  <span className="text-[9px] text-neutral-500 uppercase block font-sans">Active Phase</span>
                  <span className="text-white capitalize">{activeStep.phase.replace("-", " ")}</span>
                </div>
                <div>
                  <span className="text-[9px] text-neutral-500 uppercase block font-sans">Density Multiplier</span>
                  <span className="text-white">{activeStep.density}x</span>
                </div>
              </div>

            </CardContent>
          </Card>
        </div>

      </div>

      {/* 3. Continuous Learning Engine Loop & Decision History Auditor */}
      <AILearningEngine />

      {/* 4. Operational Performance Trends Dashboard */}
      <OperationalInsights />

    </div>
  );
}
