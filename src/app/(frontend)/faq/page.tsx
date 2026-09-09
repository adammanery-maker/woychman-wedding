import { RichText } from '@/components/ui/RichText'
import { getFAQs } from '@/lib/content/getFAQs'
import { getFAQPage } from '@/lib/content/getFAQPage'

export default async function FAQPage() {
  const [page, faqs] = await Promise.all([getFAQPage(), getFAQs()])
  return <main className="page-main"><header className="page-intro"><p className="eyebrow">Good to know</p><h1>Frequently asked questions</h1>{page.introduction ? <p>{page.introduction}</p> : <p>We’ll keep this page current as plans become final.</p>}</header><section aria-labelledby="faq-heading"><p className="eyebrow">Helpful notes</p><h2 id="faq-heading">Questions</h2>{faqs.length === 0 ? <p>Questions and answers will be added soon.</p> : <div className="faq-list">{faqs.map((faq) => <details key={faq.id}><summary>{faq.question}</summary><RichText value={faq.answer} /></details>)}</div>}</section></main>
}
