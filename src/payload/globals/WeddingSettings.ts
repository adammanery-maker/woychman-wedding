import type { GlobalConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { publishedOrAuthenticated } from '../access/publishedOrAuthenticated'

export const WeddingSettings: GlobalConfig = {
  slug: 'wedding-settings',
  admin: {
    group: 'Wedding Site',
  },
  access: {
    read: publishedOrAuthenticated,
    update: authenticated,
  },
  fields: [
    { name: 'personOneDisplayName', type: 'text', required: true, label: 'First person display name' },
    { name: 'personTwoDisplayName', type: 'text', required: true, label: 'Second person display name' },
    { name: 'startDate', type: 'date', required: true, label: 'Wedding weekend start date' },
    { name: 'endDate', type: 'date', required: true, label: 'Wedding weekend end date' },
    { name: 'city', type: 'text', required: true, label: 'City' },
    { name: 'provinceRegion', type: 'text', required: true, label: 'Province or region' },
    { name: 'country', type: 'text', required: true, label: 'Country' },
    { name: 'timezone', type: 'text', required: true, defaultValue: 'America/Edmonton' },
    { name: 'rsvpEnabled', type: 'checkbox', defaultValue: false, label: 'RSVP is open' },
    { name: 'rsvpDeadline', type: 'date', label: 'RSVP deadline' },
    { name: 'rsvpButtonLabel', type: 'text', defaultValue: 'RSVP', label: 'RSVP button label' },
    { name: 'contactName', type: 'text', required: true, label: 'Wedding contact name' },
    { name: 'contactEmail', type: 'email', required: true, label: 'Wedding contact email' },
    { name: 'contactPhone', type: 'text', label: 'Wedding contact phone' },
    {
      name: 'allowSearchIndexing',
      type: 'checkbox',
      defaultValue: false,
      label: 'Allow search indexing',
      admin: { description: 'Leave off to keep this personal website out of search results.' },
    },
  ],
  versions: {
    drafts: true,
  },
}
