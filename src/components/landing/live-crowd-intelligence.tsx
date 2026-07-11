"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Users, 
  Compass, 
  ShieldAlert, 
  Activity, 
  Zap
} from "lucide-react";

export function LiveCrowdIntelligence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const tickerItems = [
    "Gate D ↓ 18 min",
    "Metro Line A Running",
    "Medical Teams Ready",
    "Weather Stable",
    "Transit Capacity 82%",
    "Security Normal"
  ];

  return (
    <section 
      id="live-crowd-intelligence" 
      className="py-28 bg-[#020204] border-t border-neutral-900 px-6 scroll-mt-16 relative overflow-hidden text-left"
    >
      
      {/* Visual Section Transitions (Connecting green telemetry lines) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-24 bg-gradient-to-b from-cyber-green/50 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[2px] h-24 bg-gradient-to-t from-cyber-green/50 to-transparent pointer-events-none" />

      {/* Background Gradients, Grid & Particles */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.015),transparent_75%)] pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-[0.012] pointer-events-none" />
      
      {/* Subtle green glow behind image position */}
      <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />

      {/* Tiny particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[30%] left-[80%] w-1 h-1 rounded-full bg-cyber-green/30 animate-pulse" />
        <div className="absolute bottom-[20%] left-[20%] w-1.5 h-1.5 rounded-full bg-emerald-400/20 animate-ping [animation-duration:4s]" />
      </div>

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        
        {/* Main Grid: Desktop 45/55 Split, Tablet stacked, Mobile Image first */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT COLUMN: Text + Three Feature Cards (45% Width) */}
          <div className="order-2 lg:order-1 lg:col-span-5 space-y-8 flex flex-col justify-center">
            
            <div className="space-y-4">
              {/* Section Label */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-green/10 border border-cyber-green/20 text-cyber-green text-xs font-semibold uppercase tracking-widest font-mono">
                <Activity className="h-3.5 w-3.5" />
                <span>Live Crowd Intelligence</span>
              </div>

              {/* Heading */}
              <h2 className="text-4xl sm:text-5xl font-extrabold font-display text-white tracking-tight leading-[1.08]">
                Every Second. <br />
                Every Gate. <br />
                Every Decision.
              </h2>

              {/* Description */}
              <p className="text-neutral-400 text-sm leading-relaxed max-w-lg">
                When 80,000 fans leave a stadium simultaneously, every second matters. StadiumPulse AI continuously predicts crowd movement, recommends safer exits, coordinates transport, and prevents congestion before it happens.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="space-y-4">
              
              {/* Card 1: Crowd Prediction */}
              <div className="p-4.5 rounded-2xl border border-neutral-900 bg-neutral-950/40 flex items-start gap-4 hover:border-neutral-800 transition-colors">
                <div className="p-2.5 rounded-xl bg-stadium-blue/10 border border-stadium-blue/20 text-stadium-blue mt-0.5">
                  <Users className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Crowd Prediction</h4>
                  <p className="text-neutral-400 text-xs leading-relaxed">
                    AI forecasts congestion before it happens using live crowd telemetry.
                  </p>
                </div>
              </div>

              {/* Card 2: Smart Exit Routing */}
              <div className="p-4.5 rounded-2xl border border-neutral-900 bg-neutral-950/40 flex items-start gap-4 hover:border-neutral-800 transition-colors">
                <div className="p-2.5 rounded-xl bg-transport-cyan/10 border border-transport-cyan/20 text-transport-cyan mt-0.5">
                  <Compass className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Smart Exit Routing</h4>
                  <p className="text-neutral-400 text-xs leading-relaxed">
                    Every fan receives personalized exit guidance based on real-time density.
                  </p>
                </div>
              </div>

              {/* Card 3: Emergency Coordination */}
              <div className="p-4.5 rounded-2xl border border-neutral-900 bg-neutral-950/40 flex items-start gap-4 hover:border-neutral-800 transition-colors">
                <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 mt-0.5">
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Emergency Coordination</h4>
                  <p className="text-neutral-400 text-xs leading-relaxed">
                    Security, volunteers and medical teams receive synchronized AI recommendations.
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT COLUMN: Large provided image (55% Width) */}
          <div className="order-1 lg:order-2 lg:col-span-7 flex flex-col justify-center">
            
            {/* Image Container Card */}
            <div 
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="h-[500px] sm:h-[650px] w-full rounded-[30px] border border-[#ffffff10] bg-neutral-950/80 shadow-[0_0_40px_rgba(16,185,129,0.15)] relative overflow-hidden flex flex-col justify-between p-6 group cursor-pointer"
            >
              {/* Internal Radial Gradient */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.02),transparent_70%)] pointer-events-none z-10" />

              {/* Main Image with Zoom on Hover & Mouse Parallax */}
              <div className="absolute inset-0 overflow-hidden z-0">
                <motion.div
                  className="w-[106%] h-[106%] relative -left-[3%] -top-[3%]"
                  animate={{
                    x: mousePos.x * -16,
                    y: mousePos.y * -16,
                  }}
                  transition={{ type: "spring", stiffness: 100, damping: 28 }}
                >
                  <Image
                    src="/images/crowd_intelligence.jpg"
                    alt="Operations command room monitoring MetLife stadium exit routes with AR traffic flows"
                    fill
                    loading="lazy"
                    className="object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                    style={{ height: "167%" }}
                  />
                </motion.div>
              </div>

              {/* Glowing dashboard screen soft green overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/0 via-emerald-500/0 to-emerald-400/5 opacity-20 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />

              {/* Holographic Scanline sweeping vertically every 12 seconds */}
              <div className="absolute inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyber-green/30 to-transparent animate-slow-scan z-20 pointer-events-none" />

              {/* Telemetry line overlays (SVG Dash Line Animation) */}
              <svg className="absolute inset-0 w-full h-full opacity-50 group-hover:opacity-90 transition-opacity duration-500 z-15 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M 150 500 Q 300 450 350 300 T 550 200" 
                  fill="none" 
                  stroke="#10b981" 
                  strokeWidth="2.5" 
                  strokeDasharray="6, 12"
                  className="animate-dashboard-dash"
                />
              </svg>

              {/* FLOATING HUD CARDS */}
              
              {/* Top Left: Stadium Health */}
              <div className="absolute top-[8%] left-[6%] z-25 bg-neutral-950/75 border border-[#ffffff10] backdrop-blur-md px-3.5 py-2.5 rounded-2xl flex items-center gap-2.5 shadow-lg group-hover:-translate-y-1 transition-transform duration-300">
                <div className="p-1.5 rounded-lg bg-cyber-green/15 text-cyber-green">
                  <Activity className="h-4 w-4" />
                </div>
                <div className="text-left font-mono">
                  <span className="text-[7px] text-neutral-400 uppercase block font-bold tracking-wider">🟢 Stadium Health</span>
                  <span className="text-xs font-extrabold text-white mt-0.5 block">98%</span>
                </div>
              </div>

              {/* Top Right: Active Fans */}
              <div className="absolute top-[8%] right-[6%] z-25 bg-neutral-950/75 border border-[#ffffff10] backdrop-blur-md px-3.5 py-2.5 rounded-2xl flex items-center gap-2.5 shadow-lg group-hover:-translate-y-1 transition-transform duration-300 delay-75">
                <div className="p-1.5 rounded-lg bg-stadium-blue/15 text-stadium-blue">
                  <Users className="h-4 w-4" />
                </div>
                <div className="text-left font-mono">
                  <span className="text-[7px] text-neutral-400 uppercase block font-bold tracking-wider">👥 Active Fans</span>
                  <span className="text-xs font-extrabold text-white mt-0.5 block">81,234</span>
                </div>
              </div>

              {/* Bottom Left: Best Exit */}
              <div className="absolute bottom-[8%] left-[6%] z-25 bg-neutral-950/75 border border-[#ffffff10] backdrop-blur-md px-3.5 py-2.5 rounded-2xl flex items-center gap-2.5 shadow-lg group-hover:-translate-y-1 transition-transform duration-300 delay-100">
                <div className="p-1.5 rounded-lg bg-transport-cyan/15 text-transport-cyan">
                  <Compass className="h-4 w-4" />
                </div>
                <div className="text-left font-mono">
                  <span className="text-[7px] text-neutral-400 uppercase block font-bold tracking-wider">🚇 Best Exit</span>
                  <span className="text-xs font-extrabold text-white mt-0.5 block">Gate D</span>
                </div>
              </div>

              {/* Bottom Right: AI Confidence */}
              <div className="absolute bottom-[8%] right-[6%] z-25 bg-neutral-950/75 border border-[#ffffff10] backdrop-blur-md px-3.5 py-2.5 rounded-2xl flex items-center gap-2.5 shadow-lg group-hover:-translate-y-1 transition-transform duration-300 delay-150">
                <div className="p-1.5 rounded-lg bg-victory-gold/15 text-victory-gold">
                  <Zap className="h-4 w-4" />
                </div>
                <div className="text-left font-mono">
                  <span className="text-[7px] text-neutral-400 uppercase block font-bold tracking-wider">⚡ AI Confidence</span>
                  <span className="text-xs font-extrabold text-white mt-0.5 block">97%</span>
                </div>
              </div>

            </div>

            {/* INFINITE HORIZONTAL SCROLLING TELEMETRY TICKER */}
            <div className="mt-8 border border-neutral-900 bg-neutral-950/60 rounded-2xl py-4.5 overflow-hidden relative flex items-center">
              <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
              
              <div className="flex gap-16 whitespace-nowrap animate-ticker font-mono text-xs font-bold text-neutral-400 tracking-wider">
                {/* Double output for continuous scrolling */}
                {[...tickerItems, ...tickerItems].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-[9px] text-cyber-green font-mono">LIVE TELEMETRY //</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

      <style jsx global>{`
        @keyframes slow-scan {
          0% {
            top: 0%;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }
        .animate-slow-scan {
          animation: slow-scan 12s linear infinite;
        }

        @keyframes dashboard-dash {
          to {
            stroke-dashoffset: -36;
          }
        }
        .animate-dashboard-dash {
          animation: dashboard-dash 2s linear infinite;
        }

        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-ticker {
          animation: ticker 25s linear infinite;
        }
      `}</style>
    </section>
  );
}
