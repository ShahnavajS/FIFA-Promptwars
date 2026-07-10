import { describe, test, expect } from "vitest";
import { PersonaEngine } from "@/services/persona.service";
import { getHumanContext, HumanContextData } from "@/lib/context-builder/human-context";
import { JourneyMemoryService } from "@/services/journey-memory.service";
import { SmartAssistanceService } from "@/services/smart-assistance.service";
import { StoryService } from "@/services/stories/story.service";

describe("Phase 6 Human-Centered Experience Test Suite", () => {
  
  test("PersonaEngine maps family profile to protective tone", () => {
    const config = PersonaEngine.getPersona("family");
    expect(config.tone).toBe("protective");
    expect(config.priorityPreferences).toContain("Child lost checks");
  });

  test("HumanContext compiles stress indicators and team support", () => {
    const contextData: HumanContextData = {
      language: "es",
      mobility: "limited",
      companions: "Parents + Senior",
      favoriteTeam: "Germany",
      stressLevel: "high",
      journeyStage: "ingress",
      preferences: ["Avoid stairs", "Eco parking"]
    };

    const compiled = getHumanContext(contextData);
    expect(compiled).toContain("Selected Language: ES");
    expect(compiled).toContain("Mobility Constraints: LIMITED");
    expect(compiled).toContain("Stress Level Indicator: HIGH");
    expect(compiled).toContain("Fan Group Supporter of: Germany");
  });

  test("JourneyMemory registers queries and caps history logs", () => {
    JourneyMemoryService.resetMemory();
    JourneyMemoryService.addInteraction("Where is restroom?", "Go to Sector 103.");
    
    const memory = JourneyMemoryService.getMemory();
    expect(memory.previousInteractions.length).toBe(1);
    expect(memory.previousInteractions[0].query).toBe("Where is restroom?");
  });

  test("SmartAssistance detects senior concession lift opportunities", () => {
    const alerts = SmartAssistanceService.detectOpportunities(
      "halftime",
      null,
      "open",
      "calm",
      "senior"
    );

    expect(alerts.some(a => a.includes("Lift Core West"))).toBe(true);
  });

  test("StoryService resolves family storytelling steps", () => {
    const stepCount = StoryService.getStoryLength();
    expect(stepCount).toBeGreaterThan(3);

    const step2 = StoryService.getStoryStep(2);
    expect(step2.label).toBe("Lost Minor Incident");
    expect(step2.emergency).toBe("LOST CHILD SEC 110");
  });
});
