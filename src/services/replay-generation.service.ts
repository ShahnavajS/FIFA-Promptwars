import { ReplayRequest } from "@/lib/ai/replay-request";
import { AIService } from "@/services/ai.service";
import { ReplayService, ReplayStep } from "@/services/replay.service";

export interface ReplayGenerationResult {
  steps: ReplayStep[];
  provider: "gemini" | "local-safety-fallback";
}

export async function generateReplayTimeline(
  params: ReplayRequest
): Promise<ReplayGenerationResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  const hasServerKey = Boolean(apiKey && apiKey.startsWith("AIza") && apiKey.length > 20);

  if (hasServerKey) {
    try {
      const systemPrompt =
        "You are a stadium operations simulator for a FIFA World Cup 2026 venue. " +
        "Generate a custom 5-tick, advisory-only operations timeline. " +
        "Output only a valid JSON array of exactly five ReplayStep objects, without markdown. " +
        "Each object must include tick (0-4), label, time, phase, density, emergency, domeStatus, activePersona, explanation, recommendedAction, and agentsLog. " +
        "Never invent official incident instructions, medical advice, or transit schedules. Critical recommendations must be framed as pending operations review.";
      const prompt =
        `Create a five-step operations simulation. Preset: ${params.preset}. ` +
        `Attendance: ${params.attendance}. Weather: ${params.weather}.`;
      const generatedText = await AIService.generateText(prompt, systemPrompt);
      const steps = ReplayService.parseGeneratedTimeline(generatedText);

      if (steps) {
        return { steps, provider: "gemini" };
      }
    } catch (error) {
      console.warn("Gemini replay generation failed; returning the local safety fallback.", error);
    }
  }

  return {
    steps: ReplayService.generateFallbackTimeline(params),
    provider: "local-safety-fallback",
  };
}
