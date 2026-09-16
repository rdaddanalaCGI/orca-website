import { notFound } from 'next/navigation'

import { VerticalPage } from '@/components/solutions/vertical-page'
import { createMetadata } from '@/lib/seo'
import { getSolutionBySlug } from '@/lib/solutions'

const solution = getSolutionBySlug('insurance')

export const metadata = createMetadata({
  title: solution?.name ?? 'Insurance',
  description:
    solution?.solutionsPage?.positioning ?? solution?.hero?.subheadline ?? 'AI solutions for specialty insurance.',
  path: '/solutions/insurance',
  noindex: true,
})

export default function Page() {
  if (!solution) notFound()
  return <VerticalPage solution={solution} />
}
