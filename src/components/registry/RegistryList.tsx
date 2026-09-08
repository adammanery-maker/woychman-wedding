import type { Registry } from '@/payload-types'

export function RegistryList({ registries }: { registries: Registry[] }) {
  if (!registries.length) return <p>Registry details will be added soon.</p>
  return <div className="card-grid registry-grid">{registries.map((registry) => <article className="content-card registry-card" key={registry.id}><p className="eyebrow">Gift registry</p><h2>{registry.name}</h2>{registry.shortDescription ? <p>{registry.shortDescription}</p> : null}<a href={registry.url} rel="noreferrer">Visit registry <span aria-hidden="true">↗</span></a></article>)}</div>
}
