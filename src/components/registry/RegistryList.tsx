import type { Registry } from '@/payload-types'

export function RegistryList({ registries }: { registries: Registry[] }) {
  if (!registries.length) return <p>Registry details will be added soon.</p>
  return <div className="card-grid">{registries.map((registry) => <article className="content-card" key={registry.id}><h2>{registry.name}</h2>{registry.shortDescription ? <p>{registry.shortDescription}</p> : null}<a href={registry.url} rel="noreferrer">View registry</a></article>)}</div>
}
