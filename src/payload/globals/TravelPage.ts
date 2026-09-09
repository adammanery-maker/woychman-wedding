import type { GlobalConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { publishedOrAuthenticated } from '../access/publishedOrAuthenticated'
import { getAdminPreviewURL } from '@/lib/preview'
const field = (name: string, label: string) => ({ name, label, type: 'richText' as const })
export const TravelPage: GlobalConfig = { slug: 'travel-page', admin: { group: 'Wedding Site', preview: () => getAdminPreviewURL('/travel') }, access: { read: publishedOrAuthenticated, update: authenticated }, fields: [field('introduction', 'Introduction'), field('gettingToCanmore', 'Getting to Canmore'), field('weddingTransportation', 'Wedding transportation'), field('parking', 'Parking'), field('weatherGuidance', 'Weather and location guidance'), field('localNotes', 'Local notes')], versions: { drafts: true } }
