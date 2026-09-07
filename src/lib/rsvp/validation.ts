import { z } from 'zod'

export function normalizeInvitationCode(value: string) {
  return value.replace(/[\s-]/g, '').toUpperCase()
}

export const invitationCodeSchema = z.string().trim().min(8).max(64).transform(normalizeInvitationCode).pipe(z.string().regex(/^[A-F0-9]{32}$/, 'Invitation code is invalid'))

const guestResponseSchema = z.object({
  guestId: z.coerce.number().int().positive(),
  attendance: z.enum(['attending', 'not attending']),
  dietaryRestrictions: z.string().trim().max(2000).optional(),
  accessibilityRequirements: z.string().trim().max(2000).optional(),
})

export const guestResponsesSchema = z.object({
  invitationCode: invitationCodeSchema,
  responses: z.array(guestResponseSchema).min(1).max(100),
}).superRefine((value, context) => {
  const guestIds = value.responses.map((response) => response.guestId)
  if (new Set(guestIds).size !== guestIds.length) context.addIssue({ code: 'custom', path: ['responses'], message: 'Each guest may appear only once' })
})

export type GuestResponsesInput = z.infer<typeof guestResponsesSchema>
