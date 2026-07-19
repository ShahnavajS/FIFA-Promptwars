import { z } from "zod";

export const replayRequestSchema = z
  .object({
    preset: z.enum([
      "Normal Ingress Flow",
      "Gate B Firmware Failure",
      "Severe Thunderstorm",
      "Transit Rail Strike",
    ]),
    attendance: z.enum([
      "40,000 (Low Inflow)",
      "60,000 (Medium Inflow)",
      "80,000 (Sold Out Surge)",
    ]),
    weather: z.enum(["Clear Sky", "Heavy Rain", "Extreme Summer Heat"]),
  })
  .strict();

export type ReplayRequest = z.infer<typeof replayRequestSchema>;
