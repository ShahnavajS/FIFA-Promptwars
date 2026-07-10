export interface JourneyMemory {
  preferredLanguage: string;
  transportMode: "rail" | "shuttle" | "rideshare" | "walk";
  visitedStadiums: string[];
  previousInteractions: Array<{ query: string; reply: string }>;
  accessibilityEnabled: boolean;
}

export class JourneyMemoryService {
  private static memory: JourneyMemory = {
    preferredLanguage: "en",
    transportMode: "rail",
    visitedStadiums: ["MetLife Arena", "Estadio Azteca"],
    previousInteractions: [],
    accessibilityEnabled: false
  };

  /**
   * Retrieves the current user journey memory model.
   */
  public static getMemory(): JourneyMemory {
    return { ...this.memory };
  }

  /**
   * Updates partial parameters within journey memory.
   */
  public static updateMemory(updates: Partial<JourneyMemory>): void {
    this.memory = {
      ...this.memory,
      ...updates
    };
  }

  /**
   * Caches a user prompt/reply pair inside memory history.
   */
  public static addInteraction(query: string, reply: string): void {
    const logs = [...this.memory.previousInteractions, { query, reply }];
    // Cap log history length to 8 items to save memory space
    if (logs.length > 8) {
      logs.shift();
    }
    this.memory.previousInteractions = logs;
  }

  /**
   * Resets the user memory to stadium defaults.
   */
  public static resetMemory(): void {
    this.memory = {
      preferredLanguage: "en",
      transportMode: "rail",
      visitedStadiums: ["MetLife Arena"],
      previousInteractions: [],
      accessibilityEnabled: false
    };
  }
}
