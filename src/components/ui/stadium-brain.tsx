"use client";

import React from "react";
import { useMatchStore } from "@/stores/useMatchStore";
import { useUiStore } from "@/stores/useUiStore";
import { StadiumHealthEngineService } from "@/services/health-engine.service";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./card";
import { Cpu, Activity, HelpCircle, TrendingUp, AlertCircle, FileText, Clock } from "lucide-react";

export function AIStadiumBrain() {
  const { currentPhase, crowdDensityMultiplier, activeEmergency, domeStatus } = useMatchStore();

  const { selectedLanguage, wheelchairRerouting } = useUiStore();

  // Compute live health values
  const health = StadiumHealthEngineService.computeHealth(
    currentPhase,
    crowdDensityMultiplier,
    domeStatus,
    activeEmergency
  );

  // Generate XAI explainable parameters dynamically
  const getExplanation = () => {
    if (activeEmergency) {
      if (activeEmergency.includes("LOST CHILD")) {
        return {
          why: "Child separation report triggered immediate lock and security sweep procedures.",
          evidence: [
            "Active Dispatch Emergency: LOST CHILD SEC 110",
            `Ingress Crowd Multiplier: ${Math.round(crowdDensityMultiplier * 100)}%`,
            "Exit turnstiles lock command active",
          ],
          impact: "Locks security perimeter; alerts all 800 volunteers in Sector 110-112 grid.",
          related: "Gate B turnstile readers load balancing suspended.",
        };
      }
      if (activeEmergency.includes("MEDICAL")) {
        return {
          why: "Section 112 medical quad requested emergency pathway clearance.",
          evidence: [
            "Active Dispatch Emergency: MEDICAL INJURY SEC 112",
            "Emergency vehicle corridor sensor active",
            `Active wheelchair rerouting: ${wheelchairRerouting ? "YES" : "NO"}`,
          ],
          impact: "Redirects pedestrian flow; maintains clear 3-minute transit road for EMT quads.",
          related: "Gate A North ingress queue speed adjustments.",
        };
      }
      if (activeEmergency.includes("RAIL") || activeEmergency.includes("STRIKE")) {
        return {
          why: "Rail Platforms 3 & 4 suspension requires shifting transport demand to shuttle loops.",
          evidence: [
            "Active Emergency: RAILWAY EXPRESS STRIKE",
            "Platform 3 departure count: 0",
            "Shuttle queue bus request: +15 buses",
          ],
          impact:
            "Diverts 8,000 exiting fans from rail lines to Platform 5 Shuttle express bus lines.",
          related: "Rideshare Zone 1 surge alerts pushed to companion apps.",
        };
      }
    }

    switch (currentPhase) {
      case "gate-entry":
        return {
          why: "Gate B turnstile flow capacity exceeded safe design throughput thresholds.",
          evidence: [
            `Ingress crowd multiplier: ${Math.round(crowdDensityMultiplier * 100)}%`,
            "Gate B wait queue: 28 mins",
            "Gate A North wait queue: 3 mins",
          ],
          impact: "Balances turnstile loads; reduces maximum entry wait times by 11 minutes.",
          related: "Walkway LED routing arrow screens updated.",
        };
      case "halftime":
        return {
          why: "Concourse bathroom capacity overloaded near Sector 112 during halftime rush.",
          evidence: [
            "Concourse Sector 112 queue count: 180 fans",
            "Sector 103 restroom queue wait: 2 mins",
            `Selected language: ${selectedLanguage.toUpperCase()}`,
          ],
          impact:
            "Load balances restroom facilities; reduces concession-line friction for families.",
          related: "El Tri Tacos concession queue alerts pushed to seat rows.",
        };
      case "exit":
        return {
          why: "Egress dispersals require maximizing public transport flow rates to clear stadium loops.",
          evidence: [
            `Exit density multiplier: ${Math.round(crowdDensityMultiplier * 100)}%`,
            "Manhattan Express Bus delay: 24 mins",
            "Meadowlands Rail platform status: open",
          ],
          impact:
            "Clears outer stadium rings 15 minutes faster; coordinates rail express departures.",
          related: "Subway loop coordination sync active.",
        };
      default:
        return {
          why: "Operations running smoothly under standard scheduler rules.",
          evidence: [
            "All systems reporting normal offsets",
            `Stadium dome roof status: ${domeStatus.toUpperCase()}`,
          ],
          impact: "Preserves carbon offset scores; ensures zero queue backing at checkpoints.",
          related: "Solar dome power grids charging.",
        };
    }
  };

  const xai = getExplanation();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left font-sans">
      {/* 1. Dynamic Stadium Brain Dashboard Panel (8 Columns) */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        <Card
          variant="glass"
          className="border-victory-gold/20 bg-neutral-950/60 backdrop-blur-xl relative overflow-hidden flex-grow glow-gold"
        >
          <CardHeader className="pb-3 flex flex-row items-center justify-between border-b border-neutral-900">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-victory-gold/10 border border-victory-gold/20 text-victory-gold">
                <Cpu className="h-5 w-5 animate-pulse" />
              </div>
              <div>
                <CardTitle className="text-white text-lg">AI Stadium Brain</CardTitle>
                <CardDescription className="text-neutral-400 text-xs">
                  Real-time cognitive reasoning engine.
                </CardDescription>
              </div>
            </div>

            {/* Health indicators list */}
            <div className="flex gap-2 flex-wrap">
              <span className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-300 font-bold font-mono">
                Pulse: {health.operationalPulse}%
              </span>
              <span className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-300 font-bold font-mono">
                Stability: {health.operationalStability}%
              </span>
              <span className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-300 font-bold font-mono">
                Confidence: {health.aiConfidence}%
              </span>
            </div>
          </CardHeader>

          <CardContent className="pt-4 flex flex-col gap-4 text-xs">
            {/* Situation analysis card */}
            <div className="p-4 rounded-xl border border-neutral-900 bg-neutral-900/30 space-y-2">
              <div className="flex items-center gap-1.5 text-victory-gold font-bold uppercase tracking-wider text-[10px]">
                <Activity className="h-3.5 w-3.5" />
                Stadium Operations Pulse Forecast
              </div>
              <p className="text-white font-medium text-xs leading-relaxed">
                &quot;{health.forecast}&quot;
              </p>
            </div>

            {/* Explainable AI block */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="space-y-3">
                <div className="p-3 bg-neutral-900/40 border border-neutral-850 rounded-xl relative overflow-hidden">
                  <div className="absolute left-0 top-0 w-1 h-full bg-victory-gold" />
                  <div className="text-[10px] text-neutral-500 font-bold uppercase mb-1 flex items-center gap-1">
                    <HelpCircle className="h-3.5 w-3.5 text-victory-gold" />
                    Why this recommendation?
                  </div>
                  <p className="text-neutral-200 leading-normal">{xai.why}</p>
                </div>

                <div className="p-3 bg-neutral-900/40 border border-neutral-850 rounded-xl relative overflow-hidden">
                  <div className="absolute left-0 top-0 w-1 h-full bg-eco-green" />
                  <div className="text-[10px] text-neutral-500 font-bold uppercase mb-1 flex items-center gap-1">
                    <TrendingUp className="h-3.5 w-3.5 text-eco-green" />
                    Expected Outcome / Impact
                  </div>
                  <p className="text-neutral-200 leading-normal">{xai.impact}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-neutral-900/40 border border-neutral-850 rounded-xl">
                  <div className="text-[10px] text-neutral-500 font-bold uppercase mb-1 flex items-center gap-1">
                    <FileText className="h-3.5 w-3.5 text-neutral-400" />
                    Evidence Factors Checked
                  </div>
                  <div className="flex flex-col gap-1.5 font-mono text-[10px] text-neutral-300">
                    {xai.evidence.map((ev, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <span className="h-1 w-1 bg-victory-gold rounded-full" />
                        <span>{ev}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-neutral-900/40 border border-neutral-850 rounded-xl">
                  <div className="text-[10px] text-neutral-500 font-bold uppercase mb-1 flex items-center gap-1">
                    <AlertCircle className="h-3.5 w-3.5 text-neutral-400" />
                    Related Telemetry Events
                  </div>
                  <div className="font-semibold text-neutral-300 flex items-center gap-1.5">
                    <Clock className="h-3 w-3 text-neutral-400" />
                    <span>{xai.related}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 2. Health Engine Stability Metrics Gauges (4 Columns) */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        <Card
          variant="glass"
          className="border-neutral-850 bg-neutral-950/60 backdrop-blur-xl flex-grow flex flex-col justify-between"
        >
          <CardHeader className="pb-2">
            <div className="flex items-center gap-1.5 text-cyber-green font-bold text-xs uppercase tracking-wider font-display">
              <Activity className="h-4 w-4" />
              Pulse Engine
            </div>
            <CardTitle className="text-white text-base">Stability Metrics</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col gap-4 justify-center">
            {/* Operational Stability slider representation */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-bold text-neutral-400 uppercase">
                <span>Operational Stability</span>
                <span className="text-white">{health.operationalStability}%</span>
              </div>
              <div className="w-full bg-neutral-900 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-cyber-green transition-all duration-500"
                  style={{ width: `${health.operationalStability}%` }}
                />
              </div>
            </div>

            {/* Recovery Index slider representation */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-bold text-neutral-400 uppercase">
                <span>Recovery Index</span>
                <span className="text-white">{health.recoveryIndex}%</span>
              </div>
              <div className="w-full bg-neutral-900 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-cyan-400 transition-all duration-500"
                  style={{ width: `${health.recoveryIndex}%` }}
                />
              </div>
            </div>

            {/* AI Confidence slider representation */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-bold text-neutral-400 uppercase">
                <span>AI Confidence Rating</span>
                <span className="text-white">{health.aiConfidence}%</span>
              </div>
              <div className="w-full bg-neutral-900 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-victory-gold transition-all duration-500 animate-pulse"
                  style={{ width: `${health.aiConfidence}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
