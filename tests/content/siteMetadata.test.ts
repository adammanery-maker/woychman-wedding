import { describe, expect, it } from 'vitest'

import { createSiteMetadata } from '@/lib/siteMetadata'

describe('createSiteMetadata', () => {
  const settings = {
    coupleDisplayName: 'Jacey & Adam',
    indexingAllowed: false,
    locationDisplayName: 'Canmore, Alberta, Canada',
    weddingDateDisplay: 'July 3, 2027',
  }

  it('keeps the private wedding site out of search engines by default', () => {
    const metadata = createSiteMetadata(settings)

    expect(metadata.title).toBe('Jacey & Adam')
    expect(metadata.description).toContain('Canmore, Alberta, Canada')
    expect(metadata.robots).toEqual({ index: false, follow: false })
    expect(metadata.openGraph).toMatchObject({ title: 'Jacey & Adam', type: 'website' })
  })

  it('allows indexing only when the owner explicitly enables it', () => {
    const metadata = createSiteMetadata({ ...settings, indexingAllowed: true })

    expect(metadata.robots).toEqual({ index: true, follow: true })
  })
})
