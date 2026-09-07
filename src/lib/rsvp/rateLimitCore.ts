export type RateLimitStore = { get<T extends NonNullable<unknown>>(key: string): Promise<T | null>; set(key: string, value: NonNullable<unknown>): Promise<void> }
type Counter = { count: number; resetAt: number }

export async function consumeRateLimit(store: RateLimitStore, key: string, now: number, limit: number, windowMs: number) {
  const current = await store.get<Counter>(key)
  const counter = !current || current.resetAt <= now ? { count: 0, resetAt: now + windowMs } : current
  if (counter.count >= limit) return false
  await store.set(key, { count: counter.count + 1, resetAt: counter.resetAt })
  return true
}
