"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUiStore } from "@/stores/useUiStore";
import { useToastStore } from "@/stores/useToastStore";
import { UserRole } from "@/domain/user.entity";
import { AwakeningHero } from "@/components/landing/awakening-hero";
import { FamilyJourney } from "@/components/landing/family-journey";
import { MatchdayJourney } from "@/components/landing/matchday-journey";
import { HumanStories } from "@/components/landing/human-stories";
import { AIBrainPipeline } from "@/components/landing/ai-brain-pipeline";
import { ReplayPreview } from "@/components/landing/replay-preview";
import { LiveCrowdIntelligence } from "@/components/landing/live-crowd-intelligence";
import { CommandCenterCTA } from "@/components/landing/command-center-cta";
import { LivingBackground } from "@/components/ui/living-background";
import { CinematicTransition } from "@/components/ui/cinematic-transition";
import { OpsLogOverlay } from "@/components/ui/ops-log-overlay";
import { Button } from "@/components/ui/button";
import { Activity, User, ChevronDown, Wifi, Sparkles } from "lucide-react";

export default function LandingPage() {
  const router = useRouter();
  const { currentRole, setRole } = useUiStore();
  const { addToast } = useToastStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleRoleChange = (role: UserRole) => {
    setRole(role);
    setDropdownOpen(false);
    addToast(`Landing page modified to ${role.toUpperCase()} perspective`, "success");
  };

  const startDemo = () => {
    setIsTransitioning(true);
  };

  const roleColors: Record<UserRole, string> = {
    fan: "border-cyber-green text-cyber-green bg-cyber-green/10",
    volunteer: "border-victory-gold text-victory-gold bg-victory-gold/10",
    organizer: "border-stadium-blue text-stadium-blue bg-stadium-blue/10",
    security: "border-pulsing-coral text-pulsing-coral bg-pulsing-coral/10",
    staff: "border-electric-cyan text-electric-cyan bg-electric-cyan/10",
  };

  if (isTransitioning) {
    return <CinematicTransition onComplete={() => router.push("/dashboard")} />;
  }

  return (
    <div className="min-h-screen bg-[#030303] text-neutral-50 flex flex-col font-sans overflow-x-hidden selection:bg-cyber-green selection:text-black relative">
      
      {/* Dynamic Telemetry Particles Background */}
      <LivingBackground />

      {/* Real-time Ticking Operations Log Ticker */}
      <OpsLogOverlay />

      {/* 1. Cinematic Header Bar with Role Selector */}
      <header className="sticky top-0 z-45 w-full border-b border-neutral-900 bg-neutral-950/80 backdrop-blur-md px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2.5">
            <Activity className="h-5 w-5 text-cyber-green animate-pulse" />
            <span className="font-display font-bold text-base tracking-wider text-white uppercase">
              StadiumPulse <span className="text-cyber-green font-sans font-light text-xs align-super border border-cyber-green/20 px-1.5 py-0.5 rounded-full">AI</span>
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {/* Active Live Telemetry Status indicator */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-900 bg-neutral-950/40 text-xs font-semibold">
            <Wifi className="h-4 w-4 text-cyber-green" />
            <span className="text-cyber-green">Simulation Active</span>
          </div>

          {/* Interactive Role Personalization Dropdown */}
          <div className="relative z-50">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border font-bold text-[10px] uppercase transition-all tracking-wider focus:outline-none focus:ring-1 focus:ring-white ${roleColors[currentRole]}`}
            >
              <User className="h-3.5 w-3.5" />
              <span>{currentRole} Mode</span>
              <ChevronDown className="h-3 w-3" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl border border-neutral-880 bg-neutral-950 p-1.5 shadow-2xl z-50 pointer-events-auto">
                <div className="px-2.5 py-1 text-[9px] font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-victory-gold animate-pulse" />
                  Select Role View
                </div>
                {(["fan", "volunteer", "organizer", "security", "staff"] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => handleRoleChange(r)}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left text-xs font-semibold capitalize transition-colors hover:bg-neutral-900 cursor-pointer relative z-50 ${
                      currentRole === r ? "text-white bg-neutral-900" : "text-neutral-400"
                    }`}
                  >
                    {r} View
                    {currentRole === r && <div className="h-1.5 w-1.5 rounded-full bg-cyber-green" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Button 
            onClick={startDemo}
            variant="glass" 
            size="sm" 
            className="hidden sm:inline-flex rounded-xl font-semibold border-neutral-850"
          >
            Start Command Center
          </Button>
        </div>
      </header>

      {/* 2. Sequential Storyboard sections */}
      <main className="flex-grow">
        {/* Section 1: The Awakening */}
        <AwakeningHero onLaunchDemo={startDemo} />

        {/* Section 1.2: Family Journey Storyboard */}
        <FamilyJourney />

        {/* Section 1.5: Interactive Matchday Journey */}
        <MatchdayJourney />

        {/* Section 2: The Human Stories */}
        <HumanStories />

        {/* Section 3: The AI Brain Pipeline */}
        <AIBrainPipeline />

        {/* Section 4: AI Replay Scrubber Preview */}
        <ReplayPreview />

        {/* Section 4.5: Live Crowd Intelligence */}
        <LiveCrowdIntelligence />

        {/* Section 5: The Command Center CTA */}
        <CommandCenterCTA onLaunchDemo={startDemo} />
      </main>

      {/* 3. Cinematic Footer */}
      <footer className="border-t border-neutral-900 bg-neutral-950/40 py-8 text-center text-xs text-neutral-500 font-sans">
        <p>© 2026 FIFA World Cup Stadium Operations Center. GenAI Digital Twin Companion.</p>
      </footer>
    </div>
  );
}
