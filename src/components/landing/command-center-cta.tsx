"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  ArrowRight, 
  CloudSun, 
  Users, 
  ShieldAlert, 
  Bus, 
  Bot, 
  Activity,
  Compass,
  Tv,
  Cpu
} from "lucide-react";

export function CommandCenterCTA({ onLaunchDemo }: { onLaunchDemo: () => void }) {
  return (
    <section className="relative py-32 bg-[#020203] border-t border-neutral-900 overflow-hidden px-6 text-center">
      
      {/* 1. Gold & Cyan background aurora glow */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-r from-stadium-blue/10 via-cyber-green/5 to-victory-gold/10 blur-[130px] opacity-75" />
      </div>

      <div className="max-w-5xl mx-auto space-y-14 relative z-10 flex flex-col items-center">
        
        {/* Title */}
        <h2 className="text-4xl sm:text-7xl font-extrabold font-display leading-[1.05] tracking-tight text-white max-w-3xl">
          The Stadium is Yours.
          <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-victory-gold via-amber-500 to-cyber-green">
            Take Command.
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-neutral-400 max-w-xl mx-auto leading-relaxed">
          Step into the live stadium digital twin operations console, toggle system overlays, and watch StadiumPulse AI orchestrate multi-agent security alerts.
        </p>

        {/* 2. Glass Dashboard Cockpit Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-4xl rounded-3xl border border-neutral-900 bg-neutral-950/60 backdrop-blur-2xl p-6 relative overflow-hidden shadow-2xl text-left hidden md:block"
        >
          {/* Glass header panel */}
          <div className="flex items-center justify-between border-b border-neutral-900 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-cyber-green animate-ping" />
              <span className="text-[10px] text-neutral-400 font-mono font-bold uppercase tracking-wider">MetLife Stadium Twin Cockpit // Live Preview</span>
            </div>
            <div className="flex gap-2">
              <span className="h-2 w-2 rounded-full bg-neutral-800" />
              <span className="h-2 w-2 rounded-full bg-neutral-800" />
              <span className="h-2 w-2 rounded-full bg-neutral-800" />
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6 items-stretch">
            
            {/* Sidebar Mockup (3 cols) */}
            <div className="col-span-3 border-r border-neutral-900/60 pr-4 flex flex-col gap-3.5">
              <div className="text-[8px] text-neutral-500 font-mono font-bold uppercase tracking-widest">NAVIGATION</div>
              
              <div className="space-y-1.5 text-[10px]">
                <div className="px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-850 text-white font-bold flex items-center gap-2">
                  <Activity className="h-3.5 w-3.5 text-cyber-green" />
                  Twin Monitor
                </div>
                <div className="px-3 py-2 rounded-xl text-neutral-400 font-semibold hover:bg-neutral-900/40 flex items-center gap-2 cursor-pointer">
                  <Compass className="h-3.5 w-3.5 text-neutral-500" />
                  Routes Solver
                </div>
                <div className="px-3 py-2 rounded-xl text-neutral-400 font-semibold hover:bg-neutral-900/40 flex items-center gap-2 cursor-pointer">
                  <Tv className="h-3.5 w-3.5 text-neutral-500" />
                  Match Replay
                </div>
                <div className="px-3 py-2 rounded-xl text-neutral-400 font-semibold hover:bg-neutral-900/40 flex items-center gap-2 cursor-pointer">
                  <Cpu className="h-3.5 w-3.5 text-neutral-500" />
                  Vertex API
                </div>
              </div>
            </div>

            {/* Maps & Digital Twin mockup (6 cols) */}
            <div className="col-span-6 rounded-2xl border border-neutral-900 bg-neutral-950/80 relative overflow-hidden flex flex-col justify-between p-4 min-h-[220px]">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.02),transparent_70%)]" />
              
              {/* Fake coordinate overlay */}
              <div className="text-[8px] text-neutral-500 font-mono font-bold space-y-0.5 relative z-10">
                <div>COORD: 40.8135 N, -74.0743 W</div>
                <div>GRID INDEX: SEC-112-STREET</div>
              </div>

              {/* Concentric scan circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-36 w-36 rounded-full border border-cyber-green/5 border-dashed flex items-center justify-center pointer-events-none">
                <div className="h-20 w-20 rounded-full border border-electric-cyan/10 flex items-center justify-center">
                  <div className="h-6 w-6 rounded-full bg-cyber-green/20 animate-pulse" />
                </div>
              </div>

              {/* Chatbot overlay mockup */}
              <div className="p-2.5 rounded-xl bg-neutral-900/90 border border-neutral-850 relative z-10 text-[9px] max-w-[200px] mt-auto self-end flex items-start gap-2">
                <Bot className="h-3.5 w-3.5 text-cyber-green flex-shrink-0 animate-pulse mt-0.5" />
                <div>
                  <div className="font-bold text-cyber-green">AI COMPANION</div>
                  <div className="text-neutral-300 leading-normal mt-0.5">Rerouting family to Step-free Gate A. Path solved.</div>
                </div>
              </div>
            </div>

            {/* Health Stability metrics panel (3 cols) */}
            <div className="col-span-3 flex flex-col justify-between gap-4">
              <div className="p-3.5 rounded-2xl border border-neutral-900 bg-neutral-950/40 space-y-1.5">
                <span className="text-[8px] text-neutral-500 font-mono font-bold uppercase tracking-wider block">Pulse Index</span>
                <div className="text-[20px] font-extrabold text-white font-mono leading-none">98.2%</div>
                <span className="text-[8px] text-cyber-green font-semibold">Stability Secure</span>
              </div>

              <div className="p-3.5 rounded-2xl border border-neutral-900 bg-neutral-950/40 space-y-1.5">
                <span className="text-[8px] text-neutral-500 font-mono font-bold uppercase tracking-wider block">Occupancy</span>
                <div className="text-[20px] font-extrabold text-white font-mono leading-none">82,500</div>
                <span className="text-[8px] text-victory-gold font-semibold">MetLife Full bowl</span>
              </div>

              <div className="p-3.5 rounded-2xl border border-neutral-900 bg-neutral-950/40 text-[9px] flex items-center gap-1.5 text-rose-400 font-bold uppercase tracking-wider">
                <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                <span>EMT dispatch clear</span>
              </div>
            </div>

          </div>
        </motion.div>

        {/* 3. Mega Launch Button */}
        <motion.div 
          whileHover={{ scale: 1.04 }} 
          whileTap={{ scale: 0.98 }}
          className="pt-4"
        >
          <Button
            onClick={onLaunchDemo}
            variant="primary"
            size="lg"
            className="px-12 py-7.5 rounded-2xl font-bold tracking-widest uppercase border border-victory-gold/40 bg-gradient-to-r from-victory-gold via-amber-500 to-cyber-green text-black group relative overflow-hidden transition-all duration-300 shadow-[0_0_30px_rgba(245,158,11,0.2)] hover:shadow-[0_0_50px_rgba(0,230,118,0.45)] cursor-pointer"
          >
            {/* Sliding sweep glare */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-sweep pointer-events-none" />
            Launch StadiumPulse AI
            <ArrowRight className="h-5.5 w-5.5 ml-2 animate-pulse" />
          </Button>
        </motion.div>

        {/* 4. Small Widgets cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 w-full pt-10 max-w-3xl text-left">
          
          <Card variant="glass" className="p-3.5 border-neutral-900 bg-neutral-950/40 text-xs">
            <div className="flex items-center gap-1.5 text-neutral-500 font-bold uppercase text-[9px] mb-1 font-display">
              <CloudSun className="h-3.5 w-3.5 text-amber-400" />
              Dome Status
            </div>
            <div className="font-bold text-white">Open Dome</div>
            <div className="text-[8px] text-neutral-500">Solar offsets active</div>
          </Card>

          <Card variant="glass" className="p-3.5 border-neutral-900 bg-neutral-950/40 text-xs">
            <div className="flex items-center gap-1.5 text-neutral-500 font-bold uppercase text-[9px] mb-1 font-display">
              <Users className="h-3.5 w-3.5 text-electric-cyan" />
              Occupancy
            </div>
            <div className="font-bold text-white">82,500</div>
            <div className="text-[8px] text-neutral-500">MetLife Full bowl</div>
          </Card>

          <Card variant="glass" className="p-3.5 border-neutral-900 bg-neutral-950/40 text-xs">
            <div className="flex items-center gap-1.5 text-neutral-500 font-bold uppercase text-[9px] mb-1 font-display">
              <ShieldAlert className="h-3.5 w-3.5 text-rose-500" />
              Evacuation
            </div>
            <div className="font-bold text-white text-rose-500">Ready</div>
            <div className="text-[8px] text-neutral-500">Ramps monitored</div>
          </Card>

          <Card variant="glass" className="p-3.5 border-neutral-900 bg-neutral-950/40 text-xs">
            <div className="flex items-center gap-1.5 text-neutral-500 font-bold uppercase text-[9px] mb-1 font-display">
              <Bus className="h-3.5 w-3.5 text-transport-cyan" />
              Transit
            </div>
            <div className="font-bold text-white">Platform 3</div>
            <div className="text-[8px] text-neutral-500">Trains on-time</div>
          </Card>

          <Card variant="glass" className="p-3.5 border-neutral-900 bg-neutral-950/40 text-xs col-span-2 md:col-span-1">
            <div className="flex items-center gap-1.5 text-neutral-500 font-bold uppercase text-[9px] mb-1 font-display">
              <Bot className="h-3.5 w-3.5 text-cyber-green animate-pulse" />
              Gemini
            </div>
            <div className="font-bold text-white">Active</div>
            <div className="text-[8px] text-neutral-500">ERGP checks secure</div>
          </Card>

        </div>

      </div>
    </section>
  );
}
