import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { publishedOrAuthenticated } from '../access/publishedOrAuthenticated'
export const FAQs: CollectionConfig = { slug: 'faqs', admin: { group: 'Content', useAsTitle: 'question' }, access: { create: authenticated, delete: authenticated, read: publishedOrAuthenticated, update: authenticated }, fields: [{ name: 'question', type: 'text', required: true }, { name: 'answer', type: 'richText', required: true }, { name: 'category', type: 'text' }, { name: 'sortOrder', type: 'number', defaultValue: 0 }], versions: { drafts: true } }
