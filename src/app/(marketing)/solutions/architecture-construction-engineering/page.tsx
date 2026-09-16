import { notFound } from 'next/navigation'

import { VerticalPage } from '@/components/solutions/vertical-page'
import { createMetadata } from '@/lib/seo'
import { getSolutionBySlug } from '@/lib/solutions'

const solution = getSolutionBySlug('architecture-construction-engineering')

export const metadata = createMetadata({
  title: solution?.name ?? 'Architecture, Construction & Engineering',
  description:
    solution?.solutionsPage?.positioning ??
    solution?.hero?.subheadline ??
    'AI solutions for Architecture, Construction & Engineering.',
  path: '/solutions/architecture-construction-engineering',
  noindex: true,
})

export default function Page() {
  if (!solution) notFound()
  return <VerticalPage solution={solution} />
}
