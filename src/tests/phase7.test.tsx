import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { StadiumHealthEngineService } from "@/services/health-engine.service";
import { AIReasoningTimeline } from "@/components/ui/reasoning-timeline";
import { AgentCollaboration } from "@/components/ui/agent-collaboration";
import ArchitecturePage from "@/app/dashboard/architecture/page";

describe("Phase 7 AI Stadium Brain & Explainability Test Suite", () => {
  
  test("StadiumHealthEngineService calculates critical scores during emergencies", () => {
    const health = StadiumHealthEngineService.computeHealth(
      "gate-entry",
      1.1,
      "open",
      "MEDICAL INJURY SEC 112"
    );

    // Initial 98 - 35 = 63
    expect(health.operationalPulse).toBe(63);
    expect(health.recoveryIndex).toBe(80);
    expect(health.forecast).toContain("medical response active");
  });

  test("AIReasoningTimeline component renders workflow labels", () => {
    render(<AIReasoningTimeline />);
    expect(screen.getByText("Observed")).toBeInTheDocument();
    expect(screen.getByText("Detected")).toBeInTheDocument();
    expect(screen.getByText("Expected Result")).toBeInTheDocument();
  });

  test("AgentCollaboration displays synchronized system feed", () => {
    render(<AgentCollaboration />);
    expect(screen.getByText("Agent Collaboration")).toBeInTheDocument();
    expect(screen.getByText("Coordinator")).toBeInTheDocument();
  });

  test("Google Cloud Architecture page renders GCP Nodes list", () => {
    render(<ArchitecturePage />);
    expect(screen.getByText("System Architecture Showcase")).toBeInTheDocument();
    expect(screen.getByText("BigQuery Audit")).toBeInTheDocument();
  });
});
