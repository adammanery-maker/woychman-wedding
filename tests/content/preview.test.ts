import { afterEach, describe, expect, it, vi } from 'vitest'

import { getAdminPreviewURL, isSafePreviewPath } from '@/lib/preview'

describe('admin preview URLs', () => {
  afterEach(() => vi.unstubAllEnvs())

  it('does not expose a preview link until a dedicated secret is configured', () => {
    vi.stubEnv('PREVIEW_SECRET', '')
    expect(getAdminPreviewURL('/')).toBeNull()
  })

  it('creates an internal preview URL with the configured secret', () => {
    vi.stubEnv('PREVIEW_SECRET', 'test-preview-secret')
    expect(getAdminPreviewURL('/weekend')).toBe('/preview?path=%2Fweekend&previewSecret=test-preview-secret')
  })

  it('rejects open-redirect paths', () => {
    expect(isSafePreviewPath('/weekend')).toBe(true)
    expect(isSafePreviewPath('//example.com')).toBe(false)
    expect(isSafePreviewPath('https://example.com')).toBe(false)
    expect(isSafePreviewPath('/\\example.com')).toBe(false)
  })
})
