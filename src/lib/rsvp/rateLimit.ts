import 'server-only'
import { createHash } from 'node:crypto'
import { getPayloadClient } from '@/lib/payload'
import { consumeRateLimit } from './rateLimitCore'

export { consumeRateLimit, type RateLimitStore } from './rateLimitCore'

export async function allowInvitationLookup(code: string) {
  const key = `rsvp-lookup:${createHash('sha256').update(code.trim().toUpperCase()).digest('hex')}`
  const payload = await getPayloadClient()
  return consumeRateLimit(payload.kv, key, Date.now(), 10, 15 * 60 * 1000)
}
