import type { GlobalConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { publishedOrAuthenticated } from '../access/publishedOrAuthenticated'
import { getAdminPreviewURL } from '@/lib/preview'
export const RegistryPage: GlobalConfig = { slug: 'registry-page', admin: { group: 'Wedding Site', preview: () => getAdminPreviewURL('/registry') }, access: { read: publishedOrAuthenticated, update: authenticated }, fields: [{ name: 'enabled', type: 'checkbox', defaultValue: false }, { name: 'introduction', type: 'textarea' }], versions: { drafts: true } }
