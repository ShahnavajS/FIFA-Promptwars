import { MatchPhase } from "@/stores/useMatchStore";

export interface StadiumMoodConfig {
  mood: "Preparing" | "Electric" | "Celebrating" | "Calm" | "Recovery" | "Vigilant";
  color: string;
  animationSpeed: number;
  microcopy: string;
  themeClass: string;
}

export class MatchExperienceService {
  /**
   * Resolves the emotional stadium mood and styles based on matchday parameters.
   */
  public static getStadiumMood(
    phase: MatchPhase,
    activeEmergency: string | null
  ): StadiumMoodConfig {
    // 1. Critical Alert Mood
    if (activeEmergency) {
      return {
        mood: "Vigilant",
        color: "text-rose-500",
        animationSpeed: 1.8,
        microcopy:
          "SAFETY PROTOCOLS ENGAGED: Our priority is your safety. Follow volunteer exit routing markers.",
        themeClass: "border-rose-900 bg-rose-950/20 text-rose-300",
      };
    }

    // 2. Standard Match phases mapping
    switch (phase) {
      case "pre-match":
      case "arrival":
      case "security":
        return {
          mood: "Preparing",
          color: "text-neutral-400",
          animationSpeed: 0.8,
          microcopy:
            "WELCOME TO METLIFE ARENA: World Cup 2026 preparations underway. Enjoy your matchday experience!",
          themeClass: "border-neutral-900 bg-neutral-950/60",
        };
      case "gate-entry":
      case "find-seat":
      case "pre-kickoff":
        return {
          mood: "Electric",
          color: "text-cyan-400",
          animationSpeed: 1.0,
          microcopy:
            "ANTICIPATION BUILDING: Find your seat rows. Match kickoff is approaching shortly.",
          themeClass: "border-cyan-900/30 bg-cyan-950/10 text-cyan-200",
        };
      case "kickoff":
      case "second-half":
        return {
          mood: "Electric",
          color: "text-cyber-green",
          animationSpeed: 1.4,
          microcopy:
            "MATCH LIVE: Argentina vs. Germany. Stadium solar energy capture running at 94% capacity offsets.",
          themeClass: "border-cyber-green/30 bg-cyber-green/5 text-emerald-200",
        };
      case "halftime":
        return {
          mood: "Calm",
          color: "text-amber-400",
          animationSpeed: 0.5,
          microcopy:
            "HALFTIME INTERVAL: Take a break. Concessions restroom load routing is currently active.",
          themeClass: "border-amber-900/30 bg-amber-950/5 text-amber-200",
        };
      case "full-time":
        return {
          mood: "Celebrating",
          color: "text-victory-gold animate-bounce",
          animationSpeed: 1.6,
          microcopy:
            "ARGENTINA VICTORY! Confetti celebration active. What a memorable tournament matchday!",
          themeClass: "border-victory-gold/30 bg-victory-gold/5 text-victory-gold",
        };
      case "exit":
      case "post-match":
        return {
          mood: "Recovery",
          color: "text-neutral-400",
          animationSpeed: 0.6,
          microcopy:
            "THANK YOU FOR ATTENDING: Safe travels home. Proceed to Platform 3 Meadowlands transit rail loop.",
          themeClass: "border-neutral-900 bg-neutral-950/40",
        };
    }
  }
}
