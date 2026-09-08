import { describe, expect, it } from 'vitest'

import { Media, hasRequiredAltText } from '@/payload/collections/Media'

describe('media alt text validation', () => {
  it('requires useful alt text for a meaningful image', () => {
    expect(hasRequiredAltText({ alt: '   ', decorative: false })).toBe(false)
  })

  it('allows an explicitly decorative image to omit alt text', () => {
    expect(hasRequiredAltText({ alt: undefined, decorative: true })).toBe(true)
  })

  it('accepts descriptive alt text for a meaningful image', () => {
    expect(hasRequiredAltText({ alt: 'Couple walking beside a mountain lake', decorative: false })).toBe(
      true,
    )
  })

  it('stores media publication state for public relation reads', () => {
    expect(Media.versions).toMatchObject({ drafts: true })
  })
})
