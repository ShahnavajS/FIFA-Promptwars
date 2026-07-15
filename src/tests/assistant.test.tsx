import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import AssistantPage from "@/app/dashboard/assistant/page";

describe("AssistantPage Component", () => {
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

    // Wait for the async model response to render, preventing act warning
    await screen.findByText(/STADIUM PULSE COMPANION/i);
  });
});
