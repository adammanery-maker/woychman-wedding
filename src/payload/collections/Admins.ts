import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'

export const Admins: CollectionConfig = {
  slug: 'admins',
  admin: {
    group: 'System',
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  fields: [],
}
