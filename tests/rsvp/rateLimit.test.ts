import { describe, expect, it } from 'vitest'

import { consumeRateLimit, type RateLimitStore } from '@/lib/rsvp/rateLimitCore'

describe('RSVP rate limiting', () => {
  it('allows the configured number of attempts and blocks the next one', async () => {
    const values = new Map<string, unknown>()
    const store: RateLimitStore = { get: async <T extends NonNullable<unknown>>(key: string) => values.get(key) as T | null, set: async (key, value) => { values.set(key, value) } }
    expect(await consumeRateLimit(store, 'key', 1_000, 2, 900_000)).toBe(true)
    expect(await consumeRateLimit(store, 'key', 2_000, 2, 900_000)).toBe(true)
    expect(await consumeRateLimit(store, 'key', 3_000, 2, 900_000)).toBe(false)
    expect(await consumeRateLimit(store, 'key', 902_000, 2, 900_000)).toBe(true)
  })
})
