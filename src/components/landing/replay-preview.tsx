"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { 
  History, 
  Lock,
  LockOpen
} from "lucide-react";

interface CompareAspect {
  id: number;
  label: string;
  beforeTitle: string;
  beforeDesc: string;
  beforeMetric: string;
  afterTitle: string;
  afterDesc: string;
  afterMetric: string;
  benefitPercent: string;
  metricType: "queue" | "wait" | "transit" | "safety" | "carbon" | "accessibility";
}

export function ReplayPreview() {
  const [activeAspect, setActiveAspect] = useState<number>(0);

  const aspects: CompareAspect[] = [
    {
      id: 0,
      label: "Queue (Turnstiles)",
      beforeTitle: "Gate B Backups",
      beforeDesc: "Crowd flow is unmonitored. Turnstiles at Gate B experience excessive load, and wait times spike to 28 minutes under heavy ingress.",
      beforeMetric: "28m Queue",
      afterTitle: "Dynamic LED Redirect",
      afterDesc: "StadiumPulse AI detects the ingress rate anomaly and updates outer LED gates boards to route crowd to Gate A North.",
      afterMetric: "4m Queue",
      benefitPercent: "85% reduction",
      metricType: "queue"
    },
    {
      id: 1,
      label: "Wait (Restrooms)",
      beforeTitle: "Concourse Gridlock",
      beforeDesc: "Restrooms in Sector 112 overflow with crowd lines during halftime. Wait times spike to 9m while Sector 103 remains empty.",
      beforeMetric: "9m wait",
      afterTitle: "Load Balancing Alerts",
      afterDesc: "Push notifications prompt fans to nearby, clear restrooms and concessions in Sector 103, optimizing stadium pathways.",
      afterMetric: "2m wait",
      benefitPercent: "77% faster",
      metricType: "wait"
    },
    {
      id: 2,
      label: "Transit (Express Rail)",
      beforeTitle: "Mass Exit Blockages",
      beforeDesc: "Platform 3 rail express train delays block inner egress lanes, while shuttle loop buses get stuck in outer highway jams.",
      beforeMetric: "24m delay",
      afterTitle: "Coordinated Dispatches",
      afterDesc: "AI companion syncs rail departures with local buses, spacing out egress loop exits and reducing platform gridlocks.",
      afterMetric: "9m delay",
      benefitPercent: "15m saved",
      metricType: "transit"
    },
    {
      id: 3,
      label: "Safety (Medic Dispatch)",
      beforeTitle: "Blocked Access Ramps",
      beforeDesc: "A medical emergency in Sector 112 gets delayed as first responders attempt to navigate ramps congested with egress fans.",
      beforeMetric: "7.8m dispatch",
      afterTitle: "EMT Corridor Clearance",
      afterDesc: "Operations dispatcher temporarily redirects pedestrian dispatches to alternate corridors, clearing the ramp for EMT carts.",
      afterMetric: "2.4m dispatch",
      benefitPercent: "3.2x faster",
      metricType: "safety"
    },
    {
      id: 4,
      label: "Carbon (Solar Dome)",
      beforeTitle: "Unoptimized Dome Grid",
      beforeDesc: "Dome roof status and solar battery charging rates are unmonitored. High energy consumption with zero carbon tracking.",
      beforeMetric: "0g carbon offset",
      afterTitle: "Solar Offsets Sync",
      afterDesc: "Active charging trackers log carbon credits, offsetting 1,200g of carbon per family and updating companion diaries.",
      afterMetric: "1,200g offset",
      benefitPercent: "100% tracked",
      metricType: "carbon"
    },
    {
      id: 5,
      label: "Accessibility (Step-Free)",
      beforeTitle: "Elevator Outages",
      beforeDesc: "Wheelchair users arriving at Sector 112 elevators get stranded due to unflagged mechanical outages on concourse lifts.",
      beforeMetric: "Corridor blocked",
      afterTitle: "Solve Step-Free Detour",
      afterDesc: "Maps solver automatically routes accessible detours to Elevator B West, granting immediate step-free passage.",
      afterMetric: "3m detour",
      benefitPercent: "Zero barriers",
      metricType: "accessibility"
    }
  ];

  const active = aspects[activeAspect];

  return (
    <section id="ai-replay-preview" className="py-28 bg-[#030305] border-t border-neutral-900 px-6 scroll-mt-16 relative">
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />
      
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header Block */}
        <div className="max-w-3xl text-left space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-victory-gold/10 border border-victory-gold/20 text-victory-gold text-xs font-semibold uppercase tracking-widest font-mono">
            <History className="h-3.5 w-3.5 animate-pulse" />
            <span>Continuous Learning Operations</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-extrabold font-display text-white tracking-tight leading-none">
            Before vs After
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            StadiumPulse AI optimizes complex matchday systems. Use the timeline slider below to evaluate the measurable impact of cognitive AI orchestration.
          </p>
        </div>

        {/* Timeline Slider Cockpit */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left panel: Timeline Scrubber (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            <Card variant="glass" className="p-6 border-neutral-850 bg-neutral-950/60 backdrop-blur-xl flex-grow flex flex-col justify-between">
              
              <div className="space-y-6">
                <div className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest font-mono border-b border-neutral-900 pb-3 flex items-center justify-between">
                  <span>METRICS SCRUBBER PANEL</span>
                  <span className="text-victory-gold font-bold">COCKPIT // INP</span>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-xs text-white font-extrabold uppercase tracking-wide">
                    <span>{active.label}</span>
                    <span className="text-victory-gold font-mono font-bold">{active.benefitPercent}</span>
                  </div>
                  
                  {/* Slider Control */}
                  <div className="relative pt-2">
                    <input
                      type="range"
                      min="0"
                      max={aspects.length - 1}
                      value={activeAspect}
                      onChange={(e) => setActiveAspect(Number(e.target.value))}
                      className="w-full h-2 bg-neutral-900 rounded-lg appearance-none cursor-pointer accent-victory-gold focus:outline-none"
                      aria-label="Audit Aspect Slider"
                      aria-valuemin={0}
                      aria-valuemax={aspects.length - 1}
                      aria-valuenow={activeAspect}
                      aria-valuetext={active.label}
                    />
                    <div className="flex justify-between text-[9px] text-neutral-500 font-bold uppercase mt-2 font-mono">
                      <span>Queue</span>
                      <span>Wait</span>
                      <span>Transit</span>
                      <span>Safety</span>
                      <span>Carbon</span>
                      <span>Access</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom statistics display */}
              <div className="pt-6 border-t border-neutral-900 mt-6 space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-400 font-medium">Impact Category:</span>
                  <span className="text-white font-bold uppercase font-mono">{active.metricType}</span>
                </div>
                <div className="p-4 rounded-2xl bg-victory-gold/5 border border-victory-gold/20 text-victory-gold text-xs leading-relaxed font-medium">
                  StadiumPulse AI reduces friction across matchday loops. Proactive prediction eliminates bottlenecks before crowd arrivals.
                </div>
              </div>

            </Card>
          </div>

          {/* Right panel: Before vs After cards side-by-side (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col md:flex-row gap-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.3 }}
                className="w-full flex flex-col md:flex-row gap-6"
              >
                {/* Before Card */}
                <div className="flex-1 p-6 rounded-3xl border border-rose-950/40 bg-rose-950/5 relative overflow-hidden flex flex-col justify-between text-left gap-8">
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-rose-500/5 blur-[50px] pointer-events-none" />
                  
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/40 border border-rose-900/40 text-[10px] text-rose-400 font-extrabold uppercase tracking-wider font-mono">
                      <Lock className="h-3.5 w-3.5 text-rose-500" />
                      WITHOUT STADUMPULSE AI
                    </div>
                    <h4 className="text-lg font-bold text-white font-display mt-2 leading-tight">{active.beforeTitle}</h4>
                    <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">{active.beforeDesc}</p>
                  </div>
                  
                  <div className="text-3xl font-extrabold text-rose-500 font-mono tracking-tight border-t border-neutral-900 pt-4 mt-auto">
                    {active.beforeMetric}
                  </div>
                </div>

                {/* After Card */}
                <div className="flex-1 p-6 rounded-3xl border border-cyber-green/30 bg-cyber-green/5 relative overflow-hidden flex flex-col justify-between text-left gap-8">
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-cyber-green/5 blur-[50px] pointer-events-none" />
                  
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyber-green/10 border border-cyber-green/20 text-[10px] text-cyber-green font-extrabold uppercase tracking-wider font-mono">
                      <LockOpen className="h-3.5 w-3.5 text-cyber-green" />
                      WITH STADUMPULSE AI
                    </div>
                    <h4 className="text-lg font-bold text-white font-display mt-2 leading-tight">{active.afterTitle}</h4>
                    <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">{active.afterDesc}</p>
                  </div>
                  
                  <div className="text-3xl font-extrabold text-cyber-green font-mono tracking-tight border-t border-neutral-900 pt-4 mt-auto flex items-center justify-between">
                    <span>{active.afterMetric}</span>
                    <span className="text-[10px] text-victory-gold font-bold uppercase tracking-widest bg-victory-gold/10 px-2 py-0.5 rounded border border-victory-gold/20">Active</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
