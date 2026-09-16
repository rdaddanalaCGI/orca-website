import { notFound } from 'next/navigation'

import { VerticalPage } from '@/components/solutions/vertical-page'
import { createMetadata } from '@/lib/seo'
import { getSolutionBySlug } from '@/lib/solutions'

const solution = getSolutionBySlug('logistics-and-distribution')

export const metadata = createMetadata({
  title: solution?.name ?? 'Logistics & Distribution',
  description:
    solution?.solutionsPage?.positioning ?? solution?.hero?.subheadline ?? 'AI solutions for Logistics & Distribution.',
  path: '/solutions/logistics-and-distribution',
  noindex: true,
})

export default function Page() {
  if (!solution) notFound()
  return <VerticalPage solution={solution} />
}
