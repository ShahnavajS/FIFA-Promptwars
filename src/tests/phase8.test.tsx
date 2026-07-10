import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { MatchExperienceService } from "@/services/match-experience.service";
import { GeminiWrapperService } from "@/services/google/gemini.service";
import { MatchMemory } from "@/components/ui/match-memory";

describe("Phase 8 Match Day Celebration & Emotional UX Test Suite", () => {
  
  test("MatchExperienceService resolves stadium moods accurately", () => {
    const config = MatchExperienceService.getStadiumMood("full-time", null);
    expect(config.mood).toBe("Celebrating");
    expect(config.color).toContain("text-victory-gold");
    expect(config.microcopy).toContain("ARGENTINA VICTORY");
  });

  test("MatchMemory component renders personal timelines and achievements badges", () => {
    render(<MatchMemory />);
    expect(screen.getByText("My Match Story")).toBeInTheDocument();
    expect(screen.getByText("Unlocked Achievements")).toBeInTheDocument();
    expect(screen.getByText("Eco Supporter")).toBeInTheDocument();
  });

  test("GeminiWrapperService outputs goal celebration prompts", async () => {
    const reply = await GeminiWrapperService.generateContextReply("Goal scored!", {
      role: "fan",
      phase: "kickoff",
      attendance: 12000,
      activeEmergency: null,
      mood: "calm",
      pairing: "",
      targetGate: "Gate A North",
      seat: "Sector 112, Row F, Seat 12",
      routeMode: "FASTEST",
      gateWait: 28,
      concessionWait: 4,
      temp: 28.5,
      wind: "NW 14kmh",
      domeStatus: "open",
      persona: { 
        type: "fan", 
        label: "General Fan", 
        tone: "enthusiastic", 
        priorityPreferences: [],
        description: "General tournament fan",
        accessibilityNeeds: []
      }
    });

    expect(reply).toContain("GOAL SURGE CELEBRATION");
    expect(reply).toContain("Argentina has scored");
  });

  test("GeminiWrapperService outputs egress farewell thank-yous", async () => {
    const reply = await GeminiWrapperService.generateContextReply("How do I exit?", {
      role: "fan",
      phase: "exit",
      attendance: 12000,
      activeEmergency: null,
      mood: "calm",
      pairing: "",
      targetGate: "Gate A North",
      seat: "Sector 112, Row F, Seat 12",
      routeMode: "FASTEST",
      gateWait: 28,
      concessionWait: 4,
      temp: 28.5,
      wind: "NW 14kmh",
      domeStatus: "open",
      persona: { 
        type: "fan", 
        label: "General Fan", 
        tone: "enthusiastic", 
        priorityPreferences: [],
        description: "General tournament fan",
        accessibilityNeeds: []
      }
    });

    expect(reply).toContain("FAREWELL COMPANION");
    expect(reply).toContain("Thank you for sharing");
  });
});
