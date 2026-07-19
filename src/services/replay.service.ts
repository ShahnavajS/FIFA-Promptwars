import { MatchPhase } from "@/stores/useMatchStore";
import { ReplayRequest } from "@/lib/ai/replay-request";
import { z } from "zod";

const MATCH_PHASES = [
  "pre-match",
  "arrival",
  "security",
  "gate-entry",
  "find-seat",
  "pre-kickoff",
  "kickoff",
  "halftime",
  "second-half",
  "full-time",
  "exit",
  "post-match",
] as const;

const REPLAY_PERSONAS = ["fan", "family", "senior", "tourist", "wheelchair", "volunteer"] as const;

const replayStepSchema = z.object({
  tick: z.number().int().min(0),
  label: z.string().min(1).max(80),
  time: z.string().min(1).max(16),
  phase: z.enum(MATCH_PHASES),
  density: z.number().min(0).max(3),
  emergency: z.string().min(1).max(120).nullable(),
  domeStatus: z.enum(["open", "closed"]),
  activePersona: z.enum(REPLAY_PERSONAS),
  explanation: z.string().min(1).max(500),
  recommendedAction: z.string().min(1).max(500),
  agentsLog: z.string().min(1).max(500),
});

const replayTimelineSchema = z
  .array(replayStepSchema)
  .length(5)
  .superRefine((steps, ctx) => {
    steps.forEach((step, index) => {
      if (step.tick !== index) {
        ctx.addIssue({
          code: "custom",
          message: `Replay step tick must match its array index (${index}).`,
          path: [index, "tick"],
        });
      }
    });
  });

export interface ReplayStep {
  tick: number;
  label: string;
  time: string;
  phase: MatchPhase;
  density: number;
  emergency: string | null;
  domeStatus: "open" | "closed";
  activePersona: "fan" | "family" | "senior" | "tourist" | "wheelchair" | "volunteer";
  explanation: string;
  recommendedAction: string;
  agentsLog: string;
}

export interface LearningRecord {
  id: string;
  scenario: string;
  previousCongestion: string;
  learnedBehavior: string;
  improvedRouting: string;
  improvementPercent: number;
}

export class ReplayService {
  private static replaySteps: ReplayStep[] = [
    {
      tick: 0,
      label: "Stadium Arrivals Open",
      time: "13:00",
      phase: "arrival",
      density: 0.8,
      emergency: null,
      domeStatus: "open",
      activePersona: "fan",
      explanation: "Ingress checkpoints initializing. Turnstile flows stable.",
      recommendedAction: "Maintain default arrival rail dispatching lines.",
      agentsLog: "Coordinator: Checking gate status. All grids reporting normal.",
    },
    {
      tick: 1,
      label: "Kickoff Ingress Peak",
      time: "14:15",
      phase: "gate-entry",
      density: 1.8,
      emergency: "GATE B CLOSURE",
      domeStatus: "open",
      activePersona: "family",
      explanation: "Turnstile Gate B offline due to reader fault. Ingress queue backups.",
      recommendedAction: "Redirect 18% flow north to stroller-friendly Gate A North.",
      agentsLog: "CrowdAgent -> NavigationAgent: Gate B wait times peak 28 mins. Update LEDs.",
    },
    {
      tick: 2,
      label: "Welcome Ceremonies",
      time: "14:45",
      phase: "pre-kickoff",
      density: 1.1,
      emergency: null,
      domeStatus: "open",
      activePersona: "senior",
      explanation: "Fans occupying seats. Concourse walkway density normalizes.",
      recommendedAction: "Update companion apps with sector-free elevator options.",
      agentsLog: "AccessAgent: Elevators Sector 112 clear. Disabled routes prioritised.",
    },
    {
      tick: 3,
      label: "Medical Emergency Call",
      time: "15:20",
      phase: "second-half",
      density: 1.2,
      emergency: "MEDICAL INJURY SEC 112",
      domeStatus: "open",
      activePersona: "volunteer",
      explanation: "Fan collapse reported in Sector 112 walkway path.",
      recommendedAction: "Clear ambulance vehicle corridor Lane C. Redirect pedestrian crowds.",
      agentsLog: "EmergencyAgent -> Coordinator: Medical response dispatched. Corridors clear.",
    },
    {
      tick: 4,
      label: "Match Kickoff Live",
      time: "16:00",
      phase: "kickoff",
      density: 1.0,
      emergency: null,
      domeStatus: "open",
      activePersona: "fan",
      explanation: "Match Argentina vs. Germany live. Solar dome power capture active.",
      recommendedAction: "Preserve climate eco preset boundaries.",
      agentsLog: "WeatherAgent: Temperature holds 28°C. Wind stable NW 14kmh.",
    },
    {
      tick: 5,
      label: "Goal Celebration Surge",
      time: "16:20",
      phase: "kickoff",
      density: 1.5,
      emergency: null,
      domeStatus: "open",
      activePersona: "fan",
      explanation: "Goal scored! Decibels peak 112dB. Excited crowd vibrations active.",
      recommendedAction: "Trigger gold confetti effects. Activate companion light waves.",
      agentsLog: "Coordinator -> All: Goal surge. Engage celebrate lighting offsets.",
    },
    {
      tick: 6,
      label: "Halftime Refresh Peak",
      time: "16:45",
      phase: "halftime",
      density: 1.6,
      emergency: null,
      domeStatus: "open",
      activePersona: "family",
      explanation: "Halftime concession queues peak near Sector 112 bathrooms.",
      recommendedAction: "Divert family lines to Sector 103 restrooms (2 min wait).",
      agentsLog: "CrowdAgent: Bathroom Sector 112 congested. Seat notifications pushed.",
    },
    {
      tick: 7,
      label: "Storm Warning Alert",
      time: "17:15",
      phase: "second-half",
      density: 1.1,
      emergency: "SEVERE WEATHER WARNING",
      domeStatus: "closed",
      activePersona: "tourist",
      explanation: "Heavy rain storm passing directly over arena.",
      recommendedAction: "Close dome roof. Mobilize free poncho info kiosks.",
      agentsLog: "WeatherAgent -> Coordinator: Dome roof closing sequence complete. HVAC on.",
    },
    {
      tick: 8,
      label: "Egress Dispersals",
      time: "18:00",
      phase: "exit",
      density: 1.7,
      emergency: "RAIL EXPRESS DELAY",
      domeStatus: "open",
      activePersona: "tourist",
      explanation: "Meadowlands Platform 3 offline. exiting rail capacities choked.",
      recommendedAction: "Divert 4,000 fans to Platform 5 Shuttle express lines.",
      agentsLog: "TransitAgent -> Coordinator: Platforms 3 offline. Dispatched +15 shuttle buses.",
    },
    {
      tick: 9,
      label: "Post-Match Egress Completed",
      time: "18:45",
      phase: "post-match",
      density: 0.6,
      emergency: null,
      domeStatus: "open",
      activePersona: "fan",
      explanation: "Stadium bowls empty. Egress loops concluding.",
      recommendedAction: "Generate carbon offset stats summary.",
      agentsLog: "Coordinator: Egress concluded successfully. Restoring default sensors.",
    },
  ];

