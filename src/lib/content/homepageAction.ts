export type HomepageAction = { kind: 'rsvp' | 'weekend' | 'travel' | 'custom'; label: string; href: string }

export function resolveHomepageAction(input: { primaryAction?: string | null; rsvpEnabled: boolean; customActionLabel?: string | null; customActionURL?: string | null }): HomepageAction {
  if (input.primaryAction === 'rsvp' && input.rsvpEnabled) return { kind: 'rsvp', label: 'RSVP', href: '/rsvp' }
  if (input.primaryAction === 'travel') return { kind: 'travel', label: 'Travel & Stay', href: '/travel' }
  if (input.primaryAction === 'custom' && input.customActionLabel && input.customActionURL) return { kind: 'custom', label: input.customActionLabel, href: input.customActionURL }
  return { kind: 'weekend', label: 'Weekend details', href: '/weekend' }
}

export function resolveSecondaryHomepageAction(value?: string | null): HomepageAction | null {
  if (value === 'travel') return { kind: 'travel', label: 'Travel & Stay', href: '/travel' }
  if (value === 'weekend') return { kind: 'weekend', label: 'Weekend details', href: '/weekend' }
  return null
}
