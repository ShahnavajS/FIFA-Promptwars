"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Compass, 
  Train, 
  Languages, 
  Accessibility, 
  Sparkles,
  Users,
  Bell
} from "lucide-react";

export function AICompanionExperience() {
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
      id="ai-companion-experience" 
      className="py-28 bg-[#020204] border-t border-neutral-900 px-6 scroll-mt-16 relative overflow-hidden text-left"
    >
      
      {/* Visual Section Transitions (Connecting green telemetry lines) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1.5px] h-24 bg-gradient-to-b from-cyber-green/50 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1.5px] h-24 bg-gradient-to-t from-cyber-green/50 to-transparent pointer-events-none" />

      {/* Background Gradients & Tech Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.015),transparent_75%)] pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-[0.012] pointer-events-none" />
      
      {/* Subtle emerald glow behind phone image */}
      <div className="absolute top-1/2 left-[10%] -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />

      {/* Tiny particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] right-[15%] w-1 h-1 rounded-full bg-cyber-green/30 animate-pulse" />
        <div className="absolute bottom-[30%] left-[75%] w-1 h-1 rounded-full bg-emerald-400/20 animate-ping [animation-duration:3.5s]" />
      </div>

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        
        {/* Main Grid: Desktop 55/45 Split, Tablet stacked, Mobile Image first */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT COLUMN: Smartphone Navigation Image (55% Width, Order 1 on Mobile, Order 1 on Desktop) */}
          <div className="order-1 lg:col-span-7 flex justify-center">
            
            {/* Image Container Card with phone floating animation */}
            <div 
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="h-[500px] sm:h-[650px] w-full rounded-[30px] border border-[#ffffff10] bg-neutral-950/80 shadow-[0_0_40px_rgba(16,185,129,0.15)] relative overflow-hidden flex flex-col justify-between p-6 group cursor-pointer animate-float"
            >
              {/* Radar pulse effect behind image */}
              <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
                <div className="w-[300px] h-[300px] rounded-full border border-emerald-500/10 animate-radar-pulse absolute" />
                <div className="w-[450px] h-[450px] rounded-full border border-emerald-500/5 animate-radar-pulse absolute [animation-delay:1.5s]" />
              </div>

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
                    src="/images/fan_navigation.jpg"
                    alt="World Cup fan holding a smartphone showing live AR wayfinding path"
                    fill
                    loading="lazy"
                    className="object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-[1.03] z-0"
                    style={{ height: "167%" }}
                  />
                </motion.div>
              </div>

              {/* Glowing dashboard screen soft green overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/0 via-emerald-500/0 to-emerald-400/5 opacity-10 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />

              {/* Telemetry line overlays (SVG Dash Line Animation) */}
              <svg className="absolute inset-0 w-full h-full opacity-60 group-hover:opacity-90 transition-opacity duration-500 z-15 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M 100 450 Q 280 400 350 280 T 500 180" 
                  fill="none" 
                  stroke="#10b981" 
                  strokeWidth="2.5" 
                  strokeDasharray="6, 12"
                  className="animate-route-dash"
                />
              </svg>

              {/* FLOATING HUD CARDS */}
              
              {/* Top Left: AI Navigation */}
              <div className="absolute top-[8%] left-[6%] z-25 bg-neutral-950/75 border border-[#ffffff10] backdrop-blur-md px-3.5 py-2.5 rounded-2xl flex items-center gap-2.5 shadow-lg group-hover:-translate-y-1 transition-transform duration-300">
                <div className="p-1.5 rounded-lg bg-cyber-green/15 text-cyber-green">
                  <Compass className="h-4 w-4" />
                </div>
                <div className="text-left font-mono">
                  <span className="text-[7px] text-neutral-400 uppercase block font-bold tracking-wider">🧭 AI Navigation</span>
                  <span className="text-xs font-extrabold text-white mt-0.5 block">Active</span>
                </div>
              </div>

              {/* Top Right: Next Train */}
              <div className="absolute top-[8%] right-[6%] z-25 bg-neutral-950/75 border border-[#ffffff10] backdrop-blur-md px-3.5 py-2.5 rounded-2xl flex items-center gap-2.5 shadow-lg group-hover:-translate-y-1 transition-transform duration-300 delay-75">
                <div className="p-1.5 rounded-lg bg-[#00e5ff]/15 text-[#00e5ff]">
                  <Train className="h-4 w-4" />
                </div>
                <div className="text-left font-mono">
                  <span className="text-[7px] text-neutral-400 uppercase block font-bold tracking-wider">🚇 Next Train</span>
                  <span className="text-xs font-extrabold text-white mt-0.5 block">2 min</span>
                </div>
              </div>

              {/* Bottom Left: Crowd */}
              <div className="absolute bottom-[8%] left-[6%] z-25 bg-neutral-950/75 border border-[#ffffff10] backdrop-blur-md px-3.5 py-2.5 rounded-2xl flex items-center gap-2.5 shadow-lg group-hover:-translate-y-1 transition-transform duration-300 delay-100">
                <div className="p-1.5 rounded-lg bg-stadium-blue/15 text-stadium-blue">
                  <Users className="h-4 w-4" />
                </div>
                <div className="text-left font-mono">
                  <span className="text-[7px] text-neutral-400 uppercase block font-bold tracking-wider">👥 Crowd</span>
                  <span className="text-xs font-extrabold text-white mt-0.5 block">Moderate</span>
                </div>
              </div>

              {/* Bottom Right: Step-Free */}
              <div className="absolute bottom-[8%] right-[6%] z-25 bg-neutral-950/75 border border-[#ffffff10] backdrop-blur-md px-3.5 py-2.5 rounded-2xl flex items-center gap-2.5 shadow-lg group-hover:-translate-y-1 transition-transform duration-300 delay-150">
                <div className="p-1.5 rounded-lg bg-emerald-500/15 text-emerald-400">
                  <Accessibility className="h-4 w-4" />
                </div>
                <div className="text-left font-mono">
                  <span className="text-[7px] text-neutral-400 uppercase block font-bold tracking-wider">♿ Step-Free</span>
                  <span className="text-xs font-extrabold text-white mt-0.5 block">Enabled</span>
                </div>
              </div>

              {/* Floating Notification Slides In Periodically (6s Loop) */}
              <div className="absolute top-[22%] left-1/2 -translate-x-1/2 z-30 bg-emerald-950/90 border border-emerald-500/30 backdrop-blur-md px-4 py-2.5 rounded-2xl flex items-center gap-2.5 shadow-xl animate-notification font-mono text-[9px] font-bold text-emerald-400 uppercase tracking-wider">
                <Bell className="h-4 w-4 text-emerald-400 animate-bounce" />
                <span>Route updated automatically</span>
              </div>

            </div>

          </div>

          {/* RIGHT COLUMN: Content + Four Feature Cards (45% Width, Order 2 on Mobile, Order 2 on Desktop) */}
          <div className="order-2 lg:col-span-5 space-y-8 flex flex-col justify-center">
            
            <div className="space-y-4">
              {/* Section Label */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-green/10 border border-cyber-green/20 text-cyber-green text-xs font-semibold uppercase tracking-widest font-mono">
                <Sparkles className="h-3.5 w-3.5" />
                <span>LIVE FAN EXPERIENCE</span>
              </div>

              {/* Heading */}
              <h2 className="text-4xl sm:text-5xl font-extrabold font-display text-white tracking-tight leading-[1.08]">
                Every Fan Has <br />
                Their Own AI Guide.
              </h2>

              {/* Description */}
              <p className="text-neutral-400 text-sm leading-relaxed max-w-lg">
                Whether you&apos;re finding your seat, avoiding crowded gates, locating accessible routes, or catching the fastest train home, StadiumPulse AI becomes your personal tournament companion.
              </p>
              <p className="text-neutral-400 text-sm leading-relaxed max-w-lg">
                Not just navigation. Real-time understanding.
              </p>
            </div>

            {/* Feature Cards Grid (Stacked) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Card 1: Live AI Navigation */}
              <div className="p-4 rounded-2xl border border-neutral-900 bg-neutral-950/40 space-y-2 hover:border-neutral-800 transition-all hover:-translate-y-0.5">
                <div className="flex items-center gap-2 font-mono text-[10px] font-extrabold text-cyber-green uppercase tracking-wider">
                  <Compass className="h-4 w-4" />
                  <span>Live AI Navigation</span>
                </div>
                <p className="text-neutral-400 text-[11px] leading-relaxed">
                  The safest route updates every few seconds based on crowd metrics.
                </p>
              </div>

              {/* Card 2: Smart Transit */}
              <div className="p-4 rounded-2xl border border-neutral-900 bg-neutral-950/40 space-y-2 hover:border-neutral-800 transition-all hover:-translate-y-0.5">
                <div className="flex items-center gap-2 font-mono text-[10px] font-extrabold text-cyber-green uppercase tracking-wider">
                  <Train className="h-4 w-4" />
                  <span>Smart Transit</span>
                </div>
                <p className="text-neutral-400 text-[11px] leading-relaxed">
                  Receive personalized train and shuttle recommendations directly.
                </p>
              </div>

              {/* Card 3: Multilingual Support */}
              <div className="p-4 rounded-2xl border border-neutral-900 bg-neutral-950/40 space-y-2 hover:border-neutral-800 transition-all hover:-translate-y-0.5">
                <div className="flex items-center gap-2 font-mono text-[10px] font-extrabold text-cyber-green uppercase tracking-wider">
                  <Languages className="h-4 w-4" />
                  <span>Multilingual</span>
                </div>
                <p className="text-neutral-400 text-[11px] leading-relaxed">
                  Speak naturally in your own language; instant audio translations.
                </p>
              </div>

              {/* Card 4: Accessibility First */}
              <div className="p-4 rounded-2xl border border-neutral-900 bg-neutral-950/40 space-y-2 hover:border-neutral-800 transition-all hover:-translate-y-0.5">
                <div className="flex items-center gap-2 font-mono text-[10px] font-extrabold text-cyber-green uppercase tracking-wider">
                  <Accessibility className="h-4 w-4" />
                  <span>Accessibility First</span>
                </div>
                <p className="text-neutral-400 text-[11px] leading-relaxed">
                  Every journey adapts to personal mobility and step-free needs.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }

        @keyframes radar-pulse {
          0% {
            transform: scale(0.8);
            opacity: 0.8;
          }
          100% {
            transform: scale(1.3);
            opacity: 0;
          }
        }
        .animate-radar-pulse {
          animation: radar-pulse 3s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        }

        @keyframes route-dash {
          to {
            stroke-dashoffset: -36;
          }
        }
        .animate-route-dash {
          animation: route-dash 2s linear infinite;
        }

        @keyframes notification {
          0% {
            transform: translate(-50%, 15px);
            opacity: 0;
          }
          10% {
            transform: translate(-50%, 0px);
            opacity: 1;
          }
          90% {
            transform: translate(-50%, 0px);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -15px);
            opacity: 0;
          }
        }
        .animate-notification {
          animation: notification 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
