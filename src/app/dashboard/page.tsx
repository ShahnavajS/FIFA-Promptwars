"use client";

import React, { useState, useEffect } from "react";
import { useUiStore } from "@/stores/useUiStore";
import { useToastStore } from "@/stores/useToastStore";
import { useMatchStore } from "@/stores/useMatchStore";
import { TelemetryPublisher } from "@/lib/event-bus/event.publisher";
import { TelemetryListener } from "@/lib/event-bus/event.listener";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { StadiumHero } from "@/components/ui/stadium-hero";
import { JourneyPlanner } from "@/components/ui/journey-planner";
import { ActivityFeed } from "@/components/ui/activity-feed";
import { DemoControl } from "@/components/ui/demo-control";
import { OpsDecisionCenter } from "@/components/ui/ops-decision-center";
import { AIStadiumBrain } from "@/components/ui/stadium-brain";
import { AIReasoningTimeline } from "@/components/ui/reasoning-timeline";
import { AgentCollaboration } from "@/components/ui/agent-collaboration";
import { MatchMemory } from "@/components/ui/match-memory";
import { PredictiveCrowdService } from "@/services/predictive-crowd.service";
import { 
  mockConcessions, 
  mockGates, 
  mockIncidents, 
  mockTransportOptions, 
  ConcessionState,
  GateState,
  Incident,
  TransportOption
} from "@/lib/demo";
import { 
  MapPin, 
  Users, 
  Accessibility, 
  Flame, 
  Bus, 
  Utensils, 
  Activity, 
  ShieldAlert,
  Ticket,
  Clock
} from "lucide-react";

const NODES = {
  start_south: { id: "start_south", x: 50, y: 92, label: "Transit Hub South", isAccessible: true },
  start_north: { id: "start_north", x: 50, y: 8, label: "Transit Hub North", isAccessible: true },
  gate_a: { id: "gate_a", x: 18, y: 50, label: "Gate A (Stairs)", isAccessible: false },
  gate_b: { id: "gate_b", x: 82, y: 50, label: "Gate B (Stairs)", isAccessible: false },
  gate_a_north: { id: "gate_a_north", x: 30, y: 15, label: "Gate A North (Accessible Ramp)", isAccessible: true },
  elevator_west: { id: "elevator_west", x: 32, y: 50, label: "Elevator West Core", isAccessible: true },
  elevator_east: { id: "elevator_east", x: 68, y: 50, label: "Elevator East Core", isAccessible: true },
  seating_112: { id: "seating_112", x: 44, y: 64, label: "Seat Sector 112", isAccessible: true },
  restroom_112: { id: "restroom_112", x: 34, y: 72, label: "Restroom Sector 112 (Stairs)", isAccessible: false },
  restroom_accessible: { id: "restroom_accessible", x: 34, y: 28, label: "Accessible Restroom Sector 103", isAccessible: true }
};

const EDGES = [
  // South transit leads to Gate A, Gate B, or Elevator East
  { from: "start_south", to: "gate_a", cost: 40, isAccessible: false },
  { from: "start_south", to: "gate_b", cost: 40, isAccessible: false },
  { from: "start_south", to: "elevator_east", cost: 50, isAccessible: true },
  
  // North transit leads to Gate A North or Gate A
  { from: "start_north", to: "gate_a_north", cost: 20, isAccessible: true },
  { from: "start_north", to: "gate_a", cost: 40, isAccessible: false },
  
  // Gates connections to concourse elevator cores
  { from: "gate_a", to: "elevator_west", cost: 20, isAccessible: true },
  { from: "gate_b", to: "elevator_east", cost: 20, isAccessible: true },
  { from: "gate_a_north", to: "elevator_west", cost: 35, isAccessible: true },

  // Elevator west leads to seating bowl and restrooms
  { from: "elevator_west", to: "seating_112", cost: 25, isAccessible: true },
  { from: "elevator_west", to: "restroom_112", cost: 15, isAccessible: false },
  { from: "elevator_west", to: "restroom_accessible", cost: 30, isAccessible: true },

  // Elevator east leads to seating bowl
  { from: "elevator_east", to: "seating_112", cost: 30, isAccessible: true }
];

