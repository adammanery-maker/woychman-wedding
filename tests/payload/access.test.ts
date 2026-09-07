import { describe, expect, it } from 'vitest'

import { authenticated } from '@/payload/access/authenticated'
import { publishedOrAuthenticated } from '@/payload/access/publishedOrAuthenticated'

describe('Payload access rules', () => {
  it('denies an anonymous administrator request', () => {
    expect(authenticated({ req: { user: null } } as never)).toBe(false)
  })

  it('limits anonymous public reads to published content', () => {
    expect(publishedOrAuthenticated({ req: { user: null } } as never)).toEqual({
      _status: { equals: 'published' },
    })
  })

  it('allows an authenticated administrator to read drafts', () => {
    expect(publishedOrAuthenticated({ req: { user: { id: 1 } } } as never)).toBe(true)
  })
})
