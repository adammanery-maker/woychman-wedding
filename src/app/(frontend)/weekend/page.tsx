import { getEvents } from '@/lib/content/getEvents'
import { getWeddingSettings } from '@/lib/content/getWeddingSettings'

function formatTime(value: string) {
  return new Intl.DateTimeFormat('en-CA', { hour: 'numeric', minute: '2-digit', timeZone: 'America/Edmonton' }).format(new Date(value))
}

export default async function WeekendPage() {
  const events = await getEvents()
  const settings = await getWeddingSettings()

  return <main className="page-main"><header className="page-intro"><p className="eyebrow">{settings.weddingDateDisplay}</p><h1>Weekend details</h1><p>Schedule details are tentative and will be updated here as plans become final.</p></header><section aria-labelledby="schedule-heading"><p className="eyebrow">The celebration</p><h2 id="schedule-heading">A weekend together</h2>{events.length === 0 ? <p>Schedule coming soon.</p> : <ol className="event-timeline">{events.map((event, index) => { const venue = typeof event.venue === 'object' ? event.venue : null; return <li className="event-item" key={event.id}><div className="event-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</div><div className="event-detail"><p className="event-time"><time dateTime={event.startAt}>{formatTime(event.startAt)}</time>{event.endAt ? ` – ${formatTime(event.endAt)}` : null}</p><h3>{event.title}</h3>{venue ? <p className="event-venue"><strong>{venue.name}</strong><br />{venue.addressLine1}, {venue.city}, {venue.provinceRegion} {venue.postalCode}</p> : null}{event.attire ? <p>Attire: {event.attire}</p> : null}{event.description ? <p>{event.description}</p> : null}</div></li> })}</ol>}</section></main>
}
