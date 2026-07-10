"use client";

import React, { useState } from "react";
import { useMatchStore } from "@/stores/useMatchStore";
import { useUiStore } from "@/stores/useUiStore";
import { useToastStore } from "@/stores/useToastStore";
import { TelemetryPublisher } from "@/lib/event-bus/event.publisher";
import { GoogleAnalyticsWrapperService } from "@/services/google/analytics.service";
import { StoryService, StoryStep } from "@/services/stories/story.service";
import { Button } from "./button";
import { Card, CardHeader, CardTitle, CardContent } from "./card";
import { 
  Sliders, 
  Play, 
  CloudLightning, 
  RotateCcw,
  Minimize2,
  Maximize2,
  Users,
  Compass,
  BookOpen,
  ArrowRight,
  Sparkles,
  Home,
  AlertCircle
} from "lucide-react";

export type SimulationScenario =
  | "opening"
  | "kickoff_rush"
  | "goal_surge"
  | "storm"
  | "mass_exit"
  | "medical"
  | "reset";

export function DemoControl() {
  const {
    setPhase,
    advancePhase,
    triggerEmergency,
    setDomeStatus,
    setDensityMultiplier,
  } = useMatchStore();

  const { setLanguage, setWheelchairRerouting, setRole } = useUiStore();
  const { addToast } = useToastStore();
  
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeTab, setActiveTab] = useState<"tactical" | "story">("story");
  const [storyIndex, setStoryIndex] = useState<number | null>(null);

  const handleScenario = (type: SimulationScenario) => {
    // Log telemetry analytics
    GoogleAnalyticsWrapperService.logTelemetryEvent("SHOWCASE_SCENARIO_INJECTED", { scenario: type });

    switch (type) {
      case "opening":
        triggerEmergency(null);
        setDomeStatus("open");
        setPhase("pre-match");
        setDensityMultiplier(0.9);
        setLanguage("en");
        addToast("SHOWCASE: Opening Ceremony active. Solar dome grid active.", "success");
        TelemetryPublisher.publish("CROWD_LEVEL_CHANGED", { type: "opening_ceremony", density: "normal" });
        break;

      case "kickoff_rush":
        triggerEmergency("GATE B CLOSURE");
        setDomeStatus("open");
        setPhase("gate-entry");
        setDensityMultiplier(1.8);
        addToast("SHOWCASE: Kickoff Rush. Turnstile Gate B offline. Redirecting flow.", "error");
        TelemetryPublisher.publish("INCIDENT_REPORTED", {
          id: "inc-kickoff-gate",
          category: "security",
          title: "Gate B Ingress Chokepoint",
          description: "Ingress lines closed. Rerouting all incoming security lines to Gate A.",
          location: "Gate B Entrance",
          severity: "high",
          status: "reported",
        });
        break;

      case "goal_surge":
        triggerEmergency(null);
        setDomeStatus("open");
        setPhase("kickoff");
        setDensityMultiplier(1.4);
        addToast("SHOWCASE: Goal surge celebrations! Crowd mood: EXCITED.", "success");
        TelemetryPublisher.publish("CROWD_LEVEL_CHANGED", { type: "goal_celebration", density: "heavy" });
        break;

      case "storm":
        setDomeStatus("closed");
        triggerEmergency("SEVERE WEATHER WARNING");
        addToast("SHOWCASE: Storm Warning closing arena dome roof. Poncho distribution active.", "warning");
        TelemetryPublisher.publish("CROWD_LEVEL_CHANGED", { type: "weather_alert", dome: "closed" });
        break;

      case "mass_exit":
        triggerEmergency("RAIL EXPRESS DELAY");
        setDomeStatus("open");
        setPhase("exit");
        setDensityMultiplier(1.6);
        addToast("SHOWCASE: Egress flow active. Platforms rail delays. Bus lines dispatched.", "warning");
        TelemetryPublisher.publish("CROWD_LEVEL_CHANGED", { type: "transit_strike", rail: "delayed" });
        break;

      case "medical":
        triggerEmergency("MEDICAL INJURY SEC 112");
        setPhase("second-half");
        setDensityMultiplier(1.1);
        addToast("SHOWCASE: Medical dispatch coordinate Section 112 concourse.", "error");
        TelemetryPublisher.publish("INCIDENT_REPORTED", {
          id: "inc-med-112",
          category: "medical",
          title: "Trauma Call Section 112",
          description: "Fan collapsed on walkway. Quad medic ambulance dispatched.",
          location: "Sector 112 Concourse",
          severity: "high",
          status: "reported",
        });
        break;

      case "reset":
        triggerEmergency(null);
        setDomeStatus("open");
        setLanguage("en");
        setWheelchairRerouting(false);
        setPhase("pre-match");
        setDensityMultiplier(1.0);
        setStoryIndex(null);
        setRole("fan");
        addToast("SHOWCASE: Stadium systems restored to defaults.", "success");
        break;
    }
  };

  const handleNextStoryStep = () => {
    const nextIdx = storyIndex === null ? 0 : storyIndex + 1;
    const length = StoryService.getStoryLength();
    
    if (nextIdx >= length) {
      addToast("Family Matchday story completed successfully!", "success");
      handleScenario("reset");
      return;
    }

    setStoryIndex(nextIdx);
    const step: StoryStep = StoryService.getStoryStep(nextIdx);
    
    // Sync store parameters
    setPhase(step.phase);
    setDensityMultiplier(step.density);
    triggerEmergency(step.emergency);
    setLanguage(step.activeLanguage);
    
    // Synchronize active role based on persona settings
    if (step.activePersona === "volunteer") {
      setRole("volunteer");
    } else {
      setRole("fan");
    }

    if (step.activePersona === "wheelchair") {
      setWheelchairRerouting(true);
    }

    addToast(`STORY STEP: ${step.label} loaded.`, "info");
    
    GoogleAnalyticsWrapperService.logTelemetryEvent("STORY_STEP_ACTIVATE", {
      stepIndex: nextIdx,
      label: step.label,
      persona: step.activePersona
    });
  };

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-4 left-4 z-50 p-3 rounded-full border border-victory-gold/20 bg-neutral-950 text-victory-gold glow-gold flex items-center justify-center shadow-2xl focus:outline-none focus:ring-1 focus:ring-victory-gold"
        aria-label="Expand Simulation Control Panel"
      >
        <Maximize2 className="h-5 w-5" />
      </button>
    );
  }

  const activeStep = storyIndex !== null ? StoryService.getStoryStep(storyIndex) : null;

  return (
    <Card variant="glass" className="fixed bottom-4 left-4 z-50 w-[320px] border-victory-gold/20 bg-neutral-950/95 backdrop-blur-xl glow-gold p-4 text-left shadow-2xl">
      <CardHeader className="p-0 pb-3 flex flex-row items-center justify-between border-b border-neutral-900">
        <div>
          <div className="flex items-center gap-1.5 text-victory-gold font-bold text-[10px] uppercase tracking-wider font-display">
            <Sliders className="h-4 w-4 animate-pulse" />
            Judge Control Cockpit
          </div>
          <CardTitle className="text-white text-sm font-bold mt-0.5">Simulation Center</CardTitle>
        </div>
        <button
          onClick={() => setIsMinimized(true)}
          className="text-neutral-500 hover:text-white transition-colors"
          aria-label="Minimize Simulation Panel"
        >
          <Minimize2 className="h-4 w-4" />
        </button>
      </CardHeader>

      {/* Tabs Selector */}
      <div className="flex border-b border-neutral-900 text-[10px] font-bold uppercase tracking-wider font-display font-semibold">
        <button
          onClick={() => setActiveTab("story")}
          className={`flex-grow py-2 text-center border-b transition-colors ${
            activeTab === "story" ? "text-victory-gold border-victory-gold" : "text-neutral-500 border-transparent"
          }`}
        >
          Story Mode
        </button>
        <button
          onClick={() => setActiveTab("tactical")}
          className={`flex-grow py-2 text-center border-b transition-colors ${
            activeTab === "tactical" ? "text-victory-gold border-victory-gold" : "text-neutral-500 border-transparent"
          }`}
        >
          Showcases
        </button>
      </div>

      <CardContent className="p-0 pt-3 flex flex-col gap-3.5 text-xs">
        
        {activeTab === "story" ? (
          /* STORY TAB CONTENT */
          <div className="space-y-3">
            {storyIndex === null ? (
              <div className="p-4 rounded-xl border border-neutral-850 bg-neutral-900/20 text-center space-y-2">
                <BookOpen className="h-6 w-6 text-victory-gold mx-auto animate-pulse" />
                <h4 className="text-white font-semibold text-xs">The Family Matchday Story</h4>
                <p className="text-[10px] text-neutral-400 leading-normal">
                  Step sequentially through stadium arrivals, crowd surges, emergency lost minor playbooks, and safe transit departure coordinates.
                </p>
                <Button
                  variant="primary"
                  onClick={handleNextStoryStep}
                  className="w-full text-[10px] py-2 font-bold mt-1"
                >
                  Begin Journey Story
                </Button>
              </div>
            ) : (
              <div className="space-y-3 text-left">
                {/* Active story step card */}
                <div className="p-3 rounded-xl border border-victory-gold/25 bg-victory-gold/5 space-y-1 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-victory-gold" />
                  <div className="text-[9px] text-victory-gold font-bold uppercase tracking-wider">
                    Stage {storyIndex + 1} of {StoryService.getStoryLength()}: {activeStep?.label}
                  </div>
                  <p className="text-white font-semibold text-[11px] leading-normal">{activeStep?.description}</p>
                  
                  <div className="text-[9px] text-neutral-400 pt-1.5 border-t border-neutral-900/50 mt-1.5">
                    <span className="font-bold text-neutral-300">Target Outcome:</span> {activeStep?.expectedOutcome}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="glass"
                    onClick={handleNextStoryStep}
                    className="flex-grow text-[10px] py-2 bg-neutral-900 border-neutral-850 text-white font-bold gap-1 justify-center"
                  >
                    Advance Stage
                    <ArrowRight className="h-3.5 w-3.5 text-victory-gold" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleScenario("reset")}
                    className="text-[10px] py-2 text-neutral-400 hover:text-white"
                    aria-label="Reset simulation"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* SHOWCASES TAB CONTENT */
          <div className="space-y-3.5">
            {/* Showcase Trigger Grid */}
            <div className="space-y-1.5">
              <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider">
                Select Showcase Scenario
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                <Button
                  variant="glass"
                  size="sm"
                  onClick={() => handleScenario("opening")}
                  className="text-[9px] py-1 border-neutral-900 hover:border-emerald-500/20 text-neutral-300 gap-1 justify-start font-medium"
                >
                  <Sparkles className="h-3 w-3 text-emerald-500 animate-pulse" />
                  Opening Ceremony
                </Button>
                <Button
                  variant="glass"
                  size="sm"
                  onClick={() => handleScenario("kickoff_rush")}
                  className="text-[9px] py-1 border-neutral-900 hover:border-rose-500/20 text-neutral-300 gap-1 justify-start font-medium"
                >
                  <Users className="h-3 w-3 text-rose-500" />
                  Kickoff Rush
                </Button>
                <Button
                  variant="glass"
                  size="sm"
                  onClick={() => handleScenario("goal_surge")}
                  className="text-[9px] py-1 border-neutral-900 hover:border-sky-500/20 text-neutral-300 gap-1 justify-start font-medium"
                >
                  <Home className="h-3 w-3 text-sky-500" />
                  Goal Surge
                </Button>
                <Button
                  variant="glass"
                  size="sm"
                  onClick={() => handleScenario("storm")}
                  className="text-[9px] py-1 border-neutral-900 hover:border-orange-500/20 text-neutral-300 gap-1 justify-start font-medium"
                >
                  <CloudLightning className="h-3 w-3 text-orange-500" />
                  Storm Warning
                </Button>
                <Button
                  variant="glass"
                  size="sm"
                  onClick={() => handleScenario("mass_exit")}
                  className="text-[9px] py-1 border-neutral-900 hover:border-cyan-500/20 text-neutral-300 gap-1 justify-start font-medium"
                >
                  <Compass className="h-3 w-3 text-cyan-500" />
                  Mass Exit
                </Button>
                <Button
                  variant="glass"
                  size="sm"
                  onClick={() => handleScenario("medical")}
                  className="text-[9px] py-1 border-neutral-900 hover:border-rose-500/20 text-neutral-300 gap-1 justify-start font-medium"
                >
                  <AlertCircle className="h-3 w-3 text-rose-500" />
                  Medic Incident
                </Button>
              </div>
            </div>

            {/* Action Controls */}
            <div className="flex gap-2 pt-2 border-t border-neutral-900">
              <Button
                variant="glass"
                size="sm"
                onClick={advancePhase}
                className="flex-grow text-[10px] py-2 bg-neutral-900 border-neutral-800 text-white font-bold gap-1.5"
              >
                <Play className="h-3 w-3 text-cyber-green fill-current" />
                Next Step
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleScenario("reset")}
                className="text-[10px] py-2 text-neutral-400 hover:text-white"
                aria-label="Reset simulation"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        )}

      </CardContent>
    </Card>
  );
}
