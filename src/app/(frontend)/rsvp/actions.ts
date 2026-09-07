'use server'

import { getHouseholdByCode } from '@/lib/rsvp/getHouseholdByCode'
import { allowInvitationLookup } from '@/lib/rsvp/rateLimit'
import { submitGuestResponses } from '@/lib/rsvp/submitGuestResponses'
import type { GuestResponsesInput } from '@/lib/rsvp/validation'

export async function lookupHouseholdAction(code: string) {
  if (!(await allowInvitationLookup(code))) return null
  return getHouseholdByCode(code)
}

export async function submitGuestResponsesAction(input: GuestResponsesInput) {
  return submitGuestResponses(input)
}
