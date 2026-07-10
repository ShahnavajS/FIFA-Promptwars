import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import DashboardLayout from "@/app/dashboard/layout";

vi.mock("next/navigation", () => ({
  usePathname: () => "/dashboard",
}));

describe("DashboardLayout Component", () => {
  test("renders logo and sidebar navigation links", () => {
    render(
      <DashboardLayout>
        <div>Content Workspace</div>
      </DashboardLayout>
    );

    expect(screen.getByText("StadiumPulse")).toBeInTheDocument();
    expect(screen.getByText("Digital Twin Map")).toBeInTheDocument();
    expect(screen.getByText("AI Concierge")).toBeInTheDocument();
    expect(screen.getByText("Content Workspace")).toBeInTheDocument();
  });

  test("contains dispatcher SOS button", () => {
    render(
      <DashboardLayout>
        <div>Content Workspace</div>
      </DashboardLayout>
    );

    const sosButton = screen.getByRole("button", { name: /broadcast alert/i });
    expect(sosButton).toBeInTheDocument();
  });
});
