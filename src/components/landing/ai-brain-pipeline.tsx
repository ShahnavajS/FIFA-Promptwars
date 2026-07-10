"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Database, 
  MapPin, 
  Cpu, 
  BrainCircuit, 
  Activity, 
  TrendingUp, 
  AlertCircle,
  CheckCircle2,
  Terminal
} from "lucide-react";

interface PipelineNode {
  id: string;
  label: string;
  sub: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  pulseColor: string;
  auditDetails: {
    prompt: string;
    reasoning: string[];
    confidence: string;
    evidence: string[];
    action: string;
    expectedResult: string;
  };
}

export function AIBrainPipeline() {
  const [selectedNode, setSelectedNode] = useState<string>("gemini");

  const nodes: PipelineNode[] = [
    {
      id: "telemetry",
      label: "1. Telemetry Ingress",
      sub: "BigQuery Sensors",
      icon: Database,
      color: "text-stadium-blue",
      pulseColor: "rgba(0, 110, 255, 0.4)",
      auditDetails: {
        prompt: "N/A - Stream Raw Ingestion Pipeline",
        reasoning: [
          "Collect IoT gate metrics from Gates A, B, C",
          "Compare flow rate per minute (42/min vs 120/min threshold)",
          "Calculate average queue length (1,200 fans inside loop)"
        ],
        confidence: "100.0% (Deterministic)",
        evidence: [
          "Gate B sensor ID: #9845 active",
          "Transit carriage density: 85%",
          "Shuttle wait times: 24 mins"
        ],
        action: "Stream event telemetry to BigQuery; cache config in Firestore",
        expectedResult: "Real-time sync of stadium occupancy SRE indexes"
      }
    },
    {
      id: "maps",
      label: "2. Google Maps API",
      sub: "Wayfinding Routes",
      icon: MapPin,
      color: "text-transport-cyan",
      pulseColor: "rgba(0, 229, 255, 0.4)",
      auditDetails: {
        prompt: "DIRECTIONS_API_REQUEST: Origin='Secaucus Plat 3', Destination='Sector 112, Row F', Mode='walking', StepFree=true",
        reasoning: [
          "Identify Elevator C outage on concourse path",
          "Evaluate distance matrix for alternate corridors",
          "Avoid staircases and construction in Sector 110"
        ],
        confidence: "99.4%",
        evidence: [
          "Elevator B West telemetry: operational",
          "Ramp C slope: 5.5% gradient",
          "Crowd corridor density: light"
        ],
        action: "Solve wheelchair routes step-free matrices; generate navigation paths",
        expectedResult: "Avoid 100% of stairways; transit time 4 min detour"
      }
    },
    {
      id: "gemini",
      label: "3. Vertex AI Gemini",
      sub: "Empathetic Engine",
      icon: BrainCircuit,
      color: "text-victory-gold",
      pulseColor: "rgba(245, 158, 11, 0.4)",
      auditDetails: {
        prompt: "You are StadiumPulse AI. Under ERGP formatting guidelines, generate guidance for the Martinez family stuck in queue B. Current stress: High. Tone: Enthusiastic.",
        reasoning: [
          "Explain: Gate B bottleneck is 28m delay",
          "Reassure: Covered Gate A is open and step-free",
          "Guide: Turn left, walk 4m to Gate A North",
          "Predict: Weather radar shows storm clearing in 15m"
        ],
        confidence: "98.9%",
        evidence: [
          "Martinez family profile: Fan view",
          "Current phase: Gate-entry",
          "Active stress score: 8/10"
        ],
        action: "Formulate empathetic localized wayfinding dialogue in Spanish/English",
        expectedResult: "Immediate user reassurance; de-escalation of queue stress"
      }
    },
    {
      id: "reasoning",
      label: "4. SRE Reasoning",
      sub: "Cognitive Playbook",
      icon: Cpu,
      color: "text-cyber-green",
      pulseColor: "rgba(0, 230, 118, 0.4)",
      auditDetails: {
        prompt: "SRE_POLICY_EVALUATION: CurrentPhase='egress', EgressCongestion=high",
        reasoning: [
          "Check crowd waves at exit routes",
          "Evaluate emergency EMT road clearance paths",
          "Calculate solar grid charging status"
        ],
        confidence: "97.5%",
        evidence: [
          "Evacuation lane Sector 112: active",
          "Shuttle Coach dispatch frequency: +2 bus",
          "Overall stability index: 98.2%"
        ],
        action: "Dispatch priority warnings; delay Shuttle coach E departures by 6 minutes",
        expectedResult: "Averaging out egress loop congestion, preventing concourse bottlenecking"
      }
    },
    {
      id: "prediction",
      label: "5. ML Congestion",
      sub: "Forecasting Curves",
      icon: TrendingUp,
      color: "text-purple-400",
      pulseColor: "rgba(168, 85, 247, 0.4)",
      auditDetails: {
        prompt: "PREDICTIVE_FORECASTING_MODEL_V2: Ingress occupancy prediction t+15m",
        reasoning: [
          "Analyze historical entry rates for FIFA kickoff milestones",
          "Project train passenger counts (Platform 4)",
          "Calculate weather congestion multipliers (+1.25x for rain)"
        ],
        confidence: "94.2%",
        evidence: [
          "Meadowlands departure frequency: 10m",
          "Active storm radar: 85% probability",
          "Kickoff time limit: 25 mins"
        ],
        action: "Trigger pre-emptive Concession Sector 103 loading notices",
        expectedResult: "Proactive restroom redirect alerts; balances queues prior to kickoff"
      }
    },
    {
      id: "decision",
      label: "6. SRE Decision",
      sub: "Dispatch Loop",
      icon: AlertCircle,
      color: "text-rose-400",
      pulseColor: "rgba(244, 63, 94, 0.4)",
      auditDetails: {
        prompt: "DISPATCH_COMMUNICATION_BROADCAST: CommandCenterAlert",
        reasoning: [
          "Validate dispatcher SOS alarm confirmations",
          "Sync with local volunteer coordinates profiles",
          "Broadcast directions warnings to companion PWAs"
        ],
        confidence: "99.8%",
        evidence: [
          "Medic station West: staffed",
          "SOS signal Sector 110: active",
          "Active alerts registry: LOST CHILD SEC 110"
        ],
        action: "Trigger Section 110 lock sequence; dispatch medical cart coordinates Ramp C",
        expectedResult: "Under 3 minutes EMT quad arrival at Sector 112"
      }
    }
  ];

  const active = nodes.find((n) => n.id === selectedNode) || nodes[2];

  return (
    <section id="ai-brain-pipeline" className="py-28 bg-[#04060c] border-t border-neutral-900 px-6 scroll-mt-16 relative">
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />
      
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header Title block */}
        <div className="max-w-3xl text-left space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-green/10 border border-cyber-green/20 text-cyber-green text-xs font-semibold uppercase tracking-widest font-mono">
            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            <span>Google Vertex AI Pipeline</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-extrabold font-display text-white tracking-tight leading-none">
            Google Cloud Data Flow
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            StadiumPulse AI connects physical sensors to large language models. Click any pipeline node below to audit the telemetry and prompts passing through Vertex AI.
          </p>
        </div>

        {/* Pipeline Nodes Map */}
        <div className="p-8 rounded-3xl border border-neutral-850 bg-neutral-950/40 relative overflow-hidden flex flex-col gap-10 shadow-2xl">
          
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 relative z-10">
            {nodes.map((n) => {
              const active = selectedNode === n.id;
              const Icon = n.icon;
              return (
                <button
                  key={n.id}
                  onClick={() => setSelectedNode(n.id)}
                  className="flex flex-col items-center gap-3 group focus:outline-none text-center cursor-pointer"
                  aria-label={`Audit ${n.label}`}
                >
                  <div className={`h-16 w-16 rounded-2xl flex items-center justify-center border transition-all duration-300 relative ${
                    active 
                      ? `bg-neutral-900 border-neutral-700 scale-110 shadow-[0_0_20px_rgba(0,229,255,0.15)]` 
                      : "bg-neutral-950 border-neutral-850 group-hover:border-neutral-700"
                  }`}>
                    {/* Pulsing Light Glow when selected */}
                    {active && (
                      <span 
                        className="absolute inset-0 rounded-2xl animate-ping opacity-35" 
                        style={{ backgroundColor: n.pulseColor }}
                      />
                    )}
                    <Icon className={`h-6.5 w-6.5 ${active ? n.color : "text-neutral-500 group-hover:text-white"}`} />
                  </div>
                  <div>
                    <div className={`text-xs font-extrabold tracking-tight ${active ? "text-white" : "text-neutral-400"}`}>
                      {n.label.split(". ")[1]}
                    </div>
                    <div className="text-[9px] text-neutral-500 font-bold uppercase mt-0.5 font-mono">{n.sub}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* SRE Audit Drawer Cockpit */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-neutral-900 pt-8"
            >
              
              {/* Left Side: Parameters Auditor (7 Columns) */}
              <div className="lg:col-span-7 text-left space-y-6">
                <div className="flex items-center gap-2 text-[10px] text-neutral-500 font-bold uppercase tracking-widest font-mono">
                  <Activity className="h-4.5 w-4.5 text-cyber-green animate-pulse" />
                  <span>Vertex AI Telemetry Drawer</span>
                </div>
                
                {/* 1. Prompt String */}
                <div className="space-y-1.5">
                  <span className="text-[9px] text-neutral-500 font-bold uppercase tracking-wider block font-mono">Prompt String / API Request</span>
                  <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-850 font-mono text-[10px] text-neutral-300 whitespace-pre-wrap leading-relaxed select-all">
                    {active.auditDetails.prompt}
                  </div>
                </div>

                {/* 2. Reasoning Steps */}
                <div className="space-y-1.5">
                  <span className="text-[9px] text-neutral-500 font-bold uppercase tracking-wider block font-mono">Chain of Thought logical steps</span>
                  <div className="flex flex-col gap-2 pl-4 border-l border-neutral-900">
                    {active.auditDetails.reasoning.map((step, idx) => (
                      <div key={idx} className="relative flex items-center gap-2">
                        <div className="absolute -left-[20px] top-1.5 h-1.5 w-1.5 rounded-full bg-cyber-green" />
                        <span className="text-[11px] text-neutral-300 font-medium font-sans">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Expected Result */}
                <div className="space-y-1.5">
                  <span className="text-[9px] text-neutral-500 font-bold uppercase tracking-wider block font-mono">Expected Outcome Optimization</span>
                  <p className="text-xs text-neutral-200 font-semibold leading-relaxed">
                    {active.auditDetails.expectedResult}
                  </p>
                </div>
              </div>

              {/* Right Side: Ledger Auditing Log (5 Columns) */}
              <div className="lg:col-span-5 text-left p-6 rounded-3xl border border-neutral-900 bg-neutral-950/80 font-mono text-[10px] space-y-4 relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-victory-gold" />
                
                <div className="space-y-4">
                  <div className="text-neutral-500 font-bold uppercase tracking-wider flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Terminal className="h-4.5 w-4.5 text-victory-gold" />
                      SRE AUDIT LEDGER
                    </span>
                    <span className="text-cyber-green animate-pulse">● SECURED</span>
                  </div>

                  {/* Confidence */}
                  <div>
                    <span className="text-neutral-500 uppercase text-[8px] font-bold block mb-1">AI Confidence rating</span>
                    <div className="text-[20px] font-extrabold text-white leading-none tracking-tight">
                      {active.auditDetails.confidence}
                    </div>
                  </div>

                  {/* Evidence factors checked */}
                  <div className="space-y-2">
                    <span className="text-neutral-500 uppercase text-[8px] font-bold block">Evidence factors checked</span>
                    <div className="flex flex-col gap-1 text-neutral-300">
                      {active.auditDetails.evidence.map((ev, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <CheckCircle2 className="h-3.5 w-3.5 text-cyber-green flex-shrink-0" />
                          <span>{ev}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Operational Action */}
                  <div className="space-y-1">
                    <span className="text-neutral-500 uppercase text-[8px] font-bold block">Dispatched Action</span>
                    <p className="text-neutral-200 leading-normal font-sans">
                      {active.auditDetails.action}
                    </p>
                  </div>
                </div>

                <div className="text-[8px] text-neutral-500 border-t border-neutral-900 pt-3 flex items-center justify-between">
                  <span>TIMESTAMP: 10-07-2026</span>
                  <span className="text-victory-gold font-bold">XAI COGNITIVE MONITOR</span>
                </div>

              </div>

            </motion.div>
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
