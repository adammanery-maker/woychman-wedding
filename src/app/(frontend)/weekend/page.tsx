import { getEvents } from '@/lib/content/getEvents'
import { getWeddingSettings } from '@/lib/content/getWeddingSettings'

function formatTime(value: string) {
  return new Intl.DateTimeFormat('en-CA', { hour: 'numeric', minute: '2-digit', timeZone: 'America/Edmonton' }).format(new Date(value))
}

export default async function WeekendPage() {
  const events = await getEvents()
  const settings = await getWeddingSettings()
  return <main className="page-main"><p className="eyebrow">{settings.weddingDateDisplay}</p><h1>Weekend details</h1><p>Schedule details are tentative and will be updated here as plans become final.</p><section aria-labelledby="schedule-heading"><h2 id="schedule-heading">Schedule</h2>{events.length === 0 ? <p>Schedule coming soon.</p> : <ol>{events.map((event) => { const venue = typeof event.venue === 'object' ? event.venue : null; return <li key={event.id}><h3>{event.title}</h3><p><time dateTime={event.startAt}>{formatTime(event.startAt)}</time>{event.endAt ? ` – ${formatTime(event.endAt)}` : null}</p>{venue ? <p>{venue.name}<br />{venue.addressLine1}, {venue.city}, {venue.provinceRegion} {venue.postalCode}</p> : null}{event.attire ? <p>Attire: {event.attire}</p> : null}{event.description ? <p>{event.description}</p> : null}</li> })}</ol>}</section></main>
}
