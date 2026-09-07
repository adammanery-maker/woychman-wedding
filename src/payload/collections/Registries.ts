import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { publishedOrAuthenticated } from '../access/publishedOrAuthenticated'
export const Registries: CollectionConfig = { slug: 'registries', admin: { group: 'Content', useAsTitle: 'name' }, access: { create: authenticated, delete: authenticated, read: publishedOrAuthenticated, update: authenticated }, fields: [{ name: 'name', type: 'text', required: true }, { name: 'url', type: 'text', required: true }, { name: 'shortDescription', type: 'textarea' }, { name: 'image', type: 'upload', relationTo: 'media' }, { name: 'active', type: 'checkbox', defaultValue: true }, { name: 'sortOrder', type: 'number', defaultValue: 0 }], versions: { drafts: true } }
