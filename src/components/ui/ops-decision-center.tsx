"use client";

import React from "react";
import Image from "next/image";
import { useMatchStore } from "@/stores/useMatchStore";
import { useUiStore } from "@/stores/useUiStore";
import { MultiAgentOrchestrator } from "@/services/multi-agent/orchestrator";
import { PlaybookService } from "@/services/playbooks/playbook.service";
import { TelemetryPublisher } from "@/lib/event-bus/event.publisher";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./card";
import { 
  Activity, 
  Sparkles, 
  Leaf, 
  AlertTriangle, 
  CheckSquare, 
  Users, 
  ArrowRight 
} from "lucide-react";

export function OpsDecisionCenter() {
  const { 
    currentPhase, 
    crowdDensityMultiplier, 
    activeEmergency, 
    domeStatus, 
    attendance 
  } = useMatchStore();

  const { wheelchairRerouting } = useUiStore();

  // 1. Calculate Stadium Health index
  const getStadiumHealth = (): { score: number; color: string; label: string } => {
    let score = 98;
    if (activeEmergency) score -= 35;
    if (crowdDensityMultiplier > 1.3) score -= 15;
    if (domeStatus === "closed") score -= 5;
    score = Math.max(10, score);

    if (score >= 85) return { score, color: "text-cyber-green border-cyber-green bg-cyber-green/10", label: "STABLE" };
    if (score >= 60) return { score, color: "text-amber-400 border-amber-400/40 bg-amber-400/10", label: "WARNING" };
    return { score, color: "text-rose-500 border-rose-500/40 bg-rose-500/10 animate-pulse", label: "CRITICAL" };
  };

  const health = getStadiumHealth();

  // 2. Fetch Multi-Agent coordinated advisories
  const agentAlerts = MultiAgentOrchestrator.orchestrate(
    currentPhase,
    crowdDensityMultiplier,
    domeStatus,
    wheelchairRerouting,
    activeEmergency
  );

  // 3. Resolve active Incident Playbook
  const activePlaybook = activeEmergency ? PlaybookService.getPlaybook(activeEmergency) : null;


  // 5. Calculate Sustainability offsets
  const getSustainabilityMetrics = () => {
    // Carbon saved calculations based on attendance and phase
    const baseSavings = Math.round(attendance * 0.05 * crowdDensityMultiplier);
    return {
      transitAdoptionPercentage: Math.min(Math.round(72 * crowdDensityMultiplier), 95),
      emissionsSavedKg: baseSavings,
      wasteCapacityPercentage: Math.min(Math.round(38 * crowdDensityMultiplier), 100),
      waterLoadPercentage: Math.min(Math.round(82 * crowdDensityMultiplier), 100)
    };
  };

  const sustainability = getSustainabilityMetrics();

  // 6. Generate Proactive operational narrative
  const getProactiveNarrative = () => {
    if (activeEmergency) {
      return {
        situation: `Incident alert [${activeEmergency}] dispatched.`,
        analysis: "Safety clearance lanes require immediate redirection. Access ramp blockage risks forming near Core West.",
        confidence: 96,
        recommendation: "Deploy evacuation playbook. Route all incoming security streams to Gate A North.",
        outcome: "Avoids choke point formation; secures 3-minute medic transit clearance."
      };
    }

    switch (currentPhase) {
      case "gate-entry":
        return {
          situation: "Gate B turnstiles clearance rate dropping.",
          analysis: "Queue growth rate is +6 min per 10m. Designs threshold overflow expected in 8 mins.",
          confidence: 94,
          recommendation: "Redirect 18% of Gate B queue to Gate A North using LED boards.",
          outcome: "Reduces average ingress wait time by 11 minutes."
        };
      case "halftime":
        return {
          situation: "Sector 112 restroom occupancy peaked.",
          analysis: "Wait times at Sector 112 toilets exceed 9 mins. Sector 103 remains clear.",
          confidence: 91,
          recommendation: "Send seat-side notifications routing fans to Sector 103 restrooms.",
          outcome: "Balances facility loads; reduces maximum queue wait times to 3 mins."
        };
      case "exit":
        return {
          situation: "Egress flow peaking. Shuttle expresses congested.",
          analysis: "Highway congestion delay is +24m. Rail Express platform 3 is ready.",
          confidence: 98,
          recommendation: "Broadcast rail boarding schedules. Delay shuttle bus departures.",
          outcome: "Speeds up egress dispersal times by 15 minutes."
        };
      default:
        return {
          situation: "Ingress and operations normal.",
          analysis: "All crowd densities hold below capacity limits. Dome climate open.",
          confidence: 99,
          recommendation: "Maintain current solar charging and volunteers dispatch schedules.",
          outcome: "Preserves stadium health at stable 98% rating."
        };
    }
  };

  const narrative = getProactiveNarrative();

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-left font-sans">
      
      {/* Narrative & Decision Cards (8 Cols) */}
      <div className="md:col-span-8 flex flex-col gap-6">
        <Card variant="glass" className="border-neutral-800 bg-neutral-950/60 backdrop-blur-xl relative overflow-hidden flex-grow">
          <CardHeader className="pb-3 flex flex-row items-center justify-between border-b border-neutral-900">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full overflow-hidden border border-cyber-green/30 flex-shrink-0">
                <Image src="/images/coordinator_avatar.jpg" alt="Operations Coordinator" width={40} height={40} className="h-full w-full object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-cyber-green font-bold text-xs uppercase tracking-wider font-display">
                  <Sparkles className="h-4.5 w-4.5 animate-pulse" />
                  AI Operations Center
                </div>
                <CardTitle className="text-white text-lg">Proactive Decision Advisor</CardTitle>
              </div>
            </div>
            
            {/* Health index badge */}
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border font-bold text-xs uppercase tracking-wider font-display ${health.color}`}>
              <Activity className="h-4 w-4" />
              <span>Health: {health.score} ({health.label})</span>
            </div>
          </CardHeader>

          <CardContent className="pt-4 flex flex-col gap-4 text-xs">
            {/* Narrative timeline cards */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              <div className="p-3.5 bg-neutral-900/40 border border-neutral-800 rounded-xl">
                <div className="text-[10px] text-neutral-500 font-bold uppercase mb-1">Situation</div>
                <p className="text-white font-medium">{narrative.situation}</p>
              </div>
              <div className="p-3.5 bg-neutral-900/40 border border-neutral-800 rounded-xl sm:col-span-2">
                <div className="text-[10px] text-neutral-500 font-bold uppercase mb-1">AI Predictive Analysis</div>
                <p className="text-neutral-300">{narrative.analysis}</p>
              </div>
              <div className="p-3.5 bg-neutral-900/40 border border-neutral-800 rounded-xl">
                <div className="text-[10px] text-neutral-500 font-bold uppercase mb-1">Confidence</div>
                <p className="text-cyber-green font-bold text-base">{narrative.confidence}%</p>
              </div>
              <div className="p-3.5 bg-neutral-900/40 border border-neutral-800 rounded-xl">
                <div className="text-[10px] text-neutral-500 font-bold uppercase mb-1">Expected Outcome</div>
                <p className="text-neutral-300">{narrative.outcome}</p>
              </div>
            </div>

            {/* Recommended action action banner */}
            <div className="p-4 rounded-xl border border-cyber-green/20 bg-cyber-green/5 flex items-center justify-between gap-4">
              <div>
                <div className="text-[9px] text-cyber-green font-bold uppercase tracking-wider mb-0.5">Recommended Dispatch Command</div>
                <p className="text-white font-semibold text-xs leading-normal">{narrative.recommendation}</p>
              </div>
              <button 
                onClick={() => {
                  TelemetryPublisher.publish("CROWD_LEVEL_CHANGED", { type: "dispatch_action_executed" });
                  alert(`Operations dispatch command broadcasted: ${narrative.recommendation}`);
                }}
                className="px-3.5 py-2 rounded-xl bg-cyber-green hover:bg-cyber-green-hover text-black font-bold flex items-center gap-1.5 transition-colors text-xs"
              >
                Execute
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Playbook checklist rendering (renders only during incident simulation) */}
        {activePlaybook && (
          <Card variant="glass" className="border-rose-500/20 bg-neutral-950/60 backdrop-blur-xl text-xs">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 text-rose-500 font-bold text-xs uppercase tracking-wider font-display">
                <AlertTriangle className="h-4 w-4 animate-bounce" />
                Playbook: {activePlaybook.title}
              </div>
              <CardDescription className="text-neutral-400 text-xs">
                Checklist actions coordinated across stadium dispatch units.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2 text-left">
                <div className="text-[10px] text-neutral-500 font-bold uppercase">Immediate Actions</div>
                <div className="flex flex-col gap-2">
                  {activePlaybook.actions.map((act, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-neutral-200">
                      <CheckSquare className="h-4 w-4 text-rose-500 flex-shrink-0" />
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3 text-left">
                <div>
                  <div className="text-[10px] text-neutral-500 font-bold uppercase mb-1">Responsible Teams</div>
                  <div className="flex flex-wrap gap-1.5">
                    {activePlaybook.teams.map((team, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-300 font-medium">
                        {team}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="p-3 bg-neutral-900/40 border border-neutral-800 rounded-xl">
                  <div className="text-[9px] text-rose-400 font-bold uppercase mb-0.5">Fan Broadcast Warning</div>
                  <p className="text-neutral-300 leading-normal italic">&quot;{activePlaybook.broadcastingMessage}&quot;</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Sustainability & Agents Coordination (4 Cols) */}
      <div className="md:col-span-4 flex flex-col gap-6">
        
        {/* Sustainability Carbon metrics */}
        <Card variant="glass" className="border-neutral-800 bg-neutral-950/60 backdrop-blur-xl">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-1.5 text-eco-green font-bold text-xs uppercase tracking-wider font-display">
              <Leaf className="h-4 w-4" />
              Sustainability Intelligence
            </div>
            <CardTitle className="text-white text-base">Carbon Offsets</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-neutral-900/40 border border-neutral-800 rounded-xl">
              <div className="text-[9px] text-neutral-500 font-bold uppercase">Transit Share</div>
              <div className="text-base font-bold text-white mt-0.5">{sustainability.transitAdoptionPercentage}%</div>
              <div className="text-[9px] text-neutral-400">Rail / Shuttle adoption</div>
            </div>

            <div className="p-3 bg-neutral-900/40 border border-neutral-800 rounded-xl">
              <div className="text-[9px] text-neutral-500 font-bold uppercase">Carbon Saved</div>
              <div className="text-base font-bold text-eco-green mt-0.5">{sustainability.emissionsSavedKg} kg</div>
              <div className="text-[9px] text-neutral-400">CO2 offset vs cars</div>
            </div>

            <div className="p-3 bg-neutral-900/40 border border-neutral-800 rounded-xl">
              <div className="text-[9px] text-neutral-500 font-bold uppercase">Waste Volume</div>
              <div className="text-base font-bold text-white mt-0.5">{sustainability.wasteCapacityPercentage}%</div>
              <div className="text-[9px] text-neutral-400">Bin capacity sensors</div>
            </div>

            <div className="p-3 bg-neutral-900/40 border border-neutral-800 rounded-xl">
              <div className="text-[9px] text-neutral-500 font-bold uppercase">Recycling Index</div>
              <div className="text-base font-bold text-eco-green mt-0.5">A+ Rating</div>
              <div className="text-[9px] text-neutral-400">Concession rating</div>
            </div>
          </CardContent>
        </Card>

        {/* Multi-Agent Coordination logs */}
        <Card variant="glass" className="border-neutral-800 bg-neutral-950/60 backdrop-blur-xl flex-grow flex flex-col">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-1.5 text-electric-cyan font-bold text-xs uppercase tracking-wider font-display">
              <Users className="h-4 w-4" />
              Multi-Agent Engine
            </div>
            <CardTitle className="text-white text-base">Orchestrated Advisories</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col gap-2.5 max-h-[220px] overflow-y-auto pr-1">
            {agentAlerts.map((alt, idx) => (
              <div key={idx} className="p-2.5 rounded-xl border border-neutral-900 bg-neutral-950/40 text-[11px] text-neutral-200 leading-normal flex items-start gap-2 relative overflow-hidden">
                <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase ${
                  alt.severity === "critical" ? "bg-rose-950 text-rose-400" : alt.severity === "warning" ? "bg-amber-950 text-amber-400" : "bg-neutral-900 text-neutral-400"
                }`}>
                  {alt.agentName}
                </span>
                <span>{alt.message}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
