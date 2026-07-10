"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useUiStore } from "@/stores/useUiStore";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  ChevronDown, 
  Activity, 
  Users, 
  CloudSun, 
  Train, 
  Cpu
} from "lucide-react";

export function AwakeningHero({ onLaunchDemo }: { onLaunchDemo: () => void }) {
  const { currentRole } = useUiStore();
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax Scroll Effect
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, 120]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const getPersonalizedSubtext = () => {
    switch (currentRole) {
      case "fan":
        return "Your step-free route solver, concession queue estimator, and empathetic seat companion during the FIFA World Cup 2026.";
      case "organizer":
        return "Aggregating dome climate telemetry, solar grid offsets, and volunteer status into an active SRE operational dashboard.";
      case "security":
        return "Coordinating multi-agent emergency dispatches, Section 112 medic clearance paths, and evacuation directives.";
      default:
        return "Aggregating stadium telemetry, crowd density forecasts, and multilingual assistance into an empathetic operational twin.";
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative h-[80vh] min-h-[600px] w-full flex flex-col justify-center overflow-hidden text-left px-6 sm:px-12 md:px-20"
    >
      {/* Base background color layer */}
      <div className="absolute inset-0 bg-[#020203] z-0" />

      {/* 1. Cinematic Background Stadium Image (Next.js WebP lazy-load + Ken Burns Slow Zoom + Parallax) */}
      <motion.div 
        style={{ y: bgY }}
        animate={{ scale: [1.02, 1.07, 1.02] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 pointer-events-none z-10 scale-105"
      >
        <Image
          src="/images/stadium_hero.jpg"
          alt="MetLife Stadium holographic digital twin simulation backdrop"
          fill
          priority={false}
          loading="lazy"
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      {/* 2. Left-heavy Dark Gradient Overlay (65% intensity for readability on left third) */}
      <div className="absolute inset-0 pointer-events-none z-20 bg-gradient-to-r from-neutral-950 via-neutral-950/60 to-transparent" />
      
      {/* Mouse light spotlight highlight */}
      <div 
        className="absolute inset-0 pointer-events-none z-20 transition-all duration-300"
        style={{
          background: `radial-gradient(circle 450px at ${mousePosition.x}% ${mousePosition.y}%, rgba(0, 229, 255, 0.05) 0%, transparent 100%)`,
        }}
      />

      {/* 3. Tech Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none z-20"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: "50px 50px"
        }}
      />

      {/* 4. SVGs HUD Scanlines, Radar, Routes */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" xmlns="http://www.w3.org/2000/svg">
        <motion.line
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
          stroke="rgba(0, 229, 255, 0.12)"
          strokeWidth="1.5"
          animate={{ y: ["0%", "100%", "0%"] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <circle cx="65%" cy="50%" r="220" stroke="rgba(0, 229, 255, 0.04)" strokeWidth="1" fill="none" />
        <path d="M 400 300 Q 600 200 800 400" stroke="rgba(0, 230, 118, 0.08)" strokeWidth="1.5" fill="none" strokeDasharray="5 5" />
      </svg>

      {/* 5. 4 Floating Glass HUD Widgets (Positioned over right side) */}
      <div className="absolute inset-0 pointer-events-none z-30">
        
        {/* Top Right: Live Crowd */}
        <motion.div 
          animate={{ y: [0, -6, 0], x: [0, 4, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] right-[25%] hidden xl:flex items-center gap-3 p-3 rounded-2xl border border-neutral-800 bg-neutral-950/70 backdrop-blur-xl pointer-events-auto"
        >
          <div className="p-2 rounded-xl bg-cyber-green/10 border border-cyber-green/20 text-cyber-green">
            <Users className="h-4.5 w-4.5" />
          </div>
          <div>
            <div className="text-[8px] font-bold text-neutral-500 uppercase tracking-wider font-mono">LIVE CROWD</div>
            <div className="text-xs font-extrabold text-white">82,000</div>
          </div>
        </motion.div>

        {/* Mid Right: Weather */}
        <motion.div 
          animate={{ y: [0, 8, 0], x: [0, -3, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[40%] right-[15%] hidden lg:flex items-center gap-3 p-3 rounded-2xl border border-neutral-800 bg-neutral-950/70 backdrop-blur-xl pointer-events-auto"
        >
          <div className="p-2 rounded-xl bg-victory-gold/10 border border-victory-gold/20 text-victory-gold">
            <CloudSun className="h-4.5 w-4.5" />
          </div>
          <div>
            <div className="text-[8px] font-bold text-neutral-500 uppercase tracking-wider font-mono">WEATHER</div>
            <div className="text-xs font-extrabold text-white">18°C // Light Rain</div>
          </div>
        </motion.div>

        {/* Bottom Mid Right: Metro */}
        <motion.div 
          animate={{ y: [0, -7, 0], x: [0, -5, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[20%] right-[30%] hidden xl:flex items-center gap-3 p-3 rounded-2xl border border-neutral-800 bg-neutral-950/70 backdrop-blur-xl pointer-events-auto"
        >
          <div className="p-2 rounded-xl bg-electric-cyan/10 border border-electric-cyan/20 text-electric-cyan">
            <Train className="h-4.5 w-4.5" />
          </div>
          <div>
            <div className="text-[8px] font-bold text-neutral-500 uppercase tracking-wider font-mono">METRO LINK</div>
            <div className="text-xs font-extrabold text-white">Platform 4 // 2m</div>
          </div>
        </motion.div>

        {/* Far Right Bottom: Gemini */}
        <motion.div 
          animate={{ y: [0, 6, 0], x: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute bottom-[25%] right-[8%] hidden lg:flex items-center gap-3 p-3 rounded-2xl border border-neutral-800 bg-neutral-950/70 backdrop-blur-xl pointer-events-auto"
        >
          <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
            <Cpu className="h-4.5 w-4.5" />
          </div>
          <div>
            <div className="text-[8px] font-bold text-neutral-500 uppercase tracking-wider font-mono">GEMINI CORE</div>
            <div className="text-xs font-extrabold text-white">Reasoning 98.7%</div>
          </div>
        </motion.div>

      </div>

      {/* 6. Main Hero Core Content (Aligned left, occupying the left third/half) */}
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-30">
        
        {/* Left Column: Heading and description (Left Third/Half) */}
        <div className="lg:col-span-6 space-y-6 text-left max-w-lg">
          
          {/* Active Mode Indicator */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-950/80 border border-neutral-900 text-neutral-400 text-[10px] font-semibold uppercase tracking-widest font-mono"
          >
            <span className="h-2 w-2 rounded-full bg-cyber-green animate-ping" />
            <Activity className="h-3.5 w-3.5 text-cyber-green" />
            <span>Context: {currentRole} view</span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-display leading-[0.95] tracking-tight text-white drop-shadow-2xl">
            StadiumPulse
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-cyber-green via-electric-cyan to-victory-gold">
              The Living Twin
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-medium">
            {getPersonalizedSubtext()}
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 w-full sm:w-auto">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
              <Button
                onClick={onLaunchDemo}
                variant="primary"
                size="lg"
                className="w-full sm:w-auto font-bold tracking-wide uppercase px-8 py-5.5 rounded-2xl border border-cyber-green/45 shadow-[0_0_20px_rgba(0,230,118,0.12)] group relative overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,230,118,0.25)] cursor-pointer"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-sweep pointer-events-none" />
                Start Live Demo
                <ArrowRight className="h-4.5 w-4.5 ml-1.5 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
              <a href="#human-stories" className="w-full sm:w-auto">
                <Button
                  variant="glass"
                  size="lg"
                  className="w-full sm:w-auto px-8 py-5.5 rounded-2xl text-neutral-300 hover:text-white border-neutral-850 hover:border-neutral-700 bg-neutral-950/40 backdrop-blur-xl font-bold tracking-wide uppercase group relative overflow-hidden transition-all duration-300"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-sweep pointer-events-none" />
                  Explore Journeys
                </Button>
              </a>
            </motion.div>
          </div>

        </div>

        {/* Right Column: Empty space to keep the glowing stadium on the right side visible */}
        <div className="lg:col-span-6 relative h-96 hidden lg:block" />

      </div>

      {/* 7. Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-neutral-500 font-mono text-[9px] uppercase tracking-widest pointer-events-none">
        <span>Scroll to Explore</span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </div>
    </div>
  );
}
