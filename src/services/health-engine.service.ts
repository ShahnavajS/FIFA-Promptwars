import { MatchPhase } from "@/stores/useMatchStore";

export interface HealthMetrics {
  operationalPulse: number;
  operationalStability: number;
  recoveryIndex: number;
  aiConfidence: number;
  forecast: string;
}

export class StadiumHealthEngineService {
  /**
   * Calculates dynamic stadium operational metrics based on live environment indicators.
   */
  public static computeHealth(
    phase: MatchPhase,
    density: number,
    dome: string,
    emergency: string | null
  ): HealthMetrics {
    let pulse = 98;
    let stability = 95;
    let recovery = 100;
    let confidence = 99;
    let forecast = "Stadium systems running at optimum design limits. Ingress flow normal.";

    // 1. Crowd Density reductions
    if (density > 1.3) {
      pulse -= Math.round(10 * density);
      stability -= Math.round(8 * density);
      confidence -= 2;
    }

    // 2. Weather adjustments
    if (dome === "closed") {
      stability -= 5;
      forecast = "Dome closed due to heavy rain. Indoor climate controls engaged.";
    }

    // 3. Active Emergency Incident impact
    if (emergency) {
      pulse -= 35;
      stability -= 25;
      confidence -= 6;
      
      if (emergency.includes("LOST CHILD")) {
        recovery = 60;
        forecast = "Lost child search grid Sector 110 active. Turnstiles frozen.";
      } else if (emergency.includes("MEDICAL")) {
        recovery = 80;
        forecast = "Sector 112 medical response active. Concourse lanes clear.";
      } else if (emergency.includes("STRIKE")) {
        recovery = 50;
        forecast = "Transit Express Rail Platform 3 offline. Directing bus lines.";
      } else {
        recovery = 70;
        forecast = "Operational incident registered. Safety playbooks active.";
      }
    } else {
      // Phase-specific narrative predictions
      if (phase === "gate-entry") {
        forecast = "Gate B density peaking. REDIRECT recommended to Gate A North.";
      } else if (phase === "halftime") {
        forecast = "Halftime concession queues peaking. Restrooms load balancing active.";
      } else if (phase === "exit" || phase === "full-time") {
        forecast = "Mass egress active. Rail platform loops dispatching every 10m.";
      }
    }

    return {
      operationalPulse: Math.max(5, pulse),
      operationalStability: Math.max(5, stability),
      recoveryIndex: Math.max(5, recovery),
      aiConfidence: Math.max(50, confidence),
      forecast
    };
  }
}
