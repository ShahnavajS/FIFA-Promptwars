"use client";

import React, { useEffect, useState } from "react";
import { useMatchStore, MatchPhase } from "@/stores/useMatchStore";
import { TelemetryListener } from "@/lib/event-bus/event.listener";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./card";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Info } from "lucide-react";

interface FeedLog {
  id: string;
  timeString: string;
  category: "operations" | "transit" | "security" | "climate" | "alert";
  message: string;
}

const PHASE_LOGS: Record<MatchPhase, FeedLog[]> = {
  "pre-match": [
    {
      id: "ops-1",
      timeString: "08:00",
      category: "operations",
      message: "Meadowlands Parking Lot A opened. Attendants dispatched.",
    },
    {
      id: "ops-2",
      timeString: "08:05",
      category: "climate",
      message: "MetLife Dome HVAC systems initialized. Climate control active.",
    },
  ],
  arrival: [
    {
      id: "ops-3",
      timeString: "08:15",
      category: "transit",
      message: "Meadowlands Rail Link active. Trains arriving every 10 mins.",
    },
    {
      id: "ops-4",
      timeString: "08:20",
      category: "operations",
      message: "First aid volunteer stations fully staffed (50 personnel).",
    },
  ],
  security: [
    {
      id: "ops-5",
      timeString: "08:35",
      category: "security",
      message: "Security checkpoints active. Avg queue clearance time: 12 minutes.",
    },
    {
      id: "ops-6",
      timeString: "08:40",
      category: "operations",
      message: "Accessibility ramps clear. Staff reporting high elevator usage.",
    },
  ],
  "gate-entry": [
    {
      id: "ops-7",
      timeString: "08:50",
      category: "security",
      message: "Gate B turnstile congestion detected. Rerouting instructions pushed.",
    },
    {
      id: "ops-8",
      timeString: "08:55",
      category: "operations",
      message: "Gate A North Entrance remains clear. Wait time: 3 mins.",
    },
  ],
  "find-seat": [
    {
      id: "ops-9",
      timeString: "09:05",
      category: "operations",
      message: "Bowl seating ingress peaks. 76,000 fans checked in.",
    },
    {
      id: "ops-10",
      timeString: "09:10",
      category: "climate",
      message: "Stadium lighting adjusted to Match floodlight parameters.",
    },
  ],
  "pre-kickoff": [
    {
      id: "ops-11",
      timeString: "09:15",
      category: "operations",
      message: "Teams entering tunnel. Anthem ceremonies commencing.",
    },
    {
      id: "ops-12",
      timeString: "09:18",
      category: "security",
      message: "Gates closing. General ingress completed.",
    },
  ],
  kickoff: [
    {
      id: "ops-13",
      timeString: "09:20",
      category: "operations",
      message: "Match Kickoff. Navigation systems locked to seat coordinates.",
    },
    {
      id: "ops-14",
      timeString: "09:25",
      category: "climate",
      message: " Dome solar capture charging battery bank reserves.",
    },
  ],
  halftime: [
    {
      id: "ops-15",
      timeString: "10:05",
      category: "operations",
      message: "Halftime whistle. Restroom occupancy rising at Sectors 103/112.",
    },
    {
      id: "ops-16",
      timeString: "10:10",
      category: "transit",
      message: "Transit telemetry check: bus lanes clear, train link on standby.",
    },
  ],
  "second-half": [
    {
      id: "ops-17",
      timeString: "10:20",
      category: "operations",
      message: "Second half underway. Concessions queues dissipating.",
    },
    {
      id: "ops-18",
      timeString: "10:25",
      category: "climate",
      message: "Dome temperature stabilized at 28°C under solar offsets.",
    },
  ],
  "full-time": [
    {
      id: "ops-19",
      timeString: "11:10",
      category: "operations",
      message: "Whistle. Argentina wins 2-1. Egress routes initialized.",
    },
    {
      id: "ops-20",
      timeString: "11:15",
      category: "transit",
      message: "Shuttle express bus lines delayed 24m. Rail link ready.",
    },
  ],
  exit: [
    {
      id: "ops-21",
      timeString: "11:25",
      category: "transit",
      message: "Rideshare Zone 1 surge alerts pushed to Fan companion devices.",
    },
    {
      id: "ops-22",
      timeString: "11:30",
      category: "security",
      message: "Exit gates A & B flow rate: 650 fans/minute. Normal egress.",
    },
  ],
  "post-match": [
    {
      id: "ops-23",
      timeString: "12:00",
      category: "operations",
      message: "Stadium egress completed. Safety units clearing concourses.",
    },
    {
      id: "ops-24",
      timeString: "12:15",
      category: "operations",
      message: "Ops suspended. Cleaning & maintenance modules dispatched.",
    },
  ],
};

