import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { useMatchStore } from "@/stores/useMatchStore";
import { DemoControl } from "@/components/ui/demo-control";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  usePathname: () => "/dashboard",
}));

describe("Match Timeline Engine & Demo Simulator", () => {
  test("initializes match engine store with defaults", () => {
    const state = useMatchStore.getState();
    expect(state.currentPhase).toBe("pre-match");
    expect(state.attendance).toBe(0);
    expect(state.opsStatus).toBe("normal");
  });

  test("manually sets phase updates metrics", () => {
    useMatchStore.getState().setPhase("security");
    const state = useMatchStore.getState();
    expect(state.currentPhase).toBe("security");
    expect(state.attendance).toBe(34000);
    expect(state.crowdMood).toBe("tense");
  });

  test("advancing phase progresses sequentially", () => {
    useMatchStore.getState().setPhase("pre-kickoff");
    useMatchStore.getState().advancePhase();
    
    const state = useMatchStore.getState();
    expect(state.currentPhase).toBe("kickoff");
    expect(state.attendance).toBe(82000);
  });

  test("triggering emergency status updates flags", () => {
    useMatchStore.getState().triggerEmergency("ELEVATOR FAULT");
    const state = useMatchStore.getState();
    expect(state.activeEmergency).toBe("ELEVATOR FAULT");
    expect(state.opsStatus).toBe("critical");
  });

  test("renders judges demo panel widgets", () => {
    render(<DemoControl />);

    // Click Tactical Injectors tab to show action buttons
    fireEvent.click(screen.getByText("Showcases"));

    // Cockpit title exists
    expect(screen.getByText("Judge Control Cockpit")).toBeInTheDocument();
    
    // Check buttons exist
    expect(screen.getByText("Opening Ceremony")).toBeInTheDocument();
    expect(screen.getByText("Next Step")).toBeInTheDocument();
  });
});
