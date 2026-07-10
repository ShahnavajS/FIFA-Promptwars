"use client";

import React from "react";
import { useMatchStore } from "@/stores/useMatchStore";
import { Card, CardHeader, CardTitle, CardContent } from "./card";
import { 
  Eye, 
  Search, 
  BarChart2, 
  Compass, 
  PlayCircle, 
  CheckCircle,
  ArrowRight
} from "lucide-react";

export function AIReasoningTimeline() {
  const { currentPhase, crowdDensityMultiplier, activeEmergency } = useMatchStore();

  // Resolve steps dynamically
  const getTimelineSteps = () => {
    if (activeEmergency) {
      if (activeEmergency.includes("LOST CHILD")) {
        return [
          { label: "Observed", desc: "Volunteer Sector 110 reports separated minor.", icon: Eye, color: "text-amber-400 bg-amber-400/10 border-amber-400/20" },
          { label: "Detected", desc: "Safety incident minor separated.", icon: Search, color: "text-rose-500 bg-rose-500/10 border-rose-500/20" },
          { label: "Analyzed", desc: "Grid focus concession area Sector 110.", icon: BarChart2, color: "text-rose-500 bg-rose-500/10 border-rose-500/20" },
          { label: "Predicted", desc: "High probability minor remains in concourse ring.", icon: Compass, color: "text-rose-500 bg-rose-500/10 border-rose-500/20" },
          { label: "Action", desc: "Trigger search playbook; lock exits.", icon: PlayCircle, color: "text-rose-500 bg-rose-500/10 border-rose-500/20" },
          { label: "Expected Result", desc: "Family reunited at Security Hub North.", icon: CheckCircle, color: "text-cyber-green bg-cyber-green/10 border-cyber-green/20" }
        ];
      }
      if (activeEmergency.includes("MEDICAL")) {
        return [
          { label: "Observed", desc: "Section 112 medical quad dispatcher alert.", icon: Eye, color: "text-amber-400 bg-amber-400/10 border-amber-400/20" },
          { label: "Detected", desc: "Medical assistance dispatch coordinate active.", icon: Search, color: "text-rose-500 bg-rose-500/10 border-rose-500/20" },
          { label: "Analyzed", desc: "Concourse transit speeds low; pedestrian congestion.", icon: BarChart2, color: "text-rose-500 bg-rose-500/10 border-rose-500/20" },
          { label: "Predicted", desc: "Egress path blockages will delay medic quads.", icon: Compass, color: "text-rose-500 bg-rose-500/10 border-rose-500/20" },
          { label: "Action", desc: "Lock vehicle corridors; redirect pedestrian flow.", icon: PlayCircle, color: "text-rose-500 bg-rose-500/10 border-rose-500/20" },
          { label: "Expected Result", desc: "Secures 3-minute EMT ambulance clearance.", icon: CheckCircle, color: "text-cyber-green bg-cyber-green/10 border-cyber-green/20" }
        ];
      }
    }

    if (currentPhase === "gate-entry" || currentPhase === "security") {
      const isCritical = crowdDensityMultiplier > 1.3;
      return [
        { label: "Observed", desc: "Turnstile entry delay peaks at 28 mins.", icon: Eye, color: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20" },
        { label: "Detected", desc: "Gate B clearance rate below thresholds.", icon: Search, color: isCritical ? "text-rose-500 bg-rose-500/10" : "text-amber-400 bg-amber-400/10" },
        { label: "Analyzed", desc: "Chokepoint forming; incoming flow exceeds outputs.", icon: BarChart2, color: "text-amber-400 bg-amber-400/10" },
        { label: "Predicted", desc: "Design limit overflow expected in 8 minutes.", icon: Compass, color: "text-amber-400 bg-amber-400/10" },
        { label: "Action", desc: "Redirect 18% incoming flow to Gate A North.", icon: PlayCircle, color: "text-cyber-green bg-cyber-green/10" },
        { label: "Expected Result", desc: "Saves 11m wait time; balances ingress.", icon: CheckCircle, color: "text-cyber-green bg-cyber-green/10" }
      ];
    }

    // Default Timeline State
    return [
      { label: "Observed", desc: "Gates open; sensors tracking entry rates.", icon: Eye, color: "text-neutral-400 bg-neutral-900 border-neutral-800" },
      { label: "Detected", desc: "Clearance rate holds within targets.", icon: Search, color: "text-neutral-400 bg-neutral-900 border-neutral-800" },
      { label: "Analyzed", desc: "Transit express departures on schedule.", icon: BarChart2, color: "text-neutral-400 bg-neutral-900 border-neutral-800" },
      { label: "Predicted", desc: "No congestion overflows projected.", icon: Compass, color: "text-neutral-400 bg-neutral-900 border-neutral-800" },
      { label: "Action", desc: "Maintain default scheduler loops.", icon: PlayCircle, color: "text-neutral-400 bg-neutral-900 border-neutral-800" },
      { label: "Expected Result", desc: "Maintains optimal stability rating (98%).", icon: CheckCircle, color: "text-cyber-green bg-cyber-green/10" }
    ];
  };

  const steps = getTimelineSteps();

  return (
    <Card variant="glass" className="border-neutral-850 bg-neutral-950/60 backdrop-blur-xl text-left">
      <CardHeader className="pb-3 border-b border-neutral-900">
        <CardTitle className="text-white text-base">AI Reasoning Pipeline</CardTitle>
      </CardHeader>
      <CardContent className="pt-5 overflow-x-auto whitespace-nowrap scrollbar-none">
        
        {/* Step-by-Step Row layout */}
        <div className="flex items-start justify-between min-w-[700px] gap-2">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isLast = idx === steps.length - 1;
            
            return (
              <React.Fragment key={idx}>
                {/* Single Node */}
                <div className="flex flex-col items-center text-center max-w-[120px] flex-grow">
                  <div className={`h-9 w-9 rounded-xl border flex items-center justify-center ${s.color} transition-all duration-300`}>
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  
                  <div className="text-[10px] font-bold text-white uppercase tracking-wider mt-2.5">
                    {s.label}
                  </div>
                  <p className="text-[9px] text-neutral-400 leading-normal mt-1 whitespace-normal break-words h-12 overflow-hidden">
                    {s.desc}
                  </p>
                </div>

                {/* Connecting Arrow */}
                {!isLast && (
                  <div className="pt-3.5 flex items-center justify-center text-neutral-800">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
