import { describe, test, expect } from "vitest";
import { PredictiveCrowdService } from "@/services/predictive-crowd.service";
import { MultiAgentOrchestrator } from "@/services/multi-agent/orchestrator";
import { PlaybookService } from "@/services/playbooks/playbook.service";

describe("Phase 5 Operational Intelligence Test Suite", () => {
  
  test("PredictiveCrowdService forecasts bottlenecks during gate-entry", () => {
    const forecast = PredictiveCrowdService.getForecast("gate-entry", 1.5, null);
    
    expect(forecast.queueMinutesGrowth).toBeGreaterThan(0);
    expect(forecast.safetyOverflowTimeMins).toBeLessThan(10);
    expect(forecast.bottlenecks.some(b => b.includes("Gate B"))).toBe(true);
  });

  test("MultiAgentOrchestrator aggregates alerts from specialized sub-agents", () => {
    const alerts = MultiAgentOrchestrator.orchestrate(
      "exit",
      1.6,
      "closed",
      true,
      null
    );

    // Verify presence of advisories from distinct agents
    expect(alerts.some(a => a.agentName === "NavAgent")).toBe(true);
    expect(alerts.some(a => a.agentName === "CrowdAgent")).toBe(true);
    expect(alerts.some(a => a.agentName === "WeatherAgent")).toBe(true);
    expect(alerts.some(a => a.agentName === "AccessAgent")).toBe(true);
  });

  test("PlaybookService resolves checklist actions for lost child", () => {
    const playbook = PlaybookService.getPlaybook("LOST CHILD SEC 110");
    
    expect(playbook).not.toBeNull();
    expect(playbook?.title).toBe("Lost Minor Search Playbook");
    expect(playbook?.actions.some(a => a.includes("CCTV"))).toBe(true);
    expect(playbook?.teams).toContain("CCTV Room Operators");
  });

  test("PlaybookService returns null for unregistered incidents", () => {
    const playbook = PlaybookService.getPlaybook("UNREGISTERED_INCIDENT");
    expect(playbook).toBeNull();
  });
});
