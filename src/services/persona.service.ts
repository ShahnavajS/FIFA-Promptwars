export type PersonaType =
  | "fan"
  | "family"
  | "child"
  | "senior"
  | "tourist"
  | "volunteer"
  | "organizer"
  | "security"
  | "medical"
  | "vip"
  | "journalist"
  | "wheelchair";

export interface PersonaConfig {
  type: PersonaType;
  label: string;
  description: string;
  tone:
    | "enthusiastic"
    | "protective"
    | "gentle"
    | "reassuring"
    | "educational"
    | "instructive"
    | "operational"
    | "vigilant"
    | "urgent"
    | "respectful"
    | "professional";
  accessibilityNeeds: string[];
  priorityPreferences: string[];
}

export class PersonaEngine {
  private static configs: Record<PersonaType, PersonaConfig> = {
    fan: {
      type: "fan",
      label: "General Fan",
      description: "Standard stadium ticketholder seeking fast ingress, food, and match metrics.",
      tone: "enthusiastic",
      accessibilityNeeds: [],
      priorityPreferences: [
        "Fastest transit routing",
        "Nearby food queues",
        "Live scoreboard ticks",
      ],
    },
    family: {
      type: "family",
      label: "Family with Kids",
      description:
        "Parents traveling with children. Prefers minimal walking, family zones, and safety alerts.",
      tone: "protective",
      accessibilityNeeds: ["Stroller-friendly ramps", "Family toilets proximity"],
      priorityPreferences: [
        "Child lost checks",
        "Baby care stations proximity",
        "Low density gates",
      ],
    },
    child: {
      type: "child",
      label: "Independent Minor",
      description:
        "Young fan separated or attending group tours. Requires gentle guides and simple instructions.",
      tone: "gentle",
      accessibilityNeeds: ["Child ID bracelets validation"],
      priorityPreferences: ["Volunteer assistance locator", "Simple play zone routes"],
    },
    senior: {
      type: "senior",
      label: "Senior Fan",
      description:
        "Elderly fan. Prefers seating shade, resting stations, and lift alternatives to stairs.",
      tone: "reassuring",
      accessibilityNeeds: ["Step-free resting chairs", "Avoid steep stairways"],
      priorityPreferences: [
        "Elevator availability status",
        "First aid proximity",
        "Shuttle schedules",
      ],
    },
    tourist: {
      type: "tourist",
      label: "International Tourist",
      description:
        "First-time visitor from abroad. Needs multilingual helps, rail maps, and local guides.",
      tone: "educational",
      accessibilityNeeds: [],
      priorityPreferences: [
        "Phrasebook translation macros",
        "Rail platforms connection maps",
        "Offline ticket caching",
      ],
    },
    wheelchair: {
      type: "wheelchair",
      label: "Wheelchair User",
      description:
        "Fan requiring wheelchair space. Needs 100% step-free elevators and accessible paths.",
      tone: "reassuring",
      accessibilityNeeds: ["Elevators only", "Step-free concrete ramps", "Accessible lock gates"],
      priorityPreferences: [
        "Wheelchair routing overlay",
        "Accessible toilet wait times",
        "Accessible shuttle loops",
      ],
    },
    volunteer: {
      type: "volunteer",
      label: "Stadium Volunteer",
      description:
        "Event assistant guiding fans. Seeks checkpoint checklists and emergency reporting protocols.",
      tone: "instructive",
      accessibilityNeeds: [],
      priorityPreferences: [
        "Translation triggers",
        "Incident dispatch lists",
        "Operational playbooks",
      ],
    },
    organizer: {
      type: "organizer",
      label: "Ops Organizer",
      description:
        "Operations team coordinator. Analyzes stadium health, flows, and sustainability data.",
      tone: "operational",
      accessibilityNeeds: [],
      priorityPreferences: [
        "Stadium throughput charts",
        "Carbon emission saved counts",
        "Playbook dispatch tools",
      ],
    },
    security: {
      type: "security",
      label: "Security Steward",
      description:
        "Safety patrols officer. Monitors density congestion risks and incident reports.",
      tone: "vigilant",
      accessibilityNeeds: [],
      priorityPreferences: [
        "Incident telemetry reports",
        "Crowd density warnings",
        "Evacuation layouts",
      ],
    },
    medical: {
      type: "medical",
      label: "First Aid Paramedic",
      description: "Medic squad dispatcher. Focuses on trauma coordinate and access pathways.",
      tone: "urgent",
      accessibilityNeeds: [],
      priorityPreferences: ["Medical incident coordinates", "Medic vehicle lane clearance status"],
    },
    vip: {
      type: "vip",
      label: "VIP / Suite Guest",
      description: "Executive box ticket holder. Accesses premium entries and VIP valet terminals.",
      tone: "respectful",
      accessibilityNeeds: [],
      priorityPreferences: [
        "Valet gates coordinates",
        "Suite elevator codes",
        "Executive lounge wait times",
      ],
    },
    journalist: {
      type: "journalist",
      label: "Media Reporter",
      description:
        "Press reporter attending media tribunes. Focuses on Wi-Fi speeds and press access.",
      tone: "professional",
      accessibilityNeeds: [],
      priorityPreferences: [
        "Press box elevator codes",
        "Press center Wi-Fi loads",
        "Post-match press timelines",
      ],
    },
  };

  /**
   * Resolves configuration for a specific persona type.
   */
  public static getPersona(type: PersonaType): PersonaConfig {
    return this.configs[type] || this.configs.fan;
  }
}
