import type { GlobalConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { publishedOrAuthenticated } from '../access/publishedOrAuthenticated'
export const Announcement: GlobalConfig = { slug: 'announcement', admin: { group: 'Wedding Site' }, access: { read: publishedOrAuthenticated, update: authenticated }, fields: [{ name: 'enabled', type: 'checkbox', defaultValue: false }, { name: 'message', type: 'text' }, { name: 'linkLabel', type: 'text' }, { name: 'linkURL', type: 'text' }, { name: 'tone', type: 'select', defaultValue: 'information', options: ['information', 'important'] }], versions: { drafts: true } }
