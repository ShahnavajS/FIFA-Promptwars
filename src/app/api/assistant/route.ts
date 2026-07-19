import { NextRequest, NextResponse } from "next/server";
import { assistantRequestSchema } from "@/lib/ai/assistant-request";
import { checkRequestRateLimit } from "@/lib/ai/request-rate-limit";
import { GeminiWrapperService } from "@/services/google/gemini.service";

export const runtime = "nodejs";

function getRequestIdentifier(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return forwardedFor?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "anonymous";
}

export async function POST(request: NextRequest) {
  const rateLimit = checkRequestRateLimit(getRequestIdentifier(request));
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many assistant requests. Please wait a moment and try again." },
      { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } }
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  const parsedRequest = assistantRequestSchema.safeParse(payload);
  if (!parsedRequest.success) {
    return NextResponse.json(
      { error: "Assistant request contains invalid or unsupported context." },
      { status: 400 }
    );
  }

  try {
    const result = await GeminiWrapperService.generateContextReplyWithMetadata(
      parsedRequest.data.message,
      parsedRequest.data.context
    );
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      {
        error:
          "The assistant is temporarily unavailable. Please use official venue staff for urgent help.",
      },
      { status: 503 }
    );
  }
}
