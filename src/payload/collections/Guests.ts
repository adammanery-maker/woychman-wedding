import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'

export const Guests: CollectionConfig = {
  slug: 'guests',
  admin: { group: 'RSVP', useAsTitle: 'firstName', defaultColumns: ['firstName', 'lastName', 'household', 'active'] },
  graphQL: false,
  access: { create: authenticated, delete: authenticated, read: authenticated, update: authenticated },
  fields: [
    { name: 'household', type: 'relationship', relationTo: 'households', required: true },
    { name: 'firstName', type: 'text', required: true },
    { name: 'lastName', type: 'text', required: true },
    { name: 'displayName', type: 'text', admin: { description: 'Optional public-facing name. If blank, first and last name are used.' } },
    { name: 'active', type: 'checkbox', defaultValue: true },
  ],
}
