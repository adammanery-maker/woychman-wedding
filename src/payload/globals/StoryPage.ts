import type { GlobalConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { publishedOrAuthenticated } from '../access/publishedOrAuthenticated'
import { getAdminPreviewURL } from '@/lib/preview'
export const StoryPage: GlobalConfig = { slug: 'story-page', admin: { group: 'Wedding Site', preview: () => getAdminPreviewURL('/story') }, access: { read: publishedOrAuthenticated, update: authenticated }, fields: [{ name: 'enabled', type: 'checkbox', defaultValue: false }, { name: 'title', type: 'text' }, { name: 'introduction', type: 'textarea' }, { name: 'body', type: 'richText' }, { name: 'images', type: 'upload', relationTo: 'media', hasMany: true }, { name: 'layout', type: 'select', defaultValue: 'standard', options: ['standard', 'image-left', 'image-right', 'full-width'] }], versions: { drafts: true } }
