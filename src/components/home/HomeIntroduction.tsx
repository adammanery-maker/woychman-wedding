export function HomeIntroduction({ eyebrow, heading, introduction }: { eyebrow?: string | null; heading?: string | null; introduction?: string | null }) {
  if (!eyebrow && !heading && !introduction) return null

  return <div className="home-introduction">{eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}{heading ? <h2>{heading}</h2> : null}{introduction ? <p>{introduction}</p> : null}</div>
}
