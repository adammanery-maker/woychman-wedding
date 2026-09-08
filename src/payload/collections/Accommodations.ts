import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { publishedOrAuthenticated } from '../access/publishedOrAuthenticated'

export const Accommodations: CollectionConfig = {
  slug: 'accommodations', admin: { group: 'Content', useAsTitle: 'name', defaultColumns: ['name', 'bookingDeadline', 'active', '_status'] },
  access: { create: authenticated, delete: authenticated, read: publishedOrAuthenticated, update: authenticated },
  fields: [
    { name: 'name', type: 'text', required: true, label: 'Property name' }, { name: 'propertyURL', type: 'text', label: 'Property website' }, { name: 'bookingURL', type: 'text', label: 'Booking link' },
    { name: 'shortDescription', type: 'textarea', label: 'Guest-facing description' }, { name: 'location', type: 'text', label: 'Address or area' }, { name: 'distanceFromVenue', type: 'text', label: 'Distance from venue' }, { name: 'approximateTravelTime', type: 'text', label: 'Approximate travel time' }, { name: 'priceRange', type: 'text', label: 'Price range' }, { name: 'roomInformation', type: 'textarea', label: 'Room information' },
    { name: 'bookingDeadline', type: 'date', label: 'Booking deadline', admin: { description: 'The last day guests can use the room block or booking code.' } }, { name: 'bookingCode', type: 'text', label: 'Booking code' }, { name: 'parkingInformation', type: 'textarea', label: 'Parking information' }, { name: 'checkIn', type: 'date', label: 'Check-in' }, { name: 'checkOut', type: 'date', label: 'Check-out' },
    { name: 'bestFor', type: 'select', label: 'Best for', hasMany: true, options: ['couples', 'solo travellers', 'groups of four', 'groups of six'] },
    { name: 'active', type: 'checkbox', defaultValue: true }, { name: 'sortOrder', type: 'number', defaultValue: 0 },
  ], versions: { drafts: true },
}
