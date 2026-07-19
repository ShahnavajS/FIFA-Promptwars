import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { ReplayService } from "@/services/replay.service";
import { AILearningEngine } from "@/components/ui/learning-engine";
import { OperationalInsights } from "@/components/ui/operational-insights";
import ReplayPage from "@/app/dashboard/replay/page";

describe("Phase 9 AI Replay & Continuous Learning Test Suite", () => {
  test("ReplayService stores 10 sequential matchday ticks", () => {
    const steps = ReplayService.getReplaySteps();
    expect(steps.length).toBe(10);
    expect(steps[0].label).toBe("Stadium Arrivals Open");
    expect(steps[5].label).toBe("Goal Celebration Surge");
  });

  test("ReplayService validates fenced AI-generated timeline JSON", () => {
    const generatedTimeline = ReplayService.getReplaySteps()
      .slice(0, 5)
      .map((step, index) => ({ ...step, tick: index }));

    const parsed = ReplayService.parseGeneratedTimeline(
      `\`\`\`json\n${JSON.stringify(generatedTimeline)}\n\`\`\``
    );

    expect(parsed).not.toBeNull();
    expect(parsed?.length).toBe(5);
    expect(parsed?.[0].label).toBe("Stadium Arrivals Open");
  });

  test("ReplayService rejects generated timelines with invalid tick order", () => {
    const generatedTimeline = ReplayService.getReplaySteps()
      .slice(0, 5)
      .map((step, index) => ({ ...step, tick: index }));
    generatedTimeline[3].tick = 9;

    expect(ReplayService.parseGeneratedTimeline(JSON.stringify(generatedTimeline))).toBeNull();
  });

  test("AILearningEngine renders reinforcement loop and ledger tables", () => {
    render(<AILearningEngine />);
    expect(screen.getByText("Continuous Training Feedback")).toBeInTheDocument();
    expect(screen.getByText("Audit Ledger & Outcome Registry")).toBeInTheDocument();
  });

  test("OperationalInsights renders analytical metrics", () => {
    render(<OperationalInsights />);
    expect(screen.getByText("Tournament Performance Trends")).toBeInTheDocument();
    expect(screen.getByText("Gate Ingress Wait Peak")).toBeInTheDocument();
  });

  test("ReplayPage renders timeline slider and media player controls", () => {
    render(<ReplayPage />);
    expect(screen.getByText("Interactive Command Center Replay")).toBeInTheDocument();
    expect(screen.getByText("Timeline Ticks (Scrub Slider)")).toBeInTheDocument();
  });
});
