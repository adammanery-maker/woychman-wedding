import 'server-only'

import { getPayloadClient } from '@/lib/payload'
import { invitationCodeSchema } from './validation'

export type HouseholdGuestView = {
  id: number
  displayName: string
  attendance: 'pending' | 'attending' | 'not attending'
  dietaryRestrictions: string | null
  accessibilityRequirements: string | null
}

export type HouseholdView = {
  displayName: string
  guests: HouseholdGuestView[]
}

export async function getHouseholdByCode(code: string): Promise<HouseholdView | null> {
  const parsedCode = invitationCodeSchema.safeParse(code)
  if (!parsedCode.success) return null
  const payload = await getPayloadClient()
  const households = await payload.find({ collection: 'households', where: { and: [{ invitationCode: { equals: parsedCode.data } }, { active: { equals: true } }] }, limit: 1, overrideAccess: true })
  const household = households.docs[0]
  if (!household) return null
  const guests = await payload.find({ collection: 'guests', where: { and: [{ household: { equals: household.id } }, { active: { equals: true } }] }, limit: 100, overrideAccess: true, sort: 'firstName' })
  const guestViews = await Promise.all(guests.docs.map(async (guest) => {
    const responses = await payload.find({ collection: 'guest-responses', where: { guest: { equals: guest.id } }, limit: 1, overrideAccess: true })
    const response = responses.docs[0]
    return { id: guest.id, displayName: guest.displayName || `${guest.firstName} ${guest.lastName}`, attendance: response?.attendance || 'pending', dietaryRestrictions: response?.dietaryRestrictions || null, accessibilityRequirements: response?.accessibilityRequirements || null }
  }))
  return { displayName: household.displayName, guests: guestViews }
}

export async function getHouseholdContext(code: string) {
  const parsedCode = invitationCodeSchema.safeParse(code)
  if (!parsedCode.success) return null
  const payload = await getPayloadClient()
  const households = await payload.find({ collection: 'households', where: { and: [{ invitationCode: { equals: parsedCode.data } }, { active: { equals: true } }] }, limit: 1, overrideAccess: true })
  const household = households.docs[0]
  if (!household) return null
  const guests = await payload.find({ collection: 'guests', where: { and: [{ household: { equals: household.id } }, { active: { equals: true } }] }, limit: 100, overrideAccess: true })
  return { payload, household, guests: guests.docs, invitationCode: parsedCode.data }
}
