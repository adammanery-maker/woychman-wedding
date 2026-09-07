import { describe, expect, it } from 'vitest'

import { siteName } from '@/lib/site'

describe('application shell', () => {
  it('identifies the WoychMan Wedding site', () => {
    expect(siteName).toBe('WoychMan Wedding')
  })
})
