import { z } from "zod";

const userRoleSchema = z.enum(["fan", "volunteer", "organizer", "staff", "security"]);
const matchPhaseSchema = z.enum([
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
]);
const personaSchema = z.object({
  type: z.enum([
    "fan",
    "family",
    "child",
    "senior",
    "tourist",
    "volunteer",
    "organizer",
    "security",
    "medical",
    "vip",
    "journalist",
    "wheelchair",
  ]),
  label: z.string().trim().min(1).max(80),
  description: z.string().trim().min(1).max(280),
  tone: z.enum([
    "enthusiastic",
    "protective",
    "gentle",
    "reassuring",
    "educational",
    "instructive",
    "operational",
    "vigilant",
    "urgent",
    "respectful",
    "professional",
  ]),
  accessibilityNeeds: z.array(z.string().trim().min(1).max(120)).max(8),
  priorityPreferences: z.array(z.string().trim().min(1).max(120)).max(8),
});

const humanContextSchema = z.object({
  language: z.string().trim().min(2).max(10),
  mobility: z.enum(["standard", "wheelchair", "limited"]),
  companions: z.string().trim().min(1).max(120),
  favoriteTeam: z.string().trim().min(1).max(80),
  stressLevel: z.enum(["calm", "moderate", "high"]),
  journeyStage: z.enum(["transit", "ingress", "seated", "concessions", "egress"]),
  preferences: z.array(z.string().trim().min(1).max(120)).max(8),
});

export const assistantContextSchema = z
  .object({
    role: userRoleSchema,
    phase: matchPhaseSchema,
    attendance: z.number().int().min(0).max(100_000),
    mood: z.string().trim().min(1).max(40),
    pairing: z.string().trim().min(1).max(120),
    targetGate: z.string().trim().min(1).max(120),
    seat: z.string().trim().min(1).max(120),
    routeMode: z.string().trim().min(1).max(40),
    gateWait: z.number().min(0).max(180),
    concessionWait: z.number().min(0).max(180),
    temp: z.number().min(-30).max(60),
    wind: z.string().trim().min(1).max(40),
    domeStatus: z.enum(["open", "closed", "closing"]),
    activeEmergency: z.string().trim().min(1).max(120).nullable(),
    persona: personaSchema,
    humanContext: humanContextSchema,
  })
  .strict();

export const assistantRequestSchema = z
  .object({
    message: z.string().trim().min(1).max(750),
    context: assistantContextSchema,
  })
  .strict();

export type AssistantRequest = z.infer<typeof assistantRequestSchema>;
