import { MatchPhase } from "@/stores/useMatchStore";

export interface SustainabilityRecommendation {
  recommendedMode: "rail" | "shuttle" | "rideshare";
  estimatedMinutes: number;
  estimatedKgCo2ePerFan: number;
  estimatedKgCo2eAvoidedPerThousandFans: number;
  operationalBenefit: string;
  dataLabel: string;
}

export class SustainabilityService {
  /**
   * Scenario estimates keep transport decisions explainable when live mobility data is unavailable.
   */
  public static getRecommendation(
    phase: MatchPhase,
    crowdDensityMultiplier: number
  ): SustainabilityRecommendation {
    const highDemand = phase === "exit" || phase === "full-time" || crowdDensityMultiplier >= 1.3;
    const recommendedMode = highDemand ? "rail" : "shuttle";
    const baselineKgCo2e = 0.24;
    const recommendedKgCo2e = recommendedMode === "rail" ? 0.04 : 0.1;

    return {
      recommendedMode,
      estimatedMinutes: recommendedMode === "rail" ? (highDemand ? 18 : 12) : 16,
      estimatedKgCo2ePerFan: recommendedKgCo2e,
      estimatedKgCo2eAvoidedPerThousandFans: Math.round(
        (baselineKgCo2e - recommendedKgCo2e) * 1_000
      ),
      operationalBenefit:
        recommendedMode === "rail"
          ? "Moves pressure away from rideshare pickup lanes during peak egress."
          : "Balances the arrival load while preserving rail capacity for later egress.",
      dataLabel: "Scenario estimate from current phase and crowd-density model",
    };
  }
}
