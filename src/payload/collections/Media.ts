import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { publishedOrAuthenticated } from '../access/publishedOrAuthenticated'

type AltTextInput = {
  alt?: string | null
  decorative?: boolean | null
}

export function hasRequiredAltText({ alt, decorative }: AltTextInput): boolean {
  return decorative === true || Boolean(alt?.trim())
}

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'Content',
    useAsTitle: 'alt',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: publishedOrAuthenticated,
    update: authenticated,
  },
  fields: [
    {
      name: 'decorative',
      type: 'checkbox',
      defaultValue: false,
      label: 'Decorative image',
      admin: {
        description: 'Only select this when the image conveys no information beyond nearby text.',
      },
    },
    {
      name: 'alt',
      type: 'text',
      label: 'Alt text',
      validate: (
        value: unknown,
        { siblingData }: { siblingData?: { decorative?: boolean | null } },
      ) =>
        hasRequiredAltText({
          alt: typeof value === 'string' ? value : undefined,
          decorative: siblingData?.decorative === true,
        }) || 'Alt text is required unless this image is decorative.',
    },
    {
      name: 'caption',
      type: 'text',
    },
    {
      name: 'credit',
      type: 'text',
    },
  ],
  upload: {
    imageSizes: [
      { name: 'sm', width: 640 },
      { name: 'md', width: 960 },
      { name: 'lg', width: 1440 },
      { name: 'xl', width: 2000 },
    ],
  },
}
