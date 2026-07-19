"use client";

import React from "react";
import { useMatchStore, MatchPhase } from "@/stores/useMatchStore";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./card";
import { Compass, CheckCircle2, Sparkles, Bot } from "lucide-react";

interface Checkpoint {
  id: string;
  label: string;
  description: string;
  phases: MatchPhase[];
  aiGuidance: string;
}

const CHECKPOINTS: Checkpoint[] = [
  {
    id: "hotel",
    label: "Depart Hotel",
    description: "Prepare tickets and transit routes",
    phases: ["pre-match"],
    aiGuidance:
      "Welcome to matchday! Meadowlands rail links are running on-time. Make sure to download your mobile ticket TKT-128456-M89D to your offline wallet before departing.",
  },
  {
    id: "transit",
    label: "Metro Transit",
    description: "Travel to Secaucus Junction link",
    phases: ["arrival"],
    aiGuidance:
      "Fan shuttle bus lines are congested (24 min wait). Meadowlands express rail is recommended; trains are departing every 10 minutes from platform 3.",
  },
  {
    id: "security",
    label: "Security Check",
    description: "Venue bag & security scan",
    phases: ["security"],
    aiGuidance:
      "Bag scanners are experiencing average throughput. Avoid the central terminal corridors; walk around to the North perimeter for shorter lanes.",
  },
  {
    id: "gate",
    label: "Gate Ingress",
    description: "Ticket scan & turnstiles",
    phases: ["gate-entry"],
    aiGuidance:
      "Gate B is congested (28 min queue). StadiumPulse recommends rerouting to Gate A North; walk time is 4 minutes and has immediate entry.",
  },
  {
    id: "seat",
    label: "Locate Seat",
    description: "Concourse lift cores navigation",
    phases: ["find-seat", "pre-kickoff", "kickoff", "second-half"],
    aiGuidance:
      "Your seat is in Sector 112, Row F. Ingress via the West Lift Core for step-free ramps. Lifts are fully operational.",
  },
  {
    id: "break",
    label: "Concessions",
    description: "Halftime breaks & food queues",
    phases: ["halftime"],
    aiGuidance:
      "Halftime is active. Restroom Sector 103 queue is 2 minutes. For tacos, check El Tri Tacos at Sector 102 (4 min wait) rather than the Maple counter.",
  },
  {
    id: "exit",
    label: "Exit Stadium",
    description: "Rideshare zones & shuttle queues",
    phases: ["full-time", "exit", "post-match"],
    aiGuidance:
      "Match has concluded. Exits are active. Rideshare Zone 1 is heavily congested (35 min surge). Take Metro Transit loops from Gate A exit gates.",
  },
];

export function JourneyPlanner() {
  const currentPhase = useMatchStore((state) => state.currentPhase);

  // Determine active checkpoint index based on phases mapping
  const activeIndex = CHECKPOINTS.findIndex((c) => c.phases.includes(currentPhase));
  const activeCheckpoint = CHECKPOINTS[activeIndex >= 0 ? activeIndex : 0];

  return (
    <Card
      variant="glass"
      className="text-left border-neutral-800 bg-neutral-950/60 backdrop-blur-xl flex flex-col h-full"
    >
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 text-electric-cyan font-bold text-xs uppercase tracking-wider font-display">
          <Compass className="h-4 w-4" />
          Smart Journey Planner
        </div>
        <CardTitle className="text-white text-lg">Active Matchday Track</CardTitle>
        <CardDescription className="text-neutral-400 text-xs">
          Interactive journey checkpoints adapting to the match state.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-grow flex flex-col gap-4">
        {/* Checkpoint Track List */}
        <div className="flex flex-col gap-3 relative pl-6 border-l border-neutral-800 ml-3">
          {CHECKPOINTS.map((c, idx) => {
            const isCompleted = idx < activeIndex;
            const isActive = idx === activeIndex;

            return (
              <div key={c.id} className="relative flex flex-col gap-0.5">
                {/* Node Dot */}
                <div
                  className={`absolute -left-[31px] top-1 h-4.5 w-4.5 rounded-full flex items-center justify-center border transition-all ${
                    isActive
                      ? "bg-electric-cyan border-electric-cyan glow-cyan scale-110"
                      : isCompleted
                        ? "bg-neutral-800 border-neutral-800 text-cyber-green"
                        : "bg-neutral-950 border-neutral-800"
                  }`}
                >
                  {isCompleted && <CheckCircle2 className="h-3 w-3 text-cyber-green" />}
                </div>

                {/* Text Details */}
                <div className="text-left">
                  <div
                    className={`text-xs font-bold leading-tight uppercase ${
                      isActive ? "text-white" : "text-neutral-500"
                    }`}
                  >
                    {c.label}
                  </div>
                  <div className="text-[10px] text-neutral-400 font-medium leading-normal">
                    {c.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* AI Explainer Box for Active Checkpoint */}
        <div className="mt-auto p-4 rounded-xl border border-electric-cyan/20 bg-cyan-950/20 backdrop-blur-md relative overflow-hidden flex flex-col gap-2">
          {/* Decorative Corner Glow */}
          <div className="absolute top-0 right-0 w-12 h-12 bg-electric-cyan/5 rounded-full blur-xl pointer-events-none" />

          <div className="flex items-center gap-1.5 text-electric-cyan font-bold text-[10px] uppercase tracking-wider font-display">
            <Bot className="h-4 w-4" />
            AI Journey Advisor
            <Sparkles className="h-3 w-3 text-cyber-green ml-auto animate-pulse" />
          </div>

          <p className="text-xs text-neutral-200 leading-relaxed text-left">
            {activeCheckpoint.aiGuidance}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
