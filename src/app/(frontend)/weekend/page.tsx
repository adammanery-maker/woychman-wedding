import { getEvents } from '@/lib/content/getEvents'
import { getWeddingSettings } from '@/lib/content/getWeddingSettings'

function formatTime(value: string, timezone: string) {
  return new Intl.DateTimeFormat('en-CA', { hour: 'numeric', minute: '2-digit', timeZone: timezone }).format(new Date(value))
}

export default async function WeekendPage() {
  const events = await getEvents()
  const settings = await getWeddingSettings()

  return <main className="page-main"><header className="page-intro"><p className="eyebrow">{settings.weddingDateDisplay}</p><h1>Weekend details</h1><p>Schedule details are tentative and will be updated here as plans become final.</p></header><section aria-labelledby="schedule-heading"><p className="eyebrow">The celebration</p><h2 id="schedule-heading">A weekend together</h2>{events.length === 0 ? <p>Schedule coming soon.</p> : <ol className="event-timeline">{events.map((event, index) => { const venue = typeof event.venue === 'object' ? event.venue : null; return <li className="event-item" key={event.id}><div className="event-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</div><div className="event-detail"><p className="event-time"><time dateTime={event.startAt}>{formatTime(event.startAt, settings.weekend.timezone)}</time>{event.endAt ? ` – ${formatTime(event.endAt, settings.weekend.timezone)}` : null}</p>{event.recommendedArrivalAt ? <p className="event-arrival">Guests arrive from {formatTime(event.recommendedArrivalAt, settings.weekend.timezone)}</p> : null}<h3>{event.title}</h3>{venue ? <p className="event-venue"><strong>{venue.name}</strong><br />{venue.addressLine1}{venue.addressLine2 ? `, ${venue.addressLine2}` : ''}<br />{venue.city}, {venue.provinceRegion} {venue.postalCode}{venue.mapsURL ? <><br /><a href={venue.mapsURL} rel="noreferrer">Open map ↗</a></> : null}</p> : null}{event.attire ? <p><strong>Attire:</strong> {event.attire}</p> : null}{event.description ? <p>{event.description}</p> : null}{event.parkingNote || venue?.parkingInformation || venue?.accessibilityInformation ? <div className="event-notes">{event.parkingNote ? <p><strong>Parking:</strong> {event.parkingNote}</p> : null}{!event.parkingNote && venue?.parkingInformation ? <p><strong>Parking:</strong> {venue.parkingInformation}</p> : null}{venue?.accessibilityInformation ? <p><strong>Accessibility:</strong> {venue.accessibilityInformation}</p> : null}</div> : null}</div></li> })}</ol>}</section></main>
}
