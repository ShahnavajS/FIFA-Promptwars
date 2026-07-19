"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useMatchStore } from "@/stores/useMatchStore";
import { useUiStore } from "@/stores/useUiStore";
import { useToastStore } from "@/stores/useToastStore";
import { MultiAgentOrchestrator } from "@/services/multi-agent/orchestrator";
import { PlaybookService } from "@/services/playbooks/playbook.service";
import { SustainabilityService } from "@/services/sustainability.service";
import { TelemetryPublisher } from "@/lib/event-bus/event.publisher";
import { Button } from "./button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./card";
import {
  Activity,
  Sparkles,
  Leaf,
  AlertTriangle,
  CheckSquare,
  Users,
  ArrowRight,
  CheckCircle2,
  Clock3,
  ShieldCheck,
} from "lucide-react";

export function OpsDecisionCenter() {
  const { currentPhase, crowdDensityMultiplier, activeEmergency, domeStatus } = useMatchStore();

  const { wheelchairRerouting } = useUiStore();
  const { addToast } = useToastStore();
  const [reviewOpen, setReviewOpen] = useState(false);
  const [decisionState, setDecisionState] = useState<"pending" | "approved" | "held">("pending");

  // 1. Calculate Stadium Health index
  const getStadiumHealth = (): { score: number; color: string; label: string } => {
    let score = 98;
    if (activeEmergency) score -= 35;
    if (crowdDensityMultiplier > 1.3) score -= 15;
    if (domeStatus === "closed") score -= 5;
    score = Math.max(10, score);

    if (score >= 85)
      return {
        score,
        color: "text-cyber-green border-cyber-green bg-cyber-green/10",
        label: "STABLE",
      };
    if (score >= 60)
      return {
        score,
        color: "text-amber-400 border-amber-400/40 bg-amber-400/10",
        label: "WARNING",
      };
    return {
      score,
      color: "text-rose-500 border-rose-500/40 bg-rose-500/10 animate-pulse",
      label: "CRITICAL",
    };
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

  // 5. Generate a proactive operational narrative.
  const getProactiveNarrative = () => {
    if (activeEmergency) {
      return {
        situation: `Incident alert [${activeEmergency}] dispatched.`,
        analysis:
          "Safety clearance lanes require immediate redirection. Access ramp blockage risks forming near Core West.",
        confidence: 96,
        recommendation:
          "Deploy evacuation playbook. Route all incoming security streams to Gate A North.",
        outcome: "Avoids choke point formation; secures 3-minute medic transit clearance.",
      };
    }

    switch (currentPhase) {
      case "gate-entry":
        return {
          situation: "Gate B turnstiles clearance rate dropping.",
          analysis:
            "Queue growth rate is +6 min per 10m. Designs threshold overflow expected in 8 mins.",
          confidence: 94,
          recommendation: "Redirect 18% of Gate B queue to Gate A North using LED boards.",
          outcome: "Reduces average ingress wait time by 11 minutes.",
        };
      case "halftime":
        return {
          situation: "Sector 112 restroom occupancy peaked.",
          analysis: "Wait times at Sector 112 toilets exceed 9 mins. Sector 103 remains clear.",
          confidence: 91,
          recommendation: "Send seat-side notifications routing fans to Sector 103 restrooms.",
          outcome: "Balances facility loads; reduces maximum queue wait times to 3 mins.",
        };
      case "exit":
        return {
          situation: "Egress flow peaking. Shuttle expresses congested.",
          analysis: "Highway congestion delay is +24m. Rail Express platform 3 is ready.",
          confidence: 98,
          recommendation: "Broadcast rail boarding schedules. Delay shuttle bus departures.",
          outcome: "Speeds up egress dispersal times by 15 minutes.",
        };
      default:
        return {
          situation: "Ingress and operations normal.",
          analysis: "All crowd densities hold below capacity limits. Dome climate open.",
          confidence: 99,
          recommendation: "Maintain current solar charging and volunteers dispatch schedules.",
          outcome: "Preserves stadium health at stable 98% rating.",
        };
    }
  };

  const narrative = getProactiveNarrative();
  const sustainability = SustainabilityService.getRecommendation(
    currentPhase,
    crowdDensityMultiplier
  );
  const requiresApproval =
    Boolean(activeEmergency) ||
    crowdDensityMultiplier >= 1.3 ||
    currentPhase === "gate-entry" ||
    currentPhase === "exit";

  const holdDecision = () => {
    setDecisionState("held");
    setReviewOpen(false);
    TelemetryPublisher.publish("OPS_DECISION_HELD", { recommendation: narrative.recommendation });
    addToast("Decision held. No dispatch was issued.", "warning");
  };

  const approveDecision = () => {
    setDecisionState("approved");
    setReviewOpen(false);
    TelemetryPublisher.publish("OPS_DECISION_APPROVED", {
      recommendation: narrative.recommendation,
      confidence: narrative.confidence,
      requiresApproval,
    });
    addToast("Decision approved and logged in the simulation audit trail.", "success");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-left font-sans">
      {/* Narrative & Decision Cards (8 Cols) */}
      <div className="md:col-span-8 flex flex-col gap-6">
        <Card
          variant="glass"
          className="border-neutral-800 bg-neutral-950/60 backdrop-blur-xl relative overflow-hidden flex-grow"
        >
          <CardHeader className="pb-3 flex flex-row items-center justify-between border-b border-neutral-900">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full overflow-hidden border border-cyber-green/30 flex-shrink-0">
                <Image
                  src="/images/coordinator_avatar.jpg"
                  alt="Operations Coordinator"
                  width={40}
                  height={40}
                  className="h-full w-full object-cover"
                />
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
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border font-bold text-xs uppercase tracking-wider font-display ${health.color}`}
            >
              <Activity className="h-4 w-4" />
              <span>
                Health: {health.score} ({health.label})
              </span>
            </div>
          </CardHeader>

          <CardContent className="pt-4 flex flex-col gap-4 text-xs">
            {/* Narrative timeline cards */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              <div className="p-3.5 bg-neutral-900/40 border border-neutral-800 rounded-xl">
                <div className="text-[10px] text-neutral-500 font-bold uppercase mb-1">
                  Situation
                </div>
                <p className="text-white font-medium">{narrative.situation}</p>
              </div>
              <div className="p-3.5 bg-neutral-900/40 border border-neutral-800 rounded-xl sm:col-span-2">
                <div className="text-[10px] text-neutral-500 font-bold uppercase mb-1">
                  AI Predictive Analysis
                </div>
                <p className="text-neutral-300">{narrative.analysis}</p>
              </div>
              <div className="p-3.5 bg-neutral-900/40 border border-neutral-800 rounded-xl">
                <div className="text-[10px] text-neutral-500 font-bold uppercase mb-1">
                  Confidence
                </div>
                <p className="text-cyber-green font-bold text-base">{narrative.confidence}%</p>
              </div>
              <div className="p-3.5 bg-neutral-900/40 border border-neutral-800 rounded-xl">
                <div className="text-[10px] text-neutral-500 font-bold uppercase mb-1">
                  Expected Outcome
                </div>
                <p className="text-neutral-300">{narrative.outcome}</p>
              </div>
            </div>

            {/* Recommended action with an explicit human review checkpoint. */}
            <div className="p-4 rounded-xl border border-cyber-green/20 bg-cyber-green/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="text-[9px] text-cyber-green font-bold uppercase tracking-wider mb-0.5">
                  Recommended Dispatch Command{" "}
                  {requiresApproval ? "· Approval Required" : "· Review Logged"}
                </div>
                <p className="text-white font-semibold text-xs leading-normal">
                  {narrative.recommendation}
                </p>
                <p className="mt-1 text-[10px] text-neutral-400">
                  Sources: simulated gate counters, transit status & accessibility route model ·
                  Scenario tick: current
                </p>
              </div>
              <Button
                variant={decisionState === "approved" ? "secondary" : "primary"}
                size="sm"
                onClick={() => {
                  TelemetryPublisher.publish("OPS_DECISION_REVIEWED", {
                    recommendation: narrative.recommendation,
                  });
                  setReviewOpen(true);
                }}
                disabled={decisionState === "approved"}
                className="shrink-0"
              >
                {decisionState === "approved" ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <ShieldCheck className="h-4 w-4" />
                )}
                {decisionState === "approved" ? "Approved" : "Review Decision"}
              </Button>
            </div>

            {reviewOpen && (
              <section
                className="rounded-xl border border-amber-400/30 bg-amber-400/5 p-4"
                aria-labelledby="decision-review-title"
                role="alertdialog"
                aria-modal="false"
              >
                <div className="flex items-start gap-3">
                  <Clock3 className="h-5 w-5 shrink-0 text-amber-400" aria-hidden="true" />
                  <div className="min-w-0">
                    <h3 id="decision-review-title" className="text-sm font-bold text-white">
                      Human Review Checkpoint
                    </h3>
                    <p className="mt-1 text-xs text-neutral-300">
                      Confirm the operational intent, local conditions, and official incident
                      channel before approving this simulated dispatch.
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap justify-end gap-2">
                  <Button variant="ghost" size="sm" onClick={holdDecision}>
                    Hold Decision
                  </Button>
                  <Button variant="primary" size="sm" onClick={approveDecision}>
                    Approve & Log
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </section>
            )}

            <p className="sr-only" aria-live="polite">
              Decision status: {decisionState}.
            </p>
          </CardContent>
        </Card>

        {/* Playbook checklist rendering (renders only during incident simulation) */}
        {activePlaybook && (
          <Card
            variant="glass"
            className="border-rose-500/20 bg-neutral-950/60 backdrop-blur-xl text-xs"
          >
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
                <div className="text-[10px] text-neutral-500 font-bold uppercase">
                  Immediate Actions
                </div>
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
                  <div className="text-[10px] text-neutral-500 font-bold uppercase mb-1">
                    Responsible Teams
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {activePlaybook.teams.map((team, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-300 font-medium"
                      >
                        {team}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-neutral-900/40 border border-neutral-800 rounded-xl">
                  <div className="text-[9px] text-rose-400 font-bold uppercase mb-0.5">
                    Fan Broadcast Warning
                  </div>
                  <p className="text-neutral-300 leading-normal italic">
                    &quot;{activePlaybook.broadcastingMessage}&quot;
                  </p>
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
            <CardTitle className="text-white text-base">Lower-Impact Travel</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-neutral-900/40 border border-neutral-800 rounded-xl">
              <div className="text-[9px] text-neutral-500 font-bold uppercase">
                Recommended Mode
              </div>
              <div className="text-base font-bold text-white mt-0.5">
                {sustainability.recommendedMode}
              </div>
              <div className="text-[9px] text-neutral-400">
                ~{sustainability.estimatedMinutes} min scenario time
              </div>
            </div>

            <div className="p-3 bg-neutral-900/40 border border-neutral-800 rounded-xl">
              <div className="text-[9px] text-neutral-500 font-bold uppercase">Avoided Impact</div>
              <div className="text-base font-bold text-eco-green mt-0.5">
                {sustainability.estimatedKgCo2eAvoidedPerThousandFans} kg
              </div>
              <div className="text-[9px] text-neutral-400">CO2e per 1,000 fans vs rideshare</div>
            </div>

            <div className="col-span-2 p-3 bg-neutral-900/40 border border-neutral-800 rounded-xl">
              <div className="text-[9px] text-neutral-500 font-bold uppercase">
                Operations Benefit
              </div>
              <p className="mt-0.5 text-[11px] text-neutral-200">
                {sustainability.operationalBenefit}
              </p>
              <p className="mt-1 text-[9px] text-neutral-500">{sustainability.dataLabel}</p>
            </div>
          </CardContent>
        </Card>

        {/* Multi-Agent Coordination logs */}
        <Card
          variant="glass"
          className="border-neutral-800 bg-neutral-950/60 backdrop-blur-xl flex-grow flex flex-col"
        >
          <CardHeader className="pb-2">
            <div className="flex items-center gap-1.5 text-electric-cyan font-bold text-xs uppercase tracking-wider font-display">
              <Users className="h-4 w-4" />
              Multi-Agent Engine
            </div>
            <CardTitle className="text-white text-base">Orchestrated Advisories</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col gap-2.5 max-h-[220px] overflow-y-auto pr-1">
            {agentAlerts.map((alt, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl border border-neutral-900 bg-neutral-950/40 text-[11px] text-neutral-200 leading-normal flex items-start gap-2 relative overflow-hidden"
              >
                <span
                  className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase ${
                    alt.severity === "critical"
                      ? "bg-rose-950 text-rose-400"
                      : alt.severity === "warning"
                        ? "bg-amber-950 text-amber-400"
                        : "bg-neutral-900 text-neutral-400"
                  }`}
                >
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
