"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TrendingUp, BrainCircuit, Activity, Database, ArrowRight } from "lucide-react";

export function ReplayPreview() {
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

  return (
    <section
      id="ai-replay-preview"
      className="py-28 bg-[#020203] border-t border-neutral-900 px-6 scroll-mt-16 relative overflow-hidden text-left"
    >
      {/* 1. Glowing timeline connector from previous section (Pipeline -> Learning) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1.5px] h-24 bg-gradient-to-b from-cyber-green/50 via-emerald-400/30 to-transparent pointer-events-none" />

      {/* Background Radial Gradient & Tech Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.02),transparent_75%)] pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-[0.015] pointer-events-none" />

      {/* Tiny floating background particle sparks */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[15%] w-1 h-1 rounded-full bg-cyber-green/40 animate-pulse" />
        <div className="absolute top-[60%] left-[80%] w-1.5 h-1.5 rounded-full bg-emerald-400/20 animate-ping [animation-duration:3s]" />
        <div className="absolute top-[40%] right-[25%] w-1 h-1 rounded-full bg-cyber-green/30 animate-pulse [animation-delay:1.5s]" />
      </div>

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        {/* Desktop Split Grid (Desktop 45/55 Split, Tablet stacked, Mobile Image first) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* LEFT PANEL: Storytelling & Editorial Copy (45% Width) */}
          <div className="order-2 lg:order-1 lg:col-span-5 space-y-8 flex flex-col justify-center">
            <div className="space-y-4">
              {/* Section Label */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-green/10 border border-cyber-green/20 text-cyber-green text-xs font-semibold uppercase tracking-widest font-mono">
                <BrainCircuit className="h-3.5 w-3.5" />
                <span>AI Replay & Continuous Learning</span>
              </div>

              {/* Heading */}
              <h2 className="text-4xl sm:text-5xl font-extrabold font-display text-white tracking-tight leading-[1.08] select-none">
                Every Match Makes <br />
                The Next One Smarter.
              </h2>

              {/* Description */}
              <p className="text-neutral-400 text-sm leading-relaxed max-w-lg">
                Unlike traditional stadium systems that forget after every event, StadiumPulse AI
                continuously learns from every match, crowd movement, emergency, and operational
                decision.
              </p>
              <p className="text-neutral-400 text-sm leading-relaxed max-w-lg">
                The AI improves routing, resource allocation, crowd prediction, and emergency
                response over time.
              </p>
            </div>

            {/* Premium Metric Cards Stack */}
            <div className="grid grid-cols-3 gap-4 border-t border-neutral-900 pt-6">
              {/* Metric 1 */}
              <div className="space-y-1.5 text-left font-mono">
                <span className="text-[7.5px] text-neutral-500 font-bold uppercase tracking-wider block">
                  📈 Queue Predict
                </span>
                <span className="text-xl sm:text-2xl font-extrabold text-white leading-none">
                  98.2%
                </span>
                <span className="text-[7px] text-cyber-green font-bold uppercase block tracking-widest">
                  Accuracy
                </span>
              </div>

              {/* Metric 2 */}
              <div className="space-y-1.5 text-left font-mono">
                <span className="text-[7.5px] text-neutral-500 font-bold uppercase tracking-wider block">
                  ⚡ Emergency Resp
                </span>
                <span className="text-xl sm:text-2xl font-extrabold text-cyber-green leading-none">
                  +32%
                </span>
                <span className="text-[7px] text-neutral-500 font-bold uppercase block tracking-widest">
                  Improved
                </span>
              </div>

              {/* Metric 3 */}
              <div className="space-y-1.5 text-left font-mono">
                <span className="text-[7.5px] text-neutral-500 font-bold uppercase tracking-wider block">
                  🚇 Transit Flow
                </span>
                <span className="text-xl sm:text-2xl font-extrabold text-white leading-none">
                  +26%
                </span>
                <span className="text-[7px] text-neutral-500 font-bold uppercase block tracking-widest">
                  Optimized
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2 text-left">
              <Button
                variant="glass"
                className="rounded-2xl font-semibold border-neutral-850 hover:border-cyber-green/50 text-white flex items-center gap-2 group transition-all"
              >
                <span>Explore Replay Center</span>
                <ArrowRight className="h-4 w-4 text-cyber-green transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          {/* RIGHT PANEL: Replay Command Center Image (55% Width) */}
          <div className="order-1 lg:order-2 lg:col-span-7 flex justify-center">
            {/* Visual Card Container */}
            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="h-[320px] sm:h-[450px] lg:h-[600px] w-full rounded-[28px] border border-[rgba(255,255,255,0.08)] bg-neutral-950/80 shadow-[0_0_40px_rgba(16,185,129,0.1)] relative overflow-hidden flex flex-col justify-between p-6 group cursor-pointer"
            >
              {/* Internal Radial Gradient Glowing overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.03),transparent_70%)] pointer-events-none z-10" />

              {/* Main Visual Image with Parallax & Hover zoom */}
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
                    src="/images/replay_center.jpg"
                    alt="Stadium Operations Replay Center featuring multi-angle AI insights and pass maps"
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                  />
                </motion.div>
              </div>

              {/* Soft Cyan/Emerald glowing screen overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/0 via-cyan-500/0 to-emerald-400/4 opacity-10 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />

              {/* Holographic Scanline sweeping vertically every 8 seconds */}
              <div className="absolute inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyber-green/40 to-transparent animate-scan z-20 pointer-events-none" />

              {/* FLOATING GLASS PANELS */}

              {/* Top Left: AI Replay */}
              <div className="absolute top-[8%] left-[6%] z-25 bg-neutral-950/75 border border-[#ffffff10] backdrop-blur-md px-2 py-1.5 sm:px-3.5 sm:py-2.5 rounded-xl sm:rounded-2xl flex items-center gap-1.5 sm:gap-2.5 shadow-lg group-hover:-translate-y-1 transition-transform duration-300">
                <div className="p-1 sm:p-1.5 rounded-lg bg-cyber-green/15 text-cyber-green">
                  <BrainCircuit className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </div>
                <div className="text-left font-mono">
                  <span className="text-[5.5px] sm:text-[7px] text-neutral-400 uppercase block font-bold tracking-wider leading-none">
                    🧠 AI Replay
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-extrabold text-white mt-0.5 block leading-none">
                    Watching Match #128
                  </span>
                </div>
              </div>

              {/* Top Right: Learning Confidence */}
              <div className="absolute top-[8%] right-[6%] z-25 bg-neutral-950/75 border border-[#ffffff10] backdrop-blur-md px-2 py-1.5 sm:px-3.5 sm:py-2.5 rounded-xl sm:rounded-2xl flex items-center gap-1.5 sm:gap-2.5 shadow-lg group-hover:-translate-y-1 transition-transform duration-300 delay-75">
                <div className="p-1 sm:p-1.5 rounded-lg bg-stadium-blue/15 text-stadium-blue">
                  <TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </div>
                <div className="text-left font-mono">
                  <span className="text-[5.5px] sm:text-[7px] text-neutral-400 uppercase block font-bold tracking-wider leading-none">
                    📊 Learning Conf
                  </span>
                  <span className="text-[9px] sm:text-xs font-extrabold text-white mt-0.5 block leading-none">
                    96%
                  </span>
                </div>
              </div>

              {/* Bottom Left: Events Processed */}
              <div className="absolute bottom-[8%] left-[6%] z-25 bg-neutral-950/75 border border-[#ffffff10] backdrop-blur-md px-2 py-1.5 sm:px-3.5 sm:py-2.5 rounded-xl sm:rounded-2xl flex items-center gap-1.5 sm:gap-2.5 shadow-lg group-hover:-translate-y-1 transition-transform duration-300 delay-100">
                <div className="p-1 sm:p-1.5 rounded-lg bg-victory-gold/15 text-victory-gold">
                  <Database className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </div>
                <div className="text-left font-mono">
                  <span className="text-[5.5px] sm:text-[7px] text-neutral-400 uppercase block font-bold tracking-wider leading-none">
                    ⚽ Event Telemetry
                  </span>
                  <span className="text-[8px] sm:text-[10px] font-extrabold text-white mt-0.5 block leading-none">
                    12,840 Events
                  </span>
                </div>
              </div>

              {/* Bottom Right: Model Updated */}
              <div className="absolute bottom-[8%] right-[6%] z-25 bg-neutral-950/75 border border-[#ffffff10] backdrop-blur-md px-2 py-1.5 sm:px-3.5 sm:py-2.5 rounded-xl sm:rounded-2xl flex items-center gap-1.5 sm:gap-2.5 shadow-lg group-hover:-translate-y-1 transition-transform duration-300 delay-150">
                <div className="p-1 sm:p-1.5 rounded-lg bg-[#00e5ff]/15 text-[#00e5ff]">
                  <Activity className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </div>
                <div className="text-left font-mono">
                  <span className="text-[5.5px] sm:text-[7px] text-neutral-400 uppercase block font-bold tracking-wider leading-none">
                    🔄 Model Updated
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-extrabold text-white mt-0.5 block leading-none">
                    2 mins ago
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes scan {
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
        .animate-scan {
          animation: scan 8s linear infinite;
        }
      `}</style>
    </section>
  );
}
