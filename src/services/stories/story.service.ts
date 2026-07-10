import { MatchPhase } from "@/stores/useMatchStore";
import { PersonaType } from "../persona.service";

export interface StoryStep {
  index: number;
  label: string;
  description: string;
  phase: MatchPhase;
  density: number;
  emergency: string | null;
  activeLanguage: string;
  activePersona: PersonaType;
  expectedOutcome: string;
  uiPromptText: string;
}

export class StoryService {
  private static storySteps: StoryStep[] = [
    {
      index: 0,
      label: "Family Arrival",
      description: "The Miller family (parents + 2 kids) approaches stadium. AI greets them warmly, preloading baby-care maps.",
      phase: "arrival",
      density: 0.8,
      emergency: null,
      activeLanguage: "en",
      activePersona: "family",
      expectedOutcome: "Welcomes family, loads baby changing station layers, recommends train arrival walkway.",
      uiPromptText: "Hello! Where is the closest stroller-friendly gate?"
    },
    {
      index: 1,
      label: "Redirection Alert",
      description: "Turnstiles congestion spikes. AI detects potential family stress, advising a reroute to Gate A North.",
      phase: "gate-entry",
      density: 1.6,
      emergency: null,
      activeLanguage: "en",
      activePersona: "family",
      expectedOutcome: "Redirects from congested Gate B to Gate A North, saving 11 minutes of waiting.",
      uiPromptText: "Gate B turnstile queue is extremely long. Is there an easier path?"
    },
    {
      index: 2,
      label: "Lost Minor Incident",
      description: "Young child gets separated near concessions. Incident is logged; security coordinates active search.",
      phase: "halftime",
      density: 1.2,
      emergency: "LOST CHILD SEC 110",
      activeLanguage: "en",
      activePersona: "family",
      expectedOutcome: "Triggers lost child playbook: freezes exits, dispatches volunteers, updates parent chat.",
      uiPromptText: "Emergency: My son jersey #10 is lost! I cannot find him!"
    },
    {
      index: 3,
      label: "Volunteer Reunion",
      description: "Volunteer Sector 110 receives the security alert, locates the minor, and guides them back safely.",
      phase: "second-half",
      density: 1.0,
      emergency: "LOST CHILD SEC 110",
      activeLanguage: "es", // Spanish speaker volunteer scenario
      activePersona: "volunteer",
      expectedOutcome: "Translates phrasebook macros; confirms child matching identity; alerts family.",
      uiPromptText: "Volunteer dispatch: separated minor located and family reunited."
    },
    {
      index: 4,
      label: "Safe Egress departure",
      description: "Match completes. AI guides the family to Platform 3 transit express to exit safely before exit queues peak.",
      phase: "exit",
      density: 1.4,
      emergency: null,
      activeLanguage: "en",
      activePersona: "family",
      expectedOutcome: "Directs family to Platform 3 shuttle boarding, ensuring 100% stress-free transit home.",
      uiPromptText: "What is the best way to get back to the hotel?"
    }
  ];

  /**
   * Resolves a step from the Family Matchday story.
   */
  public static getStoryStep(index: number): StoryStep {
    return this.storySteps[index] || this.storySteps[0];
  }

  /**
   * Returns total length of the story.
   */
  public static getStoryLength(): number {
    return this.storySteps.length;
  }
}