function findShortestPath(startId: string, endId: string, wheelchairOnly: boolean) {
  const queue: { node: string; path: string[]; cost: number }[] = [{ node: startId, path: [startId], cost: 0 }];
  const visited = new Set<string>();
  let shortest: { path: string[]; cost: number } | null = null;

  while (queue.length > 0) {
    queue.sort((a, b) => a.cost - b.cost);
    const curr = queue.shift()!;
    
    if (curr.node === endId) {
      if (!shortest || curr.cost < shortest.cost) {
        shortest = curr;
      }
      continue;
    }

    if (visited.has(curr.node)) continue;
    visited.add(curr.node);

    const outgoing = EDGES.filter(e => {
      const match = e.from === curr.node || e.to === curr.node;
      const accessibleOk = !wheelchairOnly || e.isAccessible;
      return match && accessibleOk;
    });

    for (const edge of outgoing) {
      const neighbor = edge.from === curr.node ? edge.to : edge.from;
      if (!visited.has(neighbor)) {
        queue.push({
          node: neighbor,
          path: [...curr.path, neighbor],
          cost: curr.cost + edge.cost
        });
      }
    }
  }

  return shortest ? shortest.path.map(id => NODES[id as keyof typeof NODES]) : [];
}

export default function DigitalTwinPage() {
  const { currentRole, wheelchairRerouting } = useUiStore();
  const { addToast } = useToastStore();
  const { currentPhase, crowdDensityMultiplier, opsStatus, activeEmergency } = useMatchStore();

  // Active layers state
  const [layers, setLayers] = useState({
    crowd: true,
    access: false,
    emergency: false,
    transit: false,
    food: true,
  });

  const toggleLayer = (layerKey: keyof typeof layers) => {
    const updated = { ...layers, [layerKey]: !layers[layerKey] };
    setLayers(updated);
    TelemetryPublisher.publish("MAP_LAYER_TOGGLED", { layer: layerKey, active: updated[layerKey] });
    addToast(`${layerKey.toUpperCase()} map layer toggled ${updated[layerKey] ? "ON" : "OFF"}`, "info");
  };

  // Adjust layer defaults automatically depending on match lifecycle phase
  useEffect(() => {
    if (currentPhase === "arrival" || currentPhase === "exit") {
      setLayers((prev) => ({ ...prev, transit: true, crowd: true }));
    } else if (currentPhase === "security" || currentPhase === "gate-entry") {
      setLayers((prev) => ({ ...prev, crowd: true, access: true }));
    } else if (currentPhase === "halftime") {
      setLayers((prev) => ({ ...prev, food: true, access: true }));
    }
  }, [currentPhase]);

  // Synchronize wheelchair routing setting to accessibility map layer
  useEffect(() => {
    if (wheelchairRerouting) {
      setLayers((prev) => ({ ...prev, access: true }));
    }
  }, [wheelchairRerouting]);

  // Observer for dispatcher incidents
  useEffect(() => {
    const unsubscribeIncident = TelemetryListener.subscribe("INCIDENT_REPORTED", (event) => {
      console.log("Incident alert registered: ", event.payload);
    });

    return () => {
      unsubscribeIncident();
    };
  }, []);

  // Fetch predictive crowd forecasts to render on maps
  const forecast = PredictiveCrowdService.getForecast(
    currentPhase,
    crowdDensityMultiplier,
    activeEmergency
  );

  const isPredictiveAlertActive = forecast.safetyOverflowTimeMins < 10;
  const isGoalSurge = currentPhase === "full-time" || (currentPhase === "kickoff" && crowdDensityMultiplier > 1.3);

  // Dynamic Journey Path Calculation
  const startNode = currentPhase === "arrival" || currentPhase === "gate-entry" ? "start_south" : "start_north";
  const endNode = currentPhase === "halftime" ? "restroom_accessible" : "seating_112";
  const computedPath = findShortestPath(startNode, endNode, wheelchairRerouting);
  
  const pathD = computedPath.length > 1 
    ? `M ${computedPath.map(n => `${n.x} ${n.y}`).join(" L ")}`
    : "";

  return (
    <div className="flex flex-col gap-6 font-sans pb-10">
      
      {/* 1. Live Stadium Hero Status (Top Header Widget) */}
      <StadiumHero />

      {/* 2. Operations Decision Center Dashboard (Actionable Narrative) - Professional View */}
      {currentRole !== "fan" && <OpsDecisionCenter />}

      {/* 3. AI Stadium Brain & Explainability Panel - Professional View */}
      {currentRole !== "fan" && <AIStadiumBrain />}

      {/* 4. Main Work Cockpit Area (12 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Side: Journey Planner (3 Columns) */}
        <div className="lg:col-span-3">
          <JourneyPlanner />
        </div>

        {/* Center: Digital Twin SVG Map Blueprint (6 Columns) */}
        <div className="lg:col-span-6 flex flex-col">
          <Card variant="glass" className="flex-grow flex flex-col p-0 overflow-hidden relative min-h-[460px] border-neutral-800 bg-neutral-950/60 backdrop-blur-xl">
            {/* Header Status Overlays */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 p-2 bg-neutral-950/80 backdrop-blur-md border border-neutral-800 rounded-xl text-xs text-white font-semibold shadow-lg">
              <MapPin className="h-4 w-4 text-cyber-green animate-pulse" />
              <span>MetLife Arena Blueprint · Digital Twin</span>
            </div>

            {/* Dynamic Map Layers Selector */}
            <div className="absolute top-4 right-4 z-10 flex gap-1 p-1 bg-neutral-950/80 backdrop-blur-md border border-neutral-800 rounded-xl shadow-lg">
              <button
                onClick={() => toggleLayer("crowd")}
                className={`p-1.5 rounded-lg transition-colors focus:outline-none ${layers.crowd ? "text-crowd-orange bg-crowd-orange/10" : "text-neutral-500 hover:text-white"}`}
                aria-label="Toggle crowd layer"
              >
                <Users className="h-4 w-4" />
              </button>
              <button
                onClick={() => toggleLayer("access")}
                className={`p-1.5 rounded-lg transition-colors focus:outline-none ${layers.access ? "text-accessibility-purple bg-accessibility-purple/10" : "text-neutral-500 hover:text-white"}`}
                aria-label="Toggle accessibility layer"
              >
                <Accessibility className="h-4 w-4" />
              </button>
              <button
                onClick={() => toggleLayer("emergency")}
                className={`p-1.5 rounded-lg transition-colors focus:outline-none ${layers.emergency ? "text-emergency-red bg-emergency-red/10" : "text-neutral-500 hover:text-white"}`}
                aria-label="Toggle safety layer"
              >
                <Flame className="h-4 w-4" />
              </button>
              <button
                onClick={() => toggleLayer("transit")}
                className={`p-1.5 rounded-lg transition-colors focus:outline-none ${layers.transit ? "text-transport-cyan bg-transport-cyan/10" : "text-neutral-500 hover:text-white"}`}
                aria-label="Toggle transit layer"
              >
                <Bus className="h-4 w-4" />
              </button>
              <button
                onClick={() => toggleLayer("food")}
                className={`p-1.5 rounded-lg transition-colors focus:outline-none ${layers.food ? "text-victory-gold bg-victory-gold/10" : "text-neutral-500 hover:text-white"}`}
                aria-label="Toggle concessions layer"
              >
                <Utensils className="h-4 w-4" />
              </button>
            </div>

            {/* SVG Interactive Canvas */}
            <div className="flex-grow flex items-center justify-center p-6 bg-neutral-950/40 relative min-h-[350px]">
              <svg
                className="w-full max-w-[420px] h-auto text-neutral-800 transition-colors"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Stadium Perimeter */}
                <ellipse cx="50" cy="50" rx="46" ry="38" fill="none" stroke="currentColor" strokeWidth="1" />
                <ellipse cx="50" cy="50" rx="42" ry="34" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />

                {/* Seating Bowls */}
                <ellipse cx="50" cy="50" rx="32" ry="24" fill="none" stroke="currentColor" strokeWidth="1" />
                <ellipse cx="50" cy="50" rx="26" ry="18" fill="none" stroke="currentColor" strokeWidth="0.5" />

                {/* Central Football Pitch */}
                <rect 
                  x="36" 
                  y="38" 
                  width="28" 
                  height="24" 
                  fill={["kickoff", "second-half"].includes(currentPhase) ? "rgba(0, 230, 118, 0.08)" : "rgba(0, 230, 118, 0.03)"} 
                  stroke={["kickoff", "second-half"].includes(currentPhase) ? "#00e676" : "currentColor"} 
                  strokeWidth="0.75" 
                  className={["kickoff", "second-half"].includes(currentPhase) ? "animate-pulse" : ""}
                />
                <circle cx="50" cy="50" r="4" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <line x1="50" y1="38" x2="50" y2="62" stroke="currentColor" strokeWidth="0.5" />

                {/* Standard Gate Connectors */}
                <line x1="50" y1="5" x2="50" y2="12" stroke="currentColor" strokeWidth="1" />
                <line x1="91" y1="50" x2="84" y2="50" stroke="currentColor" strokeWidth="1" />
                <line x1="9" y1="50" x2="16" y2="50" stroke="currentColor" strokeWidth="1" />
                <line x1="50" y1="95" x2="50" y2="88" stroke="currentColor" strokeWidth="1" />

                {/* DYNAMIC MAP OVERLAYS */}

                {/* Arrival & Exit Transit Lanes */}
                {layers.transit && (currentPhase === "arrival" || currentPhase === "exit") && (
                  <g>
                    {/* Glowing transit route from South and North hubs */}
                    <path
                      d="M 50 1 L 50 12"
                      fill="none"
                      stroke="#06b6d4"
                      strokeWidth="2"
                      strokeDasharray="2 2"
                      className="animate-[dash_2s_linear_infinite]"
                    />
                    <path
                      d="M 50 99 L 50 88"
                      fill="none"
                      stroke="#06b6d4"
                      strokeWidth="2"
                      strokeDasharray="2 2"
                      className="animate-[dash_2s_linear_infinite]"
                    />
                    <circle cx="50" cy="2" r="2.5" fill="#06b6d4" className="animate-ping" />
                    <circle cx="50" cy="98" r="2.5" fill="#06b6d4" className="animate-ping" />
                  </g>
                )}

                {/* Security Perimeter highlight */}
                {layers.crowd && currentPhase === "security" && (
                  <ellipse cx="50" cy="50" rx="44" ry="36" fill="none" stroke="#ea580c" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" className="animate-pulse" />
                )}

                {/* Gate Entry Warning & Rerouting Arrow */}
                {(currentPhase === "gate-entry" || isPredictiveAlertActive) && (
                  <g>
                    {/* Gate B Congestion Alert (Flashes Red if predictive alert triggers) */}
                    <circle 
                      cx="86" 
                      cy="50" 
                      r={isPredictiveAlertActive ? 9 * crowdDensityMultiplier : 6 * crowdDensityMultiplier} 
                      fill="rgba(255, 23, 68, 0.15)" 
                      className="animate-pulse" 
                    />
                    <circle 
                      cx="86" 
                      cy="50" 
                      r={isPredictiveAlertActive ? 4 * crowdDensityMultiplier : 3 * crowdDensityMultiplier} 
                      fill="#ff1744" 
                    />
                    
                    {/* Ingress direction arrows to Gate A */}
                    <path
                      d="M 80 50 A 30 22 0 0 0 54 13"
                      fill="none"
                      stroke="#00e676"
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                      strokeLinecap="round"
                    />
                    <polygon points="53,16 54,13 57,14" fill="#00e676" />
                  </g>
                )}

                {/* Halftime Store Highlights */}
                {layers.food && currentPhase === "halftime" && (
                  <g>
                    <circle cx="34" cy="28" r="2" fill="#f59e0b" className="animate-ping" />
                    <circle cx="34" cy="28" r="1.5" fill="#f59e0b" />
                    
                    <circle cx="66" cy="28" r="2" fill="#f59e0b" className="animate-ping" />
                    <circle cx="66" cy="28" r="1.5" fill="#f59e0b" />

                    <circle cx="34" cy="72" r="1.5" fill="#f59e0b" />
                    <circle cx="66" cy="72" r="1.5" fill="#f59e0b" />
                  </g>
                )}

                {/* Ingress Seating Glow */}
                {currentPhase === "find-seat" && (
                  <ellipse cx="50" cy="50" rx="29" ry="21" fill="none" stroke="#00e5ff" strokeWidth="2" opacity="0.5" className="animate-pulse" />
                )}

                {/* Emergency evacuation vectors */}
                {opsStatus === "critical" && (
                  <g>
                    <line x1="50" y1="26" x2="50" y2="4" stroke="#dc2626" strokeWidth="2" strokeDasharray="2 2" />
                    <line x1="26" y1="50" x2="6" y2="50" stroke="#dc2626" strokeWidth="2" strokeDasharray="2 2" />
                    <circle cx="26" cy="50" r="3" fill="#dc2626" className="animate-ping" />
                  </g>
                )}

                {/* Dynamically Solved Journey Path Overlay */}
                {layers.access && pathD && (
                  <g>
                    {/* Glowing outer trace */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke={wheelchairRerouting ? "#c084fc" : "#22d3ee"}
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity="0.85"
                      className="animate-pulse"
                    />
                    {/* Glowing inner animated trace */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="4 4"
                      className="animate-[dash_3s_linear_infinite]"
                    />
                    {/* Node points on path */}
                    {computedPath.map((node, idx) => (
                      <circle
                        key={node.id}
                        cx={node.x}
                        cy={node.y}
                        r={idx === 0 || idx === computedPath.length - 1 ? 2.5 : 1.5}
                        fill={wheelchairRerouting ? "#e9d5ff" : "#e0f2fe"}
                        className={idx === 0 || idx === computedPath.length - 1 ? "animate-ping" : ""}
                      />
                    ))}
                  </g>
                )}
              </svg>
            </div>

            {/* Custom Legend */}
            <div className="border-t border-neutral-900 bg-neutral-950/80 p-4 grid grid-cols-5 gap-2 text-[10px] text-center text-neutral-400 font-bold uppercase tracking-wider font-display">
              <div className={layers.crowd ? "text-crowd-orange" : ""}>Crowds</div>
              <div className={layers.access ? "text-accessibility-purple" : ""}>Access</div>
              <div className={layers.emergency ? "text-emergency-red" : ""}>Safety</div>
              <div className={layers.transit ? "text-transport-cyan" : ""}>Transit</div>
              <div className={layers.food ? "text-victory-gold" : ""}>Stores</div>
            </div>
          </Card>
        </div>

        {/* Right Side: Role Widgets & Activity Feed (3 Columns) */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          
          {/* Fan Widget */}
          {currentRole === "fan" && (
            <Card variant="glass" className="text-left border-cyber-green/20 glow-green">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 text-cyber-green font-bold text-xs uppercase tracking-wider font-display">
                  <Ticket className="h-4 w-4" />
                  Ticket Wallet
                </div>
                <CardTitle className="text-white text-base">Ingress Access</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3.5">
                <div className="p-3.5 rounded-xl border border-neutral-800 bg-neutral-950/60 font-mono text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-cyber-green" />
                  <div className="text-[9px] text-neutral-500 font-bold uppercase tracking-wider">Ticket Code</div>
                  <div className="text-base font-bold text-white tracking-widest my-1">TKT-128456-M89D</div>
                  <div className="text-[10px] text-cyber-green font-semibold">GATE A · SEC 112 · ROW F · SEAT 12</div>
                </div>

                <div className="space-y-2">
                  <div className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    Concessions Queue times
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {mockConcessions.slice(0, 3).map((c: ConcessionState) => (
                      <div key={c.id} className="flex items-center justify-between p-2 rounded-lg bg-neutral-900/40 border border-neutral-800 text-[11px]">
                        <span className="font-semibold text-neutral-200">{c.name}</span>
                        <span className={`font-bold ${c.crowdLevel === "high" ? "text-rose-400" : "text-cyber-green"}`}>
                          {Math.round(c.waitTimeMinutes * crowdDensityMultiplier)} min queue
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Organizer Widget */}
          {currentRole === "organizer" && (
            <Card variant="glass" className="text-left border-stadium-blue/20 glow-blue">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 text-stadium-blue font-bold text-xs uppercase tracking-wider font-display">
                  <Activity className="h-4 w-4" />
                  Ops Summary
                </div>
                <CardTitle className="text-white text-base">Stadium Throughput</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3.5">
                <div className="space-y-2.5">
                  {mockGates.map((g: GateState) => {
                    const queueCount = Math.round(g.currentQueueCount * crowdDensityMultiplier);
                    const waitTime = Math.round(g.waitTimeMinutes * crowdDensityMultiplier);
                    const status = waitTime > 15 ? "congested" : "open";
                    
                    return (
                      <div key={g.id} className="p-2.5 rounded-xl border border-neutral-800 bg-neutral-900/40 flex flex-col gap-1 text-[11px]">
                        <div className="flex items-center justify-between font-semibold">
                          <span className="text-neutral-200">{g.name}</span>
                          <span className={status === "congested" ? "text-rose-400 font-bold" : "text-cyber-green font-bold"}>
                            {waitTime}m wait
                          </span>
                        </div>
                        <div className="w-full bg-neutral-950 h-1 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${status === "congested" ? "bg-rose-500" : "bg-cyber-green"}`} 
                            style={{ width: `${Math.min((queueCount / 1000) * 100, 100)}%` }}
                          />
                        </div>
                        <div className="text-[9px] text-neutral-500">
                          {queueCount} fans in queue · {g.flowRatePerMin}/min flow
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Security Widget */}
          {currentRole === "security" && (
            <Card variant="glass" className="text-left border-pulsing-coral/20 glow-red">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 text-pulsing-coral font-bold text-xs uppercase tracking-wider font-display">
                  <ShieldAlert className="h-4 w-4" />
                  Security Dispatch
                </div>
                <CardTitle className="text-white text-base">Active Incident Logs</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2.5">
                {mockIncidents.map((inc: Incident) => (
                  <div key={inc.id} className="p-2.5 rounded-xl border border-neutral-900 bg-neutral-900/40 flex flex-col gap-1 text-[11px]">
                    <div className="flex items-center justify-between font-bold">
                      <span className="text-white">{inc.title}</span>
                      <span className={`text-[9px] uppercase px-1.5 py-0.5 rounded-md ${
                        inc.severity === "high" ? "bg-rose-950 text-rose-400 border border-rose-900" : "bg-amber-950 text-amber-400 border border-amber-900"
                      }`}>
                        {inc.severity}
                      </span>
                    </div>
                    <p className="text-neutral-400 text-[10px] leading-relaxed">{inc.description}</p>
                    <div className="flex items-center justify-between text-[9px] text-neutral-500 pt-1 border-t border-neutral-800/40">
                      <span>{inc.location}</span>
                      <span className="capitalize text-cyan-400 font-semibold">{inc.status}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Staff / Volunteer Widget */}
          {(currentRole === "volunteer" || currentRole === "staff") && (
            <Card variant="glass" className="text-left border-victory-gold/20 glow-gold">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 text-victory-gold font-bold text-xs uppercase tracking-wider font-display">
                  <Clock className="h-4 w-4" />
                  Transit Delays
                </div>
                <CardTitle className="text-white text-base">Exit Shuttle Tracker</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2.5">
                {mockTransportOptions.map((t: TransportOption) => (
                  <div key={t.id} className="p-2.5 rounded-xl border border-neutral-800 bg-neutral-900/40 flex flex-col gap-1 text-[11px]">
                    <div className="flex items-center justify-between font-semibold">
                      <span className="text-white">{t.name}</span>
                      <span className={`px-1.5 py-0.5 rounded-md text-[9px] uppercase font-bold ${
                        t.status === "on-time" 
                          ? "bg-emerald-950 text-emerald-400 border border-emerald-900" 
                          : "bg-rose-950 text-rose-400 border border-rose-900"
                      }`}>
                        {t.status}
                      </span>
                    </div>
                    <p className="text-[10px] text-neutral-400 leading-normal">{t.description}</p>
                    <div className="text-[9px] text-neutral-500 font-semibold">
                      Est. Wait: {Math.round(t.waitTimeMinutes * crowdDensityMultiplier)} mins
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Operations Activity Feed */}
          <ActivityFeed />
        </div>

      </div>

      {/* 5. AI Reasoning Pipeline & Agent Collaboration Grid (Connected Subsystems) - Professional View */}
      {currentRole !== "fan" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-6">
            <AIReasoningTimeline />
          </div>
          <div className="lg:col-span-6">
            <AgentCollaboration />
          </div>
        </div>
      )}

      {/* 6. Matchday Memory & Personal Diary Book - Fan View */}
      {currentRole === "fan" && <MatchMemory />}

      {/* 7. Goal Celebration Overlays */}
      {isGoalSurge && (
        <div role="region" aria-live="polite" className="fixed inset-0 pointer-events-none z-50 overflow-hidden flex items-center justify-center bg-victory-gold/5 animate-pulse">
          {/* Sparkles particle stream */}
          <div className="absolute inset-0 flex justify-around">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i} 
                className="w-2 h-2 bg-victory-gold rounded-full opacity-60 animate-bounce" 
                style={{ 
                  animationDelay: `${i * 0.15}s`, 
                  animationDuration: `${1.2 + (i % 3) * 0.4}s` 
                }} 
              />
            ))}
          </div>
          <div className="px-5 py-2.5 rounded-xl bg-neutral-950/90 border border-victory-gold text-victory-gold text-sm font-bold font-display uppercase tracking-widest shadow-2xl animate-pulse">
            ★ GOAL CELEBRATION ACTIVE ★
          </div>
        </div>
      )}

      {/* Floatable Dev Cockpit Control Panel */}
      <DemoControl />
      
    </div>
  );
}
