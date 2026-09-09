import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { publishedOrAuthenticated } from '../access/publishedOrAuthenticated'
import { getAdminPreviewURL } from '@/lib/preview'

export const Venues: CollectionConfig = {
  slug: 'venues',
  admin: { group: 'Content', useAsTitle: 'name', preview: () => getAdminPreviewURL('/weekend') },
  access: { create: authenticated, delete: authenticated, read: publishedOrAuthenticated, update: authenticated },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'addressLine1', type: 'text', required: true, label: 'Address line 1' },
    { name: 'addressLine2', type: 'text', label: 'Address line 2' },
    { name: 'city', type: 'text', required: true },
    { name: 'provinceRegion', type: 'text', required: true, label: 'Province or region' },
    { name: 'postalCode', type: 'text', required: true, label: 'Postal code' },
    { name: 'country', type: 'text', required: true },
    { name: 'mapsURL', type: 'text', label: 'Map link' },
    { name: 'parkingInformation', type: 'textarea', label: 'Parking information' },
    { name: 'accessibilityInformation', type: 'textarea', label: 'Accessibility information' },
    { name: 'notes', type: 'textarea' },
  ],
  versions: { drafts: true },
}
