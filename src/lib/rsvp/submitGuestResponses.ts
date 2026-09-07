import 'server-only'

import { getHouseholdContext } from './getHouseholdByCode'
import { guestResponsesSchema } from './validation'

export type SubmitGuestResponsesResult = { ok: true } | { ok: false; error: 'invalid' | 'not-found' }

export async function submitGuestResponses(input: unknown): Promise<SubmitGuestResponsesResult> {
  const parsed = guestResponsesSchema.safeParse(input)
  if (!parsed.success) return { ok: false, error: 'invalid' }
  const context = await getHouseholdContext(parsed.data.invitationCode)
  if (!context) return { ok: false, error: 'not-found' }
  const allowedGuestIds = new Set(context.guests.map((guest) => guest.id))
  if (parsed.data.responses.some((response) => !allowedGuestIds.has(response.guestId))) return { ok: false, error: 'invalid' }

  for (const response of parsed.data.responses) {
    const existing = await context.payload.find({ collection: 'guest-responses', where: { guest: { equals: response.guestId } }, limit: 1, overrideAccess: true })
    const data = { attendance: response.attendance, dietaryRestrictions: response.attendance === 'attending' ? response.dietaryRestrictions || '' : '', accessibilityRequirements: response.attendance === 'attending' ? response.accessibilityRequirements || '' : '', respondedAt: new Date().toISOString(), guest: response.guestId }
    if (existing.docs[0]) await context.payload.update({ collection: 'guest-responses', id: existing.docs[0].id, overrideAccess: true, data })
    else await context.payload.create({ collection: 'guest-responses', overrideAccess: true, data })
  }
  return { ok: true }
}
