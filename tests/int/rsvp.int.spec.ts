import { randomUUID } from 'node:crypto'
import { getPayload, type Payload } from 'payload'
import { beforeAll, afterAll, describe, expect, it } from 'vitest'
import config from '@/payload.config'
import { getHouseholdByCode } from '@/lib/rsvp/getHouseholdByCode'
import { submitGuestResponses } from '@/lib/rsvp/submitGuestResponses'

let payload: Payload
let householdId: number
let otherHouseholdId: number
let guestId: number
let otherGuestId: number
let invitationCode: string

describe('RSVP security and persistence', () => {
  beforeAll(async () => {
    payload = await getPayload({ config: await config })
    const suffix = randomUUID().replaceAll('-', '').slice(0, 12).toUpperCase()
    const household = await payload.create({ collection: 'households', overrideAccess: true, draft: false, data: { displayName: `Integration Household ${suffix}`, invitationCode: 'placeholder', active: true } })
    const otherHousehold = await payload.create({ collection: 'households', overrideAccess: true, draft: false, data: { displayName: `Other Household ${suffix}`, invitationCode: 'placeholder', active: true } })
    householdId = household.id
    otherHouseholdId = otherHousehold.id
    invitationCode = household.invitationCode
    const guest = await payload.create({ collection: 'guests', overrideAccess: true, draft: false, data: { household: household.id, firstName: 'Test', lastName: 'Guest', active: true } })
    const otherGuest = await payload.create({ collection: 'guests', overrideAccess: true, draft: false, data: { household: otherHousehold.id, firstName: 'Other', lastName: 'Guest', active: true } })
    guestId = guest.id
    otherGuestId = otherGuest.id
  })

  afterAll(async () => {
    await payload.delete({ collection: 'guest-responses', where: { guest: { in: [guestId, otherGuestId] } }, overrideAccess: true })
    await payload.delete({ collection: 'guests', where: { id: { in: [guestId, otherGuestId] } }, overrideAccess: true })
    await payload.delete({ collection: 'households', where: { id: { in: [householdId, otherHouseholdId] } }, overrideAccess: true })
    await payload.destroy()
  })

  it('returns only the guests belonging to the invitation household', async () => {
    const result = await getHouseholdByCode(invitationCode)
    expect(result?.guests.map((guest) => guest.id)).toEqual([guestId])
    expect(result).not.toHaveProperty('invitationCode')
  })

  it('denies unauthenticated collection reads', async () => {
    await expect(payload.find({ collection: 'guests', overrideAccess: false })).rejects.toThrow()
    await expect(payload.find({ collection: 'guest-responses', overrideAccess: false })).rejects.toThrow()
  })

  it('rejects a cross-household guest ID without writing a response', async () => {
    const result = await submitGuestResponses({ invitationCode, responses: [{ guestId: otherGuestId, attendance: 'attending' }] })
    expect(result).toEqual({ ok: false, error: 'invalid' })
    const responses = await payload.find({ collection: 'guest-responses', where: { guest: { equals: otherGuestId } }, overrideAccess: true })
    expect(responses.totalDocs).toBe(0)
  })

  it('updates one canonical response when a guest changes their answer', async () => {
    await expect(submitGuestResponses({ invitationCode, responses: [{ guestId, attendance: 'attending', dietaryRestrictions: 'Vegetarian' }] })).resolves.toEqual({ ok: true })
    await expect(submitGuestResponses({ invitationCode, responses: [{ guestId, attendance: 'not attending', dietaryRestrictions: 'Should be cleared' }] })).resolves.toEqual({ ok: true })
    const responses = await payload.find({ collection: 'guest-responses', where: { guest: { equals: guestId } }, overrideAccess: true })
    expect(responses.totalDocs).toBe(1)
    expect(responses.docs[0]?.attendance).toBe('not attending')
    expect(responses.docs[0]?.dietaryRestrictions).toBe('')
  })
})
