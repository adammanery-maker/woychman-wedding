import Link from 'next/link'

const links = [
  ['Weekend', 'See the schedule', '/weekend'],
  ['Travel & stay', 'Plan your visit', '/travel'],
  ['FAQ', 'Good to know', '/faq'],
] as const

export function HomeGuestLinks() {
  return <nav className="home-guest-links" aria-label="Guest information"><p className="eyebrow">Start here</p><div className="home-guest-grid">{links.map(([label, description, href]) => <Link className="home-guest-link" href={href} key={href}><span>{label}</span><small>{description}</small><b aria-hidden="true">↗</b></Link>)}</div></nav>
}
