interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const requestWindows = new Map<string, RateLimitRecord>();

export function checkRequestRateLimit(
  identifier: string,
  limit = 12,
  windowMs = 60_000,
  now = Date.now()
): { allowed: boolean; retryAfterSeconds: number } {
  const current = requestWindows.get(identifier);

  if (!current || current.resetAt <= now) {
    requestWindows.set(identifier, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (current.count >= limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }

  current.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}
