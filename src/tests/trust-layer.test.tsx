import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { assistantRequestSchema } from "@/lib/ai/assistant-request";
import { checkRequestRateLimit } from "@/lib/ai/request-rate-limit";
import { replayRequestSchema } from "@/lib/ai/replay-request";
import { SustainabilityService } from "@/services/sustainability.service";
import { OpsDecisionCenter } from "@/components/ui/ops-decision-center";

const validAssistantRequest = {
  message: "Where is the step-free route?",
  context: {
    role: "fan",
    phase: "arrival",
    attendance: 12_000,
    mood: "calm",
    pairing: "Argentina vs Germany",
    targetGate: "Gate A North",
    seat: "Sector 112, Row F",
    routeMode: "wheelchair",
    gateWait: 3,
    concessionWait: 4,
    temp: 28,
    wind: "NW 14kmh",
    domeStatus: "open",
    activeEmergency: null,
    persona: {
      type: "wheelchair",
      label: "Wheelchair User",
      description: "Fan who needs step-free routes.",
      tone: "reassuring",
      accessibilityNeeds: ["Step-free route"],
      priorityPreferences: ["Elevator availability"],
    },
    humanContext: {
      language: "en",
      mobility: "wheelchair",
      companions: "Single attendee",
      favoriteTeam: "Argentina",
      stressLevel: "calm",
      journeyStage: "ingress",
      preferences: ["Step-free route"],
    },
  },
};

describe("Trust layer", () => {
  test("accepts bounded assistant context and rejects oversized requests", () => {
    expect(assistantRequestSchema.safeParse(validAssistantRequest).success).toBe(true);
    expect(
      assistantRequestSchema.safeParse({ ...validAssistantRequest, message: "x".repeat(751) })
        .success
    ).toBe(false);
  });

  test("limits repeated requests within a short window", () => {
    const now = 1_000;
    expect(checkRequestRateLimit("test-rate-limit", 2, 60_000, now).allowed).toBe(true);
    expect(checkRequestRateLimit("test-rate-limit", 2, 60_000, now + 1).allowed).toBe(true);
    expect(checkRequestRateLimit("test-rate-limit", 2, 60_000, now + 2).allowed).toBe(false);
  });

  test("only accepts the supported replay scenario controls", () => {
    expect(
      replayRequestSchema.safeParse({
        preset: "Gate B Firmware Failure",
        attendance: "80,000 (Sold Out Surge)",
        weather: "Heavy Rain",
      }).success
    ).toBe(true);
    expect(
      replayRequestSchema.safeParse({
        preset: "Run arbitrary system command",
        attendance: "80,000 (Sold Out Surge)",
        weather: "Heavy Rain",
      }).success
    ).toBe(false);
  });

  test("recommends rail during peak egress with an explicit impact estimate", () => {
    const recommendation = SustainabilityService.getRecommendation("exit", 1.7);

    expect(recommendation.recommendedMode).toBe("rail");
    expect(recommendation.estimatedKgCo2eAvoidedPerThousandFans).toBeGreaterThan(0);
  });

  test("requires human review before an operational decision is approved", () => {
    render(<OpsDecisionCenter />);

    fireEvent.click(screen.getByRole("button", { name: /review decision/i }));
    expect(screen.getByText("Human Review Checkpoint")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /approve & log/i }));
    expect(screen.getByRole("button", { name: /approved/i })).toBeInTheDocument();
  });
});
