import { MatchPhase } from "@/stores/useMatchStore";

export interface CrowdForecast {
  bottlenecks: string[];
  queueMinutesGrowth: number;
  safetyOverflowTimeMins: number;
  exitBottleneckScore: number;
}

export class PredictiveCrowdService {
  /**
   * Forecasts future crowd issues based on match phase, density multipliers, and active emergencies.
   */
  public static getForecast(
    phase: MatchPhase,
    densityMultiplier: number,
    activeEmergency: string | null
  ): CrowdForecast {
    // 1. Critical Emergency Override
    if (activeEmergency) {
      return {
        bottlenecks: [
          `EVACUATION CONGESTION: Egress pathways towards Gate A are saturated due to [${activeEmergency}].`,
          "MEDICAL ROADBLOCK: Emergency lane Sector 112 blocked by fan movement.",
        ],
        queueMinutesGrowth: 0,
        safetyOverflowTimeMins: 0,
        exitBottleneckScore: 95,
      };
    }

    // 2. Ingress Phase Inflow Forecast
    if (phase === "gate-entry" || phase === "security") {
      const isCritical = densityMultiplier >= 1.5;
      const overflowTime = isCritical
        ? Math.round(8 / densityMultiplier)
        : Math.round(18 / densityMultiplier);

      return {
        bottlenecks: [
          "Gate B turnstiles queue growth exceeding threshold limits.",
          "North perimeter bag scanning lanes backing up.",
        ],
        queueMinutesGrowth: Math.round(6 * densityMultiplier),
        safetyOverflowTimeMins: Math.max(1, overflowTime),
        exitBottleneckScore: 10,
      };
    }

    // 3. Halftime Break Forecast
    if (phase === "halftime") {
      return {
        bottlenecks: [
          "Sector 112 restroom queue exceeding target duration by 18%.",
          "Sector 115 Maple Bites beverage line clearance rate dropping.",
        ],
        queueMinutesGrowth: Math.round(4 * densityMultiplier),
        safetyOverflowTimeMins: Math.round(15 / densityMultiplier),
        exitBottleneckScore: 20,
      };
    }

    // 4. Egress Phase Outflow Forecast
    if (phase === "full-time" || phase === "exit") {
      const score = Math.min(Math.round(45 * densityMultiplier), 100);
      return {
        bottlenecks: [
          "Meadowlands rail express Platform 3 boarding density high.",
          "Rideshare Zone 1 pick-up queues surge.",
        ],
        queueMinutesGrowth: 0,
        safetyOverflowTimeMins: 999,
        exitBottleneckScore: score,
      };
    }

    // 5. Default Calm State
    return {
      bottlenecks: [],
      queueMinutesGrowth: 0,
      safetyOverflowTimeMins: 999,
      exitBottleneckScore: 0,
    };
  }
}
