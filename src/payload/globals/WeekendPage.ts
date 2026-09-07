import type { GlobalConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { publishedOrAuthenticated } from '../access/publishedOrAuthenticated'

export const WeekendPage: GlobalConfig = {
  slug: 'weekend-page',
  admin: { group: 'Wedding Site' },
  access: { read: publishedOrAuthenticated, update: authenticated },
  fields: [{ name: 'introduction', type: 'textarea', label: 'Weekend introduction' }],
  versions: { drafts: true },
}
