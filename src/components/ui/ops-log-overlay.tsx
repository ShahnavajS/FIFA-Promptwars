"use client";

import React, { useState, useEffect } from "react";
import { Terminal, Shield, Activity } from "lucide-react";

interface LogItem {
  id: number;
  time: string;
  type: "TELEMETRY" | "AI PREDICT" | "SRE HEALTH" | "DISPATCH";
  message: string;
}

const LOG_TEMPLATES: Omit<LogItem, "id" | "time">[] = [
  {
    type: "TELEMETRY",
    message: "Meadowlands transit line bus loop wait times: 4 mins.",
  },
  {
    type: "AI PREDICT",
    message: "Sector 112 goal surge predicted. Restroom balancing active.",
  },
  {
    type: "DISPATCH",
    message: "Medic dispatch route cleared on Ramp C for emergency EMT unit.",
  },
  {
    type: "SRE HEALTH",
    message: "Overall stadium stability: 98.4%. Mood: Ecstatic.",
  },
  {
    type: "TELEMETRY",
    message: "Section 103 concession queues resolved below 3 mins.",
  },
  {
    type: "DISPATCH",
    message: "Zero-latency translation link active. 42 channels translated.",
  },
];

export function OpsLogOverlay() {
  const [logs, setLogs] = useState<LogItem[]>([
    {
      id: 0,
      time: "17:20:01",
      type: "SRE HEALTH",
      message: "Solar grid offsets active. Dome roof open.",
    },
    {
      id: 1,
      time: "17:20:04",
      type: "TELEMETRY",
      message: "Platform 3 rail loop express train arrival: 142 fans.",
    },
    {
      id: 2,
      time: "17:20:08",
      type: "AI PREDICT",
      message: "Ingress backup at Gate B turnstiles resolved by redirect.",
    },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      const date = new Date();
      const timeStr = `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;

      const randomTemplate = LOG_TEMPLATES[Math.floor(Math.random() * LOG_TEMPLATES.length)];

      const newLog: LogItem = {
        id: Date.now(),
        time: timeStr,
        ...randomTemplate,
      };

      setLogs((prev) => {
        const next = [...prev, newLog];
        if (next.length > 3) {
          next.shift();
        }
        return next;
      });
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40 max-w-sm w-[320px] hidden md:block rounded-2xl border border-neutral-900 bg-neutral-950/80 backdrop-blur-md p-4 text-left shadow-2xl font-mono text-[9px] space-y-3">
      {/* Header telemetry status */}
      <div className="flex items-center justify-between border-b border-neutral-900 pb-2">
        <div className="flex items-center gap-1.5 text-neutral-400 font-bold uppercase tracking-wider font-display text-[9px]">
          <Terminal className="h-3.5 w-3.5 text-cyber-green" />
          <span>Operations Telemetry</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-cyber-green animate-ping" />
          <span className="text-cyber-green font-bold text-[8px] tracking-widest uppercase">
            Live Link
          </span>
        </div>
      </div>

      {/* Logs stream */}
      <div className="space-y-2.5 h-[110px] overflow-hidden flex flex-col justify-end">
        {logs.map((log) => {
          let badgeColor = "text-stadium-blue border-stadium-blue/20 bg-stadium-blue/5";
          if (log.type === "AI PREDICT")
            badgeColor = "text-victory-gold border-victory-gold/20 bg-victory-gold/5";
          if (log.type === "DISPATCH")
            badgeColor = "text-rose-500 border-rose-500/20 bg-rose-500/5";
          if (log.type === "SRE HEALTH")
            badgeColor = "text-cyber-green border-cyber-green/20 bg-cyber-green/5";

          return (
            <div
              key={log.id}
              className="space-y-1 animate-slide-up border-l border-neutral-900 pl-2"
            >
              <div className="flex items-center gap-1.5 text-neutral-500 font-bold">
                <span>{log.time}</span>
                <span
                  className={`px-1.5 py-0.5 rounded border text-[7px] tracking-wider uppercase font-semibold ${badgeColor}`}
                >
                  {log.type}
                </span>
              </div>
              <p className="text-neutral-300 leading-normal truncate">{log.message}</p>
            </div>
          );
        })}
      </div>

      {/* Lower state indicators */}
      <div className="border-t border-neutral-900 pt-2 flex items-center justify-between text-neutral-600 font-bold text-[8px]">
        <span className="flex items-center gap-1">
          <Shield className="h-3 w-3" />
          ERGP CHECKPASS
        </span>
        <span className="flex items-center gap-1">
          <Activity className="h-3 w-3" />
          STABILITY: 98.4%
        </span>
      </div>
    </div>
  );
}
