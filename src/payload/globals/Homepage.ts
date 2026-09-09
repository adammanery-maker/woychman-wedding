import type { GlobalConfig } from 'payload'

import { getAdminPreviewURL } from '@/lib/preview'
import { authenticated } from '../access/authenticated'
import { publishedOrAuthenticated } from '../access/publishedOrAuthenticated'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  admin: { group: 'Wedding Site', preview: () => getAdminPreviewURL('/') },
  access: { read: publishedOrAuthenticated, update: authenticated },
  fields: [
    { name: 'heroImage', type: 'upload', relationTo: 'media', label: 'Hero thumbnail / fallback image', admin: { description: 'Upload a lightweight still image to show instantly while the video loads. This also appears when video is unavailable.' } },
    { name: 'heroVideo', type: 'upload', relationTo: 'media', label: 'Hero video', admin: { description: 'Optional web-optimized MP4. Keep it under 10–20 MB when possible. Upload it in Media first, then select it here.' } },
    { name: 'eyebrow', type: 'text', label: 'Small introductory label' },
    { name: 'welcomeHeading', type: 'text', label: 'Homepage welcome heading' },
    { name: 'introduction', type: 'textarea', label: 'Homepage introduction' },
    {
      name: 'primaryAction', type: 'select', required: true, defaultValue: 'weekend', label: 'Primary homepage button',
      admin: { description: 'Choose the most useful next step for guests right now.' },
      options: [{ label: 'RSVP', value: 'rsvp' }, { label: 'Weekend details', value: 'weekend' }, { label: 'Travel & stay', value: 'travel' }, { label: 'Custom link', value: 'custom' }],
    },
    { name: 'customActionLabel', type: 'text', label: 'Custom button label', admin: { condition: (_, siblingData) => siblingData?.primaryAction === 'custom' } },
    { name: 'customActionURL', type: 'text', label: 'Custom button URL', admin: { condition: (_, siblingData) => siblingData?.primaryAction === 'custom' } },
    {
      name: 'secondaryAction', type: 'select', label: 'Secondary homepage button',
      options: [{ label: 'None', value: 'none' }, { label: 'Weekend details', value: 'weekend' }, { label: 'Travel & stay', value: 'travel' }],
    },
  ],
  versions: { drafts: true },
}
