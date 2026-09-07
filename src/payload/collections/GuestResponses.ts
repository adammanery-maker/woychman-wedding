import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'

export const GuestResponses: CollectionConfig = {
  slug: 'guest-responses',
  graphQL: false,
  admin: { group: 'RSVP', useAsTitle: 'guest', defaultColumns: ['guest', 'attendance', 'updatedAt'] },
  access: { create: authenticated, delete: authenticated, read: authenticated, update: authenticated },
  fields: [
    { name: 'guest', type: 'relationship', relationTo: 'guests', required: true, unique: true },
    { name: 'attendance', type: 'select', required: true, defaultValue: 'pending', options: ['pending', 'attending', 'not attending'] },
    { name: 'dietaryRestrictions', type: 'textarea', admin: { description: 'Optional dietary restrictions or allergies.' } },
    { name: 'accessibilityRequirements', type: 'textarea', admin: { description: 'Optional accessibility requirements.' } },
    { name: 'respondedAt', type: 'date' },
  ],
}
