import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig, databaseKVAdapter } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Admins } from './payload/collections/Admins'
import { Media } from './payload/collections/Media'
import { Events } from './payload/collections/Events'
import { Venues } from './payload/collections/Venues'
import { Accommodations } from './payload/collections/Accommodations'
import { FAQs } from './payload/collections/FAQs'
import { Registries } from './payload/collections/Registries'
import { Households } from './payload/collections/Households'
import { Guests } from './payload/collections/Guests'
import { GuestResponses } from './payload/collections/GuestResponses'
import { Announcement } from './payload/globals/Announcement'
import { FAQPage } from './payload/globals/FAQPage'
import { Homepage } from './payload/globals/Homepage'
import { RegistryPage } from './payload/globals/RegistryPage'
import { StoryPage } from './payload/globals/StoryPage'
import { TravelPage } from './payload/globals/TravelPage'
import { WeddingSettings } from './payload/globals/WeddingSettings'
import { WeekendPage } from './payload/globals/WeekendPage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Admins.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
    collections: [Admins, Media, Venues, Events, Accommodations, FAQs, Registries, Households, Guests, GuestResponses],
  globals: [WeddingSettings, Homepage, WeekendPage, TravelPage, FAQPage, StoryPage, RegistryPage, Announcement],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  kv: databaseKVAdapter(),
  sharp,
  plugins: [
    vercelBlobStorage({
      clientUploads: true,
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
})
