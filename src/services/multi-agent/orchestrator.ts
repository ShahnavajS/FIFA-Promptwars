import { MatchPhase } from "@/stores/useMatchStore";

export interface AgentAdvisory {
  agentName: string;
  category:
    "navigation" | "crowd" | "transport" | "accessibility" | "security" | "weather" | "emergency";
  message: string;
  severity: "info" | "warning" | "critical";
}

// 1. Navigation Agent
export class NavigationAgent {
  public static evaluate(phase: MatchPhase): AgentAdvisory[] {
    if (phase === "arrival") {
      return [
        {
          agentName: "NavAgent",
          category: "navigation",
          message: "Suggesting Gate A North; average walkway travel time is 4 mins.",
          severity: "info",
        },
      ];
    }
    if (phase === "exit") {
      return [
        {
          agentName: "NavAgent",
          category: "navigation",
          message: "Directing egress routes to Platform 3 transit platform.",
          severity: "info",
        },
      ];
    }
    return [];
  }
}

// 2. Crowd Agent
export class CrowdAgent {
  public static evaluate(density: number): AgentAdvisory[] {
    if (density >= 1.5) {
      return [
        {
          agentName: "CrowdAgent",
          category: "crowd",
          message: `Turnstiles flow limits reached (${Math.round(density * 100)}%). Redirection macros active.`,
          severity: "warning",
        },
      ];
    }
    return [
      {
        agentName: "CrowdAgent",
        category: "crowd",
        message: "Concourse densities normal.",
        severity: "info",
      },
    ];
  }
}

// 3. Transport Agent
export class TransportAgent {
  public static evaluate(phase: MatchPhase, emergency: string | null): AgentAdvisory[] {
    if (emergency === "RAIL EXPRESS STRIKE") {
      return [
        {
          agentName: "TransitAgent",
          category: "transport",
          message: "Meadowlands Rail Express suspended. Rerouting buses to platform 5.",
          severity: "critical",
        },
      ];
    }
    if (phase === "exit") {
      return [
        {
          agentName: "TransitAgent",
          category: "transport",
          message: "Manhattan shuttle buses reporting delays. Recommend rail lines.",
          severity: "warning",
        },
      ];
    }
    return [];
  }
}

// 4. Accessibility Agent
export class AccessibilityAgent {
  public static evaluate(wheelchairMode: boolean, emergency: string | null): AgentAdvisory[] {
    if (emergency === "ELEVATOR FAULT") {
      return [
        {
          agentName: "AccessAgent",
          category: "accessibility",
          message: "Lift Core West offline. Rerouting step-free traffic to East Core.",
          severity: "critical",
        },
      ];
    }
    if (wheelchairMode) {
      return [
        {
          agentName: "AccessAgent",
          category: "accessibility",
          message: "Wheelchair step-free routes active. West Lift Core active.",
          severity: "info",
        },
      ];
    }
    return [];
  }
}

// 5. Weather Agent
export class WeatherAgent {
  public static evaluate(domeStatus: string): AgentAdvisory[] {
    if (domeStatus === "closed") {
      return [
        {
          agentName: "WeatherAgent",
          category: "weather",
          message: "Dome closed due to heavy rain. Eco climate systems adjusted.",
          severity: "warning",
        },
      ];
    }
    return [
      {
        agentName: "WeatherAgent",
        category: "weather",
        message: "Roof open. Temp: 28°C.",
        severity: "info",
      },
    ];
  }
}

// 6. Security Agent
export class SecurityAgent {
  public static evaluate(emergency: string | null): AgentAdvisory[] {
    if (emergency === "LOST CHILD SEC 110") {
      return [
        {
          agentName: "SecurityAgent",
          category: "security",
          message: "Child separation report. Dispatching Sector 110 search grid.",
          severity: "critical",
        },
      ];
    }
    return [];
  }
}

// 7. Emergency Agent
export class EmergencyAgent {
  public static evaluate(emergency: string | null): AgentAdvisory[] {
    if (emergency === "MEDICAL INJURY SEC 112") {
      return [
        {
          agentName: "EmergencyAgent",
          category: "emergency",
          message: "Medical incident Sector 112. First Aid squad dispatched.",
          severity: "critical",
        },
      ];
    }
    return [];
  }
}

// Central Orchestrator Aggregator
export class MultiAgentOrchestrator {
  /**
   * Orchestrates active advisories by polling all domain agents.
   */
  public static orchestrate(
    phase: MatchPhase,
    density: number,
    domeStatus: string,
    wheelchairMode: boolean,
    emergency: string | null
  ): AgentAdvisory[] {
    const list: AgentAdvisory[] = [];

    // Aggregates sub-agents outputs
    list.push(...NavigationAgent.evaluate(phase));
    list.push(...CrowdAgent.evaluate(density));
    list.push(...TransportAgent.evaluate(phase, emergency));
    list.push(...AccessibilityAgent.evaluate(wheelchairMode, emergency));
    list.push(...WeatherAgent.evaluate(domeStatus));
    list.push(...SecurityAgent.evaluate(emergency));
    list.push(...EmergencyAgent.evaluate(emergency));

    return list;
  }
}