export function ActivityFeed() {
  const currentPhase = useMatchStore((state) => state.currentPhase);
  const [logs, setLogs] = useState<FeedLog[]>([]);

  // Repopulate feed when the phase changes
  useEffect(() => {
    // Collect all logs up to current phase for rich listing
    const phaseKeys = Object.keys(PHASE_LOGS) as MatchPhase[];
    const activeIndex = phaseKeys.indexOf(currentPhase);

    let compiledLogs: FeedLog[] = [];
    for (let i = 0; i <= activeIndex; i++) {
      const logsForPhase = PHASE_LOGS[phaseKeys[i]];
      if (logsForPhase) {
        compiledLogs = [...compiledLogs, ...logsForPhase];
      }
    }
    // Limit to latest 6 logs for space
    setLogs(compiledLogs.slice(-6));
  }, [currentPhase]);

  // Subscribe to emergency triggers on the Event Bus
  useEffect(() => {
    const unsubscribeAlarm = TelemetryListener.subscribe("EMERGENCY_ALARM_TRIGGERED", (event) => {
      const alarmLog: FeedLog = {
        id: `alarm-${Math.random()}`,
        timeString: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        category: "alert",
        message: `EMERGENCY ALERT: Alarm triggered at ${(event.payload as { location: string }).location}. Security dispatched.`,
      };
      setLogs((prev) => [alarmLog, ...prev.slice(0, 5)]);
    });

    const unsubscribePortal = TelemetryListener.subscribe("ROLE_PORTAL_SWITCHED", (event) => {
      const roleLog: FeedLog = {
        id: `role-${Math.random()}`,
        timeString: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        category: "operations",
        message: `Dashboard role switched to ${(event.payload as { role: string }).role.toUpperCase()} mode.`,
      };
      setLogs((prev) => [roleLog, ...prev.slice(0, 5)]);
    });

    return () => {
      unsubscribeAlarm();
      unsubscribePortal();
    };
  }, []);

  const categoryColors = {
    operations: "border-stadium-blue text-stadium-blue bg-stadium-blue/10",
    transit: "border-transport-cyan text-transport-cyan bg-transport-cyan/10",
    security: "border-crowd-orange text-crowd-orange bg-crowd-orange/10",
    climate: "border-eco-green text-eco-green bg-eco-green/10",
    alert: "border-emergency-red text-emergency-red bg-emergency-red/10 animate-pulse",
  };

  return (
    <Card
      variant="glass"
      className="text-left border-neutral-800 bg-neutral-950/60 backdrop-blur-xl flex flex-col h-full"
    >
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 text-crowd-orange font-bold text-xs uppercase tracking-wider font-display">
          <Clock className="h-4 w-4" />
          Live Operations Feed
        </div>
        <CardTitle className="text-white text-lg">Activity Telemetry</CardTitle>
        <CardDescription className="text-neutral-400 text-xs">
          Real-time operations dispatch timeline streaming alerts.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-grow">
        <div className="flex flex-col gap-3 h-[280px] overflow-y-auto pr-1">
          <AnimatePresence initial={false}>
            {logs.map((log) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -15, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="p-3 rounded-xl border border-neutral-900 bg-neutral-950/40 flex items-start gap-3 text-xs"
              >
                {/* Category Badge */}
                <div
                  className={`flex-shrink-0 px-2 py-0.5 rounded border text-[9px] font-bold uppercase tracking-wider ${
                    categoryColors[log.category]
                  }`}
                >
                  {log.category === "climate" ? "Eco" : log.category}
                </div>

                <div className="flex-grow space-y-0.5">
                  <div className="text-neutral-500 font-mono text-[10px] font-semibold flex items-center gap-1">
                    <Info className="h-3 w-3 text-neutral-500" />
                    {log.timeString}
                  </div>
                  <p className="text-neutral-200 leading-normal">{log.message}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}
