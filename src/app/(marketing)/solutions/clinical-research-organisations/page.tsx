import { notFound } from 'next/navigation'

import { VerticalPage } from '@/components/solutions/vertical-page'
import { createMetadata } from '@/lib/seo'
import { getSolutionBySlug } from '@/lib/solutions'

export const metadata = createMetadata({
  title: 'Clinical Research Organisations',
  description: 'AI solutions for Clinical Research Organisations — content coming soon.',
  path: '/solutions/clinical-research-organisations',
  noindex: true,
})

export default function Page() {
  const solution = getSolutionBySlug('clinical-research-organisations')
  if (!solution) notFound()
  return <VerticalPage solution={solution} />
}
