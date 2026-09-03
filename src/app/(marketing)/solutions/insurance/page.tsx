import { notFound } from 'next/navigation'

import { VerticalPage } from '@/components/solutions/vertical-page'
import { createMetadata } from '@/lib/seo'
import { getSolutionBySlug } from '@/lib/solutions'

export const metadata = createMetadata({
  title: 'Insurance',
  description: 'AI solutions for Insurance — content coming soon.',
  path: '/solutions/insurance',
  noindex: true,
})

export default function Page() {
  const solution = getSolutionBySlug('insurance')
  if (!solution) notFound()
  return <VerticalPage solution={solution} />
}
