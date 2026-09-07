import { describe, expect, it } from 'vitest'
import { resolveHomepageAction } from '@/lib/content/homepageAction'

describe('homepage primary action', () => {
  it('resolves built-in actions to public routes', () => {
    expect(resolveHomepageAction({ primaryAction: 'rsvp', rsvpEnabled: true })).toEqual({ kind: 'rsvp', label: 'RSVP', href: '/rsvp' })
    expect(resolveHomepageAction({ primaryAction: 'weekend', rsvpEnabled: false })).toEqual({ kind: 'weekend', label: 'Weekend details', href: '/weekend' })
  })

  it('falls back safely when custom action fields are incomplete', () => {
    expect(resolveHomepageAction({ primaryAction: 'custom', customActionLabel: 'Learn more', rsvpEnabled: false })).toEqual({ kind: 'weekend', label: 'Weekend details', href: '/weekend' })
  })
})
