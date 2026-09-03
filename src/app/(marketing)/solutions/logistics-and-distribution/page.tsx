import { notFound } from 'next/navigation'

import { VerticalPage } from '@/components/solutions/vertical-page'
import { createMetadata } from '@/lib/seo'
import { getSolutionBySlug } from '@/lib/solutions'

export const metadata = createMetadata({
  title: 'Logistics & Distribution',
  description: 'AI solutions for Logistics & Distribution — content coming soon.',
  path: '/solutions/logistics-and-distribution',
  noindex: true,
})

export default function Page() {
  const solution = getSolutionBySlug('logistics-and-distribution')
  if (!solution) notFound()
  return <VerticalPage solution={solution} />
}
