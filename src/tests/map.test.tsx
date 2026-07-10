import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import DigitalTwinPage from "@/app/dashboard/page";

describe("DigitalTwinPage Map Component", () => {
  test("renders systems overlays layer triggers", () => {
    render(<DigitalTwinPage />);

    expect(screen.getByText("Crowds")).toBeInTheDocument();
    expect(screen.getByText("Access")).toBeInTheDocument();
    expect(screen.getByText("Safety")).toBeInTheDocument();
    expect(screen.getByText("Transit")).toBeInTheDocument();
    expect(screen.getByText("Stores")).toBeInTheDocument();
  });

  test("renders stadium blueprint SVG element", () => {
    const { container } = render(<DigitalTwinPage />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  test("toggles a map layer updates layout", () => {
    render(<DigitalTwinPage />);

    const accessibilityBtn = screen.getByRole("button", { name: /toggle accessibility layer/i });
    const indicators = screen.getByText("Access");
    expect(indicators).not.toHaveClass("text-accessibility-purple");

    fireEvent.click(accessibilityBtn);

    expect(indicators).toHaveClass("text-accessibility-purple");
  });
});
