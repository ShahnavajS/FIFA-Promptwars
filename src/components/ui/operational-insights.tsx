"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./card";
import { TrendingUp, Clock, Bus, Accessibility, Flame, Leaf } from "lucide-react";

export function OperationalInsights() {
  const trendsList = [
    {
      title: "Gate Ingress Wait Peak",
      value: "28 mins",
      change: "-11 mins saving",
      trend: "down",
      icon: Clock,
      color: "text-rose-400 bg-rose-500/5 border-rose-500/10",
      desc: "Turnstile Gate B redirect balance active.",
    },
    {
      title: "EMT Medical Dispatch",
      value: "2.4 mins",
      change: "-36 sec faster",
      trend: "down",
      icon: Flame,
      color: "text-orange-400 bg-orange-500/5 border-orange-500/10",
      desc: "Emergency corridor Lane C clearance maintained.",
    },
    {
      title: "Shuttle Loop Dispatches",
      value: "8.5 mins",
      change: "+12% efficiency",
      trend: "up",
      icon: Bus,
      color: "text-cyan-400 bg-cyan-500/5 border-cyan-500/10",
      desc: "Platform 5 bus dispatches dynamically synchronized.",
    },
    {
      title: "Accessibility Compliance",
      value: "98.4%",
      change: "+2.4% compliancy",
      trend: "up",
      icon: Accessibility,
      color: "text-purple-400 bg-purple-500/5 border-purple-500/10",
      desc: "Wheelchair step-free paths redirection verified.",
    },
    {
      title: "Carbon Offset Score",
      value: "1,840g",
      change: "+19% eco savings",
      trend: "up",
      icon: Leaf,
      color: "text-eco-green bg-eco-green/5 border-eco-green/10",
      desc: "72% exited fans boarded Platform 3 rail loops.",
    },
  ];

  return (
    <Card
      variant="glass"
      className="border-neutral-850 bg-neutral-950/60 backdrop-blur-xl text-left font-sans"
    >
      <CardHeader className="pb-3 border-b border-neutral-900 flex flex-row items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-cyber-green font-bold text-xs uppercase tracking-wider font-display">
            <TrendingUp className="h-4.5 w-4.5" />
            Operational Analytics
          </div>
          <CardTitle className="text-white text-base mt-1">Tournament Performance Trends</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="pt-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {trendsList.map((t, idx) => {
            const Icon = t.icon;
            return (
              <div
                key={idx}
                className={`p-4 rounded-xl border flex flex-col gap-2 relative ${t.color}`}
              >
                <div className="flex justify-between items-start">
                  <span className="p-1.5 rounded-lg bg-neutral-955 border border-neutral-800/40">
                    <Icon className="h-4.5 w-4.5" />
                  </span>

                  <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-neutral-900 font-mono">
                    {t.change}
                  </span>
                </div>

                <div className="pt-2 text-left">
                  <span className="text-[10px] text-neutral-400 font-bold uppercase block tracking-wider">
                    {t.title}
                  </span>
                  <span className="text-xl font-bold text-white font-mono mt-0.5 block">
                    {t.value}
                  </span>
                </div>

                <p className="text-[9px] text-neutral-400 leading-normal border-t border-neutral-900/40 pt-2 mt-1 font-semibold">
                  {t.desc}
                </p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
