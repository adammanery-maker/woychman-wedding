import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { publishedOrAuthenticated } from '../access/publishedOrAuthenticated'
import { getAdminPreviewURL } from '@/lib/preview'
export const Registries: CollectionConfig = { slug: 'registries', admin: { group: 'Content', useAsTitle: 'name', preview: () => getAdminPreviewURL('/registry') }, access: { create: authenticated, delete: authenticated, read: publishedOrAuthenticated, update: authenticated }, fields: [{ name: 'name', type: 'text', required: true }, { name: 'url', type: 'text', required: true }, { name: 'shortDescription', type: 'textarea' }, { name: 'image', type: 'upload', relationTo: 'media' }, { name: 'active', type: 'checkbox', defaultValue: true }, { name: 'sortOrder', type: 'number', defaultValue: 0 }], versions: { drafts: true } }
