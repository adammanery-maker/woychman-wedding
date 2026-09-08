import { RegistryList } from '@/components/registry/RegistryList'
import { notFound } from 'next/navigation'
import { getRegistries } from '@/lib/content/getRegistries'
import { getRegistryPage } from '@/lib/content/getRegistryPage'

export default async function RegistryPage() { const [page, registries] = await Promise.all([getRegistryPage(), getRegistries()]); if (!page.enabled) notFound(); return <main className="page-main"><header className="page-intro"><p className="eyebrow">Registry</p><h1>Registry</h1>{page.introduction ? <p>{page.introduction}</p> : null}</header><RegistryList registries={registries} /></main> }
