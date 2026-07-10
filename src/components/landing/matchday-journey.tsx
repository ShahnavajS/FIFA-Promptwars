"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { 
  Sun, 
  CloudRain, 
  Sparkles, 
  Heart, 
  Activity, 
  Flame, 
  Tv, 
  Volume2, 
  VolumeX,
  CheckCircle,
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
              Tournament Journey
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
            const active = idx === activeStage;
            return (
              <button
                key={s.id}
                onClick={() => setActiveStage(idx)}
                className={`flex-shrink-0 px-4.5 py-3 rounded-2xl border font-bold text-xs uppercase tracking-wider transition-all focus:outline-none cursor-pointer ${
                  active 
                    ? "bg-neutral-900 border-neutral-700 text-white shadow-xl" 
                    : "bg-neutral-950/20 border-neutral-905 text-neutral-500 hover:text-neutral-300 hover:border-neutral-850"
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </div>

        {/* Stadium Cockpit Display Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left panel: The Stadium Display screen HUD (7 Cols) */}
          <div className="lg:col-span-7 p-6 rounded-3xl border border-neutral-900 bg-neutral-950/40 relative overflow-hidden flex flex-col justify-between min-h-[420px]">
            {/* Visual scanlines overlay */}
            <div className="absolute inset-0 bg-scanlines pointer-events-none opacity-5" />

            <div className="flex items-center justify-between text-neutral-500 text-[9px] font-bold uppercase tracking-widest font-mono border-b border-neutral-900/60 pb-3">
              <span className="flex items-center gap-1.5">
                <Tv className="h-3.5 w-3.5 text-cyber-green" />
                STADIUM MONITOR CAMERA FEED
              </span>
              <span className="text-victory-gold">METLIFE CAMERA FEED // LIVE</span>
            </div>

            {/* Stadium Visual Content Representation */}
            <div className="flex-grow flex flex-col items-center justify-center py-10 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="text-center space-y-4"
                >
                  {active.weather === "sunny" && <Sun className="h-20 w-20 text-amber-500 animate-spin-slow mx-auto" />}
                  {active.weather === "rainy" && <CloudRain className="h-20 w-20 text-blue-400 animate-bounce mx-auto" />}
                  {active.weather === "night" && <Flame className="h-20 w-20 text-purple-400 animate-pulse mx-auto" />}
                  {active.weather === "celebration" && <Sparkles className="h-20 w-20 text-victory-gold animate-bounce mx-auto" />}
                  {active.weather === "storm" && <Wind className="h-20 w-20 text-rose-500 animate-pulse mx-auto" />}
                  
                  <div className="text-sm font-extrabold text-white tracking-widest uppercase font-mono mt-3">
                    {active.atmosphereTitle}
                  </div>
                  <p className="text-neutral-400 text-xs max-w-sm mx-auto italic font-medium">
                    {active.illustrationDesc}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Goal Celebration Interactive Button */}
              {active.weather === "celebration" && (
                <button
                  onClick={triggerCelebration}
                  className="mt-6 px-6 py-2.5 bg-victory-gold hover:bg-amber-500 text-black font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:scale-105 cursor-pointer"
                >
                  Celebrate Goal!
                </button>
              )}
            </div>

            {/* Lower dashboard bar */}
            <div className="border-t border-neutral-900 pt-4 flex items-center justify-between text-xs">
              <div>
                <div className="text-[8px] text-neutral-500 font-bold uppercase tracking-wider font-mono">{active.metricLabel}</div>
                <div className="text-sm font-extrabold text-white font-mono">{active.metricValue}</div>
              </div>
              <button
                onClick={() => {
                  if (active.stadiumAction.includes("Celebration") || active.stadiumAction.includes("Goal")) {
                    triggerCelebration();
                  }
                }}
                className="px-4 py-2 rounded-xl border border-neutral-850 bg-neutral-950/60 font-bold text-neutral-300 hover:text-white transition-all cursor-pointer"
              >
                {active.stadiumAction}
              </button>
            </div>

          </div>

          {/* Right panel: The Human Persona AI card (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            
            {/* User Persona profile */}
            <Card variant="glass" className="p-6 border-neutral-900 bg-neutral-950/40 text-left relative overflow-hidden flex flex-col justify-between flex-grow">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full overflow-hidden border border-neutral-850 flex-shrink-0">
                      <img src={active.avatar} alt={active.persona} className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <div className="px-2 py-0.5 rounded border border-victory-gold/20 text-victory-gold bg-victory-gold/5 text-[9px] font-bold uppercase tracking-wider">
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

              <div className="border-t border-neutral-900 pt-4 flex items-center justify-between text-xs">
                <span className="text-neutral-500 font-mono text-[9px]">DIARY CHECKPOINT ACTIVE</span>
                <span className="text-cyber-green font-bold flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4" />
                  Telemetry Synced
                </span>
              </div>
            </Card>

          </div>

        </div>

      </div>
    </section>
  );
}
