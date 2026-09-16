import { notFound } from 'next/navigation'

import { VerticalPage } from '@/components/solutions/vertical-page'
import { createMetadata } from '@/lib/seo'
import { getSolutionBySlug } from '@/lib/solutions'

const solution = getSolutionBySlug('legal')

export const metadata = createMetadata({
  title: solution?.name ?? 'Legal',
  description: solution?.solutionsPage?.positioning ?? solution?.hero?.subheadline ?? 'AI solutions for law firms.',
  path: '/solutions/legal',
  noindex: true,
})

export default function Page() {
  if (!solution) notFound()
  return <VerticalPage solution={solution} />
}
