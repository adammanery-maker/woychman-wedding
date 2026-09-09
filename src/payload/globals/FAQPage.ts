import type { GlobalConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { publishedOrAuthenticated } from '../access/publishedOrAuthenticated'
import { getAdminPreviewURL } from '@/lib/preview'
export const FAQPage: GlobalConfig = { slug: 'faq-page', admin: { group: 'Wedding Site', preview: () => getAdminPreviewURL('/faq') }, access: { read: publishedOrAuthenticated, update: authenticated }, fields: [{ name: 'introduction', type: 'textarea' }], versions: { drafts: true } }