  private static learningRecords: LearningRecord[] = [
    {
      id: "learn-01",
      scenario: "Gate Ingress Backups",
      previousCongestion: "Gate B backups peak at 42 mins during high-attendance arrivals.",
      learnedBehavior:
        "Identified check-in patterns. Predicts chokepoint 12 mins before limit capacity breaches.",
      improvedRouting: "Reroutes 18% flow to Gate A North wide stroller checkpoints.",
      improvementPercent: 28,
    },
    {
      id: "learn-02",
      scenario: "Transit Rail Failures",
      previousCongestion:
        "RailPlatform strikes isolate 8,000 exiting fans in Meadowlands perimeters.",
      learnedBehavior: "Learned shuttle bus load capacities; predicts bottlenecking times.",
      improvedRouting: "Triggers look-ahead shuttle bus dispatches +15m early.",
      improvementPercent: 19,
    },
    {
      id: "learn-03",
      scenario: "Severe Storm Ingress",
      previousCongestion: "Sudden rain storm causes perimeter slippage and stroller congestion.",
      learnedBehavior: "Recognizes weather indicators; closes stadium dome dynamically.",
      improvedRouting: "Triggers proactive poncho kiosk updates on companion wallets.",
      improvementPercent: 32,
    },
  ];

  public static getReplaySteps(): ReplayStep[] {
    return this.replaySteps.map((step) => ({ ...step }));
  }

  public static getReplayStep(tick: number): ReplayStep {
    return { ...this.replaySteps[Math.max(0, Math.min(tick, this.replaySteps.length - 1))] };
  }

  public static getLearningRecords(): LearningRecord[] {
    return this.learningRecords.map((record) => ({ ...record }));
  }

  public static parseGeneratedTimeline(rawJsonText: string): ReplayStep[] | null {
    let cleanedJson = rawJsonText.trim();
    if (cleanedJson.startsWith("```")) {
      cleanedJson = cleanedJson
        .replace(/^```(?:json)?\s*/i, "")
        .replace(/\s*```$/, "")
        .trim();
    }

    try {
      const parsed = JSON.parse(cleanedJson);
      const result = replayTimelineSchema.safeParse(parsed);
      return result.success ? result.data : null;
    } catch {
      return null;
    }
  }

