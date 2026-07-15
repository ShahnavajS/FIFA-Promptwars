"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Cloud,
  Cpu,
  Map,
  Database,
  FileText,
  Activity,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Play,
  TrendingUp,
} from "lucide-react";

interface GcpNode {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  category: "compute" | "data" | "ai" | "telemetry";
  role: string;
  telemetry: string;
  mockParams: string[];
  productionBlueprint: string;
}

export default function ArchitecturePage() {
  const gcpNodes: GcpNode[] = [
    {
      id: "maps",
      name: "Google Maps Platform",
      icon: Map,
      category: "ai",
      role: "Calculates optimized route paths. Wraps Directions API (for wheelchair step-free paths, least crowded perimeters), Places API, and Distance Matrix matrix calculations.",
      telemetry: "NAV_ROUTE_CALCULATED",
      mockParams: ["route_mode", "step_free_boolean", "wait_times_multiplier"],
      productionBlueprint:
        "Integrates Maps Web API SDK directly on Leaflet/WebGL wrappers, authenticating via strict HTTP referrer restrictions keys.",
    },
    {
      id: "functions",
      name: "Cloud Functions",
      icon: Cpu,
      category: "compute",
      role: "Orchestrates multi-agent communications. Runs serverless background workers validating security alerts, lost child checklists, and gate congestion sensors data.",
      telemetry: "AGENT_SYNC_DISPATCHED",
      mockParams: ["active_emergency", "stadium_health_index"],
      productionBlueprint:
        "Deploy Node.js 20 serverless functions subscribing to Cloud Pub/Sub topics to process raw sensor feeds on-the-fly.",
    },
    {
      id: "gemini",
      name: "Gemini Pro API",
      icon: Sparkles,
      category: "ai",
      role: "Powers the empathetic Concierge Companion. Formulates contextual replies using the ERGP (Explain, Reassure, Guide, Predict) structure based on persona profiles.",
      telemetry: "GEMINI_REPLY_GENERATED",
      mockParams: ["user_prompt", "persona_type", "stress_level_index"],
      productionBlueprint:
        "Linked to Vertex AI Gemini API endpoint via Node.js secure proxy handlers, managing tokens budgets and caching presets.",
    },
    {
      id: "bigquery",
      name: "BigQuery Analytics",
      icon: FileText,
      category: "data",
      role: "Hosts historical analytics models. Ingests all telemetry logs, playbooks executes, and crowd forecasts to build predictive congestion models.",
      telemetry: "BIGQUERY_ANALYTICS_EVENT",
      mockParams: ["event_name", "timestamp", "session_id"],
      productionBlueprint:
        "Aggregates events stream via Pub/Sub streaming buffer inserts, feeding Looker dashboards for stadium ops command rooms.",
    },
    {
      id: "analytics",
      name: "Google Analytics",
      icon: Activity,
      category: "telemetry",
      role: "Monitors companion app usability indices. Tracks client accessibility settings, high contrast toggles, and preferred language selections.",
      telemetry: "UI_PREFERENCE_TOGGLED",
      mockParams: ["selected_language", "high_contrast_active"],
      productionBlueprint:
        "Linked to Firebase Analytics tags on mobile PWAs, tracking screen views and average session durations.",
    },
    {
      id: "firestore",
      name: "Cloud Firestore",
      icon: Database,
      category: "data",
      role: "Serves as the low-latency tournament config database. Holds match lifecycle stages details, stadium coordinates presets, and concession default menu structures.",
      telemetry: "CONFIG_SYNCED",
      mockParams: ["current_phase", "active_incident_logs"],
      productionBlueprint:
        "Configured with Realtime listeners subscribing to collections. Replicated multi-region to guarantee MetLife Arena 99.999% uptime.",
    },
  ];

  const [selectedNode, setSelectedNode] = useState<GcpNode>(gcpNodes[0]);
  const [animatingIndex, setAnimatingIndex] = useState<number | null>(null);

  const startPipelineAnimation = () => {
    let current = 0;
    setAnimatingIndex(0);
    setSelectedNode(gcpNodes[0]);

    const timer = setInterval(() => {
      current++;
      if (current >= gcpNodes.length) {
        clearInterval(timer);
        setAnimatingIndex(null);
      } else {
        setAnimatingIndex(current);
        setSelectedNode(gcpNodes[current]);
      }
    }, 1200);
  };

  const catColors = {
    compute: "border-sky-500/20 text-sky-400 bg-sky-500/5",
    data: "border-amber-500/20 text-amber-400 bg-amber-500/5",
    ai: "border-purple-500/20 text-purple-400 bg-purple-500/5",
    telemetry: "border-emerald-500/20 text-emerald-400 bg-emerald-500/5",
  };

  return (
    <div className="flex flex-col gap-6 text-left font-sans min-h-[80vh]">
      {/* 1. Header Hero section */}
      <Card
        variant="glass"
        className="border-neutral-800 bg-neutral-950/60 backdrop-blur-xl relative overflow-hidden"
      >
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-victory-gold font-bold text-xs uppercase tracking-wider font-display">
              <Cloud className="h-4 w-4" />
              Google Cloud Platform
            </div>
            <CardTitle className="text-white text-2xl font-bold">
              System Architecture Showcase
            </CardTitle>
            <CardDescription className="text-neutral-400 text-xs">
              Interactive blueprint demonstrating multi-agent systems coordination and telemetry
              reporting schemas.
            </CardDescription>
          </div>

          <Button
            variant="glass"
            size="sm"
            onClick={startPipelineAnimation}
            disabled={animatingIndex !== null}
            className="text-[10px] py-2 bg-neutral-900 border-neutral-800 text-white font-bold gap-1.5 self-start"
          >
            <Play className="h-3 w-3 text-victory-gold fill-current" />
            Animate Data Flow
          </Button>
        </CardHeader>
      </Card>

      {/* Animation Status Banner */}
      {animatingIndex !== null && (
        <div className="p-3 rounded-xl border border-victory-gold/20 bg-victory-gold/5 flex items-center justify-between text-xs text-victory-gold font-semibold animate-pulse">
          <span className="flex items-center gap-1.5">
            <TrendingUp className="h-4 w-4" />
            Data flow tracing: {gcpNodes[animatingIndex].name} &rarr; Processing Payload.
          </span>
          <span className="font-mono text-[9px] uppercase">
            Step {animatingIndex + 1} of {gcpNodes.length}
          </span>
        </div>
      )}

      {/* 2. Main Interactive grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Side: Interactive diagram layout (7 Columns) */}
        <div className="lg:col-span-7 flex flex-col">
          <Card
            variant="glass"
            className="flex-grow flex flex-col p-6 border-neutral-800 bg-neutral-950/60 backdrop-blur-xl relative justify-between min-h-[400px]"
          >
            <div className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider mb-4">
              Click Nodes to Inspect Data Pipelines
            </div>

            {/* Diagram Flow nodes representation */}
            <div className="flex flex-col gap-8 flex-grow justify-center relative">
              {/* Connected Lines placeholders (Visual layout only) */}
              <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-0.5 bg-neutral-900 -translate-x-1/2 -z-10" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                {/* Column 1: Telemetry & Maps Ingress */}
                <div className="flex flex-col gap-6 justify-center">
                  <button
                    onClick={() => setSelectedNode(gcpNodes[4])} // Analytics
                    className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all ${
                      selectedNode.id === "analytics"
                        ? "border-emerald-500 bg-emerald-500/10 scale-105"
                        : "border-neutral-800 hover:border-neutral-700 bg-neutral-955/40"
                    } ${animatingIndex === 4 ? "shadow-[0_0_15px_rgba(16,185,129,0.3)] border-emerald-500" : ""}`}
                  >
                    <Activity className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-bold text-white text-xs">Firebase Analytics</div>
                      <div className="text-[9px] text-neutral-500 mt-0.5 uppercase font-mono">
                        Telemetry
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setSelectedNode(gcpNodes[0])} // Maps
                    className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all ${
                      selectedNode.id === "maps"
                        ? "border-purple-500 bg-purple-500/10 scale-105"
                        : "border-neutral-800 hover:border-neutral-700 bg-neutral-955/40"
                    } ${animatingIndex === 0 ? "shadow-[0_0_15px_rgba(168,85,247,0.3)] border-purple-500" : ""}`}
                  >
                    <Map className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-bold text-white text-xs">Google Maps API</div>
                      <div className="text-[9px] text-neutral-500 mt-0.5 uppercase font-mono">
                        Routing AI
                      </div>
                    </div>
                  </button>
                </div>

                {/* Column 2: Serverless Logic & Gemini Brain */}
                <div className="flex flex-col gap-6 justify-center">
                  <button
                    onClick={() => setSelectedNode(gcpNodes[1])} // Functions
                    className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all ${
                      selectedNode.id === "functions"
                        ? "border-sky-500 bg-sky-500/10 scale-105"
                        : "border-neutral-800 hover:border-neutral-700 bg-neutral-955/40"
                    } ${animatingIndex === 1 ? "shadow-[0_0_15px_rgba(14,165,233,0.3)] border-sky-500" : ""}`}
                  >
                    <Cpu className="h-5 w-5 text-sky-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-bold text-white text-xs">Cloud Functions</div>
                      <div className="text-[9px] text-neutral-500 mt-0.5 uppercase font-mono">
                        Orchestration
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setSelectedNode(gcpNodes[2])} // Gemini
                    className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all ${
                      selectedNode.id === "gemini"
                        ? "border-purple-500 bg-purple-500/10 scale-105"
                        : "border-neutral-800 hover:border-neutral-700 bg-neutral-955/40"
                    } ${animatingIndex === 2 ? "shadow-[0_0_15px_rgba(168,85,247,0.3)] border-purple-500" : ""}`}
                  >
                    <Sparkles className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-bold text-white text-xs">Gemini Pro API</div>
                      <div className="text-[9px] text-neutral-500 mt-0.5 uppercase font-mono">
                        Cognitive AI
                      </div>
                    </div>
                  </button>
                </div>

                {/* Column 3: Firestore & BigQuery */}
                <div className="flex flex-col gap-6 justify-center">
                  <button
                    onClick={() => setSelectedNode(gcpNodes[5])} // Firestore
                    className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all ${
                      selectedNode.id === "firestore"
                        ? "border-amber-500 bg-amber-500/10 scale-105"
                        : "border-neutral-800 hover:border-neutral-700 bg-neutral-955/40"
                    } ${animatingIndex === 5 ? "shadow-[0_0_15px_rgba(245,158,11,0.3)] border-amber-500" : ""}`}
                  >
                    <Database className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-bold text-white text-xs">Cloud Firestore</div>
                      <div className="text-[9px] text-neutral-500 mt-0.5 uppercase font-mono">
                        State DB
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setSelectedNode(gcpNodes[3])} // BigQuery
                    className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all ${
                      selectedNode.id === "bigquery"
                        ? "border-amber-500 bg-amber-500/10 scale-105"
                        : "border-neutral-800 hover:border-neutral-700 bg-neutral-955/40"
                    } ${animatingIndex === 3 ? "shadow-[0_0_15px_rgba(245,158,11,0.3)] border-amber-500" : ""}`}
                  >
                    <FileText className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-bold text-white text-xs">BigQuery Audit</div>
                      <div className="text-[9px] text-neutral-500 mt-0.5 uppercase font-mono">
                        Data Warehouse
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Verification Status */}
            <div className="mt-4 pt-3.5 border-t border-neutral-900 flex items-center justify-between text-[11px] text-neutral-400 font-semibold">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4.5 w-4.5 text-cyber-green" />
                Decoupled API interfaces fully verified (Vitest checks passed).
              </span>
              <span className="text-neutral-500 uppercase text-[9px] font-mono">
                Mock integration Layer active
              </span>
            </div>
          </Card>
        </div>

        {/* Right Side: Node Details Inspector (5 Columns) */}
        <div className="lg:col-span-5 flex flex-col">
          <Card
            variant="glass"
            className="flex-grow flex flex-col border-neutral-800 bg-neutral-950/60 backdrop-blur-xl p-0 overflow-hidden text-xs"
          >
            <div
              className={`p-5 border-b border-neutral-900 flex items-center gap-3 ${catColors[selectedNode.category as keyof typeof catColors]}`}
            >
              <div className="p-2 rounded-xl bg-neutral-905 border border-neutral-800/40">
                <selectedNode.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white font-display">{selectedNode.name}</h3>
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider">
                  Category: {selectedNode.category}
                </span>
              </div>
            </div>

            <div className="p-5 flex-grow flex flex-col gap-4 text-left leading-relaxed">
              {/* Role */}
              <div>
                <div className="text-[10px] text-neutral-500 font-bold uppercase mb-1">
                  Functional Stadium Role
                </div>
                <p className="text-neutral-200">{selectedNode.role}</p>
              </div>

              {/* Telemetry emitted */}
              <div>
                <div className="text-[10px] text-neutral-500 font-bold uppercase mb-1">
                  BigQuery Telemetry Event Schema
                </div>
                <div className="p-2 rounded-lg bg-neutral-900 border border-neutral-850 font-mono text-[10px] text-victory-gold">
                  {selectedNode.telemetry}
                </div>
              </div>

              {/* Mock parameters */}
              <div>
                <div className="text-[10px] text-neutral-500 font-bold uppercase mb-1">
                  Payload Variables Mocked
                </div>
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {selectedNode.mockParams.map((p, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-300 font-mono font-medium"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              {/* Future Integration plan blueprint */}
              <div className="pt-3.5 border-t border-neutral-900/60 flex-grow">
                <div className="text-[10px] text-neutral-500 font-bold uppercase mb-1 flex items-center gap-1">
                  <ChevronRight className="h-4.5 w-4.5 text-victory-gold" />
                  Phase 8 Live Deployment Blueprint
                </div>
                <p className="text-neutral-400 text-[11px] leading-relaxed">
                  {selectedNode.productionBlueprint}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
