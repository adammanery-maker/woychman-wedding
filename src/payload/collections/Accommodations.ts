import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { publishedOrAuthenticated } from '../access/publishedOrAuthenticated'

export const Accommodations: CollectionConfig = {
  slug: 'accommodations', admin: { group: 'Content', useAsTitle: 'name' },
  access: { create: authenticated, delete: authenticated, read: publishedOrAuthenticated, update: authenticated },
  fields: [
    { name: 'name', type: 'text', required: true }, { name: 'propertyURL', type: 'text' }, { name: 'bookingURL', type: 'text' },
    { name: 'shortDescription', type: 'textarea' }, { name: 'location', type: 'text' }, { name: 'distanceFromVenue', type: 'text' }, { name: 'approximateTravelTime', type: 'text' }, { name: 'priceRange', type: 'text' }, { name: 'roomInformation', type: 'textarea' },
    { name: 'bookingDeadline', type: 'date' }, { name: 'bookingCode', type: 'text' }, { name: 'parkingInformation', type: 'textarea' }, { name: 'checkIn', type: 'date' }, { name: 'checkOut', type: 'date' },
    { name: 'bestFor', type: 'select', hasMany: true, options: ['couples', 'solo travellers', 'groups of four', 'groups of six'] },
    { name: 'active', type: 'checkbox', defaultValue: true }, { name: 'sortOrder', type: 'number', defaultValue: 0 },
  ], versions: { drafts: true },
}
