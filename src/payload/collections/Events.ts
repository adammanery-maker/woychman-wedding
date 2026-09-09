import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { publishedOrAuthenticated } from '../access/publishedOrAuthenticated'
import { getAdminPreviewURL } from '@/lib/preview'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: { group: 'Content', useAsTitle: 'title', defaultColumns: ['title', 'startAt', '_status'], preview: () => getAdminPreviewURL('/weekend') },
  access: { create: authenticated, delete: authenticated, read: publishedOrAuthenticated, update: authenticated },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'startAt', type: 'date', required: true, label: 'Start time' },
    { name: 'endAt', type: 'date', label: 'End time' },
    { name: 'recommendedArrivalAt', type: 'date', label: 'Recommended arrival time', admin: { description: 'The time guests should arrive; this is separate from the event start time.' } },
    { name: 'venue', type: 'relationship', relationTo: 'venues', required: true },
    { name: 'attire', type: 'text' },
    { name: 'description', type: 'textarea' },
    { name: 'parkingNote', type: 'textarea', label: 'Event-specific parking note' },
  ],
  versions: { drafts: true },
}
