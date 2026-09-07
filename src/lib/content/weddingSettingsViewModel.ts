export type WeddingSettingsSource = {
  allowSearchIndexing?: boolean | null
  city: string
  contactEmail: string
  contactName: string
  contactPhone?: string | null
  country: string
  endDate: string
  personOneDisplayName: string
  personTwoDisplayName: string
  provinceRegion: string
  rsvpButtonLabel?: string | null
  rsvpDeadline?: string | null
  rsvpEnabled?: boolean | null
  startDate: string
  timezone: string
}

export type WeddingSettingsViewModel = {
  coupleDisplayName: string
  locationDisplayName: string
  weddingDateDisplay: string
  weekend: { endDate: string; startDate: string; timezone: string }
  rsvp: { buttonLabel: string; deadline: string | null; enabled: boolean }
  contact: { email: string; name: string; phone: string | null }
  indexingAllowed: boolean
}

export function toWeddingSettingsViewModel(settings: WeddingSettingsSource): WeddingSettingsViewModel {
  const startDate = new Date(settings.startDate)
  const endDate = new Date(settings.endDate)
  const dateParts = new Intl.DateTimeFormat('en-CA', {
    day: 'numeric',
    month: 'long',
    timeZone: settings.timezone,
    year: 'numeric',
  }).formatToParts(startDate)
  const endDay = new Intl.DateTimeFormat('en-CA', { day: 'numeric', timeZone: settings.timezone }).format(endDate)
  const startDay = dateParts.find((part) => part.type === 'day')?.value
  const month = dateParts.find((part) => part.type === 'month')?.value
  const year = dateParts.find((part) => part.type === 'year')?.value
  const weddingDateDisplay =
    startDay === endDay ? `${month} ${startDay}, ${year}` : `${month} ${startDay}–${endDay}, ${year}`

  return {
    coupleDisplayName: `${settings.personOneDisplayName} & ${settings.personTwoDisplayName}`,
    locationDisplayName: [settings.city, settings.provinceRegion, settings.country].join(', '),
    weddingDateDisplay,
    weekend: { endDate: settings.endDate, startDate: settings.startDate, timezone: settings.timezone },
    rsvp: { buttonLabel: settings.rsvpButtonLabel || 'RSVP', deadline: settings.rsvpDeadline || null, enabled: settings.rsvpEnabled === true },
    contact: { email: settings.contactEmail, name: settings.contactName, phone: settings.contactPhone || null },
    indexingAllowed: settings.allowSearchIndexing === true,
  }
}
