import { MatchPhase } from "@/stores/useMatchStore";

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
      agentsLog: "Coordinator: Checking gate status. All grids reporting normal."
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
      agentsLog: "CrowdAgent -> NavigationAgent: Gate B wait times peak 28 mins. Update LEDs."
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
      agentsLog: "AccessAgent: Elevators Sector 112 clear. Disabled routes prioritised."
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
      agentsLog: "EmergencyAgent -> Coordinator: Medical response dispatched. Corridors clear."
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
      agentsLog: "WeatherAgent: Temperature holds 28°C. Wind stable NW 14kmh."
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
      agentsLog: "Coordinator -> All: Goal surge. Engage celebrate lighting offsets."
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
      agentsLog: "CrowdAgent: Bathroom Sector 112 congested. Seat notifications pushed."
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
      agentsLog: "WeatherAgent -> Coordinator: Dome roof closing sequence complete. HVAC on."
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
      agentsLog: "TransitAgent -> Coordinator: Platforms 3 offline. Dispatched +15 shuttle buses."
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
      agentsLog: "Coordinator: Egress concluded successfully. Restoring default sensors."
    }
  ];

  private static learningRecords: LearningRecord[] = [
    {
      id: "learn-01",
      scenario: "Gate Ingress Backups",
      previousCongestion: "Gate B backups peak at 42 mins during high-attendance arrivals.",
      learnedBehavior: "Identified check-in patterns. Predicts chokepoint 12 mins before limit capacity breaches.",
      improvedRouting: "Reroutes 18% flow to Gate A North wide stroller checkpoints.",
      improvementPercent: 28
    },
    {
      id: "learn-02",
      scenario: "Transit Rail Failures",
      previousCongestion: "RailPlatform strikes isolate 8,000 exiting fans in Meadowlands perimeters.",
      learnedBehavior: "Learned shuttle bus load capacities; predicts bottlenecking times.",
      improvedRouting: "Triggers look-ahead shuttle bus dispatches +15m early.",
      improvementPercent: 19
    },
    {
      id: "learn-03",
      scenario: "Severe Storm Ingress",
      previousCongestion: "Sudden rain storm causes perimeter slippage and stroller congestion.",
      learnedBehavior: "Recognizes weather indicators; closes stadium dome dynamically.",
      improvedRouting: "Triggers proactive poncho kiosk updates on companion wallets.",
      improvementPercent: 32
    }
  ];

  public static getReplaySteps(): ReplayStep[] {
    return this.replaySteps;
  }

  public static getReplayStep(tick: number): ReplayStep {
    return this.replaySteps[Math.max(0, Math.min(tick, this.replaySteps.length - 1))];
  }

  public static getLearningRecords(): LearningRecord[] {
    return this.learningRecords;
  }
}
