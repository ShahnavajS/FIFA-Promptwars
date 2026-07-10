import { MatchPhase } from "@/stores/useMatchStore";

export function getMatchContext(phase: MatchPhase, attendance: number, mood: string, pairing: string): string {
  return `[MATCH STATE]: Active match: ${pairing}. Current lifecycle milestone: ${phase.toUpperCase()}. Active occupancy: ${attendance} fans inside bowl. Crowd mood indexes: ${mood}.`;
}
