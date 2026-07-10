"use client";

import React, { useState } from "react";
import { ReplayService, LearningRecord } from "@/services/replay.service";
import { Card, CardHeader, CardTitle, CardContent } from "./card";
import { 
  BrainCircuit, 
  ArrowRight, 
  Database
} from "lucide-react";

export function AILearningEngine() {
  const records = ReplayService.getLearningRecords();
  const [selectedRecord, setSelectedRecord] = useState<LearningRecord>(records[0]);

  // Mock Decision History audit log
  const decisionHistory = [
    {
      problem: "Gate B Ingress Backup",
      recommendation: "Redirect 18% flow north to Gate A North turnstiles",
      reason: "Gate B turnstile hardware offline; Gate A wait is 3m vs Gate B 28m",
      confidence: 94,
      result: "Saved 11 mins entry delay",
      outcome: "Success"
    },
    {
      problem: "Platform 3 Railway offline",
      recommendation: "Shift egress demand to Platform 5 shuttle lines",
      reason: "Meadowlands express train strike; shuttle platform has +15 buses",
      confidence: 88,
      result: "Diverted 4,000 exiting fans",
      outcome: "Success"
    },
    {
      problem: "Trauma incident Section 112",
      recommendation: "Clear ambulance corridor Lane C; pedestrian lock",
      reason: "EMT emergency response requires 3-minute transit road clearances",
      confidence: 97,
      result: " Medic arrival in 2.4 mins",
      outcome: "Optimal"
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left font-sans">
      
      {/* Left Column: Continuous Learning Loop (5 Columns) */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        <Card variant="glass" className="border-victory-gold/20 bg-neutral-950/60 backdrop-blur-xl relative overflow-hidden flex-grow glow-gold">
          <CardHeader className="pb-3 border-b border-neutral-900">
            <div className="flex items-center gap-2 text-victory-gold font-bold text-xs uppercase tracking-wider font-display">
              <BrainCircuit className="h-4.5 w-4.5 animate-pulse" />
              Learning Engine
            </div>
            <CardTitle className="text-white text-base mt-1">Continuous Training Feedback</CardTitle>
          </CardHeader>
          
          <CardContent className="pt-4 flex flex-col gap-4 text-xs">
            {/* Visual loop flowchart nodes */}
            <div className="p-3 bg-neutral-900/40 border border-neutral-850 rounded-xl flex flex-col gap-3 justify-between">
              <div className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">
                Active Reinforcement Loop
              </div>
              
              <div className="flex flex-col gap-2 relative">
                {/* Node 1: Previous Congestion */}
                <div className="p-2 bg-neutral-950 rounded-lg border border-rose-950 text-rose-400 font-medium">
                  <span className="text-[8px] uppercase text-neutral-500 block">1. Previous Congestion</span>
                  {selectedRecord.previousCongestion}
                </div>

                {/* Arrow */}
                <div className="flex justify-center text-neutral-700 py-0.5">
                  <ArrowRight className="h-4 w-4 rotate-90" />
                </div>

                {/* Node 2: Learned Behavior */}
                <div className="p-2 bg-neutral-950 rounded-lg border border-victory-gold/20 text-neutral-200">
                  <span className="text-[8px] uppercase text-neutral-500 block">2. Learned Behavior</span>
                  {selectedRecord.learnedBehavior}
                </div>

                {/* Arrow */}
                <div className="flex justify-center text-neutral-700 py-0.5">
                  <ArrowRight className="h-4 w-4 rotate-90" />
                </div>

                {/* Node 3: Improved Outcomes */}
                <div className="p-2 bg-neutral-950 rounded-lg border border-cyber-green/20 text-cyber-green font-medium">
                  <span className="text-[8px] uppercase text-cyber-green block">3. Better Outcome (+{selectedRecord.improvementPercent}%)</span>
                  {selectedRecord.improvedRouting}
                </div>
              </div>
            </div>

            {/* Showcase Selector tabs */}
            <div className="flex flex-col gap-2">
              <div className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">
                Select Congestion Pattern
              </div>
              <div className="flex gap-1.5">
                {records.map((rec) => (
                  <button
                    key={rec.id}
                    onClick={() => setSelectedRecord(rec)}
                    className={`flex-grow py-1.5 px-2 rounded-lg border text-center font-bold text-[9px] uppercase tracking-wider transition-colors ${
                      selectedRecord.id === rec.id 
                        ? "border-victory-gold bg-victory-gold/10 text-white" 
                        : "border-neutral-900 bg-neutral-950 hover:bg-neutral-900 text-neutral-500"
                    }`}
                  >
                    {rec.scenario}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Column: Decision History Table (7 Columns) */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        <Card variant="glass" className="border-neutral-850 bg-neutral-950/60 backdrop-blur-xl flex-grow">
          <CardHeader className="pb-3 border-b border-neutral-900">
            <div className="flex items-center gap-1.5 text-cyber-green font-bold text-xs uppercase tracking-wider font-display">
              <Database className="h-4.5 w-4.5" />
              Decision History
            </div>
            <CardTitle className="text-white text-base mt-1">Audit Ledger & Outcome Registry</CardTitle>
          </CardHeader>
          
          <CardContent className="pt-4 overflow-x-auto text-[10px]">
            <table className="w-full text-neutral-300 min-w-[500px]">
              <thead>
                <tr className="border-b border-neutral-900 text-neutral-500 uppercase tracking-wider font-mono">
                  <th className="pb-2 font-bold text-left">Incident</th>
                  <th className="pb-2 font-bold text-left">AI Recommendation</th>
                  <th className="pb-2 font-bold text-center">Confidence</th>
                  <th className="pb-2 font-bold text-center">Outcome</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900/60">
                {decisionHistory.map((dec, idx) => (
                  <tr key={idx} className="hover:bg-neutral-900/20">
                    <td className="py-2.5 font-semibold text-white max-w-[110px] break-words">{dec.problem}</td>
                    <td className="py-2.5 max-w-[200px] break-words leading-relaxed pr-3">
                      <p className="text-neutral-200">{dec.recommendation}</p>
                      <span className="text-[9px] text-neutral-500 italic block mt-0.5">&rarr; {dec.reason}</span>
                    </td>
                    <td className="py-2.5 text-center font-mono text-victory-gold font-bold">{dec.confidence}%</td>
                    <td className="py-2.5 text-center">
                      <span className="px-2 py-0.5 rounded bg-cyber-green/10 border border-cyber-green/20 text-cyber-green font-bold uppercase tracking-wider text-[8px]">
                        {dec.outcome}
                      </span>
                      <span className="text-[9px] text-neutral-400 block mt-0.5">{dec.result}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