  /**
   * Produces a deterministic scenario when Gemini is not configured or returns invalid data.
   */
  public static generateFallbackTimeline(params: ReplayRequest): ReplayStep[] {
    const steps: ReplayStep[] = [];
    const isStorm =
      params.weather.includes("Rain") || params.preset.toLowerCase().includes("weather");
    const isStrike =
      params.preset.toLowerCase().includes("strike") ||
      params.preset.toLowerCase().includes("transit");
    const isGateFail =
      params.preset.toLowerCase().includes("gate") ||
      params.preset.toLowerCase().includes("failure");
    const densityVal = params.attendance.includes("80")
      ? 1.8
      : params.attendance.includes("60")
        ? 1.4
        : 0.9;
    const initialDome = isStorm ? "closed" : "open";

    // Tick 0: Arrivals
    steps.push({
      tick: 0,
      label: `Arrivals Open (${params.weather})`,
      time: "13:00",
      phase: "arrival",
      density: Math.round(densityVal * 0.5 * 10) / 10,
      emergency: null,
      domeStatus: initialDome as "open" | "closed",
      activePersona: "fan",
      explanation: `Ingress portals initializing. Attendance target set to ${params.attendance} under ${params.weather} conditions.`,
      recommendedAction: "Activate default arrival transit dispatching and turnstile lines.",
      agentsLog: "Coordinator: Checking gate status. All grids normal.",
    });

    // Tick 1: Ingress
    steps.push({
      tick: 1,
      label: isGateFail ? "Gate Fault Crisis" : "Ingress Inflow Peak",
      time: "14:15",
      phase: "gate-entry",
      density: densityVal,
      emergency: isGateFail ? "GATE B SENSOR FAULT" : null,
      domeStatus: initialDome as "open" | "closed",
      activePersona: "family",
      explanation: isGateFail
        ? "Turnstile Gate B reader offline due to firmware failure. Ingress queues building."
        : "Standard peak ingress arrivals. Density multiplier rising as kickoff approaches.",
      recommendedAction: isGateFail
        ? "Divert stroller and family queues to stroller-friendly Gate A North (3 min wait)."
        : "Open all auxiliary entrance check-in lanes.",
      agentsLog: isGateFail
        ? "CrowdAgent -> NavigationAgent: Gate B queues rising. Updates pushed to LEDs."
        : "CrowdAgent: Entry rates normalized.",
    });

    // Tick 2: Match Live
    steps.push({
      tick: 2,
      label: isStorm ? "Storm Closes Dome" : "Kickoff Argentina vs Germany",
      time: "15:00",
      phase: "kickoff",
      density: 1.0,
      emergency: isStorm ? "SEVERE STORM ALARM" : null,
      domeStatus: "closed",
      activePersona: "senior",
      explanation: isStorm
        ? `Heavy precipitation detected near MetLife perimeters. Climate control activated under closed roof.`
        : `Kickoff. Atmosphere stabilized under standard solar grid preset rules.`,
      recommendedAction: isStorm
        ? "Alert companion apps of closing dome roof. Mobilize free poncho kiosks."
        : "Maintain standard temperature boundaries.",
      agentsLog: isStorm
        ? "WeatherAgent -> Coordinator: Dome roof closing sequence complete. HVAC on."
        : "WeatherAgent: Temperature holds 28.5C.",
    });

    // Tick 3: Halftime Refresh / Emergency
    steps.push({
      tick: 3,
      label: isStrike ? "Shuttle Alert" : "Halftime Concession Rush",
      time: "15:45",
      phase: "halftime",
      density: Math.round(densityVal * 0.9 * 10) / 10,
      emergency: isStrike ? "RAILWAY TERMINATION ACTIVE" : null,
      domeStatus: "closed",
      activePersona: "wheelchair",
      explanation: isStrike
        ? "Meadowlands Platform 3 express rail suspended. Shuttle requirements rising."
        : "Halftime concession crowds overloading Sector 112 facilities.",
      recommendedAction: isStrike
        ? "Mobilize auxiliary bus fleets. Send rerouting alerts to Platform 5."
        : "Redirect stroller and wheelchair users to Sector 103 step-free concourse zones.",
      agentsLog: isStrike
        ? "TransitAgent -> All: Shuttles dispatched to Platform 5. Commuter warning sent."
        : "AccessAgent: Elevator Sector 112 active.",
    });

    // Tick 4: Exit Egress
    steps.push({
      tick: 4,
      label: "Egress Dispersals",
      time: "16:45",
      phase: "exit",
      density: Math.round(densityVal * 1.1 * 10) / 10,
      emergency: isStrike ? "RAIL SYSTEM FAULT" : null,
      domeStatus: "closed",
      activePersona: "tourist",
      explanation: isStrike
        ? "Egress dispersals peaking. Platforms 3 remains offline. Rail express loops blocked."
        : "Full egress dispersal loops active. Clearing stadium rings.",
      recommendedAction: isStrike
        ? "Direct 4,000 exiting fans to Shuttle bus loops on Sector North-East."
        : "Maintain maximum express rail dispatch intervals.",
      agentsLog: isStrike
        ? "TransitAgent: Shuttles load-balanced."
        : "Coordinator: Egress concluded successfully.",
    });

    return steps;
  }
}
