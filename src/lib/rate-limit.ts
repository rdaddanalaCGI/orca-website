/**
 * Minimal in-memory fixed-window rate limiter.
 *
 * This is intentionally simple and process-local. It stops casual abuse and
 * accidental double submits. For multi-instance production deployments, swap the
 * store for a shared backend (Redis/DynamoDB) behind this same interface.
 */

type Entry = { count: number; resetAt: number }

const store = new Map<string, Entry>()

export type RateLimitResult = {
  ok: boolean
  remaining: number
  retryAfterSeconds: number
}

export function rateLimit({
  key,
  limit = 5,
  windowMs = 60_000,
}: {
  key: string
  limit?: number
  windowMs?: number
}): RateLimitResult {
  const now = Date.now()
  const entry = store.get(key)

  if (!entry || entry.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs })
    return { ok: true, remaining: limit - 1, retryAfterSeconds: 0 }
  }

  entry.count += 1

  if (entry.count > limit) {
    return {
      ok: false,
      remaining: 0,
      retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000),
    }
  }

  return { ok: true, remaining: limit - entry.count, retryAfterSeconds: 0 }
}

/** Opportunistic cleanup so the map cannot grow without bound. */
export function pruneRateLimitStore(now = Date.now()) {
  for (const [key, entry] of store) {
    if (entry.resetAt <= now) store.delete(key)
  }
}

/** Test-only helper. */
export function resetRateLimitStore() {
  store.clear()
}
