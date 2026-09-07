import type { GlobalConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { publishedOrAuthenticated } from '../access/publishedOrAuthenticated'
export const RegistryPage: GlobalConfig = { slug: 'registry-page', admin: { group: 'Wedding Site' }, access: { read: publishedOrAuthenticated, update: authenticated }, fields: [{ name: 'enabled', type: 'checkbox', defaultValue: false }, { name: 'introduction', type: 'textarea' }], versions: { drafts: true } }
