"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { 
  Sun, 
  CloudRain, 
  Sparkles, 
  Heart, 
  Activity, 
  Flame, 
  Volume2, 
  VolumeX,
  Wind
} from "lucide-react";

interface JourneyStage {
  id: number;
  label: string;
  persona: string;
  personaTitle: string;
  avatar: string;
  weather: "sunny" | "rainy" | "night" | "celebration" | "storm";
  atmosphereTitle: string;
  metricLabel: string;
  metricValue: string;
  stressLevel: "Calm" | "Moderate" | "Stressed";
  stressColor: string;
  aiDialogue: string;
  stadiumAction: string;
  illustrationDesc: string;
}

export function MatchdayJourney() {
  const [activeStage, setActiveStage] = useState<number>(0);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(true);
  const [celebrateTrigger, setCelebrateTrigger] = useState<boolean>(false);
  const [confettiArray, setConfettiArray] = useState<{ id: number; left: number; top: number; delay: number }[]>([]);
  
  // Parallax Mouse tracking
  const imageCardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageCardRef.current) return;
    const rect = imageCardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const stages: JourneyStage[] = [
    {
      id: 0,
      label: "1. Leaving Home",
      persona: "The Martinez Family",
      personaTitle: "Fan & Family Mode",
      avatar: "/images/family_avatar.jpg",
      weather: "sunny",
      atmosphereTitle: "Morning Sunrise Grid",
      metricLabel: "Transit ETA",
      metricValue: "42 mins",
      stressLevel: "Calm",
      stressColor: "text-cyber-green",
      aiDialogue: "\"Welcome to the tournament! Your step-free parking spot next to Elevator Gate A is reserved. Drive slowly, there is no rush.\"",
      stadiumAction: "Load Family Profiles",
      illustrationDesc: "MetLife stadium silhouette lit by a warm morning sunrise grid."
    },
    {
      id: 1,
      label: "2. Metro Transit",
      persona: "Sofia Chen",
      personaTitle: "Japanese Fan Assistant",
      avatar: "/images/tourist_avatar.jpg",
      weather: "sunny",
      atmosphereTitle: "Meadowlands Platform Surge",
      metricLabel: "Translation Delay",
      metricValue: "0ms latency",
      stressLevel: "Moderate",
      stressColor: "text-victory-gold",
      aiDialogue: "\"こんにちは! The Shuttle leaves from Platform 3 in 5 minutes. Direct wheelchair boarding ramps are available at the front carriage.\"",
      stadiumAction: "Translate Speech",
      illustrationDesc: "Transit rails glowing in digital cyan, routing train vectors."
    },
    {
      id: 2,
      label: "3. Gate Ingress",
      persona: "Kenji Sato",
      personaTitle: "Wheelchair Attendee",
      avatar: "/images/tourist_avatar.jpg",
      weather: "rainy",
      atmosphereTitle: "Rain Storm Backup at Gate B",
      metricLabel: "Queue Wait Time",
      metricValue: "4 mins detour",
      stressLevel: "Stressed",
      stressColor: "text-rose-500",
      aiDialogue: "\"It's raining, but don't worry. Rerouting your family to the covered Gate A elevators now. Elevator B West is step-free.\"",
      stadiumAction: "Reroute Step-Free Path",
      illustrationDesc: "Rain telemetry dots running down neon red grid paths."
    },
    {
      id: 3,
      label: "4. Locate Seat",
      persona: "General Fan Arena",
      personaTitle: "Kickoff Milestone",
      avatar: "/images/family_avatar.jpg",
      weather: "night",
      atmosphereTitle: "Stadium Seat Wayfinding",
      metricLabel: "Concourse rest wait",
      metricValue: "2 mins queue",
      stressLevel: "Calm",
      stressColor: "text-cyber-green",
      aiDialogue: "\"You are seated in Sector 112, Row F. Concessions in Sector 103 currently have a 2-minute wait time if you need drinks.\"",
      stadiumAction: "Activate Seat HUD Map",
      illustrationDesc: "Stadium floodlights casting gold rays down onto the pitch."
    },
    {
      id: 4,
      label: "5. GOAL Celebration",
      persona: "All Attendees",
      personaTitle: "Victory Peak",
      avatar: "/images/family_avatar.jpg",
      weather: "celebration",
      atmosphereTitle: "Goal Lightshow Pulse",
      metricLabel: "Crowd Mood Index",
      metricValue: "Ecstatic 99%",
      stressLevel: "Calm",
      stressColor: "text-cyber-green",
      aiDialogue: "\"GOAL scored! Celebrate the moment! The stadium light show is synchronized with your LED seat band. Enjoy the victory!\"",
      stadiumAction: "Trigger Seat LED Sync",
      illustrationDesc: "Golden confetti particles and fireworks lighting up the screen."
    },
    {
      id: 5,
      label: "6. Storm Incident",
      persona: "Stadium Operations",
      personaTitle: "Safety Directive",
      avatar: "/images/coordinator_avatar.jpg",
      weather: "storm",
      atmosphereTitle: "Severe Wind Dome Alert",
      metricLabel: "Dome Roof Status",
      metricValue: "CLOSING SEQUENCE",
      stressLevel: "Stressed",
      stressColor: "text-rose-500",
      aiDialogue: "\"A high wind warning is active. Close dome roof sequence has been initiated. Operations remain 100% stable.\"",
      stadiumAction: "Initiate Dome Close",
      illustrationDesc: "Digital warnings flashing: Storm approaching MetLife Arena."
    },
    {
      id: 6,
      label: "7. Mass Egress",
      persona: "Marcus Vance",
      personaTitle: "Security Dispatcher",
      avatar: "/images/coordinator_avatar.jpg",
      weather: "night",
      atmosphereTitle: "Mass Egress Dispersals",
      metricLabel: "SRE Stability Index",
      metricValue: "98.2%",
      stressLevel: "Moderate",
      stressColor: "text-victory-gold",
      aiDialogue: "\"Egress transit flow is high. Delaying Shuttle Coach E departures by 6 minutes to clear the Gate B bottlenecks. Lane 4 open for EMT dispatch.\"",
      stadiumAction: "Orchestrate Dispatches",
      illustrationDesc: "Digital green arrows routing exit flow channels to transit stations."
    }
  ];

  const active = stages[activeStage];

  const triggerCelebration = () => {
    setCelebrateTrigger(true);
    const particles = [];
    for (let i = 0; i < 40; i++) {
      particles.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * -50,
        delay: Math.random() * 2,
      });
    }
    setConfettiArray(particles);
    setTimeout(() => {
      setCelebrateTrigger(false);
    }, 4000);
  };

  return (
    <section id="matchday-journey" className="py-28 bg-[#020204] border-t border-neutral-900 px-6 relative overflow-hidden text-left scroll-mt-16">
      
      {/* Dynamic atmospheric color backdrop glows */}
      <div className="absolute inset-0 pointer-events-none -z-10 transition-colors duration-1000">
        {active.weather === "sunny" && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-amber-500/5 blur-[120px]" />
        )}
        {active.weather === "rainy" && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-blue-900/5 blur-[120px]" />
        )}
        {active.weather === "night" && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-purple-900/5 blur-[120px]" />
        )}
        {active.weather === "celebration" && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-gradient-to-r from-victory-gold/10 to-cyber-green/5 blur-[130px]" />
        )}
        {active.weather === "storm" && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-rose-900/5 blur-[130px]" />
        )}
      </div>

      {/* Celebration Confetti Layer */}
      {celebrateTrigger && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
          {confettiArray.map((c) => (
            <div
              key={c.id}
              className="absolute w-2 h-4 bg-victory-gold/80 rounded animate-fall"
              style={{
                left: `${c.left}%`,
                top: `${c.top}%`,
                backgroundColor: c.id % 2 === 0 ? "#f59e0b" : "#00e676",
                animationDelay: `${c.delay}s`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-green/10 border border-cyber-green/20 text-cyber-green text-xs font-semibold uppercase tracking-widest font-mono">
              <Activity className="h-3.5 w-3.5" />
              <span>Interactive Matchday Simulator</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-extrabold font-display text-white tracking-tight leading-none">
              Empathetic Assistance for Every Role
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              Step through the stages of a complete World Cup matchday. See the stadium atmosphere shift and audit the AI companion support.
            </p>
          </div>

          {/* Stadium ambient sound control */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAudioMuted(!isAudioMuted)}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl border border-neutral-850 bg-neutral-950/40 text-xs font-bold text-neutral-400 hover:text-white transition-all focus:outline-none cursor-pointer"
              aria-label="Toggle ambient noise"
            >
              {isAudioMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4 text-cyber-green animate-pulse" />}
              <span>{isAudioMuted ? "Sound: Off" : "Ambient: Live"}</span>
            </button>
          </div>
        </div>

        {/* Horizontal Navigation Steps */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-4 border-b border-neutral-900 scrollbar-none">
          {stages.map((s, idx) => {
            const isActive = idx === activeStage;
            return (
              <button
                key={s.id}
                onClick={() => setActiveStage(idx)}
                className={`flex-shrink-0 px-4.5 py-3 rounded-2xl border font-bold text-xs uppercase tracking-wider transition-all focus:outline-none cursor-pointer ${
                  isActive 
                    ? "bg-neutral-900 border-neutral-700 text-white shadow-xl" 
                    : "bg-neutral-950/20 border-neutral-905 text-neutral-500 hover:text-neutral-300 hover:border-neutral-850"
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT: Persona Details & Selector Controls (Order 2 on Mobile, Order 1 on Desktop) */}
          <div className="order-2 lg:order-1 lg:col-span-5 flex flex-col gap-6 justify-between">
            
            <Card variant="glass" className="p-6 border-neutral-900 bg-neutral-950/40 text-left relative overflow-hidden flex flex-col justify-between flex-grow">
              <div className="space-y-6">
                
                {/* Persona Header Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full overflow-hidden border border-neutral-850 flex-shrink-0">
                      <Image src={active.avatar} alt={active.persona} width={40} height={40} className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <div className="px-2 py-0.5 rounded border border-victory-gold/20 text-victory-gold bg-victory-gold/5 text-[9px] font-bold uppercase tracking-wider inline-block">
                        {active.personaTitle}
                      </div>
                      <h4 className="text-white font-bold text-sm mt-1">{active.persona}</h4>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[8px] text-neutral-500 font-bold uppercase block tracking-wider font-mono">Stress Index</span>
                    <span className={`text-xs font-bold font-mono ${active.stressColor}`}>{active.stressLevel}</span>
                  </div>
                </div>

                {/* SRE AI guidance box */}
                <div className="p-4 rounded-2xl border border-neutral-900 bg-neutral-950/80 font-sans text-xs text-neutral-300 relative overflow-hidden my-4">
                  <div className="absolute top-0 left-0 w-1 h-full bg-cyber-green" />
                  <div className="text-[8px] text-neutral-500 font-bold uppercase tracking-widest font-mono mb-2 flex items-center gap-1">
                    <Heart className="h-3.5 w-3.5 text-cyber-green animate-pulse" />
                    EMPATHETIC AI COMPANION
                  </div>
                  <p className="leading-relaxed font-medium italic">
                    {active.aiDialogue}
                  </p>
                </div>

                {/* Environment Monitor Box */}
                <div className="p-4.5 rounded-2xl border border-neutral-900 bg-neutral-950/20 space-y-4">
                  <div className="flex items-center justify-between text-neutral-500 text-[8px] font-bold uppercase tracking-wider font-mono">
                    <span>Active Atmosphere Control</span>
                    <span className="text-cyber-green font-mono">ONLINE</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {active.weather === "sunny" && <Sun className="h-8 w-8 text-amber-500 animate-spin-slow" />}
                    {active.weather === "rainy" && <CloudRain className="h-8 w-8 text-blue-400 animate-bounce" />}
                    {active.weather === "night" && <Flame className="h-8 w-8 text-purple-400 animate-pulse" />}
                    {active.weather === "celebration" && <Sparkles className="h-8 w-8 text-victory-gold animate-bounce" />}
                    {active.weather === "storm" && <Wind className="h-8 w-8 text-rose-500 animate-pulse" />}
                    <div>
                      <div className="text-white text-xs font-bold font-mono">{active.atmosphereTitle}</div>
                      <p className="text-[10px] text-neutral-500 mt-0.5">{active.illustrationDesc}</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Lower dashboard bar */}
              <div className="border-t border-neutral-900 pt-4 mt-6 flex items-center justify-between text-xs">
                <div>
                  <div className="text-[8px] text-neutral-500 font-bold uppercase tracking-wider font-mono">{active.metricLabel}</div>
                  <div className="text-sm font-extrabold text-white font-mono">{active.metricValue}</div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (active.stadiumAction.includes("Celebration") || active.stadiumAction.includes("Goal")) {
                        triggerCelebration();
                      }
                    }}
                    className="px-3.5 py-2 rounded-xl border border-neutral-850 bg-neutral-950/60 font-bold text-neutral-300 hover:text-white transition-all cursor-pointer text-xs"
                  >
                    {active.stadiumAction}
                  </button>
                  
                  {active.weather === "celebration" && (
                    <button
                      onClick={triggerCelebration}
                      className="px-3.5 py-2 bg-victory-gold hover:bg-amber-500 text-black font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:scale-105 cursor-pointer"
                    >
                      Celebration Confetti
                    </button>
                  )}
                </div>
              </div>
            </Card>

          </div>

          {/* RIGHT: The Premium Accessibility Visual Card (Order 1 on Mobile, Order 2 on Desktop) */}
          <div className="order-1 lg:order-2 lg:col-span-7 flex flex-col">
            
            {/* Visual Card Container */}
            <div 
              ref={imageCardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="h-[500px] sm:h-[600px] w-full rounded-[24px] border border-[#ffffff10] bg-neutral-950/80 shadow-2xl relative overflow-hidden flex flex-col justify-between p-6 group cursor-pointer"
            >
              {/* Subtle emerald glow behind the card */}
              <div className="absolute -top-24 -left-24 w-[350px] h-[350px] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none group-hover:bg-emerald-500/15 transition-colors duration-500" />
              
              {/* Internal Radial Gradient Overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.04),transparent_65%)] pointer-events-none z-10" />

              {/* Main Visual Image Wrapper with Parallax */}
              <div className="absolute inset-0 overflow-hidden z-0">
                <motion.div
                  className="w-[106%] h-[106%] relative -left-[3%] -top-[3%]"
                  animate={{
                    x: mousePos.x * -20,
                    y: mousePos.y * -20,
                  }}
                  transition={{ type: "spring", stiffness: 90, damping: 25 }}
                >
                  <Image
                    src="/images/accessibility_route.jpg"
                    alt="Stadium Assist volunteer helping wheelchair user navigate with real-time AR route layout"
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                </motion.div>
              </div>

              {/* Dark Gradient Overlay for Typography Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none z-10" />

              {/* Animated HUD Overlay Elements */}
              <div className="absolute inset-0 pointer-events-none z-20">
                
                {/* Emerald Light Sweep Animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/8 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                
                {/* Pulsing SVG path simulation */}
                <svg className="absolute inset-0 w-full h-full opacity-65 group-hover:opacity-85 transition-opacity duration-500" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    d="M 120 450 Q 280 400 320 280 T 480 180" 
                    fill="none" 
                    stroke="#10b981" 
                    strokeWidth="3.5" 
                    strokeLinecap="round"
                    className="animate-dash"
                    style={{
                      strokeDasharray: "8, 12",
                    }}
                  />
                </svg>
              </div>

              {/* Top HUD Tag */}
              <div className="relative z-20 flex items-center justify-between">
                <span className="text-[9px] font-mono text-emerald-400 font-extrabold uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Live Path Overlay
                </span>
                
                <span className="text-[9px] font-mono text-neutral-400 font-bold uppercase tracking-wider">
                  METLIFE SEC 134 // STEP-FREE
                </span>
              </div>

              {/* Bottom Image Overlay Container */}
              <div className="relative z-20 mt-auto text-left">
                <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight leading-none">
                  Accessible for Everyone
                </h3>
                <p className="text-neutral-300 text-xs sm:text-sm font-medium mt-2 max-w-md leading-relaxed">
                  AI finds the safest, fastest, and fully accessible route in real time.
                </p>

                {/* Real-time Telemetry Pills */}
                <div className="flex flex-wrap gap-2 mt-4.5">
                  <span className="px-2.5 py-1 rounded-full text-[9px] font-bold bg-neutral-900/80 border border-[#ffffff10] text-white flex items-center gap-1">
                    ♿ Step-Free Route
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[9px] font-bold bg-neutral-900/80 border border-[#ffffff10] text-white flex items-center gap-1">
                    🛗 Elevator Available
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[9px] font-bold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-1 font-mono">
                    ⏱ ETA 2 min
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[9px] font-bold bg-neutral-900/80 border border-[#ffffff10] text-emerald-400 flex items-center gap-1">
                    🤖 Live AI Guidance
                  </span>
                </div>
              </div>

            </div>

            {/* Accessibility Tagline */}
            <div className="text-left mt-4 pl-4 border-l-2 border-emerald-500/30 py-1">
              <p className="text-neutral-300 text-base font-serif italic tracking-wide font-medium">
                &ldquo;Accessibility isn&apos;t a feature. It&apos;s a promise.&rdquo;
              </p>
            </div>

          </div>

        </div>

      </div>

      <style jsx global>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -40;
          }
        }
        .animate-dash {
          animation: dash 2.5s linear infinite;
        }
      `}</style>
    </section>
  );
}
