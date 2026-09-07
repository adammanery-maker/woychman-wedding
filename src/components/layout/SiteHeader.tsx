import Link from 'next/link'

export function SiteHeader({ names, rsvpEnabled, showStory, showRegistry }: { names: string; rsvpEnabled: boolean; showStory: boolean; showRegistry: boolean }) {
  return <header className="site-header"><Link className="site-name" href="/">{names}</Link><nav className="site-nav" aria-label="Main navigation"><Link href="/weekend">Weekend</Link><Link href="/travel">Travel &amp; Stay</Link><Link href="/faq">FAQ</Link>{showStory ? <Link href="/story">Our Story</Link> : null}{showRegistry ? <Link href="/registry">Registry</Link> : null}</nav>{rsvpEnabled ? <Link className="rsvp-link" href="/rsvp">RSVP</Link> : null}</header>
}
