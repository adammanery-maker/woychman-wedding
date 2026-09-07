import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { generateInvitationCode } from '../../lib/rsvp/generateInvitationCode'

export const Households: CollectionConfig = {
  slug: 'households',
  graphQL: false,
  admin: { group: 'RSVP', useAsTitle: 'displayName', defaultColumns: ['displayName', 'active'] },
  access: { create: authenticated, delete: authenticated, read: authenticated, update: authenticated },
  hooks: { beforeValidate: [({ data, operation, originalDoc }) => ({ ...data, invitationCode: operation === 'create' ? generateInvitationCode() : originalDoc?.invitationCode })] },
  fields: [
    { name: 'displayName', type: 'text', required: true },
    { name: 'invitationCode', type: 'text', required: true, unique: true, admin: { readOnly: true, description: 'Generated automatically. Share this code only with the invited household.' } },
    { name: 'contactEmail', type: 'email' },
    { name: 'active', type: 'checkbox', defaultValue: true },
    { name: 'adminNotes', type: 'textarea' },
  ],
}
