import { NextRequest, NextResponse } from "next/server";
import { replayRequestSchema } from "@/lib/ai/replay-request";
import { checkRequestRateLimit } from "@/lib/ai/request-rate-limit";
import { generateReplayTimeline } from "@/services/replay-generation.service";

export const runtime = "nodejs";

function getRequestIdentifier(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return forwardedFor?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "anonymous";
}

export async function POST(request: NextRequest) {
  const rateLimit = checkRequestRateLimit(`replay:${getRequestIdentifier(request)}`, 6);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many replay requests. Please wait a moment and try again." },
      { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } }
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  const parsedRequest = replayRequestSchema.safeParse(payload);
  if (!parsedRequest.success) {
    return NextResponse.json({ error: "Replay parameters are invalid." }, { status: 400 });
  }

  return NextResponse.json(await generateReplayTimeline(parsedRequest.data));
}
