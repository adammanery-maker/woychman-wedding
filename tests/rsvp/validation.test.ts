import { describe, expect, it } from 'vitest'

import { invitationCodeSchema, guestResponsesSchema } from '@/lib/rsvp/validation'
import { generateInvitationCode } from '@/lib/rsvp/generateInvitationCode'

const validCode = 'A7C4-4F9E-B2D1-88A1-4CDE-7790-AB12-CC34'

describe('RSVP validation', () => {
  it('generates a 128-bit uppercase hexadecimal code', () => {
    const code = generateInvitationCode()
    expect(code).toMatch(/^[A-F0-9]{32}$/)
    expect(invitationCodeSchema.safeParse(code).success).toBe(true)
  })
  it('accepts a high-entropy invitation code', () => {
    expect(invitationCodeSchema.safeParse(validCode).success).toBe(true)
  })

  it('rejects a blank or short invitation code', () => {
    expect(invitationCodeSchema.safeParse('').success).toBe(false)
    expect(invitationCodeSchema.safeParse('abc').success).toBe(false)
  })

  it('accepts one response per invited guest', () => {
    const result = guestResponsesSchema.safeParse({
      invitationCode: validCode,
      responses: [{ guestId: 42, attendance: 'attending', dietaryRestrictions: 'None' }],
    })
    expect(result.success).toBe(true)
  })

  it('rejects unknown attendance values and oversized notes', () => {
    expect(guestResponsesSchema.safeParse({ invitationCode: validCode, responses: [{ guestId: 42, attendance: 'maybe' }] }).success).toBe(false)
    expect(guestResponsesSchema.safeParse({ invitationCode: validCode, responses: [{ guestId: 42, attendance: 'attending', dietaryRestrictions: 'x'.repeat(2001) }] }).success).toBe(false)
  })
})
