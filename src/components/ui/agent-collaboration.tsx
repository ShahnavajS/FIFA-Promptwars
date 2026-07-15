"use client";

import React from "react";
import { useMatchStore } from "@/stores/useMatchStore";
import { Card, CardHeader, CardTitle, CardContent } from "./card";
import { MessageSquare, RefreshCw } from "lucide-react";

export interface AgentMsg {
  sender: string;
  recipient: string;
  message: string;
  timestamp: string;
}

export function AgentCollaboration() {
  const { currentPhase, activeEmergency, domeStatus } = useMatchStore();

  // Resolve collaboration logs based on active state parameters
  const getCollaborationLogs = (): AgentMsg[] => {
    const now = new Date();
    const timeStr = (offsetSec: number) => {
      const d = new Date(now.getTime() - offsetSec * 1000);
      return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}`;
    };

    if (activeEmergency) {
      if (activeEmergency.includes("LOST CHILD")) {
        return [
          {
            sender: "SecurityAgent",
            recipient: "CoordinatorAgent",
            message: "Emergency alert LOST CHILD Sector 110 received. Dispatched CCTV sweep.",
            timestamp: timeStr(45),
          },
          {
            sender: "CoordinatorAgent",
            recipient: "CrowdAgent",
            message: "Suspend Gate B egress turnstile clearances. Freeze minor exits.",
            timestamp: timeStr(30),
          },
          {
            sender: "CrowdAgent",
            recipient: "CoordinatorAgent",
            message: "Egress locks validated. Concourse gates holding perimeter.",
            timestamp: timeStr(20),
          },
          {
            sender: "CoordinatorAgent",
            recipient: "NavigationAgent",
            message: "Send parent coordinates to nearby volunteers Sector 110.",
            timestamp: timeStr(10),
          },
        ];
      }
      if (activeEmergency.includes("MEDICAL")) {
        return [
          {
            sender: "EmergencyAgent",
            recipient: "CoordinatorAgent",
            message: "Trauma incident Section 112 active. EMT dispatched.",
            timestamp: timeStr(50),
          },
          {
            sender: "CoordinatorAgent",
            recipient: "NavigationAgent",
            message: "Isolate Section 112 pedestrian routes. Clear medic lane.",
            timestamp: timeStr(35),
          },
          {
            sender: "NavigationAgent",
            recipient: "CoordinatorAgent",
            message: "Pedestrian redirection active on Digital Twin maps.",
            timestamp: timeStr(20),
          },
          {
            sender: "CoordinatorAgent",
            recipient: "AccessibilityAgent",
            message: "Divert wheelchair routes to bypass Sector 112 West Core.",
            timestamp: timeStr(5),
          },
        ];
      }
    }

    if (currentPhase === "gate-entry" || currentPhase === "security") {
      return [
        {
          sender: "CrowdAgent",
          recipient: "CoordinatorAgent",
          message: "Gate B Inflow clearance delay peaks at 28 mins.",
          timestamp: timeStr(60),
        },
        {
          sender: "CoordinatorAgent",
          recipient: "NavigationAgent",
          message: "Update walkway LED boards to route 18% flow to Gate A North.",
          timestamp: timeStr(45),
        },
        {
          sender: "NavigationAgent",
          recipient: "CoordinatorAgent",
          message: "LED redirection signals active. Gate A ingress climbing.",
          timestamp: timeStr(30),
        },
        {
          sender: "CoordinatorAgent",
          recipient: "WeatherAgent",
          message: "Dome roof holds open. Wind variables stable.",
          timestamp: timeStr(15),
        },
      ];
    }

    if (domeStatus === "closed") {
      return [
        {
          sender: "WeatherAgent",
          recipient: "CoordinatorAgent",
          message: "Closed dome confirm. HVAC eco-mode engaged.",
          timestamp: timeStr(40),
        },
        {
          sender: "CoordinatorAgent",
          recipient: "NavigationAgent",
          message: "Notify poncho distribution points at West entrances.",
          timestamp: timeStr(20),
        },
      ];
    }

    return [
      {
        sender: "CoordinatorAgent",
        recipient: "CrowdAgent",
        message: "Scanning concourse densities. All gates reporting normal.",
        timestamp: timeStr(120),
      },
      {
        sender: "CoordinatorAgent",
        recipient: "WeatherAgent",
        message: "Solar energy levels checks: 94% efficiency capture.",
        timestamp: timeStr(90),
      },
    ];
  };

  const logs = getCollaborationLogs();

  const agentsList = [
    { name: "Coordinator", status: "active" },
    { name: "NavAgent", status: "active" },
    { name: "CrowdAgent", status: "active" },
    { name: "TransitAgent", status: "active" },
    { name: "AccessAgent", status: "active" },
    { name: "WeatherAgent", status: "active" },
    { name: "SecurityAgent", status: activeEmergency ? "active" : "standby" },
    { name: "EmergencyAgent", status: activeEmergency ? "active" : "standby" },
  ];

  return (
    <Card
      variant="glass"
      className="border-neutral-850 bg-neutral-950/60 backdrop-blur-xl text-left flex flex-col justify-between h-full"
    >
      <CardHeader className="pb-3 border-b border-neutral-900 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-white text-base">Agent Collaboration</CardTitle>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-cyber-green font-bold uppercase tracking-wider font-mono">
          <RefreshCw className="h-3 w-3 animate-spin" />
          <span>Synchronized</span>
        </div>
      </CardHeader>

      <CardContent className="pt-4 flex flex-col gap-4 flex-grow justify-between">
        {/* Agent Status Pulse Grid */}
        <div className="grid grid-cols-4 gap-2 text-[9px] text-center font-bold uppercase tracking-wider font-mono">
          {agentsList.map((a, idx) => (
            <div
              key={idx}
              className={`p-1.5 rounded-lg border flex flex-col items-center gap-1.5 ${
                a.status === "active"
                  ? "border-cyber-green/20 bg-cyber-green/5 text-cyber-green"
                  : "border-neutral-900 bg-neutral-950/40 text-neutral-500"
              }`}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    a.status === "active" ? "bg-cyber-green" : "bg-transparent"
                  }`}
                />
                <span
                  className={`relative inline-flex rounded-full h-1.5 w-1.5 ${
                    a.status === "active" ? "bg-cyber-green" : "bg-neutral-800"
                  }`}
                />
              </span>
              <span>{a.name}</span>
            </div>
          ))}
        </div>

        {/* Coordinated Message Logs */}
        <div className="space-y-2.5 max-h-[160px] overflow-y-auto pr-1">
          {logs.map((msg, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-xl border border-neutral-900 bg-neutral-950/40 text-[10px] space-y-1"
            >
              <div className="flex justify-between items-center text-[9px] font-bold uppercase text-neutral-500 font-mono">
                <span className="flex items-center gap-1">
                  <MessageSquare className="h-3 w-3 text-victory-gold" />
                  {msg.sender} &rarr; {msg.recipient}
                </span>
                <span>{msg.timestamp}</span>
              </div>
              <p className="text-neutral-200 leading-normal">{msg.message}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
