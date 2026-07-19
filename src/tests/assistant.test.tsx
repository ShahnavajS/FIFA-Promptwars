import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { afterEach, beforeEach, describe, test, expect, vi } from "vitest";
import AssistantPage from "@/app/dashboard/assistant/page";

describe("AssistantPage Component", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          text: "Validated local safety response",
          provider: "local-safety-fallback",
        }),
      })
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test("renders concierge header and chat text input", () => {
    render(<AssistantPage />);

    expect(screen.getByText("StadiumPulse Concierge")).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/ask your tournament companion/i)).toBeInTheDocument();
  });

  test("renders quick suggested prompts pills", () => {
    render(<AssistantPage />);

    expect(screen.getByText("Route to Gate A (Step-Free)")).toBeInTheDocument();
  });

  test("clicking a suggested prompt updates messages feed", async () => {
    render(<AssistantPage />);

    const promptBtn = screen.getByText("Route to Gate A (Step-Free)");
    fireEvent.click(promptBtn);

    const bubbles = await screen.findAllByText("Route to Gate A (Step-Free)");
    expect(bubbles.length).toBeGreaterThan(0);

    await screen.findByText("Validated local safety response");
    expect(screen.getByText("Local safety fallback")).toBeInTheDocument();
  });
});
