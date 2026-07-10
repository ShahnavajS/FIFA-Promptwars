import { describe, test, expect } from "vitest";
import { buildPrompt, ContextData } from "@/lib/context-builder/prompt-builder";
import { GoogleMapsWrapperService } from "@/services/google/maps.service";
import { RecommendationEngine } from "@/services/recommendation.service";
import { useUiStore } from "@/stores/useUiStore";

describe("Phase 4 Intelligent Features Test Suite", () => {
  
  test("buildPrompt compiles structured contexts correctly", () => {
    const mockContext: ContextData = {
      role: "fan",
      phase: "arrival",
      attendance: 12000,
      mood: "excited",
      pairing: "Argentina vs. Germany",
      targetGate: "Gate A North",
      seat: "Sector 112",
      routeMode: "fastest",
      gateWait: 28,
      concessionWait: 4,
      temp: 28.5,
      wind: "NW 14kmh",
      domeStatus: "open",
      activeEmergency: null,
    };

    const prompt = buildPrompt("Test question", mockContext);
    expect(prompt).toContain("[USER ROLE]: Active view is set to FAN.");
    expect(prompt).toContain("[MATCH STATE]: Active match: Argentina vs. Germany. Current lifecycle milestone: ARRIVAL.");
    expect(prompt).toContain("[WEATHER & CLIMATE]: Local temperature: 28.5°C.");
    expect(prompt).toContain('User Prompt: """Test question"""');
  });

  test("Directions service returns wheelchair stepFree steps", async () => {
    const result = await GoogleMapsWrapperService.getDirections("hotel", "seat", "wheelchair");
    expect(result.routeMode).toBe("wheelchair");
    expect(result.steps.every(s => s.stepFree)).toBe(true);
  });

  test("RecommendationEngine generates halftime concessions suggestions", () => {
    const recs = RecommendationEngine.getRecommendations("halftime", null, "open");
    expect(recs.some(r => r.includes("El Tri Tacos"))).toBe(true);
  });

  test("UI store updates language selection state", () => {
    useUiStore.getState().setLanguage("ja");
    expect(useUiStore.getState().selectedLanguage).toBe("ja");

    useUiStore.getState().setLanguage("en");
    expect(useUiStore.getState().selectedLanguage).toBe("en");
  });
});
