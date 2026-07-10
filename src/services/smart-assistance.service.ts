import { MatchPhase } from "@/stores/useMatchStore";

export class SmartAssistanceService {
  /**
   * Evaluates operational context variables to detect supportive opportunities.
   */
  public static detectOpportunities(
    phase: MatchPhase,
    activeEmergency: string | null,
    domeStatus: string,
    stressLevel: "calm" | "moderate" | "high",
    persona: string
  ): string[] {
    const alerts: string[] = [];

    // 1. Storm / Rain opportunity
    if (domeStatus === "closed") {
      alerts.push("HUMAN ASSIST: Rain active. Eco poncho counters are open at West Entrance corridors.");
    }

    // 2. High stress support
    if (stressLevel === "high") {
      alerts.push("CALM ADVISORY: High crowd density detected nearby. Tap to route to the Quiet Zone area in Sector 104.");
    }

    // 3. Emergency Incident dispatches
    if (activeEmergency) {
      if (activeEmergency.includes("LOST CHILD")) {
        alerts.push("SAFETY ASSIST: Child search beacon active. Security is locking Sector 110. Staff is available to help.");
      } else if (activeEmergency.includes("MEDICAL")) {
        alerts.push("SAFETY ASSIST: Medical lane prioritized. Avoid Sector 112 walking lanes to let paramedics pass.");
      }
    }

    // 4. Persona-focused opportunity matching
    if (persona === "family" && phase === "gate-entry") {
      alerts.push("FAMILY HELP: Gate A North features stroller-friendly turnstiles. Skip Gate B stairways.");
    } else if (persona === "senior" && phase === "halftime") {
      alerts.push("SENIOR HELP: Avoid concession queues. Lift Core West elevator is open for priority level 2 dining access.");
    } else if (persona === "tourist" && phase === "arrival") {
      alerts.push("TOURIST HELP: Welcome to MetLife Arena! Language translation guides are pre-loaded in your travel pass.");
    } else if (persona === "wheelchair" && phase === "exit") {
      alerts.push("ACCESSIBILITY HELP: Wheelchair exit routes are highlighted. Accessible shuttles depart platforms every 8m.");
    }

    return alerts;
  }
}
